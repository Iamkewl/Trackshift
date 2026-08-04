import { RED } from "../tokens";

/**
 * The `CaretDown-r` icons Figma repeats for the leadership / student words
 * carousel and the FAQ rows. A 22×12 chevron (down) or 8×14 blade (left/right
 * carousels), scaled from the 32×32 frame.
 */
export function Caret({ dir = "down", className = "" }) {
  const isDown = dir === "down";
  const d = isDown
    ? "M 1 0 L 11 10 L 21 0"
    : "M 1.08634 12.8047 L 7.08634 0 L 1.08634 12.8047 Z";
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`pointer-events-none shrink-0 ${className}`}
    >
      {isDown ? (
        <path
          d={d}
          fill="none"
          stroke={RED}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d={d} fill={RED} />
      )}
    </svg>
  );
}

export default Caret;
