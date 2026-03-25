import { useRef, useCallback, useState } from "react";

const SWIPE_THRESHOLD = 50;

interface UseHorizontalSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

interface UseHorizontalSwipeReturn {
  handlers: SwipeHandlers;
  /** Current drag offset in px (follows the finger) */
  dragOffset: number;
  /** True while the user is dragging */
  isDragging: boolean;
  /** Direction of the last completed swipe ("left" | "right" | null) */
  swipeDirection: "left" | "right" | null;
}

/**
 * Horizontal swipe detection with drag tracking.
 * Exposes dragOffset so the UI can follow the finger,
 * then triggers onSwipeLeft/onSwipeRight on release.
 */
export function useHorizontalSwipe({
  onSwipeLeft,
  onSwipeRight,
}: UseHorizontalSwipeOptions): UseHorizontalSwipeReturn {
  const startX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
    setSwipeDirection(null);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - startX.current;
    setDragOffset(deltaX);
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX.current;

      if (deltaX < -SWIPE_THRESHOLD) {
        setSwipeDirection("left");
        onSwipeLeft();
      } else if (deltaX > SWIPE_THRESHOLD) {
        setSwipeDirection("right");
        onSwipeRight();
      }

      setDragOffset(0);
      setIsDragging(false);
    },
    [onSwipeLeft, onSwipeRight]
  );

  return {
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
    dragOffset,
    isDragging,
    swipeDirection,
  };
}
