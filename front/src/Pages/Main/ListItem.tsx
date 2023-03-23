import styled from "styled-components";
import { ItemInfo } from "../../store/mainSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4vw;
  text-align: left;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 30vw;
  height: 22vw;
  background-color: #cfe2c8;
  border: none;
  border-radius: 5px;
`;

function ListItem({ userAge, userGender, courseList }: ItemInfo) {
  return (
    <div className="ListItem">
      <StyledH>20대 여성분들이 선호하는 코스</StyledH>
      <StyledDiv>
        <Swiper
          modules={[FreeMode]}
          spaceBetween={10}
          slidesPerView={3}
          loop={true}
          freeMode={true}
        >
          {courseList.map(course => (
            <StyledSlide key={course}>{course}</StyledSlide>
          ))}
        </Swiper>
      </StyledDiv>
    </div>
  );
}

export default ListItem;
