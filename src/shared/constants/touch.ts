export const SWIPE_THRESHOLD = 50;

export const stopTouchPropagation = {
  onTouchStart: (e: React.TouchEvent) => e.stopPropagation(),
  onTouchMove: (e: React.TouchEvent) => e.stopPropagation(),
};
