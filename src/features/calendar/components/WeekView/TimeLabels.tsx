import { WEEK_HOURS } from "@/features/calendar/utils/constants";
import { formatHourTime, formatHourPeriod } from "@/features/calendar/utils/format";
import styles from "./WeekView.module.scss";

export default function TimeLabels() {
  return (
    <div className={styles.timeLabels} aria-hidden="true">
      {WEEK_HOURS.map((hour) => (
        <div key={hour} className={styles.timeSlot}>
          <div className={styles.timeLabel}>
            <span className={styles.timeLabelTime}>{formatHourTime(hour)}</span>
            <span className={styles.timeLabelPeriod}>{formatHourPeriod(hour)}</span>
          </div>
          <div className={styles.timeLabel} />
        </div>
      ))}
    </div>
  );
}
