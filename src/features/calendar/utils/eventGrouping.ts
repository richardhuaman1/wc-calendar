import { CalendarEvent } from "@/features/calendar/types/event";
import { getHour, getMinute } from "@/features/calendar/utils/date";
import { WEEK_ROW_HEIGHT } from "@/features/calendar/utils/constants";

export interface EventGroup {
  timeKey: string;
  startRow: number;
  topPx: number;
  events: CalendarEvent[];
}

export function groupEventsByTime(dayEvents: CalendarEvent[]): EventGroup[] {
  const map = new Map<string, CalendarEvent[]>();

  for (const event of dayEvents) {
    const timeKey = `${getHour(event.startDate)}:${getMinute(event.startDate)}`;
    const group = map.get(timeKey) ?? [];
    group.push(event);
    map.set(timeKey, group);
  }

  return Array.from(map.entries()).map(([timeKey, events]) => {
    const h = getHour(events[0].startDate);
    const m = getMinute(events[0].startDate);
    const startRow = h * 2 + m / 30;
    const topPx = startRow * WEEK_ROW_HEIGHT;
    return { timeKey, startRow, topPx, events };
  });
}
