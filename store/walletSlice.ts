import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";

const INITIAL_BALANCE = 200;

interface WalletState {
  balance: number;
}

const initialState: WalletState = {
  balance: INITIAL_BALANCE,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    deductBalance(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    addBalance(state, action: PayloadAction<number>) {
      state.balance += action.payload;
    },
  },
});

export const { deductBalance, addBalance } = walletSlice.actions;
export const selectBalance = (state: RootState) => state.wallet.balance;
export default walletSlice.reducer;
