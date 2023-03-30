import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "../../store/baseURL";

import Navbar from "../../Common/Navbar/Navbar";
import ResultList from "../../Common/Result/ResultList";



interface Option {
  value: string;
  label: string;
}




function FilterRg() {

  const [rgBtn, setRgBtn] = useState(1)
  const [locBtn, setLocBtn] = useState(0)

  function ChangeTab(){
    if (rgBtn === 1) {
      setRgBtn(0)
      setLocBtn(1)
    } else if (locBtn === 1) {
      setRgBtn(1)
      setLocBtn(0)
    }
  };

  const locations: Option[] = [
    { value: "", label: "지역을 선택해주세요" },
    { value: "서울시", label: "서울시" },
    { value: "부산시", label: "부산시" },
    { value: "대구시", label: "대구시" },
    { value: "인천시", label: "인천시" },
    { value: "광주시", label: "광주시" },
    { value: "대전시", label: "대전시" },
    { value: "울산시", label: "울산시" },
    { value: "세종시", label: "세종시" },
    { value: "경기도", label: "경기도" },
    { value: "강원도", label: "강원도" },
    { value: "충청북도", label: "충청북도" },
    { value: "충청남도", label: "충청남도" },
    { value: "전라북도", label: "전라북도" },
    { value: "전라남도", label: "전라남도" },
    { value: "경상북도", label: "경상북도" },
    { value: "경상남도", label: "경상남도" },
    { value: "제주도", label: "제주도" },
  ];

  const [volumePercent, setVolumePercent] = useState(0);

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const barWidth = bar.clientWidth;
    const volumePercent = clickX / barWidth;
    setVolumePercent(volumePercent);
    // Call a function to handle the volume change here
  };

  const [filter, setFilter] = useState({
    userNo: 0,
    userNicknm: "",
    userAge: "",
    userGender: "",
    userLocation: "",
  });
  
  
  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: any
  ) => {
    setFilter({
      ...filter,
      [type]: event.target.value,
    });
  };

  // ----------------------------------------------

  const time: string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<number>(0);

  const length: string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];
  const [onLength, setOnLength] = useState<number>(0);

  const [searchRg, setSearchRg] = useState<object>({
    courseLocation: "",
    coordX: 0,
    coordY: 0,
    courseRadius: 0,
    courseLengthBtNo: 0,
    courseTimeBtNo: 0,
  });

  const handleMt = (data: string | number, type: string) => {
    setSearchRg({
      ...searchRg,
      [type]: data,
    });
  };

  console.log(searchRg);

  return (
    <div>
      {/* <Navbar /> */}

      <p>Navbar 들어갈 예정</p>
      <p>원하는 등산 조건을 선택해주세요</p>
      <p>(이상은 FilterMt와 통일할 예정)</p>

      <TabDiv>
        {
          (rgBtn === 1)?
          <Tab1>지역검색</Tab1>:
          <UnTab1 onClick={ChangeTab}>지역검색</UnTab1>
        }
        {
          (locBtn === 1)?
          <Tab2>현재위치</Tab2>:
          <UnTab2 onClick={ChangeTab}>현재위치</UnTab2>
        }      
      <Tabcontent>
        {
          (rgBtn === 1)?
          <StyledDiv2>
            <StyledSelect onChange={(event) => handleSelect(event, "userLocation")}>
              {locations.map((location) => (
                <StyledOption value={location.value} key={location.value} placeholder="지역을 선택해주세요">
                  {location.label}
                </StyledOption>
              ))}
            </StyledSelect>
          </StyledDiv2>:
          <div>
            <p>반경</p>
            <VolBarDiv onClick={handleVolumeChange}>
              <VolBar percent={volumePercent} />
            </VolBarDiv>
          </div>
        }
      </Tabcontent>
      </TabDiv>

{/* -------------------------------------------------- */}

      {/* 산행 시간 */}
      <StyledP>산행 시간 (h)</StyledP>
      <StyledDiff>
        {time.map((data, index) => {
          return (
            <StyledBtn
              key={index}
              onClick={() => {
                handleMt(index, "courseTimeBtNo");
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
      <StyledP>코스 길이 (km)</StyledP>
      <StyledDiff>
        {length.map((data, index) => {
          return (
            <StyledBtn1
              key={index}
              onClick={() => {
                handleMt(index, "courseLengthBtNo");
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

// const StyledDiv = styled.div`
//   padding-top: 40%;
//   height: 100vh;
//   font-family: "GmarketSansLight";
// `;


const TabDiv = styled.div`
  width : 93vw;
  height : 40vw;
  margin-left : 3.5vw;
  border-radius : 20px;
  background-color: #CFE2C8;
  font-family: "GmarketSansMedium";
`
const Tab1 = styled.button`
  width : 45vw;
  height : 15vw;
  margin-left : 1.5vw;
  margin-top : 1vw;
  border-radius : 20px;
  border : none;
  background-color: white;
  box-shadow : 3px 3px 3px #818181 inset;
  font-size : 7vw;
`
const UnTab1 = styled.button`
  width : 45vw;
  height : 15vw;
  margin-left : 1.5vw;
  margin-top : 1vw;
  border-radius : 20px;
  border : none;
  background-color: #CFE2C8;
  font-size : 7vw;
  &: hover{
    cursor : pointer;
`
const Tab2 = styled.button`
  width : 45vw;
  height : 15vw;
  // margin-left : 4vw;
  margin-top : 1vw;
  border-radius : 20px;
  border : none;
  background-color: white;
  box-shadow : 3px 3px 3px #818181 inset;
  font-size : 7vw;
`

const UnTab2 = styled.button`
  width : 45vw;
  height : 15vw;
  // margin-left : 4vw;
  margin-top : 1vw;
  border-radius : 20px;
  border : none;
  background-color: #CFE2C8;
  font-size : 7vw;
  &: hover{
    cursor : pointer;
`
const Tabcontent = styled.div`
  width : 90vw;
  height : 21vw;
  margin-left : 1.5vw;
  margin-top : 1vw;
  background-color: white;
  border-radius : 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledH1 = styled.div`
  text-align: center;
  padding: 4vw;
`;

const StyledSpace = styled.div`
  margin-top: 10%;
`;

const StyledDiv2 = styled.div`
  // margin-bottom: 4%;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 75vw;
  height: 5vh;
  padding: 12px 12px;
  border-radius: 10px;
`;

const StyledSelect = styled.select`
  width: 80vw;
  height: 7vh;
  border: 3px solid black;
  border-radius: 10px;
  overflow-y: auto;
  font-size: 7vw
`;

const StyledOption = styled.option`
  overflow-y: scroll;
  font-size: 5vw;
`;

const VolBarDiv = styled.div`
  width: 50vw;
  height: 5vw;
  font-size: 7vw;
  background-color: #ccc;
  border: 1px solid #999;
`

const VolBar = styled.div<{ percent: number }>`
  height: 100%;
  background-color: #00c853;
  transition: width 0.2s ease-in-out;
  width: ${props => props.percent * 100}%;
`

// ----------------------------------------

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

export default FilterRg;
