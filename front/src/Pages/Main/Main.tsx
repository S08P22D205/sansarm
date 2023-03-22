import styled from "styled-components";
import List from "./List";
import axios from "axios";
import { useEffect, useState } from "react";
import MainBtn from "./MainBtn";

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5.2vw;
`;

function Main() {
  useEffect(() => {
    const getRecommendList = async () => {
      const res = await axios.get("/dummy/ListItemData.json");
      console.log(res.data);
    };
    getRecommendList();
  }, []);

  return (
    <div className="Main">
      <StyledH>어떤 산으로 떠나고 싶으신가요?</StyledH>
      <MainBtn />
      <List />
    </div>
  );
}

export default Main;
