import styled from "styled-components";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4vw;
  text-align: left;
`;

const StyledCard = styled.div`
  width: 30vw;
  height: 7vw;
  background-color: #cfe2c8;
`;

function ListItem() {
  return (
    <div className="ListItem">
      <StyledH>20대 여성분들이 선호하는 코스</StyledH>
      <div>
        <StyledCard></StyledCard>
        <StyledCard></StyledCard>
        <StyledCard></StyledCard>
      </div>
    </div>
  );
}

export default ListItem;
