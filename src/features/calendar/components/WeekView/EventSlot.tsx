import { CalendarEvent } from "@/features/calendar/types/event";
import { EventGroup } from "@/features/calendar/utils/eventGrouping";
import SingleEventCard from "./SingleEventCard";
import WeekEventCountCard from "./WeekEventCountCard";
import styles from "./WeekView.module.scss";

interface EventSlotProps {
  group: EventGroup;
  height: number;
  onEventClick: (event: CalendarEvent, anchorEl: HTMLElement) => void;
  onMultiEventClick: (events: CalendarEvent[]) => void;
}

export default function EventSlot({
  group,
  height,
  onEventClick,
  onMultiEventClick,
}: EventSlotProps) {
  const { topPx, events } = group;
  const slotStyle = { top: `${topPx}px`, height: `${height}px` };

  if (events.length >= 3) {
    return (
      <div className={styles.eventSlot} style={slotStyle}>
        <button
          className={styles.eventCard}
          onClick={() => onMultiEventClick(events)}
          aria-label={`${events.length} eventos simultáneos`}
        >
          <WeekEventCountCard count={events.length} />
        </button>
      </div>
    );
  }

  const isCompact = events.length > 1;

  return (
    <div className={styles.eventSlot} style={slotStyle}>
      {events.map((event) => (
        <SingleEventCard
          key={event.id}
          event={event}
          compact={isCompact}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
}
