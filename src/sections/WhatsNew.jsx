import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";
import RedDash from "../components/RedDash";

const POINTS = [
  {
    title: "Applied Innovation Focus",
    body: "Build solutions that can scale beyond the competition and create measurable real world impact.",
  },
  {
    title: "Broader Problem Domains",
    body: "Beyond internships, top teams can continue developing their ideas in Plaksha's research labs.",
  },
  {
    title: "Industry + Academia Collaboration",
    body: "Greater emphasis on mentorship, research, and technology transfer with industry partners.",
  },
  {
    title: "Broader Problem Domains",
    body: "From urban mobility and climate action to AI decision systems and digital trust, innovation extends far beyond the racetrack.",
  },
  {
    title: "Open Innovation Platform",
    body: "open innovation repository, encouraging continued research and collaboration.",
  },
];

export function WhatsNew() {
  return (
    <section className="relative overflow-hidden pb-[70px] pt-[70px]">
      {/* `image 2` (1:6) — the same light-trail plate, mirrored and dimmed */}
      {/* glow now supplied by the page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-28px] top-[146px] h-[599px] w-[856px]"
      >
        <img src={A.whatsNewBg} alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[901px_1fr]">
          <SectionHeading delay={0.25}>
            How is
            <br />
            TrackShift <span className="text-haas-red">2026</span> Different?
          </SectionHeading>

          <div className="flex max-w-[457px] flex-col gap-5 self-end text-[16px] font-medium text-white lg:text-[20px]">
            <p>
              <span className="font-black uppercase text-haas-red">
                TrackShift 2025
              </span>{" "}
              challenged participants to solve problems inspired by the
              motorsport ecosystem. In 2026, the perspective changes completely.
            </p>
            <p>
              Instead of solving for motorsport, participants will use
              motorsport-proven engineering principles to solve real-world
              challenges across AI, sustainability, mobility, climate, and
              intelligent systems.
            </p>
          </div>
        </div>

        <div className="mt-[380px] grid grid-cols-1 gap-x-[24px] gap-y-[59px] md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <div key={i} className="flex max-w-[365px] gap-[14px]">
              <RedDash />
              <div className="flex flex-col gap-[11px] text-white">
                <h3 className="text-[20px] font-extrabold">{p.title}</h3>
                <p className="text-[16px] font-medium">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatsNew;
