import { ApiResponse } from "@/features/calendar/types/api";
import { CalendarEvent } from "@/features/calendar/types/event";
import { compareDatesAsc } from "@/features/calendar/utils/date";
import { API_ERROR_PREFIX } from "@/shared/constants/labels";
import { adaptApiEventToDomain } from "@/features/calendar/adapters/eventAdapter";
import envConfig from "@/config/env";

async function fetchCalendarEventsFromApi(): Promise<CalendarEvent[]> {
  const response = await fetch(envConfig.apiUrl);

  if (!response.ok) {
    throw new Error(`${API_ERROR_PREFIX}: ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;
  return data.Events.map(adaptApiEventToDomain);
}

export async function fetchAllEvents(): Promise<CalendarEvent[]> {
  const { MOCK_EVENTS } = await import("@/features/calendar/utils/mockEvents");
  const apiEvents = await fetchCalendarEventsFromApi();

  return [...apiEvents, ...MOCK_EVENTS].sort((a, b) =>
    compareDatesAsc(a.startDate, b.startDate)
  );
}
