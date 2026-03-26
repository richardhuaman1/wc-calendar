import { CalendarEvent, DayGroup } from "@/features/calendar/types/event";
import { parseISO } from "date-fns";
import { compareDatesAsc, formatDateKey } from "./date";

/**
 * Groups a flat list of calendar events into day-based buckets,
 * sorted chronologically by date.
 */
export function groupEventsByDay(events: CalendarEvent[]): DayGroup[] {
  const map = new Map<string, DayGroup>();

  events.forEach((event) => {
    const key = formatDateKey(event.startDate);

    if (!map.has(key)) {
      map.set(key, { date: parseISO(event.startDate), events: [] });
    }
    map.get(key)!.events.push(event);
  });

  return Array.from(map.values()).sort((a, b) =>
    compareDatesAsc(a.date, b.date)
  );
}
