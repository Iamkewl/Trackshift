import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { CheckerGlow } from "../components/Glow";
import RectFrame from "../components/RectFrame";
import useInView from "../components/useInView";
import { P_BLADE_558, VB_BLADE_558, P_BLADE_317, VB_BLADE_317, P_BLADE_568, VB_BLADE_568 } from "../components/paths";

/**
 * `prizes` (114:219) — 1440×1227, page y 3306. One centred column on the
 * checker sweep (`image 2`): the "What's on the podium" frame, the "Global
 * exposure" UK-visit card (rendered as `uk-visit-card.webp`), then the prize
 * pool, then two caption+detail rows, each caption carrying a small red blade
 * behind it. The big number keeps the Figma zero-as-letter-O spelling.
 */

const DETAILS = [
  "Innovation kits, certificates, T-shirts",
  "Entry into the TrackShift Alumni Network",
  "Direct mentorship access - TGR Haas F1 Team, Mphasis, academic and industry mentors",
  "Select teams offered 6–12 month research or internship placements in Plaksha University labs",
];

export function Prizes() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="prizes"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[1310px]">
        <CheckerGlow className="hidden lg:block" />

        <RectFrame
          strokeWidth={2}
          className="left-[-62px] top-[89px] -z-10 hidden h-[150px] w-[1567px] lg:block"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pb-16 pt-10 lg:absolute lg:inset-x-0 lg:top-0 lg:px-0 lg:pb-0 lg:pt-0">
          <h2 className="text-[clamp(26px,5vw,48px)] font-black text-white lg:absolute lg:left-1/2 lg:top-[63px] lg:-translate-x-1/2 lg:text-[48px]">
            What&rsquo;s on the podium
          </h2>

          <p className="mt-6 text-[clamp(22px,4vw,40px)] font-black text-white lg:absolute lg:left-1/2 lg:top-[155px] lg:mt-0 lg:-translate-x-1/2 lg:text-[40px]">
            Global exposure
          </p>
          <SpeedStreak
            viewBox={VB_BLADE_558}
            d={P_BLADE_558}
            delay={0.15}
            strokeWidth={2}
            restOpacity={0.5}
            className="left-1/2 top-[175px] -z-10 hidden h-[37px] w-[558px] -translate-x-1/2 lg:block"
          />

          <img
            src={A.ukVisitCard}
            alt="UK Visit for TOP 3"
            width={DIMS.ukVisitCard.w}
            height={DIMS.ukVisitCard.h}
            loading="lazy"
            decoding="async"
            className="mt-8 w-full max-w-[400px] object-contain lg:absolute lg:left-1/2 lg:top-[255px] lg:mt-0 lg:w-[587px] lg:max-w-none lg:-translate-x-1/2"
          />

          <p className="mt-12 text-[32px] font-black text-white lg:absolute lg:left-1/2 lg:top-[625px] lg:mt-0 lg:-translate-x-1/2">
            Prize pool
          </p>
          <p className="mt-2 text-[clamp(48px,10vw,94.7px)] font-extrabold leading-[0.95] text-white lg:absolute lg:left-1/2 lg:top-[666px] lg:mt-0 lg:-translate-x-1/2 lg:leading-none">
            INR 1,75,OOO
          </p>

          <div className="mt-12 flex flex-col items-center lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0">
            <p className="lg:absolute lg:left-1/2 lg:top-[849px] lg:-translate-x-1/2 lg:text-[32px] lg:font-black">
              Internships
            </p>
            <SpeedStreak
              viewBox={VB_BLADE_317}
              d={P_BLADE_317}
              delay={0.2}
              strokeWidth={2}
              restOpacity={0.5}
              className="left-1/2 top-[868px] -z-10 hidden h-[27px] w-[317px] -translate-x-1/2 lg:block"
            />
            <p className="font-helvetica mt-3 max-w-[700px] text-center text-[16px] text-white lg:absolute lg:left-1/2 lg:top-[906px] lg:mt-0 lg:-translate-x-1/2 lg:text-[20px]">
              Internships at Mphasis office on live AI and innovation projects
            </p>

            <p className="mt-10 text-[clamp(22px,4vw,32px)] font-black text-white lg:absolute lg:left-1/2 lg:top-[971px] lg:mt-0 lg:-translate-x-1/2 lg:text-[32px]">
              all participants get
            </p>
            <SpeedStreak
              viewBox={VB_BLADE_568}
              d={P_BLADE_568}
              delay={0.25}
              strokeWidth={2}
              restOpacity={0.5}
              className="left-1/2 top-[990px] -z-10 hidden h-[27px] w-[568px] -translate-x-1/2 lg:block"
            />
            <div className="mt-4 flex w-full flex-col items-center gap-[18px] lg:absolute lg:inset-x-0 lg:top-[1036px] lg:mt-0 lg:gap-[26px]">
              {DETAILS.map((d) => (
                <p
                  key={d}
                  className="font-helvetica text-center text-[14px] leading-[1.4] text-white lg:max-w-[825px] lg:text-[20px] lg:leading-[1.4]"
                >
                  {d}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Prizes;
