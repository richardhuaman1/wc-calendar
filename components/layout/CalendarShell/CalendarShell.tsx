"use client";

import { useRef, useState } from "react";
import { CalendarEvent } from "@/types/event";
import { ViewType } from "@/types/view";
import { getMonthName, PROJECT_TODAY } from "@/utils/date";
import ViewTabs from "@/components/layout/ViewTabs/ViewTabs";
import MonthIndicator from "@/components/layout/MonthIndicator/MonthIndicator";
import AgendaView, {
  AgendaViewHandle,
} from "@/components/calendar/AgendaView/AgendaView";
import ThreeDayView, {
  ThreeDayViewHandle,
} from "@/components/calendar/ThreeDayView/ThreeDayView";
import WeekView, { WeekViewHandle } from "@/components/calendar/WeekView/WeekView";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
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
