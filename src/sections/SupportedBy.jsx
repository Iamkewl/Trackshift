import { A } from "../assets";
import SpeedStreak from "../components/SpeedStreak";
import useInView from "../components/useInView";
import { P_BLADE, VB_BLADE } from "../components/paths";

const LOGOS = [
  { src: A.mphasis, alt: "Mphasis Foundation", w: 360, h: 115, plate: true },
  { src: A.tgrHaas, alt: "TGR Haas F1 Team", w: 360, h: 117, plate: false },
  {
    src: A.dsBrar,
    alt: "DS Brar Center for Girls and Women in STEM",
    w: 300,
    h: 121,
    plate: false,
  },
];

export function SupportedBy() {
  const [ref, live] = useInView();

  return (
    <section ref={ref} className={`relative overflow-hidden py-[19px] ${live ? "ts-live" : ""}`}>
      {/* `Rectangle 2` (1:11) */}
      {/* glow now supplied by the page background in TrackShiftLanding */}
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <div className="relative">
          <SpeedStreak
            viewBox={VB_BLADE}
            d={P_BLADE}
            duration={3.6}
            className="left-1/2 top-[35px] h-[35px] w-[522px] -translate-x-1/2"
          />
          <h2 className="relative text-center text-[32px] font-black uppercase leading-none text-white lg:text-[48px]">
            Supported by
          </h2>
        </div>

        <div className="mt-[73px] flex flex-wrap items-center justify-center gap-x-[52px] gap-y-10">
          {LOGOS.map((l) => (
            <div
              key={l.alt}
              className={`flex items-center justify-center ${l.plate ? "bg-white" : ""}`}
              style={{ width: l.w, height: l.h }}
            >
              <img
                src={l.src}
                alt={l.alt}
                className={
                  l.plate
                    ? "h-[75.65%] w-[82.73%] object-contain"
                    : "h-full w-full object-contain"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportedBy;
