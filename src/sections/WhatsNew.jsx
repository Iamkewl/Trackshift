/**
 * "How is TrackShift 2026 Different?" — Figma `Whats new v2` (1:233).
 *
 * The file carries two takes on this section. `Whats new` (1:259) lays the five
 * points out as a plain text grid; `Whats new v2` (1:233) puts each one on a
 * photo card in a carousel. v2 is the one being built.
 *
 * v2's own cards carry filler copy on the two off-canvas neighbours, so the
 * five real points come from 1:259 — the headline and intro paragraph are
 * identical between the two frames.
 */

import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";
import PointCarousel from "../components/PointCarousel";
import useInView from "../components/useInView";

const POINTS = [
  {
    title: "Applied Innovation Focus",
    body: "Build solutions that can scale beyond the competition and create measurable real world impact.",
  },
  {
    title: "Broader Problem Domains",
    body: "Beyond internships, top teams can continue developing their ideas in Plaksha's research labs.",
  },
  {
    title: "Industry + Academia Collaboration",
    body: "Greater emphasis on mentorship, research, and technology transfer with industry partners.",
  },
  {
    title: "Broader Problem Domains",
    body: "From urban mobility and climate action to AI decision systems and digital trust, innovation extends far beyond the racetrack.",
  },
  {
    title: "Open Innovation Platform",
    body: "open innovation repository, encouraging continued research and collaboration.",
  },
];

export function WhatsNew() {
  const [ref, live] = useInView();

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden pb-[90px] pt-[70px] ${live ? "ts-live" : ""}`}
    >
      {/* `image 33` (1:234) — the car plate behind the heading, faded into black
          at its edges so it reads as lighting rather than a pasted photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-28px] top-[146px] hidden h-[599px] w-[856px] md:block"
      >
        <img
          src={A.whatsNewBg}
          alt=""
          width={1712}
          height={963}
          decoding="async"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        {/* The heading (x 156, y 70) and the intro (x 827, y 299) are not two
            columns — the intro sits below the heading and flush to the right
            edge of the 1128px content box, which 671 + 457 lands on exactly. */}
        <div className="relative">
          <SectionHeading delay={0.25}>
            How is
            <br />
            TrackShift <span className="text-haas-red">2026</span> Different?
          </SectionHeading>

          <div className="ml-auto mt-[48px] flex w-full max-w-[457px] flex-col gap-5 text-[16px] font-medium text-white lg:mt-[133px] lg:text-[20px]">
            <p>
              <span className="font-black uppercase text-haas-red">
                TrackShift 2025
              </span>{" "}
              challenged participants to solve problems inspired by the
              motorsport ecosystem. In 2026, the perspective changes completely.
            </p>
            <p>
              Instead of solving for motorsport, participants will use
              motorsport-proven engineering principles to solve real-world
              challenges across AI, sustainability, mobility, climate, and
              intelligent systems.
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed: the neighbouring cards have to run off both page edges. */}
      <div className="relative mt-[80px] md:mt-[150px] lg:mt-[185px]">
        <PointCarousel points={POINTS} />
      </div>
    </section>
  );
}

export default WhatsNew;
