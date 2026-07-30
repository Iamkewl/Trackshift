/**
 * TrackShift 2026 — landing page
 * Implemented from Figma: HackCulture--Copy- / node 1:4 "Trackshit landing page"
 *
 * Section order follows `Frame 35` in the Figma file. `Whats new v2` (1:233) is
 * intentionally omitted — it duplicates `Whats new` (1:259) with placeholder
 * copy. See README.md.
 */
import "./components/motion.css";

import useInView from "./components/useInView";
import pageBg from "./assets/page-bg.webp";

import Hero from "./sections/Hero";
import SupportedBy from "./sections/SupportedBy";
import About from "./sections/About";
import Prizes from "./sections/Prizes";
import Partners from "./sections/Partners";
import ChallengeTracks from "./sections/ChallengeTracks";
import WhatsNew from "./sections/WhatsNew";

export function TrackShiftLanding() {
  const [ref, live] = useInView(0);

  return (
    <div
      ref={ref}
      className={`relative isolate min-h-screen overflow-x-hidden bg-black font-display antialiased ${
        live ? "ts-live" : ""
      }`}
    >
      {/*
        Page background below the hero — Figma `Group 58`, composited as one
        image at the coordinates Figma gives its children:

          image 2  (1:6)   x -438  y 4590   2185×1297   blue/cyan diagonal
          image 5  (1:8)   x  -70  y -1072  1528×2375   red rails (tail only)
          Rect 2/3 (1:11,1:12)                          feathered black

        Built by extracting the true bitmaps out of the Figma PDF export and
        compositing them, because the MCP asset endpoint returns the wrong
        fill for these nodes (see ASSETS.md).

        Starts at y=1066 so it does not touch the hero, which keeps its own
        <HeroGlow>. Verified against the PDF by sampling the content-free page
        margins: supported 2.4/2.9, tracks 8.7/10.4, whatsnew 30.5/26.9.
      */}
      <img
        src={pageBg}
        alt=""
        aria-hidden="true"
        width={1440}
        height={6596}
        decoding="async"
        className="pointer-events-none absolute left-0 top-[1066px] -z-10 w-full select-none"
      />

      <Hero />
      <SupportedBy />
      <About />
      <Prizes />
      <Partners />
      <ChallengeTracks />
      <WhatsNew />
    </div>
  );
}

export default TrackShiftLanding;
