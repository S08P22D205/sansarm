DB = {
    'user': 'ssafy',
    'password': 'ssafy!234',
    'host': '172.17.0.1',  # 로컬에서 돌릴 때는 localhost를 기재한다.
    'port': 3306,
    'database': 'sansam_db'
}

DB_URL = f"mysql+mysqlconnector://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8"
