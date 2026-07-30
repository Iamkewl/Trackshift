/**
 * Ambient lighting — Figma `Group 58` (1:5), built from the real exported plates.
 *
 * Group 58 is one light rig spanning the whole 1440×7662 page. Every child is
 * positioned in page coordinates:
 *
 *   image 2  (1:6)  x -438  y 3706  2185×1297  blue/red checker sweep, rotated
 *   image 4  (1:7)  x -610  y 2219  2050×1153  red rails, rotated 90°, α .40
 *   image 5  (1:8)  x  -70  y -1072 1528×2375  red rails + bend, α .49
 *   image 6  (1:9)  x -268  y  -902 1924×1282  neon streak field
 *   Rect 1   (1:10) x  -70  y   111 1579× 696  feathered black
 *   Rect 2   (1:11) x  -70  y  1055 1579× 455  feathered black
 *   Rect 3   (1:12) x  -70  y  3959 1579× 763  feathered black
 *
 * The rects are not light — they are 100px-blurred black, i.e. vignette masks
 * that hold contrast under the headlines.
 *
 * Two details drive everything and were previously missed:
 *
 * 1. Several plates are CROPPED, not fitted. `image 6`'s bitmap is drawn at
 *    297.57% of its box height and top-aligned, so only the top third is ever
 *    on screen; `image 5` is drawn at 114.36%. Fitting the whole bitmap to the
 *    box instead drags the wrong part of the plate into frame.
 *
 * 2. Because of (1) the box aspect ratio is NOT the source aspect ratio. An
 *    earlier pass identified `image 6` by matching a bitmap against the box
 *    ratio (1.50) and picked the wrong file; the real fill is 716×1420 (0.504),
 *    which matches the *inner* image. The saturate/brightness constants that
 *    used to live here existed only to bend that wrong bitmap toward the
 *    design — with the correct plates no correction is needed.
 *
 * Rather than one page-wide layer, each plate is anchored to the section it
 * lights (offsets below are section-relative). A flattened full-page bitmap
 * decouples from the content the moment any section changes height.
 *
 * Every layer here is `-z-10`. In Figma, `Group 58` is the bottom-most layer of
 * the whole page, so no plate may ever paint over copy. Section-anchoring alone
 * does not give you that: these plates are designed to bleed past their own
 * section, and a plate that bleeds *upward* (image 2 starts 282px above
 * Challenge Tracks) sits later in the DOM than the section it overlaps, so
 * without this it would paint straight over the Partners cards.
 *
 * The page root sets `isolate`, so -z-10 resolves against that stacking context
 * and stays above the root's black background.
 */

import PLATE_A from "../assets/glow-plate-a.webp";
import PLATE_B from "../assets/glow-plate-b.webp";
import PLATE_MID from "../assets/glow-plate-mid.webp";
import PLATE_DIAG from "../assets/glow-plate-diag.webp";

/**
 * `Rectangle 1/2/3` — a feathered black rect. Width is given as a percentage so
 * it tracks the viewport; the design is 1579 wide on a 1440 canvas (109.653%).
 *
 * No `-z-10` here, deliberately. Inside `HeroGlow` this is a *sibling* of the
 * plates and has to paint over them — it is the cover that holds the headline,
 * and pushing it behind the plates erases it entirely. The rig's own container
 * carries the -z-10 instead. Standalone uses (SupportedBy, ChallengeTracks) sit
 * directly in a section, so those call sites pass `-z-10` themselves.
 */
export function SoftMask({ className = "", style, opacity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bg-black ${className}`}
      style={{ filter: "blur(100px)", opacity, ...style }}
    />
  );
}

/**
 * Hero rig — `image 5` + `image 6` + `Rectangle 1`.
 *
 * Sized in percentages of the hero box (1440×1066) so the whole rig tracks the
 * viewport. Figma stacks `image 6` over `image 5`, so the top band is purely
 * the neon hues on black — screening them together instead floods it red.
 */
export function HeroGlow({ className = "", intensity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      {/* image 5 (1:8) — twin rails, the bend, and the flare below it */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "-4.861%",
          top: "-100.563%",
          width: "106.111%",
          height: "222.795%",
          opacity: 0.49,
        }}
      >
        <img
          src={PLATE_A}
          alt=""
          decoding="async"
          fetchpriority="high"
          className="absolute left-0 top-0 max-w-none"
          style={{ width: "100.02%", height: "114.36%" }}
        />
      </div>

      {/* image 6 (1:9) — neon streak field across the top, cropped to its top third */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: "-18.611%",
          top: "-84.615%",
          width: "133.611%",
          height: "120.263%",
          filter: "blur(2.5px)",
        }}
      >
        <img
          src={PLATE_B}
          alt=""
          decoding="async"
          className="absolute left-0 top-0 max-w-none"
          style={{ width: "100%", height: "297.57%" }}
        />
      </div>

      {/* Rectangle 1 (1:10) — what keeps the headline legible */}
      <SoftMask
        style={{
          top: "10.413%",
          width: "109.653%",
          height: "65.291%",
          marginLeft: "-0.035%",
        }}
      />
    </div>
  );
}

/**
 * `image 4` (1:7) — the warm rails behind Prizes/Partners, rotated 90° so they
 * run horizontally. This plate was never exported before, which is why the
 * whole upper-middle of the page rendered flat black against a design that
 * glows there.
 *
 * Anchored to the Prizes section: page y 2219 against a section at 2319.
 */
export function MidGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -z-10 flex -translate-x-1/2 items-center justify-center overflow-hidden ${className}`}
    >
      <div className="flex-none rotate-90 opacity-40">
        <div className="relative h-[2050px] w-[1153px]">
          <img
            src={PLATE_MID}
            alt=""
            decoding="async"
            loading="lazy"
            className="absolute inset-0 h-full w-full max-w-none"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(-79.696deg, rgb(0,0,0) 8.141%, rgba(0,0,0,0) 15.239%)," +
                "linear-gradient(79.659deg, rgb(0,0,0) 8.019%, rgba(0,0,0,0) 32.556%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * `image 2` (1:6) — the blue/red checker sweep under Challenge Tracks, flipped
 * vertically and rotated 11.66°. The container is the rotated bounding box.
 *
 * Anchored to the Challenge Tracks section: page y 3706 against a section at 3988.
 */
export function DiagGlow({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 -z-10 flex -translate-x-1/2 items-center justify-center overflow-hidden ${className}`}
    >
      <div className="flex-none" style={{ transform: "scaleY(-1) rotate(11.66deg)" }}>
        <div
          className="relative h-[902.619px] w-[2045.255px]"
          style={{ filter: "blur(4.55px)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={PLATE_DIAG}
              alt=""
              decoding="async"
              loading="lazy"
              className="absolute left-0 top-0 w-full max-w-none"
              style={{ height: "127.46%" }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(4.466deg, rgb(0,0,0) 1.054%, rgba(0,0,0,0) 16.016%)," +
                "linear-gradient(203.063deg, rgb(0,0,0) 3.524%, rgba(0,0,0,0) 20.22%)",
            }}
          />
        </div>
      </div>
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

export default HeroGlow;
