import { useCallback, useEffect, useRef } from "react";

export function useModalDismiss(onClose: () => void) {
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

  return {
    backdropProps: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
    },
  };
}
