import { useCallback } from "react";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
  selectSelections,
  selectCount,
  toggleSelection,
  clearSelections,
} from "./betslipSlice";
import type { BetSelection } from "../types/betslip";

export const BetslipStore = {
  useSelections: () => useAppSelector(selectSelections),

  useCount: () => useAppSelector(selectCount),

  useIsSelected: () => {
    const selections = useAppSelector(selectSelections);
    return useCallback(
      (id: string) => selections.some((s: BetSelection) => s.id === id),
      [selections]
    );
  },

  useToggle: () => {
    const dispatch = useAppDispatch();
    return useCallback(
      (selection: BetSelection) => dispatch(toggleSelection(selection)),
      [dispatch]
    );
  },

  useClearAll: () => {
    const dispatch = useAppDispatch();
    return useCallback(() => dispatch(clearSelections()), [dispatch]);
  },
};
