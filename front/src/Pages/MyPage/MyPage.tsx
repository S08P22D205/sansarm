import { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { userApi } from "../../api";
import MyHeart from "./MyHeart";
import MyReview from "./MyReview";
import MyMap from "./MyMap";

const StyledH2 = styled.h2`
  padding-top: 8vw;
  padding-left: 5vw;
  margin: 0px;
  font-family: "GmarketSansMedium";
  font-size: 6vw;
  margin-bottom: 5px;
`;

function MyPage() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 유저이름 state에 담아서 사용해주기 -> 나중에 시간 남으면 store에 유저정보 저장해주면 좋을듯
  const [userName, setUserName] = useState<string>("");

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 현재 로그인한 유저정보 받아오는 코드
    const getUserInfo = async () => {
      const res = await userApi.userInfo(accessToken, refreshToken);
      setUserName(res.data.userNicknm);
    };
    getUserInfo();
  }, []);

  return (
    <div className="MyPage">
      <StyledH2>{userName}님의 등산기록</StyledH2>
      <Routes>
        <Route path="/myheart" element={<MyHeart />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/mymap" element={<MyMap />} />
      </Routes>
    </div>
  );
}

export default MyPage;
