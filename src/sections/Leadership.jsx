import React from "react";
import { A, DIMS } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import { PartnerGlow } from "../components/Glow";
import { CaretButton } from "../components/Caret";
import CarouselNav from "../components/CarouselNav";
import useInView from "../components/useInView";
import useCarousel from "../components/useCarousel";
import { redPunct } from "../components/RedPunct";
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
  const { index, prev, next, enabled, swipe, hoverPause, setIndex } = useCarousel(SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section
      id="leadership"
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
            carries the glyph ~46px below its top.

            The closing mark is the same glyph turned 180°, which is why its
            ink sits ~79px lower than its box implies (rotating moves the ink
            from 46px below the top to 121px). Rotating it is what makes the
            pair read as open/close instead of two identical marks — and it
            puts the box back on the Figma coordinate (1001,270). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[712px] top-[182px] hidden select-none text-[231px] font-black leading-none lg:block"
          style={{ color: "transparent", WebkitTextStroke: "1px #D6001C" }}
        >
          &ldquo;
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[1001px] top-[270px] hidden rotate-180 select-none text-[231px] font-black leading-none lg:block"
          style={{ color: "transparent", WebkitTextStroke: "1px #D6001C" }}
        >
          &ldquo;
        </span>

        <div
          key={index}
          className="ts-slide relative z-10 flex flex-col gap-8 px-6 pb-12 pt-8 lg:absolute lg:inset-x-0 lg:top-0 lg:flex-row lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0"
        >
          <img
            src={slide.photo}
            alt={slide.name}
            width={slide.dims.w}
            height={slide.dims.h}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[300px] self-center object-cover lg:absolute lg:left-[232px] lg:top-[224px] lg:w-[454px] lg:max-w-none lg:self-auto"
          />

          <div className="flex flex-col items-start lg:absolute lg:left-[730px] lg:top-[274px] lg:max-w-[488px]">
            <p className="whitespace-pre-line text-[15px] sm:text-[16px] font-medium leading-[1.4] text-white lg:leading-[1.25]">
              {redPunct(slide.quote)}
            </p>
            {/* `Frame 31` (114:366) — centered in box on desktop */}
            <p className="mt-6 sm:mt-8 text-[24px] sm:text-[30px] font-extrabold uppercase leading-none text-white lg:mt-[52px] lg:w-[206px] lg:text-center lg:leading-[38px]">
              {slide.name}
            </p>
            <p className="mt-2 text-[14px] sm:text-[16px] font-medium text-white/80 lg:mt-[5px] lg:w-[185px] lg:text-center">
              {slide.role}
            </p>
          </div>
        </div>

        {/* Mobile controls — swipe plus dashes are the affordance */}
        <CarouselNav index={index} count={SLIDES.length} setIndex={setIndex} className="relative z-10 pb-14 lg:pb-0" />

        <CaretButton
          dir="left"
          onClick={prev}
          disabled={!enabled}
          label="Previous"
          className="absolute left-[155px] top-[390px] hidden lg:grid"
        />
        <CaretButton
          dir="right"
          onClick={next}
          disabled={!enabled}
          label="Next"
          className="absolute right-[155px] top-[390px] hidden lg:grid"
        />
      </div>
    </section>
  );
}

export default Leadership;
