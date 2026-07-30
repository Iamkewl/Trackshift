import SpeedStreak from "./SpeedStreak";
import useInView from "./useInView";
import { P_BLADE, VB_BLADE, P_CHEVRON, VB_CHEVRON } from "./paths";

/**
 * Section heading with its animated streak.
 * `align="left"`  → the blade (About, Challenge Tracks, What's New)
 * `align="center"`→ the wide chevron (Prizes, Partners)
 *
 * The blade is a fixed 97px box because the design's headings are always two
 * 48px lines. Below `lg` they wrap to three and four lines — "How is TrackShift
 * 2026 Different?" reaches 144px — and a 97px blade pinned to the top of that
 * puts its lower edge straight through the middle of the words, reading as a
 * strikethrough. So below `lg` the whole blade lifts above the heading, into the
 * section's top padding where there is always room for it. The design geometry
 * is untouched from `lg` up.
 */
export function SectionHeading({ children, align = "left", delay = 0 }) {
  const [ref, live] = useInView();
  const isLeft = align === "left";

  return (
    <div ref={ref} className={`relative ${live ? "ts-live" : ""}`}>
      <SpeedStreak
        viewBox={isLeft ? VB_BLADE : VB_CHEVRON}
        d={isLeft ? P_BLADE : P_CHEVRON}
        delay={delay}
        className={
          isLeft
            ? "bottom-full left-[-518px] mb-[10px] h-[40px] w-[1171px] lg:bottom-auto lg:mb-0 lg:top-[-27px] lg:h-[97px]"
            : "left-1/2 top-[-26px] h-[150px] w-[1567px] -translate-x-1/2"
        }
      />
      <h2
        className={`relative text-[36px] font-black uppercase leading-none text-white sm:text-[42px] lg:text-[48px] ${
          isLeft ? "" : "text-center"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}

export default SectionHeading;
