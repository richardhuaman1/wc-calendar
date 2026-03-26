import { useCallback, useState } from "react";
import { CalendarEvent } from "@/features/calendar/types/event";

interface PopupState {
  event: CalendarEvent;
  anchorRect: DOMRect;
}

export function useEventPopup() {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [multiEvents, setMultiEvents] = useState<CalendarEvent[] | null>(null);

  const openPopup = useCallback(
    (event: CalendarEvent, anchorEl: HTMLElement) => {
      setPopup({ event, anchorRect: anchorEl.getBoundingClientRect() });
    },
    []
  );

  const closePopup = useCallback(() => setPopup(null), []);

  const openMulti = useCallback(
    (evts: CalendarEvent[]) => setMultiEvents(evts),
    []
  );

  const closeMulti = useCallback(() => setMultiEvents(null), []);

  const dismissAll = useCallback(() => {
    setPopup(null);
    setMultiEvents(null);
  }, []);

  return {
    popup,
    multiEvents,
    openPopup,
    closePopup,
    openMulti,
    closeMulti,
    dismissAll,
  };
}
