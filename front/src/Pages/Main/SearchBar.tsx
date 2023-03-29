import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { courseApi } from "../../api";

function SearchBar() {
  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // mtlist(axios로 받아오는 산 이름 값들) useState 세팅
  const [mtList, setMtList] = useState<Array<string>>([""]);

  // SearchBar가 랜더링되면 산목록 axios 받아서 mtlist에 저장
  useEffect(() => {
    const getMtList = async () => {
      const res = await courseApi.searchBar(accessToken, refreshToken);
      setMtList(res.data.mountainList);
    };
    getMtList();
  }, []);

  // keyword(검색창에 입력하는 값) useState 세팅
  const [keyword, setKeyword] = useState<string>("");

  // 검색창 입력값 변할 때마다 입력하는 값을 keyword에 저장
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim());
  };

  console.log("keyword", keyword);

  // 자동완성 결과값 useState 세팅
  const [resultData, setResultData] = useState<Array<string>>([""]);

  // 검색창에 keyword가 입력될 때 키워드를 포함하고 있는 산들만 filter해주기
  useEffect(() => {
    setResultData(
      mtList.filter(mountain => {
        if (mountain.includes(keyword) && keyword.length !== 0) {
          return mountain.includes(keyword);
        }
        return false;
      })
    );
  }, [keyword]);

  // 검색창 focus 상태 useState 세팅
  const [isFocus, setIsFocus] = useState(false);

  // 검색창에서 아래/위 버튼 누르면 불 들어오게 해주면 좋을거같은데 일단 보류...

  console.log("resultData", resultData);

  // 자동완성에 뜬 산이름을 클릭할 경우 발생하는 클릭이벤트
  function AutoSearchClick() {
    // 이거 메인페이지에 맞게 만들면 돼 선영아
    // usestate로 값 받아서 검색창에 넣어주면 될듯?
  }

  return (
    <SearchBarDiv>
      <InputDiv>
        <Search
          placeholder="산이름을 입력해주세요"
          value={keyword}
          onChange={onChangeData}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />
        {/* <SearchBtn>검 색</SearchBtn> */}

        {/* 이거 돋보기 버튼이야 선영아 */}
        {/* <img src="/dotbogi.png" alt="dotbogi" /> */}
      </InputDiv>
      {isFocus ? (
        <ResultDiv>
          <ResultUl>
            {resultData.length > 0 && keyword !== "" ? (
              resultData.map(result => <Resultli>{result}</Resultli>)
            ) : (
              <Resultli2>검색결과가 없습니다.</Resultli2>
            )}
          </ResultUl>
        </ResultDiv>
      ) : null}
    </SearchBarDiv>
  );
}
export default SearchBar;

const SearchBarDiv = styled.div`
  padding-left: 7vw;
  padding-right: 7vw;
  margin-bottom: 2vw;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 8vw;
    height: 8vw;
    position: relative;
    right: 11vw;
  }
`;

const Search = styled.input`
  width: 100%;
  height: 11vw;
  border: 1px solid gray;
  border-radius: 10px 10px;
  font-family: "GmarketSansLight";
  text-align: left;
  font-size: 5vw;
  padding-top: 3px;
  padding-left: 8px;
`;

const ResultDiv = styled.div`
  border: 1px solid gray;
  border-radius: 0px 0px 10px 10px;
  padding-left: 3vw;
  padding-bottom: 2vw;
  padding-top: 1vw;
`;

const ResultUl = styled.ul`
  margin: 0px;
  padding-left: 0px;
`;

const Resultli = styled.li`
  height: 5vw;
  list-style-type: none;
  font-family: "GmarketSansLight";
  font-size: 5vw;
  padding-top: 2vw;
  padding-bottom: 2vw;
`;

const Resultli2 = styled.li`
  height: 5vw;
  list-style-type: none;
  font-family: "GmarketSansLight";
  font-size: 5vw;
  padding-top: 2vw;
  padding-bottom: 2vw;
  line-height: 25px;
`;

// const ClickedSearch = styled.input`
//   width: 80vw;
//   height: 18vw;
//   border-radius: 20px;
//   font-family: "GmarketSansMedium";
//   font-size: 7vw;
//   margin-left: 7vw;
//   border: solid #238c47 1.5vw;
// `;

// const AutoSearchDiv = styled.div`
//   width: 85vw;
//   height: 50vw;
//   background-color: #ffffff;
//   border: solid black 0.4vw;
//   position: absolute;
//   margin-left: 7vw;
//   border-radius: 10px;
// `;

// const AutoSearchUl = styled.ul`
//   padding-left: 0vw;
//   padding-top: 2vw;
// `;

// const AutoSearchLi = styled.li`
//   list-style-type: none;
//   font-size: 6vw;
//   font-weight: bold;
//   padding-bottom: 3vw;
//   height: 13vw;
//   padding-top: 3vw;
//   border-radius: 10px;
// `;

// const SearchBtn = styled.button`
//   width: 20vw;
//   height: 11vw;
//   font-size: 5vw;
//   border-radius: 5%;
//   background-color: #238C47;
//   color : white;
//   font-family: "GmarketSansMedium";
// `
