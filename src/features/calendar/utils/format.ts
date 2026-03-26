import { WEEK_CARD_NAME_MAX_LENGTH } from "@/features/calendar/utils/constants";

export function truncateName(
  name: string,
  maxLength: number = WEEK_CARD_NAME_MAX_LENGTH
): string {
  if (name.length <= maxLength) return name;
  return name.slice(0, maxLength).trimEnd() + "…";
}

/** Formats a 0-23 hour into 12-hour clock string, e.g. 0→"12:00", 13→"1:00". */
export function formatHourTime(hour: number): string {
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:00`;
}

/** Returns "AM" or "PM" for a 0-23 hour value. */
export function formatHourPeriod(hour: number): string {
  return hour < 12 ? "AM" : "PM";
}
