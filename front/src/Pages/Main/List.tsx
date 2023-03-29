import styled from "styled-components";
import ListItem from "./ListItem";
import { useAppSelector } from "../../store/hooks";
import { ItemInfo } from "../../store/mainSlice";
import { RecInfo } from "../../store/RecommendSlice";
import ListItem2 from "./ListItem2";

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledH = styled.p`
  text-align: center;
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
  const ageGender: RecInfo = useAppSelector(state => state.recommend.genderAge);

  console.log("store", ageGender);

  return (
    <StyledDiv className="List">
      <StyledH>김머끄님을 위한 추천코스</StyledH>
      <ListItem2
        USER_AGE_POOL={ageGender.USER_AGE_POOL}
        USER_GENDER={ageGender.USER_GENDER}
        COURSE_LIST={ageGender.COURSE_LIST}
      />
      <ListItem
        userAge={genderAge[0].userAge}
        userGender={genderAge[0].userGender}
        courseList={genderAge[0].courseList}
      />
      <ListItem
        courseList={easyCourse[0].courseList}
        courseName="보다 편한 코스는 어때요?"
      />
      <ListItem
        courseList={normalCourse[0].courseList}
        courseName="이정도면 할만한데?"
      />
      <ListItem
        courseList={hardCourse[0].courseList}
        courseName="이 길은 쉽지 않을걸..."
      />
    </StyledDiv>
  );
}

export default List;
