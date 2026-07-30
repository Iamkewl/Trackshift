import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { HeroGlow, Vignette } from "../components/Glow";
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
      className={`relative min-h-[1066px] overflow-hidden ${live ? "ts-live" : ""}`}
    >
      {/* Ambient lighting — Figma `Group 58`, rebuilt in CSS. See components/Glow.jsx */}
      <HeroGlow className="inset-x-0 top-0 h-[1066px]" />
      <Vignette strength={0.9} />

      <nav className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 pt-[100px] lg:px-[156px]">
        <div className="flex gap-[60px] lg:gap-[140px]">
          {NAV.slice(0, 2).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red"
            >
              {n.label}
            </a>
          ))}
        </div>
        <img
          src={A.logo}
          alt="TrackShift 2026"
          width={171}
          height={180}
          className="absolute left-1/2 top-[84px] h-[180px] w-[171px] -translate-x-1/2 object-cover"
        />
        <div className="flex gap-[60px] lg:gap-[100px]">
          {NAV.slice(2).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red"
            >
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative mx-auto flex w-full max-w-[1055px] flex-col items-center gap-[36px] px-6 pt-[190px] text-center">
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

      {/* Bottom streak stack — `Frame 24` + two copies of `Rectangle 23` */}
      <SpeedStreak
        viewBox={VB_BLADE}
        d={P_BLADE}
        delay={0.15}
        className="left-[-501px] top-[770px] h-[93px] w-[824px]"
      />
      <SpeedStreak
        viewBox={VB_BLADE}
        d={P_BLADE_R}
        delay={0.15}
        className="right-[-501px] top-[770px] h-[93px] w-[824px]"
      />
      <SpeedStreak
        viewBox={VB_CHEVRON}
        d={P_CHEVRON}
        delay={0.5}
        className="left-1/2 top-[926px] h-[150px] w-[1567px] -translate-x-1/2"
      />
      <SpeedStreak
        viewBox={VB_CHEVRON}
        d={P_CHEVRON}
        delay={0.62}
        restOpacity={0.3}
        strokeWidth={1.1}
        className="left-1/2 top-[944px] h-[150px] w-[1567px] -translate-x-1/2"
      />
    </section>
  );
}

export default Hero;
