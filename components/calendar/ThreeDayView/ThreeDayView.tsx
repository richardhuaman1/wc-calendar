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
  getThreeDays,
  shiftThreeDays,
  formatDateKey,
  getMonthName,
  PROJECT_TODAY,
} from "@/utils/date";
import { useBetslip } from "@/hooks/useBetslip";
import { useHorizontalSwipe } from "@/hooks/useHorizontalSwipe";
import WeekHeader from "@/components/calendar/WeekView/WeekHeader";
import TimeGrid from "@/components/calendar/WeekView/TimeGrid";
import EventPopup from "@/components/calendar/EventPopup/EventPopup";
import EventListModal from "@/components/calendar/EventListModal/EventListModal";
import styles from "./ThreeDayView.module.scss";

interface ThreeDayViewProps {
  events: CalendarEvent[];
  onMonthChange: (month: string) => void;
}

export interface ThreeDayViewHandle {
  scrollToToday: () => void;
}

interface PopupState {
  event: CalendarEvent;
  anchorRect: DOMRect;
}

const ThreeDayView = forwardRef<ThreeDayViewHandle, ThreeDayViewProps>(
  function ThreeDayView({ events, onMonthChange }, ref) {
    const [pageOffset, setPageOffset] = useState(0);
    const [popup, setPopup] = useState<PopupState | null>(null);
    const [multiEvents, setMultiEvents] = useState<CalendarEvent[] | null>(null);

    const { isSelected, toggle } = useBetslip();

    const referenceDate = useMemo(
      () => shiftThreeDays(PROJECT_TODAY, pageOffset),
      [pageOffset]
    );

    const days = useMemo(() => getThreeDays(referenceDate), [referenceDate]);

    useEffect(() => {
      onMonthChange(getMonthName(days[0]));
    }, [days, onMonthChange]);

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

    const goToNext = useCallback(() => {
      setPageOffset((o) => o + 1);
      setPopup(null);
      setMultiEvents(null);
    }, []);
    const goToPrev = useCallback(() => {
      setPageOffset((o) => o - 1);
      setPopup(null);
      setMultiEvents(null);
    }, []);

    const { handlers, dragOffset, isDragging } = useHorizontalSwipe({
      onSwipeLeft: goToNext,
      onSwipeRight: goToPrev,
    });

    const handleEventClick = useCallback(
      (event: CalendarEvent, anchorEl: HTMLElement) => {
        setPopup({ event, anchorRect: anchorEl.getBoundingClientRect() });
      },
      []
    );

    const handleClosePopup = useCallback(() => setPopup(null), []);

    const handleMultiEventClick = useCallback(
      (events: CalendarEvent[]) => setMultiEvents(events),
      []
    );
    const handleCloseMulti = useCallback(() => setMultiEvents(null), []);

    useImperativeHandle(
      ref,
      () => ({
        scrollToToday: () => setPageOffset(0),
      }),
      []
    );

    return (
      <>
        <div
          className={styles.container}
          onTouchStart={handlers.onTouchStart}
          onTouchMove={handlers.onTouchMove}
          onTouchEnd={handlers.onTouchEnd}
        >
          <WeekHeader weekDays={days} />
          <TimeGrid
            weekDays={days}
            eventsByDay={eventsByDay}
            dragOffset={dragOffset}
            isDragging={isDragging}
            onEventClick={handleEventClick}
            onMultiEventClick={handleMultiEventClick}
          />
        </div>

        {popup && (
          <EventPopup
            event={popup.event}
            anchorRect={popup.anchorRect}
            onClose={handleClosePopup}
            onOddsToggle={toggle}
            isSelected={isSelected}
          />
        )}

        {multiEvents && (
          <EventListModal
            events={multiEvents}
            onClose={handleCloseMulti}
            onOddsToggle={toggle}
            isSelected={isSelected}
          />
        )}
      </>
    );
  }
);

export default ThreeDayView;
