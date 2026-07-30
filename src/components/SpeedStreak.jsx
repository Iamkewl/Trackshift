import { RED } from "../tokens";

/**
 * A Figma red-outline vector, plus the pulse that races along it.
 *
 * @param {string} viewBox     from the Figma vector's bounding box
 * @param {string} d           path data (see ./paths.js)
 * @param {number} strokeWidth base stroke; head/body/tail scale off this
 * @param {number} duration    full cycle in seconds — sweep is the first ~30%
 * @param {number} delay       stagger so streaks don't fire in lockstep
 * @param {number} restOpacity opacity of the static, design-accurate line
 */
export function SpeedStreak({
  viewBox,
  d,
  className = "",
  strokeWidth = 1.6,
  duration = 3.2,
  delay = 0,
  restOpacity = 0.55,
  style,
}) {
  const layers = [
    { w: strokeWidth * 1.15, o: 1.0, t: 0.0, head: true },
    { w: strokeWidth * 0.95, o: 0.45, t: 0.05, head: false },
    { w: strokeWidth * 0.7, o: 0.18, t: 0.105, head: false },
  ];

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      style={style}
    >
      {/* Resting state — matches Figma 1:1 */}
      <path
        d={d}
        fill="none"
        stroke={RED}
        strokeWidth={strokeWidth}
        opacity={restOpacity}
        vectorEffect="non-scaling-stroke"
      />
      {/* Comet: head, body, tail */}
      {layers.map((l, i) => (
        <path
          key={i}
          d={d}
          pathLength="100"
          fill="none"
          stroke={RED}
          strokeWidth={l.w}
          opacity={l.o}
          vectorEffect="non-scaling-stroke"
          className={`ts-comet${l.head ? " ts-comet--head" : ""}`}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${delay + l.t}s`,
          }}
        />
      ))}
    </svg>
  );
}

export default SpeedStreak;
