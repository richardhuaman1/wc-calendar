import { CalendarEvent, DayGroup } from "@/types/event";

/**
 * Groups a flat list of calendar events into day-based buckets,
 * sorted chronologically by date.
 */
export function groupEventsByDay(events: CalendarEvent[]): DayGroup[] {
  const map = new Map<string, DayGroup>();

  events.forEach((event) => {
    const dateObj = new Date(event.startDate);
    const key = dateObj.toDateString();

    if (!map.has(key)) {
      map.set(key, { date: dateObj, events: [] });
    }
    map.get(key)!.events.push(event);
  });

  return Array.from(map.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}
