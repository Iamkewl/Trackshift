import { useState } from "react";
import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { HeroGlow } from "../components/Glow";
import useInView from "../components/useInView";
import { redPunct } from "../components/RedPunct";
import {
  P_BLADE_824,
  VB_BLADE_824,
  P_HERO_BRACKET,
  VB_HERO_BRACKET,
  P_BLADE_345,
  VB_BLADE_345,
} from "../components/paths";

const NAV = [
  { label: "tracks", href: "#tracks" },
  { label: "partners", href: "#partners" },
  { label: "prize", href: "#prizes" },
  { label: "trackshift ‘25", href: "#apply" },
];

const STATS = [
  { value: "5o", label: "teams" },
  { value: "3", label: "problems" },
  { value: "24", label: "hours" },
];

export function Hero() {
  const [ref, live] = useInView(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1174px]">
        {/* Ambient lighting — `image 5/6` + Rectangle 1. See Glow.jsx */}
        <HeroGlow className="inset-0" />

        {/* Nav — logo centred, links flanking, positioned at the design's
            coordinates (they sit outside the 156px gutter at 1440). */}
        <nav className="relative z-10 lg:absolute lg:inset-x-0 lg:top-0">
          {/* Mobile top bar (233:88/233:171/233:89) — hamburger left, logo
              centred; the desktop link row doesn't exist at this size. */}
          <div className="relative flex items-center justify-center px-6 pt-[24px] lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="hero-mobile-menu"
              aria-label="Menu"
              className="absolute left-6 top-1/2 flex h-8 w-8 -translate-y-1/2 flex-col justify-center gap-[6px]"
            >
              <span className={`h-[3px] w-full bg-haas-red transition-transform ${menuOpen ? "translate-y-[9px] rotate-45" : ""}`} />
              <span className={`h-[3px] w-full bg-haas-red transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-[3px] w-full bg-haas-red transition-transform ${menuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
            </button>
            <img
              src={A.logo}
              alt="TrackShift 2026"
              width={342}
              height={274}
              className="h-[56px] w-[70px] object-cover"
            />
          </div>

          {/* Collapsible stacked menu (List-r opens this) — grid-rows
              animates height without a fixed value, same technique as the
              FAQ accordion. */}
          <div
            id="hero-mobile-menu"
            className="grid transition-[grid-template-rows] duration-300 ease-out lg:hidden"
            style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <ul className="mt-4 flex flex-col divide-y divide-haas-red/40 border-y border-haas-red/40 bg-black text-[15px] font-bold uppercase text-white">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-6 py-4 text-center transition-colors hover:text-haas-red"
                    >
                      {redPunct(n.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop link row + logo. */}
          <a
            href="#tracks"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[188px] lg:top-[67px] lg:block"
          >
            tracks
          </a>
          <a
            href="#partners"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[420px] lg:top-[67px] lg:block"
          >
            partners
          </a>
          <img
            src={A.logo}
            alt="TrackShift 2026"
            width={342}
            height={274}
            className="hidden object-cover lg:absolute lg:left-1/2 lg:top-[36px] lg:block lg:h-[118px] lg:w-[147px] lg:-translate-x-1/2"
          />
          <a
            href="#prizes"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[975.5px] lg:top-[67px] lg:block"
          >
            prize
          </a>
          <a
            href="#apply"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[1190.5px] lg:top-[67px] lg:block"
          >
            {redPunct("trackshift ‘25")}
          </a>
        </nav>

        {/* Copy block — centred stack, absolute at the design's y at lg.
            `Build. compete. innovate.` (114:102) is hidden in the Figma, so the
            headline is the first line and the stack starts at page y320. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1055px] flex-col items-center px-6 pt-[180px] text-center lg:absolute lg:inset-x-0 lg:top-[320px] lg:mx-auto lg:px-0 lg:pt-0">
          {/* 114:103 — the comma after "pitstop" and the closing full stop
              are both red in the design (not just periods/apostrophes, this
              one comma specifically), so they're hardcoded rather than run
              through `redPunct`. */}
          <h1 className="max-w-[937px] text-[clamp(28px,5.6vw,58px)] font-black uppercase leading-[0.92] text-white lg:text-[58.5px] lg:leading-[53px]">
            Where Ideas pitstop<span className="text-haas-red">,</span>
            <br />
            Innovation refuels<span className="text-haas-red">.</span>
          </h1>
          {/* 114:104 — 500×23, a single line in the design. */}
          <p className="font-helvetica mt-[26px] max-w-[500px] text-[16px] text-white lg:mt-[16px] lg:max-w-none lg:whitespace-nowrap lg:text-[20px] lg:leading-[23px]">
            {redPunct("You don’t need to follow the sport to solve the challenge.")}
          </p>

          {/* Date // venue — the separator is the red `//` glyph (190:50),
              Orbitron 900/32 at 50% opacity, not a rule. */}
          <div className="mt-[30px] flex items-center gap-[18px] text-[20px] font-normal uppercase text-white lg:mt-[46px] lg:gap-[40px]">
            <span className="lg:text-[22px]">12 - 13, September</span>
            <span className="text-[22px] font-black leading-none text-haas-red opacity-50 lg:text-[32px] lg:leading-[40px]">
              //
            </span>
            <span className="lg:text-[22px]">Plaksha University, Mohali</span>
          </div>

          {/* 5o teams / 3 problems / 24 hours */}
          <div className="relative mt-[36px] flex w-full max-w-[708px] items-start justify-between gap-2 lg:mt-[93px] lg:gap-0">
            {/* Mobile flanking blades (233:150, `Group 106`) — desktop's pair
                lives further down, off-canvas at the full 1440 width; mobile
                needs its own smaller instances bleeding off this row. */}
            <SpeedStreak
              viewBox={VB_BLADE_345}
              d={P_BLADE_345}
              delay={0.15}
              strokeWidth={1}
              restOpacity={0.5}
              className="left-[-90px] top-1/2 -z-10 h-[24px] w-[210px] -translate-y-1/2 lg:hidden"
            />
            <SpeedStreak
              viewBox={VB_BLADE_345}
              d={P_BLADE_345}
              delay={0.25}
              strokeWidth={1}
              restOpacity={0.5}
              className="right-[-90px] top-1/2 -z-10 h-[24px] w-[210px] -translate-y-1/2 scale-x-[-1] lg:hidden"
            />
            {STATS.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col items-center">
                <span className="text-[clamp(30px,7vw,58px)] font-black uppercase leading-none text-haas-red lg:text-[58.34px]">
                  {s.value}
                </span>
                <span className="mt-[5px] text-[clamp(13px,4.2vw,24px)] font-extrabold uppercase text-white lg:text-[35px] lg:leading-[44px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* `Rectangle 24` (114:115 / 233:154) — the open red bracket that
              frames both CTA buttons: up the left, across, down the right.
              Previously only described in a comment further down and never
              actually rendered. Its flat span sits at the TOP of its own
              path (114:115's y=763 lands mid-"Apply now", not centred on the
              whole cluster), so it's pinned to the Apply button's vertical
              centre (half its 77px height) rather than centred on the
              wrapper — centring the bounding box put the visible line at
              the very top instead of crossing through the button. */}
          <div className="relative mt-[40px] flex flex-col items-center lg:mt-[121px]">
            <SpeedStreak
              viewBox={VB_HERO_BRACKET}
              d={P_HERO_BRACKET}
              delay={0.2}
              strokeWidth={1.4}
              restOpacity={0.8}
              className="left-1/2 top-[38px] -z-10 h-[70px] w-[380px] -translate-x-1/2 sm:w-[460px] lg:h-[151px] lg:w-[1568px]"
            />
            <a
              href="#apply"
              className="relative flex h-[77px] w-[299px] items-center justify-center overflow-hidden bg-haas-red text-[36px] font-extrabold uppercase text-white transition-transform hover:scale-[1.02]"
            >
              <span
                className="ts-bar-shine absolute inset-y-0 left-0 w-1/3 bg-white/25"
                style={{ filter: "blur(10px)" }}
              />
              <span className="relative">Apply now</span>
            </a>

            {/* `Frame 24` (114:105) — 282×54, 3.57px red outline. */}
            <a
              href="#tracks"
              className="mt-[22px] flex h-[46px] w-[248px] items-center justify-center border-[3px] border-haas-red text-[16px] font-extrabold uppercase text-white transition-colors hover:text-haas-red lg:h-[54px] lg:w-[282px] lg:border-[3.57px] lg:text-[20px]"
              style={{ textShadow: "0 0 25px rgba(0,0,0,1)" }}
            >
              See the problems
            </a>
          </div>

          <p className="mt-[30px] text-[16px] font-normal text-white lg:mt-[55px] lg:text-[20px]">
            Applications close{" "}
            <span className="font-bold uppercase">22 August, 2O26</span>
          </p>
        </div>

        {/* Red speed lines — the two hero blades flanking the stats row
            (`Frame 25`, 114:118). The CTA's own bracket lives with the CTA
            above. Painted behind the copy. */}
        <SpeedStreak
          viewBox={VB_BLADE_824}
          d={P_BLADE_824}
          delay={0.15}
          strokeWidth={1}
          restOpacity={0.5}
          className="left-[-580px] top-[652px] -z-10 hidden h-[93px] w-[824px] lg:block"
        />
        <SpeedStreak
          viewBox={VB_BLADE_824}
          d={P_BLADE_824}
          delay={0.25}
          strokeWidth={1}
          restOpacity={0.5}
          className="right-[-579px] top-[652px] -z-10 hidden h-[93px] w-[824px] lg:block"
        />
      </div>
    </section>
  );
}

export default Hero;
