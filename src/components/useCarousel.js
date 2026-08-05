import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The `leadership` and `student words` sections are carousels in the design —
 * that is what the two `CaretDown-r` frames at the far edges of each section
 * are for (114:370/372 and 114:377/379). Figma only draws the resting slide,
 * so the slide list lives in the section and this hook owns the index.
 *
 * Advances on its own, and can be swiped. Returns three prop bags to spread:
 *
 *   swipe       touch handlers for the slide area
 *   hoverPause  pauses autoplay while a pointer or keyboard focus is inside
 *
 * Autoplay stops for `prefers-reduced-motion`, and its timer restarts on any
 * manual change so a slide never flips out from under someone who just
 * pressed a caret.
 */
export function useCarousel(count, { autoPlayMs = 6000, swipeThreshold = 40 } = {}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const enabled = count > 1;

  const go = useCallback(
    (step) => {
      if (count < 1) return;
      setIndex((i) => (i + step + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  // `index` is in the deps so a manual change resets the dwell time.
  useEffect(() => {
    if (!enabled || paused || autoPlayMs <= 0) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => go(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [enabled, paused, autoPlayMs, go, index]);

  const start = useRef(null);
  const swipe = {
    onTouchStart: (e) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e) => {
      const from = start.current;
      start.current = null;
      if (!from || !enabled) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - from.x;
      const dy = t.clientY - from.y;
      // Ignore taps, and anything more vertical than horizontal — that is the
      // page being scrolled, not the carousel being swiped.
      if (Math.abs(dx) < swipeThreshold || Math.abs(dx) <= Math.abs(dy)) return;
      if (dx < 0) next();
      else prev();
    },
  };

  const hoverPause = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocusCapture: () => setPaused(true),
    onBlurCapture: () => setPaused(false),
  };

  return { index, prev, next, enabled, setIndex, swipe, hoverPause, paused };
}

export default useCarousel;
