"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { CalendarEvent, DayGroup as DayGroupType, OddsOption } from "@/types/event";
import { getMonthName, isSameDay, PROJECT_TODAY } from "@/utils/date";
import { useBetslip } from "@/hooks/useBetslip";
import DayGroup from "@/components/agenda/DayGroup/DayGroup";
import styles from "./AgendaView.module.scss";

export interface AgendaViewHandle {
  scrollToToday: () => void;
}

interface AgendaViewProps {
  events: CalendarEvent[];
  onMonthChange?: (month: string) => void;
}

const AgendaView = forwardRef<AgendaViewHandle, AgendaViewProps>(
  function AgendaView({ events, onMonthChange }, ref) {
    const { isOddSelected, toggleOdd } = useBetslip();

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

    // All today's event IDs — used for initial state and "Hoy" reset
    const todayEventIds = useMemo(
      () =>
        new Set(
          events
            .filter((e) => isSameDay(e.startDate, PROJECT_TODAY))
            .map((e) => e.id)
        ),
      [events]
    );

    // Today's events start expanded; non-today follow exclusive (one at a time) behavior
    const [expandedEventIds, setExpandedEventIds] =
      useState<Set<string>>(todayEventIds);

    function handleExpand(id: string) {
      const event = events.find((e) => e.id === id);
      const isToday = event ? isSameDay(event.startDate, PROJECT_TODAY) : false;

      if (isToday) {
        // Multi-expand: toggle independently without affecting others
        setExpandedEventIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      } else {
        // Exclusive: close everything, open only this one (or close if already alone)
        setExpandedEventIds((prev) =>
          prev.has(id) && prev.size === 1 ? new Set() : new Set([id])
        );
      }
    }

    // Refs to each DayGroup wrapper — used for scroll and IntersectionObserver
    const dayGroupRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const visibleDateKeys = useRef<Set<string>>(new Set());

    useImperativeHandle(ref, () => ({
      scrollToToday() {
        const todayKey = PROJECT_TODAY.toDateString();
        dayGroupRefs.current
          .get(todayKey)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        setExpandedEventIds(new Set(todayEventIds));
      },
    }));

    useEffect(() => {
      if (!onMonthChange) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const key = entry.target.getAttribute("data-date-key") ?? "";
            if (entry.isIntersecting) visibleDateKeys.current.add(key);
            else visibleDateKeys.current.delete(key);
          });

          // Earliest visible group (dayGroups is already sorted ascending)
          const topGroup = dayGroups.find((g) =>
            visibleDateKeys.current.has(g.date.toDateString())
          );
          if (topGroup) onMonthChange(getMonthName(topGroup.date));
        },
        { threshold: 0, rootMargin: "0px 0px -50% 0px" }
      );

      dayGroupRefs.current.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, [dayGroups, onMonthChange]);

    return (
      <div className={styles.container}>
        {dayGroups.map((group) => {
          const dateKey = group.date.toDateString();
          return (
            <div
              key={dateKey}
              data-date-key={dateKey}
              ref={(el) => {
                if (el) dayGroupRefs.current.set(dateKey, el);
                else dayGroupRefs.current.delete(dateKey);
              }}
            >
              <DayGroup
                date={group.date}
                events={group.events}
                expandedEventIds={expandedEventIds}
                onExpand={handleExpand}
                onOddsToggle={toggleOdd as (odd: OddsOption, eventId: string, eventName: string) => void}
                isOddSelected={isOddSelected}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

export default AgendaView;
