import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { PartnerGlow } from "../components/Glow";
import { CaretButton } from "../components/Caret";
import useInView from "../components/useInView";
import useCarousel from "../components/useCarousel";
import { P_BLADE_791, VB_BLADE_791 } from "../components/paths";

/**
 * `leadership` (114:355) — 1440×737, page y 5857. Section-heading blade + the
 * leadership photo card on the left, a pull-quote and byline to its right,
 * and the two carousel carets at the far edges. The giant `“` glyphs (114:358,
 * 114:359) carry no fill but a 1px red stroke, so they draw as outlines behind
 * the content.
 *
 * Note the byline is still the design's placeholder copy ("First last",
 * "Designation, Mphasis").
 */

/**
 * Carousel slides. Figma only draws the resting slide, and its copy is still
 * placeholder ("First last", "Designation, Mphasis") — add the real entries
 * here and the carets light up on their own.
 */
const QUOTE =
  "Inspired by the design, testing, and development before race day,\n\nThe Garage challenges participants to build innovative solutions from the ground up through experimentation, precision, and continuous improvement.\n\nProblem statements coming soon.";

const SLIDES = [
  { photo: A.leadershipCard, dims: DIMS.leadershipCard, quote: QUOTE, name: "First last", role: "Designation, Mphasis" },
  { photo: A.leadershipCard, dims: DIMS.leadershipCard, quote: QUOTE, name: "Second last", role: "Designation, Mphasis" },
  { photo: A.leadershipCard, dims: DIMS.leadershipCard, quote: QUOTE, name: "Third last", role: "Designation, Plaksha" },
];

export function Leadership() {
  const [ref, live] = useInView(0);
  const { index, prev, next, enabled } = useCarousel(SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section
      id="leadership"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[748px]">
        {/* `image 67` runs 287px past the Partners clip into this section. */}
        <PartnerGlow className="hidden lg:block" top={-723} />
        <SpeedStreak
          viewBox={VB_BLADE_791}
          d={P_BLADE_791}
          delay={0.12}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-125px] top-[99px] -z-10 hidden h-[55px] w-[791px] lg:block"
        />
        <h2 className="relative z-10 px-6 pt-10 text-[clamp(30px,6vw,60px)] font-black uppercase leading-none text-white lg:absolute lg:left-[158px] lg:top-[69px] lg:px-0 lg:pt-0 lg:text-[60px]">
          leadership
        </h2>

        {/* 114:358 / 114:359 — outlined quote marks, no fill, 1px red stroke.
            Positioned by their INK, not the Figma text box: a 231px line box
            carries the glyph ~46px down, and the closing mark sits a further
            ~79px lower than its box implies. Values measured off the design's
            own SVG render. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[712px] top-[182px] hidden select-none text-[231px] font-black leading-none lg:block"
          style={{ color: "transparent", WebkitTextStroke: "1px #D6001C" }}
        >
          &ldquo;
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[1002px] top-[349px] hidden select-none text-[231px] font-black leading-none lg:block"
          style={{ color: "transparent", WebkitTextStroke: "1px #D6001C" }}
        >
          &ldquo;
        </span>

        <div
          key={index}
          className="ts-slide relative z-10 flex flex-col gap-8 px-6 pb-16 pt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:flex-row lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          <img
            src={slide.photo}
            alt={slide.name}
            width={slide.dims.w}
            height={slide.dims.h}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[440px] self-center object-cover lg:absolute lg:left-[232px] lg:top-[224px] lg:w-[454px] lg:max-w-none lg:self-auto"
          />

          <div className="flex flex-col lg:absolute lg:left-[730px] lg:top-[274px] lg:max-w-[488px]">
            <p className="whitespace-pre-line text-[16px] font-medium leading-[1.4] text-white lg:leading-[1.25]">
              {slide.quote}
            </p>
            {/* `Frame 31` (114:366) — both lines are centred in their own
                boxes (206 / 185 wide) starting at the column's left edge. */}
            <p className="mt-8 text-[30px] font-extrabold uppercase leading-none text-white lg:mt-[52px] lg:w-[206px] lg:text-center lg:leading-[38px]">
              {slide.name}
            </p>
            <p className="mt-2 text-[16px] font-medium text-white/80 lg:mt-[5px] lg:w-[185px] lg:text-center">
              {slide.role}
            </p>
          </div>
        </div>

        <CaretButton
          dir="left"
          onClick={prev}
          disabled={!enabled}
          label="Previous"
          className="left-[155px] top-[390px] hidden lg:grid"
        />
        <CaretButton
          dir="right"
          onClick={next}
          disabled={!enabled}
          label="Next"
          className="right-[155px] top-[390px] hidden lg:grid"
        />
      </div>
    </section>
  );
}

export default Leadership;
