import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../Common/Navbar/Navbar";

function NotFound() {
  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main");
  };

  return (
    <div>
      <Navbar />
      <StyledP>검색 결과가 없습니다.</StyledP>
      <StyledImg src="\img\tthan_san.png" alt="tthan_san" />

      <StyledDiv>
        <StyledImg2 src="\img\crying.png" alt="crying" />
        <StyledP2>이 산이 아닌가벼...</StyledP2>
      </StyledDiv>

      <StyledButton onClick={moveToMain}>홈으로</StyledButton>
    </div>
  );
}

const StyledP = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 90px;
  font-family: "GmarketSansMedium";
  font-size: 30px;
`;

const StyledImg = styled.img`
  width: 70%;
  margin-left: 15%;
  border-radius: 5px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const StyledP2 = styled.p`
  font-family: "EF_jejudoldam";
  display: inline-block;
  justify-content: center;
  font-size: 25px;
  margin-top: 20px;
`;

const StyledImg2 = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 5px;
`;

const StyledButton = styled.button`
  width: 120px;
  height: 50px;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  background-color: #248c48;
  color: white;
  border: none;
  border-radius: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 120px;
  margin-top: 40px;
`;
export default NotFound;
