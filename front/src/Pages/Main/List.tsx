import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { changeUserInfo } from "../../store/loginSlice";
import { RecInfo } from "../../store/RecommendSlice";
import { DiffInfo } from "../../store/RecommendSlice";
import ListItem from "./ListItem";
import { UserInfo } from "../../store/loginSlice";
import { userApi } from "../../api";
import { useEffect, useState } from "react";

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledH = styled.p`
  text-align: center;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5vw;
  margin-bottom: 3vw;
`;

function List() {
  // const dispatch = useAppDispatch();

  // store에 저장된 각 코스정보를 useSelector로 받아온다!
  const ageGender: RecInfo = useAppSelector(state => state.recommend.genderAge);
  const courses: DiffInfo = useAppSelector(
    state => state.recommend.difficultyCourse
  );

  // store에 저장된 유저정보를 useSelector로 받아오기
  const userInfo: UserInfo = useAppSelector(state => state.login.userInfo);

  // const loginInfo: LoginInfo = useAppSelector(state => state.login.loginInfo);
  // const accessToken = loginInfo.accessToken;
  // const refreshToken = loginInfo.refreshToken;

  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 유저이름 state에 담아서 사용해주기 -> 나중에 시간 남으면 store에 유저정보 저장해주면 좋을듯
  const [userName, setUserName] = useState<string>("");

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 현재 로그인한 유저정보 받아오는 코드
    const getUserInfo = async () => {
      const res = await userApi.userInfo(accessToken, refreshToken);
      // console.log(res.data);
      // 유저 닉네임 state에 저장해주기
      setUserName(res.data.userNicknm);
      // 세션스토리지 내 accessToken 갱신
      sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
    };
    getUserInfo();
  }, []);

  return (
    <StyledDiv className="List">
      <StyledH>{userInfo.userNicknm}님을 위한 추천코스</StyledH>
      <ListItem
        USER_AGE_POOL={ageGender.USER_AGE_POOL}
        USER_GENDER={ageGender.USER_GENDER}
        COURSE_LIST={ageGender.COURSE_LIST}
      />
      <ListItem
        COURSE_LIST={courses.EASY_COURSE_LIST}
        courseName="당신을 위한 편안한 코스"
      />
      <ListItem
        COURSE_LIST={courses.NORMAL_COURSE_LIST}
        courseName="이정도면 할만한데?"
      />
      <ListItem
        COURSE_LIST={courses.HARD_COURSE_LIST}
        courseName="이 길은 쉽지 않을걸..."
      />
    </StyledDiv>
  );
}

export default List;
