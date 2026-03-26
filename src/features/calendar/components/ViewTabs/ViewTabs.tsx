"use client";

import { ViewTab, ViewType } from "@/features/calendar/types/view";
import { TAB_AGENDA, TAB_THREE_DAYS, TAB_WEEK } from "@/shared/constants/labels";
import AgendaIcon from "@/shared/components/icons/AgendaIcon";
import ThreeDaysIcon from "@/shared/components/icons/ThreeDaysIcon";
import WeekIcon from "@/shared/components/icons/WeekIcon";
import Fifa2026Logo from "@/shared/components/icons/Fifa2026Logo";
import styles from "./ViewTabs.module.scss";

interface ViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const tabs: ViewTab[] = [
  { id: "agenda", label: TAB_AGENDA, icon: <AgendaIcon /> },
  { id: "3dias", label: TAB_THREE_DAYS, icon: <ThreeDaysIcon /> },
  { id: "semana", label: TAB_WEEK, icon: <WeekIcon /> },
];

export default function ViewTabs({ activeView, onViewChange }: ViewTabsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.overlay} />
      <div className={styles.gradientFade} />

      <nav className={styles.container} aria-label="Vista del calendario">
        <div className={styles.brand}>
          <Fifa2026Logo />
        </div>

        <div className={styles.tabs} role="tablist">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeView === id}
              className={`${styles.tab} ${activeView === id ? styles.active : ""}`}
              onClick={() => onViewChange(id)}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
