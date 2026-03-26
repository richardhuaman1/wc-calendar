"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import EventPopup from "@/features/calendar/components/EventPopup/EventPopup";
import EventListModal from "@/features/calendar/components/EventListModal/EventListModal";

interface PopupState {
  event: CalendarEvent;
  anchorRect: DOMRect;
}

interface GridOverlaysProps {
  popup: PopupState | null;
  multiEvents: CalendarEvent[] | null;
  onClosePopup: () => void;
  onCloseMulti: () => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function GridOverlays({
  popup,
  multiEvents,
  onClosePopup,
  onCloseMulti,
  onOddsToggle,
  isSelected,
}: GridOverlaysProps) {
  return (
    <>
      {popup && (
        <EventPopup
          event={popup.event}
          anchorRect={popup.anchorRect}
          onClose={onClosePopup}
          onOddsToggle={onOddsToggle}
          isSelected={isSelected}
        />
      )}

      {multiEvents && (
        <EventListModal
          events={multiEvents}
          onClose={onCloseMulti}
          onOddsToggle={onOddsToggle}
          isSelected={isSelected}
        />
      )}
    </>
  );
}
