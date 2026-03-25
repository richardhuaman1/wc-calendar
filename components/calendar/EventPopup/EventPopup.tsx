"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { CalendarEvent, IsSelectedFn, OddsToggleFn } from "@/types/event";
import EventContent from "@/components/calendar/EventCard/EventContent";
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

  // Close on outside click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div ref={popupRef} className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          ✕
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
