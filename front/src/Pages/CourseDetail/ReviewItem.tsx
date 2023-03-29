import styled from "styled-components";

interface reviewInfo {
  reviewerNicknm?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewContent?: string;
  reviewRelDiff?: string;
}

function ReviewItem({
  reviewerNicknm,
  reviewDate,
  reviewTime,
  reviewContent,
  reviewRelDiff,
}: reviewInfo) {
  return (
    <StyledDiv>
      <StyledDiv2>
        <StyledP>{reviewerNicknm}</StyledP>
        <br />
        {reviewRelDiff === "E" ? (
          <div>
            <StyledImg src="\img\filled_mt.png" alt="mt" />
            <StyledImg src="\img\unfilled_mt.png" alt="mt" />
            <StyledImg src="\img\unfilled_mt.png" alt="mt" />
          </div>
        ) : reviewRelDiff === "N" ? (
          <div>
            <StyledImg src="\img\filled_mt.png" alt="mt" />
            <StyledImg src="\img\filled_mt.png" alt="mt" />
            <StyledImg src="\img\unfilled_mt.png" alt="mt" />
          </div>
        ) : (
          <div>
            <StyledImg src="\img\filled_mt.png" alt="mt" />
            <StyledImg src="\img\filled_mt.png" alt="mt" />
            <StyledImg src="\img\filled_mt.png" alt="mt" />
          </div>
        )}
      </StyledDiv2>
      <StyledDiv3>
        <StyledP2>{reviewContent}</StyledP2>
        <StyledDiv4>
          <StyledButton>수정</StyledButton>
          <StyledButton>삭제</StyledButton>
        </StyledDiv4>
      </StyledDiv3>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  width: 92%;
  margin-left: 4%;
  border-radius: 15px;
  background-color: #cfe2c8;
  margin-top: 20px;
`;

const StyledDiv2 = styled.div`
  width: 25%;
  margin-top: 15px;
  margin-left: 10px;
  padding: 0px;
`;

const StyledP = styled.p`
  display: inline;
  text-align: center;
  font-family: "GmarketSansMedium";
  font-size: large;
  padding-left: 3px;
  padding-right: 0px;
`;

const StyledImg = styled.img`
  width: 23px;
  margin-right: 3px;
`;

const StyledDiv3 = styled.div`
  width: 70%;
`;

const StyledP2 = styled.p`
  font-family: "GmarketSansLight";
  font-size: 13px;
  margin-left: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const StyledDiv4 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2%;
`;
const StyledButton = styled.button`
  width: 25%;
  height: 20px;
  font-family: "GmarketSansMedium";
  font-size: small;
  background-color: #408c25;
  color: white;
  border: 0;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export default ReviewItem;
