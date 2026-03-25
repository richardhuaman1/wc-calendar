"use client";

import { useRef, useState } from "react";
import Header from "@/components/layout/Header/Header";
import ViewTabs from "@/components/layout/ViewTabs/ViewTabs";
import MonthIndicator from "@/components/layout/MonthIndicator/MonthIndicator";
import AgendaView, {
  AgendaViewHandle,
} from "@/components/agenda/AgendaView/AgendaView";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import { ViewType } from "@/types/view";
import MOCK_EVENTS from "@/utils/mockEvents";
import { getMonthName, PROJECT_TODAY } from "@/utils/date";
import styles from "./page.module.scss";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");
  const [currentMonth, setCurrentMonth] = useState(getMonthName(PROJECT_TODAY));
  const agendaRef = useRef<AgendaViewHandle>(null);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
        <MonthIndicator
          month={currentMonth}
          onTodayClick={() => agendaRef.current?.scrollToToday()}
        />
        {activeView === "agenda" && (
          <AgendaView
            ref={agendaRef}
            events={MOCK_EVENTS}
            onMonthChange={setCurrentMonth}
          />
        )}
      </main>
      <BetSlipFAB />
    </div>
  );
}
