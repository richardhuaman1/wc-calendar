import { CalendarEvent } from "@/features/calendar/types/event";
import { getParticipantNames } from "@/features/calendar/utils/getParticipantNames";
import WeekEventCard from "./WeekEventCard";
import styles from "./WeekView.module.scss";

interface SingleEventCardProps {
  event: CalendarEvent;
  compact: boolean;
  onEventClick: (event: CalendarEvent, anchorEl: HTMLElement) => void;
}

export default function SingleEventCard({
  event,
  compact,
  onEventClick,
}: SingleEventCardProps) {
  const { hasTbd } = getParticipantNames(event);

  if (hasTbd) {
    return (
      <div className={`${styles.eventCard} ${styles.eventCardTbd}`}>
        <WeekEventCard event={event} compact={compact} />
      </div>
    );
  }

  return (
    <button
      className={styles.eventCard}
      onClick={(e) => onEventClick(event, e.currentTarget)}
      aria-label={event.name}
    >
      <WeekEventCard event={event} compact={compact} />
    </button>
  );
}
