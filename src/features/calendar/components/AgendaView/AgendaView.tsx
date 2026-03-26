"use client";

import { type RefObject, forwardRef, useImperativeHandle } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { ScrollableViewHandle } from "@/features/calendar/types/view";
import { formatDateKey } from "@/features/calendar/utils/date";
import { useAgendaView } from "@/features/calendar/hooks/useAgendaView";
import DayGroup from "@/features/calendar/components/DayGroup/DayGroup";
import styles from "./AgendaView.module.scss";

interface AgendaViewProps {
  events: CalendarEvent[];
  onMonthChange?: (month: string) => void;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const AgendaView = forwardRef<ScrollableViewHandle, AgendaViewProps>(
  function AgendaView({ events, onMonthChange, scrollContainerRef }, ref) {
    const {
      dayGroups,
      expandedEventIds,
      toggleExpand,
      toggle,
      isSelected,
      setDayGroupRef,
      scrollToToday,
    } = useAgendaView(events, onMonthChange, scrollContainerRef);

    useImperativeHandle(ref, () => ({ scrollToToday }));

    return (
      <div className={styles.container} aria-label="Eventos del calendario">
        {dayGroups.map((group) => {
          const dateKey = formatDateKey(group.date);
          return (
            <div
              key={dateKey}
              data-date-key={dateKey}
              ref={(el) => setDayGroupRef(dateKey, el)}
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
