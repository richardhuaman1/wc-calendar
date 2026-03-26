import { EventParticipant } from "@/features/calendar/types/event";
import { SPONSOR_LABEL } from "@/shared/constants/labels";
import Flag from "@/shared/components/Flag/Flag";
import ATIsotipoIcon from "@/shared/components/icons/ATIsotipoIcon";
import styles from "./EventCard.module.scss";

interface ParticipantListProps {
  participants: EventParticipant[];
}

export default function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <ul className={styles.participants}>
      {participants.map((p) => (
        <li key={p.id} className={styles.participantGroup}>
          <div className={styles.participantRow}>
            <div className={styles.participantLeft}>
              <Flag countryCode={p.countryCode} />
              <span className={styles.participantName}>{p.name}</span>
            </div>
            {p.score !== undefined && (
              <span className={styles.participantScore}>{p.score}</span>
            )}
          </div>
          {p.isSponsored && (
            <div className={styles.sponsorBadge}>
              <span className={styles.sponsorText}>{SPONSOR_LABEL}</span>
              <ATIsotipoIcon />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
