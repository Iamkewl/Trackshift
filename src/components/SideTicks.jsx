/**
 * `Group 46` / `Group 47` — the white tick crosses that run down both page
 * edges (42 per side, 434px apart, starting at y115, x71 / x1344). Each tick
 * is two 1px strokes crossing in a 24×24 box.
 */
const SPACING = 434;
const START = 115;
const COUNT = 42;

function Ticks({ x }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 hidden w-6 lg:block"
      style={{ left: x }}
    >
      {Array.from({ length: COUNT }, (_, i) => {
        const top = START + i * SPACING;
        return (
          <div key={top} className="absolute" style={{ top, width: 24, height: 24 }}>
            <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-white/50" />
            <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-white/50" />
          </div>
        );
      })}
    </div>
  );
}

export function SideTicks() {
  return (
    <>
      <Ticks x={71} />
      <Ticks x={1344} />
    </>
  );
}

export default SideTicks;
