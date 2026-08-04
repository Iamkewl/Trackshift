import SpeedStreak from "../components/SpeedStreak";
import RectFrame from "../components/RectFrame";
import useInView from "../components/useInView";
import { P_TL_DASH, VB_TL_DASH } from "../components/paths";

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
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[471px]">
        <RectFrame
          strokeWidth={2}
          className="left-[-62px] top-[89px] -z-10 hidden h-[150px] w-[1567px] lg:block"
        />

        <h2 className="relative z-10 px-6 pt-10 text-center text-[clamp(26px,5vw,48px)] font-black text-white lg:absolute lg:inset-x-0 lg:top-[63px] lg:px-0 lg:pt-0 lg:text-[48px]">
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

        {/* Mobile: stacked day cards. */}
        <div className="relative z-10 flex flex-col gap-10 px-6 pb-16 pt-8 lg:hidden">
          <DayBlock num="o1" date="September 12" align="end" items={DAY1} />
          <DayBlock num="o2" date="September 13" align="start" items={DAY2} />
        </div>

        {/* Desktop: the two columns at the design's coordinates. */}
        <div className="hidden lg:absolute lg:left-[179px] lg:top-[178px] lg:flex lg:max-w-[509px] lg:flex-col lg:items-end lg:text-right">
          <p className="text-[32px] font-black leading-none text-haas-red">
            Day o1 <span>//</span> <span className="text-white">September 12</span>
          </p>
          <p className="mt-[28px] max-w-[509px] text-[16px] font-medium leading-[1.375] text-white">
            {DAY1.join(" · ")}
          </p>
        </div>
        <div className="hidden lg:absolute lg:left-[768px] lg:top-[331px] lg:flex lg:max-w-[509px] lg:flex-col lg:items-start lg:text-left">
          <p className="text-[32px] font-black leading-none text-haas-red">
            Day o2 <span>//</span> <span className="text-white">September 13</span>
          </p>
          <p className="mt-[28px] max-w-[509px] text-[16px] font-medium leading-[1.375] text-white">
            {DAY2.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}

function DayBlock({ num, date, align, items }) {
  return (
    <div className={`flex flex-col ${align === "end" ? "items-end text-right" : "items-start text-left"}`}>
      <p className="text-[26px] font-black leading-none text-haas-red">
        Day {num} <span>//</span> <span className="text-white">{date}</span>
      </p>
      <ul
        className={`mt-5 flex flex-col gap-[10px] text-[14px] font-medium leading-[1.35] text-white ${
          align === "end" ? "items-end" : "items-start"
        }`}
      >
        {items.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
}

export default Timeline;
