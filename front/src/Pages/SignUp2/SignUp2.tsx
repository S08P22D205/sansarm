import React from 'react';
import "./SignUp2.css";
import SearchBar from './Components/SearchBar';
import ExperienceList from './Components/ExperienceList';


function SignUp2() {
  return (
    <div className="SignUp2">
      <h1>Navbar is here</h1>
      <div className='SignUp2Title'>
        <p>최근 1년 내 다녀온</p><p>등산 경험을 입력해주세요.</p>
      </div>
      <SearchBar />
      <ExperienceList />
    </div>
  );
}

export default SignUp2;
