import Navbar from "../../Common/Navbar/Navbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledButtonEasy from "./StyledButtonEasy";
import StyledButtonSoso from "./StyledButtonSoso";
import StyledButtonHard from "./StyledButtonHard";
import axios from "../../store/baseURL.js";

interface MountainInfo {
  // 2. props 타입
  COURSE_NO: number;
  COURSE_MT_CD: string;
  COURSE_MT_NM: string;
  COURSE_MT_NO: number;
  COURSE_ABS_DIFF: string;
  COURSE_UPTIME: number;
  COURSE_DOWNTIME: number;
  COURSE_LENGTH: number;
  COURSE_LOCATION: string;
  COURSE_ADDRESS: string;
}

// function Review(props: MountainInfo) {                       // (1)
// 코스 정보 객체 받아오기. (백엔드 API가 완성되면 해결하기....)
function Review() {
  const navigate = useNavigate();

  const moveToPhotoPage = () => {
    // navigate("/photo/", { state: props });                   // (2)
    navigate("/photo/");
  };

  const [easy, setEasy] = useState(false);
  const [soso, setSoso] = useState(false);
  const [hard, setHard] = useState(false);

  function easyToggle() {
    console.log(easy);
    if (easy === false) setEasy(true);
    if (soso === true) setSoso(false);
    if (hard === true) setHard(false);

    setReview({
      ...review,
      reviewDiff: "E",
    });
  }

  function sosoToggle() {
    if (easy === false) setEasy(true);
    if (soso === false) setSoso(true);
    if (hard === true) setHard(false);

    setReview({
      ...review,
      reviewDiff: "N",
    });
  }

  function hardToggle() {
    if (easy === false) setEasy(true);
    if (soso === false) setSoso(true);
    if (hard === false) setHard(true);

    setReview({
      ...review,
      reviewDiff: "H",
    });
  }

  const [review, setReview] = useState({
    courseNo: 1,
    reviewTime: 60,
    reviewDiff: "", // E,N,M 순
    reviewContent: "",
  });

  const changeReview = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    type: any
  ) => {
    setReview({
      ...review,
      [type]: event.target.value,
    });

    console.log(review.reviewDiff + " " + review.reviewContent);
  };

  const apiReviewInsert = () => {
    if (review.reviewDiff !== "") {
      console.log(review);
      axios
        .post("/user/review/insert", {
          headers: {
            "X-ACCESS-TOKEN": sessionStorage.getItem("accessToken"),
            "X-REFRESH-TOKEN": sessionStorage.getItem("refreshToken"),
            // "X-ACCESS-TOKEN":
            //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlhdCI6MTY3OTg5NDYzNSwiZXhwIjoxNjc5ODk2NDM1LCJ1c2VyRW1haWwiOiJqaW53b29sZWU5NEBnbWFpbC5jb20ifQ.IiWCIy6LtNW0Vz90XC00gqVQU8AcOCiZUpzt9xO0hVBsjBWYZt9XENE4fmB_ENFolrM9Z2E_fZ_qJzKz0p3t6g",
            // "X-REFRESH-TOKEN":
            //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJpYXQiOjE2Nzk4OTQ2MzUsImV4cCI6MTY4MTEwNDIzNSwidXNlckVtYWlsIjoiamlud29vbGVlOTRAZ21haWwuY29tIn0.JHZeJqzZiEJ_EbpxL3XWpMbYPU3BK-cFK21bjlZTvohA5SrkaTCOaRFNLiiWucAycj2x_H2YYCyouyV-uOPuJA",
          },
          courseNo: Number(review.courseNo),
          reviewTime: Number(review.reviewTime),
          reviewDiff: review.reviewDiff,
          reviewContent: review.reviewContent,
        })
        .then((response) => {
          console.log("success");
          if (response.data) {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            moveToPhotoPage();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <StyledDiv>
      <Navbar />
      <StyledHeader>
        {/* 오늘 "...{props.COURSE_MT_NM}+{props.COURSE_MT_NO}" <br /> 등산은 어땠나요??        // (3) props로 넘겨받은 정보로 코스명을 보여주기 */}
        오늘 "..." <br /> 등산은 어땠나요??
      </StyledHeader>
      <StyledBox>
        <StyledContainer>
          <StyledButtonEasy onClick={easyToggle} easy={easy} />
          <StyledButtonSoso onClick={sosoToggle} soso={soso} />
          <StyledButtonHard onClick={hardToggle} hard={hard} />
        </StyledContainer>
      </StyledBox>
      <StyledTextBox
        rows={10}
        placeholder="등산 후기를 자유롭게 입력해주세요"
        value={review.reviewContent}
        onChange={(event) => {
          changeReview(event, "reviewContent");
        }}
      ></StyledTextBox>
      <StyledSubmitButton onClick={apiReviewInsert}>
        저장하기
      </StyledSubmitButton>
    </StyledDiv>
  );
}

const StyledDiv = styled.div``;

const StyledBox = styled.div`
  margin: 5% 0 5%;
`;

const StyledContainer = styled.div`
  padding: 0 10%;
  display: flex;
  font-weight: bold;
  font-family: "GmarketSansLight";
`;

const StyledHeader = styled.h1`
  margin-top: 25%;
  font-family: "GmarketSansLight";
  text-align: center;
  font-size: 6vw;
  padding: 4vw;
`;

const StyledTextBox = styled.textarea`
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  resize: none;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  font-family: "GmarketSansLight";
  text-align: center;
  font-weight: bold;
`;

const StyledSubmitButton = styled.button`
  width: 60%;
  margin-top: 10%;
  margin-left: 20%;
  height: 5vh;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: medium;
`;

export default Review;
