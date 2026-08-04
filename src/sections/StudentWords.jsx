import SpeedStreak from "../components/SpeedStreak";
import Caret from "../components/Caret";
import useInView from "../components/useInView";
import { P_BLADE_975, VB_BLADE_975 } from "../components/paths";

/**
 * `student words` (114:374) — 1440×737, page y 6605. A 778×430 quote card
 * with a red `Subtract` frame (114:387), pull-quote top-left, and byline
 * bottom-right. Copy is placeholder ("First last", "Trackshift 2o25").
 */

const QUOTE =
  "Inspired by the design, testing, and development before race day, The Garage challenges participants to build innovative solutions from the ground up through experimentation, precision, and continuous improvement. Problem statements coming soon.";

export function StudentWords() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="student-words"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[737px]">
        <SpeedStreak
          viewBox={VB_BLADE_975}
          d={P_BLADE_975}
          delay={0.12}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-125px] top-[99px] -z-10 hidden h-[55px] w-[975px] lg:block"
        />
        <h2 className="relative z-10 px-6 pt-10 text-[clamp(30px,6vw,60px)] font-black leading-none text-white lg:absolute lg:left-[158px] lg:top-[69px] lg:px-0 lg:pt-0 lg:text-[60px]">
          student words
        </h2>

        {/* Desktop card — exact positions from Frame 84 / Subtract / Frame 31. */}
        <figure className="relative z-10 hidden lg:block lg:absolute lg:left-[331px] lg:top-[226px] lg:h-[430px] lg:w-[778px]">
          <div className="pointer-events-none absolute inset-x-0 border-2 border-haas-red" style={{ top: 37, height: 393 }} />
          <blockquote className="absolute left-[50px] top-[111px] max-w-[659px] text-[18.5px] font-medium leading-[1.24] text-white">
            {QUOTE}
          </blockquote>
          <figcaption className="absolute left-[506px] top-[317px] text-center">
            <p className="text-[34.7px] font-extrabold leading-none text-white">First last</p>
            <p className="mt-[7px] text-[18.5px] font-medium text-white/80">Trackshift 2o25</p>
          </figcaption>
        </figure>

        {/* Mobile card — reflowed. */}
        <figure className="relative z-10 mx-6 my-8 flex flex-col items-center border-2 border-haas-red px-8 pb-10 pt-10 text-center lg:hidden">
          <blockquote className="font-helvetica max-w-[659px] text-[16px] font-normal leading-[1.4] text-white">
            {QUOTE}
          </blockquote>
          <p className="mt-8 text-[28px] font-extrabold leading-none text-white">First last</p>
          <p className="mt-2 text-[16px] font-medium text-white/80">Trackshift 2o25</p>
        </figure>

        <Caret dir="left" className="absolute left-[155px] top-[425px] hidden h-[32px] w-[32px] lg:block" />
        <Caret dir="right" className="absolute right-[155px] top-[425px] hidden h-[32px] w-[32px] lg:block" />
      </div>
    </section>
  );
}

export default StudentWords;
