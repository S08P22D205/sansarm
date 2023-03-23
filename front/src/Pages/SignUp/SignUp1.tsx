import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import axios from "../../store/baseURL";

interface Option {
  value: string;
  label: string;
}

const locations: Option[] = [
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

const genders: Option[] = [
  { value: "M", label: "성별: 남" },
  { value: "F", label: "성별: 여" },
];

function SignUp1() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // 컴포넌트 mount시에 url에서 no 값 받아오기.
  useEffect(() => {
    // userNo 주소에서 받아오기
    const userNo = Number(searchParams.get("no"));

    setSignUp({
      ...signUp,
      userNo: userNo,
    });
  }, []);

  const moveToSignUp2 = () => {
    navigate("/signup/2");
  };

  const [signUp, setSignUp] = useState({
    userNo: 0,
    userNicknm: "",
    userAge: "",
    userGender: "M",
    userLocation: "서울시",
  });

  const changeSignUp = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: any
  ) => {
    setSignUp({
      ...signUp,
      [type]: event.target.value,
    });
  };

  // select 태그를 위해 onChange함수를 따로 생성함.
  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: any
  ) => {
    setSignUp({
      ...signUp,
      [type]: event.target.value,
    });
  };

  const apiSignUp1 = () => {
    console.log(signUp.userNo);
    console.log(signUp.userNicknm);
    console.log(signUp.userAge);
    console.log(signUp.userGender);
    console.log(signUp.userLocation);
    // console.log(typeof Number(signUp.userAge));

    axios
      .post("/user/signup", {
        userNo: signUp.userNo,
        userNicknm: signUp.userNicknm,
        userAge: Number(signUp.userAge),
        userGender: signUp.userGender,
        userLocation: signUp.userLocation,
      })
      .then((response) => {
        console.log("success");
        if (response.data) {
          moveToSignUp2();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledDiv>
      <StyledH1>고객님의 정보를 입력해주세요</StyledH1>
      <StyledSpace></StyledSpace>
      <StyledDiv2>
        <StyledInput
          type="text"
          value={signUp.userNicknm}
          onChange={(event) => {
            changeSignUp(event, "userNicknm");
          }}
          placeholder="별명"
        />
      </StyledDiv2>
      <StyledDiv2>
        <StyledInput
          type="number"
          value={signUp.userAge}
          onChange={(event) => {
            changeSignUp(event, "userAge");
          }}
          placeholder="나이"
        />
      </StyledDiv2>
      <StyledDiv2>
        <StyledSelect
          placeholder="성별"
          onChange={(event) => handleSelect(event, "userGender")}
        >
          {genders.map((gender) => (
            <StyledOption value={gender.value} key={gender.value}>
              {gender.label}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledDiv2>
      <StyledDiv2>
        <StyledSelect onChange={(event) => handleSelect(event, "userLocation")}>
          {locations.map((location) => (
            <StyledOption value={location.value} key={location.value}>
              {location.label}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledDiv2>

      <StyledButton onClick={apiSignUp1}>완료</StyledButton>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 40%;
  height: 100vh;
  font-family: "GmarketSansLight";
`;

const StyledH1 = styled.div`
  text-align: center;
  padding: 4vw;
`;

const StyledSpace = styled.div`
  margin-top: 10%;
`;

const StyledDiv2 = styled.div`
  margin-bottom: 4%;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 75vw;
  height: 5vh;
  padding: 12px 12px;
  border-radius: 10px;
`;

const StyledSelect = styled.select`
  width: 75vw;
  height: 5vh;
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: auto;
`;

const StyledOption = styled.option`
  overflow-y: scroll;
`;

const StyledButton = styled.button`
  float: right;
  font-weight: 600;
  width: 35vw;
  height: 5vh;
  color: white;
  background-color: #238c47;
  font-size: 4vw;
  margin-top: 60%;
  margin-right: 15vw;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  :hover {
    letter-spacing: 2px;
    transform: scale(1.2);
    cursor: pointer;
    background-color: #ff5f2e;
    color: white;
    outline: 0;
  }
`;

export default SignUp1;
