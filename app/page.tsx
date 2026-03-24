"use client";

import { useState } from "react";
import Header from "@/components/layout/Header/Header";
import ViewTabs from "@/components/layout/ViewTabs/ViewTabs";
import MonthIndicator from "@/components/layout/MonthIndicator/MonthIndicator";
import AgendaView from "@/components/agenda/AgendaView/AgendaView";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import { ViewType } from "@/types/view";
import MOCK_EVENTS from "@/utils/mockEvents";
import styles from "./page.module.scss";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
        <MonthIndicator month="Junio" />
        {activeView === "agenda" && <AgendaView events={MOCK_EVENTS} />}
      </main>
      <BetSlipFAB />
    </div>
  );
}
