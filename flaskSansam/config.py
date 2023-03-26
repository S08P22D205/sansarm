DB = {
    'user': 'ssafy',
    'password': 'ssafy!234',
    'host': 'localhost',
    'port': 3306,
    'database': 'sansam_db'
}

DB_URL = f"mysql+mysqlconnector://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8&collation=utf8mb4_general_ci"
