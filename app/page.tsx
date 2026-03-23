"use client";

import { useState } from "react";
import Header from "@/components/layout/Header/Header";
import ViewTabs, { ViewType } from "@/components/layout/ViewTabs/ViewTabs";
import BetSlipFAB from "@/components/shared/BetSlipFAB/BetSlipFAB";
import styles from "./page.module.scss";

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("agenda");

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
      </main>
      <BetSlipFAB />
    </div>
  );
}
