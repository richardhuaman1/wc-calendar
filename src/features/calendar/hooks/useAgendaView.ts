import { type RefObject, useCallback, useMemo } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { formatDateKey, PROJECT_TODAY } from "@/features/calendar/utils/date";
import { groupEventsByDay } from "@/features/calendar/utils/groupEventsByDay";
import { useBetslip } from "@/features/betting/hooks/useBetslip";
import { useAccordion } from "@/features/calendar/hooks/useAccordion";
import { useMonthObserver } from "@/features/calendar/hooks/useMonthObserver";
import { useDayGroupRefs } from "@/features/calendar/hooks/useDayGroupRefs";

export function useAgendaView(
  events: CalendarEvent[],
  onMonthChange?: (month: string) => void,
  scrollContainerRef?: RefObject<HTMLDivElement | null>
) {
  const { isSelected, toggle } = useBetslip();

  const dayGroups = useMemo(() => groupEventsByDay(events), [events]);

  const { expandedEventIds, toggleExpand, expandToday } =
    useAccordion(events);

  const { dayGroupRefs, setDayGroupRef, scrollToDay } = useDayGroupRefs();

  useMonthObserver(dayGroups, dayGroupRefs, onMonthChange, scrollContainerRef);

  const scrollToToday = useCallback(() => {
    scrollToDay(formatDateKey(PROJECT_TODAY));
    expandToday();
  }, [scrollToDay, expandToday]);

  return {
    dayGroups,
    expandedEventIds,
    toggleExpand,
    toggle,
    isSelected,
    setDayGroupRef,
    scrollToToday,
  };
}
