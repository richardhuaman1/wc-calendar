"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { CalendarEvent } from "@/types/event";
import {
  getWeekDays,
  shiftWeek,
  formatDateKey,
  getMonthName,
  PROJECT_TODAY,
} from "@/utils/date";
import { useBetslip } from "@/hooks/useBetslip";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import WeekHeader from "./WeekHeader";
import TimeGrid from "./TimeGrid";
import EventPopup from "@/components/calendar/EventPopup/EventPopup";
import styles from "./WeekView.module.scss";

interface WeekViewProps {
  events: CalendarEvent[];
  onMonthChange: (month: string) => void;
}

export interface WeekViewHandle {
  scrollToToday: () => void;
}

interface PopupState {
  event: CalendarEvent;
  anchorRect: DOMRect;
}

const WeekView = forwardRef<WeekViewHandle, WeekViewProps>(
  function WeekView({ events, onMonthChange }, ref) {
    const [weekOffset, setWeekOffset] = useState(0);
    const [popup, setPopup] = useState<PopupState | null>(null);

    const { isSelected, toggle } = useBetslip();

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

    const goToNextWeek = useCallback(() => {
      setWeekOffset((o) => o + 1);
      setPopup(null);
    }, []);
    const goToPrevWeek = useCallback(() => {
      setWeekOffset((o) => o - 1);
      setPopup(null);
    }, []);

    const { handlers, dragOffset, isDragging } = useHorizontalSwipe({
      onSwipeLeft: goToNextWeek,
      onSwipeRight: goToPrevWeek,
    });

    const handleEventClick = useCallback(
      (event: CalendarEvent, anchorEl: HTMLElement) => {
        setPopup({ event, anchorRect: anchorEl.getBoundingClientRect() });
      },
      []
    );

    const handleClosePopup = useCallback(() => setPopup(null), []);

    useImperativeHandle(
      ref,
      () => ({
        scrollToToday: () => setWeekOffset(0),
      }),
      []
    );

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
          onEventClick={handleEventClick}
        />

        {popup && (
          <EventPopup
            event={popup.event}
            anchorRect={popup.anchorRect}
            onClose={handleClosePopup}
            onOddsToggle={toggle}
            isSelected={isSelected}
          />
        )}
      </div>
    );
  }
);

export default WeekView;
