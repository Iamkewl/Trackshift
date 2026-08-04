/**
 * Ambient lighting — the new Figma's page-level plates (XZEbZaLnpeggQI3s1auPr2).
 *
 * The page backdrop (behind Frame 35) is a set of stretched photo plates, each
 * exported 2x as WebP and placed here at its exact design box. Because the
 * exports were rendered from the image nodes, their baked-in gradient washes
 * come along for free — no crop math, no CSS overlay gradients (the old file's
 * plates needed both).
 *
 * Each plate is anchored to the section it lights rather than laid out as one
 * page-wide layer, so a glow stays with its content if a section reflows
 * (the same lesson as the previous design's `Group 58`). Every layer here is
 * `-z-10` — the page root sets `isolate`, so -z-10 resolves against that
 * stacking context and stays above the root's black background. `image 5`'s
 * node opacity (0.49) is applied in CSS, not baked into the export.
 */
import PLATE_A from "../assets/plate-a.webp";
import PLATE_B from "../assets/plate-b.webp";
import PLATE_CHECKER from "../assets/plate-checker.webp";
import BG_PARTNERS from "../assets/bg-partners.webp";
import BG_MID from "../assets/bg-mid.webp";

/** Hero rig — `image 5` (op .49) + `image 6` + the Rectangle 1 black cover.
 *  Same geometry as `hero`'s own copies (114:99–101); the rect is a blurred
 *  black cover that holds the headline contrast, painted over the plates. */
export function HeroGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute overflow-hidden"
        style={{ left: -66, top: -1047, width: 1528, height: 2375, opacity: 0.49 }}
      >
        <img src={PLATE_A} alt="" decoding="async" className="h-full w-full max-w-none" />
      </div>
      <div
        className="absolute overflow-hidden"
        style={{ left: -264, top: -877, width: 1924, height: 1282 }}
      >
        <img src={PLATE_B} alt="" decoding="async" className="h-full w-full max-w-none" />
      </div>
      <div
        className="absolute bg-black"
        style={{ left: -66, top: 58, width: 1579, height: 1012, filter: "blur(100px)" }}
      />
    </div>
  );
}

/** `image 4` (114:88) — red rails plate behind the Problems section.
 *  Page y 2158; section at 2197. */
export function ProblemsGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ left: -857, top: -39, width: 2418, height: 1360 }}
    >
      <img src={BG_MID} alt="" decoding="async" loading="lazy" className="h-full w-full max-w-none" />
    </div>
  );
}

/** `image 2` (114:91) — the checker sweep behind Prizes / Timeline.
 *  Page y 3788; Prizes section at 3306. */
export function CheckerGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ left: -438, top: 482, width: 2186, height: 1297 }}
    >
      <img src={PLATE_CHECKER} alt="" decoding="async" loading="lazy" className="h-full w-full max-w-none" />
    </div>
  );
}

/** `image 67` (114:87) — the wide plate behind Partners.
 *  Page y 5134; Partners section at 5026. */
export function PartnerGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ left: -178, top: 108, width: 1796, height: 1010 }}
    >
      <img src={BG_PARTNERS} alt="" decoding="async" loading="lazy" className="h-full w-full max-w-none" />
    </div>
  );
}

/** `image 68` (114:89) — the same rails plate again, behind Lookback / Apply.
 *  Page y 7192; Lookback section at 7353. */
export function LookbackGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${className}`}
      style={{ left: -364, top: -161, width: 2418, height: 1360 }}
    >
      <img src={BG_MID} alt="" decoding="async" loading="lazy" className="h-full w-full max-w-none" />
    </div>
  );
}

export default HeroGlow;
