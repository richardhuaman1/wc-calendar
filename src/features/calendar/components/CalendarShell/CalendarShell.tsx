"use client";

import { CalendarEvent } from "@/features/calendar/types/event";
import { useCalendarNavigation } from "@/features/calendar/hooks/useCalendarNavigation";
import ViewTabs from "@/features/calendar/components/ViewTabs/ViewTabs";
import MonthIndicator from "@/features/calendar/components/MonthIndicator/MonthIndicator";
import CalendarViewRenderer from "./CalendarViewRenderer";
import BetSlipFAB from "@/features/betting/components/BetSlipFAB/BetSlipFAB";
import styles from "./CalendarShell.module.scss";

interface CalendarShellProps {
  events: CalendarEvent[];
}

export default function CalendarShell({ events }: CalendarShellProps) {
  const {
    activeView,
    setActiveView,
    currentMonth,
    setCurrentMonth,
    viewRef,
    scrollAreaRef,
    scrollToToday,
  } = useCalendarNavigation();

  return (
    <>
      <main className={styles.main}>
        <div className={styles.stickyBar}>
          <ViewTabs activeView={activeView} onViewChange={setActiveView} />
          <MonthIndicator month={currentMonth} onTodayClick={scrollToToday} />
        </div>
        <div ref={scrollAreaRef} className={styles.scrollArea}>
          <CalendarViewRenderer
            activeView={activeView}
            events={events}
            onMonthChange={setCurrentMonth}
            viewRef={viewRef}
            scrollAreaRef={scrollAreaRef}
          />
        </div>
      </main>
      <BetSlipFAB />
    </>
  );
}
