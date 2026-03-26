import { EventParticipant } from "@/features/calendar/types/event";
import { TEAM_SEPARATOR } from "@/features/calendar/utils/constants";
import styles from "./WeekEventCard.module.scss";

interface ResultSectionProps {
  home?: EventParticipant;
  away?: EventParticipant;
  isLive: boolean;
}

export default function ResultSection({ home, away, isLive }: ResultSectionProps) {
  return (
    <div className={`${styles.result} ${isLive ? styles.resultLive : ""}`}>
      {isLive && home?.score !== undefined && (
        <span className={styles.score}>{home.score}</span>
      )}
      <span className={styles.separator}>{TEAM_SEPARATOR}</span>
      {isLive && away?.score !== undefined && (
        <span className={styles.score}>{away.score}</span>
      )}
    </div>
  );
}
