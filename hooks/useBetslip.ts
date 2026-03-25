import { useCallback } from "react";
import { Selection } from "@/types/event";
import { selectSelections, toggleSelection } from "@/store/betslipSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export function useBetslip() {
  const dispatch = useAppDispatch();
  const selections = useAppSelector(selectSelections);

  const isSelected = useCallback(
    (selectionId: string) => selections.some((s) => s.id === selectionId),
    [selections]
  );

  const toggle = useCallback(
    (
      selection: Selection,
      eventId: string,
      eventName: string,
      marketName: string
    ) => {
      dispatch(
        toggleSelection({
          id: selection.id,
          eventId,
          eventName,
          marketName,
          outcomeName: selection.name,
          odds: selection.odds,
        })
      );
    },
    [dispatch]
  );

  return { selections, isSelected, toggle };
}
