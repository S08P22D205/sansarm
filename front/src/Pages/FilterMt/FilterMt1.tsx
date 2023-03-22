import React, {useState} from "react";
import styled from "styled-components"
import Navbar from "../../Common/Navbar/Navbar";
import ResultList from "../../Common/Result/ResultList";

function FilterMt() {

  const time :string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<string>("");

  const length :string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];

  const [searchMt, setSearchMt] = useState<object>({
    mt_nm : "",
    course_length: "",
    course_time: ""
  });

  const handleMt = (data :string, type: string) => {
    setSearchMt({
      ...searchMt,
      [type]: data,
    })
  }

  console.log(searchMt);
  console.log(onTime);


  return (
    <div className="FilterMt">
      <Navbar/>

      {/* 산행 시간 */}
      <StyledP>산행 시간</StyledP>
      <StyledDiff>
        {time.map((data, index)=>{
          return (

            <StyledBtn 
              key={index} 
              onClick={()=>{handleMt(data, "course_time");setOnTime(data);}}
            >
              {data}
            </StyledBtn>
            )
          })}
      </StyledDiff>
      <StyledHr />

      {/* 코스 길이 */}
      <StyledP>코스 길이</StyledP>
      <StyledDiff>
        {length.map((data, index)=>{
          return (
            <StyledBtn1 key={index} onClick={()=>handleMt(data, "course_length")}>{data}</StyledBtn1>
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
  color: #818181;
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border: 2px solid #818181;
  ${({ key }) =>
    key ? 'white' : '#737373'};
  /* &:focus {
    border: 2px #238C47 solid;
    color: #238C47;
  } */
  border-radius: 13px;
  margin: 5px;
`

const StyledBtn1 = styled.button`
  width: 16.5vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
  color: #818181;
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border: 2px solid #818181;
  border-radius: 13px;
  margin: 3px;
`

export default FilterMt;
