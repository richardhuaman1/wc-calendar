import { CalendarEvent } from "@/types/event";
import { isSameDay, formatDateKey, getHour, getMinute, PROJECT_TODAY } from "@/utils/date";
import { TBD, WEEK_HOURS, WEEK_ROW_HEIGHT, WEEK_EVENT_DURATION_ROWS } from "@/utils/constants";
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
  onEventClick,
  onMultiEventClick,
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
        {weekDays.map((day, dayIndex) => {
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

              {/* Events for this day */}
              {(() => {
                const groups = new Map<string, CalendarEvent[]>();
                for (const event of dayEvents) {
                  const timeKey = `${getHour(event.startDate)}:${getMinute(event.startDate)}`;
                  const group = groups.get(timeKey) ?? [];
                  group.push(event);
                  groups.set(timeKey, group);
                }

                return Array.from(groups.entries()).map(([timeKey, events]) => {
                  const h = getHour(events[0].startDate);
                  const m = getMinute(events[0].startDate);
                  const startRow = h * 2 + m / 30;
                  const topPx = startRow * WEEK_ROW_HEIGHT;
                  const isCompact = events.length > 1;
                  const height = WEEK_EVENT_DURATION_ROWS * WEEK_ROW_HEIGHT;

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
                });
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
