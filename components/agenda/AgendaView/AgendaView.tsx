"use client";

import {
  type RefObject,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { CalendarEvent } from "@/types/event";
import { PROJECT_TODAY } from "@/utils/date";
import { groupEventsByDay } from "@/utils/groupEventsByDay";
import { useBetslip } from "@/hooks/useBetslip";
import { useAccordion } from "@/hooks/useAccordion";
import { useMonthObserver } from "@/hooks/useMonthObserver";
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

    const dayGroups = useMemo(() => groupEventsByDay(events), [events]);

    const { expandedEventIds, toggleExpand, expandToday } =
      useAccordion(events);

    const dayGroupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useMonthObserver(dayGroups, dayGroupRefs, onMonthChange, scrollContainerRef);

    useImperativeHandle(ref, () => ({
      scrollToToday() {
        const todayKey = PROJECT_TODAY.toDateString();
        dayGroupRefs.current
          .get(todayKey)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        expandToday();
      },
    }));

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
