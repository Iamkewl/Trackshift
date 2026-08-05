import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import useInView from "../components/useInView";
import { P_BLADE_1171, VB_BLADE_1171 } from "../components/paths";

/**
 * `about` (114:165) — 1440×1012, page y 1174.
 *
 * The section is a dark plate composition: the `image 33` wash bleeds off the
 * top, the car (`about car 1`) bleeds off the top-right, and a solid black band
 * (`Rectangle 23`) anchors the bottom where all the copy sits. The long
 * 1171×97 blade (114:169) crosses the section heading 27px below its top line.
 */

const P1 =
  "Motorsport is one of the few places on earth where engineering gets pushed to its true limits. A millisecond, a milliwatt, a misread of the data that's the gap between first and tenth on the podium.";

const P2 =
  "Over 24 hours in September, 150+ student engineers take on three real problems from 2026 season. Ones that working engineers inside the paddock are wrestling with right now.";

const TAG = "Its lights’ out and away we go!";

export function About() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="about"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1023px]">
        {/* Mobile backdrop — one cover crop of the wash plate. */}
        <img
          src={A.aboutBg}
          alt=""
          width={DIMS.aboutBg.w}
          height={DIMS.aboutBg.h}
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60 lg:hidden"
        />

        {/*
          Paint order matters and is easy to get backwards: in the Figma
          `car 1 1` (114:166) is BELOW `image 33` (114:167) — the trackside
          panning shot is an underlay, and the Mphasis-liveried hero car in
          `image 33` is what you actually see. Swapping these two shows the
          wrong car.
        */}
        {/* `about car 1` — page x-24 y853, 1489×1106. */}
        <div className="pointer-events-none absolute left-[-24px] top-[-321px] -z-10 hidden h-[1106px] w-[1489px] overflow-hidden lg:block">
          <img
            src={A.aboutCar}
            alt=""
            width={DIMS.aboutCar.w}
            height={DIMS.aboutCar.h}
            decoding="async"
            className="h-full w-full max-w-none"
          />
        </div>
        {/* `image 33` — page x-125 y620, 2573×1636, on black. */}
        <div className="pointer-events-none absolute left-[-125px] top-[-554px] -z-10 hidden h-[1636px] w-[2573px] overflow-hidden bg-black lg:block">
          <img
            src={A.aboutBg}
            alt=""
            width={DIMS.aboutBg.w}
            height={DIMS.aboutBg.h}
            decoding="async"
            className="h-full w-full max-w-none"
          />
        </div>
        {/* `Rectangle 23` (114:168) — the black anchor band under the copy. It
            carries a 200px layer blur in Figma; without it the band cuts the
            car off on a hard horizontal line instead of fading it out. */}
        <div
          className="pointer-events-none absolute left-[-43px] top-[536px] -z-10 hidden h-[455px] w-[1706px] bg-black lg:block"
          style={{ filter: "blur(200px)" }}
        />

        <SpeedStreak
          viewBox={VB_BLADE_1171}
          d={P_BLADE_1171}
          delay={0.1}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-518px] top-[90px] -z-10 hidden h-[97px] w-[1171px] lg:block"
        />

        <h2 className="relative z-10 px-6 pt-10 text-[32px] font-black uppercase leading-[0.95] text-white lg:absolute lg:left-[156px] lg:top-[63px] lg:w-[378px] lg:px-0 lg:pt-0 lg:text-[48px] lg:leading-[48px]">
          About trackshift
        </h2>

        <div className="relative z-10 flex flex-col gap-5 px-6 pb-14 pt-6 lg:absolute lg:inset-x-0 lg:top-0 lg:gap-0 lg:px-0 lg:py-0">
          <h3 className="max-w-[541px] text-[24px] font-extrabold uppercase leading-[1.25] text-white lg:absolute lg:left-[156px] lg:top-[636px] lg:text-[32px]">
            {/* Both full stops are red in the design (114:171). */}
            Built for the grid<span className="text-haas-red">.</span>{" "}
            Written into the future<span className="text-haas-red">.</span>
          </h3>

          <p className="max-w-[541px] text-[14px] font-medium leading-[1.5] text-white lg:absolute lg:left-[829px] lg:top-[636px] lg:max-w-[360px] lg:text-[16px] lg:leading-[1.375]">
            {P1}
          </p>
          <p className="max-w-[541px] text-[14px] font-medium leading-[1.5] text-white lg:absolute lg:left-[829px] lg:top-[805px] lg:max-w-[360px] lg:text-[16px] lg:leading-[1.375]">
            {P2}
          </p>

          <p className="max-w-[444px] text-[20px] font-bold uppercase leading-[1.3] text-haas-red lg:absolute lg:left-[266px] lg:top-[838px] lg:w-[444px] lg:max-w-[444px] lg:text-right lg:text-[32px] lg:leading-[1.25]">
            {TAG}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
