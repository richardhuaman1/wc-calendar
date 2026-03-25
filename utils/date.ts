import { APP_LOCALE } from "./constants";

export const PROJECT_TODAY = new Date("2026-06-11T00:00:00");

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

export function isSameDay(a: string | Date, b: string | Date): boolean {
  const da = toDate(a);
  const db = toDate(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

export function getDayAbbreviation(date: string | Date): string {
  return toDate(date).toLocaleDateString(APP_LOCALE, { weekday: "short" });
}

export function getMonthName(date: string | Date): string {
  return toDate(date).toLocaleDateString(APP_LOCALE, { month: "long" });
}

export function formatEventTime(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
