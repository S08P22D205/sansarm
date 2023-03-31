import React, { useState, useEffect } from "react";
import { courseApi } from "../../api";
import styled from "styled-components";
import ResultList from "../../Common/Result/ResultList";
// import axios from "../../store/baseURL";
import flaskApi from "../../api";

interface ButtonInfo extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  timeState?: number;
  lengthState?: number;
  index?: number;
}

function FilterMt() {
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

  // keyword(검색창에 입력하는 값) State 세팅
  const [keyword, setKeyword] = useState<string>("");

  // 검색창 입력값 변할 때마다 입력하는 값을 keyword에 저장
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim());
  };

  // 자동완성 결과값 State 세팅
  const [resultData, setResultData] = useState<Array<string>>([""]);

  // 검색창에 keyword가 입력될 때 키워드를 포함하고 있는 산들만 filter해주기
  useEffect(() => {
    setResultData(
      mtList.filter((mountain) => {
        if (mountain.includes(keyword) && keyword.length !== 0) {
          return mountain.includes(keyword);
        }
        return false;
      })
    );
  }, [keyword]);

  // 검색창 focus 상태 useState 세팅
  const [isFocus, setIsFocus] = useState(false);

  const time: string[] = ["전체", "1미만", "1-2", "2초과"];
  const [onTime, setOnTime] = useState<number>(0);

  const length: string[] = ["전체", "1미만", "1-3", "3-5", "5초과"];
  const [onLength, setOnLength] = useState<number>(0);

  const [searchMt, setSearchMt] = useState<object | any>({
    courseMtNm: "",
    courseTimeBtNo: 0,
    courseLengthBtNo: 0,
  });

  const handleMt = (data: string | number, type: string) => {
    setSearchMt({
      ...searchMt,
      [type]: data,
    });
  };

  // 데이터 초기화
  const initializeData = () => {
    setSearchMt({
      courseMtNm: "",
      courseTimeBtNo: 0,
      courseLengthBtNo: 0,
    });
  };

  const [courseList, setCourseList] = useState<any[]>([]);

  // 검색 버튼을 눌렀다는 flag
  const [pressSearch, setPressSearch] = useState<boolean>(false);

  // 검색 눌렀을 때 axios요청
  const searchData = () => {
    flaskApi
      .post(
        "http://localhost:5001/course/search/mt",
        {
          courseMtNm: searchMt.courseMtNm,
          courseTimeBtNo: searchMt.courseTimeBtNo,
          courseLengthBtNo: searchMt.courseLengthBtNo,
        },
        {
          headers: {
            "X-ACCESS-TOKEN": accessToken,
            "X-REFRESH-TOKEN": refreshToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data.course_list);
        setCourseList(res.data.course_list);
      })
      .catch((err) => console.log(err));
  };

  // console.log(searchMt);
  // console.log(courseList);
  console.log(pressSearch);

  return (
    <FilterMtDiv className="FilterMt">
      <StyledP2>원하는 등산코스 조건을 선택해주세요</StyledP2>
      <FlexDiv>
        <StyledP3>산이름</StyledP3>
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
              isFocus={isFocus}
            />
          </InputDiv>

          {isFocus ? (
            <ResultDiv>
              <ResultUl>
                {resultData.length > 0 && keyword !== "" ? (
                  resultData.map((result, index) => (
                    <Resultli
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => {
                        console.log(result);
                        setKeyword(result);
                        handleMt(result, "courseMtNm");
                        setIsFocus(false);
                      }}
                    >
                      {result}
                    </Resultli>
                  ))
                ) : (
                  <Resultli2>검색결과가 없습니다.</Resultli2>
                )}
              </ResultUl>
            </ResultDiv>
          ) : null}
        </SearchBarDiv>
      </FlexDiv>
      <StyledHr />

      {/* 산행 시간 */}
      <StyledP>산행 시간</StyledP>
      <StyledDiff>
        {time.map((data, index) => {
          return (
            <StyledBtn
              key={index}
              onClick={() => {
                handleMt(index, "courseTimeBtNo");
                setOnTime(index);
              }}
              timeState={onTime}
              index={index}
            >
              {data}
            </StyledBtn>
          );
        })}
      </StyledDiff>
      <StyledHr />

      {/* 코스 길이 */}
      <StyledP>코스 길이</StyledP>
      <StyledDiff>
        {length.map((data, index) => {
          return (
            <StyledBtn1
              key={index}
              onClick={() => {
                handleMt(index, "courseLengthBtNo");
                setOnLength(index);
              }}
              lengthState={onLength}
              index={index}
            >
              {data}
            </StyledBtn1>
          );
        })}
      </StyledDiff>
      <StyledHr />

      <StyledDiv>
        <StyledBtn2
          onClick={() => {
            searchData();
            setPressSearch(!pressSearch);
          }}
        >
          검색
        </StyledBtn2>
        <StyledBtn3
          onClick={() => {
            setOnTime(0);
            setOnLength(0);
            initializeData();
            setKeyword("");
          }}
        >
          초기화
        </StyledBtn3>
      </StyledDiv>

      <ResultList courseList={courseList} pressSearch={pressSearch} />
    </FilterMtDiv>
  );
}

const FilterMtDiv = styled.div`
  margin-top: 40px;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const StyledP = styled.p`
  color: black;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 8px;
  font-size: 17px;
  font-family: "GmarketSansMedium";
`;

const StyledP2 = styled.p`
  color: black;
  margin-top: 30px;
  margin-left: 25px;
  margin-bottom: 15px;
  font-size: 19px;
  font-family: "GmarketSansMedium";
`;

const StyledP3 = styled.p`
  font-size: 17px;
  font-family: "GmarketSansMedium";
  margin-left: 23px;
  margin-right: 20px;
  margin-top: 8px;
`;

const StyledDiff = styled.div`
  margin-left: 15px;
`;

const StyledHr = styled.hr`
  margin-left: 15px;
  width: 90%;
  border: 1px solid #e3e3e3;
`;

const StyledBtn = styled.button<ButtonInfo>`
  width: 20vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) =>
    props.index === props.timeState ? "#238C47" : "#818181"};
  border: 2px solid
    ${(props) => (props.index === props.timeState ? "#238C47" : "#818181")};
  font-size: 15px;
  font-family: "GmarketSansMedium";
  border-radius: 13px;
  margin: 5px;
`;

const StyledBtn1 = styled.button<ButtonInfo>`
  width: 16.5vw;
  height: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
  color: ${(props) =>
    props.index === props.lengthState ? "#238C47" : "#818181"};
  border: 2px solid
    ${(props) => (props.index === props.lengthState ? "#238C47" : "#818181")};
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

// styled-component 내에서 변수 사용하기 위해 타입 지정
interface SearchProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  isFocus?: boolean;
}

const SearchBarDiv = styled.div`
  width: 73%;
  padding-left: 2vw;
  padding-right: 7vw;
  /* margin-bottom: 2vw; */
`;

const InputDiv = styled.div`
  width: 100%;
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

const Search = styled.input<SearchProps>`
  width: 100%;
  height: 11vw;
  border: 1px solid gray;
  border-radius: ${(props) =>
    props.isFocus ? "10px 10px 0px 0px" : "10px 10px"};
  font-family: "GmarketSansLight";
  text-align: left;
  font-size: 5vw;
  padding-top: 3px;
  padding-left: 8px;
  :focus {
    outline: 2px solid #238c47;
  }
`;

const ResultDiv = styled.div`
  margin-top: 2px;
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 64%;
  max-height: 43vh;
  border: 1px solid gray;
  border-top: none;
  border-radius: 0px 0px 10px 10px;
  padding-left: 3vw;
  padding-bottom: 2vw;
  padding-top: 1vw;
  /* box-shadow: 0 0 10px #ddd; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    height: 20%;
    background: #ddd;
    border-radius: 20px;
  }
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
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

const Resultli2 = styled.li`
  height: 5vw;
  list-style-type: none;
  font-family: "GmarketSansLight";
  font-size: 5vw;
  padding-top: 2vw;
  line-height: 25px;
  margin-bottom: 4vw;
`;

export default FilterMt;
