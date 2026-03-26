import { configureStore } from "@reduxjs/toolkit";
import betslipReducer from "./betslipSlice";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    betslip: betslipReducer,
    wallet: walletReducer,
  },
});

export type { RootState } from "./types";
export type AppDispatch = typeof store.dispatch;
