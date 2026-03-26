"use client";

import { useRef, useState } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { ViewType } from "@/features/calendar/types/view";
import { getMonthName, PROJECT_TODAY } from "@/features/calendar/utils/date";
import ViewTabs from "@/features/calendar/components/ViewTabs/ViewTabs";
import MonthIndicator from "@/features/calendar/components/MonthIndicator/MonthIndicator";
import AgendaView, {
  AgendaViewHandle,
} from "@/features/calendar/components/AgendaView/AgendaView";
import ThreeDayView, {
  ThreeDayViewHandle,
} from "@/features/calendar/components/ThreeDayView/ThreeDayView";
import WeekView, { WeekViewHandle } from "@/features/calendar/components/WeekView/WeekView";
import BetSlipFAB from "@/features/betting/components/BetSlipFAB/BetSlipFAB";
import styles from "./CalendarShell.module.scss";

interface CalendarShellProps {
  events: CalendarEvent[];
}

export default function CalendarShell({ events }: CalendarShellProps) {
  const [activeView, setActiveView] = useState<ViewType>("agenda");
  const [currentMonth, setCurrentMonth] = useState(getMonthName(PROJECT_TODAY));
  const agendaRef = useRef<AgendaViewHandle>(null);
  const threeDayRef = useRef<ThreeDayViewHandle>(null);
  const weekRef = useRef<WeekViewHandle>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.stickyBar}>
          <ViewTabs activeView={activeView} onViewChange={setActiveView} />
          <MonthIndicator
            month={currentMonth}
            onTodayClick={() => {
              agendaRef.current?.scrollToToday();
              threeDayRef.current?.scrollToToday();
              weekRef.current?.scrollToToday();
            }}
          />
        </div>
        <div ref={scrollAreaRef} className={styles.scrollArea}>
          {activeView === "agenda" && (
            <AgendaView
              ref={agendaRef}
              events={events}
              onMonthChange={setCurrentMonth}
              scrollContainerRef={scrollAreaRef}
            />
          )}
          {activeView === "3dias" && (
            <ThreeDayView
              ref={threeDayRef}
              events={events}
              onMonthChange={setCurrentMonth}
            />
          )}
          {activeView === "semana" && (
            <WeekView
              ref={weekRef}
              events={events}
              onMonthChange={setCurrentMonth}
            />
          )}
        </div>
      </main>
      <BetSlipFAB />
    </>
  );
}
