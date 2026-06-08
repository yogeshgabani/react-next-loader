# Changelog

All notable changes to **react-next-loader** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
