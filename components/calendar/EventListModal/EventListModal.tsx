"use client";

import { useCallback, useEffect, useRef } from "react";
import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/types/event";
import EventContent from "@/components/calendar/EventCard/EventContent";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import styles from "./EventListModal.module.scss";

interface EventListModalProps {
  events: CalendarEvent[];
  onClose: () => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function EventListModal({
  events,
  onClose,
  onOddsToggle,
  isSelected,
}: EventListModalProps) {
  const pointerDownTargetRef = useRef<EventTarget | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownTargetRef.current = e.target;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (
        e.target === e.currentTarget &&
        pointerDownTargetRef.current === e.currentTarget
      ) {
        onClose();
      }
      pointerDownTargetRef.current = null;
    },
    [onClose]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className={styles.sheet}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <span className={styles.title}>
            {events.length} eventos deportivos
          </span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.list}>
          {events.map((event) => (
            <div key={event.id} className={styles.card}>
              <EventContent
                event={event}
                onOddsToggle={onOddsToggle}
                isSelected={isSelected}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
