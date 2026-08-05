import { RED } from "../tokens";

/**
 * The `CaretDown-r` icons Figma repeats for the leadership / student words
 * carousels and the FAQ rows.
 *
 * The carousel variant is the full 32×32 frame: a circle (the frame's r24
 * corner) stroked 1px red, holding an 8×14 red triangle — inset (11,9) for the
 * left arrow (114:372/373) and (13,9) for the right (114:370/371). The FAQ
 * variant is just the 22×12 chevron, no ring.
 */
export function Caret({ dir = "down", className = "" }) {
  const isDown = dir === "down";
  const tri =
    dir === "left"
      ? "M 19 9 L 11 16 L 19 23 Z"
      : "M 13 9 L 21 16 L 13 23 Z";

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`pointer-events-none shrink-0 ${className}`}
    >
      {isDown ? (
        <path
          d="M 5 12 L 16 23 L 27 12"
          fill="none"
          stroke={RED}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx="16" cy="16" r="15.5" fill="none" stroke={RED} strokeWidth="1" />
          <path d={tri} fill={RED} />
        </>
      )}
    </svg>
  );
}

/**
 * The caret as an actual carousel control. Positioning is the caller's — the
 * desktop sections place it absolutely at the design's coordinates, the mobile
 * control bar puts it in flow.
 */
export function CaretButton({ dir, onClick, disabled, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`group grid h-[32px] w-[32px] place-items-center transition-opacity ${
        disabled ? "cursor-default opacity-30" : "hover:opacity-70"
      } ${className}`}
    >
      <Caret dir={dir} className="h-[32px] w-[32px]" />
    </button>
  );
}

export default Caret;
