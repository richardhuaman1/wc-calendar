import { CalendarEvent } from "@/types/event";
import { isSameDay, formatDateKey, PROJECT_TODAY } from "@/utils/date";
import { WEEK_HOURS } from "@/utils/constants";
import WeekEventCard from "./WeekEventCard";
import TimeIndicator from "./TimeIndicator";
import styles from "./WeekView.module.scss";

interface TimeGridProps {
  weekDays: Date[];
  eventsByDay: Map<string, CalendarEvent[]>;
  dragOffset: number;
  isDragging: boolean;
}

function formatHourTime(hour: number): string {
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${h12}:00`;
}

function formatHourPeriod(hour: number): string {
  return hour < 12 ? "AM" : "PM";
}

export default function TimeGrid({
  weekDays,
  eventsByDay,
  dragOffset,
  isDragging,
}: TimeGridProps) {
  const gridStyle = {
    transform: `translateX(${dragOffset}px)`,
    transition: isDragging ? "none" : "transform 300ms ease-out",
  };

  return (
    <div className={styles.gridScroll}>
      <div className={styles.grid} style={gridStyle}>
        <TimeIndicator weekDays={weekDays} />

        {/* Time labels column */}
        <div className={styles.timeLabels}>
          {WEEK_HOURS.map((hour) => (
            <div key={hour} className={styles.timeSlot}>
              <div className={styles.timeLabel}>
                <span className={styles.timeLabelTime}>{formatHourTime(hour)}</span>
                <span className={styles.timeLabelPeriod}>{formatHourPeriod(hour)}</span>
              </div>
              <div className={styles.timeLabel} />
            </div>
          ))}
        </div>

        {/* Day columns — direct grid cells, aligned with header */}
        {weekDays.map((day) => {
          const key = formatDateKey(day);
          const isToday = isSameDay(day, PROJECT_TODAY);
          const dayEvents = eventsByDay.get(key) ?? [];

          return (
            <div
              key={key}
              className={`${styles.column} ${isToday ? styles.columnToday : ""}`}
            >
              {WEEK_HOURS.map((hour) => (
                <div key={hour} className={styles.hourSlot}>
                  <div className={styles.halfRow} />
                  <div className={styles.halfRow} />
                </div>
              ))}

              {dayEvents.map((event) => (
                <WeekEventCard key={event.id} event={event} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
