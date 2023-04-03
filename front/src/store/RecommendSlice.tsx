import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseInfo {
  COURSE_NO?: number;
  COURSE_MT_CD?: number;
  COURSE_MT_NM?: string;
  COURSE_MT_NO?: number;
  COURSE_ELEV_DIFF?: number;
  COURSE_UPTIME?: number;
  COURSE_DOWNTIME?: number;
  COURSE_LENGTH?: number;
  COURSE_LOCATION?: string;
  COURSE_ADDRESS?: string;
  // courseNo?: number;
  // courseMtNm?: string;
  // courseMtCd?: number;
  // courseMtNo?: number;
  // courseXCoords?: Array<number>;
  // courseYCoords?: Array<number>;
  // courseAbsDiff?: string;
  // courseUptime?: number;
  // courseDowntime?: number;
  // courseLength?: number;
  // courseLocation?: string;
}

export interface RecInfo {
  USER_AGE_POOL?: number;
  USER_GENDER?: string;
  COURSE_LIST: CourseInfo[];
  courseName?: string;
  // userAge?: number;
  // userGender?: string;
  // courseList: courseInfo[];
}

interface MainState {
  genderAge: RecInfo;
  easyCourse: RecInfo;
  normalCourse: RecInfo;
  hardCourse: RecInfo;
}

const initialState: MainState = {
  genderAge: {
    USER_AGE_POOL: 0,
    USER_GENDER: "",
    COURSE_LIST: [],
    // userAge: 0,
    // userGender: "",
    // courseList: [],
  },

  easyCourse: {
    COURSE_LIST: [],
    // courseList: [],
  },

  normalCourse: {
    COURSE_LIST: [],
    // courseList: [],
  },

  hardCourse: {
    COURSE_LIST: [],
    // courseList: [],
  },
};

export const RecommendSlice = createSlice({
  name: "Recommend",
  initialState,
  reducers: {
    changeAgeGender: (state, action: PayloadAction<RecInfo>) => {
      state.genderAge = action.payload;
    },
    changeEasyCourses: (state, action: PayloadAction<RecInfo>) => {
      state.easyCourse = action.payload;
    },
    changeNormalCourses: (state, action: PayloadAction<RecInfo>) => {
      state.normalCourse = action.payload;
    },
    changeHardCourses: (state, action: PayloadAction<RecInfo>) => {
      state.hardCourse = action.payload;
    },
  },
});

export const {
  changeAgeGender,
  changeEasyCourses,
  changeNormalCourses,
  changeHardCourses,
} = RecommendSlice.actions;
export default RecommendSlice.reducer;
