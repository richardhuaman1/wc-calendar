import { CalendarEvent } from "@/features/calendar/types/event";
import { isSameDay, formatDateKey, PROJECT_TODAY } from "@/features/calendar/utils/date";
import { getDragStyle } from "@/features/calendar/utils/getDragStyle";
import { useGroupedEvents } from "@/features/calendar/hooks/useGroupedEvents";
import TimeLabels from "./TimeLabels";
import DayColumn from "./DayColumn";
import TimeIndicator from "./TimeIndicator";
import styles from "./WeekView.module.scss";

interface TimeGridProps {
  weekDays: Date[];
  eventsByDay: Map<string, CalendarEvent[]>;
  dragOffset: number;
  isDragging: boolean;
  onEventClick: (event: CalendarEvent, anchorEl: HTMLElement) => void;
  onMultiEventClick: (events: CalendarEvent[]) => void;
}

export default function TimeGrid({
  weekDays,
  eventsByDay,
  dragOffset,
  isDragging,
  onEventClick,
  onMultiEventClick,
}: TimeGridProps) {
  const groupedByDay = useGroupedEvents(weekDays, eventsByDay);

  return (
    <div className={styles.gridScroll}>
      <div className={styles.grid} style={getDragStyle(dragOffset, isDragging)}>
        <TimeIndicator weekDays={weekDays} />
        <TimeLabels />

        {weekDays.map((day) => {
          const key = formatDateKey(day);
          return (
            <DayColumn
              key={key}
              isToday={isSameDay(day, PROJECT_TODAY)}
              groups={groupedByDay.get(key) ?? []}
              onEventClick={onEventClick}
              onMultiEventClick={onMultiEventClick}
            />
          );
        })}
      </div>
    </div>
  );
}
