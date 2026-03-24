import { configureStore } from "@reduxjs/toolkit";
import betslipReducer from "./betslipSlice";

export const store = configureStore({
  reducer: {
    betslip: betslipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
