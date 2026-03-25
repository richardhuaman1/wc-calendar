import { CalendarEvent } from "@/types/event";
import { TBD, TEAM_SEPARATOR } from "@/utils/constants";
import { TBD_DISPLAY } from "@/utils/labels";
import WorldCupLeagueIcon from "@/components/shared/icons/WorldCupLeagueIcon";
import StatsIcon from "@/components/shared/icons/StatsIcon";
import BetBuilderIcon from "@/components/shared/icons/BetBuilderIcon";
import styles from "./EventCard.module.scss";

function TeamName({ name }: { name: string }) {
  if (name === TBD) {
    return <span className={styles.nameTbd}>{TBD_DISPLAY}</span>;
  }
  return <>{name}</>;
}

interface EventHeaderProps {
  event: CalendarEvent;
  home: string;
  away: string;
}

export default function EventHeader({ event, home, away }: EventHeaderProps) {
  return (
    <div className={styles.info}>
      <div className={styles.nameRow}>
        <span className={styles.name}>
          <TeamName name={home} />
          {` ${TEAM_SEPARATOR} `}
          <TeamName name={away} />
        </span>
        <span className={styles.group}>{event.groupName}</span>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.time}>{event.time}</span>
        <div className={styles.leagueInfo}>
          <span className={styles.leagueIcon}>
            <WorldCupLeagueIcon />
          </span>
          <span className={styles.league}>{event.league}</span>
        </div>
        <div className={styles.icons}>
          {event.hasStats && <StatsIcon />}
          {event.hasBetBuilder && <BetBuilderIcon />}
        </div>
      </div>
    </div>
  );
}
