import styled from "styled-components";
import { courseInfo } from "../../store/mainSlice";
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

function ListCard({
  courseMtNm,
  courseMtNo,
  courseMtCd,
  courseNo,
}: courseInfo) {
  const navigate = useNavigate();

  const [imgName, setImgName] = useState("");
  const imgUrl =
    "https://www.forest.go.kr/images/data/down/mountain/" + imgName;

  useEffect(() => {
    const getImgSrc = async () => {
      const res = await axios.get(
        "https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2",
        {
          params: {
            mntiListNo: String(courseMtCd),
            pageNo: "1",
            numOfRows: "10",
            ServiceKey:
              "8oEmCfzU8ysOPLoiFNOV1ri/t8IqtnAsySTqKIlNXzHnk2NgLfCnmuurf1AHOw4H4PN/mHW6DbFrH82cJvOC1A==",
          },
        }
      );
      if (res.data.response.body.items) {
        setImgName(res.data.response.body.items.item[0].imgfilename);
      }
    };
    getImgSrc();
  }, []);

  return (
    <div
      className="ListCard"
      onClick={() => navigate(`/coursedetail/${courseNo}`)}
    >
      {imgName ? (
        <StyledImg src={imgUrl} alt={imgName} />
      ) : (
        <StyledImg src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg" />
      )}
      <StyledH>{courseMtNm}</StyledH>
      <StyledH>{courseMtNo}코스</StyledH>
    </div>
  );
}

export default ListCard;
