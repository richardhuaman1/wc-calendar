import type betslipReducer from "./betslipSlice";

export type RootState = {
  betslip: ReturnType<typeof betslipReducer>;
};
