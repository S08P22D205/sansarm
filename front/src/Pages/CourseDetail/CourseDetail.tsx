import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import axios from "axios";
import Kakaomap from "./Kakaomap";
import ReviewList from "./ReviewList";

interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: number[];
  courseYCoords?: number[];
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  courseAddress?: string;
}

function CourseDetail() {
  const [courseData, setCourseData] = useState<courseInfo>({});

  const navigate = useNavigate();

  const location = useLocation();

  const moveToHiking = () => {
    navigate("/hiking");
  };

  // access token, refresh token 가져오기
  const AccessToken = sessionStorage.getItem("accessToken");
  const RefreshToken = sessionStorage.getItem("refreshToken");

  // 코스 번호
  const id = location.pathname.slice(14);

  // axios 요청 : 코스 데이터 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/search/${id}`, {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
        params: {
          courseNo: id,
        },
      })

      .then((res) => {
        console.log("코스 정보 받아오기 :: 성공!");
        setCourseData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(courseData);

  return (
    <div className="CourseDetail">
      <StyledDiv>
        <StyledTitle>
          {courseData.courseMtNm}&nbsp;
          {courseData.courseMtNo}코스
        </StyledTitle>
      </StyledDiv>
      {courseData.courseXCoords && courseData.courseYCoords ? (
        <Kakaomap
          courseXCoords={courseData.courseXCoords}
          courseYCoords={courseData.courseYCoords}
        />
      ) : null}
      <StyledDiv2>
        <StyledContent>코스 길이 : {courseData.courseLength}km</StyledContent>
        {courseData.courseUptime ? (
          <StyledContent>
            상행 시간 : {Math.floor(courseData.courseUptime / 60)}시간{" "}
            {Math.floor(courseData.courseUptime % 60)}분
          </StyledContent>
        ) : null}

        {courseData.courseDowntime ? (
          <StyledContent>
            하행 시간 : {Math.floor(courseData.courseDowntime / 60)}시간{" "}
            {Math.floor(courseData.courseDowntime % 60)}분
          </StyledContent>
        ) : null}
      </StyledDiv2>

      <StyledBtn onClick={moveToHiking}>등산 시작하기</StyledBtn>

      <ReviewList />
    </div>
  );
}

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
`;

const StyledDiv2 = styled.div`
  margin-top: 20px;
  margin-left: 40px;
`;

const StyledTitle = styled.p`
  font-family: "GmarketSansMedium";
  font-size: 25px;
  margin: 0px;
`;

const StyledContent = styled.p`
  font-family: "GmarketSansLight";
  margin: 5px;
`;

const StyledBtn = styled.button`
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 12px;
  width: 70%;
  height: 50px;
  margin-left: 15%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default CourseDetail;
