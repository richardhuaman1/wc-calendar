import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  },
});

export const { toggleSelection } = betslipSlice.actions;
export const selectCount = (state: { betslip: BetslipState }) => state.betslip.selections.length;
export const selectIsSelected = (id: string) => (state: { betslip: BetslipState }) =>
  state.betslip.selections.some((s) => s.id === id);

export default betslipSlice.reducer;
