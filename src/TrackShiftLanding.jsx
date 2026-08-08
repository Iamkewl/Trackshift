// src/TrackShiftLanding.jsx
import React from 'react';
import useDesktopScale from './useDesktopScale'; // existing hook
import Hero from './sections/Hero';
import About from './sections/About';
import Problems from './sections/Problems';
import Prizes from './sections/Prizes';
import Timeline from './sections/Timeline';
import Partners from './sections/Partners';
import Leadership from './sections/Leadership';
import StudentWords from './sections/StudentWords';
import Lookback from './sections/Lookback';
import Apply from './sections/Apply';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

export default function TrackShiftLanding() {
  useDesktopScale();

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-black text-white isolate font-helvetica">
      <main className="w-full flex flex-col items-center">
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
      </main>
      <Footer />
    </div>
  );
}
