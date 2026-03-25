"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { CalendarEvent } from "@/types/event";
import {
  getWeekDays,
  shiftWeek,
  formatDateKey,
  getMonthName,
  PROJECT_TODAY,
} from "@/utils/date";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import WeekHeader from "./WeekHeader";
import TimeGrid from "./TimeGrid";
import styles from "./WeekView.module.scss";

interface WeekViewProps {
  events: CalendarEvent[];
  onMonthChange: (month: string) => void;
}

export interface WeekViewHandle {
  scrollToToday: () => void;
}

const WeekView = forwardRef<WeekViewHandle, WeekViewProps>(
  function WeekView({ events, onMonthChange }, ref) {
    const [weekOffset, setWeekOffset] = useState(0);

    const referenceDate = useMemo(
      () => shiftWeek(PROJECT_TODAY, weekOffset),
      [weekOffset]
    );

    const weekDays = useMemo(() => getWeekDays(referenceDate), [referenceDate]);

    // Update parent's month indicator when visible week changes
    useEffect(() => {
      onMonthChange(getMonthName(weekDays[0]));
    }, [weekDays, onMonthChange]);

    // Index events by day key for O(1) lookup in the grid
    const eventsByDay = useMemo(() => {
      const map = new Map<string, CalendarEvent[]>();
      for (const event of events) {
        const key = formatDateKey(event.startDate);
        const list = map.get(key);
        if (list) {
          list.push(event);
        } else {
          map.set(key, [event]);
        }
      }
      return map;
    }, [events]);

    const goToNextWeek = useCallback(() => setWeekOffset((o) => o + 1), []);
    const goToPrevWeek = useCallback(() => setWeekOffset((o) => o - 1), []);

    const { handlers, dragOffset, isDragging } = useHorizontalSwipe({
      onSwipeLeft: goToNextWeek,
      onSwipeRight: goToPrevWeek,
    });

    useImperativeHandle(ref, () => ({
      scrollToToday: () => setWeekOffset(0),
    }), []);

    return (
      <div
        className={styles.container}
        onTouchStart={handlers.onTouchStart}
        onTouchMove={handlers.onTouchMove}
        onTouchEnd={handlers.onTouchEnd}
      >
        <WeekHeader weekDays={weekDays} />
        <TimeGrid
          weekDays={weekDays}
          eventsByDay={eventsByDay}
          dragOffset={dragOffset}
          isDragging={isDragging}
        />
      </div>
    );
  }
);

export default WeekView;
