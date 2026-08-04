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
import aboutCar from "./assets/about-car.webp";
import aboutBg from "./assets/about-bg.webp";
import bgPartners from "./assets/bg-partners.webp";
import bgMid from "./assets/bg-mid.webp";
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
  aboutCar,
  aboutBg,
  bgPartners,
  bgMid,
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

// The `Group 58` light plates (plate-a/plate-b/plate-checker) are imported
// directly by components/Glow.jsx, which owns their crop and stacking geometry.

/**
 * Intrinsic dimensions, so components can set width/height and avoid layout
 * shift (CLS). Keys match `A`. These are the 2x bitmap sizes, pinned as
 * width/height in px at CSS size.
 */
export const DIMS = {
  logo: { w: 342, h: 274 },
  aboutCar: { w: 2978, h: 2212 },
  aboutBg: { w: 5146, h: 3272 },
  bgPartners: { w: 3592, h: 2020 },
  bgMid: { w: 4836, h: 2721 },
  card1: { w: 720, h: 504 },
  card2: { w: 720, h: 504 },
  card3: { w: 720, h: 504 },
  ukVisitCard: { w: 1174, h: 652 },
  leadershipCard: { w: 908, h: 796 },
  videoPoster: { w: 2364, h: 1560 },
  partnerMphasis: { w: 875, h: 305 },
  partnerHaas: { w: 610, h: 212 },
  partnerPlaksha: { w: 610, h: 212 },
  partnerHackCulture: { w: 602, h: 210 },
  partnerGeekroom: { w: 602, h: 210 },
  partnerSheBuilds: { w: 602, h: 210 },
};

export default A;
