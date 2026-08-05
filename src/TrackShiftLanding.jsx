/**
 * TrackShift 2026 — landing page
 * Implemented from Figma: XZEbZaLnpeggQI3s1auPr2 / node-id 0-1
 * "Trackshit landing page" (Frame 35, 114:97).
 *
 * Section order follows `Frame 35` children: hero → about → problems →
 * prizes → timeline → partners → leadership → student words → lookback →
 * apply → FAQs → footer.
 */
import "./components/motion.css";

import useDesktopScale from "./components/useDesktopScale";
import useInView from "./components/useInView";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Problems from "./sections/Problems";
import Prizes from "./sections/Prizes";
import Timeline from "./sections/Timeline";
import Partners from "./sections/Partners";
import Leadership from "./sections/Leadership";
import StudentWords from "./sections/StudentWords";
import Lookback from "./sections/Lookback";
import Apply from "./sections/Apply";
import FAQ from "./sections/FAQ";
import Footer from "./sections/Footer";

export function TrackShiftLanding() {
  const [ref, live] = useInView(0);
  const zoom = useDesktopScale();

  return (
    <div
      ref={ref}
      style={zoom === 1 ? undefined : { zoom }}
      className={`relative isolate min-h-screen overflow-x-hidden bg-black antialiased ${
        live ? "ts-live" : ""
      }`}
    >
      {/*
        The page background is the baked `Group 58` plates, each anchored to the
        section it lights (see components/Glow.jsx) so a glow stays with its
        content instead of drifting once a section reflows.
      */}
      <Hero />
      <About />
      <Problems />
      <Prizes />
      <Timeline />
      <Partners />
      <Leadership />
      <StudentWords />
      <Lookback />
      <Apply />
      <FAQ />
      <Footer />
    </div>
  );
}

export default TrackShiftLanding;
