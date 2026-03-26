import { useCallback } from "react";
import { Selection } from "@/features/calendar/types/event";
import { BetslipStore } from "../store/betslip.store";

export function useBetslip() {
  const isSelected = BetslipStore.useIsSelected();
  const toggleRaw = BetslipStore.useToggle();

  const toggle = useCallback(
    (
      selection: Selection,
      eventId: string,
      eventName: string,
      marketName: string
    ) => {
      toggleRaw({
        id: selection.id,
        eventId,
        eventName,
        marketName,
        outcomeName: selection.name,
        odds: selection.odds,
      });
    },
    [toggleRaw]
  );

  return { isSelected, toggle };
}
