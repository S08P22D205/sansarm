// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import styled from "styled-components";

// interface Option {
//   value: string;
//   label: string;
// }

// const locations: Option[] = [
//   { value: "서울시", label: "서울시" },
//   { value: "부산시", label: "부산시" },
//   { value: "대구시", label: "대구시" },
//   { value: "인천시", label: "인천시" },
//   { value: "광주시", label: "광주시" },
//   { value: "대전시", label: "대전시" },
//   { value: "울산시", label: "울산시" },
//   { value: "세종시", label: "세종시" },
//   { value: "경기도", label: "경기도" },
//   { value: "강원도", label: "강원도" },
//   { value: "충청북도", label: "충청북도" },
//   { value: "충청남도", label: "충청남도" },
//   { value: "전라북도", label: "전라북도" },
//   { value: "전라남도", label: "전라남도" },
//   { value: "경상북도", label: "경상북도" },
//   { value: "경상남도", label: "경상남도" },
//   { value: "제주도", label: "제주도" },
// ];

// const genders: Option[] = [
//   { value: "1", label: "성별: 남" },
//   { value: "2", label: "성별: 여" },
// ];

// function SignUp1() {
//   const [signUp, setSignUp] = useState({
//     userNicknm: "",
//     userAge: "",
//     userGender: "",
//     userLocation: "",
//   });

//   const changeSignUp = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     type: any
//   ) => {
//     console.log(type);
//     setSignUp({
//       ...signUp,
//       [type]: event.target.value,
//     });
//     console.log(signUp);
//   };

//   // react-select 라이브러리에 onChange함수를 위해 따로 함수를 생성함.
//   const handleSelect = (
//     event: React.ChangeEvent<HTMLSelectElement>
//     // type: any
//   ) => {
//     console.log(event.target.value);
//     // setSignUp({
//     //   ...signUp,
//     //   [type]: event.target.value,
//     // });
//     // console.log(signUp);
//     const { type, value } = event.target;
//     setSignUp({
//       ...signUp,
//       [type]: value,
//     });
//   };

//   return (
//     <StyledDiv>
//       <StyledH1>고객님의 정보를 입력해주세요</StyledH1>
//       <StyledSpace></StyledSpace>
//       <StyledDiv2>
//         <StyledInput
//           type="text"
//           value={signUp.userNicknm}
//           onChange={(event) => {
//             changeSignUp(event, "userNicknm");
//           }}
//           placeholder="별명"
//         />
//       </StyledDiv2>
//       <StyledDiv2>
//         <StyledInput
//           type="text"
//           value={signUp.userAge}
//           onChange={(event) => {
//             changeSignUp(event, "userAge");
//           }}
//           placeholder="나이"
//         />
//       </StyledDiv2>
//       <StyledDiv2>
//         <StyledSelect
//           defaultValue={"성별"}
//           onChange={handleSelect}
//           // onChange={(event: React.ChangeEvent<HTMLSelectElement>, type: any) =>
//           //   handleSelect(event, "gender")
//           // }
//           // onChange={handleSelect}
//           // onChange={(newValue: handleSelect, actionMeta: ActionMeta<Option>) }
//           // onChangeAssignmentStatus={(
//           //   type: String,
//           //   event: React.ChangeEvent<HTMLSelectElement>
//           // ) => handleSelect(event, "gender")}
//           // onChange={(event: React.ChangeEvent<HTMLSelectElement>, type: any) =>
//           //   handleSelect(event, "gender")
//           // }
//           // options={genders}
//           // isSearchable={true}
//           // maxMenuHeight={150}
//           // placeholder={"성별"}
//         >
//           {genders.map((gender) => (
//             <StyledOption value={gender.value} key={gender.value}>
//               {gender.label}
//             </StyledOption>
//           ))}
//         </StyledSelect>
//       </StyledDiv2>
//       {/* <StyledDiv2>
//         <StyledSelect
//           onChange={(event) => handleSelect}
//           options={locations}
//           isSearchable={true}
//           maxMenuHeight={150}
//           placeholder={"사는지역"}
//         />
//       </StyledDiv2> */}

//       <StyledButton>완료</StyledButton>
//     </StyledDiv>
//   );
// }

// const StyledDiv = styled.div`
//   padding-top: 40%;
//   height: 100vh;
//   font-family: "GmarketSansLight";
//   /* scroll = "no"; */
// `;

// const StyledH1 = styled.div`
//   text-align: center;
//   padding: 4vw;
// `;

// const StyledSpace = styled.div`
//   margin-top: 10%;
// `;

// const StyledDiv2 = styled.div`
//   margin-bottom: 4%;
//   text-align: center;
// `;

// const StyledInput = styled.input`
//   width: 75vw;
//   height: 5vh;
//   padding: 12px 12px;
//   border-radius: 10px;
// `;

// const StyledSelect = styled.select`
//   width: 75vw;
//   height: 5vh;
//   border: 1px solid black;
//   border-radius: 5px;
//   overflow-y: auto;

//   /* option {
//     width: 75vw;
//     /* height: 5vh;
//     text-align: left;
//     font-size: small;
//   } */
// `;

// const StyledOption = styled.option`
//   width: 50px;
// `;

// const StyledButton = styled.button`
//   float: right;
//   font-weight: 600;
//   width: 35vw;
//   height: 5vh;
//   color: white;
//   background-color: #238c47;
//   font-size: 4vw;
//   margin-top: 60%;
//   margin-right: 15vw;
//   padding: 10px;
//   cursor: pointer;
//   border: none;
//   border-radius: 15px;
//   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
//   :hover {
//     letter-spacing: 2px;
//     transform: scale(1.2);
//     cursor: pointer;
//     background-color: #ff5f2e;
//     color: white;
//     outline: 0;
//   }
// `;

// export default SignUp1;

export {};
