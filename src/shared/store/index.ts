import { configureStore } from "@reduxjs/toolkit";
import betslipReducer from "@/features/betting/store/betslipSlice";
import walletReducer from "@/features/betting/store/walletSlice";

export const store = configureStore({
  reducer: {
    betslip: betslipReducer,
    wallet: walletReducer,
  },
});

export type { RootState } from "./types";
export type AppDispatch = typeof store.dispatch;
