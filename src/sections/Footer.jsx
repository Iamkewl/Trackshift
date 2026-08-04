import { A, DIMS } from "../assets";
import useInView from "../components/useInView";

/**
 * `Footer` (114:421) — 1440×553, page y 9333. The inverse wordmark (drawn at
 * 369×327 — the design stretches it from the 171×137 hero crop), the four
 * social rows (Frame 90), and the legal line. Brand icons are approximated
 * inline (the Figma ones are component instances with gradient fills).
 */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <rect x="1.5" y="1.5" width="35" height="35" rx="9" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="19" cy="19" r="7.5" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="28.4" cy="9.6" r="1.8" fill="#fff" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 38 38" className="h-[38px] w-[38px]" aria-hidden="true">
      <rect x="1" y="1" width="36" height="36" rx="9" fill="#0A66C2" />
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
      <circle cx="19" cy="19" r="18.5" fill="#25D366" />
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
      <circle cx="19" cy="19" r="18.5" fill="#5865F2" />
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
          src={A.logo}
          alt="TrackShift"
          width={DIMS.logo.w}
          height={DIMS.logo.h}
          decoding="async"
          className="absolute left-[172px] top-[87px] hidden h-[327px] w-[369px] object-fill lg:block"
        />

        <div className="absolute left-[955px] top-[154px] hidden flex-col gap-[16px] lg:flex">
          {SOCIALS.map(({ label, Icon, href }) => (
            <a key={label} href={href} className="group flex items-center gap-[16px]">
              <Icon />
              <span className="text-[18px] font-extrabold text-white transition-colors group-hover:text-haas-red">
                {label}
              </span>
            </a>
          ))}
        </div>

        <div className="absolute left-[182px] top-[469px] hidden lg:block">
          <span className="inline-block text-[12px] leading-none text-white">
            <span className="mr-[4px] inline-block h-[12px] w-[12px] rounded-full border border-white text-center leading-[10px]">
              c
            </span>
            <span className="mr-[14px] font-semibold">Trackshift 2O26</span>
            <span className="font-semibold">All rights reserved.</span>
          </span>
        </div>
        <a
          href="#"
          className="absolute left-[1168px] top-[469px] hidden text-[12px] font-semibold text-white transition-colors hover:text-haas-red lg:block"
        >
          Privacy policy
        </a>

        {/* Mobile layout. */}
        <div className="flex flex-col items-center px-6 pb-10 pt-14 lg:hidden">
          <img
            src={A.logo}
            alt="TrackShift"
            width={DIMS.logo.w}
            height={DIMS.logo.h}
            decoding="async"
            className="h-[160px] w-[180px] object-fill"
          />
          <div className="mt-8 flex w-full max-w-[320px] flex-col gap-4">
            {SOCIALS.map(({ label, Icon, href }) => (
              <a key={label} href={href} className="flex items-center gap-4">
                <Icon />
                <span className="text-[16px] font-extrabold text-white">{label}</span>
              </a>
            ))}
          </div>
          <p className="mt-10 text-center text-[12px] font-semibold text-white">
            © Trackshift 2O26 · All rights reserved.
          </p>
          <a href="#" className="mt-2 text-[12px] font-semibold text-white/70">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
