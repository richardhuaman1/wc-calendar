"use client";

import { TODAY_BUTTON_LABEL } from "@/utils/labels";
import styles from "./MonthIndicator.module.scss";

interface MonthIndicatorProps {
  month: string;
  onTodayClick?: () => void;
}

export default function MonthIndicator({ month, onTodayClick }: MonthIndicatorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.month}>{month}</span>
        <button className={styles.todayBtn} onClick={onTodayClick}>
          <span className={styles.todayLabel}>{TODAY_BUTTON_LABEL}</span>
        </button>
      </div>
    </div>
  );
}
