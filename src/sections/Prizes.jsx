import SectionHeading from "../components/SectionHeading";

/** `Vector 4` + `Vector 5` (1:77, 1:78) — a deliberately broken HUD bracket. */
function PrizePool() {
  return (
    <div className="relative mx-auto mt-[53px] w-full max-w-[842px]">
      <svg
        viewBox="0 0 842 192"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M 352 3 H 31 A 28 28 0 0 0 3 31 V 161 A 28 28 0 0 0 31 189 H 752"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 655 3 H 811 A 28 28 0 0 1 839 31 V 161 A 28 28 0 0 1 811 189 H 788"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="absolute left-1/2 top-[-22px] -translate-x-1/2 whitespace-nowrap bg-black px-4 text-[24px] font-black uppercase text-white lg:text-[33px]">
        Prize pool
      </p>
      <p className="relative py-[34px] text-center text-[52px] font-extrabold text-white lg:text-[106px]">
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,.55)" }}
        >
          INR
        </span>{" "}
        1,75,000
      </p>
    </div>
  );
}

/** `Vector 10`–`Vector 14` — label tab plus an open outline that wraps the copy. */
function PrizeCard({ label, tabWidth = 220, children }) {
  return (
    <div className="relative w-full max-w-[360px] pt-[45px]">
      <div className="absolute left-0 top-0 border border-b-[3.6px] border-haas-red px-[18px] pb-[11px] pt-[9px]">
        <span className="whitespace-nowrap text-[16px] font-extrabold text-white lg:text-[20px]">
          {label}
        </span>
      </div>

      <svg
        viewBox="0 0 360 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-0 top-[22px] h-[120px] w-full"
      >
        <path
          d={`M ${tabWidth} 2 H 344 A 14 14 0 0 1 358 16 V 104 A 14 14 0 0 1 344 118 H 0`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <p className="relative pr-[16px] pt-[10px] text-[14px] font-medium text-white">
        {children}
      </p>
    </div>
  );
}

export function Prizes() {
  return (
    <section id="prizes" className="relative pt-[63px]">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <SectionHeading align="center" delay={0.2}>
          Prizes
        </SectionHeading>

        <PrizePool />

        <div className="mt-[100px] flex flex-wrap justify-center gap-x-[22px] gap-y-[54px]">
          <PrizeCard label="Global Exposure" tabWidth={185}>
            A{" "}
            <span className="font-black">
              fully sponsored UK visit to the TGR Haas F1 Team facility
            </span>
            , offering firsthand exposure to elite Formula 1 engineering and
            innovation.
          </PrizeCard>

          <PrizeCard label="Research Opportunities" tabWidth={252}>
            Top 5–6 teams to receive research or internship opportunities in
            Plaksha University’s research labs for 6–12 months, to further
            develop and scale prototypes
          </PrizeCard>

          <PrizeCard label="Internships" tabWidth={140}>
            A one-month opportunity at Mphasis, Bangalore, working hands-on with
            live AI and innovation projects.
          </PrizeCard>

          <PrizeCard label="Mentorship" tabWidth={140}>
            Learn directly from industry experts, academic leaders, and TGR Haas
            F1 Team Representative
          </PrizeCard>

          <PrizeCard label="Perks" tabWidth={96}>
            Receive innovation kits and certificates, while connecting and
            networking with global technology leaders.
          </PrizeCard>
        </div>
      </div>
    </section>
  );
}

export default Prizes;
