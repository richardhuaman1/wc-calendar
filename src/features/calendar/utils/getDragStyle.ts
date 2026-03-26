import type { CSSProperties } from "react";

export function getDragStyle(
  dragOffset: number,
  isDragging: boolean
): CSSProperties {
  return {
    transform: `translateX(${dragOffset}px)`,
    transition: isDragging ? "none" : "transform 300ms ease-out",
  };
}
