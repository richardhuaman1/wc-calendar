import { useLayoutEffect, useRef } from "react";

const MARGIN = 8;
const GAP = 4;

export function usePopupPosition(anchorRect: DOMRect) {
  const popupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const popup = popupRef.current;
    if (!popup) return;

    const popupHeight = popup.scrollHeight;
    const popupWidth = popup.offsetWidth;
    const { innerHeight: vh, innerWidth: vw } = window;

    const spaceBelow = vh - anchorRect.bottom - GAP - MARGIN;
    const spaceAbove = anchorRect.top - GAP - MARGIN;
    const showBelow = spaceBelow >= popupHeight || spaceBelow >= spaceAbove;

    const rawTop = showBelow
      ? anchorRect.bottom + GAP
      : anchorRect.top - popupHeight - GAP;

    const top = Math.max(MARGIN, Math.min(rawTop, vh - popupHeight - MARGIN));

    const anchorCenterX = anchorRect.left + anchorRect.width / 2;
    const rawLeft = anchorCenterX - popupWidth / 2;
    const left = Math.max(MARGIN, Math.min(rawLeft, vw - popupWidth - MARGIN));

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
    popup.style.transformOrigin = showBelow ? "top center" : "bottom center";
  }, [anchorRect]);

  return popupRef;
}
