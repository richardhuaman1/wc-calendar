import { ApiResponse } from "@/types/api";
import { CalendarEvent } from "@/types/event";
import { compareDatesAsc } from "@/utils/date";
import { API_ERROR_PREFIX } from "@/utils/labels";
import { adaptApiEventToDomain } from "@/adapters/eventAdapter";
import envConfig from "./envConfig";

/**
 * Fetches calendar events from the World Cup API.
 */
async function fetchCalendarEventsFromApi(): Promise<CalendarEvent[]> {
  const response = await fetch(envConfig.apiUrl);

  if (!response.ok) {
    throw new Error(`${API_ERROR_PREFIX}: ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;
  return data.Events.map(adaptApiEventToDomain);
}

/**
 * Fetches API events and merges them with knockout-stage fixtures,
 * returning a single chronologically-sorted list.
 */
export async function fetchAllEvents(): Promise<CalendarEvent[]> {
  const { KNOCKOUT_EVENTS } = await import("@/utils/mockEvents");
  const apiEvents = await fetchCalendarEventsFromApi();

  return [...apiEvents, ...KNOCKOUT_EVENTS].sort((a, b) =>
    compareDatesAsc(a.startDate, b.startDate)
  );
}
