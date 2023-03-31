from flask import Flask, request, make_response, jsonify
from sqlalchemy import create_engine, text
from haversine import haversine
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
app.config['JSON_SORT_KEYS'] = False

database = create_engine(app.config['DB_URL'], max_overflow=0)
app.database = database


def get_email_response(access_token, refresh_token):
    url = 'https://j8d205.p.ssafy.io/api/user/email'
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
    print(email_response.json()['userEmail'])
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


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
