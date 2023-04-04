import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginInfo {
  accessToken?: string | null;
  refreshToken?: string | null;
}

interface LoginState {
  loginInfo: LoginInfo;
  userInfo: {
    userEmail: string;
    userNicknm: string;
    userAge: number;
    userGender: string;
    userLocation: string;
  };
}

const initialState: LoginState = {
  loginInfo: {
    accessToken: "",
    refreshToken: "",
  },
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
    changeLoginInfo: (state, action: PayloadAction<LoginInfo>) => {
      state.loginInfo = action.payload;
    },
  },
});

export const { changeLoginInfo } = loginSlice.actions;
export default loginSlice.reducer;
