import { A, DIMS } from "../assets";
import { LookbackGlow } from "../components/Glow";
import SpeedStreak from "../components/SpeedStreak";
import useInView from "../components/useInView";
import { P_HERO_BRACKET, VB_HERO_BRACKET, P_HERO_BRACKET_M, VB_HERO_BRACKET_M } from "../components/paths";

/**
 * `a lookback` (114:390) — 1440×945, page y 7353. A 1128×636 dark frame
 * (`Frame 85`, fill 0.18) filled by the `image 87` video poster, with the red
 * "play video" button straddling its bottom edge. The play button is a link
 * for now (the actual reels embed is out of scope).
 */

export function Lookback() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="lookback"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[956px]">
        <LookbackGlow className="hidden lg:block" />

        {/* `Rectangle 24` (114:395 desktop / 237:578 mobile) — same open
            bracket as the Hero CTA and Partners heading, framing the section
            title at both sizes. */}
        <SpeedStreak
          viewBox={VB_HERO_BRACKET}
          d={P_HERO_BRACKET}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-1/2 top-[87px] -z-10 hidden h-[150px] w-[1567px] -translate-x-1/2 lg:block"
        />
        <SpeedStreak
          viewBox={VB_HERO_BRACKET_M}
          d={P_HERO_BRACKET_M}
          delay={0.1}
          strokeWidth={1.4}
          restOpacity={0.7}
          className="left-[-29px] top-[39px] -z-10 h-[45px] w-[449px] lg:hidden"
        />

        <h2 className="relative z-10 px-6 pt-10 text-center text-[clamp(26px,5vw,48px)] font-black uppercase text-white lg:absolute lg:inset-x-0 lg:top-[61px] lg:px-0 lg:pt-0 lg:text-[48px]">
          a lookback
        </h2>

        {/* Desktop frame + poster + play button. */}
        <div className="relative z-10 hidden lg:block">
          <div
            className="absolute overflow-hidden"
            style={{ left: 156, top: 162, width: 1128, height: 636, background: "#2D2D2D" }}
          >
            <img
              src={A.videoPoster}
              alt="TrackShift 2025 aftermovie"
              width={DIMS.videoPoster.w}
              height={DIMS.videoPoster.h}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <a
            href="#apply"
            className="absolute flex items-center justify-center bg-haas-red text-[36px] font-extrabold uppercase text-white transition-transform hover:scale-[1.02]"
            style={{ left: 567, top: 768, width: 305, height: 77 }}
          >
            play video
          </a>
        </div>

        {/* Mobile — same idea, fluid. */}
        <div className="relative z-10 mx-6 my-8 overflow-hidden lg:hidden" style={{ background: "#2D2D2D" }}>
          <img
            src={A.videoPoster}
            alt="TrackShift 2025 aftermovie"
            width={DIMS.videoPoster.w}
            height={DIMS.videoPoster.h}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
          <a
            href="#apply"
            className="flex h-[60px] items-center justify-center bg-haas-red text-[28px] font-extrabold uppercase text-white"
          >
            play video
          </a>
        </div>
      </div>
    </section>
  );
}

export default Lookback;
