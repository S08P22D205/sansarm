from flask import Flask, request, make_response, jsonify
from sqlalchemy import create_engine, text
from haversine import haversine
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
import requests

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
app.config['JSON_SORT_KEYS'] = False

database = create_engine(app.config['DB_URL'], max_overflow=0)
app.database = database


def get_email_response(access_token, refresh_token):
    url = 'http://172.17.0.1:5000/user/email'
    headers = {'X-ACCESS-TOKEN': access_token, 'X-REFRESH-TOKEN': refresh_token}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(response.status_code)
        return response
    else:
        print(response.status_code)
        return


@app.route('/')
def sansam():  # put application's code here
    return 'Flask server for Sansam'


@app.route('/course/main/age-gender', methods=['GET'])
def get_course_by_age_and_gender():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    user_email = email_response.json()['userEmail']
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    with database.connect() as conn:
        user_info = conn.execute(text(f"""
        SELECT * 
        FROM `USER` 
        WHERE `USER_EMAIL` = '{user_email}';
        """)).mappings().one()

    user_age = user_info['USER_AGE']
    user_gender = user_info['USER_GENDER']

    # 유저의 나이대로 변경(20대, 30대 등)
    user_age = user_age // 10 * 10

    with database.connect() as conn:
        reviews = conn.execute(text(f"""
        SELECT * 
        FROM `REVIEW`
        WHERE `USER_NO` IN (SELECT `USER_NO`
                            FROM `USER`
                            WHERE `USER_AGE` BETWEEN {user_age} AND {user_age+9}
                            AND `USER_GENDER` = '{user_gender}')
        ORDER BY REVIEW_DATE;
        """)).mappings().all()

    courses = set()

    for review in reviews:
        courses.add(review['COURSE_NO'])

    result = {
        'USER_AGE_POOL': user_age,
        'USER_GENDER': user_gender,
        'COURSE_LIST': []
    }

    for course in courses:
        with database.connect() as conn:
            course = conn.execute(text(f"""
                SELECT *
                FROM `COURSE`
                WHERE `COURSE_NO` = {course}
            """)).mappings().one()

        course_in_dict = {}

        for item in course:
            course_in_dict[item] = course[item]

        result['COURSE_LIST'].append(course_in_dict)

    response = make_response(jsonify(result))
    response.headers.set("X-ACCESS-TOKEN", access_token)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


@app.route('/course/search/area', methods=['POST'])
def get_course_by_area():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    course_length = {0: (0, 50), 1: (0, 1), 2: (1, 3), 3: (3, 5), 4: (5, 50)}
    course_time = {0: (0, 50*60), 1: (0, 1*60), 2: (1*60, 2*60), 3: (2*60, 50*60)}

    result = {
        "COURSE_LIST": []
    }

    if request.get_json()['courseLocation'] == "현재 위치":
        with database.connect() as conn:
            courses = conn.execute(text(f"""
                SELECT c.*, (SELECT COORD_X FROM `COORDINATE` WHERE COURSE_NO = c.COURSE_NO LIMIT 1) AS COORD_START_X,
                (SELECT COORD_Y FROM `COORDINATE` WHERE COURSE_NO = c.COURSE_NO LIMIT 1) AS COORD_START_Y 
                FROM `COURSE` AS c
            """)).mappings().all()

        start = (float(request.get_json()['coordX']), float(request.get_json()['coordY']))
        for course in courses:
            course_in_dict = {}
            endpoint = [0, 0]
            for item in course:
                if item == 'COORD_START_X':
                    endpoint[0] = course[item]
                if item == 'COORD_START_Y':
                    endpoint[1] = course[item]
            end = (float(endpoint[0]), float(endpoint[1]))
            if haversine(start, end) <= float(request.get_json()['courseRadius']):
                for item in course:
                    course_in_dict[item] = course[item]
                del course_in_dict['COORD_START_X']
                del course_in_dict['COORD_START_Y']
                result['COURSE_LIST'].append(course_in_dict)

    else:
        with database.connect() as conn:
            courses = conn.execute(text(f"""
                SELECT *
                FROM `COURSE`
                WHERE `COURSE_LOCATION` = '{request.get_json()['courseLocation']}'
                AND `COURSE_LENGTH` BETWEEN {course_length[int(request.get_json()['courseLengthBtNo'])][0]} AND {course_length[int(request.get_json()['courseLengthBtNo'])][1]}
                AND `COURSE_UPTIME` + `COURSE_DOWNTIME` BETWEEN {course_time[int(request.get_json()['courseTimeBtNo'])][0]} AND {course_time[int(request.get_json()['courseTimeBtNo'])][1]}
            """)).mappings().all()

        for course in courses:
            course_in_dict = {}
            for item in course:
                course_in_dict[item] = course[item]
            result['COURSE_LIST'].append(course_in_dict)

    response = make_response(jsonify(result))
    response.headers.set("X-ACCESS-TOKEN", access_token)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


@app.route("/course/search/mt", methods=["POST"])
def get_course_by_mt_name():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    course_time = {0: (0, 50 * 60), 1: (0, 1 * 60), 2: (1 * 60, 2 * 60), 3: (2 * 60, 50 * 60)}
    course_length = {0: (0, 50), 1: (0, 1), 2: (1, 3), 3: (3, 5), 4: (5, 50)}

    res_dict = request.get_json()
    course_mt_name = res_dict["courseMtNm"]
    bt_len_no = res_dict["courseLengthBtNo"]
    bt_time_no = res_dict["courseTimeBtNo"]

    left_time, right_time = course_time[int(bt_len_no)]
    left_len, right_len = course_length[int(bt_time_no)]

    with database.connect() as conn:
        courses = conn.execute(text(f"""
        SELECT * 
        FROM `COURSE`
        WHERE `COURSE_MT_NM` = '{course_mt_name}'
        AND `COURSE_UPTIME` + `COURSE_DOWNTIME` BETWEEN {left_time} AND {right_time} 
        AND `COURSE_LENGTH` BETWEEN {left_len} AND {right_len}
        """)).mappings().all()

    courses = list(map(dict, courses))

    body = {}
    body["course_list"]=courses

    response = make_response(body)
    response.headers["X-ACCESS-TOKEN"] = access_token
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


@app.route("/course/main/easy", methods=["GET"])
def get_course_recommend_easy():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    user_email = email_response.json()['userEmail']
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    body = {}
    body['COURSE_LIST'] = []

    with database.connect() as conn:
        review_easy = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'E'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_normal = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'N'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_hard = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'H'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    centroid_easy = np.array([float(review_easy['COURSE_ELEV_DIFF']), review_easy['COURSE_UPTIME'], review_easy['COURSE_DOWNTIME'], float(review_easy['COURSE_LENGTH'])])
    centroid_normal = np.array([float(review_normal['COURSE_ELEV_DIFF']), review_normal['COURSE_UPTIME'], review_normal['COURSE_DOWNTIME'], float(review_normal['COURSE_LENGTH'])])
    centroid_hard = np.array([float(review_hard['COURSE_ELEV_DIFF']), review_hard['COURSE_UPTIME'], review_hard['COURSE_DOWNTIME'], float(review_hard['COURSE_LENGTH'])])
    centroids = np.array([centroid_easy, centroid_normal, centroid_hard])
    print(centroids)

    with database.connect() as conn:
        courses = conn.execute(text(f"""
            SELECT *
            FROM COURSE;
        """)).mappings().all()

    df = pd.DataFrame(courses)
    print(df)

    data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]
    kmeans = KMeans(n_clusters=3, init=centroids, max_iter=300, random_state=0)
    kmeans.fit(data)

    data['cluster'] = kmeans.labels_
    X, y = data[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']].values, kmeans.labels_

    # 각 점에서 센트로이드까지 거리 반환
    dist_model = kmeans.transform(X)
    easy_model = dist_model[:, 0]

    # easy인 경우
    # top 10 smallest의 idx 반환 (순서대로 X)
    ind = np.argpartition(dist_model[:, 0], 10)[:10]
    top_10 = easy_model[ind]

    # sorted top 10 smallest idx
    sorted_top_10_idx = ind[np.argsort(top_10)]

    top_10_df = df.iloc[sorted_top_10_idx]

    for i in range(10):
        temp = {'COURSE_NO': int(top_10_df.iloc[i][8]), 'COURSE_MT_CD': top_10_df.iloc[i][5],
                'COURSE_MT_NM': top_10_df.iloc[i][6], 'COURSE_MT_NO': int(top_10_df.iloc[i][7]),
                'COURSE_ELEV_DIFF': float(top_10_df.iloc[i][2]), 'COURSE_UPTIME': int(top_10_df.iloc[i][9]),
                'COURSE_DOWNTIME': int(top_10_df.iloc[i][1]), 'COURSE_LENGTH': float(top_10_df.iloc[i][3]),
                'COURSE_LOCATION': top_10_df.iloc[i][4], 'COURSE_ADDRESS': top_10_df.iloc[i][0]}
        body['COURSE_LIST'].append(temp)

    response = make_response(body)
    response.headers["X-ACCESS-TOKEN"] = access_token
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


@app.route("/course/main/normal", methods=["GET"])
def get_course_recommend_normal():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    user_email = email_response.json()['userEmail']
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    body = {}
    body['COURSE_LIST'] = []

    with database.connect() as conn:
        review_easy = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'E'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_normal = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'N'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_hard = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'H'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    centroid_easy = np.array([float(review_easy['COURSE_ELEV_DIFF']), review_easy['COURSE_UPTIME'], review_easy['COURSE_DOWNTIME'], float(review_easy['COURSE_LENGTH'])])
    centroid_normal = np.array([float(review_normal['COURSE_ELEV_DIFF']), review_normal['COURSE_UPTIME'], review_normal['COURSE_DOWNTIME'], float(review_normal['COURSE_LENGTH'])])
    centroid_hard = np.array([float(review_hard['COURSE_ELEV_DIFF']), review_hard['COURSE_UPTIME'], review_hard['COURSE_DOWNTIME'], float(review_hard['COURSE_LENGTH'])])
    centroids = np.array([centroid_easy, centroid_normal, centroid_hard])
    print(centroids)

    with database.connect() as conn:
        courses = conn.execute(text(f"""
            SELECT *
            FROM COURSE;
        """)).mappings().all()

    df = pd.DataFrame(courses)
    print(df)

    data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]
    kmeans = KMeans(n_clusters=3, init=centroids, max_iter=300, random_state=0)
    kmeans.fit(data)

    data['cluster'] = kmeans.labels_
    X, y = data[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']].values, kmeans.labels_

    # 각 점에서 센트로이드까지 거리 반환
    dist_model = kmeans.transform(X)
    normal_model = dist_model[:, 1]

    # easy인 경우
    # top 10 smallest의 idx 반환 (순서대로 X)
    ind = np.argpartition(dist_model[:, 1], 10)[:10]
    top_10 = normal_model[ind]

    # sorted top 10 smallest idx
    sorted_top_10_idx = ind[np.argsort(top_10)]

    top_10_df = df.iloc[sorted_top_10_idx]

    for i in range(10):
        temp = {'COURSE_NO': int(top_10_df.iloc[i][8]), 'COURSE_MT_CD': top_10_df.iloc[i][5],
                'COURSE_MT_NM': top_10_df.iloc[i][6], 'COURSE_MT_NO': int(top_10_df.iloc[i][7]),
                'COURSE_ELEV_DIFF': float(top_10_df.iloc[i][2]), 'COURSE_UPTIME': int(top_10_df.iloc[i][9]),
                'COURSE_DOWNTIME': int(top_10_df.iloc[i][1]), 'COURSE_LENGTH': float(top_10_df.iloc[i][3]),
                'COURSE_LOCATION': top_10_df.iloc[i][4], 'COURSE_ADDRESS': top_10_df.iloc[i][0]}
        body['COURSE_LIST'].append(temp)

    response = make_response(body)
    response.headers["X-ACCESS-TOKEN"] = access_token
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


@app.route("/course/main/hard", methods=["GET"])
def get_course_recommend_hard():
    access_token = request.headers.get("X-ACCESS-TOKEN")
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    email_response = get_email_response(access_token, refresh_token)
    user_email = email_response.json()['userEmail']
    access_token = email_response.headers.get("X-ACCESS-TOKEN")

    body = {}
    body['COURSE_LIST'] = []

    with database.connect() as conn:
        review_easy = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'E'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_normal = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'N'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    with database.connect() as conn:
        review_hard = conn.execute(text(f"""
            SELECT COURSE_ELEV_DIFF, COURSE_UPTIME, COURSE_DOWNTIME, COURSE_LENGTH
            FROM COURSE
            WHERE COURSE_NO = (SELECT COURSE_NO
                                FROM REVIEW
                                WHERE REVIEW_REL_DIFF = 'H'
                                AND USER_NO = (SELECT USER_NO
                                                FROM USER
                                                WHERE USER_EMAIL = '{user_email}')
                                ORDER BY REVIEW_DATE DESC
                                LIMIT 1)
        """)).mappings().one()

    centroid_easy = np.array([float(review_easy['COURSE_ELEV_DIFF']), review_easy['COURSE_UPTIME'], review_easy['COURSE_DOWNTIME'], float(review_easy['COURSE_LENGTH'])])
    centroid_normal = np.array([float(review_normal['COURSE_ELEV_DIFF']), review_normal['COURSE_UPTIME'], review_normal['COURSE_DOWNTIME'], float(review_normal['COURSE_LENGTH'])])
    centroid_hard = np.array([float(review_hard['COURSE_ELEV_DIFF']), review_hard['COURSE_UPTIME'], review_hard['COURSE_DOWNTIME'], float(review_hard['COURSE_LENGTH'])])
    centroids = np.array([centroid_easy, centroid_normal, centroid_hard])
    print(centroids)

    with database.connect() as conn:
        courses = conn.execute(text(f"""
            SELECT *
            FROM COURSE;
        """)).mappings().all()

    df = pd.DataFrame(courses)
    print(df)

    data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]
    kmeans = KMeans(n_clusters=3, init=centroids, max_iter=300, random_state=0)
    kmeans.fit(data)

    data['cluster'] = kmeans.labels_
    X, y = data[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']].values, kmeans.labels_

    # 각 점에서 센트로이드까지 거리 반환
    dist_model = kmeans.transform(X)
    hard_model = dist_model[:, 2]

    # easy인 경우
    # top 10 smallest의 idx 반환 (순서대로 X)
    ind = np.argpartition(dist_model[:, 2], 10)[:10]
    top_10 = hard_model[ind]

    # sorted top 10 smallest idx
    sorted_top_10_idx = ind[np.argsort(top_10)]

    top_10_df = df.iloc[sorted_top_10_idx]

    for i in range(10):
        temp = {'COURSE_NO': int(top_10_df.iloc[i][8]), 'COURSE_MT_CD': top_10_df.iloc[i][5],
                'COURSE_MT_NM': top_10_df.iloc[i][6], 'COURSE_MT_NO': int(top_10_df.iloc[i][7]),
                'COURSE_ELEV_DIFF': float(top_10_df.iloc[i][2]), 'COURSE_UPTIME': int(top_10_df.iloc[i][9]),
                'COURSE_DOWNTIME': int(top_10_df.iloc[i][1]), 'COURSE_LENGTH': float(top_10_df.iloc[i][3]),
                'COURSE_LOCATION': top_10_df.iloc[i][4], 'COURSE_ADDRESS': top_10_df.iloc[i][0]}
        body['COURSE_LIST'].append(temp)

    response = make_response(body)
    response.headers["X-ACCESS-TOKEN"] = access_token
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Expose-Headers", "X-ACCESS-TOKEN")

    return response


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=5001)
