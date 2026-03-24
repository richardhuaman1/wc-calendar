export const PROJECT_TODAY = new Date("2026-06-11T00:00:00");

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getDayAbbreviation(date: Date): string {
  return date.toLocaleDateString("es-PE", { weekday: "short" });
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString("es-PE", { month: "long" });
}
