import Navbar from "../../Common/Navbar/Navbar";
import Kakaomap from "./Kakaomap";
import styled from "styled-components";

function CourseDetail() {
  return (
    <div className="CourseDetail">
      <Navbar />
      <Kakaomap />

      <StyledDiv>
        <StyledTitle>등산코스명</StyledTitle>
        <StyledContent>코스 길이 : </StyledContent>
        <StyledContent>하행 시간 : </StyledContent>
        <StyledContent>상행 시간 : </StyledContent>
      </StyledDiv>

      <StyledBtn>등산 시작하기</StyledBtn>
    </div>
  );
}

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
`;

const StyledTitle = styled.p`
  font-family: "GmarketSansMedium";
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
  width: 75%;
  height: 50px;
  margin-left: 12.5%;
  margin-top: 20px;
`;

export default CourseDetail;
