import React, { useState } from 'react';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section id="hero" className="relative w-full bg-black text-white pt-4 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background Ambient Glow Plate */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-[#E10600]/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Navigation Header Bar */}
      <header className="relative z-50 max-w-7xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/10 mb-12">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <span className="font-orbitron text-lg sm:text-2xl font-black tracking-widest text-white uppercase">
            TRACKSHIFT
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#problems" className="hover:text-white transition-colors">Tracks</a>
          <a href="#prizes" className="hover:text-white transition-colors">Prizes</a>
          <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
          <a href="#partners" className="hover:text-white transition-colors">Partners</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Apply CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#apply"
            className="px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-all uppercase tracking-wider"
          >
            Apply Now
          </a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 w-full bg-black/95 border-b border-white/10 p-6 flex flex-col gap-4 text-center lg:hidden z-50">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">About</a>
            <a href="#problems" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">Tracks</a>
            <a href="#prizes" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">Prizes</a>
            <a href="#timeline" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">Timeline</a>
            <a href="#partners" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">Partners</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white py-1">FAQ</a>
          </div>
        )}
      </header>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center pt-6 sm:pt-12">
        <span className="px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#E10600] bg-[#E10600]/10 border border-[#E10600]/30 rounded-full mb-6">
          She Builds Innovation Hackathon
        </span>

        <h1 className="font-orbitron text-3xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight uppercase">
          TRACKSHIFT <span className="text-[#E10600]">2O26</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-300 max-w-2xl px-2 leading-relaxed">
          Shift gears and accelerate your ideas on the high-speed track of innovation. Built for visionaries, developers, and creators.
        </p>

        {/* Devfolio / Application CTA Button Container */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#apply"
            className="px-8 py-3.5 text-xs sm:text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-all uppercase tracking-widest shadow-lg shadow-white/10"
          >
            Apply with Devfolio
          </a>
        </div>

        {/* Hero Stats Grid Container - Responsive 2x2 Grid on Mobile, 4-Col on Desktop */}
        <div className="mt-12 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-orbitron text-xl sm:text-3xl font-bold text-white">2O26</span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Edition</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-l border-white/10">
            <span className="font-orbitron text-xl sm:text-3xl font-bold text-[#E10600]">₹1,75,OOO</span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Prize Pool</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
            <span className="font-orbitron text-xl sm:text-3xl font-bold text-white">15o/5o</span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Shortlist</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 border-l border-white/10">
            <span className="font-orbitron text-xl sm:text-3xl font-bold text-white">Top 8–1O</span>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Finalists</span>
          </div>
        </div>
      </div>
    </section>
  );
}
