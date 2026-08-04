import { A, DIMS } from "../assets";
import { PartnerGlow } from "../components/Glow";
import RectFrame from "../components/RectFrame";
import useInView from "../components/useInView";

/**
 * `Partners` (114:268) — 1440×820, page y 5026, on the wide `image 67` plate.
 *
 * Six logo cards, each just corner-tick brackets + the logo (no card fill,
 * except Groups 23/25 which carry a white rectangle). Positions are the
 * design's exact coordinates:
 *
 *   Mphasis   457×174 @ (492,152)   — anchor card, 11px ticks
 *   Haas      319×121 @ (366,386)
 *   Plaksha   319×121 @ (755,386)
 *   Geekroom  315×120 @ (175,582)
 *   HackCulture 315×120 @ (563,582) — white card
 *   She Builds 315×120 @ (949,583)  — white card
 *
 * The small-card logos were identified by OCR (partner-a..c2); Geekroom is
 * confirmed by the shared image ref with node 114:1289 "Geekroom 1". The white
 * cards hold HackCulture / She Builds so their (dark) marks stay visible.
 */

const SMALL = [
  { img: A.partnerHaas, dims: DIMS.partnerHaas, x: 366, y: 386, w: 319, h: 121, white: false },
  { img: A.partnerPlaksha, dims: DIMS.partnerPlaksha, x: 755, y: 386, w: 319, h: 121, white: false },
  { img: A.partnerGeekroom, dims: DIMS.partnerGeekroom, x: 175, y: 582, w: 315, h: 120, white: false },
  { img: A.partnerHackCulture, dims: DIMS.partnerHackCulture, x: 563, y: 582, w: 315, h: 120, white: true },
  { img: A.partnerSheBuilds, dims: DIMS.partnerSheBuilds, x: 949, y: 583, w: 315, h: 120, white: true },
];

function Ticks({ size, className }) {
  return (
    <>
      <span className={`absolute w-px ${className}`} style={{ left: size / 2, top: 0, height: size }} />
      <span className={`absolute h-px ${className}`} style={{ left: 0, top: size / 2, width: size }} />
      <span
        className={`absolute w-px ${className}`}
        style={{ right: size / 2, top: 0, height: size }}
      />
      <span
        className={`absolute h-px ${className}`}
        style={{ right: 0, top: size / 2, width: size }}
      />
      <span
        className={`absolute w-px ${className}`}
        style={{ left: size / 2, bottom: 0, height: size }}
      />
      <span
        className={`absolute h-px ${className}`}
        style={{ left: 0, bottom: size / 2, width: size }}
      />
      <span
        className={`absolute w-px ${className}`}
        style={{ right: size / 2, bottom: 0, height: size }}
      />
      <span
        className={`absolute h-px ${className}`}
        style={{ right: 0, bottom: size / 2, width: size }}
      />
    </>
  );
}

export function Partners() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="partners"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[820px]">
        <PartnerGlow className="hidden lg:block" />
        <RectFrame
          strokeWidth={2}
          className="left-[-62px] top-[89px] -z-10 hidden h-[150px] w-[1567px] lg:block"
        />

        <h2 className="relative z-10 px-6 pt-10 text-center text-[clamp(26px,5vw,48px)] font-black text-white lg:absolute lg:inset-x-0 lg:top-[63px] lg:px-0 lg:pt-0 lg:text-[48px]">
          partners
        </h2>

        {/* Desktop — exact card coordinates. */}
        <div className="relative z-10 hidden lg:block">
          {/* Mphasis — the anchor card. */}
          <div className="absolute" style={{ left: 492, top: 152, width: 457, height: 174 }}>
            <Ticks size={11} className="bg-white/70" />
            <img
              src={A.partnerMphasis}
              alt="Mphasis"
              width={DIMS.partnerMphasis.w}
              height={DIMS.partnerMphasis.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] object-contain"
            />
          </div>
          {SMALL.map((p) => (
            <div key={p.img} className="absolute" style={{ left: p.x, top: p.y, width: p.w, height: p.h }}>
              <Ticks size={8} className="bg-white/70" />
              <div
                className={`absolute inset-[7px] ${p.white ? "bg-white" : ""} flex items-center justify-center`}
              >
                <img
                  src={p.img}
                  alt="Partner logo"
                  width={p.dims.w}
                  height={p.dims.h}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — reflowed as a wrap grid. */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-5 px-6 pb-16 pt-8 lg:hidden">
          <img
            src={A.partnerMphasis}
            alt="Mphasis"
            width={DIMS.partnerMphasis.w}
            height={DIMS.partnerMphasis.h}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[380px] object-contain"
          />
          {SMALL.map((p) => (
            <div
              key={p.img}
              className={`flex h-[86px] w-[calc(50%-10px)] max-w-[220px] items-center justify-center p-2 ${
                p.white ? "bg-white" : ""
              }`}
            >
              <img
                src={p.img}
                alt="Partner logo"
                width={p.dims.w}
                height={p.dims.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
