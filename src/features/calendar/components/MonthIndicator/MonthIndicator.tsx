"use client";

import { TODAY_BUTTON_LABEL } from "@/shared/constants/labels";
import styles from "./MonthIndicator.module.scss";

interface MonthIndicatorProps {
  month: string;
  onTodayClick?: () => void;
}

export default function MonthIndicator({ month, onTodayClick }: MonthIndicatorProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2 className={styles.month}>{month}</h2>
        <button className={styles.todayBtn} onClick={onTodayClick}>
          {TODAY_BUTTON_LABEL}
        </button>
      </div>
    </div>
  );
}
