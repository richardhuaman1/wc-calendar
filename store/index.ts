import { configureStore } from "@reduxjs/toolkit";
import betslipReducer from "./betslipSlice";

export const store = configureStore({
  reducer: {
    betslip: betslipReducer,
  },
});

export type { RootState } from "./types";
export type AppDispatch = typeof store.dispatch;
