import React from "react";
import { A, DIMS } from "../assets";
import { PartnerGlow } from "../components/Glow";
import SpeedStreak from "../components/SpeedStreak";
import useInView from "../components/useInView";
import { P_HERO_BRACKET, VB_HERO_BRACKET, P_HERO_BRACKET_M, VB_HERO_BRACKET_M } from "../components/paths";

/**
 * `Partners` (114:268) — 1440×820, page y 5026, on the `image 67` plate.
 *
 * Six logos, each just corner-tick brackets around a transparent mark — there
 * are NO cards behind them in the design. An earlier pass put white plates
 * under HackCulture and She Builds to keep dark marks readable; the real marks
 * are the transparent Figma source bitmaps, which already read white on black,
 * so the plates are gone and the logos sit straight on the glow.
 *
 * The design's corner `+` brackets around each mark are deliberately not
 * drawn — they read as visual noise at this size.
 *
 * Every mark is placed by the design's own pattern transform rather than
 * `object-contain`, because several are cropped inside their box (Geek Room is
 * drawn at 32.1% width, She Builds at 155.3% height). Percentages are of the
 * tick box; `box` is the bracket rect, `mark` the logo inside it.
 */

const LOGOS = [
  {
    key: "mphasis",
    img: A.partnerMphasis,
    dims: DIMS.partnerMphasis,
    alt: "Mphasis Foundation",
    box: { left: 492, top: 152, width: 457, height: 174 },
    // pattern16 — 108.86% × 100%, offset -4.43% x
    mark: { left: "-4.432%", top: "0%", width: "108.864%", height: "100%" },
  },
  {
    key: "tgr",
    img: A.partnerHaas,
    dims: DIMS.partnerHaas,
    alt: "TGR Haas F1 Team",
    box: { left: 366, top: 386, width: 319, height: 121 },
    // pattern17 — 100% × 93.31%, offset +3.35% y
    mark: { left: "0%", top: "3.347%", width: "100%", height: "93.305%" },
  },
  {
    key: "plaksha",
    img: A.partnerPlaksha,
    dims: DIMS.partnerPlaksha,
    alt: "Plaksha University — DS Brar Center for Girls and Women in STEM",
    box: { left: 755, top: 386, width: 319, height: 121 },
    // pattern18 — 100% × 115.39%, offset -7.70% y
    mark: { left: "0%", top: "-7.696%", width: "100%", height: "115.392%" },
  },
  {
    key: "geekroom",
    img: A.partnerGeekroom,
    dims: DIMS.partnerGeekroom,
    alt: "Geek Room Plaksha",
    box: { left: 175, top: 582, width: 315, height: 120 },
    // pattern20 — 32.13% × 100%, offset +33.94% x
    mark: { left: "33.935%", top: "0%", width: "32.129%", height: "100%" },
  },
  {
    key: "hackculture",
    img: A.partnerHackCulture,
    dims: DIMS.partnerHackCulture,
    alt: "HackCulture",
    box: { left: 563, top: 582, width: 315, height: 120 },
    // pattern19 — 96.02% × 52.45%, offset (1.99%, 23.77%)
    mark: { left: "1.990%", top: "23.773%", width: "96.020%", height: "52.454%" },
  },
  {
    key: "shebuilds",
    img: A.partnerSheBuilds,
    dims: DIMS.partnerSheBuilds,
    alt: "She Builds",
    box: { left: 949, top: 583, width: 315, height: 120 },
    // pattern21 — 54.04% × 155.30%, offset (23.31%, -21.50%)
    mark: { left: "23.310%", top: "-21.498%", width: "54.044%", height: "155.302%" },
  },
];

export function Partners() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="partners"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[831px]">
        <PartnerGlow className="hidden lg:block" />

        {/* `Rectangle 24` (114:269 desktop / 237:342 mobile) — same open
            bracket as the Hero CTA and Lookback heading, framing the section
            title at both sizes. */}
        <SpeedStreak
          viewBox={VB_HERO_BRACKET}
          d={P_HERO_BRACKET}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-1/2 top-[89px] -z-10 hidden h-[150px] w-[1567px] -translate-x-1/2 lg:block"
        />
        <SpeedStreak
          viewBox={VB_HERO_BRACKET_M}
          d={P_HERO_BRACKET_M}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-[-29px] top-[40px] -z-10 h-[45px] w-[449px] lg:hidden"
        />

        <h2 className="relative z-10 px-6 pt-10 text-center text-[clamp(26px,5vw,48px)] font-black uppercase text-white lg:absolute lg:inset-x-0 lg:top-[63px] lg:px-0 lg:pt-0 lg:text-[48px]">
          partners
        </h2>

        {/* Desktop — exact box + mark coordinates. */}
        <div className="relative z-10 hidden lg:block">
          {LOGOS.map((l) => (
            <div key={l.key} className="absolute" style={l.box}>
              <img
                src={l.img}
                alt={l.alt}
                width={l.dims.w}
                height={l.dims.h}
                loading="lazy"
                decoding="async"
                className="absolute max-w-none object-fill"
                style={l.mark}
              />
            </div>
          ))}
        </div>

        {/* Mobile (237:326 `Group 22/21/20/23/24/25`) — three rows: Mphasis
            alone, then TGR + Plaksha side by side, then the three small
            marks across in one row. */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 pb-16 pt-8 lg:hidden">
          <img
            src={LOGOS[0].img}
            alt={LOGOS[0].alt}
            width={LOGOS[0].dims.w}
            height={LOGOS[0].dims.h}
            loading="lazy"
            decoding="async"
            className="h-auto max-h-[84px] w-full max-w-[220px] object-contain"
          />
          <div className="flex w-full max-w-[340px] items-center justify-center gap-6">
            {LOGOS.slice(1, 3).map((l) => (
              <img
                key={l.key}
                src={l.img}
                alt={l.alt}
                width={l.dims.w}
                height={l.dims.h}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[50px] w-1/2 object-contain"
              />
            ))}
          </div>
          <div className="flex flex-wrap w-full max-w-[360px] items-center justify-center gap-4 sm:gap-5">
            {LOGOS.slice(3, 6).map((l) => (
              <img
                key={l.key}
                src={l.img}
                alt={l.alt}
                width={l.dims.w}
                height={l.dims.h}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[36px] sm:max-h-[40px] w-1/3 min-w-[80px] object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
