import styled from "styled-components";
import { CourseInfo } from "../../store/RecommendSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: small;
  text-align: center;
  margin: 3px;
  margin-top: 0px;
`;

const StyledImg = styled.img`
  width: 25vw;
  height: 18vw;
  border: none;
  border-radius: 5px;
  margin: 5px;
`;

const LargeImg = styled.img`
  width: 100%;
`;

const StyledLank = styled.h2`
  font-family: "GmarketSansLight";
  text-align: center;
  font-weight: bold;
  margin-top: 3vw;
  margin-bottom: 1vw;
`;

const StyledCourse = styled.p`
  font-family: "GmarketSansLight";
  text-align: center;
  font-weight: bold;
  font-size: 4vw;
  margin: 3px;
  margin-top: 0px;
`;

function ListCard({
  COURSE_MT_NM,
  COURSE_MT_NO,
  COURSE_MT_CD,
  COURSE_NO,
  courseIdx,
}: CourseInfo) {
  const navigate = useNavigate();

  const [imgName, setImgName] = useState("");
  const imgUrl =
    "https://www.forest.go.kr/images/data/down/mountain/" + imgName;

  // console.log(imgName);
  useEffect(() => {
    const getImgSrc = async () => {
      const res = await axios.get(
        "https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2",
        {
          params: {
            mntiListNo: String(COURSE_MT_CD),
            pageNo: "1",
            numOfRows: "10",
            ServiceKey:
              "8oEmCfzU8ysOPLoiFNOV1ri/t8IqtnAsySTqKIlNXzHnk2NgLfCnmuurf1AHOw4H4PN/mHW6DbFrH82cJvOC1A==",
          },
        }
      );
      if (res.data.response.body.items) {
        if (res.data.response.body.items[0]) {
          setImgName(res.data.response.body.items.item[0].imgfilename);
        } else {
          setImgName(res.data.response.body.items.item.imgfilename);
        }
      }
    };
    getImgSrc();
  }, []);

  return (
    <div
      className="ListCard"
      onClick={() => navigate(`/coursedetail/${COURSE_NO}`)}
    >
      {courseIdx ? (
        <div>
          {imgName ? (
            <LargeImg src={imgUrl} alt={imgName} />
          ) : (
            <LargeImg
              src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg"
              alt="img"
            />
          )}
          <StyledLank>{courseIdx}위</StyledLank>
          <StyledCourse>{COURSE_MT_NM}</StyledCourse>
          <StyledCourse>{COURSE_MT_NO}코스</StyledCourse>
        </div>
      ) : (
        <div>
          {imgName ? (
            <StyledImg src={imgUrl} alt={imgName} />
          ) : (
            <StyledImg
              src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg"
              alt="img"
            />
          )}
          <StyledH>{COURSE_MT_NM}</StyledH>
          <StyledH>{COURSE_MT_NO}코스</StyledH>
        </div>
      )}
    </div>
  );
}

export default ListCard;
