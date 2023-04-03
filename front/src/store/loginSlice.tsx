import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginInfo {
  accessToken?: string | null;
  refreshToken?: string | null;
}

interface LoginState {
  loginInfo: LoginInfo;
}

const initialState: LoginState = {
  loginInfo: {
    accessToken: "",
    refreshToken: "",
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
