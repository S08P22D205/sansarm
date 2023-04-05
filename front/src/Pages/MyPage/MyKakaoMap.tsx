import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mtInfo } from "./MyMap";

function MyKakaoMap(props: { ExpMtInfo: mtInfo[] }) {
  const navigate = useNavigate();
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(36.1039, 127.9672), // 지도의 중심좌표
      level: 13,
    };
    const map = new window.kakao.maps.Map(container, options);

    let imageSrc = "/img/flag_red.png",
      imageSize = new window.kakao.maps.Size(30, 35),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) };
    let markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    props.ExpMtInfo.forEach(info => {
      const maker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          info.courseXCoords,
          info.courseYCoords
        ),
        image: markerImage,
        clickable: true,
      });
      window.kakao.maps.event.addListener(maker, "click", function () {
        navigate(`/coursedetail/${info.courseNo}`);
      });
      // new window.kakao.maps.CustomOverlay({
      //   map: map,
      //   position: new window.kakao.maps.LatLng(
      //     info.courseXCoords,
      //     info.courseYCoords
      //   ),
      //   content:
      //     '<div class="customoverlay">' +
      //     `<a href="https://j8d205.p.ssafy.io/coursedetail/${info.courseNo}">` +
      //     `<span class="${info.courseMtNm}">${info.courseMtNm}</span>` +
      //     "</a>" +
      //     "</div>",
      //   yAnchor: 1,
      // });
    });

    // for (let i = 0; i < InfoLength; i++) {
    //   console.log("프롭스", ExpMtInfo[i]);
    //   let imageSrc = "/img/flag_red.png",
    //     imageSize = new window.kakao.maps.Size(30, 35),
    //     imageOption = { offset: new window.kakao.maps.Point(27, 69) };

    //   let markerImage = new window.kakao.maps.MarkerImage(
    //     imageSrc,
    //     imageSize,
    //     imageOption
    //   );
    //   new window.kakao.maps.Marker({
    //     map: map,
    //     position: new window.kakao.maps.Lating(
    //       props.ExpMtInfo[i].courseXCoords,
    //       props.ExpMtInfo[i].courseYCoords
    //     ),
    //     image: markerImage,
    //     title:
    //       props.ExpMtInfo[i].courseMtNm +
    //       " " +
    //       props.ExpMtInfo[i].courseMtNo +
    //       "코스",
    //   });
    // }
  }, [props.ExpMtInfo]);

  //   const createMap = () => {
  //     let container = document.getElementById("map");
  //     let options = {
  //       center: new window.kakao.maps.LatLng(36.1039, 127.9672), // 지도의 중심좌표
  //       level: 13,
  //     };

  //     // 지도
  //     const map = new window.kakao.maps.Map(container, options);

  //     const InfoLength = ExpMtInfo.length;
  //     console.log(InfoLength);

  //     ExpMtInfo.forEach(info => {
  //       console.log(info);
  //       new window.kakao.maps.Marker({
  //         map: map,
  //         position: new window.kakao.maps.Lating(
  //           info.courseXCoords,
  //           info.courseYCoords
  //         ),
  //       });
  //     });
  //   };
  //     for (let i = 0; i < InfoLength; i++) {
  //       console.log("프롭스", ExpMtInfo[i]);
  //   }
  //   useEffect(() => {
  //     const length = XCoords.length;

  //     var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  //     mapOption = {
  //           center: new kakao.maps.LatLng(36.1039, 127.9672), // 지도의 중심좌표
  //           level: 13 // 지도의 확대 레벨
  //       };

  //     var map = new kakao.maps.Map(mapContainer, mapOption);

  //     var imageSrc = '/img/flag_red.png', // 마커이미지의 주소입니다
  //         imageSize = new kakao.maps.Size(30, 35), // 마커이미지의 크기입니다
  //         imageOption = {offset: new kakao.maps.Point(0, 0)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  //     const ExpPoint = (
  //       XCoords: number[],
  //       YCoords: number[],
  //       Mtname: string[],
  //       CourseNo: number[],
  //       ) => {
  //         for (let i = 0; i < length; i++) {
  //         // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  //         let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  //             markerPosition = new kakao.maps.LatLng(XCoords[i], YCoords[i]); // 마커가 표시될 위치입니다

  //         // 마커를 생성합니다
  //         let marker = new kakao.maps.Marker({
  //           position: markerPosition,
  //           image: markerImage // 마커이미지 설정
  //         });

  //         // 마커가 지도 위에 표시되도록 설정합니다
  //         marker.setMap(map);

  //         // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  //         let content = '<div class="customoverlay">' +
  //             `    <span class="title">${Mtname[i]} ${CourseNo[i]}코스</span>` +
  //             '</div>';

  //         // 커스텀 오버레이가 표시될 위치입니다
  //         let position = new kakao.maps.LatLng(XCoords[i], YCoords[i]);

  //         // 커스텀 오버레이를 생성합니다
  //         let customOverlay = new kakao.maps.CustomOverlay({
  //             map: map,
  //             position: position,
  //             content: content,
  //             yAnchor: 1
  //         });

  //         console.log('for', XCoords[i], YCoords[i], Mtname[i],CourseNo[i])
  //       }
  //       console.log('작동',XCoords, YCoords, Mtname, CourseNo)
  //     }

  //     ExpPoint(XCoords, YCoords, Mtname, CourseNo)

  //   }, []);

  return <StyledMap id="map" />;
}

const StyledMap = styled.div`
  // margin-left: 5vw;
  margin-top: 10px;
  width: 90vw;
  /* height: 150vw; */
  height: 65%;
  border-radius: 5px;
  /* z-index: -1; */
`;
export default MyKakaoMap;
