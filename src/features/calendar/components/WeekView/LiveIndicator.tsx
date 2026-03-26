import styles from "./WeekEventCard.module.scss";

export default function LiveIndicator() {
  return (
    <div className={styles.liveIndicator} aria-label="En vivo">
      <div className={styles.liveDot}>
        <div className={styles.liveDotPulse} />
        <div className={styles.liveDotCore} />
      </div>
    </div>
  );
}
