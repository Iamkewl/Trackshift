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
        The page background is no longer one flattened bitmap. Figma's `Group 58`
        is a page-wide light rig, and each of its plates now lives on the section
        it lights (see components/Glow.jsx) so the glow stays with its content at
        any viewport width instead of drifting once a section reflows.
      */}
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
