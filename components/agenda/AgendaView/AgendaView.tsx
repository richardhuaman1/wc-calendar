"use client";

import { useMemo, useState } from "react";
import { CalendarEvent, DayGroup as DayGroupType } from "@/types/event";
import { isSameDay, PROJECT_TODAY } from "@/utils/date";
import DayGroup from "@/components/agenda/DayGroup/DayGroup";
import styles from "./AgendaView.module.scss";

interface AgendaViewProps {
  events: CalendarEvent[];
}

export default function AgendaView({ events }: AgendaViewProps) {
  const dayGroups = useMemo<DayGroupType[]>(() => {
    const map = new Map<string, DayGroupType>();

    events.forEach((event) => {
      const key = event.startDate.toDateString();
      if (!map.has(key)) {
        map.set(key, { date: event.startDate, events: [] });
      }
      map.get(key)!.events.push(event);
    });

    return Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [events]);

  const initialExpandedId = useMemo(
    () => events.find((e) => isSameDay(e.startDate, PROJECT_TODAY))?.id ?? null,
    [events]
  );

  const [expandedEventId, setExpandedEventId] = useState<string | null>(initialExpandedId);

  function handleExpand(id: string) {
    setExpandedEventId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.container}>
      {dayGroups.map((group) => (
        <DayGroup
          key={group.date.toDateString()}
          date={group.date}
          events={group.events}
          expandedEventId={expandedEventId}
          onExpand={handleExpand}
        />
      ))}
    </div>
  );
}
