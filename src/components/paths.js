/**
 * Streak geometry, traced from the new Figma file's vectors
 * (XZEbZaLnpeggQI3s1auPr2, "Trackshit landing page").
 *
 * These were vector layers in Figma. They are rebuilt as SVG path data rather
 * than exported as images because the pulse animation has to sweep *along* the
 * path — which needs a path the code owns.
 *
 * Every blade is the same parallelogram family: the top-left corner is cut back
 * by `n` and the bottom-right corner by the same `n`, so the shape leans one
 * way. `d` strings are copied from the Figma `vectorNetwork`/`fillGeometry`.
 */

/** Hero `Rectangle 21/22` (114:119, 114:120) — 824×93 blade pair, off-canvas left/right. */
export const P_BLADE_824 = "M 126.598 0 H 824 L 697.402 93 H 0 Z";
export const VB_BLADE_824 = "0 0 824 93";

/** About `Rectangle 22` (114:169) — 1171×97, the longest blade. */
export const P_BLADE_1171 = "M 131.378 0 H 1171 L 1039.62 97 H 0 Z";
export const VB_BLADE_1171 = "0 0 1171 97";

/** Problems `Rectangle 22` (114:177) — 713×67. */
export const P_BLADE_713 = "M 91.6204 0 H 712.62 L 621 67 H 0 Z";
export const VB_BLADE_713 = "0 0 713 67";

/** Prizes `Rectangle 26/25` (114:228, 114:229) — 558×37 / 568×27. */
export const P_BLADE_558 = "M 49.4769 0 H 558 L 508.523 37 H 0 Z";
export const VB_BLADE_558 = "0 0 558 37";
export const P_BLADE_568 = "M 35.565 0 H 567.5 L 531.935 27 H 0 Z";
export const VB_BLADE_568 = "0 0 568 27";

/** Prizes `Rectangle 22` (114:227) — 317×27. */
export const P_BLADE_317 = "M 35.565 0 H 317 L 281.435 27 H 0 Z";
export const VB_BLADE_317 = "0 0 317 27";

/** Section-heading blades `Rectangle 22` — 791×55 (leadership), 975×55 (student
 *  words), 666×55 (FAQs). All share the 74.72 notch of the 791 leader. */
export const P_BLADE_791 = "M 74.7203 0 H 791.221 L 716.5 55 H 0 Z";
export const VB_BLADE_791 = "0 0 791 55";
export const P_BLADE_975 = "M 74.7203 0 H 975 L 900.28 55 H 0 Z";
export const VB_BLADE_975 = "0 0 975 55";
export const P_BLADE_666 = "M 74.7203 0 H 666 L 591.28 55 H 0 Z";
export const VB_BLADE_666 = "0 0 666 55";

/**
 * `Rectangle 24` — the wide red frame under hero/timeline/partners/prizes
 * section headings (1567×150, sw 1–2). In this file it is a plain rectangle
 * (the old file's was a chevron). Drawn inset 1 so the stroke stays inside the
 * viewBox; the top/left edge is nudged further for the hero's sw1 variant via
 * the JSX.
 */
export const P_RECT_1567 = "M 1 1 H 1566 V 149 H 1 Z";
export const VB_RECT_1567 = "0 0 1567 150";

/** Timeline `Vector 40` (114:253) — 1px vertical rule, and `Rectangle 20/25`
 *  (114:254, 114:255) — the 33×5 red dashes. */
export const P_TL_LINE = "M 0 0 V 156";
export const P_TL_DASH = "M 7.56942 0 L 33 0 L 25.4306 5 L 0 5 Z";
export const VB_TL_DASH = "0 0 33 5";

/** Hero `Rectangle 24` (114:115 desktop / 233:154 mobile) — the open up/
 *  across/down bracket that frames the CTA buttons. Unlike the closed
 *  parallelogram blades, this one has no top/bottom edge, just the two
 *  diagonal legs and the flat span between them. */
export const P_HERO_BRACKET = "M 1567.3 150.5 L 1363 0.5 L 204.595 0.5 L 0.295914 150.5";
export const VB_HERO_BRACKET = "0 0 1567.59 150.903";
