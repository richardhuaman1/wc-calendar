"use client";

import {
  type RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { CalendarEvent, DayGroup as DayGroupType } from "@/types/event";
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
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const AgendaView = forwardRef<AgendaViewHandle, AgendaViewProps>(
  function AgendaView({ events, onMonthChange, scrollContainerRef }, ref) {
    const { isSelected, toggle } = useBetslip();

    const dayGroups = useMemo<DayGroupType[]>(() => {
      const map = new Map<string, DayGroupType>();
      events.forEach((event) => {
        const dateObj = new Date(event.startDate);
        const key = dateObj.toDateString();
        if (!map.has(key)) {
          map.set(key, { date: dateObj, events: [] });
        }
        map.get(key)!.events.push(event);
      });
      return Array.from(map.values()).sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
    }, [events]);

    const todayEventIds = useMemo(
      () =>
        new Set(
          events
            .filter((e) => isSameDay(e.startDate, PROJECT_TODAY))
            .map((e) => e.id)
        ),
      [events]
    );

    const [expandedEventIds, setExpandedEventIds] = useState<Set<string>>(
      () => new Set()
    );
    const [isInitialized, setIsInitialized] = useState(false);

    // Expand today's events once async data arrives (render-time state adjustment)
    if (!isInitialized && todayEventIds.size > 0) {
      setIsInitialized(true);
      setExpandedEventIds(todayEventIds);
    }

    function handleExpand(id: string) {
      const event = events.find((e) => e.id === id);
      const isToday = event
        ? isSameDay(event.startDate, PROJECT_TODAY)
        : false;

      setExpandedEventIds((prev) => {
        if (isToday) {
          // Today events toggle independently — never affect non-today
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        }

        // Non-today: exclusive accordion — preserve today's pinned events
        const pinned = new Set(
          [...prev].filter((eid) => todayEventIds.has(eid))
        );

        if (!prev.has(id)) pinned.add(id);

        return pinned;
      });
    }

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

      const scrollRoot = scrollContainerRef?.current ?? null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const key = entry.target.getAttribute("data-date-key") ?? "";
            if (entry.isIntersecting) visibleDateKeys.current.add(key);
            else visibleDateKeys.current.delete(key);
          });

          const topGroup = dayGroups.find((g) =>
            visibleDateKeys.current.has(g.date.toDateString())
          );
          if (topGroup) onMonthChange(getMonthName(topGroup.date));
        },
        { root: scrollRoot, threshold: 0, rootMargin: "0px 0px -50% 0px" }
      );

      dayGroupRefs.current.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, [dayGroups, onMonthChange, scrollContainerRef]);

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
                onOddsToggle={toggle}
                isSelected={isSelected}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

export default AgendaView;
