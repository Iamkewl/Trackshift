import { A } from "../assets";
import SectionHeading from "../components/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-[63px]">
      {/* `car 1 1` with the two stacked gradient scrims from Figma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-321px] h-[1106px]"
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

        <div className="mt-[440px] grid grid-cols-1 gap-x-[24px] gap-y-10 md:grid-cols-2 lg:grid-cols-[360px_360px_264px]">
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
