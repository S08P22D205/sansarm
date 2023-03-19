import React, { useState } from "react";
import Select, { Options } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "1", label: "서울시" },
  { value: "2", label: "부산시" },
  { value: "3", label: "대구시" },
  { value: "4", label: "인천시" },
  { value: "5", label: "광주시" },
  { value: "6", label: "대전시" },
  { value: "7", label: "울산시" },
  { value: "8", label: "세종시" },
  { value: "9", label: "경기도" },
  { value: "10", label: "강원도" },
  { value: "11", label: "충청북도" },
  { value: "12", label: "충청남도" },
  { value: "13", label: "전라북도" },
  { value: "14", label: "전라남도" },
  { value: "15", label: "경상북도" },
  { value: "15", label: "경상남도" },
  { value: "16", label: "제주도" },
];

const genders: Option[] = [
  { value: "1", label: "성별: 남" },
  { value: "2", label: "성별: 여" },
];

function SignUp1() {
  const [signUp, setSignUp] = useState({
    userNm: "",
    userNicknm: "",
    userAge: "",
    userGender: "",
    userLocation: "",
  });

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [size, setSize] = useState<number>(1);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option as Option);
  };

  const changeSignUp = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: any
  ) => {
    setSignUp({
      ...signUp,
      [type]: event.target.value,
    });
  };

  // const selectList = ["apple", "banana", "grape", "orange"];

  // const [Selected, setSelected] = useState("");

  // const handleSelect = (e: any) => {
  //   setSelected(e.target.value);
  // };

  return (
    <StyledDiv>
      <StyledH1>고객님의 정보를 입력해주세요</StyledH1>
      <StyledDiv2>
        <StyledInput
          type="text"
          value={signUp.userNm}
          onChange={(event) => {
            changeSignUp(event, "userNm");
          }}
          placeholder="이름"
        />
      </StyledDiv2>
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
          type="text"
          value={signUp.userAge}
          onChange={(event) => {
            changeSignUp(event, "userAge");
          }}
          placeholder="나이"
        />
      </StyledDiv2>
      <StyledDiv2>
        <StyledSelect
          defaultValue={selectedOption}
          onChange={handleOptionChange}
          options={genders}
          isSearchable={true}
          maxMenuHeight={150}
          placeholder={"성별"}
        />
      </StyledDiv2>

      <StyledDiv3>
        <StyledSelect
          defaultValue={selectedOption}
          onChange={handleOptionChange}
          options={options}
          isSearchable={true}
          maxMenuHeight={150}
          placeholder={"사는지역"}
        />
      </StyledDiv3>

      <StyledButton>완료</StyledButton>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 40%;
  height: 100vh;
  font-family: "GmarketSansLight";
  scroll= "no";
`;

const StyledH1 = styled.div`
  text-align: center;
  padding: 4vw;
`;

const StyledDiv2 = styled.div`
  margin-bottom: 4%;
  text-align: center;
`;

const StyledDiv3 = styled.div`
  margin-bottom: 4%;
  margin-left: 12.5%;
  text-align: center;
  width: 75vw;
  height: 5vh;
  // border: 1px solid black;
  border-radius: 7px;
`;

const StyledInput = styled.input`
  width: 75vw;
  height: 5vh;
  padding: 12px 12px;
  border-radius: 10px;
`;

const StyledSelect = styled(Select)`
  width: 75vw;
  height: 4vh;
  text-align: left;
  display: inline-block;
  margin-bottom: 1vh;
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
