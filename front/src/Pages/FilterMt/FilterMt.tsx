import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../../Common/Navbar/Navbar";
import ResultList from "../../Common/Result/ResultList";

function FilterMt() {
  const time: string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<number>(0);

  const length: string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];
  const [onLength, setOnLength] = useState<number>(0);

  const [searchMt, setSearchMt] = useState<object>({
    mt_nm: "",
    course_length: "",
    course_time: "",
  });

  const handleMt = (data: string, type: string) => {
    setSearchMt({
      ...searchMt,
      [type]: data,
    });
  };

  return (
    <div className="FilterMt">
      <Navbar />

      {/* 산행 시간 */}
      <StyledP>산행 시간</StyledP>
      <StyledDiff>
        {time.map((data, index) => {
          return (
            <StyledBtn
              key={index}
              onClick={() => {
                handleMt(data, "course_time");
                setOnTime(index);
              }}
              onTime={onTime}
              index={index}
            >
              {data}
            </StyledBtn>
          );
        })}
      </StyledDiff>
      <StyledHr />

      {/* 코스 길이 */}
      <StyledP>코스 길이</StyledP>
      <StyledDiff>
        {length.map((data, index) => {
          return (
            <StyledBtn1
              key={index}
              onClick={() => {
                handleMt(data, "course_length");
                setOnLength(index);
              }}
              onLength={onLength}
              index={index}
            >
              {data}
            </StyledBtn1>
          );
        })}
      </StyledDiff>
      <StyledHr />

      <StyledDiv>
        <StyledBtn2>검색</StyledBtn2>
        <StyledBtn3
          onClick={() => {
            setOnTime(0);
            setOnLength(0);
          }}
        >
          초기화
        </StyledBtn3>
      </StyledDiv>

      <ResultList />
    </div>
  );
}

const StyledP = styled.p`
  color: black;
  margin-left: 20px;
  margin-bottom: 8px;
  font-size: large;
  font-family: "GmarketSansMedium";
`;

const StyledDiff = styled.div`
  margin-left: 15px;
`;

const StyledHr = styled.hr`
  margin-left: 15px;
  width: 90%;
  border: 1px solid #e3e3e3;
`;

const StyledBtn = styled.button<{ onTime: number; index: number }>`
  width: 20vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) => (props.index === props.onTime ? "#238C47" : "#818181")};
  border: 2px solid
    ${(props) => (props.index === props.onTime ? "#238C47" : "#818181")};
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border-radius: 13px;
  margin: 5px;
`;

const StyledBtn1 = styled.button<{ onLength: number; index: number }>`
  width: 16.5vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) => (props.index === props.onLength ? "#238C47" : "#818181")};
  border: 2px solid
    ${(props) => (props.index === props.onLength ? "#238C47" : "#818181")};
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border-radius: 13px;
  margin: 3px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledBtn2 = styled.button`
  width: 23%;
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansMedium";
  font-size: 17px;
  border: none;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 5px;
  margin-right: 20px;
`;

const StyledBtn3 = styled.button`
  width: 23%;
  background-color: white;
  color: #818181;
  font-family: "GmarketSansMedium";
  font-size: 17px;
  border: 2px solid #818181;
  border-radius: 5px;
  padding-top: 8px;
  padding-bottom: 5px;
`;
export default FilterMt;
