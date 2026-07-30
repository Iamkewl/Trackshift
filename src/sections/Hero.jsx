import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { HeroGlow } from "../components/Glow";
import useInView from "../components/useInView";
import {
  P_BLADE,
  P_BLADE_R,
  VB_BLADE,
  P_CHEVRON,
  VB_CHEVRON,
} from "../components/paths";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Partners", href: "#partners" },
  { label: "Prize", href: "#prizes" },
  { label: "Tracks", href: "#tracks" },
];

export function Hero() {
  const [ref, live] = useInView(0);

  return (
    <section
      ref={ref}
      // pb below lg: the streak stack owns the bottom ~200px of the hero, and at
      // 1440 the copy stops well clear of it. On a phone the copy runs to the
      // hero's exact bottom edge, so the blades and chevrons crossed the date,
      // the venue and the button. This reserves the band they live in.
      className={`relative min-h-[740px] overflow-hidden pb-[196px] sm:min-h-[880px] lg:min-h-[1066px] lg:pb-0 ${live ? "ts-live" : ""}`}
    >
      {/* Ambient lighting — Figma `Group 58`. See components/Glow.jsx.
          No extra vignette on top: `Rectangle 1` inside the rig is the only
          darkening the design applies, and stacking another one over it was
          crushing the plate's edge light to roughly a third of its brightness. */}
      {/* inset-0, not a fixed 1066: the rig is sized in percentages, so letting
          it take the hero's real height keeps the composition intact when the
          hero gets shorter on small screens. */}
      <HeroGlow className="inset-0" />

      {/* Below lg the logo cannot sit centred between the links — it lands on
          top of them. Stack instead: logo, then the links in two rows. */}
      <nav className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-[20px] px-6 pt-[36px] lg:flex-row lg:items-center lg:justify-between lg:pt-[100px] lg:px-[156px]">
        <img
          src={A.logo}
          alt="TrackShift 2026"
          width={171}
          height={180}
          className="h-[124px] w-[118px] object-cover lg:absolute lg:left-1/2 lg:top-[84px] lg:h-[180px] lg:w-[171px] lg:-translate-x-1/2"
        />
        <div className="flex gap-[38px] lg:gap-[140px]">
          {NAV.slice(0, 2).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[16px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:text-[20px]"
            >
              {n.label}
            </a>
          ))}
        </div>
        <div className="flex gap-[38px] lg:gap-[100px]">
          {NAV.slice(2).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[16px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:text-[20px]"
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative mx-auto flex w-full max-w-[1055px] flex-col items-center gap-[26px] px-6 pt-[58px] text-center sm:pt-[110px] lg:gap-[36px] lg:pt-[190px]">
        <div className="flex flex-col items-center gap-[26px]">
          <h1 className="text-[40px] font-black uppercase leading-[0.907] text-white sm:text-[56px] lg:text-[72px]">
            Engineering doesn<span className="text-haas-red">’</span>t stop where
            it was invented.
          </h1>
          <p className="max-w-[788px] text-[16px] font-normal text-white lg:text-[20px]">
            <span className="font-black uppercase text-haas-red">
              TrackShift 2026
            </span>{" "}
            brings together ambitious student innovators for a high-intensity
            innovation challenge where motorsport thinking meets real-world
            problem solving.
          </p>
        </div>

        {/* 30 June – 13 Sep */}
        <div className="flex items-start gap-[18px] text-white">
          <div className="flex flex-col items-center">
            <span className="text-[36px] font-extrabold leading-none">30</span>
            <span className="mt-[6px] text-[20px] uppercase">June</span>
          </div>
          <span className="mt-[14px] text-[20px]">–</span>
          <div className="flex flex-col items-center">
            <span className="text-[36px] font-extrabold leading-none">13</span>
            <span className="mt-[6px] text-[20px] uppercase">Sep</span>
          </div>
        </div>

        <p className="w-[330px] text-[20px] uppercase text-white">
          <span className="font-semibold">Plaksha University, </span>Mohali
        </p>

        <a
          href="#register"
          className="group relative inline-flex items-center justify-center overflow-hidden bg-haas-red px-[24px] py-[16px] text-[24px] font-extrabold uppercase text-white transition-transform hover:scale-[1.02] lg:text-[36px]"
        >
          <span
            className="ts-bar-shine absolute inset-y-0 left-0 w-1/3 bg-white/25"
            style={{ filter: "blur(10px)" }}
          />
          <span className="relative">Register now</span>
        </a>
      </div>

      {/* Bottom streak stack — `Frame 24` + two copies of `Rectangle 23`.
          Anchored to the hero's bottom edge rather than to y=770/926/944, so
          they stay put once the hero shortens on small screens. The offsets are
          the design's, measured up from 1066.

          `-z-10` because these are rendered after the copy and would otherwise
          paint straight over it. At 1440 the copy stops well above them so the
          design never reveals an answer; on a phone the hero is shorter and the
          copy taller, and the chevrons ran clean through "PLAKSHA UNIVERSITY"
          and the date. They are ambient speed lines — text wins. This puts them
          alongside HeroGlow, still above it since they come later in the DOM. */}
      <SpeedStreak
        viewBox={VB_BLADE}
        d={P_BLADE}
        delay={0.15}
        className="bottom-[146px] left-[-501px] -z-10 h-[44px] w-[824px] lg:bottom-[203px] lg:h-[93px]"
      />
      <SpeedStreak
        viewBox={VB_BLADE}
        d={P_BLADE_R}
        delay={0.15}
        className="bottom-[146px] right-[-501px] -z-10 h-[44px] w-[824px] lg:bottom-[203px] lg:h-[93px]"
      />
      <SpeedStreak
        viewBox={VB_CHEVRON}
        d={P_CHEVRON}
        delay={0.5}
        className="bottom-[-10px] left-1/2 -z-10 h-[150px] w-[1567px] -translate-x-1/2"
      />
      <SpeedStreak
        viewBox={VB_CHEVRON}
        d={P_CHEVRON}
        delay={0.62}
        restOpacity={0.3}
        strokeWidth={1.1}
        className="bottom-[-28px] left-1/2 -z-10 h-[150px] w-[1567px] -translate-x-1/2"
      />
    </section>
  );
}

export default Hero;
