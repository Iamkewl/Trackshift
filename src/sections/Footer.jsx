import React from "react";
import { A, DIMS } from "../assets";
import useInView from "../components/useInView";
import { redPunct } from "../components/RedPunct";

/**
 * `Footer` (114:421) — 1440×553, page y 9333. The full lockup at 369×327
 * (`A.logoFooter` — badge + wordmark + tagline + "in association with"
 * partner row, re-exported straight from Figma node 114:422, NOT a stretch
 * of the hero's badge-only crop), the four social rows (Frame 90), and the
 * legal line. Brand icons are approximated inline (the Figma ones are
 * component instances with gradient fills).
 */

/**
 * The four social marks are circular badges in the Figma icon set (114:425 /
 * 428 / 431 / 434). Brand colours and the Instagram two-radial gradient are
 * taken verbatim from the file's fills.
 */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <defs>
        <radialGradient id="ts-ig-a" cx="26.6%" cy="107.7%" r="92%">
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.1" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        <radialGradient id="ts-ig-b" cx="-16.8%" cy="7.2%" r="180%">
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="0.128" stopColor="#3771C8" />
          <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="19" cy="19" r="19" fill="url(#ts-ig-a)" />
      <circle cx="19" cy="19" r="19" fill="url(#ts-ig-b)" />
      <rect
        x="8.5"
        y="8.5"
        width="21"
        height="21"
        rx="6"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="19" cy="19" r="5.4" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="25.4" cy="12.6" r="1.4" fill="#fff" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <circle cx="19" cy="19" r="19" fill="#0077B5" />
      <rect x="12" y="15.5" width="2.8" height="11.5" fill="#fff" />
      <rect x="12" y="12" width="2.8" height="2.8" rx="1.4" fill="#fff" />
      <path
        d="M22.2 15.5c-2 0-2.9.9-3.4 1.7h-.05V15.5H16V27h2.9v-5.8c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.2V27H26v-6.5c0-3.4-.7-5-3.8-5z"
        fill="#fff"
      />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <circle cx="19" cy="19" r="19" fill="#25D366" />
      <path
        d="M10.5 12.8c-.5 2.4 1.2 5.3 2.9 7.6 1.7 2.3 5 5.3 8.7 6 1.9.4 3.8 0 4.9-1.3.7-.9.3-2-.5-2.5l-2.5-1.6c-.9-.6-2-.2-2.5.7l-.4.8c-.2.3-.6.4-.9.2-1.6-1-3.1-2.2-4.1-3.6-.3-.4-.1-.9.3-1.1l.7-.7c.7-.7.9-1.8.3-2.7l-1.4-2.6c-.5-1-1.7-1.2-2.7-.5-.3.2-.6.6-.8.9z"
        fill="#fff"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <circle cx="19" cy="19" r="19" fill="#5A68F3" />
      <path
        d="M19 9.5c-3.6 0-6.1 2-6.1 2-1.2 2.7-1.2 8.4 0 11.1.6 1 1.7 1.6 2.6 1.8l1-1.4c-.8-.3-1.6-.8-2.2-1.5.3.2.8.5 1.3.7 1.3.7 2.9 1 4.4 1 1.5 0 3.1-.3 4.4-1 .5-.2 1-.5 1.3-.7-.6.7-1.4 1.2-2.2 1.5l1 1.4c.9-.2 2-.8 2.6-1.8 1.2-2.7 1.2-8.4 0-11.1 0 0-2.5-2-6.1-2zm-3.8 8.9c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6zm7.6 0c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6z"
        fill="#fff"
      />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "LinkedIn", Icon: LinkedinIcon, href: "#" },
  { label: "WhatsApp community", Icon: WhatsappIcon, href: "#" },
  { label: "Discord", Icon: DiscordIcon, href: "#" },
];

export function Footer() {
  const [ref, live] = useInView(0);

  return (
    <footer
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[553px]">
        {/* Desktop layout — design coordinates. */}
        <img
          src={A.logoFooter}
          alt="TrackShift — Build. Compete. Innovate. In association with Plaksha University and TGR Haas F1 Team"
          width={DIMS.logoFooter.w}
          height={DIMS.logoFooter.h}
          decoding="async"
          className="absolute left-[172px] top-[87px] hidden h-[327px] w-[369px] object-contain lg:block"
        />

        <div className="absolute left-[955px] top-[154px] hidden flex-col gap-[14px] lg:flex">
          {SOCIALS.map(({ label, Icon, href }) => (
            <a key={label} href={href} className="group flex items-center gap-[16px]">
              <Icon />
              <span className="font-helvetica text-[18px] font-extrabold text-white transition-colors group-hover:text-haas-red">
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* Legal line — 114:436/437/439, all at 50% opacity. */}
        <div className="absolute left-[182px] top-[469px] hidden opacity-50 lg:block">
          <span className="inline-block text-[12px] leading-none text-white">
            <span className="mr-[4px] inline-block h-[12px] w-[12px] rounded-full border border-white text-center leading-[10px]">
              c
            </span>
            <span className="mr-[14px] font-semibold">Trackshift 2O26</span>
            <span className="font-semibold">{redPunct("All rights reserved.")}</span>
          </span>
        </div>

        {/* Mobile layout. */}
        <div className="flex flex-col items-center px-6 pb-10 pt-14 lg:hidden">
          <img
            src={A.logoFooter}
            alt="TrackShift — Build. Compete. Innovate. In association with Plaksha University and TGR Haas F1 Team"
            width={DIMS.logoFooter.w}
            height={DIMS.logoFooter.h}
            decoding="async"
            className="h-[160px] w-[180px] object-contain"
          />
          <div className="mt-8 flex w-full max-w-[280px] sm:max-w-[320px] mx-auto flex-col gap-4">
            {SOCIALS.map(({ label, Icon, href }) => (
              <a key={label} href={href} className="group flex items-center gap-4">
                <Icon />
                <span className="font-helvetica text-[16px] font-extrabold text-white transition-colors group-hover:text-haas-red">
                  {label}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-[12px] font-semibold text-white/80">
            {redPunct("© Trackshift 2O26 · All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
