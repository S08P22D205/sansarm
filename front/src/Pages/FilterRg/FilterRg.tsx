/// <reference types="@types/geojson" />

import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "../../store/baseURL";

import Navbar from "../../Common/Navbar/Navbar";
import ResultList from "../../Common/Result/ResultList";



interface Option {
  value: string;
  label: string;
}

interface UserLocation {
  latitude: number | null,
  longitude: number | null,
  error: string | null 
}

// 위치정보 받아오기 관련 레거시 코드2
// interface IPosition {
//   latitude: number;
//   longitude: number;
// }

function FilterRg() {

// 위치정보 받아오기 관련 레거시 코드2
//   function getLocation(): Promise<IPosition> {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           const { latitude, longitude } = position.coords;
//           resolve({ latitude, longitude });
//           console.log(latitude, longitude)
//         },
//         error => reject(error)
//       );
//     });
//   }

  // 탭 버튼으로 지역/위치 선택
  const [rgBtn, setRgBtn] = useState(1)
  const [locBtn, setLocBtn] = useState(0)
  
  
  function ChangeTab(){
    
    // 유저 위치정보 받아오기 레거시코드 4
    // const Geo = () => {
      //   if (!navigator.geolocation) {
        //     setLocation({ latitude: null, longitude: null, error: "Geolocation이 브라우저에서 작동하지 않음" });
        //     return;
        //   }
        
    //   const success = (position:any) => {
      //     setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
      //   };
      
      //   const error = () => {
        //     setLocation({ latitude: null, longitude: null, error: "Geolocation 에러" });
        //   };
        
        //   navigator.geolocation.getCurrentPosition(success, error);
        //   console.log('위치 받아옴')
        // }
        
        
        
        // 위치정보 받아오기 관련 레거시 코드1
        // function Geo(): UserLocation {
          //   // const [location, setLocation] = useState<UserLocation>({ latitude: null, longitude: null, error: null });
          
          //   useEffect(() => {
            //     if (!navigator.geolocation) {
              //       setLocation({ latitude: null, longitude: null, error: "Geolocation is not supported by your browser" });
              //       return;
              //     }
              
              //     const success = (position: any) => {
                //       setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
                //     };
                
                //     const error = () => {
    //       setLocation({ latitude: null, longitude: null, error: "Unable to retrieve your location" });
    //     };
    
    //     navigator.geolocation.getCurrentPosition(success, error);
    //   }, []);
    
    //   return location;
    // }
    
    
    // 지역 -> 위치 : 탭 변경하며 유저 위치와 반경 정보 받아오기
    if (rgBtn === 1) {
      setRgBtn(0);
      setLocBtn(1);
      handleMt("", "courseLocation")
      // Geo();
      // 볼륨바0
      
      // 위치 -> 지역 : 탭 변경하며 유저 위치와 반경 null
    } else if (locBtn === 1) {
      setRgBtn(1)
      setLocBtn(0)
      setLocation({ latitude: null, longitude: null, error: null });
    }
    
    // console.log('rgBtn :', rgBtn, 'locBtn: ', locBtn, 'location :', location.latitude, location.longitude)
  };
  
  // 지역기반 드랍박스 목록
  const regions: Option[] = [
    { value: "미선택", label: "지역을 선택해주세요" },
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
  
  
  // 지역명 갱신
  const SelectRegion = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string,
    ) => {
      handleMt(event.target.value, type)
    };
    
    // 유저 위치정보 받아오기 레거시코드 3
    //   function Geo() {
      
      //   if (!navigator.geolocation) {
        //     setLocation({ latitude: null, longitude: null, error: "Geolocation이 브라우저에서 작동하지 않음" });
        //     return;
        //   }
        
        //   const success = (position:any) => {
          //     setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
          //   };
          
  //   const error = () => {
    //     setLocation({ latitude: null, longitude: null, error: "Geolocation 에러" });
    //   };
    
    //   navigator.geolocation.getCurrentPosition(success, error);
    
    // }
    // useEffect(() => {
      //   handleMt(location.latitude, "coordX");
      //   handleMt(location.longitude, "coordY");
      //   console.log('위치넣기', location.latitude, location.longitude)
      // }, [location])
      
  // 반경정보 받아오기
  const [volumePercent, setVolumePercent] = useState(0);
  
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const barWidth = bar.clientWidth;
    const volumePercent = clickX / barWidth;
    setVolumePercent(volumePercent);
    // Call a function to handle the volume change here
  };
      
      
  // 지역/위치 이하---------------------------------------
  
  const time: string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<number>(0);
  
  const length: string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];
  const [onLength, setOnLength] = useState<number>(0);
  
  const [searchRg, setSearchRg] = useState<object>({
    courseLocation: "",
    coordX: null,
    coordY: null,
    courseRadius: 0,
    courseLengthBtNo: 0,
    courseTimeBtNo: 0,
  });
  
  const handleMt = (data: string | number | null, type: string) => {
    setSearchRg({
      ...searchRg,
      [type]: data,
    });
    // console.log('handleMt에서 콘솔')
    // console.log(searchRg)
  };
  
  function initializer() {
    setSearchRg({
      courseLocation: "",
      coordX: null,
      coordY: null,
      courseRadius: 0,
      courseLengthBtNo: 0,
      courseTimeBtNo: 0,
    })
    setRgBtn(1)
    ChangeTab()
  }
      
  const [location, setLocation] = useState<UserLocation>({ latitude: null, longitude: null, error: null });
  
  const SearchSinal = () => {
    // # 현재위치 정보 searchRg에 넣기
    
    const GetGeo = () => {
      if (!navigator.geolocation) {
        setLocation({ latitude: null, longitude: null, error: "Geolocation이 브라우저에서 작동하지 않음" });
        return;
      }
      
        const success = (position:any) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null });
        };
    
        const error = () => {
          setLocation({ latitude: null, longitude: null, error: "Geolocation 에러" });
        };
    
        navigator.geolocation.getCurrentPosition(success, error);
        console.log('위치 받아옴')
    };

    const GetGeoCehck = () => {
      console.log('위치 들어옴')
      console.log(location.latitude, location.longitude)
    };

    const AddGeoX = () => {
      handleMt(location.latitude, "coordX");
    };

    const AddGeoY = () => {
      handleMt(location.longitude, "coordY");
    };

    const AddGeoCheck = () => {
      console.log('리스트에 들어감')
      console.log(searchRg)
    };
    
    const Activate = async () => {
      await GetGeo();
      await GetGeoCehck();
      await AddGeoY();
      await AddGeoX();
      await AddGeoCheck();
    };
    Activate();
  };

  function getLocation(){
    console.log(searchRg)
  }
  
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
          <UnTab2 onClick={
            ChangeTab
            // Geo();}
          }>현재위치</UnTab2>
        }      
      <Tabcontent>
        {
          (rgBtn === 1)?
          <StyledDiv2>
            <StyledSelect onChange={(event) => SelectRegion(event, "courseLocation")}>
              {regions.map((region) => (
                <StyledOption
                 value={region.value}
                  key={region.value}
                  // onClick={() => handleMt(region.value, 'courseLocation')}
                >
                  {region.label}
                </StyledOption>
              ))}
            </StyledSelect>
          </StyledDiv2>:
          <VolBarDiv>
            <p>반경</p>
            <VolBar onClick={handleVolumeChange}>
              <VolBarFill percent={volumePercent} />
            </VolBar>
          </VolBarDiv>
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
        <StyledBtn2 onClick={SearchSinal}>검색</StyledBtn2>
        <StyledBtn3
          onClick={() => {
            setOnTime(0);
            setOnLength(0);
            initializer()
          }}
        >
          초기화
        </StyledBtn3>
        <button onClick={getLocation}>실험</button>
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
  width: 80vw;
  font-size: 7vw;
  display : flex;
  align-items: center;
  justify-content: space-between;
`

const VolBar = styled.div`
  width: 60vw;
  height: 4vw;
  font-size: 7vw;
  background-color: #D8D8D8;
  border: 1px solid #999;
`

const VolBarFill = styled.div<{ percent: number }>`
  height: 100%;
  background-color: #238C47;
  transition: width 0.3s ease-in-out;
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
