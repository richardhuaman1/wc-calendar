"use client";

import { ViewType } from "@/types/view";
import AgendaIcon from "@/components/shared/icons/AgendaIcon";
import ThreeDaysIcon from "@/components/shared/icons/ThreeDaysIcon";
import WeekIcon from "@/components/shared/icons/WeekIcon";
import Fifa2026Logo from "@/components/shared/icons/Fifa2026Logo";
import styles from "./ViewTabs.module.scss";

interface ViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const tabs: { id: ViewType; label: string; icon: React.ReactNode }[] = [
  { id: "agenda", label: "Agenda", icon: <AgendaIcon /> },
  { id: "3dias", label: "3 Días", icon: <ThreeDaysIcon /> },
  { id: "semana", label: "Semana", icon: <WeekIcon /> },
];

export default function ViewTabs({ activeView, onViewChange }: ViewTabsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.overlay} />
      <div className={styles.gradientFade} />

      <div className={styles.container}>
        <div className={styles.brand}>
          <Fifa2026Logo />
        </div>

        <div className={styles.tabs}>
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`${styles.tab} ${activeView === id ? styles.active : ""}`}
              onClick={() => onViewChange(id)}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
