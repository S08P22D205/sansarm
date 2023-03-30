import styled from "styled-components";
import { Login_URI } from "../../store/baseURL";

const StyledDiv = styled.div`
  text-align: center;
  line-height: 70vh;
`;

const Start = () => {
  const KAKAO_AUTH_URL = `${Login_URI}/login/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <StyledDiv className="Start">
      <img
        src="img/kakao_login_medium_narrow.png"
        alt="login"
        onClick={handleLogin}
      />
      {/* <img
        src="img/kakao_login_medium_wide.png"
        alt="login_2"
        onClick={handleLogin}
      /> */}
    </StyledDiv>
  );
};

export default Start;
