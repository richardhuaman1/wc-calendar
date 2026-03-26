import { CalendarEvent } from "@/features/calendar/types/event";
import EventHeader from "./EventHeader";
import styles from "./EventCard.module.scss";

interface EventCardTbdProps {
  event: CalendarEvent;
  home: string;
  away: string;
}

export default function EventCardTbd({ event, home, away }: EventCardTbdProps) {
  return (
    <article className={styles.card}>
      <div className={styles.eventRow}>
        <EventHeader event={event} home={home} away={away} />
      </div>
    </article>
  );
}
