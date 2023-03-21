const Start = () => {
  const KAKAO_AUTH_URL = "http://localhost:5000/oauth2/authorization/kakao";

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="Start">
      <h1>Start입니다</h1>
      <img
        src="img/kakao_login_medium_narrow.png"
        alt="login"
        onClick={handleLogin}
      />
      <img
        src="img/kakao_login_medium_wide.png"
        alt="login_2"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Start;
