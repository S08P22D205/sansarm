from flask import Flask, request, make_response, jsonify
from sqlalchemy import create_engine, text
from haversine import haversine
import requests

app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config['JSON_SORT_KEYS'] = False

database = create_engine(app.config['DB_URL'], max_overflow=0)
app.database = database


def get_email_response(access_token, refresh_token):
    url = 'http://localhost:5000/user/email'
    headers = {'X-ACCESS-TOKEN': access_token, 'X-REFRESH-TOKEN': refresh_token}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response
    else:
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

    with database.connect() as conn:
        reviews = conn.execute(text(f"""
        SELECT * 
        FROM `REVIEW`
        WHERE `USER_NO` = (SELECT `USER_NO`
                            FROM `USER`
                            WHERE `USER_AGE` = {user_age} AND `USER_GENDER` = '{user_gender}')
        ORDER BY REVIEW_DATE;
        """)).mappings().all()

    courses = set()

    for review in reviews:
        courses.add(review['COURSE_NO'])

    result = {
        'USER_AGE': user_age,
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

    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001)
