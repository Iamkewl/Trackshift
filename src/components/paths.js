/**
 * Streak geometry, traced from isolated 1:1 renders of the Figma vectors.
 *
 * These were vector layers in Figma. They are rebuilt as SVG path data rather
 * than exported as images because the pulse animation has to sweep *along* the
 * path — which needs a path the code owns.
 */

/** `Rectangle 22` (1:66, 1:210, 1:261) — left-bleeding parallelogram, angled right end.
 *  Sits under every section heading, and at the hero's bottom-left. */
export const P_BLADE = "M 0 1.6 H 1163 L 1048 95.4 H 0";
export const VB_BLADE = "0 0 1171 97";

/** Mirror of the above, for the hero's bottom-right. */
export const P_BLADE_R = "M 1171 1.6 H 8 L 123 95.4 H 1171";

/** `Rectangle 23 / 24` (1:15, 1:16, 1:72, 1:105) — wide chevron with a centre
 *  plateau that drops off both canvas edges. */
export const P_CHEVRON = "M 0 130 L 200 2 H 1367 L 1567 130";
export const VB_CHEVRON = "0 0 1567 150";
