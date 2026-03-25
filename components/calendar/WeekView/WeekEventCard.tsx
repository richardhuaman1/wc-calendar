import { CalendarEvent, EventParticipant } from "@/types/event";
import { TBD, VENUE_ROLE_HOME, VENUE_ROLE_AWAY, TEAM_SEPARATOR } from "@/utils/constants";
import { truncateName } from "@/utils/format";
import GlobeIcon from "@/components/shared/icons/GlobeIcon";
import styles from "./WeekEventCard.module.scss";

// ── Sub-component: live indicator (pulsing dot) ─────────────
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

// ── Sub-component: participant row (flag + name) ────────────
interface ParticipantRowProps {
  participant: EventParticipant;
  compact?: boolean;
}

function ParticipantRow({ participant, compact = false }: ParticipantRowProps) {
  const isTbd = participant.name === TBD;

  const displayName = isTbd
    ? TBD
    : compact
      ? participant.countryCode.toUpperCase()
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

// ── Sub-component: score / vs section ───────────────────────
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

// ── Sub-component: phase badge (Grupo D, 16vos, etc.) ───────
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

// ── Main component ──────────────────────────────────────────
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
    <div className={cardClass}>
      <div className={styles.content}>
        {isLive && <LiveIndicator />}
        <div className={styles.teamsAndResult}>
          {home && <ParticipantRow participant={home} compact={compact} />}
          <ResultSection home={home} away={away} isLive={isLive} />
          {away && <ParticipantRow participant={away} compact={compact} />}
        </div>
        <PhaseBadge groupName={event.groupName} />
      </div>
    </div>
  );
}
