import ResultItem from "./ResultItem";
import styled from "styled-components";
import dummy from "../../dummy.json";

function ResultList () {

  return (
    <StyledDiv>
      {dummy.data.map(data => {
        return <ResultItem key={data.id} id={data.id} mt_nm={data.mt_nm} course_diff={data.course_diff} course_length={data.course_length} course_time={data.course_time}/>
      })}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`
export default ResultList;