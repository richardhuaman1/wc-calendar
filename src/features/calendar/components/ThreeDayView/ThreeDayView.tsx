"use client";

import { forwardRef, useImperativeHandle } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { ScrollableViewHandle } from "@/features/calendar/types/view";
import { getThreeDays, shiftThreeDays } from "@/features/calendar/utils/date";
import { useBetslip } from "@/features/betting/hooks/useBetslip";
import { useEventsByDay } from "@/features/calendar/hooks/useEventsByDay";
import { useEventPopup } from "@/features/calendar/hooks/useEventPopup";
import { useGridNavigation } from "@/features/calendar/hooks/useGridNavigation";
import WeekHeader from "@/features/calendar/components/WeekView/WeekHeader";
import TimeGrid from "@/features/calendar/components/WeekView/TimeGrid";
import GridOverlays from "@/features/calendar/components/GridOverlays/GridOverlays";
import styles from "./ThreeDayView.module.scss";

interface ThreeDayViewProps {
  events: CalendarEvent[];
  onMonthChange: (month: string) => void;
}

const ThreeDayView = forwardRef<ScrollableViewHandle, ThreeDayViewProps>(
  function ThreeDayView({ events, onMonthChange }, ref) {
    const { isSelected, toggle } = useBetslip();
    const eventsByDay = useEventsByDay(events);

    const {
      popup,
      multiEvents,
      openPopup,
      closePopup,
      openMulti,
      closeMulti,
      dismissAll,
    } = useEventPopup();

    const { days, handlers, dragOffset, isDragging, scrollToToday } =
      useGridNavigation({
        getDays: getThreeDays,
        shiftDate: shiftThreeDays,
        onMonthChange,
        onNavigate: dismissAll,
      });

    useImperativeHandle(ref, () => ({ scrollToToday }), [scrollToToday]);

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
            onEventClick={openPopup}
            onMultiEventClick={openMulti}
          />
        </div>

        <GridOverlays
          popup={popup}
          multiEvents={multiEvents}
          onClosePopup={closePopup}
          onCloseMulti={closeMulti}
          onOddsToggle={toggle}
          isSelected={isSelected}
        />
      </>
    );
  }
);

export default ThreeDayView;
