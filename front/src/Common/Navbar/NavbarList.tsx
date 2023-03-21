import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function NavbarList() {

  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main")
  }

  const moveToFilterMt = () => {
    navigate("/filtermt")
  }

  const moveToFilterRg = () => {
    navigate("/filterrg")
  }

  const moveToMypage = () => {
    navigate("/mypage")
  }
  return(
    <StyledUl>
      <StyledLi onClick={moveToMain}>홈으로</StyledLi>
      <StyledHr />
      <StyledLi onClick={moveToFilterMt}>산으로 추천받기</StyledLi>
      <StyledHr />
      <StyledLi onClick={moveToFilterRg}>지역으로 추천받기</StyledLi>
      <StyledHr />
      <StyledLi onClick={moveToMypage}>마이페이지</StyledLi>
      <StyledHr />
      <StyledLi>로그아웃</StyledLi>
    </StyledUl>
  )
}

const StyledUl = styled.ul`
  position: absolute;
  justify-content: end;
  border-bottom: 2px solid #D9D9D9;
  margin-top: 0px;
  padding-left: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
  background-color: white;
  width: 100%;
`

const StyledLi = styled.li`
  font-family: "GmarketSansMedium";
  font-size: 7vw;
  list-style: none;
  margin-top: 15px;
  margin-bottom: 15px;
`

const StyledHr = styled.hr`
  margin: 0px;
  width: 90%;
  border: 1px solid #E3E3E3;
`

export default NavbarList;