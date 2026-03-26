import {
  isSameDay as dfnIsSameDay,
  format,
  parseISO,
  compareAsc,
  getDate,
  startOfWeek,
  addDays,
  addWeeks,
  getHours,
  getMinutes,
} from "date-fns";
import { es } from "date-fns/locale";

/** Simulated "now" for development; replace with `new Date()` in production. */
export const PROJECT_TODAY = new Date("2026-06-11T14:00:00");

function toDate(value: string | Date): Date {
  return typeof value === "string" ? parseISO(value) : value;
}

export function isSameDay(a: string | Date, b: string | Date): boolean {
  return dfnIsSameDay(toDate(a), toDate(b));
}

export function getDayAbbreviation(date: string | Date): string {
  return format(toDate(date), "EEE", { locale: es });
}

export function getMonthName(date: string | Date): string {
  const month = format(toDate(date), "MMMM", { locale: es });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

export function formatEventTime(isoDate: string): string {
  return format(parseISO(isoDate), "HH:mm");
}

export function getDayNumber(date: string | Date): number {
  return getDate(toDate(date));
}

export function compareDatesAsc(a: string | Date, b: string | Date): number {
  return compareAsc(toDate(a), toDate(b));
}

export function formatDateKey(date: string | Date): string {
  return format(toDate(date), "yyyy-MM-dd");
}

/** Returns Monday of the week containing the given date. */
export function getWeekStart(date: string | Date): Date {
  return startOfWeek(toDate(date), { weekStartsOn: 1 });
}

/** Returns an array of 7 Date objects (Mon–Sun) for the week containing `date`. */
export function getWeekDays(date: string | Date): Date[] {
  const monday = getWeekStart(date);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

/** Shifts a date by `offset` weeks. */
export function shiftWeek(date: string | Date, offset: number): Date {
  return addWeeks(toDate(date), offset);
}

/** Returns an array of 3 consecutive Date objects starting from `date`. */
export function getThreeDays(date: string | Date): Date[] {
  const d = toDate(date);
  return Array.from({ length: 3 }, (_, i) => addDays(d, i));
}

/** Shifts a date by `offset` × 3 days. */
export function shiftThreeDays(date: string | Date, offset: number): Date {
  return addDays(toDate(date), offset * 3);
}

/** Returns the hour (0–23) of a date/string. */
export function getHour(date: string | Date): number {
  return getHours(toDate(date));
}

/** Returns the minute (0–59) of a date/string. */
export function getMinute(date: string | Date): number {
  return getMinutes(toDate(date));
}