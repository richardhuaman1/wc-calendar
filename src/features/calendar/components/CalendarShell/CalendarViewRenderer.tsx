"use client";

import { type RefObject } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";
import { ViewType, ScrollableViewHandle } from "@/features/calendar/types/view";
import AgendaView from "@/features/calendar/components/AgendaView/AgendaView";
import ThreeDayView from "@/features/calendar/components/ThreeDayView/ThreeDayView";
import WeekView from "@/features/calendar/components/WeekView/WeekView";

interface CalendarViewRendererProps {
  activeView: ViewType;
  events: CalendarEvent[];
  onMonthChange: (month: string) => void;
  viewRef: RefObject<ScrollableViewHandle | null>;
  scrollAreaRef: RefObject<HTMLDivElement | null>;
}

export default function CalendarViewRenderer({
  activeView,
  events,
  onMonthChange,
  viewRef,
  scrollAreaRef,
}: CalendarViewRendererProps) {
  switch (activeView) {
    case "agenda":
      return (
        <AgendaView
          ref={viewRef}
          events={events}
          onMonthChange={onMonthChange}
          scrollContainerRef={scrollAreaRef}
        />
      );
    case "3dias":
      return (
        <ThreeDayView
          ref={viewRef}
          events={events}
          onMonthChange={onMonthChange}
        />
      );
    case "semana":
      return (
        <WeekView
          ref={viewRef}
          events={events}
          onMonthChange={onMonthChange}
        />
      );
  }
}
