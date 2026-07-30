# TrackShift 2026 — landing page

Implemented from Figma: **HackCulture--Copy-**, node `1:4` ("Trackshit landing page").

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
├─ TrackShiftLanding.jsx     page shell + section order
├─ tokens.js                 Figma variables (Haas F1 Red / White) + grid metrics
├─ assets.js                 image manifest (provenance in its comments)
├─ index.css                 Tailwind entry
├─ components/
│  ├─ motion.css             the speed-pulse keyframes (documented inline)
│  ├─ SpeedStreak.jsx        red streak + the comet that races along it
│  ├─ paths.js               streak geometry traced from the Figma vectors
│  ├─ SectionHeading.jsx     heading + its streak
│  ├─ Glow.jsx               ambient lighting — `Group 58`, the real plates
│  ├─ PointCarousel.jsx      the `Whats new v2` photo-card carousel
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
   └─ WhatsNew.jsx           `Whats new v2` (1:233)
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

## "How is TrackShift 2026 Different?" is `Whats new v2`

The file carries two takes on this section. `Whats new` (1:259) is a plain text
grid; **`Whats new v2` (1:233) is the one built** — each point on a photo card.

v2 looks like three columns at rest, but it isn't: `Frame 32` sits centred at
x 209 while `Frame 33` and `Frame 34` are parked at x -750 and x 1302, almost
entirely off-canvas. That is a carousel caught mid-slide. It also explains the
filler copy on the two outer cards ("Customer-Centric Design") — they exist to
show what a neighbour looks like peeking in, so the five real points come from
1:259 instead. The heading and intro are identical between the two frames.

On a 1440 canvas the row is 138 peek + 71 gap + 1022 card + 71 gap + 138 peek;
`--card` / `--gap` in `components/PointCarousel.jsx` reproduce that exactly and
compress proportionally below it. Arrows, dots, swipe and arrow-keys all drive it.

## Decisions worth reviewing

**Red vectors are inline SVG, not exported assets.** Normally the wrong call,
but the animation needs a path the code owns. Geometry is traced from isolated
1:1 renders; the resting state matches the design. Geometry lives in
`components/paths.js`.

**Responsive behaviour is invented.** The Figma has no mobile or tablet frames,
so everything below `lg` is mine, not the designer's. Desktop at 1440 is what
tracks the design. The phone layout departs from it in six places, each because
the design's own geometry breaks down at that width:

- the hero logo is centred *between* the nav links at 1440 and lands on top of
  them below `lg`, so it stacks above two rows of links instead;
- `about`'s car plate is overscanned to 1106px and the copy sits over its faded
  tail — at phone widths that tail is still bright exactly where the paragraphs
  land, so the plate runs in flow there and overlap becomes impossible rather
  than tuned;
- the prize-card outline was a fixed 120px box that five- and six-line
  paragraphs spilled straight out of; it now stretches to its copy;
- the carousel card relaxes from 1022×461 (2.22:1) to 16:10, and its caption
  bottom-anchors rather than pinning to 69.2%, so it fits any aspect.

The last two are both the same failure — **a fixed-size red streak against copy
that grew** — and they are the ones that actually looked broken:

- **The hero streak stack.** It owns the bottom ~296px of the hero, and at 1440
  the copy stops well clear of it, so the design never reveals an answer. On a
  phone the copy ran to the hero's *exact* bottom edge (measured: content ended
  at 911px in a 911px hero — zero clearance), so the blades and chevrons cut
  straight through the date, the venue and the button. The hero now reserves that
  band with `pb`, and below `lg` the blades tuck into the gap between the copy and
  the chevrons. Note the streaks were already *behind* the text in z-order —
  `-z-10` was not the fix, and a red line through a paragraph reads as "on top"
  regardless of who wins the paint.
- **The section-heading blade.** A fixed 97px box, sized for the design's
  two-line 48px headings. Below `lg` they wrap to three and four lines — "How is
  TrackShift 2026 Different?" reaches 144px — so the blade's lower edge landed
  mid-heading and read as a strikethrough. Below `lg` the whole blade lifts above
  the heading into the section's top padding. (Stretching it to match the heading
  was the first instinct, but an absolutely positioned SVG sized by both `top` and
  `bottom` is unreliable — replaced elements resolve `height: auto` from their
  intrinsic size and ignore the second offset.)

**Ambient light is the real `Group 58`, not a reconstruction.** All four plates
(`image 2/4/5/6`) are exported and positioned at their Figma geometry — see
"The background" below. `Rectangle 1/2/3` are not glow at all: they are
100px-blurred black rects, i.e. vignette masks, reproduced as `<SoftMask>`.

**The gutter plus-markers were removed.** Figma's `Group 46` / `Group 47` ran a
column of `+` marks down both margins. Taken out at request.

**Partner logos are complete.** All six are the real marks. They were long thought
missing because `download_assets` on the individual `image 18/19/20` nodes returns
a shared lockup; querying the whole `Partners` frame (1:104) returns all eight
bitmaps. The layer names repeat across all six cards while the fills differ, so
they have to be matched against the render rather than the layer tree.

**The Haas mark ships in two variants, because the design uses two.** Figma only
contains `Logo_CMYK_White_Alt_Hoz` — a wordmark of 15 white-filled paths plus two
`#DC1F26` reds. That is correct on the dark "Supported by" strip and invisible on
the white Partners card, where only the red circle and the red `R` survived.
`tgr-haas-dark.svg` is that same file with its white fills recoloured black and
the reds untouched; `SupportedBy` uses `A.tgrHaas`, `Partners` uses
`A.tgrHaasDark`. The `H` inside the circle is a knockout rather than a white
shape, so it still reads as the card colour in both. Measured against the Figma
render of that card: 10.2% black / 67.9% white against the design's 9.7% / 68.4%.

If the artwork is ever re-exported, regenerate the dark variant rather than
hand-editing it — it is a pure `fill="white"` → `fill="black"` substitution.

## The background

`Group 58` (1:5) is one light rig spanning the whole 1440×7662 page. It used to
be flattened into a single `page-bg.webp` pinned at y=1066; that is gone. Each
plate now lives on the section it lights, so the glow stays with its content at
any viewport width instead of drifting the moment a section reflows.

Three things had been wrong, and all three came from the same root cause —
**several plates are cropped, not fitted**, so a plate's box aspect ratio is not
its bitmap's aspect ratio:

- **`image 4` (1:7) was missing entirely.** Its metadata `x` reads 1440, which
  looks off-canvas; it is actually rotated 90°, and `get_design_context` puts it
  at left -610. It is the warm wash behind Prizes/Partners, which is why that
  whole band of the page rendered flat black against a design that glows there.
- **`image 6` (1:9) was the wrong bitmap.** It had been identified by matching a
  candidate against the *box* ratio (1.50); the box is 1924×1282 but the bitmap
  inside it is drawn at 297.57% height and top-aligned, so only its top third is
  ever visible. The real fill is 716×1420 (0.504), matching the inner image. The
  `saturate`/`brightness` constants that used to sit in `Glow.jsx` existed only
  to bend the wrong bitmap toward the design, and are gone.
- **An invented `<Vignette>` sat over the hero.** Nothing in `Group 58`
  corresponds to it, and it was crushing the plate's edge light to roughly a
  third of its brightness. Measured against the Figma render at the right
  margin, the hero now reads 26.4/22.5/17.5 against the design's 27.8/23.7/18.7.

`image 5` (1:8) was already correct, and is drawn at opacity 0.49.

## Assets

**All local — resolved.** Every asset is a file in `src/assets/`, imported through
`src/assets.js` (the four `glow-plate-*` files are the exception: `Glow.jsx` imports
them directly, since it owns their crop geometry). Vite fingerprints them and emits
immutable cache headers. No external dependency, nothing to expire.

Source bitmaps came out of Figma as WebP q86. `DIMS` in `assets.js` carries intrinsic
sizes so components can pin `width`/`height` against layout shift, and each entry
carries its Figma node id in a comment.

Nothing is outstanding — every image in the design is exported, local and placed.

**When an export looks wrong, suspect the query before the pipeline.** Both
long-standing "unfixable" asset gaps here turned out to be the wrong node being
asked: the `image 6` plate (matched against its box rather than its inner image),
and the three Partners logos believed absent from the design file.

## Requirements

- Node 18+
- Tailwind v3 JIT (arbitrary values like `text-[72px]` hold the exact Figma type scale)
- Orbitron 400–900, loaded from Google Fonts in `index.html`
