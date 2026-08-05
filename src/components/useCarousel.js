import { useCallback, useState } from "react";

/**
 * The `leadership` and `student words` sections are carousels in the design —
 * that is what the two `CaretDown-r` frames at the far edges of each section
 * are for (114:370/372 and 114:377/379). Figma only draws the resting slide,
 * so the slide list lives in the section and this hook owns the index.
 *
 * Wraps around in both directions, and reports `enabled` so a single-slide
 * list can render the carets in their disabled state rather than as controls
 * that do nothing.
 */
export function useCarousel(count) {
  const [index, setIndex] = useState(0);
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

  return { index, prev, next, enabled, setIndex };
}

export default useCarousel;
