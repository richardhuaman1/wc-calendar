import { CalendarEvent } from "@/features/calendar/types/event";
import { WEEK_HOURS, WEEK_ROW_HEIGHT, WEEK_EVENT_DURATION_ROWS } from "@/features/calendar/utils/constants";
import { EventGroup } from "@/features/calendar/utils/eventGrouping";
import EventSlot from "./EventSlot";
import styles from "./WeekView.module.scss";

const EVENT_HEIGHT = WEEK_EVENT_DURATION_ROWS * WEEK_ROW_HEIGHT;

interface DayColumnProps {
  isToday: boolean;
  groups: EventGroup[];
  onEventClick: (event: CalendarEvent, anchorEl: HTMLElement) => void;
  onMultiEventClick: (events: CalendarEvent[]) => void;
}

export default function DayColumn({
  isToday,
  groups,
  onEventClick,
  onMultiEventClick,
}: DayColumnProps) {
  return (
    <div className={`${styles.column} ${isToday ? styles.columnToday : ""}`}>
      {WEEK_HOURS.map((hour) => (
        <div key={hour} className={styles.hourSlot}>
          <div className={styles.halfRow} />
          <div className={styles.halfRow} />
        </div>
      ))}

      {groups.map((group) => (
        <EventSlot
          key={group.timeKey}
          group={group}
          height={EVENT_HEIGHT}
          onEventClick={onEventClick}
          onMultiEventClick={onMultiEventClick}
        />
      ))}
    </div>
  );
}
