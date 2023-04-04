import styled from "styled-components";
import List from "./List";
import { useEffect } from "react";
import MainBtn from "./MainBtn";
import { useAppDispatch } from "../../store/hooks";
import {
  changeAgeGender,
  // changeEasyCourses,
  // changeNormalCourses,
  // changeHardCourses,
  changeCourses,
} from "../../store/RecommendSlice";
import { courseApi, userApi } from "../../api";
import SearchBar from "./SearchBar";

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

  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 1. 성별, 나이에 맞는 코스 정보 받아와서 store에 저장해주기 (axios 모듈화, recommendSlice 사용)
    const getageGender = async () => {
      const res = await courseApi.ageGender(accessToken, refreshToken);
      dispatch(changeAgeGender(res.data));
    };
    // 2-1. 코스 정보 받아와서 store에 저장해주기
    const getCourses = async () => {
      const res = await courseApi.recommend(accessToken, refreshToken);
      dispatch(changeCourses(res.data));
    };
    // // 2. Easy 코스 정보 받아와서 store에 저장해주기
    // const getEasy = async () => {
    //   const res = await courseApi.easy(accessToken, refreshToken);
    //   dispatch(changeEasyCourses(res.data));
    // };
    // // 3. Normal 코스 정보 받아와서 store에 저장해주기
    // const getNormal = async () => {
    //   const res = await courseApi.normal(accessToken, refreshToken);
    //   dispatch(changeNormalCourses(res.data));
    // };
    // // 4. Hard 코스 정보 받아와서 store에 저장해주기
    // const getHard = async () => {
    //   const res = await courseApi.hard(accessToken, refreshToken);
    //   dispatch(changeHardCourses(res.data));
    // };
    getageGender();
    getCourses();
    // getEasy();
    // getNormal();
    // getHard();
  }, []);

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
