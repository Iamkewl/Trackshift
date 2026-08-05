/**
 * Ambient lighting — the Figma page backdrop (XZEbZaLnpeggQI3s1auPr2), built
 * the way the design actually composes it rather than from flattened exports.
 *
 * Each plate in Figma is THREE stacked rects inside one group:
 *
 *     <g opacity="0.29">
 *       <rect fill="url(#pattern…)"/>   the source bitmap, cropped
 *       <rect fill="url(#paint…)"/>     a black→transparent linear wash
 *       <rect fill="url(#paint…)"/>     a second wash from the other side
 *     </g>
 *
 * so the plate is a raw photo with two directional black fades over it and a
 * group opacity on top. Baking that into one WebP throws away the structure
 * (and the alpha ends up carrying the opacity, which is then easy to apply
 * twice). Everything below reproduces the three layers separately.
 *
 * Geometry, from the page's own SVG export — page coordinates, then made
 * section-relative at each call site:
 *
 *   image 5  (114:92) x  -35 y -1005 1528×2375  α .49, bitmap at 100.02%×114.36%
 *   image 6  (114:93) x -268 y  -902 1924×1282  blur 2.5, bitmap at 100%×297.57%
 *   Rect 1   (114:94) x  -70 y   111 1579× 773  black, blur 100
 *   image 4  (114:88) rect 1360.12×2418 rotate(90 1561 2158), α .29
 *   image 68 (114:89) rect 1360.12×2418 matrix(0,1,1,0,-364,7192), α .29
 *   image 2  (114:91) rect 2045.26×902.619 matrix(.979349 .202175 .202175
 *                     -.979349 -437.994 4671.98), blur 4.55, bitmap at 100%×127.46%
 *   image 67 (114:87) x -178 y  5134 1795.56×1010, α .19
 *
 * Two things drive the rest:
 *
 * 1. Several plates are CROPPED, not fitted — `image 6`'s bitmap is drawn at
 *    297.57% of its box height, top-aligned, so only the top third is ever on
 *    screen. A plate box's aspect ratio is therefore NOT its bitmap's, and
 *    matching a bitmap against the box has picked the wrong file before.
 *
 * 2. The rotated plates carry their transform as a matrix. CSS `matrix()` uses
 *    exactly the SVG convention (x' = ax + cy + e, y' = bx + dy + f), so the
 *    matrix is copied across with only `f` shifted from page space into the
 *    section. `transform-origin: 0 0` is required for that to hold.
 *
 * A plate is usually taller than the section it is anchored to, and sections
 * are `overflow-hidden`, so it gets sliced at the seam. Each glow therefore
 * takes an offset (`f`, or `top`) and is rendered AGAIN in the following
 * section at the continued offset, so the wash finishes where the design says
 * rather than on the section boundary.
 *
 * Every layer is `-z-10`; the page root sets `isolate`, so -z-10 resolves
 * against that stacking context and stays above the root's black background.
 * The `SoftMask` inside the hero rig is the exception — it is a *sibling* of
 * the plates that must paint over them, so it must not get -z-10.
 */

import HERO_A from "../assets/glow-hero-a.webp";
import HERO_B from "../assets/glow-hero-b.webp";
import CHECKER from "../assets/glow-checker.webp";
import RAILS from "../assets/glow-rails.webp";
import PARTNERS from "../assets/glow-partners.webp";

/**
 * The black washes, derived from the SVG's gradient endpoints projected onto
 * each box's CSS gradient line. These reproduce the exported values exactly.
 */
const WASH = {
  // image 4 / image 68 — both rails plates share one local geometry.
  rails:
    "linear-gradient(79.658deg, #000 8.019%, rgba(0,0,0,0) 32.556%)," +
    "linear-gradient(280.309deg, #000 8.143%, rgba(0,0,0,0) 15.240%)",
  // image 2 — the checker sweep.
  checker:
    "linear-gradient(4.466deg, #000 1.054%, rgba(0,0,0,0) 16.016%)," +
    "linear-gradient(203.063deg, #000 3.524%, rgba(0,0,0,0) 20.220%)",
  // image 67 — the wide plate behind Partners.
  partners:
    "linear-gradient(357.678deg, #000 8.854%, rgba(0,0,0,0) 31.535%)," +
    "linear-gradient(178.167deg, #000 13.995%, rgba(0,0,0,0) 37.048%)",
};

/**
 * `Rectangle 1/2/3` — a feathered black rect (100px blur in Figma). Not light:
 * a vignette mask that holds contrast under the headlines.
 */
export function SoftMask({ className = "", style }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bg-black ${className}`}
      style={{ filter: "blur(100px)", ...style }}
    />
  );
}

/** One plate: cropped bitmap + the two washes, in a box you position. */
function Plate({ src, style, imgStyle, wash, blur, opacity, lazy = true }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute overflow-hidden"
      style={{ opacity, filter: blur ? `blur(${blur}px)` : undefined, ...style }}
    >
      <img
        src={src}
        alt=""
        decoding="async"
        loading={lazy ? "lazy" : undefined}
        fetchpriority={lazy ? undefined : "high"}
        className="absolute left-0 top-0 max-w-none"
        style={imgStyle ?? { width: "100%", height: "100%" }}
      />
      {wash ? (
        <div className="absolute inset-0" style={{ backgroundImage: wash }} />
      ) : null}
    </div>
  );
}

/** Hero rig — `image 5` + `image 6` + the `Rectangle 1` cover. */
export function HeroGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 overflow-hidden ${className}`}
    >
      {/* image 5 (114:92) — rails and the bend, cropped to 114.36% height. */}
      <Plate
        src={HERO_A}
        lazy={false}
        opacity={0.49}
        style={{ left: -35, top: -1005, width: 1528, height: 2375 }}
        imgStyle={{ width: "100.02%", height: "114.36%" }}
      />
      {/* image 6 (114:93) — the neon streak field, only its top third on screen. */}
      <Plate
        src={HERO_B}
        lazy={false}
        blur={2.5}
        style={{ left: -268, top: -902, width: 1924, height: 1282 }}
        imgStyle={{ width: "100%", height: "297.57%" }}
      />
      {/* Rectangle 1 (114:94) — what keeps the headline legible. Sibling of the
          plates, so no -z-10: it has to paint over them. */}
      <SoftMask style={{ left: -70, top: 111, width: 1579, height: 773 }} />
      {/* Rectangle 2 (114:95) — 1579×455 @ page (-70,1055). Damps the rays over
          the hero's bottom band, so the plate has already gone to black by the
          time the section clips it. Without this the red ends on a hard line. */}
      <SoftMask style={{ left: -70, top: 1055, width: 1579, height: 455 }} />
    </div>
  );
}

/** `image 4` (114:88) — red rails behind Problems, rotated 90°. Section y 2197. */
export function ProblemsGlow({ className = "", f = -39 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -z-10 ${className}`}>
      <Plate
        src={RAILS}
        opacity={0.29}
        wash={WASH.rails}
        style={{
          width: 1360.12,
          height: 2418,
          transformOrigin: "0 0",
          transform: `matrix(0, 1, -1, 0, 1561, ${f})`,
        }}
      />
    </div>
  );
}

/** `image 68` (114:89) — the same plate mirrored, behind Lookback. Section y 7353. */
export function LookbackGlow({ className = "", f = -161 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -z-10 ${className}`}>
      <Plate
        src={RAILS}
        opacity={0.29}
        wash={WASH.rails}
        style={{
          width: 1360.12,
          height: 2418,
          transformOrigin: "0 0",
          transform: `matrix(0, 1, 1, 0, -364, ${f})`,
        }}
      />
    </div>
  );
}

/** `image 2` (114:91) — the checker sweep behind Prizes. Section y 3306. */
export function CheckerGlow({ className = "", f = 1365.98 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -z-10 ${className}`}>
      <Plate
        src={CHECKER}
        blur={4.55}
        wash={WASH.checker}
        style={{
          width: 2045.26,
          height: 902.619,
          transformOrigin: "0 0",
          transform: `matrix(0.979349, 0.202175, 0.202175, -0.979349, -437.994, ${f})`,
        }}
        imgStyle={{ width: "100%", height: "127.46%" }}
      />
    </div>
  );
}

/** `image 67` (114:87) — the wide plate behind Partners. Section y 5026. */
export function PartnerGlow({ className = "", top = 108 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute -z-10 ${className}`}>
      <Plate
        src={PARTNERS}
        opacity={0.19}
        wash={WASH.partners}
        style={{ left: -178, top, width: 1795.56, height: 1010 }}
      />
    </div>
  );
}

export default HeroGlow;
