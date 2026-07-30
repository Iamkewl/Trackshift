import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";
import CornerTicks from "../components/CornerTicks";

/**
 * Six cards, six distinct logos. The Figma layer names are misleading — all six
 * cards are copies named `image 18/19/20`, but the *fills* differ, so the names
 * cannot be used to map them. Read the render, not the layer tree.
 */
const PARTNERS = [
  { role: "Industry Partner", src: A.mphasis, alt: "Mphasis Foundation" },
  { role: "Industry Partner", src: A.tgrHaas, alt: "TGR Haas F1 Team" },
  { role: "Host", src: A.dsBrar, alt: "Plaksha University" },
  { role: "Student Club Partner", src: A.partnerStudentClub, alt: "Student club partner" },
  { role: "Implementation Partner", src: A.partnerHackCulture, alt: "HackCulture" },
  { role: "Community Partner", src: A.partnerSheBuilds, alt: "SheBuilds" },
];

export function Partners() {
  return (
    <section id="partners" className="relative pt-[63px]">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <SectionHeading align="center" delay={0.35}>
          Partners
        </SectionHeading>

        <div className="mt-[60px] grid grid-cols-1 justify-items-center gap-x-[70px] gap-y-[52px] sm:grid-cols-2 sm:gap-y-[90px] lg:mt-[96px] lg:grid-cols-3 lg:gap-y-[130px]">
          {PARTNERS.map((p, i) => (
            <div key={i} className="flex w-full max-w-[318px] flex-col items-center">
              <div className="relative aspect-[318/121] w-full bg-white">
                <CornerTicks />
                <img
                  src={p.src}
                  alt={p.alt}
                  className="absolute inset-[7px] h-[calc(100%-14px)] w-[calc(100%-14px)] object-contain"
                />
              </div>
              <p className="mt-[17px] text-center text-[17px] font-bold uppercase text-white lg:text-[20px]">
                {p.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
