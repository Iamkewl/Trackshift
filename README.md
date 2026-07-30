# TrackShift 2026 — landing page

Implemented from Figma: **HackCulture--Copy-**, node `1:4` ("Trackshit landing page").

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

There is also **`preview.html`** at the project root: a fully self-contained
build (React bundled in) you can double-click without installing anything.
It goes stale if you edit `src/` — regenerate with `npm run build`, or just use
`npm run dev`.

## Layout

```
src/
├─ TrackShiftLanding.jsx     page shell + section order
├─ tokens.js                 Figma variables (Haas F1 Red / White) + grid metrics
├─ assets.js                 image manifest — see ASSETS.md
├─ index.css                 Tailwind entry
├─ components/
│  ├─ motion.css             the speed-pulse keyframes (documented inline)
│  ├─ SpeedStreak.jsx        red streak + the comet that races along it
│  ├─ paths.js               streak geometry traced from the Figma vectors
│  ├─ SectionHeading.jsx     heading + its streak
│  ├─ Glow.jsx               ambient lighting — `Group 58`, rebuilt in CSS
│  ├─ RedDash.jsx            `Rectangle 20`
│  ├─ CornerTicks.jsx        partner-card L-brackets
│  └─ useInView.js           gates animation to on-screen sections
└─ sections/
   ├─ Hero.jsx               `hero` (1:14)
   ├─ SupportedBy.jsx        `supported by` (1:38)
   ├─ About.jsx              `about` (1:64)
   ├─ Prizes.jsx             `prizes` (1:71)
   ├─ Partners.jsx           `Partners` (1:104)
   ├─ ChallengeTracks.jsx    `challenge tracks` (1:209)
   └─ WhatsNew.jsx           `Whats new` (1:259)
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

**`Whats new v2` (1:233) was dropped.** It duplicates `Whats new` (1:259) — same
heading, same intro paragraph — but its cards carry filler copy
("Customer-Centric Design", "Prioritize user experience by deeply understanding
customer needs"). Read as an abandoned alternate. If it was the intended one,
say so and it goes back in.

**Red vectors are inline SVG, not exported assets.** Normally the wrong call,
but the animation needs a path the code owns. Geometry is traced from isolated
1:1 renders; the resting state matches the design. Full list in ASSETS.md.

**Responsive behaviour is invented.** The Figma has no mobile or tablet frames,
so the 3→2→1 column collapse and the type scaling below `lg` are mine, not the
designer's. Desktop at 1440 is what tracks the design.

**Ambient glow is SVG, not bitmaps.** Figma's `image 5` / `image 6` are
long-exposure light-trail plates: two hot rails drop from the top edge, bend
outward at a vanishing point ~63% down, and flare into a dense spray of streaks
across the bottom. Rebuilt in `components/Glow.jsx` as layered SVG — curved,
radial geometry that stacked CSS gradients cannot express. `Rectangle 1/2/3`
turned out not to be glow at all: they are heavily feathered black rects, i.e.
vignette masks, reproduced as `<Vignette>`.

**Update: the plate is now real.** `image 5` (1:8) was exported and is layered
under the SVG in `screen` blend at 92%, with the vector work dropped to 55%.
The SVG still drives the animation; the bitmap supplies grain and falloff.
`<HeroGlow plate={false} />` restores the pure-SVG version.

Worth recording: the SVG reconstruction was built by inference, without ever
seeing `image 5`. Side by side with the actual plate, the geometry it guessed —
twin rails, outward bend at ~63%, bottom spray — was very close to correct.

**The gutter plus-markers were removed.** Figma's `Group 46` / `Group 47` ran a
column of `+` marks down both margins. Taken out at request.
`components/MarkerRail.jsx` is an orphaned stub — nothing imports it, safe to
delete.

**Partner logos are incomplete.** Six cards, three source bitmaps in the Figma
file — three cards currently share a placeholder. See ASSETS.md.

## Assets

**All local — resolved.** `src/assets.js` imports twelve files from `src/assets/`;
Vite fingerprints them and emits immutable cache headers. No external dependency,
nothing to expire.

Source bitmaps were exported from Figma, resampled to 2× design size and encoded
WebP q86: **18.8 MB → 777 KB (96% smaller)**. Built `dist/` is ~1 MB total, with
the JS bundle at 53 KB gzipped. `DIMS` in `assets.js` carries intrinsic sizes so
components can pin `width`/`height` against layout shift.

One real gap remains: the Partners section needs six logos and the Figma file only
contains three, so three cards share a placeholder. Full detail in ASSETS.md.

## Requirements

- Node 18+
- Tailwind v3 JIT (arbitrary values like `text-[72px]` hold the exact Figma type scale)
- Orbitron 400–900, loaded from Google Fonts in `index.html`
