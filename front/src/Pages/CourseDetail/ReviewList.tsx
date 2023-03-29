import ReviewItem from "./ReviewItem";
import styled from "styled-components";

function ReviewList() {
  return (
    <div>
      <StyledHr />
      <ReviewItem />
      <ReviewItem />
    </div>
  );
}

const StyledHr = styled.hr`
  width: 90%;
  border: 2px solid #ececec;
`;

export default ReviewList;
