import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import axios from "../../store/baseURL.js";
import Kakaomap from "./Kakaomap";
import ReviewList from "./ReviewList";
import { useAppDispatch } from "../../store/hooks";
import { courseActions } from "../../store/courseSlice";
import Loading from "../../Common/Loading/Loading";

interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: number[];
  courseYCoords?: number[];
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  courseAddress?: string;
}

function CourseDetail() {
  const [courseData, setCourseData] = useState<courseInfo>({});
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // 로딩 중
  const [loading, setLoading] = useState(true);

  // navigate, location 사용
  const navigate = useNavigate();
  const location = useLocation();

  // access token, refresh token 가져오기
  const AccessToken = sessionStorage.getItem("accessToken");
  const RefreshToken = sessionStorage.getItem("refreshToken");

  // 코스 번호
  const id = location.pathname.slice(14);

  const moveToHiking = () => {
    navigate("/hiking", { state: courseData });
    dispatch(courseActions.addTime(Date.now()));
  };

  // 빈 하트 클릭 시 찜 axios 요청 & isClicked 상태 변경
  const clickHeart = async () => {
    await axios.post(
      "/user/favorite/insert",
      {
        courseNo: id,
      },
      {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
      }
    );
    setIsClicked(!isClicked);
  };

  // 꽉 찬 하트 클릭 시 찜 해제 axios 요청 & isClicked 상태 변경
  const unClickedHeart = async () => {
    await axios.delete("user/favorite/delete", {
      headers: {
        "X-ACCESS-TOKEN": AccessToken,
        "X-REFRESH-TOKEN": RefreshToken,
      },
      data: {
        courseNo: id,
      },
    });
    setIsClicked(!isClicked);
  };

  // redux에 값 저장
  const dispatch = useAppDispatch();

  // axios 요청 : 코스 데이터 가져오기
  useEffect(() => {
    axios
      .get(`/course/search/${id}`, {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
        params: {
          courseNo: id,
        },
      })
      .then((res) => {
        // console.log("코스 정보 받아오기 :: 성공!");
        // console.log(res.data);
        setCourseData(res.data);
        dispatch(courseActions.addCourse(res.data));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // isClicked 변경될때마다 찜 여부 받아와 state에 반영
  useEffect(() => {
    const getIsEnrolled = async () => {
      const res = await axios.get(`/user/favorite/is-enrolled/${id}`, {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
      });
      setIsClicked(res.data);
    };
    getIsEnrolled();
  }, [isClicked]);

  return (
    <div className="CourseDetail">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <StyledDiv>
            <StyledTitle>
              {courseData.courseLocation}&nbsp;
              {courseData.courseMtNm}&nbsp;
              {courseData.courseMtNo}코스
              {isClicked ? (
                <StyledIcon
                  src="/img/heart_pink.png"
                  alt="하트"
                  onClick={unClickedHeart}
                />
              ) : (
                <StyledIcon
                  src="/img/heart_black.png"
                  alt="하트"
                  onClick={clickHeart}
                />
              )}
            </StyledTitle>
          </StyledDiv>
          {courseData.courseXCoords && courseData.courseYCoords ? (
            <Kakaomap
              courseXCoords={courseData.courseXCoords}
              courseYCoords={courseData.courseYCoords}
            />
          ) : null}
          <StyledDiv2>
            <StyledContent>
              코스 길이 : {courseData.courseLength}km
            </StyledContent>
            {courseData.courseUptime ? (
              <StyledContent>
                상행 시간 : {Math.floor(courseData.courseUptime / 60)}시간{" "}
                {Math.floor(courseData.courseUptime % 60)}분
              </StyledContent>
            ) : null}

            {courseData.courseDowntime ? (
              <StyledContent>
                하행 시간 : {Math.floor(courseData.courseDowntime / 60)}시간{" "}
                {Math.floor(courseData.courseDowntime % 60)}분
              </StyledContent>
            ) : null}
          </StyledDiv2>

          <StyledBtn onClick={moveToHiking}>등산 시작하기</StyledBtn>

          <ReviewList id={id} />
        </div>
      )}
    </div>
  );
}

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
`;

const StyledDiv2 = styled.div`
  margin-top: 20px;
  margin-left: 40px;
`;

const StyledTitle = styled.p`
  font-family: "GmarketSansMedium";
  font-size: 25px;
  margin: 0px;
`;

const StyledIcon = styled.img`
  margin-left: 6px;
  width: 40px;
`;

const StyledContent = styled.p`
  font-family: "GmarketSansLight";
  margin: 5px;
`;

const StyledBtn = styled.button`
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 12px;
  width: 70%;
  height: 50px;
  margin-left: 15%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default CourseDetail;
