import { useMemo } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { formatDateKey } from "@/features/calendar/utils/date";

export function useEventsByDay(events: CalendarEvent[]) {
  return useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = formatDateKey(event.startDate);
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
    return map;
  }, [events]);
}
