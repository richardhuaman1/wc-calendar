import { useMemo } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { isSameDay, formatDateKey, PROJECT_TODAY } from "@/features/calendar/utils/date";
import { TBD, WEEK_HOURS, WEEK_ROW_HEIGHT, WEEK_EVENT_DURATION_ROWS } from "@/features/calendar/utils/constants";
import { formatHourTime, formatHourPeriod } from "@/features/calendar/utils/format";
import { groupEventsByTime } from "@/features/calendar/utils/eventGrouping";
import WeekEventCard from "./WeekEventCard";
import WeekEventCountCard from "./WeekEventCountCard";
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
  const gridStyle = {
    transform: `translateX(${dragOffset}px)`,
    transition: isDragging ? "none" : "transform 300ms ease-out",
  };

  const groupedByDay = useMemo(() => {
    const result = new Map<string, ReturnType<typeof groupEventsByTime>>();
    for (const day of weekDays) {
      const key = formatDateKey(day);
      const dayEvents = eventsByDay.get(key) ?? [];
      result.set(key, groupEventsByTime(dayEvents));
    }
    return result;
  }, [weekDays, eventsByDay]);

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
          const groups = groupedByDay.get(key) ?? [];
          const height = WEEK_EVENT_DURATION_ROWS * WEEK_ROW_HEIGHT;

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

              {/* Events for this day */}
              {groups.map(({ timeKey, topPx, events }) => {
                const isCompact = events.length > 1;

                // 3+ simultaneous events → show count card
                if (events.length >= 3) {
                  return (
                    <div
                      key={timeKey}
                      className={styles.eventSlot}
                      style={{ top: `${topPx}px`, height: `${height}px` }}
                    >
                      <div
                        className={styles.eventCard}
                        onClick={() => onMultiEventClick(events)}
                      >
                        <WeekEventCountCard count={events.length} />
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={timeKey}
                    className={styles.eventSlot}
                    style={{ top: `${topPx}px`, height: `${height}px` }}
                  >
                    {events.map((event) => {
                      const isTbd = event.participants.some((p) => p.name === TBD);
                      return (
                        <div
                          key={event.id}
                          className={`${styles.eventCard} ${isTbd ? styles.eventCardTbd : ""}`}
                          onClick={isTbd ? undefined : (e) => onEventClick(event, e.currentTarget)}
                        >
                          <WeekEventCard event={event} compact={isCompact} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
