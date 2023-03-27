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
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 선을 그릴 좌표들
    var linePath = [
      new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
      new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
      new kakao.maps.LatLng(33.45178067090639, 126.5726886938753),
    ];

    // 선에 대한 css
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "#e72a00", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    polyline.setMap(map);
  }, []);

  return (
    <StyledMap id="map">
      <h3>카카오지도</h3>
    </StyledMap>
  );
}

const StyledMap = styled.div`
  margin-left: 10%;
  margin-top: 10px;
  width: 80%;
  height: 200px;
  border-radius: 5px;
`;
export default Kakaomap;
