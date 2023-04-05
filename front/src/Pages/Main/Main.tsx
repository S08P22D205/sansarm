import styled from "styled-components";
import List from "./List";
import { useEffect, useState } from "react";
import MainBtn from "./MainBtn";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeAgeGender,
  changeCourses,
  changeTopTen,
} from "../../store/RecommendSlice";
import { courseApi, userApi } from "../../api";
import SearchBar from "./SearchBar";
import { changeUserInfo, changeIsRec } from "../../store/loginSlice";

const StyledDiv = styled.div`
  padding-top: 8vw;
`;

const StyledH = styled.p`
  text-align: center;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5.6vw;
  margin-bottom: 12px;
`;

function Main() {
  // dispatch 사용하기 위해 정의해주기
  const dispatch = useAppDispatch();

  // 코스 추천 가능 여부 state
  const [isRec, setIsRec] = useState<boolean>(false);

  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // store에 저장된 난이도별 코스 추천 가능 여부 받아오기
  // const isRec: boolean = useAppSelector(state => state.login.isRec);

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 1. 성별, 나이에 맞는 코스 정보 받아와서 store에 저장해주기 (axios 모듈화, recommendSlice 사용)
    const getageGender = async () => {
      const res = await courseApi.ageGender(accessToken, refreshToken);
      dispatch(changeAgeGender(res.data));
      // 세션스토리지 내 accessToken 갱신
      sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
    };
    // 2. 유저 정보 받아와서 store에 저장해주기
    const getUserInfo = async () => {
      const res = await userApi.userInfo(accessToken, refreshToken);
      dispatch(changeUserInfo(res.data));
    };
    // 3-1. 난이도별 코스 추천 받을 수 있는지 여부 store에 저장해주기
    const getIsRec = async () => {
      const res = await userApi.isRec(accessToken, refreshToken);
      setIsRec(res.data);
      dispatch(changeIsRec(res.data));
    };
    // 3-3. 리뷰 최다 top10 코스 목록 store에 저장해주기
    const getTopTen = async () => {
      const res = await courseApi.topTen(accessToken, refreshToken);
      dispatch(changeTopTen(res.data.topTenCourseList));
    };
    getageGender();
    getUserInfo();
    getIsRec();
    getTopTen();
  }, []);

  useEffect(() => {
    // 3-2. 코스 정보 받아와서 store에 저장해주기
    const getCourses = async () => {
      const res = await courseApi.recommend(accessToken, refreshToken);
      dispatch(changeCourses(res.data));
    };
    if (isRec) {
      getCourses();
    }
  }, [isRec]);

  return (
    <StyledDiv className="Main">
      <StyledH>어떤 산으로 떠나고 싶으신가요?</StyledH>
      <SearchBar />
      <MainBtn />
      <List />
    </StyledDiv>
  );
}

export default Main;
