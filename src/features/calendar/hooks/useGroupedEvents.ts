import { useMemo } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { formatDateKey } from "@/features/calendar/utils/date";
import { groupEventsByTime, EventGroup } from "@/features/calendar/utils/eventGrouping";

export function useGroupedEvents(
  days: Date[],
  eventsByDay: Map<string, CalendarEvent[]>
): Map<string, EventGroup[]> {
  return useMemo(() => {
    const result = new Map<string, EventGroup[]>();
    for (const day of days) {
      const key = formatDateKey(day);
      const dayEvents = eventsByDay.get(key) ?? [];
      result.set(key, groupEventsByTime(dayEvents));
    }
    return result;
  }, [days, eventsByDay]);
}
