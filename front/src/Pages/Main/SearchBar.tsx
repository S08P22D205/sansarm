import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import stringSimilarity from "string-similarity";
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

  // keyItem(알고리즘 돌린 결과값) useState 세팅
  type SearchDatas = [string] | [];
  const initialSearchData: SearchDatas = [""];
  const [keyItems, setKeyItems] = useState<SearchDatas>(initialSearchData);

  // 자동완성을 위한 유사도 검사 알고리즘
  function AutoSearchAlgo() {
    type MatchData = [string];
    const matches: MatchData = [""];
    mtList.forEach(mt => {
      const similarity = stringSimilarity.compareTwoStrings(mt, keyword);
      if (similarity > 0.5) {
        // adjust this threshold value as needed
        matches.push(mt);
      }
    });
    setKeyItems(matches);
    console.log(keyItems);
  }
  // 검색창에 keyword가 입력될 때 유사도 검사 알고리즘이 작동, 자연스러운 작동위해 딜레이를 줌
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) AutoSearchAlgo();
    }, 100);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  // 자동완성에 뜬 산이름을 클릭할 경우 발생하는 클릭이벤트
  function AutoSearchClick() {
    // 이거 메인페이지에 맞게 만들면 돼 선영아
    // usestate로 값 받아서 검색창에 넣어주면 될듯?
  }

  return (
    <div>
      <SearchBarDiv>
        <Search
          placeholder="산이름을 입력해주세요"
          value={keyword}
          onChange={onChangeData}
        />
        {/* <SearchBtn>검 색</SearchBtn> */}

        {/* 이거 돋보기 버튼이야 선영아 */}
        {/* <img src="/dotbogi.png" alt="dotbogi" /> */}
        {/* styled div 안에 img로 css 수정할 수 있음 */}
      </SearchBarDiv>

      {/* 검색 키워드가 있어야 자동완성창을 보여줌 */}
      {keyword ? (
        <AutoSearchDiv>
          <AutoSearchUl>
            {keyItems.slice(1, 6).map(mtname => (
              <AutoSearchLi key={mtname} onClick={AutoSearchClick}>
                {mtname}
              </AutoSearchLi>
            ))}
          </AutoSearchUl>
        </AutoSearchDiv>
      ) : null}
    </div>
  );
}
export default SearchBar;

const SearchBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  margin-bottom: 0.7vh;
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
  width: 85vw;
  height: 40px;
  border: 1px solid gray;
  border-radius: 10px;
  font-family: "GmarketSansLight";
  text-align: left;
  font-size: 5vw;
  padding-top: 2px;
  padding-left: 8px;
  // margin-left : 7vw;
`;

const ClickedSearch = styled.input`
  width: 80vw;
  height: 18vw;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  font-size: 7vw;
  margin-left: 7vw;
  border: solid #238c47 1.5vw;
`;

const AutoSearchDiv = styled.div`
  width: 85vw;
  height: 50vw;
  background-color: #ffffff;
  border: solid black 0.4vw;
  position: absolute;
  margin-left: 7vw;
  border-radius: 10px;
`;

const AutoSearchUl = styled.ul`
  padding-left: 0vw;
  padding-top: 2vw;
`;

const AutoSearchLi = styled.li`
  list-style-type: none;
  font-size: 6vw;
  font-weight: bold;
  padding-bottom: 3vw;
  height: 13vw;
  padding-top: 3vw;
  border-radius: 10px;
`;

// const SearchBtn = styled.button`
//   width: 20vw;
//   height: 11vw;
//   font-size: 5vw;
//   border-radius: 5%;
//   background-color: #238C47;
//   color : white;
//   font-family: "GmarketSansMedium";
// `
