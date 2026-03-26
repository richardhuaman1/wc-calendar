import { CalendarEvent } from "@/features/calendar/types/event";
import { getEventParticipants, isLiveEvent } from "@/features/calendar/utils/getParticipantNames";
import LiveIndicator from "./LiveIndicator";
import ParticipantRow from "./ParticipantRow";
import ResultSection from "./ResultSection";
import PhaseBadge from "./PhaseBadge";
import styles from "./WeekEventCard.module.scss";

export interface WeekEventCardProps {
  event: CalendarEvent;
  compact?: boolean;
}

export default function WeekEventCard({ event, compact = false }: WeekEventCardProps) {
  const { home, away } = getEventParticipants(event);
  const isLive = isLiveEvent(event);

  return (
    <article
      className={`${styles.card} ${compact ? styles.cardCompact : ""}`}
      aria-label={event.name}
    >
      <div className={styles.content}>
        {isLive && <LiveIndicator />}
        <div className={styles.teamsAndResult}>
          {home && <ParticipantRow participant={home} compact={compact} />}
          <ResultSection home={home} away={away} isLive={isLive} />
          {away && <ParticipantRow participant={away} compact={compact} />}
        </div>
        <PhaseBadge groupName={event.groupName} />
      </div>
    </article>
  );
}
