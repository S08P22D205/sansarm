import Navbar from "../../Common/Navbar/Navbar";
import Kakaomap from "./Kakaomap";
import styled from "styled-components";
import { useNavigate } from "react-router";
import ReviewList from "./ReviewList";

function CourseDetail() {
  const navigate = useNavigate();

  const moveToHiking = () => {
    navigate("/hiking");
  };
  return (
    <div className="CourseDetail">
      <Navbar />
      <StyledDiv>
        <StyledTitle>등산코스명</StyledTitle>
      </StyledDiv>
      <Kakaomap />

      <StyledDiv2>
        <StyledContent>코스 길이 : </StyledContent>
        <StyledContent>하행 시간 : </StyledContent>
        <StyledContent>상행 시간 : </StyledContent>
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
  margin: 3px;
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
