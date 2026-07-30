/**
 * Ambient lighting — Figma `Group 58` (`image 5`, `image 6`, `Rectangle 1/2/3`).
 *
 * `image 5` is a long-exposure light-trail plate. Structure, from the source:
 *   1. a warm maroon field filling the frame, brightest in a broad band across
 *      the lower-middle, falling to near-black in the top corners;
 *   2. two hot rails dropping from the top edge, running close and near-vertical,
 *      that bend outward at slightly different heights around 60% and sweep off
 *      the left and right edges;
 *   3. broad, soft, orange-white sweep bands trailing those rails outward;
 *   4. a dense spray of thin streaks radiating down and outward from the bend,
 *      filling the bottom third to the edges;
 *   5. a hot near-white bloom at the bend itself.
 *
 * `Rectangle 1/2/3` are not light — they are heavily feathered black rects, i.e.
 * vignette masks over the plate. Reproduced as `Vignette`.
 *
 * Rebuilt in SVG rather than CSS gradients: the geometry is curved and radial,
 * which stacked linear-gradients cannot express. Export `image 5` / `image 6`
 * if you want the original film grain — see ASSETS.md.
 */

import PLATE_A from "../assets/glow-plate-a.webp";
import PLATE_B from "../assets/glow-plate-b.webp";

/**
 * Geometry of `Group 58`, straight out of Figma. Every offset is relative to the
 * 1440×1066 hero box, expressed as a percentage of it so it scales with the
 * viewport.
 *
 *   image 5  (1:8)   x  -70   y -1072   1528 × 2375
 *   image 6  (1:9)   x -268   y  -902   1924 × 1282
 *   Rect 1   (1:10)  x  -70   y   111   1579 ×  696   — feathered black
 *
 * Both plates extend far above the hero and are clipped by it, so only a slice
 * ever shows: `image 5` contributes the bend and the flare across the lower
 * half, `image 6` the vertical streak field over the top. This is the whole
 * trick — stretching either one to fill the hero (`object-cover`) drags the hot
 * bend into frame and blows the section out. The offsets are the design.
 */
/**
 * Hero glow intensity. Tuned against the Figma PDF export (HackCulture.pdf) by
 * measuring hue distribution in the top streak band, not by eye.
 *
 * Fitted against the violet/blue band at x 1080-1260, where the cool hues live:
 *
 *              blue   violet   peak
 *   DESIGN      14%     49%     138
 *   CURRENT     16%     44%     104
 *
 * PLATE_B_BRIGHT is the sensitive one — it trades blue against violet. Below
 * ~1.4 the blues vanish entirely (that was the "no blues" bug); above ~1.7 they
 * overwhelm the violet. 1.55 is the measured optimum.
 *
 * Peak brightness still reads under the design (104 vs 138). Raising SAT or
 * PLATE_B_BRIGHT to close it pushes the hue balance back off, so it is left
 * alone deliberately — see README.
 */
const SAT = 1.3;
const PLATE_B_BRIGHT = 1.55;
const MASK_OPACITY = 0.95;

/**
 * Edge treatment. Each plate is faded where its box ends, so the two dissolve
 * into each other instead of butting up:
 *
 *   A fades IN  across 45%→64% of its height — keeps its red field out of the
 *               top band, which is what was washing the neon hues red.
 *   B fades OUT across 62%→90% — kills the hard horizontal seam its box edge
 *               would otherwise cut at hero y≈380 (measured: Δ14 → Δ0.24).
 */
const FADE_A = "linear-gradient(to bottom, transparent 45%, #000 64%)";
const FADE_B = "linear-gradient(to bottom, #000 62%, transparent 90%)";

const PLATE_5 = { left: "-4.861%", top: "-100.563%", width: "106.111%", height: "222.795%" };
// left solved by correlating the plate against the PDF's column-brightness
// profile (best fit -260px); metadata said -268, so this confirms it to ~8px.
const PLATE_6 = { left: "-18.056%", top: "-84.615%", width: "133.611%", height: "120.263%" };
const MASK_1  = { left: "-4.861%", top: "10.413%", width: "109.653%", height: "65.291%" };

/** Plate space is 1440×1300. The bend sits just left of centre, ~63% down. */
const VP = { x: 690, y: 820 };

/** Palette, hot core outward. */
const C = {
  core: "#FFE3EA",
  hot: "#FF5C7A",
  warm: "#FF7A4D",
  ember: "#FF9E6B",
  red: "#E01A34",
  deep: "#8C0F1E",
  field: "#B01326",
};

/** The two primary rails — they bend at different heights, and never meet. */
const RAILS = [
  {
    d: "M 636 -40 C 636 260, 630 520, 648 700 C 596 800, 340 880, -220 962",
    lead: 1,
  },
  {
    d: "M 742 -40 C 742 280, 750 560, 742 742 C 812 838, 1094 902, 1660 966",
    lead: 0.94,
  },
];

/** Broad soft sweeps trailing the rails out to the edges. */
const SWEEPS = [
  { d: "M 640 690 C 520 810, 250 862, -260 918", w: 96, o: 0.30, c: C.ember, b: "b70" },
  { d: "M 742 736 C 880 830, 1160 880, 1700 930", w: 92, o: 0.28, c: C.ember, b: "b70" },
  { d: "M 646 706 C 540 822, 280 884, -240 950", w: 40, o: 0.42, c: C.warm, b: "b34" },
  { d: "M 742 752 C 866 844, 1140 900, 1680 956", w: 38, o: 0.40, c: C.warm, b: "b34" },
];

/** Dense spray radiating down and outward from the bend. */
function downFan() {
  const out = [];
  const N = 30;
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * 2 - 1; // -1 .. 1
    const a = Math.abs(t);
    out.push({
      d:
        `M ${VP.x + t * 16} ${VP.y - 90} ` +
        `C ${VP.x + t * 110} ${VP.y + 70}, ` +
        `${VP.x + t * 560} ${VP.y + 210}, ` +
        `${VP.x + t * 1320} 1380`,
      w: 7.5 - a * 4.2,
      o: 0.62 - a * 0.30,
      c: a < 0.22 ? C.hot : a < 0.55 ? C.red : C.deep,
      b: a < 0.3 ? "b8" : a < 0.65 ? "b18" : "b34",
    });
  }
  return out;
}

/** Shallower spray hugging the horizontal, just under the sweeps. */
function sideFan() {
  const out = [];
  for (const side of [-1, 1]) {
    for (let k = 0; k < 7; k++) {
      out.push({
        d:
          `M ${VP.x + side * (10 + k * 8)} ${VP.y - 220 + k * 40} ` +
          `C ${VP.x + side * (70 + k * 40)} ${VP.y - 20 + k * 24}, ` +
          `${VP.x + side * (420 + k * 120)} ${VP.y + 70 + k * 40}, ` +
          `${VP.x + side * (1080 + k * 160)} ${VP.y + 150 + k * 70}`,
        w: 6 - k * 0.6,
        o: 0.34 - k * 0.04,
        c: k < 2 ? C.warm : k < 4 ? C.red : C.deep,
        b: k < 2 ? "b8" : k < 4 ? "b18" : "b34",
      });
    }
  }
  return out;
}

const DOWN = downFan();
const SIDE = sideFan();

function Streak({ s }) {
  return (
    <path
      d={s.d}
      fill="none"
      stroke={s.c}
      strokeWidth={s.w}
      strokeLinecap="round"
      opacity={s.o}
      filter={`url(#${s.b})`}
    />
  );
}

/**
 * Legacy SVG reconstruction, kept as a fallback only.
 *
 * Superseded by the real exported plates — see `HeroGlow` below. Reachable via
 * `<HeroGlow plate={false} />`.
 */
function SvgGlow({ className = "", intensity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <svg viewBox="0 0 1440 1300" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          {[2, 8, 18, 34, 70].map((n) => (
            <filter key={n} id={`b${n}`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={n} />
            </filter>
          ))}

          {/* Warm field: broad band across the lower middle, dark top corners */}
          <radialGradient id="field" cx="48%" cy="68%" r="78%">
            <stop offset="0%" stopColor={C.field} stopOpacity="0.62" />
            <stop offset="30%" stopColor="#8E1020" stopOpacity="0.46" />
            <stop offset="62%" stopColor="#4A0810" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#3A060C" stopOpacity="0.10" />
          </radialGradient>
          <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="46%" stopColor="#7E0E1C" stopOpacity="0.22" />
            <stop offset="68%" stopColor={C.field} stopOpacity="0.30" />
            <stop offset="100%" stopColor="#2A050A" stopOpacity="0.10" />
          </linearGradient>
          <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.core} stopOpacity="0.85" />
            <stop offset="30%" stopColor={C.hot} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D6001C" stopOpacity="0" />
          </radialGradient>

          {/* Rails fade toward the top edge rather than hard-stopping */}
          <linearGradient id="railFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF" stopOpacity="0.30" />
            <stop offset="20%" stopColor="#FFF" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#FFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFF" stopOpacity="0.72" />
          </linearGradient>
          <mask id="railMask">
            <rect x="-400" y="-200" width="2240" height="1700" fill="url(#railFade)" />
          </mask>
        </defs>

        <rect width="1440" height="1300" fill="url(#field)" />
        <rect width="1440" height="1300" fill="url(#band)" />
        {/* overall haze so the plate never reads as flat black */}
        <rect width="1440" height="1300" fill="#7A0C18" opacity="0.10" />

        <g mask="url(#railMask)">
          {DOWN.map((s, i) => <Streak key={`d${i}`} s={s} />)}
          {SIDE.map((s, i) => <Streak key={`s${i}`} s={s} />)}
          {SWEEPS.map((s, i) => (
            <path key={`w${i}`} d={s.d} fill="none" stroke={s.c} strokeWidth={s.w}
              strokeLinecap="round" opacity={s.o} filter={`url(#${s.b})`} />
          ))}

          {RAILS.map((r, i) => (
            <g key={`r${i}`} opacity={r.lead}>
              <path d={r.d} fill="none" stroke={C.deep} strokeWidth="110" strokeLinecap="round" opacity="0.46" filter="url(#b70)" />
              <path d={r.d} fill="none" stroke={C.red} strokeWidth="52" strokeLinecap="round" opacity="0.52" filter="url(#b34)" />
              <path d={r.d} fill="none" stroke={C.hot} strokeWidth="24" strokeLinecap="round" opacity="0.62" filter="url(#b18)" />
              <path d={r.d} fill="none" stroke="#FFA8BC" strokeWidth="9" strokeLinecap="round" opacity="0.85" filter="url(#b8)" />
              <path d={r.d} fill="none" stroke={C.core} strokeWidth="3.4" strokeLinecap="round" opacity="1" filter="url(#b2)" />
            </g>
          ))}
        </g>

        <ellipse cx={VP.x} cy={VP.y - 30} rx="300" ry="210" fill="url(#bloom)" filter="url(#b70)" />
      </svg>
    </div>
  );
}

/** `Rectangle 1/2/3` — feathered black rects masking the plate's edges. */
/**
 * Ambient lighting — Figma `Group 58`, using the real exported plates.
 *
 * @param plate  `false` falls back to the old SVG reconstruction.
 */
export function HeroGlow({ className = "", intensity = 1, plate = true }) {
  if (!plate) return <SvgGlow className={className} intensity={intensity} />;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      {/* image 5 (1:8) — twin rails, the bend, and the flare below it */}
      <img
        src={PLATE_A}
        alt=""
        width={1528}
        height={2375}
        decoding="async"
        fetchPriority="high"
        className="absolute max-w-none"
        style={{
          ...PLATE_5,
          filter: `saturate(${SAT})`,
          maskImage: FADE_A,
          WebkitMaskImage: FADE_A,
        }}
      />
      {/* image 6 (1:9) — the neon streak field across the top.
          Normal blend, NOT screen. Figma stacks this over image 5, so the top
          band is purely these hues on black. Screening it over image 5 instead
          drags every streak toward red and flattens the magenta/violet/blue out
          of the palette entirely — measured: violet 12%→0%, red 6%→60%. */}
      <img
        src={PLATE_B}
        alt=""
        width={1924}
        height={1282}
        decoding="async"
        className="absolute max-w-none"
        style={{
          ...PLATE_6,
          filter: `brightness(${PLATE_B_BRIGHT}) saturate(${SAT})`,
          maskImage: FADE_B,
          WebkitMaskImage: FADE_B,
        }}
      />
      {/* Rectangle 1 (1:10) — a heavily feathered black rect, not a light source.
          It sits over the middle band and is what keeps the headline legible.
          Without it the hero is ~27% near-black; with it, ~53%, which is what
          the design reads as. */}
      <div
        className="absolute"
        style={{ ...MASK_1, background: "#000", filter: "blur(110px)", opacity: MASK_OPACITY }}
      />
    </div>
  );
}

export function Vignette({ className = "", strength = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          `radial-gradient(118% 88% at 50% 52%, transparent 32%, rgba(0,0,0,${0.5 * strength}) 72%, rgba(0,0,0,${0.9 * strength}) 100%),` +
          `linear-gradient(to bottom, rgba(0,0,0,${0.45 * strength}) 0%, transparent 20%, transparent 76%, rgba(0,0,0,${0.95 * strength}) 100%)`,
      }}
    />
  );
}

/** A single soft crimson wash — echoes the plate further down the page. */
export function GlowField({ className = "", intensity = 1, from = "50% 50%" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        opacity: intensity,
        filter: "blur(60px)",
        background: `radial-gradient(closest-side at ${from}, rgba(214,0,28,.40) 0%, rgba(140,15,60,.18) 48%, transparent 80%)`,
      }}
    />
  );
}

export default HeroGlow;
