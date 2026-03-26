import { useCallback, useRef } from "react";

export function useDayGroupRefs() {
  const dayGroupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const setDayGroupRef = useCallback(
    (dateKey: string, el: HTMLDivElement | null) => {
      if (el) dayGroupRefs.current.set(dateKey, el);
      else dayGroupRefs.current.delete(dateKey);
    },
    []
  );

  const scrollToDay = useCallback((dateKey: string) => {
    dayGroupRefs.current
      .get(dateKey)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { dayGroupRefs, setDayGroupRef, scrollToDay };
}
