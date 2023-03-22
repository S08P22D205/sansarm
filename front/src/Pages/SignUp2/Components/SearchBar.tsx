import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';

interface SearchDatas {
  mountain: string;
}

function SearchBar() {

  // keyword(검색창에 입력하는 값) useState 세팅
  const [keyword, setKeyword] = useState<string>("");


  const [keyItems, setKeyItems] = useState<SearchDatas[]>([])

  // 검색창에 입력하는 값을 keyword useState에 저장
  const onChangeData = (e:React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim());
  console.log(keyword)
  }

  return(
    <div>
      <SearchBarDiv>
        <Search placeholder="산이름을 입력해주세요" value={keyword} onChange={onChangeData}/>
        {/* <SearchBtn>검 색</SearchBtn> */}
        {/* <img src="/dotbogi.png" alt="dotbogi" /> */}
      </SearchBarDiv>
      {/* 임시조치된 상태입니다 */}
      {
        keyword ?
        <AutoSearchDiv>
          <AutoSearchUl>
            <AutoSearchLi>한라산</AutoSearchLi>
            <AutoSearchLi>지리산</AutoSearchLi>
          </AutoSearchUl>
        </AutoSearchDiv> :
        null
      }

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
  margin-bottom: 0.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width : 8vw;
    height : 8vw;
    position: relative;
    right: 11vw;
  }
`

const Search = styled.input`
  width: 80vw;
  height: 18vw;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  text-align : center;
  font-size: 7.5vw;
  // margin-left : 7vw;
  &: hover{
    cursor : pointer;
  }
`

const ClickedSearch = styled.input`
width: 80vw;
height: 18vw;
border-radius: 20px;
font-family: "GmarketSansMedium";
font-size: 7vw;
margin-left : 7vw;
border : solid #238C47 1.5vw
`

const AutoSearchDiv = styled.div`
  width: 80vw;
  height: 80vw;
  background-color : #FFFFFF;
  border : solid black 0.4vw;
  position : absolute;
  margin-left : 10vw;
  border-radius : 10px;
`

const AutoSearchUl = styled.ul`
  padding-left : 0vw;
`

const AutoSearchLi = styled.li`
  list-style-type: none;
  font-size : 6vw;
  font-weight : bold;
  // margin-bottom : 3vw;
  height : 10vw;
  padding-top : 3vw;
  border-radius: 10px;
  &: hover {
    background-color : #EBEBEB;
    cursor : pointer;
  }
  &: 
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