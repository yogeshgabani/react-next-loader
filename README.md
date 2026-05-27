# react-loadify

All-in-one React loader library — spinners, skeletons, progress bars, and more. Works in React, Next.js (App + Pages router), Vite, Remix, and CRA, with TypeScript and JavaScript.

> **Status: M1 (Foundation) released as v0.1.0.** The full roadmap (advanced/AI loaders, fullscreen, button states, page-transition adapters, Lottie) is being shipped in milestone releases — see [Roadmap](#roadmap).

## Features

- 8+ animated loaders (spinner, dual ring, circle, dots, bars, pulse, ripple, wave)
- Skeleton system (text / avatar / card) with shimmer, pulse, and wave animations
- Linear + circular progress bars (determinate and indeterminate)
- CSS-variable-based theme system with light / dark / auto modes
- Tree-shakable subpath imports
- SSR-safe (Next.js App Router, Remix, all SSR frameworks)
- Accessible (`role="status"`, `aria-busy`, `aria-live`, respects `prefers-reduced-motion`)
- TypeScript types included
- Tiny: per-loader < 2 KB gzipped

## Install

```bash
npm i react-loadify
# or
pnpm add react-loadify
# or
yarn add react-loadify
```

`framer-motion` is an optional peer dependency — install only if you use loaders that need it (advanced loaders in upcoming releases).

## Quick start

```tsx
import { Spinner, Dots, Skeleton, LinearProgress } from 'react-loadify';

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

### Unified API

```tsx
import { Loader } from 'react-loadify';

<Loader type="spinner" />
<Loader type="dots" />
<Loader type="wave" />
<Loader type="pulse" />
```

> Tip: For best tree-shaking, import directly from subpaths
> (`react-loadify/loaders`, `react-loadify/skeletons`, `react-loadify/progress`).
> The unified `<Loader />` adds a small `<Suspense>` wrapper.

## Theming

```tsx
import { ThemeProvider } from 'react-loadify/theme';

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

## Universal props

Every loader accepts:

| Prop        | Type                                              | Default        |
| ----------- | ------------------------------------------------- | -------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number`  | `'md'`         |
| `color`     | CSS color string                                  | theme primary  |
| `speed`     | `number` (animation speed multiplier)             | `1`            |
| `thickness` | `number` (stroke/border thickness in px)          | varies         |
| `rounded`   | `boolean`                                         | varies         |
| `glow`      | `boolean`                                         | `false`        |
| `aria-label`| `string`                                          | `'Loading'`    |
| `label`     | `ReactNode` (inline visible label)                | —              |

## CSS

Keyframes are auto-injected at runtime, so the library works with zero CSS setup. If you prefer external CSS, import the optional stylesheet once:

```ts
import 'react-loadify/styles.css';
```

## Subpath imports

```ts
import { Spinner }      from 'react-loadify/loaders';
import { Skeleton }     from 'react-loadify/skeletons';
import { LinearProgress } from 'react-loadify/progress';
import { ThemeProvider } from 'react-loadify/theme';
```

## SSR & Next.js App Router

All components emit `"use client"` automatically. They're SSR-safe — no `window` or `document` access during render. Use them inside Server Components by importing them as you would any client component:

```tsx
// app/page.tsx (Server Component)
import { Spinner } from 'react-loadify/loaders';

export default function Page() {
  return <Spinner />;
}
```

## Roadmap

- **v0.1.0 — Foundation** *(current)* — 8 basic loaders, 3 skeletons, 2 progress bars, theming
- **v0.2.0 — Modern** — Advanced/AI loaders (GradientOrb, Neural, Matrix, Hologram, Cyberpunk, ...), Cube, Infinity, Orbit, Clock, Radar, Typing, Blink, Grow, Bounce
- **v0.3.0 — Surfaces** — `FullscreenLoader`, `LoadingButton`, table/dashboard/social/product/chat skeletons, step/buffer/upload/download progress
- **v0.4.0 — Integrations** — page-transition adapters (Next/React Router/Remix), Lottie subpath
- **v1.0.0 — Stable** — Docs site, bundle-size badges, full a11y audit

## License

MIT
