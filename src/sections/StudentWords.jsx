import SpeedStreak from "../components/SpeedStreak";
import { CaretButton } from "../components/Caret";
import useCarousel from "../components/useCarousel";
import useInView from "../components/useInView";
import { P_BLADE_975, VB_BLADE_975 } from "../components/paths";

/**
 * `student words` (114:374) — 1440×737, page y 6605. A 778×430 quote card
 * with a red `Subtract` frame (114:387), pull-quote top-left, and byline
 * bottom-right. Copy is placeholder ("First last", "Trackshift 2o25").
 */

/**
 * Carousel slides. Figma draws only the resting slide and its copy is still
 * placeholder ("First last", "Trackshift 2o25") — add the real testimonials
 * here and the carets light up on their own.
 */
const QUOTE =
  "Inspired by the design, testing, and development before race day,\n\nThe Garage challenges participants to build innovative solutions from the ground up through experimentation, precision, and continuous improvement.\n\nProblem statements coming soon.";

const SLIDES = [
  { quote: QUOTE, name: "First last", meta: "Trackshift 2o25" },
  { quote: QUOTE, name: "Second last", meta: "Trackshift 2o25" },
  { quote: QUOTE, name: "Third last", meta: "Trackshift 2o25" },
];

export function StudentWords() {
  const [ref, live] = useInView(0);
  const { index, prev, next, enabled, swipe, hoverPause } = useCarousel(SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section
      id="student-words"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      {/* touchAction pan-y keeps vertical page scrolling working over the
          swipe area, so only horizontal drags reach the carousel. */}
      <div
        className="relative mx-auto max-w-[1440px] lg:min-h-[748px]"
        {...swipe}
        {...hoverPause}
        style={{ touchAction: "pan-y" }}
      >
        <SpeedStreak
          viewBox={VB_BLADE_975}
          d={P_BLADE_975}
          delay={0.12}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-125px] top-[99px] -z-10 hidden h-[55px] w-[975px] lg:block"
        />
        <h2 className="relative z-10 px-6 pt-10 text-[clamp(30px,6vw,60px)] font-black uppercase leading-none text-white lg:absolute lg:left-[158px] lg:top-[69px] lg:px-0 lg:pt-0 lg:text-[60px]">
          student words
        </h2>

        {/* Desktop card — exact positions from Frame 84 / Subtract / Frame 31. */}
        <figure key={index} className="ts-slide relative z-10 hidden lg:block lg:absolute lg:left-[331px] lg:top-[226px] lg:h-[430px] lg:w-[778px]">
          <div className="pointer-events-none absolute inset-x-0 border-2 border-haas-red" style={{ top: 37, height: 393 }} />
          {/* `Rectangle 1608` — the 131×63 bite the `Subtract` takes out of the
              top rail so the quote mark sits in a gap, not on the line. */}
          <div
            className="pointer-events-none absolute bg-black"
            style={{ left: 34, top: 9, width: 131, height: 63 }}
          />
          {/* 114:382 — the outlined `“` notched into the card's top rail: a
              98×74 ink box at (50,0), which is Orbitron 900 at 267px. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute select-none font-black leading-none"
            style={{
              left: 38,
              top: -46,
              fontSize: 267,
              color: "transparent",
              WebkitTextStroke: "1.16px #D6001C",
            }}
          >
            &ldquo;
          </span>
          <blockquote className="absolute left-[50px] top-[111px] max-w-[659px] whitespace-pre-line text-[18.5px] font-medium leading-[1.24] text-white">
            {slide.quote}
          </blockquote>
          {/* `Frame 31` (114:383) — 239-wide and 170-wide centred boxes at
              card-relative x506 / x575. */}
          <figcaption>
            <p className="absolute left-[506px] top-[317px] w-[239px] text-center text-[34.7px] font-extrabold uppercase leading-[44px] text-white">
              {slide.name}
            </p>
            <p className="absolute left-[575px] top-[367px] w-[170px] text-center text-[18.5px] font-medium text-white/80">
              {slide.meta}
            </p>
          </figcaption>
        </figure>

        {/* Mobile card — reflowed. */}
        <figure className="relative z-10 mx-6 my-8 flex flex-col items-center border-2 border-haas-red px-8 pb-10 pt-10 text-center lg:hidden">
          <blockquote className="font-helvetica max-w-[659px] whitespace-pre-line text-[16px] font-normal leading-[1.4] text-white">
            {slide.quote}
          </blockquote>
          <p className="mt-8 text-[28px] font-extrabold uppercase leading-none text-white">{slide.name}</p>
          <p className="mt-2 text-[16px] font-medium text-white/80">{slide.meta}</p>
        </figure>

        <CaretButton
          dir="left"
          onClick={prev}
          disabled={!enabled}
          label="Previous"
          className="left-[155px] top-[425px] hidden lg:grid"
        />
        <CaretButton
          dir="right"
          onClick={next}
          disabled={!enabled}
          label="Next"
          className="right-[155px] top-[425px] hidden lg:grid"
        />
      </div>
    </section>
  );
}

export default StudentWords;
