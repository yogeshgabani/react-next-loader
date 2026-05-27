# react-next-loader

> All-in-one React loader library — 90+ animated loaders, skeletons, progress bars, text effects, AI-style loaders, and image loaders. Works seamlessly with React, Next.js (App + Pages Router), Vite, Remix, and CRA — in both TypeScript and JavaScript.

**v1.0.0 — Stable release.** Production-ready, fully typed, SSR-safe, tree-shakable, and accessible.

🌐 **[Live Demo →](https://react-next-loader.vercel.app)** &nbsp;•&nbsp; 📦 **[NPM](https://www.npmjs.com/package/react-next-loader)** &nbsp;•&nbsp; 💻 **[GitHub](https://github.com/yogeshgabani/react-next-loader)**

---

## Table of contents

- [Live demo](#live-demo)
- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Unified `<Loader />` API](#unified-loader-api)
- [Loaders catalog](#loaders-catalog)
- [Skeletons](#skeletons)
- [Progress bars](#progress-bars)
- [Text loaders](#text-loaders)
- [Image loader](#image-loader)
- [Theming](#theming)
- [Universal props](#universal-props)
- [Hooks](#hooks)
- [SSR & Next.js App Router](#ssr--nextjs-app-router)
- [Accessibility](#accessibility)
- [Tree-shaking & subpath imports](#tree-shaking--subpath-imports)
- [TypeScript](#typescript)
- [Bundle size](#bundle-size)
- [Browser support](#browser-support)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Keywords](#keywords)
- [License](#license)

---

## Live demo

Try every loader, skeleton, progress bar, and text effect interactively in the browser — no install required.

👉 **Open playground:** [https://react-next-loader.vercel.app](https://react-next-loader.vercel.app)

The playground lets you:

- Browse all 90+ loaders grouped by category (Basics, AI/Modern, 3D, Text, etc.)
- Tweak `size`, `color`, `speed`, `thickness`, `label`, and other props live
- Copy ready-to-paste code snippets for each loader
- Toggle light / dark / auto theme modes
- Preview skeletons, progress bars, and image loaders side-by-side

Want to run the playground locally instead?

```bash
git clone https://github.com/yogeshgabani/react-next-loader.git
cd react-next-loader
npm install
npm run dev
```

> The above URLs are placeholders — update them once you publish to npm and deploy the playground.

---

## Features

- **90+ animated loaders** — spinners, rings, dots, bars, waves, AI/modern (GradientOrb, NeuralNetwork, Matrix, Hologram, Cyberpunk), 3D (Cube, Orbit), specialty (Clock, Watch, MagnifyingGlass), and more
- **20+ text loader effects** — typing, glitch, neon, rainbow, ripple, flip3D, bounce, elastic, stretch, spin, drop, zoom, and more
- **13 skeleton components** — text, avatar, card, bar, image, button, profile, list, grid, comment, paragraph variants with shimmer / pulse / wave animations
- **Progress bars** — linear (determinate + indeterminate, gradient) and circular
- **Image loader** — animate any image while loading (spin, pulse, fade, bounce, scale, etc.)
- **CSS-variable-based theme system** — light / dark / auto modes with custom token overrides
- **SSR-safe** — works in Next.js App Router, Remix, and any SSR framework (no `window`/`document` during render)
- **Accessible** — `role="status"`, `aria-busy`, `aria-live`, respects `prefers-reduced-motion`
- **Tree-shakable** — subpath imports keep your bundle tiny
- **Zero CSS setup** — keyframes auto-injected at runtime (optional standalone stylesheet available)
- **Fully typed** — TypeScript types included for every component and prop
- **Tiny** — per-loader < 2 KB gzipped

---

## Install

```bash
npm i react-next-loader
# or
pnpm add react-next-loader
# or
yarn add react-next-loader
```

`framer-motion` is an **optional** peer dependency. Install only if you use advanced motion-based loaders.

```bash
npm i framer-motion
```

**Peer requirements:** `react >= 17`, `react-dom >= 17`, `node >= 18`.

---

## Quick start

```tsx
import { Spinner, Dots, Skeleton, LinearProgress } from 'react-next-loader';

export default function Demo() {
  return (
    <>
      <Spinner size="lg" color="#7c3aed" />
      <Dots size="md" />
      <Skeleton width={240} height={16} />
      <LinearProgress value={60} gradient />
    </>
  );
}
```

---

## Unified `<Loader />` API

Use a single component and switch the loader visual via the `type` prop:

```tsx
import { Loader } from 'react-next-loader';

<Loader type="spinner" size="lg" />
<Loader type="dots" color="#10b981" />
<Loader type="wave" />
<Loader type="cube" />
<Loader type="neural-network" />
<Loader type="text-rainbow" text="Loading..." />
```

> **Tip:** For best tree-shaking, prefer direct imports from subpaths (see [Tree-shaking & subpath imports](#tree-shaking--subpath-imports)). The unified `<Loader />` adds a small `<Suspense>` wrapper and pulls in the registry.

---

## Loaders catalog

### Basic
`Spinner`, `DualRing`, `Circle`, `Dots`, `Bars`, `Pulse`, `Ripple`, `Wave`

### Motion / scale
`Beat`, `Bounce`, `Scale`, `Sync`, `Rise`, `Skew`, `Square`, `Hash`, `Fade`

### Ring / circle
`Clip`, `Puff`, `Ring`, `Rotate`, `TailSpin`, `Oval`, `Moon`, `ColorRing`, `ThreeCircles`

### Shapes
`Triangle`, `BallTriangle`, `Hourglass`, `Grid`, `Pacman`, `ClimbingBox`, `Infinity`, `Vortex`

### Specialty
`Clock`, `Watch`, `Propagate`, `MagnifyingGlass`

### react-loader-spinner family
`Audio`, `Blocks`, `Comment`, `DNA`, `FallingLines`, `FidgetSpinner`, `Hearts`, `LineWave`, `MutatingDots`, `Radio`, `RevolvingDot`, `Rings`, `RotatingLines`, `RotatingTriangles`, `ThreeDots`

### AI / modern
`GradientOrb`, `NeuralNetwork`, `AIThinking`, `Matrix`, `Hologram`, `Cyberpunk`, `FloatingGlass`

### Creative
`Bolt`, `Book`, `Boxes`, `Wifi`, `Sunspot`, `XLVI`

### 3D / advanced
`Cube`, `Orbit`, `Typing`, `Blink`, `Squircle`

### Multi-color / new
`RotatingSquare`, `Hairball`, `Whirl`, `FlipFlop`, `ThreeD`

```tsx
import { GradientOrb, Cube, NeuralNetwork } from 'react-next-loader/loaders';

<GradientOrb size="lg" />
<Cube size={64} />
<NeuralNetwork color="#22d3ee" />
```

---

## Skeletons

13 skeleton variants with `shimmer`, `pulse`, `wave`, or `none` animations.

```tsx
import {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  CardSkeleton,
  SkeletonBar,
  SkeletonImage,
  SkeletonButton,
  SkeletonAvatarSquare,
  SkeletonProfile,
  SkeletonList,
  SkeletonGrid,
  SkeletonComment,
  SkeletonParagraph,
} from 'react-next-loader/skeletons';

<Skeleton width={240} height={16} animation="shimmer" />
<TextSkeleton lines={3} />
<AvatarSkeleton size={48} />
<CardSkeleton />
<SkeletonProfile />
<SkeletonList rows={5} />
<SkeletonGrid columns={3} rows={2} />
```

---

## Progress bars

```tsx
import { LinearProgress, CircularProgress } from 'react-next-loader/progress';

<LinearProgress value={60} />
<LinearProgress value={75} gradient />
<LinearProgress indeterminate />

<CircularProgress value={40} size="lg" />
<CircularProgress indeterminate thickness={4} />
```

---

## Text loaders

Animate plain text — great for "Loading…" messages, AI streaming, splash screens.

```tsx
import {
  TextSequence,
  TextWave,
  TextDots,
  TextShimmer,
  TextBlink,
  TextScale,
  TextSlide,
  TextGradient,
  TextTyping,
  TextGlitch,
  TextNeon,
  TextFlip3D,
  TextBounce,
  TextElastic,
  TextStretch,
  TextSpin,
  TextDrop,
  TextRainbow,
  TextRipple,
  TextZoom,
} from 'react-next-loader/loaders';

<TextWave text="Loading..." />
<TextRainbow text="Please wait" />
<TextGlitch text="Generating" />
<TextTyping text="Thinking..." />
```

---

## Image loader

Animate an image while content is loading.

```tsx
import { ImageLoader } from 'react-next-loader/loaders';

<ImageLoader src="/logo.svg" animation="spin" size={64} />
<ImageLoader src="/avatar.png" animation="pulse" />
<ImageLoader src="/icon.png" animation="bounce" />
```

Supported animations: `spin`, `pulse`, `fade`, `bounce`, `scale`, `shake`, `flip`, and more.

---

## Theming

```tsx
import { ThemeProvider } from 'react-next-loader/theme';

<ThemeProvider mode="auto">
  <App />
</ThemeProvider>
```

`mode` accepts `'light' | 'dark' | 'auto'`. Pass custom token overrides per mode:

```tsx
<ThemeProvider
  tokens={{
    light: { colorPrimary: '#16a34a' },
    dark:  { colorPrimary: '#22d3ee' },
  }}
>
  <App />
</ThemeProvider>
```

Access the current theme programmatically:

```tsx
import { useTheme } from 'react-next-loader/theme';

function MyComponent() {
  const { mode, tokens, setMode } = useTheme();
  return <button onClick={() => setMode('dark')}>Dark mode</button>;
}
```

### Tokens

`colorPrimary`, `colorSecondary`, `colorAccent`, `colorBackground`, `colorSurface`, `colorText`, `colorMuted`, `shadowGlow`, `radius`.

You can also import the raw token objects:

```tsx
import { lightTokens, darkTokens } from 'react-next-loader/theme';
```

---

## Universal props

Every loader accepts these props:

| Prop              | Type                                              | Default       |
| ----------------- | ------------------------------------------------- | ------------- |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number`  | `'md'`        |
| `width`           | `number \| string`                                | derived       |
| `height`          | `number \| string`                                | derived       |
| `color`           | CSS color string                                  | theme primary |
| `speed`           | `number` (animation speed multiplier)             | `1`           |
| `thickness`       | `number` (stroke/border thickness in px)          | varies        |
| `rounded`         | `boolean`                                         | varies        |
| `glow`            | `boolean`                                         | `false`       |
| `aria-label`      | `string`                                          | `'Loading'`   |
| `label`           | `ReactNode` (inline visible label)                | —             |
| `labelPosition`   | `'right' \| 'left' \| 'top' \| 'bottom'`          | `'right'`     |
| `labelColor`      | `string`                                          | `'inherit'`   |
| `labelFontSize`   | `number \| string`                                | inherit       |
| `labelWeight`     | `number \| string`                                | inherit       |
| `labelStyle`      | `CSSProperties`                                   | —             |
| `gap`             | `number` (spacing between loader and label)       | `8`           |
| `text`            | `string` (for text-style loaders)                 | —             |
| `image`           | `string` (for image-style loaders)                | —             |
| `className`       | `string`                                          | —             |
| `style`           | `CSSProperties`                                   | —             |

Example with label:

```tsx
<Spinner size="lg" label="Loading data" labelPosition="bottom" gap={12} />
```

---

## Hooks

### `useDelayedLoading(loading, options?)`

Avoid flicker for fast requests, enforce a minimum visible duration.

```tsx
import { useDelayedLoading } from 'react-next-loader';

function Page({ isFetching }: { isFetching: boolean }) {
  const showLoader = useDelayedLoading(isFetching, {
    delay: 200,       // wait 200ms before showing
    minDuration: 400, // once shown, keep visible at least 400ms
  });

  return showLoader ? <Spinner /> : <Content />;
}
```

### `useReducedMotion()`

Returns `true` when the user has `prefers-reduced-motion: reduce` set.

```tsx
import { useReducedMotion } from 'react-next-loader';

const reduced = useReducedMotion();
// reduced === true → simpler animation or static placeholder
```

---

## SSR & Next.js App Router

All components emit `"use client"` automatically and are SSR-safe. Use them inside Server Components like any client component:

```tsx
// app/page.tsx (Server Component)
import { Spinner } from 'react-next-loader/loaders';

export default function Page() {
  return <Spinner />;
}
```

Works out of the box with:

- Next.js (App Router + Pages Router)
- Remix
- Vite + SSR
- Astro (with React integration)
- Gatsby
- Create React App

---

## Accessibility

Every loader includes:

- `role="status"` — announced as a status region by screen readers
- `aria-busy="true"` — signals that an area is loading
- `aria-live="polite"` — polite announcements of state changes
- `aria-label` — default `'Loading'`, customizable
- Respects `prefers-reduced-motion` — animations are softened or simplified for users who request reduced motion

```tsx
<Spinner aria-label="Fetching user profile" />
```

---

## Tree-shaking & subpath imports

For the smallest bundle, import from subpaths instead of the root:

```tsx
import { Spinner }          from 'react-next-loader/loaders';
import { Skeleton }         from 'react-next-loader/skeletons';
import { LinearProgress }   from 'react-next-loader/progress';
import { ThemeProvider }    from 'react-next-loader/theme';
```

The library is published as ESM + CJS with `sideEffects: false` for tree-shaking (CSS is marked as a side effect so it isn't dropped).

### Optional standalone CSS

Keyframes are auto-injected at runtime, so the library works with zero CSS setup. If you prefer external CSS (for stricter CSP, CSS-in-JS migration, or build pipelines that prefer files), import the optional stylesheet **once**:

```ts
import 'react-next-loader/styles.css';
```

---

## TypeScript

The package ships first-class types. Every component prop and theme token is fully typed.

```tsx
import type {
  BaseLoaderProps,
  LoaderSize,
  LabelPosition,
  ThemeMode,
  ThemeTokens,
  LoaderType,
  SkeletonProps,
  SkeletonAnimation,
  LinearProgressProps,
  CircularProgressProps,
  ImageLoaderProps,
  ImageAnimation,
} from 'react-next-loader';
```

Build a custom loader on top of the public primitive:

```tsx
import { LoaderBase, type LoaderBaseProps } from 'react-next-loader';

function MyLoader(props: LoaderBaseProps) {
  return <LoaderBase {...props}>{/* your svg / markup */}</LoaderBase>;
}
```

---

## Bundle size

- Root entry — lazy registry, only loaders you reference are bundled
- Per-loader cost — **< 2 KB gzipped** for most loaders
- Zero runtime CSS dependencies (keyframes auto-injected, ~1 KB once)
- No global state, no required providers

Use a tool like [bundlephobia](https://bundlephobia.com) or `npx source-map-explorer` on your build to verify.

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari, Opera). For loaders that use CSS features like `backdrop-filter` (e.g. `Hologram`, `FloatingGlass`), Safari ≥ 14 and Chromium ≥ 76 are required.

---

## Scripts

For local development of this library:

| Script              | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Start the local playground (Vite) to preview loaders            |
| `npm run build`     | Build the library with `tsup` (ESM + CJS + types)               |
| `npm run build:watch` | Watch-mode library build                                      |
| `npm run typecheck` | Run TypeScript in `--noEmit` mode                               |
| `npm run test`      | Run the Vitest test suite once                                  |
| `npm run test:watch`| Watch-mode tests                                                |
| `npm run lint`      | ESLint over `src/**/*.{ts,tsx}`                                 |
| `npm run format`    | Prettier write over `src` files                                 |
| `npm run publint`   | Validate the published package shape                            |
| `npm run attw`      | Run `@arethetypeswrong/cli` against the packed tarball          |

---

## Contributing

PRs and issues are welcome. Before opening a PR:

1. `npm install`
2. `npm run dev` — try your change in the playground
3. `npm run typecheck && npm run lint && npm run test`
4. `npm run build && npm run publint` — confirm the package still publishes cleanly

If you're adding a new loader, please:

- Place it in `src/components/loaders/`
- Re-export from `src/components/loaders/index.ts`
- Register it in `src/registry.ts` so the unified `<Loader type="..." />` works
- Add a preview entry to the playground

---

## Keywords

> If you're searching npm for any of these, **react-next-loader** has you covered.

**React & frameworks** — react, reactjs, react18, react19, nextjs, next.js, vite, remix, gatsby, cra, typescript, javascript, ssr, esm, cjs, tree-shaking

**Loaders & spinners** — react loader, react spinner, react spinners, react loaders, loading indicator, loading spinner, loading animation, loading bar, loading screen, loading state, preloader, page loader, app loader, spinner component, spinner loader

**Skeletons & placeholders** — skeleton, skeleton loader, skeleton screen, skeleton loading, content loader, content placeholder, placeholder, shimmer, shimmer effect, pulse, wave

**Progress bars** — progress bar, progress indicator, linear progress, circular progress, indeterminate progress, top loading bar, page transition, nprogress alternative

**Special states** — fullscreen loader, fullscreen loading, overlay loader, button loader, loading button, suspense fallback, loading fallback, lazy loading

**Loader styles** — dots loader, ring loader, bar loader, wave loader, pulse loader, ripple loader, circle loader, cube loader, 3d loader, orbit loader, clock loader, hourglass loader, pacman loader, infinity loader, magnifying-glass loader

**AI / modern** — ai loader, ai thinking, chatgpt loader, gpt loader, neural network loader, matrix loader, hologram loader, cyberpunk loader, gradient orb, neon loader, glitch loader, rainbow loader

**Text & image** — text loader, typing animation, text shimmer, text wave, text glitch, text neon, text rainbow, image loader, image loading, image animation

**UI / design** — ui components, ui library, react components, react ui, component library, design system, dark mode, light mode, theme, theming, customizable, tailwind, tailwindcss

**Quality & a11y** — accessible, accessibility, a11y, aria, aria-busy, aria-live, prefers-reduced-motion, reduced motion, lightweight, tiny, zero dependency, performance, optimized

**Motion** — framer-motion, lottie, css animation, svg animation, smooth animation

---

## License

MIT License - Copyright (c) 2026 **Yogesh Gabani**

Built by **Yogesh Gabani**.
