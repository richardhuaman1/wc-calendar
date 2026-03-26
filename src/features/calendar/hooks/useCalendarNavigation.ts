import { useCallback, useRef, useState } from "react";
import { ViewType, ScrollableViewHandle } from "@/features/calendar/types/view";
import { getMonthName, PROJECT_TODAY } from "@/features/calendar/utils/date";

export function useCalendarNavigation() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");
  const [currentMonth, setCurrentMonth] = useState(getMonthName(PROJECT_TODAY));
  const viewRef = useRef<ScrollableViewHandle>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToToday = useCallback(() => {
    viewRef.current?.scrollToToday();
  }, []);

  return {
    activeView,
    setActiveView,
    currentMonth,
    setCurrentMonth,
    viewRef,
    scrollAreaRef,
    scrollToToday,
  };
}
