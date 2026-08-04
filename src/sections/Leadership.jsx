import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import Caret from "../components/Caret";
import useInView from "../components/useInView";
import { P_BLADE_791, VB_BLADE_791 } from "../components/paths";

/**
 * `leadership` (114:355) — 1440×737, page y 5857. Section-heading blade + the
 * leadership photo card on the left, a pull-quote and byline to its right,
 * and the two carousel carets at the far edges. The giant `"` glyphs (114:358,
 * 114:359) carry no fill in Figma, so they render as nothing here too.
 *
 * Note the byline is still the design's placeholder copy ("First last",
 * "Designation, Mphasis").
 */

const QUOTE =
  "Inspired by the design, testing, and development before race day, The Garage challenges participants to build innovative solutions from the ground up through experimentation, precision, and continuous improvement. Problem statements coming soon.";

export function Leadership() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="leadership"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[737px]">
        <SpeedStreak
          viewBox={VB_BLADE_791}
          d={P_BLADE_791}
          delay={0.12}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-125px] top-[99px] -z-10 hidden h-[55px] w-[791px] lg:block"
        />
        <h2 className="relative z-10 px-6 pt-10 text-[clamp(30px,6vw,60px)] font-black leading-none text-white lg:absolute lg:left-[158px] lg:top-[69px] lg:px-0 lg:pt-0 lg:text-[60px]">
          leadership
        </h2>

        <div className="relative z-10 flex flex-col gap-8 px-6 pb-16 pt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:flex-row lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          <img
            src={A.leadershipCard}
            alt="TrackShift leadership"
            width={DIMS.leadershipCard.w}
            height={DIMS.leadershipCard.h}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[440px] self-center object-cover lg:absolute lg:left-[232px] lg:top-[224px] lg:w-[454px] lg:max-w-none lg:self-auto"
          />

          <div className="flex flex-col lg:absolute lg:left-[730px] lg:top-[274px] lg:max-w-[488px]">
            <p className="text-[16px] font-medium leading-[1.4] text-white lg:leading-[1.25]">
              {QUOTE}
            </p>
            <p className="mt-8 text-[30px] font-extrabold leading-none text-white lg:mt-[52px]">
              First last
            </p>
            <p className="mt-2 text-[16px] font-medium text-white/80 lg:mt-[8px]">
              Designation, Mphasis
            </p>
          </div>
        </div>

        <Caret dir="left" className="absolute left-[155px] top-[390px] hidden h-[32px] w-[32px] lg:block" />
        <Caret dir="right" className="absolute right-[155px] top-[390px] hidden h-[32px] w-[32px] lg:block" />
      </div>
    </section>
  );
}

export default Leadership;
