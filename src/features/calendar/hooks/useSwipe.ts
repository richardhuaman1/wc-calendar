import { type RefObject, useRef, useState } from "react";
import { SWIPE_THRESHOLD } from "@/shared/constants/touch";

const RUBBER_BAND_FACTOR = 0.3;
const FALLBACK_WIDTH = 375;

interface UseSwipeOptions {
  total: number;
  sliderRef: RefObject<HTMLDivElement | null>;
}

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseSwipeReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isDragging: boolean;
  translateX: number;
  handlers: SwipeHandlers;
}

export function useSwipe({ total, sliderRef }: UseSwipeOptions): UseSwipeReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const [sliderWidth, setSliderWidth] = useState(FALLBACK_WIDTH);

  const lastIdx = Math.max(0, total - 1);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    setSliderWidth(sliderRef.current?.clientWidth || FALLBACK_WIDTH);
    setIsDragging(true);
  }

  function onTouchMove(e: React.TouchEvent) {
    const deltaX = e.touches[0].clientX - touchStartX.current;

    if ((activeIndex === 0 && deltaX > 0) || (activeIndex === lastIdx && deltaX < 0)) {
      setDragOffset(deltaX * RUBBER_BAND_FACTOR);
      return;
    }

    setDragOffset(deltaX);
  }

  function onTouchEnd() {
    setIsDragging(false);

    if (dragOffset < -SWIPE_THRESHOLD && activeIndex < lastIdx) {
      setActiveIndex((prev) => prev + 1);
    } else if (dragOffset > SWIPE_THRESHOLD && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }

    setDragOffset(0);
  }

  const slideTranslateX = -(activeIndex * 100);
  const dragPercent =
    total > 0 && isDragging
      ? (dragOffset / sliderWidth) * 100
      : 0;

  return {
    activeIndex,
    setActiveIndex,
    isDragging,
    translateX: slideTranslateX + dragPercent,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
