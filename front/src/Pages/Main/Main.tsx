import styled from "styled-components";
import List from "./List";
import axios from "axios";
import { useEffect } from "react";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5.2vw;
`;

const RecommendBtn = styled.div`
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledBtn = styled.button`
  width: 50%;
  padding: 15px;
  padding-left: 10px;
  border: none;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 5px 5px 5px #b7b7b7;
  background-color: #f5f5f5;
`;

const BtnName = styled.p`
  text-align: left;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "GmarketSansMedium";
  font-size: 7vw;
`;

const StyledMt = styled.img`
  float: right;
  width: 14vw;
  margin-top: 5px;
`;

const StyledMap = styled.img`
  float: right;
  width: 14vw;
  margin-top: 10px;
`;

function Main() {
  useEffect(() => {
    const getRecommendList = async () => {
      const res = axios.get("/dummy/ListItemData.json");
      console.log(res);
    };
    getRecommendList();
  }, []);

  return (
    <div className="Main">
      <StyledH>어떤 산으로 떠나고 싶으신가요?</StyledH>
      <RecommendBtn>
        <StyledBtn>
          <BtnName>산으로</BtnName>
          <BtnName>추천받기</BtnName>
          <StyledMt src="img/mountain.png" alt="mountain" />
        </StyledBtn>
        <StyledBtn>
          <BtnName>지역으로</BtnName>
          <BtnName>추천받기</BtnName>
          <StyledMap src="img/map.png" alt="map" />
        </StyledBtn>
      </RecommendBtn>
      <List />
    </div>
  );
}

export default Main;
