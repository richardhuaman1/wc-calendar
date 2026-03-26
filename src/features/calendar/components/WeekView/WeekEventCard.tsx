import { CalendarEvent, EventParticipant } from "@/features/calendar/types/event";
import { TBD, VENUE_ROLE_HOME, VENUE_ROLE_AWAY, TEAM_SEPARATOR } from "@/features/calendar/utils/constants";
import { truncateName } from "@/features/calendar/utils/format";
import GlobeIcon from "@/shared/components/icons/GlobeIcon";
import styles from "./WeekEventCard.module.scss";

function LiveIndicator() {
  return (
    <div className={styles.liveIndicator}>
      <div className={styles.liveDot}>
        <div className={styles.liveDotPulse} />
        <div className={styles.liveDotCore} />
      </div>
    </div>
  );
}

interface ParticipantRowProps {
  participant: EventParticipant;
  compact?: boolean;
}

function ParticipantRow({ participant, compact = false }: ParticipantRowProps) {
  const isTbd = participant.name === TBD;

  const displayName = isTbd
    ? TBD
    : compact
      ? participant.shortCode
      : truncateName(participant.name);

  return (
    <div className={styles.participant}>
      {isTbd ? (
        <span className={styles.globeWrapper}>
          <GlobeIcon size={10} color="#A4A4A4" />
        </span>
      ) : (
        <span
          className={`fi fi-${participant.countryCode.toLowerCase()} fis ${styles.flag}`}
        />
      )}
      <span className={`${styles.teamName} ${isTbd ? styles.teamNameTbd : ""}`}>
        {displayName}
      </span>
    </div>
  );
}

interface ResultSectionProps {
  home: EventParticipant | undefined;
  away: EventParticipant | undefined;
  isLive: boolean;
}

function ResultSection({ home, away, isLive }: ResultSectionProps) {
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

interface PhaseBadgeProps {
  groupName: string;
}

function PhaseBadge({ groupName }: PhaseBadgeProps) {
  const parts = groupName.split(" ");
  const label = parts.length > 1 ? parts.slice(0, -1).join(" ") : "";
  const badge = parts[parts.length - 1];

  return (
    <div className={styles.phase}>
      {label && <span className={styles.phaseLabel}>{label}</span>}
      <div className={styles.badgeWrapper}>
        <span className={styles.badge}>{badge}</span>
      </div>
    </div>
  );
}

export interface WeekEventCardProps {
  event: CalendarEvent;
  /** When true, card is rendered in compact mode (side-by-side with another) */
  compact?: boolean;
}

export default function WeekEventCard({ event, compact = false }: WeekEventCardProps) {
  const home = event.participants.find((p) => p.role === VENUE_ROLE_HOME);
  const away = event.participants.find((p) => p.role === VENUE_ROLE_AWAY);
  const isLive = home?.score !== undefined && away?.score !== undefined;

  const cardClass = `${styles.card} ${compact ? styles.cardCompact : ""}`;

  return (
    <article className={cardClass} aria-label={event.name}>
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
