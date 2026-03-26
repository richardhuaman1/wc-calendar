"use client";

import { useModalDismiss } from "@/shared/hooks/useModalDismiss";
import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import EventContent from "@/features/calendar/components/EventCard/EventContent";
import CloseIcon from "@/shared/components/icons/CloseIcon";
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
  const { backdropProps } = useModalDismiss(onClose);

  return (
    <div
      className={styles.backdrop}
      {...backdropProps}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        role="dialog"
        aria-labelledby="event-list-title"
        className={styles.sheet}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="event-list-title" className={styles.title}>
            {events.length} eventos deportivos
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </header>

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
