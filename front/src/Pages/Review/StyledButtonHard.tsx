import styled from "styled-components";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  hard: boolean;
}

function StyledButtonHard({ onClick, hard }: Props) {
  return (
    <StyledDiv>
      {hard === false ? (
        <StyledInnerdDiv>
          <img
            src={"/img/mountainEmpty.png"}
            alt="hard button"
            width={"60%"}
            onClick={onClick}
          />
        </StyledInnerdDiv>
      ) : (
        <StyledInnerdDiv>
          <img
            src={"/img/mountainFull.png"}
            alt="hard button"
            width={"60%"}
            onClick={onClick}
          />
        </StyledInnerdDiv>
      )}
      <StyledText>어려움</StyledText>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  /* padding-left: 10%; */
`;

const StyledInnerdDiv = styled.div`
  padding-top: 10%;
  text-align: center;
`;

const StyledText = styled.div`
  font-family: "GmarketSansLight";
  color: #f58e8e;
  text-align: center;
`;

export default StyledButtonHard;
