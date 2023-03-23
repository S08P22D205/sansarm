
import React from 'react';
import styled from "styled-components";

import "./SignUp2.css";
import SearchBar from "./Components/SearchBar";
import ExperienceList from "./Components/ExperienceList";

function SignUp2() {
  return (
    <div className="SignUp2">
      <h1>Navbar is here</h1>
      <div className="SignUp2Title">
        <p>최근 1년 내 다녀온</p>
        <p>등산 경험을 입력해주세요.</p>
      </div>
      <SearchBar />
      <br />
      <ExperienceList />
      <ExperienceList />
      <ExperienceList />
      <ExperienceList />
      <br />
      <SubmitBtn>완료</SubmitBtn>
    </div>
  );
}

export default SignUp2;



const SubmitBtn = styled.button`
 width : 50vw;
 height : 20vw;
 border-radius : 20px;
 background-color : #238C47;
 font-size : 12vw;
 color : white;
 margin-top : 10vw;
 float: right;
 margin-right : 10vw;
 margin-bottom : 5vw;
`