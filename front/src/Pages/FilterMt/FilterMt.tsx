import React, {useState} from "react";
import styled from "styled-components"
import Navbar from "../../Common/Navbar/Navbar";
import ResultList from "../../Common/Result/ResultList";

function FilterMt() {

  const diff :string[] = ["전체", "쉬움", "보통", "어려움"];
  const time :string[] = ["전체", "1 미만", "1-2", "2 초과"];
  const length :string[] = ["전체", "1 미만", "1-3", "3-5", "5 초과"];

  // const [searchMt, setSearchMt] = useState({
  //   mt_nm : "",
  //   course_diff : 0,
  //   course_length: 0,
  //   course_time: 0
  // });

  return (
    <div className="FilterMt">
      <Navbar/>

      {/* 난이도 */}
      <StyledP>난이도</StyledP>
      <StyledDiff>
        {diff.map((data)=>{
          return (
            <StyledBtn>{data}</StyledBtn>
          )
        })}
      </StyledDiff>
      <StyledHr />

      {/* 산행 시간 */}
      <StyledP>산행 시간</StyledP>
      <StyledDiff>
        {time.map((data)=>{
          return (
            <StyledBtn>{data}</StyledBtn>
            )
          })}
      </StyledDiff>
      <StyledHr />

      {/* 코스 길이 */}
      <StyledP>코스 길이</StyledP>
      <StyledDiff>
        {length.map((data)=>{
          return (
            <StyledBtn1>{data}</StyledBtn1>
          )
        })}

      </StyledDiff>
      <StyledHr />
        
      <ResultList/>
    </div>
  );
}

const StyledP = styled.p`
  color: black;
  margin-left: 20px;
  margin-bottom: 8px;
  font-size: large;
  font-family: "GmarketSansMedium";
`

const StyledDiff = styled.div`
  margin-left: 15px;
`

const StyledHr = styled.hr`
  margin-left: 15px;
  width: 90%;
  border: 1px solid #E3E3E3;
`

const StyledBtn = styled.button`
  width: 20vw;
  height: 30px;
  background-color: white;
  color: #818181;
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border: 2px solid #818181;
  border-radius: 13px;
  margin: 5px;
`
const StyledBtn1 = styled.button`
  width: 16.5vw;
  height: 30px;
  background-color: white;
  color: #818181;
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border: 2px solid #818181;
  border-radius: 13px;
  margin: 3px;
`

export default FilterMt;
