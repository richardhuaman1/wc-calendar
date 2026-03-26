import styles from "./WeekEventCard.module.scss";

interface WeekEventCountCardProps {
  count: number;
}

export default function WeekEventCountCard({ count }: WeekEventCountCardProps) {
  return (
    <div className={styles.countCard}>
      <div className={styles.countCircle}>
        <span className={styles.countNumber}>{count}</span>
        <span className={styles.countLabel}>Eventos</span>
      </div>
    </div>
  );
}
