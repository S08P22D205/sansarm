import styled from "styled-components";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface ExpInfo {
  XCoords: number[];
  YCoords: number[];
  Mtname: string[];
  CourseNo: number[];
}

const { kakao } = window;

function MyExpMapKakaoMap({ XCoords, YCoords, Mtname, CourseNo }: ExpInfo) {
  // const dispatch = useAppDispatch();
  // const [courseMap, setCourseMap] = useState<any>();

  // console.log(courseMap);
  console.log('받아옴' ,XCoords, YCoords, Mtname, CourseNo)


  useEffect(() => {
    const length = XCoords.length;
  
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
          center: new kakao.maps.LatLng(36.1039, 127.9672), // 지도의 중심좌표
          level: 13 // 지도의 확대 레벨
      };
  
    var map = new kakao.maps.Map(mapContainer, mapOption);
  
    var imageSrc = '/img/flag_red.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(30, 35), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(0, 0)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    

    const ExpPoint = (
      XCoords: number[],
      YCoords: number[],
      Mtname: string[],
      CourseNo: number[],
      ) => {
        for (let i = 0; i < length; i++) {
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng(XCoords[i], YCoords[i]); // 마커가 표시될 위치입니다
        
        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage // 마커이미지 설정 
        });
        
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        
        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        let content = '<div class="customoverlay">' +
            `    <span class="title">${Mtname[i]} ${CourseNo[i]}코스</span>` +
            '</div>';
        
        // 커스텀 오버레이가 표시될 위치입니다 
        let position = new kakao.maps.LatLng(XCoords[i], YCoords[i]);  
        
        // 커스텀 오버레이를 생성합니다
        let customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: position,
            content: content,
            yAnchor: 1 
        });

        console.log('for', XCoords[i], YCoords[i], Mtname[i],CourseNo[i])
      }
      console.log('작동',XCoords, YCoords, Mtname, CourseNo)
    }
    
    ExpPoint(XCoords, YCoords, Mtname, CourseNo)

  }, []);


  return <StyledMap id="map" />;
}

const StyledMap = styled.div`
  // margin-left: 5vw;
  margin-top: 10px;
  width: 90vw;
  height: 150vw;
  border-radius: 5px;
  /* z-index: -1; */
`;
export default MyExpMapKakaoMap;
