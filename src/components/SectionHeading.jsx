import SpeedStreak from "./SpeedStreak";
import useInView from "./useInView";
import { P_BLADE, VB_BLADE, P_CHEVRON, VB_CHEVRON } from "./paths";

/**
 * Section heading with its animated streak.
 * `align="left"`  → the blade (About, Challenge Tracks, What's New)
 * `align="center"`→ the wide chevron (Prizes, Partners)
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
            ? "left-[-518px] top-[-27px] h-[97px] w-[1171px]"
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
