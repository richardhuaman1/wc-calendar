import { CalendarEvent } from "@/features/calendar/types/event";
import { TBD, TEAM_SEPARATOR } from "@/features/calendar/utils/constants";
import { TBD_DISPLAY } from "@/shared/constants/labels";
import WorldCupLeagueIcon from "@/shared/components/icons/WorldCupLeagueIcon";
import StatsIcon from "@/shared/components/icons/StatsIcon";
import BetBuilderIcon from "@/shared/components/icons/BetBuilderIcon";
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
        <h3 className={styles.name}>
          <TeamName name={home} />
          {` ${TEAM_SEPARATOR} `}
          <TeamName name={away} />
        </h3>
        <span className={styles.group}>{event.groupName}</span>
      </div>
      <div className={styles.metaRow}>
        <time className={styles.time} dateTime={event.startDate}>{event.time}</time>
        <div className={styles.leagueInfo}>
          <span className={styles.leagueIcon}>
            <WorldCupLeagueIcon />
          </span>
          <span className={styles.league}>{event.league}</span>
        </div>
        <div className={styles.icons} aria-hidden="true">
          {event.hasStats && <StatsIcon />}
          {event.hasBetBuilder && <BetBuilderIcon />}
        </div>
      </div>
    </div>
  );
}
