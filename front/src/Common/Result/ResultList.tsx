import ResultItem from "./ResultItem";
import styled from "styled-components";

function ResultList () {
  return (
    <StyledDiv>
      <ResultItem/>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`
export default ResultList;