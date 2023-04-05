import { useEffect, useState } from "react";
import axios from "../../store/baseURL.js";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyExpMapKakaoMap from './MyExpMapKakaoMap'

interface expMtCoords {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: number[];
  courseYCoords?: number[];
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewRelDiff?: string;
  reviewContent?: string;
}


function MyExpMap() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // const [courseXCoords, setCourseXCoords] = useState<number[]>([]);
  // const [courseYCoords, setCourseYCoords] = useState<number[]>([]);
  // const courseXCoords : Array<number|undefined> = [];
  // const courseYCoords : Array<number|undefined> = [];
  const courseXCoords:number[] = []
  const courseYCoords:number[] = []

  useEffect(() => {
    const getExpMtList = async () => {
      const res = await axios.get("/user/review", {
        headers: {
          "X-ACCESS-TOKEN": accessToken,
          "X-REFRESH-TOKEN": refreshToken,
        },
      });
      // console.log(res.data.reviewCourses)
      const length =res.data.reviewCourses.length;
      for (let i = 0; i < length; i++) {
        courseXCoords.push(res.data.reviewCourses[i].courseXCoords.slice(-1))
        courseYCoords.push(res.data.reviewCourses[i].courseYCoords.slice(-1))
        // console.log(res.data.reviewCourses[i].courseXCoords.slice(-1))
      }
      // console.log(courseXCoords, courseYCoords)


      // res.data.reviewCourses.map((review:any) => (
      //   courseXCoords.push(review.courseXCoords[-1])
      // ))
      // res.data.reviewCourses.map((review:any) => (
      //   courseYCoords.push(review.courseYCoords[-1])
      // ))
      // console.log(courseXCoords, courseYCoords)

    };
    getExpMtList();
    // console.log(courseXCoords, courseYCoords)
  }, []);


  return (
    <div className="MyExpMap">
      <StyledTab>
        <StyledLink to="/mypage/myheart">
          <StyledIcon src="/img/heart_black.png" />
        </StyledLink>
        <StyledLink to="/mypage/myreview">
          <StyledIcon2 src="/img/flag_black.png" />
        </StyledLink>
        <StyledLink to="/mypage/myexpmap">
          <StyledIcon2 src="/img/map_green.png" />
        </StyledLink>
      </StyledTab>
      <StyledDiv>
        <MyExpMapKakaoMap courseXCoords={courseXCoords} courseYCoords={courseYCoords}/>
      </StyledDiv>
    </div>
  )
      
}
export default MyExpMap;

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
  padding-left: 23vw;
  padding-right: 15vw;
  margin-top: 5vw;
  font-family: "GmarketSansLight";
`;
