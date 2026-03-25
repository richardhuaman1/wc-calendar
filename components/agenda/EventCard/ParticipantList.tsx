import { EventParticipant } from "@/types/event";
import { SPONSOR_LABEL } from "@/utils/labels";
import Flag from "@/components/shared/Flag/Flag";
import ATIsotipoIcon from "@/components/shared/icons/ATIsotipoIcon";
import styles from "./EventCard.module.scss";

interface ParticipantListProps {
  participants: EventParticipant[];
}

export default function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div className={styles.participants}>
      {participants.map((p) => (
        <div key={p.id} className={styles.participantGroup}>
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
        </div>
      ))}
    </div>
  );
}
