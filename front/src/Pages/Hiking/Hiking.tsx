import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import HikingKakaomap from "./HikingKakaomap";

interface ILocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

function Hiking() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const navigate = useNavigate();

  // props로 넘긴 courseData의 state를 location이라는 변수에 담는다.
  const location = useLocation();

  const moveToPhotoPage = () => {
    if (window.confirm("사진을 찍을까요?")) {
      navigate("/photo/", {});
    }
  };

  const moveToReviewPage = () => {
    // navigate("/review/", { state: props });                   // (1)
    navigate("/review/", {
      state: { courseData: location.state, time: elapsedTime },
    });
  };

  useEffect(() => {
    //
    console.log("=> " + location.state.courseMtNm);
    handleStart();
  }, []);

  function handleStart() {
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = window.setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    setIsRunning(true);
  }

  function handleStop() {
    if (window.confirm("등산을 끝내시겠습니까?")) {
      moveToReviewPage();
      setIsRunning(false);
      window.clearInterval(intervalRef.current!);
    }
  }

  // const handleReset = () => {
  //   window.clearInterval(intervalRef.current!);
  //   setIsRunning(false);
  //   setElapsedTime(0);
  // };

  const formatElapsedTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // 5초마다 유저 위치정보 받아와서 X/Y 나눠 저장하기
  const [loc, setLoc] = useState<ILocation>({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [latitudeList, setLatitudeList] = useState<number[]>([]);
  const [longitudeList, setLongitudeList] = useState<number[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoc({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser",
      });
      return;
    }

    const success = (position: any) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      setLoc({ latitude: lat, longitude: long, error: null });
      setLatitudeList((prevState) => [...prevState, lat]);
      setLongitudeList((prevState) => [...prevState, long]);
    };

    const error = () => {
      setLoc({
        latitude: null,
        longitude: null,
        error: "Unable to retrieve your location",
      });
    };

    navigator.geolocation.getCurrentPosition(success, error);

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  // console.log(latitudeList, longitudeList);

  // }

  return (
    <StyledDiv>
      <StyledMap>
        {location.state.courseXCoords && location.state.courseYCoords ? (
          <HikingKakaomap
            courseXCoords={location.state.courseXCoords}
            courseYCoords={location.state.courseYCoords}
            hikingXCoords={latitudeList}
            hikingYCoords={longitudeList}
          />
        ) : null}
      </StyledMap>
      <StyledH1>
        {location.state.courseMtNm}&nbsp;
        {location.state.courseMtNo}코스
      </StyledH1>
      <StyledH2> 소요 시간 </StyledH2>

      <StyledStopwatch>{formatElapsedTime(elapsedTime)}</StyledStopwatch>
      {/* <StyledBtn onClick={handleStart}>
        {isRunning ? "Stop" : "Start"}
      </StyledBtn>
      <StyledBtn onClick={handleReset}>Reset</StyledBtn> */}
      <StyledBtn onClick={handleStop}>등산완료~!</StyledBtn>
      <StyledHr></StyledHr>
      <StyledCircle onClick={moveToPhotoPage}>
        <img src={"/img/camera.png"} alt="camera btn" width={"80%"} />
      </StyledCircle>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 10%;
  font-family: "GmarketSansLight";
  text-align: center;
`;

const StyledMap = styled.div`
  height: 120%;
`;

const StyledH1 = styled.div`
  /* padding-top:  */
  padding: 4vw;
  font-weight: bold;
  font-size: 1.5rem;
`;

const StyledH2 = styled.div`
  font-size: 1.5 rem;
  font-weight: bold;
`;

const StyledStopwatch = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5%;
`;

const StyledBtn = styled.div`
  text-align: center;
  margin-left: 25%;
  padding: 2.5%;
  background-color: #238c47;
  width: 50vw;
  height: 5vh;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
`;

const StyledHr = styled.hr`
  width: 80%;
  margin-top: 5%;
  margin-left: 10%;
  border-top: 4px solid #7d7d7d;
`;

const StyledCircle = styled.div`
  padding-top: 4%;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  float: right;
  margin-right: 12%;
  margin-top: 10%;
  border: 3.5px solid #119426;
`;

export default Hiking;
