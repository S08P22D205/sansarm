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
}

export interface DiffInfo {
  EASY_COURSE_LIST: CourseInfo[];
  NORMAL_COURSE_LIST: CourseInfo[];
  HARD_COURSE_LIST: CourseInfo[];
}

export interface RecInfo {
  USER_AGE_POOL?: number;
  USER_GENDER?: string;
  COURSE_LIST: CourseInfo[];
  courseName?: string;
}

interface MainState {
  genderAge: RecInfo;
  difficultyCourse: DiffInfo;
  easyCourse: RecInfo;
  normalCourse: RecInfo;
  hardCourse: RecInfo;
}

const initialState: MainState = {
  genderAge: {
    USER_AGE_POOL: 0,
    USER_GENDER: "",
    COURSE_LIST: [],
  },
  difficultyCourse: {
    EASY_COURSE_LIST: [{}],
    NORMAL_COURSE_LIST: [{}],
    HARD_COURSE_LIST: [{}],
  },
  easyCourse: {
    COURSE_LIST: [],
  },
  normalCourse: {
    COURSE_LIST: [],
  },
  hardCourse: {
    COURSE_LIST: [],
  },
};

export const RecommendSlice = createSlice({
  name: "Recommend",
  initialState,
  reducers: {
    changeAgeGender: (state, action: PayloadAction<RecInfo>) => {
      state.genderAge = action.payload;
    },
    changeCourses: (state, action: PayloadAction<DiffInfo>) => {
      state.difficultyCourse = action.payload;
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
  changeCourses,
  changeEasyCourses,
  changeNormalCourses,
  changeHardCourses,
} = RecommendSlice.actions;
export default RecommendSlice.reducer;
