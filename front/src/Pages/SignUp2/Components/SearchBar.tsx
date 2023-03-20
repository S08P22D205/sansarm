import React from 'react';
import styled from "styled-components";
import { useState } from 'react';

interface SearchDatas {
  mountain: string;
}

function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");
  const [keyItems, setKeyItems] = useState<SearchDatas[]>([])
  const onChangeData = (e:React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }
  return(
    <div>
      <SearchBarDiv>
        <Search value={keyword} onChange={onChangeData}/>
        {/* <SearchBtn>검 색</SearchBtn> */}
        <img src="/dotbogi.png" alt="dotbogi" />
      </SearchBarDiv>
      <AutoSearchDiv>
      </AutoSearchDiv>

    </div>
  )
  // return(
    //   <div className='SearchBarDiv'>
    //       <input className='SearchBar' type="text" name="" id="" placeholder=' 산 이름을 입력해주세요' /><button className='SearchBarBtn'>입 력</button>
    //   </div>
    // )
  }
  export default SearchBar



const SearchBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  margin-top: 7vh;
  margin-bottom: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width : 12vw;
    height : 12vw;
    position: relative;
    right: 16vw;
  }
`

const Search = styled.input`
  width: 80vw;
  height: 18vw;
  border-radius: 10px;
  font-family: "GmarketSansMedium";
  font-size: 15vw;
  margin-left : 10vw;
`

const AutoSearchDiv = styled.div`
  width: 55vw;
  height: 70vw;
  background-color : #FFFFFF
  border : black

`

// const SearchBtn = styled.button`
//   width: 20vw;
//   height: 11vw;
//   font-size: 5vw;
//   border-radius: 5%;
//   background-color: #238C47;
//   color : white;
//   font-family: "GmarketSansMedium";
// `