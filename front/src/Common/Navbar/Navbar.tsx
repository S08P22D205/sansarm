import { useState } from "react";
import styled from "styled-components";
import HamBtn from "./HamBtn";
import { useNavigate } from "react-router-dom";
import NavbarList from "./NavbarList";

function Navbar() {
  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main");
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
      {toggleOn === true ? <NavbarList /> : null}
    </div>
  );
}

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  background-color: white;
  margin-right: 2px;
  padding: 0;
  border-bottom: 2px solid #d9d9d9;
`;

const StyledImg = styled.img`
  margin-left: 8px;
  margin-top: 1px;
  height: 70px;
`;

export default Navbar;
