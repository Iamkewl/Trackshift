# TrackShift 2026 — asset manifest

**Status: resolved.** Every asset is now exported, optimised, and local. `src/assets.js`
imports them, Vite fingerprints them at build time. There is no external dependency
and nothing expires.

The previous revision of this file said the assets could not be downloaded because
the sandbox proxy blocked `figma.com`. That diagnosis was wrong in an instructive
way — see [Why it failed before](#why-it-failed-before).

## What shipped

| `A` key | Figma layer | Node | File | Delivered |
|---|---|---|---|---|
| `logo` | `Tackshift Logo Inverse 1` | 1:34 | `trackshift-logo.webp` | 360×379 · 36 KB |
| `carHero` | `car 1 1` | 1:65 | `car-hero.webp` | 1600×1067 · 88 KB |
| `whatsNewBg` | `image 33` | 1:260 | `whats-new-bg.webp` | 1712×963 · 204 KB |
| `mphasis` | `f1 logo new 1` | 1:39 | `logo-mphasis.webp` | 720×211 · 15 KB |
| `tgrHaas` | `TGRHF1 Team – Logo_CMYK_White_Alt_Hoz 1` | 1:40 | `tgr-haas.svg` | vector · 9 KB |
| `dsBrar` | `DS Brar Center … Lock-up logo` | 1:61 | `logo-ds-brar.webp` | 600×241 · 13 KB |
| `trackGarage` | `image 40` | 1:214 | `track-garage.webp` | 896×597 · 105 KB |
| `trackFree` | `image 39` | 1:221 | `track-free-practice.webp` | 1100×733 · 112 KB |
| `trackPit` | `image 41` | 1:228 | `track-pit-wall.webp` | 936×624 · 136 KB |
| `partnerA` | `image 18/19/20` | 1:120 … | `partner-placeholder.webp` | 610×152 · 12 KB |
| `glowPlateA` | `image 5` | 1:8 | `glow-plate-a.webp` | 736×1308 · 24 KB |
| `glowPlateB` | `image 6` | 1:9 | `glow-plate-b.webp` | 1920×1283 · 33 KB |
| `glowPlateDiag` | `image 2` | 1:6 | `glow-plate-diag.webp` | 2180×1301 · 59 KB |

### The glow plates came from the PDF, not the API

`download_assets` on node `1:9` returns a bitmap from the node's subtree that is
**not** the actual fill — a 716×1420 image with muted colour. The real `image 6`
is 3868×2584, with gold/orange through the middle and magenta/violet/blue on the
right edge. Tuning saturation against the wrong source is unwinnable; check the
aspect ratio against the node's box before trusting an export.

Both plates were instead extracted with `pdfimages -all` from the Figma PDF
export, which embeds the true bitmaps. Ratios confirm identity:

| extracted | ratio | node box | ratio |
|---|---|---|---|
| `img-006` 3868×2584 | 1.497 | `image 6` (1:9) 1924×1282 | 1.501 |
| `img-000` 4407×2631 | 1.675 | `image 2` (1:6) 2185×1297 | 1.684 |

**18.8 MB of source bitmaps → 777 KB shipped (96% reduction).** Everything raster is
WebP q86, resampled with Lanczos to 2× its design size. `tgrHaas` came out of Figma
as real SVG and stayed vector. Intrinsic dimensions are exported as `DIMS` in
`assets.js` so components can set `width`/`height` and avoid layout shift.

## The glow plate is now real

`image 5` (1:8) is a long-exposure light-trail plate: two hot rails dropping from the
top edge, bending outward around 63% down, flaring into a spray across the bottom.
`Glow.jsx` had reconstructed that in SVG from inference alone — and the reconstruction
turned out to be close to exact.

`HeroGlow` now takes `plate` (default `true`) and layers the real bitmap under the SVG
in `screen` blend, with the vector work dropped to 55% opacity. The SVG still carries
the animated structure; the plate supplies the grain and falloff vectors can't express.
`plate={false}` restores pure SVG.

`glowPlateB` (`image 6`) is exported and available but not currently placed.

## Still outstanding

**Partner logos.** The Partners section has six cards; the Figma file only contains
three distinct logo bitmaps, so three cards still share `partnerA`. This is a gap in
the *design file*, not the pipeline — no export can fix it. Supply the missing three
and give each its own key.

## Why it failed before

The earlier session concluded the proxy blocked `figma.com` outright. It didn't. The
allowlist covered `*.figma.com` fine; what looked like a block was CloudFront returning
`403 MissingKey` to an unsigned request against a bucket root — an origin response, not
a proxy denial. The distinguishing signal is at the CONNECT layer: a real proxy block
returns `X-Proxy-Error: blocked-by-allowlist` and never completes a TLS handshake.
Status code alone can't tell the two apart.

Only `figma-alpha-api.s3.us-west-2.amazonaws.com` is genuinely blocked — a different
apex, so no `*.figma.com` entry would ever have covered it. Nothing here needed it.

In the end the assets came down over plain `curl` from `www.figma.com/api/mcp/asset/…`
— the URLs already sitting in the old `assets.js`, still live inside their ~7 day
window. The capability had been there the whole time.
