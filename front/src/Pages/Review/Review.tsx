import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import StyledButtonEasy from "./StyledButtonEasy";
import StyledButtonSoso from "./StyledButtonSoso";
import StyledButtonHard from "./StyledButtonHard";
import axios from "../../store/baseURL.js";

interface courseInfo {
  // props 타입.
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
  reviewContent?: string;
}

// function Review(props: courseInfo) {                       // (1)
// 코스 정보 객체 받아오기. (백엔드 API가 완성되면 해결하기....)
function Review() {
  const navigate = useNavigate();

  // props로 넘긴 courseData, time의 state를 location이라는 변수에 담는다.
  const location = useLocation();

  const moveToPhotoPage = () => {
    // navigate("/photo/", { state: props });                   // (2)
    // navigate("/photo/");
    navigate("/mypage")
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
    courseNo: location.state.courseData.courseNo,
    reviewTime: Math.floor(location.state.time / 60000),
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
      console.log(sessionStorage.getItem("accessToken"));
      axios
        .post(
          "/user/review/insert",
          {
            courseNo: Number(review.courseNo),
            reviewTime: Number(review.reviewTime),
            reviewDiff: review.reviewDiff,
            reviewContent: review.reviewContent,
          },
          {
            headers: {
              "X-ACCESS-TOKEN": sessionStorage.getItem("accessToken"),
              "X-REFRESH-TOKEN": sessionStorage.getItem("refreshToken"),
            },
          }
        )
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
      <StyledHeader>
        {/* 오늘 "...{props.courseMtNm}+{props.courseMtNo}" <br /> 등산은 어땠나요??        // (3) props로 넘겨받은 정보로 코스명을 보여주기 */}
        오늘 "{location.state.courseData.courseMtNm}&nbsp;
        {location.state.courseData.courseMtNo}코스" <br /> 등산은 어땠나요??
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
