"use client";

import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import { useModalDismiss } from "@/shared/hooks/useModalDismiss";
import { usePopupPosition } from "@/features/calendar/hooks/usePopupPosition";
import EventContent from "@/features/calendar/components/EventCard/EventContent";
import CloseIcon from "@/shared/components/icons/CloseIcon";
import { stopTouchPropagation } from "@/shared/constants/touch";
import styles from "./EventPopup.module.scss";

interface EventPopupProps {
  event: CalendarEvent;
  anchorRect: DOMRect;
  onClose: () => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

export default function EventPopup({
  event,
  anchorRect,
  onClose,
  onOddsToggle,
  isSelected,
}: EventPopupProps) {
  const popupRef = usePopupPosition(anchorRect);
  const { backdropProps } = useModalDismiss(onClose);

  return (
    <div
      className={styles.backdrop}
      {...backdropProps}
      {...stopTouchPropagation}
    >
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-label={event.name}
        className={styles.popup}
        {...stopTouchPropagation}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
        <EventContent
          event={event}
          onOddsToggle={onOddsToggle}
          isSelected={isSelected}
        />
      </div>
    </div>
  );
}
