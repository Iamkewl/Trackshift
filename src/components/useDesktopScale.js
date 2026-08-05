import { useEffect, useState } from "react";

const LG = 1024;
const DESIGN = 1440;

/**
 * Scales the fixed-1440 desktop layout down to fit narrower laptop viewports.
 *
 * The Figma design is exactly 1440px wide and every desktop section positions
 * its children at absolute 1440px coordinates (left: 1094px, …). Below 1440
 * but still at `lg` (≥1024) those coordinates overflow the viewport and get
 * clipped, so a laptop renders cut-off or mis-aligned sections.
 *
 * The returned value is the CSS `zoom` to apply to the page root: `viewport/1440`
 * (clamped to 1) on desktop, `1` below `lg` where the fluid mobile layout
 * takes over. `zoom` scales the whole coordinate system — geometry AND type —
 * so the 1440 render is preserved exactly and merely reduced on smaller
 * laptops. It is driven from JS (`innerWidth`) because `zoom` on `<html>` or a
 * CSS-only `100vw/1440` would also shrink the mobile layout on phones.
 */
export function useDesktopScale() {
  const [scale, setScale] = useState(() => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    return w >= LG ? Math.min(1, w / DESIGN) : 1;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScale(w >= LG ? Math.min(1, w / DESIGN) : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

export default useDesktopScale;
