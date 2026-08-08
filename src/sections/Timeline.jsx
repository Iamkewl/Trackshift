import React from "react";
import SpeedStreak from "../components/SpeedStreak";
import { CheckerGlow, SoftMask } from "../components/Glow";
import useInView from "../components/useInView";
import {
  P_TL_DASH,
  VB_TL_DASH,
  P_HERO_BRACKET,
  VB_HERO_BRACKET,
  P_HERO_BRACKET_M,
  VB_HERO_BRACKET_M,
} from "../components/paths";

/**
 * `Timeline` (114:250) — 1440×471, page y 4544. A two-column day schedule
 * divided by a 1px red rule (114:253) with a 33×5 dash at each end. Day 1
 * copy is right-aligned, Day 2 left-aligned, both Orbitron 500/16. The day
 * headers keep the design's zero-as-letter-O "o1"/"o2" spelling.
 */

const DAY1 = [
  "Registration & orientation",
  "Opening ceremony & keynote",
  "Panel discussion",
  "Problem-statement deep dive",
  "Kickoff",
  "Mentorship Round 1",
];

const DAY2 = [
  "Mentorship Round 2",
  "Final submissions",
  "Jury evaluations",
  "Top 8–1O pitches",
  "Awards ceremony",
];

export function Timeline() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="timeline"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[482px]">
        {/* The checker sweep continues past the Prizes clip. */}
        <CheckerGlow className="hidden lg:block" f={127.98} />
        {/* `Rectangle 3` (114:96) — the tail of the Prizes fog, which runs on
            past that section's clip into this one. */}
        <SoftMask
          className="-z-10 hidden lg:block"
          style={{ left: -70, top: -585, width: 1579, height: 763 }}
        />

        {/* `Rectangle 24` (114:251 desktop / 237:303 mobile) — same open
            bracket as Prizes/Partners/Lookback/the Hero CTA. */}
        <SpeedStreak
          viewBox={VB_HERO_BRACKET_M}
          d={P_HERO_BRACKET_M}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-[-29px] top-[83px] -z-10 h-[45px] w-[449px] lg:hidden"
        />
        <SpeedStreak
          viewBox={VB_HERO_BRACKET}
          d={P_HERO_BRACKET}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-1/2 top-[89px] -z-10 hidden h-[150px] w-[1567px] -translate-x-1/2 lg:block"
        />

        <h2 className="relative z-10 px-6 pt-10 text-center text-[clamp(26px,5vw,48px)] font-black uppercase text-white lg:absolute lg:inset-x-0 lg:top-[63px] lg:px-0 lg:pt-0 lg:text-[48px]">
          How the weekend runs
        </h2>

        {/* Vertical red rule with dash caps — the timeline spine. */}
        <SpeedStreak
          viewBox={VB_TL_DASH}
          d={P_TL_DASH}
          delay={0.1}
          strokeWidth={1}
          restOpacity={0.6}
          className="left-1/2 top-[206px] -z-10 hidden h-[5px] w-[33px] -translate-x-1/2 lg:block"
        />
        <span
          className="absolute left-1/2 top-[208px] -z-10 hidden h-[156px] w-px -translate-x-1/2 bg-haas-red lg:block"
          style={{ opacity: 0.7 }}
        />
        <SpeedStreak
          viewBox={VB_TL_DASH}
          d={P_TL_DASH}
          delay={0.2}
          strokeWidth={1}
          restOpacity={0.6}
          className="left-1/2 top-[359px] -z-10 hidden h-[5px] w-[33px] -translate-x-1/2 lg:block"
        />

        {/* Mobile: stacked day cards aligned cleanly to the left */}
        <div className="relative z-10 flex flex-col gap-10 px-6 pb-16 pt-8 lg:hidden max-w-lg mx-auto">
          <DayBlock num="o1" date="September 12" items={DAY1} />
          <DayBlock num="o2" date="September 13" items={DAY2} />
        </div>

        {/* Desktop: the two columns at the design's exact coordinates. */}
        <div className="hidden lg:absolute lg:left-[179px] lg:top-[188px] lg:flex lg:max-w-[509px] lg:flex-col lg:items-end lg:text-right">
          <p className="text-[32px] font-black uppercase leading-[40px] text-haas-red">
            <span className="opacity-50">Day</span> o1{" "}
            <span className="opacity-50">//</span>{" "}
            <span className="text-white">September 12</span>
          </p>
          <p className="mt-[10px] max-w-[509px] text-[16px] font-medium leading-[1.375] text-white">
            {DAY1.join(" · ")}
          </p>
        </div>
        <div className="hidden lg:absolute lg:left-[768px] lg:top-[341px] lg:flex lg:max-w-[509px] lg:flex-col lg:items-start lg:text-left">
          <p className="text-[32px] font-black uppercase leading-[40px] text-haas-red">
            <span className="opacity-50">Day</span> o2{" "}
            <span className="opacity-50">//</span>{" "}
            <span className="text-white">September 13</span>
          </p>
          <p className="mt-[10px] max-w-[509px] text-[16px] font-medium leading-[1.375] text-white">
            {DAY2.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

function DayBlock({ num, date, items }) {
  return (
    <div className="flex flex-col items-start text-left border-l-2 border-haas-red/80 pl-4 py-1">
      <p className="text-[24px] font-black uppercase leading-none text-haas-red">
        <span className="opacity-50">Day</span> {num}{" "}
        <span className="opacity-50">//</span>{" "}
        <span className="text-white">{date}</span>
      </p>
      <ul className="mt-4 flex flex-col gap-[8px] text-[14px] font-medium leading-[1.35] text-white items-start">
        {items.map((d) => (
          <li key={d} className="relative flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-haas-red shrink-0" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Timeline;
