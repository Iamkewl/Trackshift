# AGENTS.md

TrackShift 2026 — a single-page React 18 / Vite 5 / Tailwind v3 landing page,
implemented from a Figma file (`XZEbZaLnpeggQI3s1auPr2`, node-id 0-1
"Trackshit landing page", Frame 35). No router, no state library, no test or
lint tooling.

## Commands

- `npm run dev` — Vite dev server at http://localhost:5173 (opens automatically)
- `npm run build` — writes gitignored `dist/`; the only compile check that exists
- `npm run build:preview` — regenerates the committed `preview.html`

There is no lint, typecheck, or test script. Verify edits with `npm run build`
plus headless Chrome DOM/geometry checks against the dev server.

## The `preview.html` trap

`preview.html` at the repo root is a fully self-contained build and it **is
committed**. Any `src/` change makes it stale. Regenerate with
`npm run build:preview` (NOT `npm run build`, which only writes `dist/`) and
commit the result. It runs `vite.preview.config.js` + `scripts/build-preview.mjs`
(data-URI assets, one stylesheet, classic IIFE — inline ES modules are
unreliable over `file://`). The script exits non-zero if any local reference
survives, and re-attaches the bundle at the end of `<body>` because a classic
script in `<head>` runs before `#root` exists. Never hand-edit `preview.html`.
Note it still fetches the Orbitron webfont from Google Fonts; that link is
deliberately not inlined.

**`$`-substitution corruption:** the bundle is inlined by passing it as the
*replacement* of `html.replace(/<\/body>/, …)`. `String.replace` expands `$&`
(`$'`, `$``, `$n`) in a string replacement, and React DOM ships the literal
`"$&/"` (its script/style escape) — so a naive string replacement turned it
into `"</body>/"` and silently broke the bundle ("Invalid regular expression
flags" at load). The replacement MUST be a function (`() => …`), never a
template string. This bit the committed `preview.html`; keep it in mind for any
other content-bearing replace.

## Architecture

- `src/main.jsx` → `src/TrackShiftLanding.jsx` (section order) → `src/sections/*`
  (hero → about → problems → prizes → timeline → partners → leadership →
  student words → lookback → apply → FAQs → footer)
- `src/components/` — `SpeedStreak`, `Glow`, `RectFrame`, `Caret`,
  `SideTicks`, `useInView`, …
- `src/tokens.js` — Figma vars (`RED` #D6001C, `WHITE`) + 1440 grid metrics
- `src/assets.js` — image manifest with `DIMS` (intrinsic sizes, pinned as
  `width`/`height` to avoid CLS). The page-backdrop plates
  (`plate-a`/`plate-b`/`plate-checker`/`bg-partners`/`bg-mid`) are imported
  directly by `Glow.jsx`, which owns their crop geometry.
- Every file documents its source Figma node id in a comment (e.g. `image 4`
  `1:7`); red-vector geometry is traced into `src/components/paths.js`.

## Design fidelity rules

- **Desktop 1440 tracks the Figma; everything below `lg` is invented** — the
  design has no mobile frames, and the phone layout already departs from it in
  several places. When changing layout, preserve the 1440 geometry and don't
  undo the phone workarounds.
- Arbitrary Tailwind values carry the exact Figma type scale (`text-[72px]`,
  `px-[156px]`); extend that idiom rather than adding theme tokens.
- **The red pulse is sweep-then-rest, not a crawl.** Each streak draws a dim
  resting path plus a comet (3 stacked strokes) racing through the first ~30%
  of its cycle. `pathLength="100"` normalises the dash math across shapes.
  Tuning lives in `components/motion.css` and in the
  `duration`/`delay`/`strokeWidth`/`restOpacity` props on each `<SpeedStreak>`.
  Animations run only while on-screen (`useInView` → `ts-live`) and are killed
  by `prefers-reduced-motion: reduce`.
- **Glow plates are cropped, not fitted** (`components/Glow.jsx`): a plate box's
  aspect ratio is NOT its bitmap's ratio (e.g. `image 6` is drawn at 297.57%
  height, top-aligned). Match plates against the *inner* image, never the box —
  this exact mistake has happened twice. Every plate and vignette rect is
  `-z-10` (the page root sets `isolate`); the SoftMask inside the hero rig is
  the exception and must not get `-z-10`.
- **The Haas mark ships as a bitmap** (`A.partnerHaas` = `partner-haas.webp`),
  rendered on a white card. The design only contains the white wordmark, so the
  logo is exported directly; no SVG variant pair is maintained anymore.

## Known traps

- `README.md` is the definitive history of every visual decision and past
  failure (streak-overlap fixes, wrong-bitmap picks, geometry math). Read it
  before reworking any section's visuals.
- The Figma file's Frame-80 prize details and FAQ answer boxes contain
  intentional-looking overlaps; the implementation reflows them cleanly rather
  than reproducing the collisions.
- Old design leftovers (`SupportedBy.jsx`, `WhatsNew.jsx`, `prob-img*`,
  `glow-plate-*`, `tgr-haas*.svg`, …) were deleted; the assets manifest in
  `src/assets.js` is the only authority for what ships.
