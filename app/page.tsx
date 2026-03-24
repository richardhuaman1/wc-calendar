"use client";

import { useState } from "react";
import Header from "@/components/layout/Header/Header";
import ViewTabs, { ViewType } from "@/components/layout/ViewTabs/ViewTabs";
import MonthIndicator from "@/components/layout/MonthIndicator/MonthIndicator";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import styles from "./page.module.scss";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
        <MonthIndicator month="Junio" />
      </main>
      <BetSlipFAB />
    </div>
  );
}
