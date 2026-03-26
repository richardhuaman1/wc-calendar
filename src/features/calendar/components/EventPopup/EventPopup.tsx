"use client";

import { useLayoutEffect, useRef } from "react";
import { useModalDismiss } from "@/shared/hooks/useModalDismiss";
import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/features/calendar/types/event";
import EventContent from "@/features/calendar/components/EventCard/EventContent";
import CloseIcon from "@/shared/components/icons/CloseIcon";
import styles from "./EventPopup.module.scss";

interface EventPopupProps {
  event: CalendarEvent;
  anchorRect: DOMRect;
  onClose: () => void;
  onOddsToggle: OddsToggleFn;
  isSelected: IsSelectedFn;
}

/**
 * Smart-positioned popup that displays full event details.
 * Automatically positions above or below the anchor element
 * based on available viewport space.
 *
 * Uses useLayoutEffect + direct DOM mutation for positioning
 * to avoid cascading re-renders (ESLint react-hooks/set-state-in-effect).
 */
export default function EventPopup({
  event,
  anchorRect,
  onClose,
  onOddsToggle,
  isSelected,
}: EventPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const { backdropProps } = useModalDismiss(onClose);

  // Position the popup synchronously before paint
  useLayoutEffect(() => {
    const popup = popupRef.current;
    if (!popup) return;

    const popupHeight = popup.scrollHeight;
    const popupWidth = popup.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const margin = 8;
    const gap = 4;

    const spaceBelow = viewportHeight - anchorRect.bottom - gap - margin;
    const spaceAbove = anchorRect.top - gap - margin;
    const showBelow = spaceBelow >= popupHeight || spaceBelow >= spaceAbove;

    let top = showBelow
      ? anchorRect.bottom + gap
      : anchorRect.top - popupHeight - gap;

    // Clamp vertically so popup stays within viewport
    top = Math.max(margin, Math.min(top, viewportHeight - popupHeight - margin));

    // Center horizontally relative to anchor, clamp within viewport
    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    let left = anchorCenterX - popupWidth / 2;
    left = Math.max(margin, Math.min(left, viewportWidth - popupWidth - margin));

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    popup.style.transformOrigin = showBelow ? "top center" : "bottom center";
  }, [anchorRect]);

  return (
    <div
      className={styles.backdrop}
      {...backdropProps}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        ref={popupRef}
        role="dialog"
        aria-label={event.name}
        className={styles.popup}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
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
