/**
 * "How is TrackShift 2026 Different?" — Figma `Whats new v2` (1:233).
 *
 * The design draws three cards on one row: `Frame 32` centred at x 209 and
 * `Frame 33`/`Frame 34` parked at x -750 and x 1302, i.e. mostly off-canvas.
 * That is a carousel caught mid-slide, not three columns — which is why the two
 * outer cards carry filler copy ("Customer-Centric Design"). They exist to show
 * what a neighbour looks like peeking in.
 *
 * Geometry, from `Frame 32` (1022×461):
 *
 *   image 37     1048×699  centred, top -173   the photo, deliberately overscanned
 *   Rectangle 27 1206×507  at -508,122         blurred black scrim, stepped
 *   Rectangle 23 1677×139  at -1174,334        the red rake
 *   Frame 31     at 47,319                     title 24px / body 16px, 11px gap
 *
 * On a 1440 canvas the row is 138 peek + 71 gap + 1022 card + 71 gap + 138 peek.
 * `--card` and `--gap` below reproduce exactly that at 1440 and compress
 * proportionally under it, so the peek survives down to phone widths.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { A } from "../assets";
import SpeedStreak from "./SpeedStreak";
import { P_CARD_RAKE, VB_CARD_RAKE } from "./paths";

/** `Rectangle 27` (1:240) — a black step polygon under 105px of blur.
 *  Points are the Figma path re-expressed as percentages of its 1206×507 box. */
const SCRIM_CLIP =
  "polygon(0% 0%, 64.02% 0%, 64.02% 49.45%, 100% 50.0%, 100% 100%, 0% 100%)";

function Card({ point, active }) {
  return (
    <article
      className="relative aspect-[16/10] flex-none overflow-hidden bg-black sm:aspect-[16/9] lg:aspect-[1022/461]"
      style={{ width: "var(--card)" }}
      aria-hidden={active ? undefined : "true"}
    >
      {/* image 37 (1:239) — overscanned so the crop matches the design */}
      <img
        src={A.cardPitLane}
        alt=""
        width={1100}
        height={733}
        decoding="async"
        loading="lazy"
        className="absolute left-1/2 max-w-none -translate-x-1/2 object-cover"
        style={{ width: "102.544%", height: "151.63%", top: "-37.527%" }}
      />

      {/* Rectangle 27 (1:240). The blur lives on the wrapper and the clip on the
          child: CSS applies clip-path *after* filter, so blurring the clipped
          element directly shears the falloff back into hard edges. Blur scales
          with the card so it never over-darkens at small sizes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "-49.71%",
          top: "26.464%",
          width: "118.0%",
          height: "109.98%",
          filter: "blur(calc(var(--card) * 0.1028))",
        }}
      >
        <div className="h-full w-full bg-black" style={{ clipPath: SCRIM_CLIP }} />
      </div>

      {/* Rectangle 23 (1:241) */}
      <SpeedStreak
        viewBox={VB_CARD_RAKE}
        d={P_CARD_RAKE}
        strokeWidth={3}
        restOpacity={0.6}
        duration={3.4}
        delay={0.2}
        className="left-[-114.87%] top-[72.451%] h-[30.152%] w-[164.09%]"
      />

      {/* Frame 31 (1:242). Width is 335 of the card's 1022 — holding that ratio
          is what reproduces the design's three-line wrap. Widened below `lg`,
          where 32.78% of a phone-sized card would leave ~3 words a line. */}
      <div className="absolute bottom-[7%] left-[4.599%] flex w-[80%] flex-col gap-[6px] text-white sm:w-[56%] sm:gap-[9px] lg:bottom-auto lg:top-[69.198%] lg:w-[32.78%] lg:gap-[11px]">
        <h3 className="text-[clamp(14px,2.35vw,24px)] font-extrabold leading-tight">
          {point.title}
        </h3>
        <p className="text-[clamp(11px,1.57vw,16px)] font-medium leading-snug">
          {point.body}
        </p>
      </div>
    </article>
  );
}

export function PointCarousel({ points }) {
  const [i, setI] = useState(0);
  const last = points.length - 1;
  const trackRef = useRef(null);
  const touch = useRef(null);

  const go = useCallback(
    (n) => setI((c) => Math.min(last, Math.max(0, typeof n === "function" ? n(c) : n))),
    [last],
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go((c) => c - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go((c) => c + 1);
    }
  };

  // Swipe. Pointer events cover touch and trackpad drag alike.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const down = (e) => {
      touch.current = { x: e.clientX, t: Date.now() };
    };
    const up = (e) => {
      const start = touch.current;
      touch.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      if (Math.abs(dx) > 40 && Date.now() - start.t < 800) {
        go((c) => c + (dx < 0 ? 1 : -1));
      }
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [go]);

  return (
    <div
      className="relative"
      style={{
        // 1022 and 71 at a 1440 canvas; both shrink with the viewport below it.
        "--card": "min(1022px, 82vw)",
        "--gap": "clamp(14px, 4.93vw, 71px)",
      }}
    >
      <div
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="How TrackShift 2026 is different"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-haas-red/60"
      >
        {/* Percentage padding resolves against the clipping container, so this
            centres the active card without knowing the track's own width. */}
        <div
          className="ts-carousel flex touch-pan-y select-none items-stretch"
          style={{
            gap: "var(--gap)",
            paddingLeft: "calc(50% - var(--card) / 2)",
            paddingRight: "calc(50% - var(--card) / 2)",
            transform: `translateX(calc(${-i} * (var(--card) + var(--gap))))`,
          }}
        >
          {points.map((p, n) => (
            <Card key={p.title + n} point={p} active={n === i} />
          ))}
        </div>
      </div>

      <div className="mt-[28px] flex items-center justify-center gap-[18px]">
        <button
          type="button"
          onClick={() => go((c) => c - 1)}
          disabled={i === 0}
          aria-label="Previous"
          className="grid h-[38px] w-[38px] place-items-center border border-white/30 text-white transition-colors hover:border-haas-red hover:text-haas-red disabled:opacity-25 disabled:hover:border-white/30 disabled:hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M15 4 L7 12 L15 20" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>

        <div className="flex items-center gap-[10px]">
          {points.map((p, n) => (
            <button
              key={p.title + n}
              type="button"
              onClick={() => go(n)}
              aria-label={p.title}
              aria-current={n === i ? "true" : undefined}
              className={`h-[5px] transition-all duration-300 ${
                n === i ? "w-[33px] bg-haas-red" : "w-[14px] bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go((c) => c + 1)}
          disabled={i === last}
          aria-label="Next"
          className="grid h-[38px] w-[38px] place-items-center border border-white/30 text-white transition-colors hover:border-haas-red hover:text-haas-red disabled:opacity-25 disabled:hover:border-white/30 disabled:hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path d="M9 4 L17 12 L9 20" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PointCarousel;
