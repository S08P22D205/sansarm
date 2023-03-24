import styled from "styled-components";
import { courseInfo } from "../../store/mainSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: small;
  text-align: center;
  margin: 2px;
  margin-top: -5px;
`;

const StyledImg = styled.img`
  width: 25vw;
  height: 18vw;
  border: none;
  border-radius: 5px;
  margin-top: 4px;
`;

function ListCard({ courseMtNm, courseMtNo, courseMtCd }: courseInfo) {
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
        console.log(
          courseMtNm,
          res.data.response.body.items.item[0].imgfilename
        );
      } else {
        console.log(courseMtNm, res.data.response.body);
      }
    };
    getImgSrc();
  }, []);

  return (
    <div className="ListCard">
      {imgName ? (
        <StyledImg src={imgUrl} alt={imgName} />
      ) : (
        <StyledImg src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg" />
      )}
      {/* <StyledImg src={imgUrl} alt={imgName} /> */}
      <StyledH>
        {courseMtNm} {courseMtNo}코스
      </StyledH>
    </div>
  );
}

export default ListCard;
