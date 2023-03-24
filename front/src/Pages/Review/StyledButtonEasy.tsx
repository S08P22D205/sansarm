import styled from "styled-components";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  easy: boolean;
}

function StyledButtonEasy({ onClick, easy }: Props) {
  return (
    <StyledDiv>
      {easy === false ? (
        <StyledInnerDiv>
          <img
            src={"/img/mountainEmpty.png"}
            alt="easy button"
            width={"60%"}
            onClick={onClick}
          />
        </StyledInnerDiv>
      ) : (
        <StyledInnerDiv>
          <img
            src={"/img/mountainFull.png"}
            alt="easy button"
            width={"60%"}
            onClick={onClick}
          />
        </StyledInnerDiv>
      )}
      <StyledText>쉬움</StyledText>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  /* padding-left: 10%; */
`;

const StyledInnerDiv = styled.div`
  padding-top: 10%;
  text-align: center;
  font-family: "GmarketSansLight";
`;

const StyledText = styled.div`
  font-family: "GmarketSansLight";
  text-align: center;
  color: #8ce090;
`;

export default StyledButtonEasy;
