import { useEffect, useRef } from 'react';

/**
 * Hook for swipe gestures on touch/mobile devices
 * Swiping Left -> Next exercise
 * Swiping Right -> Previous exercise
 */
export function useSwipeNavigation({ onSwipeLeft, onSwipeRight, threshold = 40, enabled = true }) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current || window;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        touchEndX.current = e.changedTouches[0].clientX;
        touchEndY.current = e.changedTouches[0].clientY;

        const deltaX = touchEndX.current - touchStartX.current;
        const deltaY = touchEndY.current - touchStartY.current;

        // Ensure swipe was primarily horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= threshold) {
          if (deltaX < 0) {
            // Swiped left -> Next
            if (onSwipeLeft) onSwipeLeft();
          } else {
            // Swiped right -> Previous
            if (onSwipeRight) onSwipeRight();
          }
        }
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold, enabled]);

  return containerRef;
}
