/**
 * Asset manifest — TrackShift 2026 redesign.
 *
 * Exported from the new Figma file (XZEbZaLnpeggQI3s1auPr2, node-id=0-1
 * "Trackshit landing page"), downsampled to 2x their design size and encoded
 * as WebP q86. Vite fingerprints these at build time, so they get immutable
 * cache headers. To swap one out, drop the new file in ./assets/ and update
 * the import.
 */

import logo from "./assets/trackshift-logo.webp";
import logoFooter from "./assets/trackshift-logo-footer.webp";
import aboutCar from "./assets/about-car.webp";
import aboutBg from "./assets/about-bg.webp";
import card1 from "./assets/card-1.webp";
import card2 from "./assets/card-2.webp";
import card3 from "./assets/card-3.webp";
import ukVisitCard from "./assets/uk-visit-card.webp";
import leadershipCard from "./assets/leadership-card.webp";
import videoPoster from "./assets/video-poster.webp";
import partnerMphasis from "./assets/partner-mphasis.webp";
import partnerHaas from "./assets/partner-haas.webp";
import partnerPlaksha from "./assets/partner-plaksha.webp";
import partnerHackCulture from "./assets/partner-hackculture.webp";
import partnerGeekroom from "./assets/partner-geekroom.webp";
import partnerSheBuilds from "./assets/partner-shebuilds.webp";

export const A = {
  logo,
  logoFooter,
  aboutCar,
  aboutBg,
  card1,
  card2,
  card3,
  ukVisitCard,
  leadershipCard,
  videoPoster,
  partnerMphasis,
  partnerHaas,
  partnerPlaksha,
  partnerHackCulture,
  partnerGeekroom,
  partnerSheBuilds,
};

// The page backdrop plates (glow-hero-a/glow-hero-b/glow-checker/glow-rails/
// glow-partners) are imported directly by components/Glow.jsx, which owns
// their crop, wash and transform geometry. They are the raw Figma source
// bitmaps, NOT flattened exports — see the note at the top of that file.

/**
 * Intrinsic dimensions, so components can set width/height and avoid layout
 * shift (CLS). Keys match `A`. These are the 2x bitmap sizes, pinned as
 * width/height in px at CSS size.
 */
export const DIMS = {
  logo: { w: 342, h: 274 },
  // The footer/legal-line lockup (114:422) is the FULL Figma mark — badge +
  // wordmark + tagline + "in association with" partner row — not a crop of
  // the hero nav mark. Re-exported at 4x (1476×1308) from Figma directly so
  // it renders undistorted at its natural aspect; the old code stretched the
  // hero's badge-only crop into this box via `object-fill`, which squashed it.
  logoFooter: { w: 1476, h: 1308 },
  aboutCar: { w: 2978, h: 2212 },
  aboutBg: { w: 5146, h: 3272 },
  card1: { w: 720, h: 504 },
  card2: { w: 720, h: 504 },
  card3: { w: 720, h: 504 },
  ukVisitCard: { w: 1174, h: 652 },
  leadershipCard: { w: 908, h: 796 },
  videoPoster: { w: 2364, h: 1560 },
  // Partner marks are the Figma source bitmaps (transparent), placed inside
  // their tick boxes by Partners.jsx using the design's own crop transforms.
  partnerMphasis: { w: 1048, h: 335 },
  partnerHaas: { w: 656, h: 213 },
  partnerPlaksha: { w: 3860, h: 1550 },
  partnerHackCulture: { w: 1536, h: 292 },
  partnerGeekroom: { w: 1047, h: 1134 },
  partnerSheBuilds: { w: 200, h: 200 },
};

export default A;
