from flask import Flask, request, make_response, jsonify
from sqlalchemy import create_engine, text
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
    response.headers["X-ACCESS-TOKEN"] = access_token

    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001)
