import { useState } from "react";
import styled from "styled-components";
import HamBtn from "./HamBtn";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main");
    setToggleOn(!toggleOn);
  };

  const moveToFilterMt = () => {
    navigate("/filtermt");
    setToggleOn(!toggleOn);
  };

  const moveToFilterRg = () => {
    navigate("/filterrg");
    setToggleOn(!toggleOn);
  };

  const moveToMypage = () => {
    navigate("/mypage");
    setToggleOn(!toggleOn);
  };

  const [toggleOn, setToggleOn] = useState<boolean>(false);

  const openMenu = () => {
    setToggleOn(!toggleOn);
  };

  return (
    <div className="Navbar">
      <StyledDiv>
        <StyledImg
          onClick={moveToMain}
          className="logoImg"
          src="/img/logo2.png"
          alt="logo"
        />
        <HamBtn onClick={openMenu} />
      </StyledDiv>
      {toggleOn === true ? (
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
      ) : null}
    </div>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid #d9d9d9;
`;

const StyledImg = styled.img`
  margin-left: 8px;
  margin-top: 1px;
  height: 70px;
`;

const StyledUl = styled.ul`
  position: absolute;
  justify-content: end;
  border-bottom: 2px solid #d9d9d9;
  margin-top: 0px;
  padding-left: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
  background-color: white;
  width: 100%;
`;

const StyledLi = styled.li`
  font-family: "GmarketSansMedium";
  font-size: 7vw;
  list-style: none;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const StyledHr = styled.hr`
  margin: 0px;
  width: 90%;
  border: 1px solid #e3e3e3;
`;
export default Navbar;
