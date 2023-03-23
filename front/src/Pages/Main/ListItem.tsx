import styled from "styled-components";
import { ItemInfo } from "../../store/mainSlice";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4vw;
  text-align: left;
`;

const StyledDiv = styled.div`
  display: flex;
`;

const StyledCard = styled.div`
  width: 30vw;
  height: 22vw;
  background-color: #cfe2c8;
  border: none;
  border-radius: 5px;
`;

function ListItem({ userAge, userGender, courses }: ItemInfo) {
  return (
    <div className="ListItem">
      <StyledH>20대 여성분들이 선호하는 코스</StyledH>
      <StyledDiv>
        {courses.map(course => (
          <StyledCard key={course}>{course}</StyledCard>
        ))}
      </StyledDiv>
    </div>
  );
}

export default ListItem;
