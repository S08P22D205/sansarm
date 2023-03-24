import styled from "styled-components";
import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function Kakaomap() {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(36.1074, 128.4151), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <StyledMap id="map">
      <h3>카카오지도</h3>
    </StyledMap>
  );
}

const StyledMap = styled.div`
  margin-left: 10%;
  margin-top: 50px;
  width: 80%;
  height: 200px;
  border-radius: 5px;
`;
export default Kakaomap;
