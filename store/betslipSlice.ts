import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { BetSelection } from "@/types/betslip";

interface BetslipState {
  selections: BetSelection[];
}

const initialState: BetslipState = {
  selections: [],
};

const betslipSlice = createSlice({
  name: "betslip",
  initialState,
  reducers: {
    toggleSelection(state, action: PayloadAction<BetSelection>) {
      const index = state.selections.findIndex((s) => s.id === action.payload.id);
      if (index >= 0) {
        state.selections.splice(index, 1);
      } else {
        state.selections.push(action.payload);
      }
    },
    clearSelections(state) {
      state.selections = [];
    },
  },
});

export const { toggleSelection, clearSelections } = betslipSlice.actions;
export const selectSelections = (state: RootState) => state.betslip.selections;
export const selectCount = (state: RootState) => state.betslip.selections.length;
export const selectIsSelected = (id: string) => (state: RootState) =>
  state.betslip.selections.some((s) => s.id === id);

export default betslipSlice.reducer;
