# Changelog

All notable changes to **react-next-loader** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] — 2026-10-14

25 new loaders — including a family of 11 AI sparkles — a new `inline` prop
that fits any loader inside a button, and a round of bug fixes.

### Added

- **AI sparkle family (11 designs).** Four-point "AI" sparkles built on one
  shared shape (a CSS mask, so any number of instances can share a page without
  SVG id clashes). All follow `color`, and all fit in buttons with `inline`.
  - **`AISparkle`** (`ai-sparkle`) — Gemini-style stars twinkling in turn.
  - **`SparkleSpin`** (`sparkle-spin`) — one sparkle turning and breathing; the
    go-to loader for buttons.
  - **`SparklePulse`** (`sparkle-pulse`) — a beating sparkle sending out halo rings.
  - **`SparkleOrbit`** (`sparkle-orbit`) — three small sparkles circling a central one.
  - **`SparkleTrail`** (`sparkle-trail`) — a sparkle sweeping a circle with a comet tail.
  - **`SparkleBurst`** (`sparkle-burst`) — a sparkle pops and throws off tiny sparkles.
  - **`SparkleWand`** (`sparkle-wand`) — a magic wand waving while its tip
    sparkles, for "Generate with AI" buttons.
  - **`SparkleDots`** (`sparkle-dots`) — three sparkles twinkling in turn, an AI
    "typing" indicator.
  - **`SparkleRing`** (`sparkle-ring`) — a spinning multi-tone glow ring around a
    sparkle.
  - **`SparkleField`** (`sparkle-field`) — scattered sparkles twinkling on and off.
  - **`TextSparkle`** (`text-sparkle`) — a spinning sparkle beside shimmering
    text ("✦ Thinking").
- **14 more new loaders**, all registered for `<Loader type="..." />`:
  - **`Cardio`** (`cardio`) — an ECG heartbeat line drawn and erased on a loop.
  - **`Leapfrog`** (`leapfrog`) — three dots taking turns leaping over each other.
  - **`BouncingBall`** (`bouncing-ball`) — a ball that squashes on impact over a
    breathing shadow.
  - **`Radar`** (`radar`) — a rotating sweep over range rings, with blips that
    flash as the sweep passes.
  - **`Signal`** (`signal`) — cellular signal bars filling up one by one.
  - **`Snake`** (`snake`) — a lit head with a fading tail circling a 3×3 grid.
  - **`Burst`** (`burst`) — two staggered waves of particles shooting out from
    the centre, like a firework.
  - **`Bubbles`** (`bubbles`) — bubbles of different sizes rising and swaying.
  - **`LiquidFill`** (`liquid-fill`) — a round flask filling with wavy liquid,
    then draining.
  - **`Coffee`** (`coffee`) — a cup on a saucer with wisps of steam rising.
  - **`Pie`** (`pie`) — a wedge sweeps clockwise to a full pie, then is eaten
    away clockwise.
  - **`TextScramble`** (`text-scramble`) — random glyphs decode into the text
    left-to-right. Renders plain text on the server and stays static when the
    user prefers reduced motion.
  - **`TextUnderline`** (`text-underline`) — a highlight sliding along an
    underline beneath the text.
  - **`TextHighlight`** (`text-highlight`) — a marker stroke wiping in behind
    the text from the left, then out to the right.
- **`inline` prop on every loader** — fits it inside a button or a line of
  text: sized to `1em`, coloured with `currentColor` (so it stays visible on a
  button whose background is the theme colour), aligned to the text baseline,
  and rendered as a `<span>` so it is valid inside `<button>`. Text loaders
  inherit the font size.

  ```tsx
  <button disabled>
    <SparkleSpin inline /> Generating…
  </button>
  ```

- Playground: "AI sparkle" category, a "Loaders in buttons" showcase, and an
  "In a button (inline)" toggle in the configure dialog.
- README: Open Graph banner, a "Loaders in buttons" section, and the full
  loader catalog (54 existing loaders were missing from it).

### Fixed

- **`Cube` and `DNA` keep their 3D shape at every size.** Their depth
  (`translateZ` / `perspective`) was fixed in px, so `Cube` only closed up at
  ~57px (faces split apart at `md`, overlapped at `lg`) and both broke out of
  their box at small sizes. Depth now scales with the loader size.
- **`useDelayedLoading` now enforces `minDuration`.** The "shown at" timestamp
  was a local variable reset on every effect run, so the loader could hide
  immediately after appearing.
- **`setMode()` from `useTheme()` works when `<ThemeProvider mode>` is passed.**
  It was a silent no-op in that case; the `mode` prop now sets the mode (and
  re-sets it when the prop changes) without blocking `setMode()`.
- **`react-next-loader/styles.css` ships every keyframe.** It previously held
  only 11 of 152, so it could not replace runtime injection (e.g. under a strict
  CSP). Keyframes are now appended from `src/animations/keyframes.ts` at build.
- **Correct types for CommonJS consumers.** `exports` now points the `require`
  condition at the `.d.cts` declarations (flagged by `publint`).
- README examples: `ImageLoader` takes `image` (not `src`); `SkeletonList` /
  `SkeletonGrid` have no `rows` / `columns` props; corrected the list of image
  animations.
- Playground: "Copy code" produced non-existent imports (`Dna`, `Xlvi`,
  `AiThinking`, `TextFlip3d`, `ImageSpin`, `SkeletonText`, …). It now uses the
  real export names, and `<Loader type="..." />` for image and skeleton types.

### Notes

- This is a **minor** release: no breaking API changes — existing imports,
  component names and props work unchanged, and `inline` is opt-in.
- Two visible behaviour changes come from the fixes above: `setMode()` now
  takes effect even when `<ThemeProvider mode>` is set, and `Cube` renders as a
  closed cube at sizes where its faces used to float apart.

---

## [1.1.0] — 2026-07-13

### Added

- **14 new loaders**, bringing the catalog to 100+ animated loaders:
  - **`MagnifyingScan`** (`magnifying-scan`) — a magnifying glass that sweeps
    along a circular scanning path (complements the existing `MagnifyingGlass`).
  - **`Pyramid`** (`pyramid`) — a rotating 3D tetrahedron built from four
    translucent triangular faces, each reusing `--rl-color` at a different
    opacity for a glassy, layered look.
  - **12 community-inspired picks** recreated in pure CSS from
    [uiverse.io](https://uiverse.io/loaders):
    - `NeonRing` (`neon-ring`) — glowing neon ring with a pulsing `LOADING` label.
    - `AudiRings` (`audi-rings`) — four overlapping rings lighting up in sequence.
    - `CapsulePinwheel` (`capsule-pinwheel`) — four coloured capsules spinning as a pinwheel.
    - `StaggerBars` (`stagger-bars`) — staggered sliding bars with a ball gliding across the top.
    - `ProgressBar` (`progress-bar`) — indeterminate horizontal bar with a sweeping fill.
    - `CurveArcs` (`curve-arcs`) — three nested, multi-colour arcs spinning together.
    - `FoldRibbon` (`fold-ribbon`) — a glossy 3D ribbon that folds and tumbles.
    - `ShapeDraw` (`shape-draw`) — circle, triangle and square outlines drawn on a loop.
    - `Bicycle` (`bicycle`) — line-art bicycle with spinning wheels.
    - `LoadingBall` (`loading-ball`) — `Loading...` wordmark with a ball gliding across it.
    - `RainCloud` (`rain-cloud`) — a cloud with rain drops streaking down.
    - `Matchstick` (`matchstick`) — two glowing match-sticks pulsing alternately.
- New per-loader colour props where relevant: `AudiRingsProps`,
  `CapsulePinwheelProps`, `CurveArcsProps`, `FoldRibbonProps`,
  `RainCloudProps`, and `MatchstickProps`.
- All new loaders are registered in `LOADER_REGISTRY`, so the unified
  `<Loader type="..." />` API works for every one of them.

### Fixed

- **`RotatingTriangles` now fills its full width.** The two triangle SVGs used
  the default `preserveAspectRatio` ("meet"), which letter-boxed them into the
  middle half of the box; they now use `preserveAspectRatio="none"` and stretch
  to the full width.
- **More reliable production build.** The `prependUseClient` post-build step now
  reads directory entries with `withFileTypes` and skips declaration files, so it
  no longer throws `ENOENT` when a hashed `.d.cts` file is still being finalised
  by the DTS build. (`"use client"` is still injected via the tsup `banner`, so
  runtime output is unchanged.)

### Notes

- This is a **minor** release: it only adds new loaders and props — there are
  **no breaking API changes**, so existing imports, component names, and props
  continue to work unchanged.

---

## [1.0.1] — 2026-06-08

### Fixed

- **Skeleton visibility in light theme.** Default `baseColor` / `highlightColor`
  now use `currentColor` mixed with transparent, so skeletons are visible on
  both light and dark backgrounds without depending on `--rl-theme-surface`.
- **Pacman is now perfectly round.** Replaced the rectangular `40% × 70%` box
  with `aspectRatio: 1 / 1` so the character is a true circle, and updated
  the border-radius to a proper semicircle.
- **Progress bars work without `<ThemeProvider>`.** `LinearProgress` and
  `CircularProgress` track colours now fall back to `currentColor 14%`
  instead of an invisible `var(--rl-theme-surface)` reference.
- **`CardSkeleton` border visible in light mode.** Border now uses
  `currentColor 12%` instead of the theme surface fallback.
- **Animations work on first paint in consumer apps.** `injectKeyframes()`
  now auto-runs at module load (with SSR guard), so the keyframes are in
  `document.head` before any loader / skeleton renders. Previously the
  `useEffect`-based injection ran after the browser had already painted the
  element with a missing `@keyframes` rule, leaving the animation frozen.
- **`sideEffects` updated** so bundlers preserve the keyframe-injection side
  effect even with aggressive tree-shaking.

### Improved (Playground)

- Mobile-friendly Category bar (horizontal scroll on small screens) and
  smaller, tappable Scroll-to-top button.
- Theme switcher icons and tighter `TopBar` layout on mobile.
- Responsive font scaling in `Footer`.
- Social links footer with WhatsApp, Instagram, Facebook, YouTube,
  X (Twitter), LinkedIn, and GitHub — driven by `VITE_SOCIAL_*` env vars,
  with a graceful "Data Not Available" modal when a URL is missing.
- `SiteStatsStrip` showing last updated, total hits, and live visitor count
  via the [Abacus](https://abacus.jasoncameron.dev) public hit-counter API.
- Light-theme polish: stronger borders on the colour / background / label
  swatches, solid `#9ca3af` borders on the GLOW toggle for clear visibility
  on the white modal card.

---

## [1.0.0] — 2026-06-08

### Added — Initial stable release 🎉

- **90+ animated loaders** across categories:
  - Basics — `Spinner`, `Dots`, `Bars`, `Pulse`, `Wave`, `Ripple`,
    `Circle`, `DualRing`
  - Motion / scale — `Beat`, `Bounce`, `Scale`, `Sync`, `Rise`, `Skew`,
    `Square`, `Hash`, `Fade`
  - Ring / circle — `Clip`, `Puff`, `Ring`, `Rotate`, `TailSpin`, `Oval`,
    `Moon`, `ColorRing`, `ThreeCircles`
  - Shapes — `Triangle`, `BallTriangle`, `Hourglass`, `Grid`, `Pacman`,
    `ClimbingBox`, `Infinity`, `Vortex`
  - Specialty — `Clock`, `Watch`, `Propagate`, `MagnifyingGlass`
  - AI / modern — `GradientOrb`, `NeuralNetwork`, `AIThinking`, `Matrix`,
    `Hologram`, `Cyberpunk`, `FloatingGlass`
  - Creative — `Bolt`, `Book`, `Boxes`, `Wifi`, `Sunspot`, `XLVI`
  - 3D / advanced — `Cube`, `Orbit`, `Typing`, `Blink`, `Squircle`
  - Plus react-loader-spinner family — `Audio`, `Blocks`, `Comment`, `DNA`,
    `FallingLines`, `FidgetSpinner`, `Hearts`, `LineWave`, `MutatingDots`,
    `Radio`, `RevolvingDot`, `Rings`, `RotatingLines`, `RotatingTriangles`,
    `ThreeDots`, and multi-colour variants.
- **20+ text loader effects** — `TextSequence`, `TextWave`, `TextDots`,
  `TextShimmer`, `TextBlink`, `TextScale`, `TextSlide`, `TextGradient`,
  `TextTyping`, `TextGlitch`, `TextNeon`, `TextFlip3D`, `TextBounce`,
  `TextElastic`, `TextStretch`, `TextSpin`, `TextDrop`, `TextRainbow`,
  `TextRipple`, `TextZoom`.
- **13 skeleton components** — `Skeleton`, `TextSkeleton`, `AvatarSkeleton`,
  `CardSkeleton`, `SkeletonBar`, `SkeletonImage`, `SkeletonButton`,
  `SkeletonAvatarSquare`, `SkeletonProfile`, `SkeletonList`, `SkeletonGrid`,
  `SkeletonComment`, `SkeletonParagraph` — with `shimmer`, `pulse`, `wave`,
  or `none` animations.
- **Progress bars** — `LinearProgress` (determinate, indeterminate, gradient)
  and `CircularProgress`.
- **`ImageLoader`** — animate any image with `spin`, `pulse`, `fade`,
  `bounce`, `scale`, `shake`, `flip`, and more.
- **Unified `<Loader type="…" />`** API with lazy `Suspense` wrapper.
- **Theme system** — `ThemeProvider` with `light` / `dark` / `auto` modes
  and full token customisation (`colorPrimary`, `colorSurface`,
  `colorBackground`, `shadowGlow`, `radius`, …).
- **Hooks** — `useReducedMotion`, `useDelayedLoading`.
- **`LoaderBase`** primitive exported for composing custom loaders.
- **SSR-safe** (`"use client"` directives auto-prepended) — works with
  Next.js App Router, Remix, Astro, Vite SSR, and CRA.
- **Accessible** — `role="status"`, `aria-busy`, `aria-live`, `aria-label`,
  and respects `prefers-reduced-motion`.
- **Tree-shakable** subpath imports: `react-next-loader/loaders`,
  `react-next-loader/skeletons`, `react-next-loader/progress`,
  `react-next-loader/theme`.
- **TypeScript** types included for every component and prop.
- **Optional standalone CSS** (`react-next-loader/styles.css`).

---

[1.0.1]: https://github.com/yogeshgabani/react-next-loader/releases/tag/v1.0.1
[1.0.0]: https://github.com/yogeshgabani/react-next-loader/releases/tag/v1.0.0
