import { useEffect, useState } from "react";
import axios from "../../store/baseURL.js";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding-left: 20vw;
  padding-right: 12vw;
  margin-top: 5vw;
  font-family: "GmarketSansLight";
`;

const StyledH3 = styled.h3`
  margin-top: 4vw;
  margin-bottom: 3vw;
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
`;

const StyledP1 = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
`;

const ReviewCard = styled.div`
  border: 1px solid #d4d3d3;
  border-radius: 8px;
  padding-left: 18px;
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
  reviewContent?: string;
}

function MyPage() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const [reviewCourses, setReviewCourses] = useState<courseInfo[]>([{}]);

  useEffect(() => {
    const getReviewCourse = async () => {
      const res = await axios.get("/user/review", {
        headers: {
          "X-ACCESS-TOKEN": accessToken,
          "X-REFRESH-TOKEN": refreshToken,
        },
      });
      setReviewCourses(res.data.reviewCourses);
    };
    getReviewCourse();
  }, []);

  return (
    <div className="MyPage">
      <StyledDiv>
        <div>
          {reviewCourses.map((review, idx) => (
            <ReviewCard key={idx}>
              <StyledH3>{review.reviewDate?.toString()}</StyledH3>
              <StyledHr />
              <StyledP>
                {review.courseMtNm} {review.courseMtNo}코스{" "}
                {review.courseAbsDiff === "H" ? (
                  <span>⭐⭐⭐</span>
                ) : review.courseAbsDiff === "N" ? (
                  <span>⭐⭐</span>
                ) : (
                  <span>⭐</span>
                )}
              </StyledP>
              <StyledP1>
                소요시간{" "}
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
        </div>
      </StyledDiv>
    </div>
  );
}

export default MyPage;
