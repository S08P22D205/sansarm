import styled from "styled-components";
import { ItemInfo } from "../../store/mainSlice";
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
  /* height: 30vw; */
  background-color: #f0f5ee;
  border: none;
  border-radius: 5px;
`;

function ListItem({ courseName, userAge, userGender, courseList }: ItemInfo) {
  return (
    <div className="ListItem">
      {userAge && userGender ? (
        <StyledH>
          {userAge}대 {userGender}분들이 선호하는 코스
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
        {courseList.map(course => (
          <StyledSlide key={course.courseNo}>
            <ListCard
              courseMtNm={course.courseMtNm}
              courseMtNo={course.courseMtNo}
              courseMtCd={course.courseMtCd}
            />
          </StyledSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ListItem;
