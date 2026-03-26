"use client";

import {
  type RefObject,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { formatDateKey, PROJECT_TODAY } from "@/features/calendar/utils/date";
import { groupEventsByDay } from "@/features/calendar/utils/groupEventsByDay";
import { useBetslip } from "@/features/betting/hooks/useBetslip";
import { useAccordion } from "@/features/calendar/hooks/useAccordion";
import { useMonthObserver } from "@/features/calendar/hooks/useMonthObserver";
import DayGroup from "@/features/calendar/components/DayGroup/DayGroup";
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

    const dayGroups = useMemo(() => groupEventsByDay(events), [events]);

    const { expandedEventIds, toggleExpand, expandToday } =
      useAccordion(events);

    const dayGroupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useMonthObserver(dayGroups, dayGroupRefs, onMonthChange, scrollContainerRef);

    useImperativeHandle(ref, () => ({
      scrollToToday() {
        const todayKey = formatDateKey(PROJECT_TODAY);
        dayGroupRefs.current
          .get(todayKey)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        expandToday();
      },
    }));

    return (
      <div className={styles.container} role="feed" aria-label="Eventos del calendario">
        {dayGroups.map((group) => {
          const dateKey = formatDateKey(group.date);
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
                onExpand={toggleExpand}
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
