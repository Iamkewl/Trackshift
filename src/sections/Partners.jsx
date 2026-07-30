import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";
import CornerTicks from "../components/CornerTicks";

/**
 * Six cards, but the Figma file reuses three bitmaps across them — so three
 * cards currently share `partnerA`. Export each distinct logo (see ASSETS.md)
 * and point them at their own keys.
 */
const PARTNERS = [
  { role: "Industry Partner", src: A.mphasis, alt: "Mphasis Foundation" },
  { role: "Industry Partner", src: A.tgrHaas, alt: "TGR Haas F1 Team" },
  { role: "Host", src: A.dsBrar, alt: "Plaksha University" },
  { role: "Student Club Partner", src: A.partnerA, alt: "Student club partner" },
  { role: "Implementation Partner", src: A.partnerA, alt: "HackCulture" },
  { role: "Community Partner", src: A.partnerA, alt: "SheBuilds" },
];

export function Partners() {
  return (
    <section id="partners" className="relative pt-[63px]">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <SectionHeading align="center" delay={0.35}>
          Partners
        </SectionHeading>

        <div className="mt-[96px] grid grid-cols-1 justify-items-center gap-x-[70px] gap-y-[130px] sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative h-[121px] w-[318px] bg-white">
                <CornerTicks />
                <img
                  src={p.src}
                  alt={p.alt}
                  className="absolute inset-[7px] h-[106px] w-[304px] object-contain"
                />
              </div>
              <p className="mt-[17px] text-[20px] font-bold uppercase text-white">
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
