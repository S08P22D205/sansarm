import styled from "styled-components";
import ListItem from "./ListItem";
import { useAppSelector } from "../../store/hooks";
import { ItemInfo } from "../../store/mainSlice";

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4.5vw;
`;

function List() {
  // store에 저장된 각 코스정보를 useSelector로 받아온다!
  const genderAge: Array<ItemInfo> = useAppSelector(
    state => state.main.genderAge
  );
  const easyCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.easyCourse
  );
  const normalCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.normalCourse
  );
  const hardCourse: Array<ItemInfo> = useAppSelector(
    state => state.main.hardCourse
  );

  return (
    <StyledDiv className="List">
      <StyledH>김머끄님을 위한 추천코스</StyledH>
      <ListItem
        userAge={genderAge[0].userAge}
        userGender={genderAge[0].userGender}
        courses={genderAge[0].courses}
      />
      <ListItem courses={easyCourse[0].courses} />
      <ListItem courses={normalCourse[0].courses} />
      <ListItem courses={hardCourse[0].courses} />
    </StyledDiv>
  );
}

export default List;
