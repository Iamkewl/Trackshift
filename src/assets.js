/**
 * Asset manifest.
 *
 * All assets are now LOCAL and bundled by Vite — no external dependency, no
 * expiring URLs. Source files were exported from Figma
 * (file VALTpuAKAamoXKWDb30mhf), downsampled to 2x their design size, and
 * encoded as WebP q86. Combined raster weight: ~777 KB (from ~18.8 MB).
 *
 * Vite fingerprints these at build time, so they get immutable cache headers.
 * To swap one out, drop the new file in ./assets/ and update the import.
 */

import logo from "./assets/trackshift-logo.webp";
import carHero from "./assets/car-hero.webp";
import whatsNewBg from "./assets/whats-new-bg.webp";
import mphasis from "./assets/logo-mphasis.webp";
import tgrHaas from "./assets/tgr-haas.svg";
import tgrHaasDark from "./assets/tgr-haas-dark.svg";
import dsBrar from "./assets/logo-ds-brar.webp";
import trackGarage from "./assets/track-garage.webp";
import trackFree from "./assets/track-free-practice.webp";
import trackPit from "./assets/track-pit-wall.webp";
import partnerStudentClub from "./assets/partner-student-club.webp";
import partnerHackCulture from "./assets/partner-hackculture.webp";
import partnerSheBuilds from "./assets/partner-shebuilds.webp";
import cardPitLane from "./assets/card-pit-lane.webp";

export const A = {
  logo,
  carHero,
  whatsNewBg,
  mphasis,
  // Two variants of the same mark, as the design uses. Figma ships only the
  // `White_Alt` artwork, whose wordmark is 15 white-filled paths — correct on
  // the dark "Supported by" strip, invisible on the white Partners card, where
  // only the red circle and the red `R` survive. `tgrHaasDark` is that file with
  // its white fills recoloured black; the two `#DC1F26` reds are untouched.
  tgrHaas,
  tgrHaasDark,
  dsBrar,
  trackGarage,
  trackFree,
  trackPit,
  // The Partners bottom row. `download_assets` on the individual `image 18/19/20`
  // nodes returns a shared "TRACKSHIFT 2026 | Plaksha University" lockup, which is
  // why these were long believed missing — querying the whole `Partners` frame
  // (1:104) surfaces all eight bitmaps, including these three.
  partnerStudentClub,
  partnerHackCulture,
  partnerSheBuilds,
  // `image 37` (1:239) — the photo behind every "How is TrackShift 2026
  // Different?" carousel card.
  cardPitLane,
};

// The `Group 58` light-trail plates (glow-plate-a/b/mid/diag) are imported
// directly by components/Glow.jsx, which owns their crop and stacking geometry.

/**
 * Intrinsic dimensions, so components can set width/height and avoid layout
 * shift (CLS). Keys match `A`.
 */
export const DIMS = {
  logo:        { w: 360,  h: 379 },
  carHero:     { w: 1600, h: 1067 },
  whatsNewBg:  { w: 1712, h: 963 },
  mphasis:     { w: 720,  h: 211 },
  dsBrar:      { w: 600,  h: 241 },
  trackGarage: { w: 896,  h: 597 },
  trackFree:   { w: 1100, h: 733 },
  trackPit:    { w: 936,  h: 624 },
  partnerStudentClub: { w: 511, h: 512 },
  partnerHackCulture: { w: 384, h: 73 },
  partnerSheBuilds:   { w: 200, h: 200 },
  cardPitLane: { w: 1100, h: 733 },
};

export default A;
