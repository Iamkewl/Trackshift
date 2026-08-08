import React, { useState } from "react";
import SpeedStreak from "../components/SpeedStreak";
import Caret from "../components/Caret";
import useInView from "../components/useInView";
import { redPunct } from "../components/RedPunct";
import { P_BLADE_666, VB_BLADE_666 } from "../components/paths";

/**
 * `FAQs` (114:410) — 1440×535, page y 8787. Two columns of Q&A (Frames 78/79).
 *
 * In Figma every answer is hidden and only the questions are drawn — the rows
 * are a collapsed accordion, which is what the `CaretDown-r` on each row is
 * for. Each item here toggles open, one column at a time, so the grid never
 * reproduces the overlap the Figma has if you unhide the answers.
 */

const FAQS = [
  {
    q: "Do I need to know racing to compete?",
    a: "Every problem has a racing story on top and an engineering shape underneath. If you recognise the shape — dynamic resource allocation, real-time decisioning, transfer learning — you're already qualified.",
  },
  {
    q: "What kind of teams do best here?",
    a: "Mixed ones. Last year's finalists had ML engineers, CS undergrads, mechanical students, designers, and one economics major on the same team. The judging weights innovation and real-world impact as much as pure technical execution.",
  },
  {
    q: "Can we form a team across colleges?",
    a: "Yes. Cross-college and cross-discipline teams are explicitly welcome.",
  },
  {
    q: "What do we build?",
    a: "Whatever your team is best equipped to build — a predictive model, a live decision engine, a simulator, a dashboard, a training tool. The problem names the shape. The form is yours.",
  },
  {
    q: "How much does it cost to participate?",
    a: "Nothing. Selected teams travel to Mohali; travel support is available for teams outside NCR. Innovation kits, meals during the event, and stay are covered.",
  },
  {
    q: "Where does our submission go after the finale?",
    a: "Every submission is published open-source under a permissive licence with full team attribution. Industry partners, labs and startups can extend the work.",
  },
];

const LEFT = FAQS.slice(0, 3);
const RIGHT = FAQS.slice(3);

function FaqItem({ faq, id }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center justify-between gap-4 text-left text-[16px] font-extrabold leading-tight text-white transition-colors hover:text-haas-red lg:text-[20px]"
      >
        <span>{redPunct(faq.q)}</span>
        <Caret
          dir="down"
          className={`h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] shrink-0 opacity-90 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Collapse by grid-rows so the answer animates without a fixed height. */}
      <div
        id={id}
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="font-helvetica pt-[12px] sm:pt-[14px] text-[14px] sm:text-[15px] font-normal leading-[1.4] text-white/90 lg:text-[20px] lg:leading-[1.25]">
            {redPunct(faq.a)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [ref, live] = useInView(0);

  return (
    <section
      id="faqs"
      ref={ref}
      className={`relative isolate overflow-hidden bg-black ${live ? "ts-live" : ""}`}
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[546px]">
        <SpeedStreak
          viewBox={VB_BLADE_666}
          d={P_BLADE_666}
          delay={0.12}
          strokeWidth={3}
          restOpacity={0.5}
          className="left-[-246px] top-[99px] -z-10 hidden h-[55px] w-[666px] lg:block"
        />
        <h2 className="relative z-10 px-6 pt-10 text-[clamp(30px,6vw,60px)] font-black uppercase leading-none text-white lg:absolute lg:left-[158px] lg:top-[69px] lg:px-0 lg:pt-0 lg:text-[60px]">
          FAQs
        </h2>

        <div className="relative z-10 grid grid-cols-1 gap-8 px-6 pb-16 pt-8 lg:grid-cols-2 lg:gap-[99px] lg:px-[159px] lg:pb-0 lg:pt-[212px]">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[25px]">
            {LEFT.map((f, i) => (
              <FaqItem key={f.q} faq={f} id={`faq-l-${i}`} />
            ))}
          </div>
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[25px]">
            {RIGHT.map((f, i) => (
              <FaqItem key={f.q} faq={f} id={`faq-r-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
