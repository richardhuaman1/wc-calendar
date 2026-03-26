import { useMemo, useState } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { isSameDay, PROJECT_TODAY } from "@/features/calendar/utils/date";

export function useAccordion(events: CalendarEvent[]) {
  const todayEventIds = useMemo(
    () =>
      new Set(
        events
          .filter((e) => isSameDay(e.startDate, PROJECT_TODAY))
          .map((e) => e.id)
      ),
    [events]
  );

  const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(
    () => new Set()
  );
  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized && todayEventIds.size > 0) {
    setIsInitialized(true);
    setExpandedEventIds(todayEventIds);
  }

  function toggleExpand(id: string) {
    const event = events.find((e) => e.id === id);
    const isToday = event
      ? isSameDay(event.startDate, PROJECT_TODAY)
      : false;

    setExpandedEventIds((prev) => {
      if (isToday) {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      }

      const pinned = new Set(
        [...prev].filter((eid) => todayEventIds.has(eid))
      );

      if (!prev.has(id)) pinned.add(id);

      return pinned;
    });
  }

  function expandToday() {
    setExpandedEventIds(new Set(todayEventIds));
  }

  return { expandedEventIds, todayEventIds, toggleExpand, expandToday };
}
