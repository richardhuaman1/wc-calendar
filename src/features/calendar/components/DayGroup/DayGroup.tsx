"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { getDayAbbreviation, getDayNumber, isSameDay, formatDateKey, PROJECT_TODAY } from "@/features/calendar/utils/date";
import EventCard from "@/features/calendar/components/EventCard/EventCard";
import styles from "./DayGroup.module.scss";

interface DayGroupProps {
  date: Date;
  events: CalendarEvent[];
  expandedEventIds: Set<string>;
  onExpand: (id: string) => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function DayGroup({
  date,
  events,
  expandedEventIds,
  onExpand,
  onOddsToggle,
  isSelected,
}: DayGroupProps) {
  const isToday = isSameDay(date, PROJECT_TODAY);
  const dayAbbr = getDayAbbreviation(date);
  const dayNumber = getDayNumber(date);

  return (
    <section className={styles.group} aria-label={`${dayAbbr} ${dayNumber}`}>
      <header className={styles.indicator}>
        <span className={styles.dayName}>{dayAbbr}</span>
        <time
          dateTime={formatDateKey(date)}
          className={`${styles.dayNumber} ${isToday ? styles.today : ""}`}
        >
          {dayNumber}
        </time>
      </header>

      <ul className={styles.events}>
        {events.map((event) => (
          <li key={event.id}>
            <EventCard
              event={event}
              isExpanded={expandedEventIds.has(event.id)}
              onExpand={() => onExpand(event.id)}
              onOddsToggle={onOddsToggle}
              isSelected={isSelected}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
