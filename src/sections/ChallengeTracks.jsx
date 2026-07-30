import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";
import { DiagGlow, SoftMask } from "../components/Glow";

const TRACKS = [
  {
    img: A.trackGarage,
    title: "The Garage",
    kicker: "Where engineering ideas are born.",
    body: [
      "Inspired by the design, testing, and development before race day,",
      "The Garage challenges participants to build innovative solutions from the ground up through experimentation, precision, and continuous improvement.",
      "Problem statements coming soon.",
    ],
  },
  {
    img: A.trackFree,
    title: "Free Practice",
    kicker: "Test. Learn. Build for resilience",
    body: [
      "Just as motorsport teams simulate every possible scenario before the race.",
      "Free Practice is about designing systems that can adapt, recover, and perform reliably in the face of uncertainty.",
      "Problem statements coming soon.",
    ],
  },
  {
    img: A.trackPit,
    title: "Pit Wall",
    kicker: "Where data drives every decision.",
    body: [
      "The Pit Wall is the strategic command center of motorsport, where split-second decisions are made using live data and analytics.",
      "Problem statements coming soon.",
    ],
  },
];

export function ChallengeTracks() {
  return (
    // No overflow-hidden here: `image 2` is designed to bleed past this section
    // at both ends, and the page root already clips horizontally.
    <section id="tracks" className="relative pt-[70px]">
      {/* `image 2` (1:6) — page y 3706 against a section starting at 3988 */}
      <DiagGlow className="top-[-282px] h-[1297.478px] w-[2185.506px]" />
      {/* `Rectangle 3` (1:12) — page y 3959 */}
      <SoftMask
        className="top-[-29px] -z-10 h-[763px] w-[109.653%]"
        style={{ marginLeft: "-0.035%" }}
      />
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <SectionHeading delay={0.1}>
          challenge
          <br />
          tracks
        </SectionHeading>

        <div className="mt-[83px] grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((t) => (
            <article key={t.title} className="flex flex-col gap-[16px]">
              <div className="group h-[295px] w-full overflow-hidden bg-white">
                <img
                  src={t.img}
                  alt=""
                  className="h-full w-full scale-[1.25] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.34]"
                />
              </div>
              <h3 className="text-[32px] font-black uppercase leading-none text-white">
                {t.title}
              </h3>
              <div className="flex flex-col gap-[10px]">
                <p className="max-w-[278px] text-[20px] font-black uppercase text-haas-red">
                  {t.kicker}
                </p>
                {t.body.map((line, i) => (
                  <p key={i} className="text-[16px] font-medium text-white">
                    {line}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChallengeTracks;
