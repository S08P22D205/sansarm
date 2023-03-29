import os
import math
import numpy as np
import pandas as pd
import warnings
import json
import requests
from collections import deque
from pyproj import Proj, transform
from sqlalchemy import create_engine

# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

# 환경 변수로 api key 숨기기
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
KAKAO_API_KEY = os.environ.get("KAKAO_API_KEY")
MARIADB_PASSWORD = os.environ.get("MARIADB_PASSWORD")

# 변환할 좌표계 정의
epsg5186 = Proj(init="epsg:5186")
wgs84 = Proj(init='epsg:4326')

# DB 연결
engine = create_engine(f"mariadb+pymysql://ssafy:{MARIADB_PASSWORD}@127.0.0.1:3306/sansam_db?charset=utf8mb4")


# 등산로 연결 정보 그래프(dictionary)에 저장
def make_graph(idx):
    last = course_df.loc[idx, "LAST_POINT"]
    for i in range(len(course_df)):
        fid = course_df.loc[i,"FID"]
        first = course_df.loc[i, "FIRST_POINT"]

        if last == first and not visited[fid][0] and fid not in graph[idx][1]:
            graph[idx][1].append(fid)
            graph[fid][0].append(idx) # 무한 루프 도는 경우가 있어서 일단 단반향 그래프로 설정 (추후 수정 예정)
            visited[fid][0] = True
            make_graph(fid)
            visited[fid][0] = False


# 시종점(시작점)을 포함한 등산 코스 찾기
def find_course(idx, cur_dis, limit_dis):
    global cnt

    # 산별 총 길이 제한을 넘거나 코스의 수가 3개 초과한 경우 제외
    if cnt > 3 or cur_dis > limit_dis:
        return

    if idx == top_point_idx:
        # 최종적으로 나온 코스를 courses에 저장
        courses.append([i for i in one_path])
        cnt += 1
        return

    # 모든 이어진 등산로를 탐색하기 위해 백트래킹으로 구현
    for v in graph[idx][1]:
        if not checked[v][0]:
            checked[v][0] = True
            one_path.append(v)
            find_course(v, cur_dis+course_df.loc[v,"PMNTN_LT"], limit_dis)
            one_path.pop()
            checked[v][0] = False


# 좌포로 행정구역명 가져오기 api
def get_address(lat, lng):
    url = f"https://dapi.kakao.com/v2/local/geo/coord2address.json?x={lng}&y={lat}"

    headers = {"Authorization": KAKAO_API_KEY }
    api_json = requests.get(url, headers=headers)
    full_address = json.loads(api_json.text)

    # 해당 좌표의 주소가 비어있는 경우, null 처리
    return "null" if full_address['meta']['total_count'] == 0 else full_address['documents'][0]['address']['address_name']


# 마지막 점이 시종점인 경우 path 를 뒤집음
def reverse_path(paths):
    paths[0]=paths[0][::-1]
    return paths


# 높이 좌표를 512개 단위로 보내기
def divide_chunks(lst, n=512):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


# 모든 데이터셋 파일 하나씩 읽기
PMNTN_DIR_SPOT, PMNTN_DIR = "", ""
dir_path = "./data/" # 데이터셋 있는 디렉토리 설정 (압축풀고)
dir_list = os.listdir(dir_path)[:-1]
course_idx = 1
coord_idx = 1
for dir in dir_list:
    file_path=dir_path+dir
    file_list=os.listdir(file_path)
    # 디렉토리 내 데이터셋 파일 경로 설정
    PMNTN_DIR_SPOT = file_path + '/' + file_list[0] if file_list[0].startswith("PMNTN_SPOT") else file_path + '/' + file_list[1]
    PMNTN_DIR = file_path + '/' + file_list[1] if PMNTN_DIR_SPOT == file_path + '/' + file_list[0] else file_path + '/' + file_list[0]

    # 공공 데이터셋 정보를 dataframe 으로 받아서 시종점(feature) 좌표 추출
    start_dict = json.load(open(PMNTN_DIR_SPOT, 'rt', encoding='UTF8'))
    start_df = pd.DataFrame(start_dict["features"])

    # dictionary 로 되어 있는 것들을 column 으로 펼친 후에 concat 함
    start_df = pd.concat([start_df["attributes"].apply(pd.Series), start_df["geometry"].apply(pd.Series)], axis=1)

    # MANAGE_SP2 가 시종점 인 것들만 쿼리 하기
    start_points_df = start_df[start_df.MANAGE_SP2 == "시종점"]
    # x, y 가 NaN인 경우 row 삭제
    start_points_df = start_points_df.drop(start_points_df[(start_points_df.x == "NaN") & (start_points_df.y == "NaN")].index)
    start_points = start_points_df[["x", "y"]].astype(int).values.tolist()
    # print(f"시종점 좌표 : {start_points}")

    # 공공 데이터셋 정보를 dataframe로 받아서 등산로 정보를 저장
    course_dict = json.load(open(PMNTN_DIR, 'rt', encoding='UTF8'))
    course_df = pd.DataFrame(course_dict["features"])
    course_df = pd.concat([course_df["attributes"].apply(pd.Series), course_df["geometry"].apply(pd.Series)], axis=1)

    # paths 의 첫번째 좌표가 시종점인 등산로 idx 찾기
    course_df["LAST_POINT"] = course_df["paths"].map(lambda paths : list(map(math.trunc, paths[0][-1])))
    course_df["IS_LAST_POINT_START"] = course_df["LAST_POINT"].map(lambda point : point in start_points)
    course_df.loc[course_df["IS_LAST_POINT_START"] == True, "paths"] = course_df.loc[course_df["IS_LAST_POINT_START"] == True, "paths"].map(reverse_path)
    course_df.drop(columns=["LAST_POINT", "IS_LAST_POINT_START"], inplace=True)

    course_df["FIRST_POINT"] = course_df["paths"].map(lambda paths : list(map(math.trunc, paths[0][0])))
    course_df["LAST_POINT"] = course_df["paths"].map(lambda paths : list(map(math.trunc, paths[0][-1])))
    course_df["IS_START_POINT"] = course_df["FIRST_POINT"].map(lambda point : point in start_points)

    start_points_idx = course_df.query("IS_START_POINT == True").FID.tolist()
    # print(f"시작점이 시종점인 등산로 idx : {start_points_idx}")

    # 끝점 리스트로 반환
    last_points = (
        course_df.LAST_POINT.map(lambda point : transform(epsg5186, wgs84, point[0], point[1]))
        .map(lambda lnglat : f"{lnglat[1]}, {lnglat[0]}")
        .to_list()
    )

    """ google 고도 api 요청 및 가장 높은 고도의 좌표 저장 V1 """
    # for i in range(len(df_paths)):
    #     dic[i] = [df_paths[i]['paths'][0][0], df_paths[i]['paths'][0][-1]]
    #     lon, lat = transform(epsg5186, wgs84, dic[i][-1][0], dic[i][-1][1])  # 좌표계 변환 (등산로 끝점만 확인)
    #     url = f"https://maps.googleapis.com/maps/api/elevation/json?locations={lat},{lon}&key={GOOGLE_API_KEY}"
    #     response = requests.request("GET", url, headers={}, data={})
    #     compTop = response.json()['results'][0]['elevation']
    #
    #     # 가장 높은 좌표의 idx 저장
    #     if top < compTop:
    #         top = compTop
    #         topX, topY = lon, lat
    #         top_point_idx = i
    """ google 고도 api 요청 및 가장 높은 고도의 좌표 저장 V2 """
    query_chunks = divide_chunks(last_points, 350)
    urls = [f"https://maps.googleapis.com/maps/api/elevation/json?locations={'|'.join(query_chunk)}&key={GOOGLE_API_KEY}" for query_chunk in query_chunks]
    elevations=[]
    for url in urls:
        response = requests.request("GET", url, headers={}, data={})
        elevations.extend(pd.DataFrame(response.json()["results"])["elevation"])
    # elevation 정보 저장
    course_df["ELEVATION"] = elevations
    top_point_idx = course_df.ELEVATION.idxmax() # 가장 높은 등산로의 idx 저장
    top_point_elev = course_df.ELEVATION[top_point_idx] # 가장 높은 포인트의 고도 저장
    # print(f"최고 고도 = {top_point_elev}")

    # 등산로 idx를 바탕으로 연결 그래프 만들기
    graph = {i:{0:[], 1:[]} for i in range(len(course_df))} # 0 : 등산로의 시작점 , 1 : 등산로의 끝점
    visited = [[False]*2 for _ in range(len(course_df))] # [0] : 시작점 방문 여부 , [1] : 끝점 방문 여부
    for i in range(len(course_df)):
        visited[i][1] = True
        make_graph(i)
        visited[i][1] = False
    # print("그래프 :", graph)

    # start_points_idx 로 시작 해서 top_point_idx 로 끝나는 등산 코스 찾기
    courses=[]
    checked = [[False]*2 for _ in range(len(course_df))]
    for s in start_points_idx:
        one_path = deque([s])
        cnt=0
        checked[s][1] = True
        # 의미있는 등산로만 찾기 위해 limit_dis 를 고도(km) * 8로 제한
        limit_km = top_point_elev * 8 / 1000
        find_course(s, course_df.loc[s, "PMNTN_LT"], limit_km)
        checked[s][1] = False
    # print("등산 코스 :", courses)
    # print("등산 코스 총 수 :", len(courses))

    # 코스 수가 0이면 패스
    if len(courses) == 0:
        continue

    # DB에 저장 하기 위한 데이터 프레임 틀 만들기
    COURSE = pd.DataFrame(columns=['COURSE_MT_CD', 'COURSE_MT_NM', 'COURSE_MT_NO', 'COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH', 'COURSE_LOCATION', 'COURSE_ADDRESS'])
    COORDINATE = pd.DataFrame(columns=["COURSE_NO", 'COORD_X', 'COORD_Y'])

    # 등산로의 시작점 좌표계 변환
    course_df["FIRST_POINT"] = course_df.FIRST_POINT.map(lambda point : transform(epsg5186, wgs84, point[0], point[1]))

    coord_idx = 1
    paths_df = course_df[["paths", "MNTN_CODE", "MNTN_NM", "PMNTN_LT", "PMNTN_UPPL", "PMNTN_GODN", "ELEVATION"]]
    for i in range(len(courses)):
        # courses[i]에 있는 idx의 colum만 가져오기
        one_path_df = paths_df.iloc[courses[i]]

        """ lng, lat 을 가져 와서 좌표 변환 V1 """
        # # courses[i]의 모든 좌표 ndarray에 저장 후 list 화
        # points = np.concatenate(
        #     one_path_df.paths
        #     .map(lambda _paths : _paths[0]).values
        # ).tolist()
        # points = pd.Series(points)# 2d list를 Series 화
        #
        # # 좌표계 변환하여 해당 코스의 최종 좌표들 저장
        # course_points = (
        #     points.map(lambda point: transform(epsg5186, wgs84, point[0], point[1]))
        #     .map(lambda lnglat: f"{lnglat[1]}, {lnglat[0]}")
        #     .to_list()
        # )
        """ lng, lat 을 가져 와서 좌표 변환 V2 (리스트로 한번에 변환)"""
        np_points = np.concatenate(one_path_df.paths.map(lambda _paths: _paths[0]).values)
        epsg5186_xs, epsg5186_ys = np_points.T
        wgs84_lngs, wgs84_lats = transform(epsg5186, wgs84, epsg5186_xs, epsg5186_ys)
        # course_points = [f"{lat}, {lng}" for lat, lng in zip(wgs84_lats, wgs84_lngs)]
        course_points = list(zip(wgs84_lats, wgs84_lngs))

        # 각각의 columns 들을 더해서 dict 에 저장
        path_dict = (
            one_path_df[["PMNTN_LT", "PMNTN_UPPL", "PMNTN_GODN"]]
            .sum()
            .to_dict()
        )
        mn_dis, mn_up_time, mn_down_time = path_dict.values()
        mn_elev_diff = top_point_elev-one_path_df["ELEVATION"].iloc[0]

        # 산코드 저장
        mn_code = course_df.loc[courses[i][0], 'MNTN_CODE']
        # 산이름 저장
        mn_name = course_df.loc[courses[i][0], 'MNTN_NM']
        mn_name = mn_name.split('_')[0] if '_' in mn_name else mn_name
        # 산별 코스 번호 저장
        mn_course_num = i+1
        # 시종점 주소 저장
        lat, lng = course_points[0]
        mn_course_adr = get_address(lat, lng) # ! 리스트로 한번에 받아 오는 api 찾아 보기
        mn_district = mn_course_adr.split()[0]

        # COURSE df에 코스 정보 저장
        COURSE.loc[course_idx] = [mn_code, mn_name, mn_course_num, mn_elev_diff, mn_up_time, mn_down_time, round(mn_dis, 2), mn_district, mn_course_adr]

        """ course 를 이루는 전체 좌표를 COORDINATE df 에 저장 V1 """
        # for p in course_points:
        #     lng, lat = map(float, p.split(","))
        #     COORDINATE.loc[coord_idx] = [course_idx, lng, lat]
        #     coord_idx+=1
        """ course 를 이루는 전체 좌표를 COORDINATE df 에 저장 V2 """
        new_coord = pd.DataFrame(course_points, columns=["COORD_X", "COORD_Y"]).assign(COURSE_NO=course_idx)
        COORDINATE = pd.concat([COORDINATE, new_coord], axis=0)

        course_idx+=1

    # one query 에 DataFrame 을 mariaDB에 넣기
    COURSE.to_sql(name='COURSE', con=engine, if_exists='append', index=False, method='multi')
    COORDINATE.to_sql(name='COORDINATE', con=engine, if_exists='append', index=False, method='multi')

    print(f"------------------------------------{mn_code}, {mn_name} 완료----------------------------------------------")