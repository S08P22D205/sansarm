import styled from "styled-components";
import List from "./List";
import axios from "axios";
import { useEffect } from "react";
import MainBtn from "./MainBtn";
import { useAppDispatch } from "../../store/hooks";
import {
  changeGenderAge,
  changeEasyCourse,
  changeNormalCourse,
  changeHardCourse,
} from "../../store/mainSlice";
import {
  changeAgeGender,
  changeEasyCourses,
  changeNormalCourses,
  changeHardCourses,
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
    // 1. 성별, 나이에 맞는 코스 정보 받아와서 store에 저장해주기
    const getGenderAge = async () => {
      const res = await axios.get("/dummy/GenderAge.json");
      dispatch(changeGenderAge(res.data));
    };
    // 2. Easy 코스 정보 받아와서 store에 저장해주기
    const getEasyCourse = async () => {
      const res = await axios.get("/dummy/EasyCourse.json");
      dispatch(changeEasyCourse(res.data));
    };
    // 3. Normal 코스 정보 받아와서 store에 저장해주기
    const getNormalCourse = async () => {
      const res = await axios.get("/dummy/NormalCourse.json");
      dispatch(changeNormalCourse(res.data));
    };
    // 4. Hard 코스 정보 받아와서 store에 저장해주기
    const getHardCourse = async () => {
      const res = await axios.get("/dummy/HardCourse.json");
      dispatch(changeHardCourse(res.data));
    };
    // 1. axios 모듈화, recommendSlice 사용한 코드
    // const getageGender = async () => {
    //   const res = await courseApi.ageGender(accessToken, refreshToken);
    //   dispatch(changeAgeGender(res.data));
    // };
    getGenderAge();
    getEasyCourse();
    getNormalCourse();
    getHardCourse();
    // getageGender();
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
