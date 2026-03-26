import { EventParticipant } from "@/features/calendar/types/event";
import { TBD } from "@/features/calendar/utils/constants";
import { getParticipantDisplayName } from "@/features/calendar/utils/format";
import GlobeIcon from "@/shared/components/icons/GlobeIcon";
import styles from "./WeekEventCard.module.scss";

interface ParticipantRowProps {
  participant: EventParticipant;
  compact: boolean;
}

export default function ParticipantRow({ participant, compact }: ParticipantRowProps) {
  const isTbd = participant.name === TBD;
  const displayName = getParticipantDisplayName(participant, compact);

  return (
    <div className={styles.participant}>
      {isTbd ? (
        <span className={styles.globeWrapper}>
          <GlobeIcon size={10} color="#A4A4A4" />
        </span>
      ) : (
        <span
          className={`fi fi-${participant.countryCode.toLowerCase()} fis ${styles.flag}`}
          aria-hidden="true"
        />
      )}
      <span className={`${styles.teamName} ${isTbd ? styles.teamNameTbd : ""}`}>
        {displayName}
      </span>
    </div>
  );
}
