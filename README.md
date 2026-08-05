# TrackShift 2026 — landing page

Implemented from Figma: **XZEbZaLnpeggQI3s1auPr2**, node-id `0-1` ("Trackshit landing page", Frame 35).

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # -> dist/
npm run build:preview  # -> preview.html
```

There is also **`preview.html`** at the project root: a fully self-contained
build you can double-click without installing anything — React, the CSS and
every image are inlined, so the only thing it fetches is the Orbitron webfont.

It goes stale whenever `src/` changes. Regenerate with **`npm run build:preview`**
(*not* `npm run build`, which only writes `dist/`). That runs
`vite.preview.config.js` — data-URI assets, a single stylesheet, and a classic
IIFE bundle rather than an ES module, since inline modules are unreliable over
`file://` — then folds the output into one file with `scripts/build-preview.mjs`.

Two details that script exists to get right: it re-attaches the bundle at the end
of `<body>`, because a classic script left in Vite's `<head>` slot runs before
`#root` exists and React dies with error #299 on a blank page; and it exits
non-zero if any local reference survives, so a half-inlined file cannot ship
silently.

## Layout

```
src/
├─ TrackShiftLanding.jsx     page shell + section order (hero → about → problems
│                            → prizes → timeline → partners → leadership → student
│                            words → lookback → apply → FAQs → footer)
├─ tokens.js                 Figma variables (Haas F1 Red / White) + grid metrics
├─ assets.js                 image manifest (`A` + `DIMS`), provenance in comments
├─ index.css                 Tailwind entry + `.font-helvetica` / `.font-headland`
├─ components/
│  ├─ motion.css             the speed-pulse keyframes (documented inline)
│  ├─ SpeedStreak.jsx        red streak + the comet that races along it
│  ├─ paths.js               streak geometry traced from the Figma vectors
│  ├─ Glow.jsx               the page's ambient plates, anchored per section
│  ├─ RectFrame.jsx          `Rectangle 1` outline frame (hero + Timeline)
│  ├─ Caret.jsx              FAQ/CTA caret chevron
│  ├─ SideTicks.jsx          partner-card L-brackets
│  └─ useInView.js           gates animation to on-screen sections
└─ sections/
   ├─ Hero.jsx               `hero` (114:98) + nav + stats
   ├─ About.jsx              `about` (114:165)
   ├─ Problems.jsx           `problems` (114:175) — three photo cards
   ├─ Prizes.jsx             `prizes` (114:219)
   ├─ Timeline.jsx           `Timeline` (114:250)
   ├─ Partners.jsx           `Partners` (114:268) — Mphasis + five small cards
   ├─ Leadership.jsx         `leadership` (114:355)
   ├─ StudentWords.jsx       `student words` (114:374)
   ├─ Lookback.jsx           `lookback` (114:390) — aftermovie + Frame
   ├─ Apply.jsx              `Apply` (114:397)
   ├─ FAQ.jsx                `FAQs` (114:410)
   └─ Footer.jsx             `Footer` (114:421)
```

## The red pulse

Every red streak in the Figma file is a static outline. Each is now drawn twice:
a dim resting path that matches the design exactly, plus a bright comet that
races along the identical path — three stacked strokes with staggered delays and
falling opacity and width (head, body, tail), which is what sells the motion
blur.

`pathLength="100"` on each path normalises the dash maths, so one keyframe set
drives every shape regardless of its real length. The sweep occupies only the
first 30% of the cycle: it whips through, then rests. A continuous crawl reads
as "loading", not "speed".

`IntersectionObserver` adds `ts-live` to gate the animation to on-screen
sections; `prefers-reduced-motion: reduce` disables it entirely.

Tuning lives in two places — `components/motion.css` for the curve and timing,
and the `duration` / `delay` / `strokeWidth` / `restOpacity` props on each
`<SpeedStreak>`.

## Decisions worth reviewing

**Desktop 1440 tracks the Figma; everything below `lg` is invented.** The new
file has no mobile frames either. Section boxes are `lg:min-h-[…]` — never
fixed `lg:h-[…]` — because the design's own children overflow their frames
(see the two reflows below), and `overflow-hidden` on the `<section>` clips at
the box. Each section positions its children at page-y coordinates translated
into the section; the sections tile flush, absorbing the small gaps between
Figma's own frames.

**Laptop widths (1024–1439) scale the 1440 layout down, they don't reflow it.**
Every desktop section positions its children at absolute 1440px coordinates, so
below 1440 the right-anchored elements (nav links, Timeline Day 2, the She
Builds mark, footer socials) overflowed the viewport and were clipped while
centre-anchored copy drifted relative to them — spacing visibly broke on a
smaller laptop. `useDesktopScale` fixes this by applying the CSS `zoom`
`viewport/1440` (clamped to 1) to the page root on `lg` and up, scaling the
whole coordinate system — geometry AND type — so the 1440 render is preserved
exactly and merely reduced on narrower laptops. It is driven from JS
(`window.innerWidth`) because a CSS-only `100vw/1440` would also shrink the
mobile layout, and `zoom` on `<html>` changes how media queries resolve; below
`lg` the scale stays 1 and the fluid mobile layout is untouched.

**The Figma frame geometry is trusted per-section, not globally.** Frame 35's
children have ~11–22px gaps between them and a handful of absolute children that
genuinely overflow their frame (they paint over the next section in the source).
Per-section anchoring keeps each block correct without reproducing the
collisions.

**The Frame-80 prize details and the FAQ answer boxes are reflowed, not
reproduced.** In Figma the prize "all participants get" rows overlap each other,
and the FAQ answers overrun the next question row. Both are implemented as clean
stacked/gridded blocks — the obvious intent — with the detail lines nudged to
fit inside the section box so `overflow-hidden` cannot eat them.

**Timeline day copy is one wrapped text node, not a list.** Figma renders each
day's schedule as a single 509px text that wraps to 3 / 2 lines. An earlier
bullet-list version ran tall enough to clip at the section's bottom edge; the
items are now `DAY1.join(" · ")` paragraphs that wrap exactly like the design.

**Glow plates are anchored to their sections.** Each plate (`image 2/4/5/6` +
partners/mid) is exported and positioned at its Figma box relative to the
section it lights, so a glow stays with its content if a section reflows. Every
plate is `-z-10`; the page root sets `isolate`, so `-z-10` resolves against
that stacking context and paints above the root's black background but below
the section copy. Sections carry `overflow-hidden` to clip each plate to its
own band.

**Cropped, not fitted.** A plate box's aspect ratio is NOT its bitmap's ratio
(e.g. `image 6` is drawn at 297.57% height, top-aligned). Match plates against
the *inner* image, never the box — this exact mistake happened twice in the old
design, and the new `Glow.jsx` pins each plate's box from the Figma metadata
rather than guessing from the bitmap.

**The Haas mark ships as a bitmap.** `A.partnerHaas` = `partner-haas.webp`,
rendered on a white card. The design only contains the white wordmark, so the
logo is exported directly; the old SVG variant pair is gone.

**Zero-as-letter-O strings are preserved verbatim.** "2O26", "1,75,OOO",
"o1"/"o2", "15o/5o", "Top 8–1O" are all intentional; don't "fix" them.

## Known failures (read before reworking)

**The `$`-substitution corruption in `build-preview.mjs`.** The bundle is
inlined by passing it as the *replacement* of `html.replace(/<\/body>/, …)`.
`String.replace` expands `$&` / `$'` / ``$` `` / `$n` in a string replacement,
and React DOM ships the literal `"$&/"` (its script/style escape). A naive
template-string replacement turned it into `"</body>/"` inside the emitted JS,
which broke at parse time with "Invalid regular expression flags" and rendered
`preview.html` as a blank page. The replacement must be a function (`() => …`),
never a string/template. This silently corrupted the committed `preview.html`;
it is fixed and now verified in headless Chrome.

**The prize details clipped below the section.** With all content absolutely
positioned, a `min-h` container does not grow, and the section's
`overflow-hidden` cut the fourth detail line. The details are squeezed to fit
inside the box (`gap-[26px]`) and the section was given a little slack rather
than resized to the Figma's exact 1227px.

**The FAQ section clipped its own answers.** The Q&A grid sat absolutely inside
a `min-h-[535px]` box, so the answer text ran past the section edge and was
hidden. The grid is now in-flow with `lg:pt-[212px]`, so the section grows to
its content (~713px).

**Stale files were deleted** — `SupportedBy.jsx`, `WhatsNew.jsx`, `prob-img*`,
`glow-plate-*`, `tgr-haas*.svg`, and the orphaned track/car plates. The assets
manifest in `src/assets.js` is the only authority for what ships.

## The background

Each of the five plates (`plate-a` / `plate-b` / `plate-checker` / `bg-partners`
/ `bg-mid`) is a stretched photo with its gradient wash baked into the export —
no crop math or CSS overlay gradients. `image 5`'s node opacity (0.49) is
applied in CSS, not baked in.

## Assets

Every asset is a file in `src/assets/`, imported through `src/assets.js` (the
five backdrop plates are the exception: `Glow.jsx` imports them directly, since
it owns their crop geometry). Vite fingerprints them and emits immutable cache
headers. No external dependency, nothing to expire.

Source bitmaps came out of Figma as WebP q86. `DIMS` in `assets.js` carries
intrinsic sizes so components can pin `width`/`height` against layout shift.

## Requirements

- Node 18+
- Tailwind v3 JIT (arbitrary values like `text-[48px]` hold the exact Figma type scale)
- Orbitron 400–900 + Headland One, loaded from Google Fonts in `index.html`
