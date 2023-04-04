import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  userEmail: string;
  userNicknm: string;
  userAge: number;
  userGender: string;
  userLocation: string;
}

interface LoginState {
  userInfo: UserInfo;
}

const initialState: LoginState = {
  userInfo: {
    userEmail: "",
    userNicknm: "",
    userAge: 0,
    userGender: "",
    userLocation: "",
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { changeUserInfo } = loginSlice.actions;
export default loginSlice.reducer;
