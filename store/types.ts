import type betslipReducer from "./betslipSlice";
import type walletReducer from "./walletSlice";

export type RootState = {
  betslip: ReturnType<typeof betslipReducer>;
  wallet: ReturnType<typeof walletReducer>;
};
