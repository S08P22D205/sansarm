import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import signup2Reducer from "./signup2Slice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    signup2: signup2Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
