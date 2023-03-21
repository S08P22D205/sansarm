import styled from "styled-components";

interface ResultInfo {
  id: number; 
  mt_nm: string; 
  course_diff: number; 
  course_length: number; 
  course_time: number; 
}

function ResultItem ({mt_nm, course_diff, course_length, course_time} :ResultInfo) {
  return (
    <StyledDiv>
      <StyledImg src="\img\mt2.png.png" alt="mt" />
      <StyledDiv2>
        <StyledP>산 이름 : {mt_nm}</StyledP>
        <StyledP>난이도 : {course_diff}</StyledP>
        <StyledP>코스 길이 : {course_length} km</StyledP>
        <StyledP>산행 시간 : {course_time} 시간</StyledP>
      </StyledDiv2>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  border: 1px gray solid;
  padding: 10px;
  margin-top: 20px;
  border-radius: 15px;
`

const StyledDiv2 = styled.div`
  margin-left: 25px;
`

const StyledImg = styled.img`
  height: 70px;
`
const StyledP = styled.p`
  font-family: "GmarketSansLight";
  margin: 0;
`
export default ResultItem;