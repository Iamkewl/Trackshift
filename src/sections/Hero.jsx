import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { HeroGlow } from "../components/Glow";
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
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1174px]">
        {/* Ambient lighting — `image 5/6` + Rectangle 1. See Glow.jsx */}
        <HeroGlow className="inset-0" />

        {/* Nav — logo centred, links flanking, positioned at the design's
            coordinates (they sit outside the 156px gutter at 1440). */}
        <nav className="relative z-10 flex flex-col items-center gap-[18px] px-6 pt-[28px] lg:absolute lg:inset-x-0 lg:top-0 lg:gap-0 lg:px-0 lg:pt-0">
          <a
            href="#partners"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[139px] lg:top-[115px] lg:block"
          >
            partners
          </a>
          <a
            href="#tracks"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[387px] lg:top-[115px] lg:block"
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
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[941px] lg:top-[115px] lg:block"
          >
            prize
          </a>
          <a
            href="#apply"
            className="hidden text-[20px] font-bold uppercase text-white transition-colors hover:text-haas-red lg:absolute lg:left-[1094px] lg:top-[115px] lg:block"
          >
            trackshift ‘25
          </a>
          {/* Mobile nav — a 2×2 grid, not a row. Four uppercase labels in one
              line do not fit a phone ("TRACKSHIFT '25" alone is half the
              width), so they collided and wrapped mid-word. Each cell is its
              own tap target with a divider, which also gets them well clear of
              the 44px minimum. */}
          <ul className="grid w-full max-w-[380px] grid-cols-2 gap-px overflow-hidden bg-white/15 text-[13px] font-bold uppercase text-white lg:hidden">
            {NAV.map((n) => (
              <li key={n.label} className="bg-black">
                <a
                  href={n.href}
                  className="flex min-h-[44px] items-center justify-center px-2 text-center leading-tight transition-colors hover:text-haas-red"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copy block — centred stack, absolute at the design's y at lg.
            `Build. compete. innovate.` (114:102) is hidden in the Figma, so the
            headline is the first line and the stack starts at page y320. */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1055px] flex-col items-center px-6 pt-[180px] text-center lg:absolute lg:inset-x-0 lg:top-[320px] lg:mx-auto lg:px-0 lg:pt-0">
          <h1 className="max-w-[937px] text-[clamp(28px,5.6vw,58px)] font-black uppercase leading-[0.92] text-white lg:text-[58.5px] lg:leading-[53px]">
            Where engineering gets pushed to its limits.
          </h1>
          {/* 114:104 — 500×23, a single line in the design. */}
          <p className="font-helvetica mt-[26px] max-w-[500px] text-[16px] text-white lg:mt-[16px] lg:max-w-none lg:whitespace-nowrap lg:text-[20px] lg:leading-[23px]">
            You don&rsquo;t need to follow the sport to solve the challenge.
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
          <div className="mt-[36px] flex w-full max-w-[708px] items-start justify-between gap-2 lg:mt-[93px] lg:gap-0">
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

          <a
            href="#apply"
            className="relative mt-[40px] flex h-[77px] w-[299px] items-center justify-center overflow-hidden bg-haas-red text-[36px] font-extrabold uppercase text-white transition-transform hover:scale-[1.02] lg:mt-[121px]"
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
            className="mt-[22px] flex h-[46px] w-[248px] items-center justify-center border-[3px] border-haas-red text-[16px] font-extrabold uppercase text-white transition-colors hover:text-haas-red lg:mt-[22px] lg:h-[54px] lg:w-[282px] lg:border-[3.57px] lg:text-[20px]"
            style={{ textShadow: "0 0 25px rgba(0,0,0,1)" }}
          >
            See the problems
          </a>

          <p className="mt-[30px] text-[16px] font-normal text-white lg:mt-[55px] lg:text-[20px]">
            Applications close{" "}
            <span className="font-bold uppercase">22 August, 2O26</span>
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
      </div>
    </section>
  );
}

export default Hero;
