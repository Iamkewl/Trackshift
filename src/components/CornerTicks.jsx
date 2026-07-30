/**
 * The 8px L-brackets Figma repeats at the corners and mid-edges of each
 * partner card (`Group 8`–`Group 19`). Rebuilt as CSS borders — 24 nested
 * SVG groups per card was not worth carrying over.
 */
export function CornerTicks() {
  const base = "absolute h-2 w-2 border-white/70";
  return (
    <>
      <span className={`${base} -left-px -top-px border-l border-t`} />
      <span className={`${base} -right-px -top-px border-r border-t`} />
      <span className={`${base} -bottom-px -left-px border-b border-l`} />
      <span className={`${base} -bottom-px -right-px border-b border-r`} />
      <span className="absolute -top-px left-1/2 h-2 w-2 -translate-x-1/2 border-t border-white/70" />
      <span className="absolute -bottom-px left-1/2 h-2 w-2 -translate-x-1/2 border-b border-white/70" />
    </>
  );
}

export default CornerTicks;
