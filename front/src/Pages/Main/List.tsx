import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { RecInfo } from "../../store/RecommendSlice";
import { DiffInfo } from "../../store/RecommendSlice";
import ListItem from "./ListItem";
import { UserInfo } from "../../store/loginSlice";
import { courseInfo } from "../../store/courseSlice";
import ListItemTopTen from "./ListItemTopTen";

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledH = styled.p`
  text-align: center;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5vw;
  margin-bottom: 3vw;
`;

function List() {
  // store에 저장된 각 코스정보를 useSelector로 받아온다!
  const ageGender: RecInfo = useAppSelector(state => state.recommend.genderAge);
  const courses: DiffInfo = useAppSelector(
    state => state.recommend.difficultyCourse
  );
  const topTen: courseInfo[] = useAppSelector(state => state.recommend.topTen);

  // store에 저장된 유저정보를 useSelector로 받아오기
  const userInfo: UserInfo = useAppSelector(state => state.login.userInfo);

  // store에 저장된 난이도별 코스 추천 가능 여부 받아오기
  const isRec: boolean = useAppSelector(state => state.login.isRec);

  console.log("ageGender", ageGender);
  console.log("courses", courses);
  console.log("topTen", topTen);
  console.log("userInfo", userInfo);
  console.log("isRec", isRec);

  return (
    <StyledDiv className="List">
      <StyledH>{userInfo.userNicknm}님을 위한 추천코스</StyledH>
      <ListItem
        USER_AGE_POOL={ageGender.USER_AGE_POOL}
        USER_GENDER={ageGender.USER_GENDER}
        COURSE_LIST={ageGender.COURSE_LIST}
      />
      {isRec ? (
        <div>
          <ListItem
            COURSE_LIST={courses.EASY_COURSE_LIST}
            courseName="당신을 위한 편안한 코스"
          />
          <ListItem
            COURSE_LIST={courses.NORMAL_COURSE_LIST}
            courseName="이정도면 할만한데?"
          />
          <ListItem
            COURSE_LIST={courses.HARD_COURSE_LIST}
            courseName="이 길은 쉽지 않을걸..."
          />
        </div>
      ) : (
        <div>
          <ListItemTopTen courseName="TOP10" COURSE_LIST={topTen} />
        </div>
      )}
    </StyledDiv>
  );
}

export default List;
