import styled from "styled-components";

function ReviewItem() {
  return (
    <StyledDiv>
      <StyledDiv2>
        <StyledP>김머끄</StyledP>
        <br />
        <StyledImg src="\img\mountain.png" alt="mt" />
        <StyledImg src="\img\mountain.png" alt="mt" />
        <StyledImg src="\img\mountain.png" alt="mt" />
      </StyledDiv2>
      <StyledDiv3>
        <StyledP2>
          프로젝트 팀원들과 함께 다녀왔습니다! 머리끄댕이 많이 잡고왔습니다.
          추천 기능이 좋네요^^
        </StyledP2>
        <StyledDiv4>
          <StyledButton>수정</StyledButton>
          <StyledButton>삭제</StyledButton>
        </StyledDiv4>
      </StyledDiv3>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  margin-left: 5%;
  border-radius: 15px;
  background-color: #cfe2c8;
  margin-top: 20px;

  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid pink;
    position: absolute;
    top: -10px;
    left: 200px;
  }
`;

const StyledDiv2 = styled.div`
  width: 25%;
  margin-top: 20px;
  margin-left: 10px;
  padding: 0px;
`;

const StyledP = styled.p`
  display: inline;
  font-family: "GmarketSansMedium";
  font-size: large;
  margin-left: 8px;
  padding-left: 3px;
  padding-right: 0px;
`;

const StyledImg = styled.img`
  width: 25px;
`;

const StyledDiv3 = styled.div`
  width: 70%;
`;

const StyledP2 = styled.p`
  font-family: "GmarketSansLight";
  font-size: 13px;
`;

const StyledDiv4 = styled.div`
  display: block;
  justify-items: end;
`;
const StyledButton = styled.button`
  width: 30%;
  height: 30px;
  font-family: "GmarketSansMedium";
  background-color: #408c25;
  color: white;
  border: 0;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export default ReviewItem;
