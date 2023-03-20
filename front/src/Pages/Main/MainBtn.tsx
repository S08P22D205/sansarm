import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecBtn from "./RecBtn";

const RecommendBtn = styled.div`
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
`;

function MainBtn() {
  const navigate = useNavigate();
  return (
    <div>
      <RecommendBtn>
        <RecBtn
          children="산으로     추천받기"
          className="MtBtn"
          imgsrc="img/mountain.png"
          imgalt="mountain"
          onClick={() => {
            navigate("/filtermt");
          }}
        />
        <RecBtn
          children="지역으로 추천받기"
          className="RgBtn"
          imgsrc="img/map.png"
          imgalt="map"
          onClick={() => {
            navigate("/filterrg");
          }}
        />
      </RecommendBtn>
    </div>
  );
}

export default MainBtn;
