import { CalendarEvent } from "@/types/event";
import { VENUE_ROLE_HOME, VENUE_ROLE_AWAY, TEAM_SEPARATOR } from "@/utils/constants";
import { getHour, getMinute } from "@/utils/date";
import { WEEK_ROW_HEIGHT, WEEK_EVENT_DURATION_ROWS } from "@/utils/constants";
import styles from "./WeekView.module.scss";

interface WeekEventCardProps {
  event: CalendarEvent;
}

export default function WeekEventCard({ event }: WeekEventCardProps) {
  const home = event.participants.find((p) => p.role === VENUE_ROLE_HOME);
  const away = event.participants.find((p) => p.role === VENUE_ROLE_AWAY);

  const hour = getHour(event.startDate);
  const minute = getMinute(event.startDate);
  // 2 half-hour rows per hour, so multiply by 2
  const halfHourRows = hour * 2 + minute / 30;
  const topPx = halfHourRows * WEEK_ROW_HEIGHT;
  const heightPx = WEEK_EVENT_DURATION_ROWS * WEEK_ROW_HEIGHT;

  return (
    <div
      className={styles.eventCard}
      style={{ top: `${topPx}px`, height: `${heightPx}px` }}
    >
      {home && (
        <div className={styles.eventTeamRow}>
          <span className={`fi fi-${home.countryCode.toLowerCase()} ${styles.eventFlag}`} />
          <span className={styles.eventTeamCode}>{home.name}</span>
          {home.score !== undefined && (
            <span className={styles.eventScore}>{home.score}</span>
          )}
        </div>
      )}

      <span className={styles.eventSeparator}>{TEAM_SEPARATOR}</span>

      {away && (
        <div className={styles.eventTeamRow}>
          <span className={`fi fi-${away.countryCode.toLowerCase()} ${styles.eventFlag}`} />
          <span className={styles.eventTeamCode}>{away.name}</span>
          {away.score !== undefined && (
            <span className={styles.eventScore}>{away.score}</span>
          )}
        </div>
      )}

      <span className={styles.eventGroup}>{event.groupName}</span>

      <span className={styles.eventBadge}>D</span>
    </div>
  );
}
