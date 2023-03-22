import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  courseData: Array<Object>;
}

const initialState: MainState = {
  courseData: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeCourse: (state, action: PayloadAction<Array<Object>>) => {
      state.courseData = action.payload;
    },
  },
});

export const { changeCourse } = mainSlice.actions;
export default mainSlice.reducer;
