import { LookbackGlow } from "../components/Glow";
import useInView from "../components/useInView";
import { redPunct } from "../components/RedPunct";

/**
 * `Apply` (114:397) — 1440×467, page y 8309. The closing CTA: the three stat
 * stacks (15o students / 5o teams / 1 weekend), the applications-close line,
 * and the red Apply button. Numbers keep the zero-as-letter-O spelling.
 */

const STATS = [
  { value: "15o", label: "students", x: 224, center: 362.5 },
  { value: "5o", label: "teams", x: 631, center: 719.5 },
  { value: "1", label: "weekend", x: 961, center: 1088 },
];

export function Apply() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="apply"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[478px]">
        {/* `image 68` runs past the Lookback clip into this section. */}
        <LookbackGlow className="hidden lg:block" f={-1117} />
        {/* Desktop stats — absolute at the design's coordinates. */}
        <div className="relative z-10 hidden lg:block">
          {STATS.map((s) => (
            <div key={s.label} className="absolute flex flex-col items-center" style={{ left: s.x, top: 74 }}>
              <span className="text-[71.5px] font-black uppercase leading-[0.9] text-haas-red">{s.value}</span>
              <span className="mt-[8px] text-[42.9px] font-extrabold uppercase leading-none text-white">
                {s.label}
              </span>
            </div>
          ))}
          <p className="font-helvetica absolute left-1/2 top-[258px] -translate-x-1/2 text-[32px] text-white">
            {redPunct("Applications close 22 August.")}
          </p>
          <a
            href="#apply"
            className="absolute left-1/2 top-[348px] flex h-[77px] w-[299px] -translate-x-1/2 items-center justify-center bg-haas-red text-[36px] font-extrabold uppercase text-white transition-transform hover:scale-[1.02]"
          >
            Apply now
          </a>
        </div>

        {/* Mobile stats — reflowed row. */}
        <div className="relative z-10 flex flex-col items-center px-6 pb-16 pt-14 lg:hidden">
          <div className="flex w-full max-w-[420px] items-start justify-between gap-2">
            {STATS.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-col items-center">
                <span className="text-[clamp(28px,8vw,40px)] font-black uppercase leading-none text-haas-red">{s.value}</span>
                <span className="mt-2 text-[clamp(12px,4vw,22px)] font-extrabold uppercase text-white">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="font-helvetica mt-10 text-center text-[clamp(17px,5vw,24px)] text-white">
            {redPunct("Applications close 22 August.")}
          </p>
          <a
            href="#apply"
            className="mt-8 flex h-[64px] w-full max-w-[299px] items-center justify-center bg-haas-red text-[30px] font-extrabold uppercase text-white"
          >
            Apply now
          </a>
        </div>
      </div>
    </section>
  );
}

export default Apply;
