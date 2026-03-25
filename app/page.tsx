"use client";

import { useRef, useState } from "react";
import Header from "@/components/layout/Header/Header";
import ViewTabs from "@/components/layout/ViewTabs/ViewTabs";
import MonthIndicator from "@/components/layout/MonthIndicator/MonthIndicator";
import AgendaView, {
  AgendaViewHandle,
} from "@/components/agenda/AgendaView/AgendaView";
import AgendaSkeleton from "@/components/agenda/AgendaSkeleton/AgendaSkeleton";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import { ViewType } from "@/types/view";
import { useEvents } from "@/hooks/useEvents";
import { getMonthName, PROJECT_TODAY } from "@/utils/date";
import styles from "./page.module.scss";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");
  const [currentMonth, setCurrentMonth] = useState(getMonthName(PROJECT_TODAY));
  const agendaRef = useRef<AgendaViewHandle>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { events, status } = useEvents();

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.stickyBar}>
          <ViewTabs activeView={activeView} onViewChange={setActiveView} />
          <MonthIndicator
            month={currentMonth}
            onTodayClick={() => agendaRef.current?.scrollToToday()}
          />
        </div>
        <div ref={scrollAreaRef} className={styles.scrollArea}>
          {status === "loading" && <AgendaSkeleton />}
          {status === "succeeded" && activeView === "agenda" && (
            <AgendaView
              ref={agendaRef}
              events={events}
              onMonthChange={setCurrentMonth}
              scrollContainerRef={scrollAreaRef}
            />
          )}
          {status === "failed" && (
            <div className={styles.error}>Error al cargar los eventos</div>
          )}
        </div>
      </main>
      <BetSlipFAB />
    </div>
  );
}
