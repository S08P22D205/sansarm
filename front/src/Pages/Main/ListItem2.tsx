import styled from "styled-components";
import { RecInfo } from "../../store/RecommendSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import ListCard from "./ListCard";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4vw;
  text-align: left;
  margin-bottom: 5px;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 30vw;
  background-color: #f0f5ee;
  border: none;
  border-radius: 5px;
  margin-bottom: 3vw;
`;

function ListItem2({
  courseName,
  USER_AGE_POOL,
  USER_GENDER,
  COURSE_LIST,
}: RecInfo) {
  return (
    <div className="ListItem">
      {USER_AGE_POOL && USER_GENDER ? (
        <StyledH>
          {USER_AGE_POOL}대{" "}
          {USER_GENDER === "F" ? <span>여성</span> : <span>남성</span>}분들이
          선호하는 코스
        </StyledH>
      ) : (
        <StyledH>{courseName}</StyledH>
      )}
      <Swiper
        modules={[FreeMode]}
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        freeMode={true}
      >
        {COURSE_LIST.map(course => (
          <StyledSlide key={course.COURSE_NO}>
            <ListCard
              courseMtNm={course.COURSE_MT_NM}
              courseMtNo={course.COURSE_MT_NO}
              courseMtCd={course.COURSE_MT_CD}
            />
          </StyledSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ListItem2;
