import { useCallback } from "react";
import { OddsOption } from "@/types/event";
import { selectSelections, toggleSelection } from "@/store/betslipSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export function useBetslip() {
  const dispatch = useAppDispatch();
  const selections = useAppSelector(selectSelections);

  const isOddSelected = useCallback(
    (oddId: string) => selections.some((s) => s.id === oddId),
    [selections]
  );

  const toggleOdd = useCallback(
    (odd: OddsOption, eventId: string, eventName: string) => {
      dispatch(
        toggleSelection({
          id: odd.id,
          eventId,
          eventName,
          outcomeName: odd.label,
          odds: odd.value,
        })
      );
    },
    [dispatch]
  );

  return { isOddSelected, toggleOdd };
}
