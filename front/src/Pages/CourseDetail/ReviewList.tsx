import { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import styled from "styled-components";
import axios from "axios";

interface idInfo {
  id: string;
}

interface reviewInfo {
  reviewerNicknm?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewContent?: string;
}

function ReviewList({ id }: idInfo) {
  // access token, refresh token 가져오기
  const AccessToken = sessionStorage.getItem("accessToken");
  const RefreshToken = sessionStorage.getItem("refreshToken");

  const [reviewList, setReviewList] = useState<reviewInfo>({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/review/${id}`, {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
        params: {
          courseNo: id,
        },
      })
      .then((res) => {
        console.log("리뷰 정보 받아오기 :: 성공!");
        console.log(res.data);
        setReviewList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <StyledHr />
      <ReviewItem />
    </div>
  );
}

const StyledHr = styled.hr`
  width: 90%;
  border: 2px solid #ececec;
`;

export default ReviewList;
