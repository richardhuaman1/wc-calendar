"use client";

import { CalendarEvent, OddsOption } from "@/types/event";
import { getDayAbbreviation, isSameDay, PROJECT_TODAY } from "@/utils/date";
import EventCard from "@/components/agenda/EventCard/EventCard";
import styles from "./DayGroup.module.scss";

interface DayGroupProps {
  date: Date;
  events: CalendarEvent[];
  expandedEventIds: Set<string>;
  onExpand: (id: string) => void;
  onOddsToggle: (odd: OddsOption, eventId: string, eventName: string) => void;
  isOddSelected: (oddId: string) => boolean;
}

export default function DayGroup({
  date,
  events,
  expandedEventIds,
  onExpand,
  onOddsToggle,
  isOddSelected,
}: DayGroupProps) {
  const isToday = isSameDay(date, PROJECT_TODAY);
  const dayAbbr = getDayAbbreviation(date);
  const dayNumber = date.getDate();

  return (
    <div className={styles.group}>
      <div className={styles.indicator}>
        <span className={styles.dayName}>{dayAbbr}</span>
        <span className={`${styles.dayNumber} ${isToday ? styles.today : ""}`}>
          {dayNumber}
        </span>
      </div>

      <div className={styles.events}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isExpanded={expandedEventIds.has(event.id)}
            onExpand={() => onExpand(event.id)}
            onOddsToggle={onOddsToggle}
            isOddSelected={isOddSelected}
          />
        ))}
      </div>
    </div>
  );
}
