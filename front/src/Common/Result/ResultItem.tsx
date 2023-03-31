import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

interface ResultInfo {
  COURSE_NO: number;
  COURSE_MT_CD: string;
  COURSE_MT_NM: string;
  COURSE_MT_NO: number;
  COURSE_ELEV_DIFF: number;
  COURSE_UPTIME: number;
  COURSE_DOWNTIME: number;
  COURSE_LENGTH: number;
  COURSE_LOCATION: string;
  COURSE_ADDRESS: string;
  pressSearch: boolean;
}

function ResultItem({
  COURSE_NO,
  COURSE_MT_CD,
  COURSE_MT_NM,
  COURSE_MT_NO,
  COURSE_ELEV_DIFF,
  COURSE_UPTIME,
  COURSE_DOWNTIME,
  COURSE_LENGTH,
  COURSE_LOCATION,
  COURSE_ADDRESS,
  pressSearch,
}: ResultInfo) {
  const [imgName, setImgName] = useState<string>("");
  const imgUrl =
    "https://www.forest.go.kr/images/data/down/mountain/" + imgName;

  useEffect(() => {
    axios
      .get(
        "http://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2",
        {
          params: {
            mntiListNo: COURSE_MT_CD,
            pageNo: "1",
            numOfRows: "10",
            ServiceKey:
              "52XfZNd3Dlkjj7X/01Wm4ons+WSiajtOTo2O7WCEv993o1qWWflHTiRuM9aig/FBuf7VUON5y3sw7cKfrhUu1w==",
          },
        }
      )
      .then((res) => {
        setImgName(res.data.response.body.items.item[0].imgfilename);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setImgName("");
    axios
      .get(
        "http://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2",
        {
          params: {
            mntiListNo: COURSE_MT_CD,
            pageNo: "1",
            numOfRows: "10",
            ServiceKey:
              "52XfZNd3Dlkjj7X/01Wm4ons+WSiajtOTo2O7WCEv993o1qWWflHTiRuM9aig/FBuf7VUON5y3sw7cKfrhUu1w==",
          },
        }
      )
      .then((res) => {
        setImgName(res.data.response.body.items.item[0].imgfilename);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pressSearch]);

  console.log(imgUrl);
  return (
    <StyledDiv>
      {imgName ? (
        <StyledImg src={imgUrl} alt={imgName} />
      ) : (
        <StyledImg src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg" />
      )}
      <StyledDiv2>
        <StyledP>
          코스 이름 : {COURSE_MT_NM} {COURSE_MT_NO}코스
        </StyledP>
        <StyledP>코스 길이 : {COURSE_LENGTH} km</StyledP>
        <StyledP>산행 시간 : {COURSE_UPTIME + COURSE_DOWNTIME} 시간</StyledP>
      </StyledDiv2>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  border: 1px gray solid;
  padding: 5px;
  margin-top: 20px;
  border-radius: 15px;
`;

const StyledDiv2 = styled.div`
  margin-left: 15px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const StyledImg = styled.img`
  width: 100px;
  height: 70px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const StyledP = styled.p`
  font-family: "GmarketSansLight";
  margin: 0;
`;
export default ResultItem;
