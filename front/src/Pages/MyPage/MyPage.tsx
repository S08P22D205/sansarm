import { useEffect, useState } from "react";
import axios from "../../store/baseURL.js";
import styled from "styled-components";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import MyHeart from "./MyHeart";
import { userApi } from "../../api";

const StyledH2 = styled.h2`
  padding-top: 8vw;
  padding-left: 5vw;
  margin: 0px;
  font-family: "GmarketSansMedium";
  font-size: 6vw;
  margin-bottom: 5px;
`;

const StyledDiv = styled.div`
  padding-left: 23vw;
  padding-right: 15vw;
  margin-top: 5vw;
  font-family: "GmarketSansLight";
`;

const StyledTab = styled.div`
  padding-top: 3vw;
  padding-bottom: 3vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
`;

const StyledIcon = styled.img`
  width: 10vw;
`;

const StyledIcon2 = styled.img`
  width: 9vw;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledH3 = styled.h3`
  margin-top: 4vw;
  margin-bottom: 3vw;
  font-weight: bold;
  font-size: 5vw;
  ::before {
    content: "";
    position: absolute;
    left: -48px;
    top: 50%;
    transform: translateY(-50%);
    width: 5vw;
    height: 5vw;
    border: 4px solid #238c47;
    border-radius: 100%;
    background-color: white;
  }
`;

const StyledHr = styled.hr`
  margin-top: 0px;
  margin-left: -5vw;
  color: #d4d3d3;
  background-color: #d4d3d3;
  height: 1px;
  border: 0;
`;

const StyledP = styled.p`
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 4vw;
`;

const StyledP1 = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  font-size: 4vw;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const ReviewCard = styled.div`
  border: 1px solid #d4d3d3;
  border-radius: 8px;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 7px;
  margin-bottom: 5vw;
  position: relative;
  box-shadow: 5px 5px 5px #b7b7b7;
  ::before {
    content: "";
    margin-top: -5vw;
    position: absolute;
    left: -39px;
    width: 2px;
    height: 130%;
    background-color: #ddd;
  }
`;

interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: Array<number>;
  courseYCoords?: Array<number>;
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewRelDiff?: string;
  reviewContent?: string;
}

function MyPage() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const [reviewCourses, setReviewCourses] = useState<courseInfo[]>([{}]);

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

  useEffect(() => {
    const getReviewCourse = async () => {
      const res = await axios.get("/user/review", {
        headers: {
          "X-ACCESS-TOKEN": accessToken,
          "X-REFRESH-TOKEN": refreshToken,
        },
      });
      setReviewCourses(res.data.reviewCourses);
      console.log(res.data.reviewCourses);
    };
    getReviewCourse();
  }, []);

  return (
    <div className="MyPage">
      <StyledH2>{userName}님의 등산기록</StyledH2>
      <StyledTab>
        <StyledLink to="/myheart">
          <StyledIcon src="/img/heart_black.png" />
        </StyledLink>
        <StyledLink to="/mypage">
          <StyledIcon2 src="/img/flag_red.png" />
        </StyledLink>
      </StyledTab>
      {/* <Routes>
        <Route path="/myheart" element={<MyHeart />} />
      </Routes> */}
      <StyledDiv>
        {reviewCourses.map((review, idx) => (
          <ReviewCard key={idx}>
            <StyledH3>
              {" "}
              {review.courseMtNm} {review.courseMtNo}코스{" "}
              {review.reviewRelDiff === "H" ? (
                <span>⭐⭐⭐</span>
              ) : review.reviewRelDiff === "N" ? (
                <span>⭐⭐</span>
              ) : (
                <span>⭐</span>
              )}
            </StyledH3>
            <StyledHr />
            <StyledP>
              <StyledSpan>방문일 </StyledSpan>
              {review.reviewDate?.toString()}
            </StyledP>
            <StyledP1>
              <StyledSpan>소요시간 </StyledSpan>
              {review.reviewTime ? (
                <span>
                  {Math.floor(review.reviewTime / 60)}시간{" "}
                  {review.reviewTime % 60 ? (
                    <span>{review.reviewTime % 60}분</span>
                  ) : (
                    <span></span>
                  )}
                </span>
              ) : (
                <span></span>
              )}
            </StyledP1>
            <StyledP1>{review.reviewContent}</StyledP1>
          </ReviewCard>
        ))}
      </StyledDiv>
    </div>
  );
}

export default MyPage;
