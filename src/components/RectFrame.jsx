import { RED } from "../tokens";

/**
 * `Rectangle 24` (114:115 …) — the wide red frame that bleeds off both canvas
 * edges under the hero and the section headings. A plain 1567×150 rectangle
 * outline, stroke width 1 in the hero and 2 elsewhere. Drawn as an SVG so the
 * stroke stays crisp when the fixed 1567px box is scaled to the viewport.
 */
export function RectFrame({ className = "", strokeWidth = 2, opacity = 1 }) {
  const inset = strokeWidth / 2;
  return (
    <svg
      viewBox="0 0 1567 150"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${className}`}
    >
      <rect
        x={inset}
        y={inset}
        width={1567 - strokeWidth}
        height={150 - strokeWidth}
        fill="none"
        stroke={RED}
        strokeWidth={strokeWidth}
        opacity={opacity}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default RectFrame;
