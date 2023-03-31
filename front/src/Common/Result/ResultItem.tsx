import styled from "styled-components";

interface ResultInfo {
  COURSE_NO: number;
  COURSE_MT_CD: string;
  COURSE_MT_NM: string;
  COURSE_MT_NO: number;
  COURSE_ELEV_DIFF: number;
  COURSE_UPTIME: number;
  COURSE_DOWNTIME: number;
  COURSE_LENGTH: number;
  COURSE_LOCATION: string;
  COURSE_ADDRESS: string;
}

function ResultItem({
  COURSE_NO,
  COURSE_MT_CD,
  COURSE_MT_NM,
  COURSE_MT_NO,
  COURSE_ELEV_DIFF,
  COURSE_UPTIME,
  COURSE_DOWNTIME,
  COURSE_LENGTH,
  COURSE_LOCATION,
  COURSE_ADDRESS,
}: ResultInfo) {
  return (
    <StyledDiv>
      <StyledImg src="\img\mt2.png.png" alt="mt" />
      <StyledDiv2>
        <StyledP>
          코스 이름 : {COURSE_MT_NM} {COURSE_MT_NO}코스
        </StyledP>
        <StyledP>코스 길이 : {COURSE_LENGTH} km</StyledP>
        <StyledP>산행 시간 : {COURSE_UPTIME + COURSE_DOWNTIME} 시간</StyledP>
      </StyledDiv2>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  border: 1px gray solid;
  padding: 5px;
  margin-top: 20px;
  border-radius: 15px;
`;

const StyledDiv2 = styled.div`
  margin-left: 25px;
`;

const StyledImg = styled.img`
  height: 70px;
`;
const StyledP = styled.p`
  font-family: "GmarketSansLight";
  margin: 0;
`;
export default ResultItem;
