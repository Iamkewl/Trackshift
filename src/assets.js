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
import dsBrar from "./assets/logo-ds-brar.webp";
import trackGarage from "./assets/track-garage.webp";
import trackFree from "./assets/track-free-practice.webp";
import trackPit from "./assets/track-pit-wall.webp";
import partnerA from "./assets/partner-placeholder.webp";
import glowPlateA from "./assets/glow-plate-a.webp";
import glowPlateB from "./assets/glow-plate-b.webp";

export const A = {
  logo,
  carHero,
  whatsNewBg,
  mphasis,
  tgrHaas,
  dsBrar,
  trackGarage,
  trackFree,
  trackPit,
  partnerA,
  // Long-exposure light-trail plates, extracted from the Figma PDF export.
  //   glowPlateA    `image 5` (1:8)  red twin rails + bottom flare
  //   glowPlateB    `image 6` (1:9)  neon streak field — crimson, gold, magenta, violet
  //   `image 2` (1:6) blue/cyan diagonal is composited into page-bg.webp instead
  glowPlateA,
  glowPlateB,
};

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
  partnerA:    { w: 610,  h: 152 },
  glowPlateA:    { w: 736,  h: 1308 },
  glowPlateB:    { w: 1920, h: 1283 },
};

export default A;
