import { configureStore } from "@reduxjs/toolkit";
import betslipReducer from "./betslipSlice";
import eventsReducer from "./eventsSlice";

export const store = configureStore({
  reducer: {
    betslip: betslipReducer,
    events: eventsReducer,
  },
});

export type { RootState } from "./types";
export type AppDispatch = typeof store.dispatch;
