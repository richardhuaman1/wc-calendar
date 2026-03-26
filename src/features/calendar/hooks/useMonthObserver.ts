import { type RefObject, useEffect, useRef } from "react";
import { DayGroup } from "@/features/calendar/types/event";
import { formatDateKey, getMonthName } from "@/features/calendar/utils/date";
import {
  DATA_ATTR_DATE_KEY,
  MONTH_OBSERVER_ROOT_MARGIN,
  MONTH_OBSERVER_THRESHOLD,
} from "@/features/calendar/utils/constants";

export function useMonthObserver(
  dayGroups: DayGroup[],
  dayGroupRefs: RefObject<Map<string, HTMLDivElement>>,
  onMonthChange: ((month: string) => void) | undefined,
  scrollContainerRef?: RefObject<HTMLDivElement | null>
) {
  const visibleDateKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!onMonthChange) return;

    const scrollRoot = scrollContainerRef?.current ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.getAttribute(DATA_ATTR_DATE_KEY) ?? "";
          if (entry.isIntersecting) visibleDateKeys.current.add(key);
          else visibleDateKeys.current.delete(key);
        });

        const topGroup = dayGroups.find((g) =>
          visibleDateKeys.current.has(formatDateKey(g.date))
        );
        if (topGroup) onMonthChange(getMonthName(topGroup.date));
      },
      {
        root: scrollRoot,
        threshold: MONTH_OBSERVER_THRESHOLD,
        rootMargin: MONTH_OBSERVER_ROOT_MARGIN,
      }
    );

    dayGroupRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [dayGroups, onMonthChange, scrollContainerRef, dayGroupRefs]);
}
