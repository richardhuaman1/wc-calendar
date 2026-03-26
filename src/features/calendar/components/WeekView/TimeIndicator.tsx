import { useMemo } from "react";
import { PROJECT_TODAY, getHour, getMinute, isSameDay } from "@/features/calendar/utils/date";
import { WEEK_ROW_HEIGHT } from "@/features/calendar/utils/constants";
import styles from "./WeekView.module.scss";

interface TimeIndicatorProps {
  weekDays: Date[];
}

export default function TimeIndicator({ weekDays }: TimeIndicatorProps) {
  const isCurrentWeek = useMemo(
    () => weekDays.some((day) => isSameDay(day, PROJECT_TODAY)),
    [weekDays]
  );

  if (!isCurrentWeek) return null;

  const hour = getHour(PROJECT_TODAY);
  const minute = getMinute(PROJECT_TODAY);

  const topPx = (hour * 2 + minute / 30) * WEEK_ROW_HEIGHT;

  return (
    <div className={styles.timeIndicator} style={{ top: `${topPx}px` }}>
      <div className={styles.timeIndicatorDot} />
      <div className={styles.timeIndicatorLine} />
    </div>
  );
}
