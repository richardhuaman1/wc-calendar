import { useCallback, useEffect, useMemo, useState } from "react";
import { getMonthName, PROJECT_TODAY } from "@/features/calendar/utils/date";
import { useHorizontalSwipe } from "./useHorizontalSwipe";

interface GridNavigationConfig {
  getDays: (refDate: Date) => Date[];
  shiftDate: (base: Date, offset: number) => Date;
  onMonthChange: (month: string) => void;
  onNavigate?: () => void;
}

export function useGridNavigation({
  getDays,
  shiftDate,
  onMonthChange,
  onNavigate,
}: GridNavigationConfig) {
  const [pageOffset, setPageOffset] = useState(0);

  const referenceDate = useMemo(
    () => shiftDate(PROJECT_TODAY, pageOffset),
    [pageOffset, shiftDate]
  );

  const days = useMemo(() => getDays(referenceDate), [referenceDate, getDays]);

  useEffect(() => {
    onMonthChange(getMonthName(days[0]));
  }, [days, onMonthChange]);

  const goToNext = useCallback(() => {
    setPageOffset((o) => o + 1);
    onNavigate?.();
  }, [onNavigate]);

  const goToPrev = useCallback(() => {
    setPageOffset((o) => o - 1);
    onNavigate?.();
  }, [onNavigate]);

  const { handlers, dragOffset, isDragging } = useHorizontalSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  });

  const scrollToToday = useCallback(() => setPageOffset(0), []);

  return { days, handlers, dragOffset, isDragging, scrollToToday };
}
