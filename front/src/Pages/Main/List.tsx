import styled from "styled-components";
import ListItem from "./ListItem";

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4.5vw;
`;

function List() {
  return (
    <StyledDiv className="List">
      <StyledH>김머끄님을 위한 추천코스</StyledH>
      <ListItem />
    </StyledDiv>
  );
}

export default List;
