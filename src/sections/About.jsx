import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-[63px]">
      {/* `car 1 1` with the two stacked gradient scrims from Figma.
          Desktop only: the design overscans it to 1106px and lets the copy sit
          over its faded tail. At phone widths that tail is still bright exactly
          where the paragraphs land, so below lg the car runs in flow instead
          (see below) and overlap becomes impossible rather than tuned. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-321px] hidden h-[1106px] lg:block"
      >
        <img
          src={A.carHero}
          alt=""
          className="h-full w-full scale-[1.48] object-cover"
          style={{ objectPosition: "22% 45%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,0) 47.3%, rgb(0,0,0) 64.8%)," +
              "linear-gradient(180deg, rgba(0,0,0,0) 69.9%, rgb(0,0,0) 89.3%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-[156px]">
        <SectionHeading>
          About
          <br />
          trackshift
        </SectionHeading>

        {/* The same plate, in flow, for everything below lg. */}
        <div
          aria-hidden="true"
          className="relative mt-[30px] h-[240px] overflow-hidden sm:h-[360px] lg:hidden"
        >
          <img
            src={A.carHero}
            alt=""
            className="h-full w-full scale-[1.35] object-cover"
            style={{ objectPosition: "24% 46%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,0) 26%," +
                "rgba(0,0,0,0) 58%, rgb(0,0,0) 100%)",
            }}
          />
        </div>

        <div className="mt-[36px] grid grid-cols-1 gap-x-[24px] gap-y-10 md:grid-cols-2 lg:mt-[440px] lg:grid-cols-[360px_360px_264px]">
          <p className="text-[20px] font-bold uppercase text-white">
            What happens when engineering built for the racetrack is applied
            beyond it?
          </p>
          <p className="text-[16px] font-medium leading-[1.119] text-white">
            In these 24 hours full of adrenaline rushes, India’s most ambitious
            student innovators come together to build solutions inspired by the
            world&apos;s fastest engineering environment. This time, not for the
            track, but for healthcare, cities, climate, manufacturing,
            intelligent systems and beyond.
          </p>
          <p className="text-[16px] font-medium leading-[1.119] text-white">
            The next breakthrough starts with a shift, and it might just come off
            the track. Its lights’ out and away we go!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
