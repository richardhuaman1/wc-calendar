import { parseGroupName } from "@/features/calendar/utils/parseGroupName";
import styles from "./WeekEventCard.module.scss";

interface PhaseBadgeProps {
  groupName: string;
}

export default function PhaseBadge({ groupName }: PhaseBadgeProps) {
  const { label, badge } = parseGroupName(groupName);

  return (
    <div className={styles.phase}>
      {label && <span className={styles.phaseLabel}>{label}</span>}
      <div className={styles.badgeWrapper}>
        <span className={styles.badge}>{badge}</span>
      </div>
    </div>
  );
}
