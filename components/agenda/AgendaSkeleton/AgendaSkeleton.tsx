import styles from "./AgendaSkeleton.module.scss";

const GROUPS = [3, 3, 3];

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.shimmer} />
      <div className={styles.cardRow}>
        <div className={styles.titleChip} />
        <div className={styles.chevronChip} />
      </div>
      <div className={styles.cardRow}>
        <div className={styles.subtitleChip} />
        <div className={styles.groupChip} />
      </div>
    </div>
  );
}

function SkeletonDayGroup({ cardCount }: { cardCount: number }) {
  return (
    <div className={styles.dayGroup}>
      <div className={styles.dayIndicator}>
        <div className={styles.dayName} />
        <div className={styles.dayNumber} />
      </div>
      <div className={styles.cards}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default function AgendaSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.tabsPill} />
      <div className={styles.content}>
        {GROUPS.map((count, i) => (
          <div key={i}>
            <SkeletonDayGroup cardCount={count} />
            {i < GROUPS.length - 1 && <div className={styles.separator} />}
          </div>
        ))}
      </div>
    </div>
  );
}
