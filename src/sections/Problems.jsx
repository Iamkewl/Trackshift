import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { ProblemsGlow } from "../components/Glow";
import useInView from "../components/useInView";
import { P_BLADE_713, VB_BLADE_713 } from "../components/paths";

/**
 * `about` (114:175) — the "Three problems" section, 1440×1098, page y 2197.
 *
 * A solid black band (`Rectangle 2`, page 1983–2438, started here at the
 * section top so it joins About's band) carries the two headline lines; the
 * 713×67 blade crosses behind them. Below that, three 360px problem cards on
 * the red-rails plate (`image 4`). Each card = photo top (`card-N.webp`, the
 * scrimmed `Group 100` render), red Orbitron title, Helvetica lede, Headland
 * One problem block, and a "Read the problem" link.
 */

const CARDS = [
  {
    img: A.card1,
    dims: DIMS.card1,
    title: ["The Power", "Play"],
    lede: "Spend now or save for the move that matters three laps later.",
    problem:
      "Problem: Manage 350 kW across 50+ laps of safety cars, tyre stops, and shifting race order." +
      "\n\n" +
      "Also solves: EV fleets · grid-scale battery storage · GPU training clusters · satellite operations",
  },
  {
    img: A.card2,
    dims: DIMS.card2,
    title: ["The Split-Second", "Call"],
    lede: "Go now. Or wait. Half a second to decide.",
    problem:
      "Problem: Predict the overtake window before the driver has time to think." +
      "\n\n" +
      "Also solves: Autonomous vehicles · algo trading · air traffic sequencing · stroke intervention",
  },
  {
    img: A.card3,
    dims: DIMS.card3,
    title: ["From Le Mans", "to sprint"],
    lede: "18 years of endurance data. 55 laps of sprint racing. What transfers?",
    problem:
      "Problem: Transfer learning across two racing formats with honest confidence intervals." +
      "\n\n" +
      "Also solves: Medical AI across populations · manufacturing QA · climate model downscaling · fraud detection",
  },
];

export function Problems() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="tracks"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1098px]">
        {/* `image 4` — red-rails plate behind the cards (page y2158). */}
        <ProblemsGlow className="hidden lg:block" />

        {/* `Rectangle 2` — black band; started at the section top so it meets
            About's band and reads as one uninterrupted strip. */}
        <div className="pointer-events-none absolute left-[-43px] top-0 -z-10 h-[241px] w-[1706px] bg-black" />

        <SpeedStreak
          viewBox={VB_BLADE_713}
          d={P_BLADE_713}
          delay={0.15}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[340px] top-[83px] -z-10 hidden h-[67px] w-[713px] lg:block"
        />

        <h2 className="relative z-10 px-6 pt-10 text-right text-[clamp(26px,5vw,48px)] font-black leading-none text-white lg:absolute lg:left-[218px] lg:top-[63px] lg:px-0 lg:pt-0 lg:text-[48px]">
          Three problems.
        </h2>
        <h3 className="relative z-10 mt-2 max-w-[913px] px-6 text-[clamp(26px,5vw,48px)] font-black leading-none text-white lg:absolute lg:left-[431px] lg:top-[122px] lg:mt-0 lg:px-0 lg:text-[48px]">
          Straight off the 2o26 grid.
        </h3>
        <p className="relative z-10 mt-3 max-w-[839px] px-6 text-[clamp(18px,3vw,28px)] font-bold text-white lg:absolute lg:left-[301px] lg:top-[224px] lg:mt-0 lg:px-0 lg:text-[28px]">
          Every problem, more than one right answer.
        </p>

        <div className="relative z-10 flex flex-col items-center gap-10 px-6 pb-16 pt-10 lg:absolute lg:inset-x-0 lg:top-[313px] lg:flex-row lg:items-start lg:justify-center lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          {CARDS.map((c, i) => (
            <article
              key={c.title[0]}
              className="flex w-full max-w-[400px] flex-col bg-[#0e0e0e] lg:mx-[0] lg:max-w-[360px]"
              style={i > 0 ? { marginLeft: 24 } : undefined}
            >
              <img
                src={c.img}
                alt=""
                width={c.dims.w}
                height={c.dims.h}
                loading="lazy"
                decoding="async"
                className="h-[252px] w-full object-cover"
              />
              <div className="flex flex-1 flex-col px-[6px]">
                <h4 className="mt-[26px] text-[32px] font-black leading-[1.2] text-haas-red">
                  {c.title.map((t, k) => (
                    <span key={k}>
                      {t}
                      {k < c.title.length - 1 && <br />}
                    </span>
                  ))}
                </h4>
                <p className="font-helvetica mt-[24px] text-[20px] font-bold leading-[1.2] text-white">
                  {c.lede}
                </p>
                <p className="font-headland mt-[18px] whitespace-pre-line text-[16px] leading-[1.3] text-white">
                  {c.problem}
                </p>
                <a
                  href="#apply"
                  className="mt-auto pt-[34px] text-[16px] font-extrabold text-white transition-colors hover:text-haas-red"
                >
                  Read the problem →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Problems;
