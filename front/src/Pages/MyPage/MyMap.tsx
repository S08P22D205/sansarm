import { useEffect, useState } from "react";
import axios from "../../store/baseURL.js";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { reviewInfo } from "./MyReview.js";
import MyKakaoMap from "./MyKakaoMap";
// import MyExpMapKakaoMap from './MyExpMapKakaoMap'

export interface mtInfo {
  courseXCoords: number;
  courseYCoords: number;
  courseMtNm: string;
  courseMtNo: number;
  courseNo: number;
}

function MyMap() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const [ExpMtInfo, setExpMtInfo] = useState<Array<mtInfo>>([]);

  useEffect(() => {
    const getExpMtList = async () => {
      const res = await axios.get("/user/review", {
        headers: {
          "X-ACCESS-TOKEN": accessToken,
          "X-REFRESH-TOKEN": refreshToken,
        },
      });
      // console.log("리뷰내용", res.data.reviewCourses);
      const length = res.data.reviewCourses.length;
      for (let i = 0; i < length; i++) {
        const Coordslen = res.data.reviewCourses[i].courseXCoords.length;
        const XCoords = res.data.reviewCourses[i].courseXCoords[Coordslen - 1];
        const YCoords = res.data.reviewCourses[i].courseYCoords[Coordslen - 1];
        const MtName = res.data.reviewCourses[i].courseMtNm;
        const CourseMtNo = res.data.reviewCourses[i].courseMtNo;
        const CourseNo = res.data.reviewCourses[i].courseNo;
        const MtInfo: mtInfo = {
          courseXCoords: XCoords,
          courseYCoords: YCoords,
          courseMtNm: MtName,
          courseMtNo: CourseMtNo,
          courseNo: CourseNo,
        };
        setExpMtInfo(prevInfo => [...prevInfo, MtInfo]);
      }
    };
    getExpMtList();
    // console.log(courseXCoords, courseYCoords)
  }, []);

  return (
    <StyledMyMap className="MyExpMap">
      <StyledTab>
        <StyledLink to="/mypage/myheart">
          <StyledIcon src="/img/heart_black.png" />
        </StyledLink>
        <StyledLink to="/mypage/myreview">
          <StyledIcon2 src="/img/flag_black.png" />
        </StyledLink>
        <StyledLink to="/mypage/mymap">
          <StyledIcon2 src="/img/map_green.png" />
        </StyledLink>
      </StyledTab>
      <StyledDiv>
        <MyKakaoMap ExpMtInfo={ExpMtInfo} />
        {/* <MyExpMapKakaoMap XCoords={XCoords} YCoords={YCoords} Mtname={Mtname} CourseNo={CourseNo}/> */}
      </StyledDiv>
    </StyledMyMap>
  );
}
export default MyMap;

const StyledMyMap = styled.div`
  height: 100%;
`;

const StyledTab = styled.div`
  padding-top: 3vw;
  padding-bottom: 3vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
`;

const StyledIcon = styled.img`
  width: 10vw;
`;

const StyledIcon2 = styled.img`
  width: 9vw;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledDiv = styled.div`
  width: 100vw;
  height: 65vh;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-top: 3vh;
  font-family: "GmarketSansLight";
`;
