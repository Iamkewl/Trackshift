import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { HeroGlow } from "../components/Glow";
import RectFrame from "../components/RectFrame";
import useInView from "../components/useInView";
import { P_BLADE_824, VB_BLADE_824 } from "../components/paths";

const NAV = [
  { label: "partners", href: "#partners" },
  { label: "tracks", href: "#tracks" },
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

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1163px]">
        {/* Ambient lighting — `image 5/6` + Rectangle 1. See Glow.jsx */}
        <HeroGlow className="inset-0" />

        {/* Nav — logo centred, links flanking, positioned at the design's
            coordinates (they sit outside the 156px gutter at 1440). */}
        <nav className="relative z-10 flex flex-col items-center gap-[18px] px-6 pt-[28px] lg:absolute lg:inset-x-0 lg:top-0 lg:gap-0 lg:px-0 lg:pt-0">
          <a
            href="#partners"
            className="hidden text-[20px] font-bold text-white transition-colors hover:text-haas-red lg:absolute lg:left-[139px] lg:top-[115px] lg:block"
          >
            partners
          </a>
          <a
            href="#tracks"
            className="hidden text-[20px] font-bold text-white transition-colors hover:text-haas-red lg:absolute lg:left-[387px] lg:top-[115px] lg:block"
          >
            tracks
          </a>
          <img
            src={A.logo}
            alt="TrackShift 2026"
            width={342}
            height={274}
            className="h-[110px] w-[137px] object-cover lg:absolute lg:left-1/2 lg:top-[84px] lg:h-[137px] lg:w-[171px] lg:-translate-x-1/2"
          />
          <a
            href="#prizes"
            className="hidden text-[20px] font-bold text-white transition-colors hover:text-haas-red lg:absolute lg:left-[941px] lg:top-[115px] lg:block"
          >
            prize
          </a>
          <a
            href="#apply"
            className="hidden text-[20px] font-bold text-white transition-colors hover:text-haas-red lg:absolute lg:left-[1094px] lg:top-[115px] lg:block"
          >
            trackshift ‘25
          </a>
          {/* Mobile nav row */}
          <div className="flex w-full max-w-[380px] items-center justify-between text-[14px] font-bold text-white lg:hidden">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="hover:text-haas-red">
                {n.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Copy block — centred stack, absolute at the design's y at lg. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1055px] flex-col items-center px-6 pt-[180px] text-center lg:absolute lg:inset-x-0 lg:top-[286px] lg:mx-auto lg:px-0 lg:pt-0">
          <h1 className="text-[clamp(34px,6.5vw,60px)] font-black leading-[0.9] text-white lg:text-[60px] lg:leading-[0.9]">
            Build. compete. innovate.
          </h1>
          <h2 className="mt-[10px] max-w-[937px] text-[clamp(28px,5.6vw,58px)] font-black leading-[0.92] text-white lg:mt-[14px] lg:text-[58.5px]">
            Where engineering gets pushed to its limits.
          </h2>
          <p className="font-helvetica mt-[26px] max-w-[500px] text-[16px] text-white lg:mt-[40px] lg:text-[20px]">
            You don&rsquo;t need to follow the sport to solve the challenge.
          </p>

          <div className="mt-[30px] flex items-center gap-[18px] text-[20px] font-normal text-white lg:mt-[36px] lg:gap-[54px]">
            <span className="lg:text-[22px]">12 - 13, September</span>
            <span className="hidden h-px w-[24px] bg-white/40 lg:block" />
            <span className="lg:text-[22px]">Plaksha University, Mohali</span>
          </div>

          {/* 5o teams / 3 problems / 24 hours */}
          <div className="mt-[36px] flex w-full max-w-[708px] items-start justify-between lg:mt-[52px]">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-[clamp(38px,7vw,58px)] font-black leading-none text-haas-red lg:text-[58.34px]">
                  {s.value}
                </span>
                <span className="mt-[5px] text-[24px] font-extrabold text-white lg:text-[35px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#apply"
            className="relative mt-[40px] flex h-[77px] w-[299px] items-center justify-center overflow-hidden bg-haas-red text-[36px] font-extrabold text-white transition-transform hover:scale-[1.02] lg:mt-[54px]"
          >
            <span
              className="ts-bar-shine absolute inset-y-0 left-0 w-1/3 bg-white/25"
              style={{ filter: "blur(10px)" }}
            />
            <span className="relative">Apply now</span>
          </a>

          <a
            href="#tracks"
            className="mt-[22px] text-[20px] font-extrabold text-white transition-colors hover:text-haas-red lg:mt-[26px]"
          >
            See the problems
          </a>

          <p className="mt-[30px] text-[16px] font-normal text-white lg:mt-[32px] lg:text-[20px]">
            Applications close 22 August, 2O26
          </p>
        </div>

        {/* Red speed lines — the two hero blades flanking the stats, and the
            wide Rectangle 24 frame behind the CTA. Painted behind the copy. */}
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
        <RectFrame
          strokeWidth={1}
          className="left-[-64px] top-[910px] -z-10 hidden h-[150px] w-[1567px] lg:block"
        />
      </div>
    </section>
  );
}

export default Hero;
