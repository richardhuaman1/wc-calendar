import { getDayAbbreviation, getDayNumber, isSameDay, PROJECT_TODAY } from "@/features/calendar/utils/date";
import styles from "./WeekView.module.scss";

interface WeekHeaderProps {
  weekDays: Date[];
}

export default function WeekHeader({ weekDays }: WeekHeaderProps) {
  return (
    <div className={styles.headerBar}>
      <div className={styles.headerSpacer} />
      {weekDays.map((day) => {
        const isToday = isSameDay(day, PROJECT_TODAY);
        return (
          <div
            key={day.toISOString()}
            className={`${styles.headerDay} ${isToday ? styles.headerDayToday : ""}`}
          >
            <span className={styles.headerDayName}>
              {getDayAbbreviation(day)}
            </span>
            <span className={styles.headerDayNumber}>
              {getDayNumber(day)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
