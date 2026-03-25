import {
  isSameDay as dfnIsSameDay,
  format,
  parseISO,
  compareAsc,
  getDate,
} from "date-fns";
import { es } from "date-fns/locale";

export const PROJECT_TODAY = new Date("2026-06-11T00:00:00");

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
  return format(toDate(date), "MMMM", { locale: es });
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
