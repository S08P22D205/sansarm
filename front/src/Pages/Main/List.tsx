import styled from "styled-components";
import ListItem from "./ListItem";
import { useAppSelector } from "../../store/hooks";
import { ItemInfo } from "../../store/mainSlice";
import { RecInfo } from "../../store/RecommendSlice";
import ListItem2 from "./ListItem2";
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
  // store에 저장된 각 코스정보를 useSelector로 받아온다!
  const genderAge: Array<ItemInfo> = useAppSelector(
    state => state.main.genderAge
  );
  const easyCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.easyCourse
  );
  const normalCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.normalCourse
  );
  const hardCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.hardCourse
  );
  const ageGender: RecInfo = useAppSelector(state => state.recommend.genderAge);

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
      setUserName(res.data.userNicknm);
    };
    getUserInfo();
  }, []);

  return (
    <StyledDiv className="List">
      <StyledH>{userName}님을 위한 추천코스</StyledH>
      <ListItem2
        USER_AGE_POOL={ageGender.USER_AGE_POOL}
        USER_GENDER={ageGender.USER_GENDER}
        COURSE_LIST={ageGender.COURSE_LIST}
      />
      <ListItem
        userAge={genderAge[0].userAge}
        userGender={genderAge[0].userGender}
        courseList={genderAge[0].courseList}
      />
      <ListItem
        courseList={easyCourse[0].courseList}
        courseName="보다 편한 코스는 어때요?"
      />
      <ListItem
        courseList={normalCourse[0].courseList}
        courseName="이정도면 할만한데?"
      />
      <ListItem
        courseList={hardCourse[0].courseList}
        courseName="이 길은 쉽지 않을걸..."
      />
    </StyledDiv>
  );
}

export default List;
