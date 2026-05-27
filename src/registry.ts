'use client';

import { createElement, lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { BaseLoaderProps } from './types';
import type { ImageAnimation } from './components/loaders/ImageLoader';

export type LoaderType =
  // basics
  | 'spinner'
  | 'dual-ring'
  | 'circle'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'ripple'
  | 'wave'
  // scale / motion
  | 'beat'
  | 'bounce'
  | 'scale'
  | 'sync'
  | 'rise'
  | 'skew'
  | 'square'
  | 'hash'
  | 'fade'
  // ring / circle
  | 'clip'
  | 'puff'
  | 'ring'
  | 'rotate'
  | 'tail-spin'
  | 'oval'
  | 'moon'
  | 'color-ring'
  | 'three-circles'
  // shapes
  | 'triangle'
  | 'ball-triangle'
  | 'hourglass'
  | 'grid'
  | 'pacman'
  | 'climbing-box'
  | 'infinity'
  | 'vortex'
  // specialty
  | 'clock'
  | 'watch'
  | 'propagate'
  | 'magnifying-glass'
  // react-loader-spinner remaining
  | 'audio'
  | 'blocks'
  | 'comment'
  | 'dna'
  | 'falling-lines'
  | 'fidget-spinner'
  | 'hearts'
  | 'line-wave'
  | 'mutating-dots'
  | 'radio'
  | 'revolving-dot'
  | 'rings'
  | 'rotating-lines'
  | 'rotating-triangles'
  | 'three-dots'
  // AI / modern
  | 'gradient-orb'
  | 'neural-network'
  | 'ai-thinking'
  | 'matrix'
  | 'hologram'
  | 'cyberpunk'
  | 'floating-glass'
  // creative
  | 'bolt'
  | 'book'
  | 'boxes'
  | 'wifi'
  | 'sunspot'
  | 'xlvi'
  // 3D / advanced
  | 'cube'
  | 'orbit'
  | 'typing'
  | 'blink'
  | 'squircle'
  // v0.4.0
  | 'rotating-square'
  | 'hairball'
  | 'whirl'
  | 'flip-flop'
  | 'three-d'
  // v0.5.0 — text loaders
  | 'text-sequence'
  | 'text-wave'
  | 'text-dots'
  | 'text-shimmer'
  | 'text-blink'
  | 'text-scale'
  | 'text-slide'
  | 'text-gradient'
  // v0.5.1 — extra text effects
  | 'text-typing'
  | 'text-glitch'
  | 'text-neon'
  | 'text-flip-3d'
  | 'text-bounce'
  | 'text-elastic'
  | 'text-stretch'
  | 'text-spin'
  | 'text-drop'
  | 'text-rainbow'
  | 'text-ripple'
  | 'text-zoom'
  // v0.6.0 — image loaders (one per animation variant)
  | 'image-spin'
  | 'image-pulse'
  | 'image-bounce'
  | 'image-shake'
  | 'image-fade'
  | 'image-flip-y'
  | 'image-flip-x'
  | 'image-swing'
  | 'image-wobble'
  | 'image-heartbeat'
  | 'image-glow'
  | 'image-blur'
  | 'image-float'
  | 'image-rubber'
  | 'image-jello'
  | 'image-tada'
  | 'image-zoom'
  | 'image-ring'
  // v0.7.0 — skeletons
  | 'skeleton-bar'
  | 'skeleton-text'
  | 'skeleton-paragraph'
  | 'skeleton-avatar'
  | 'skeleton-avatar-square'
  | 'skeleton-image'
  | 'skeleton-button'
  | 'skeleton-profile'
  | 'skeleton-list'
  | 'skeleton-card'
  | 'skeleton-grid'
  | 'skeleton-comment';

type LoaderComponent = LazyExoticComponent<ComponentType<BaseLoaderProps>>;

export const LOADER_REGISTRY: Record<LoaderType, LoaderComponent> = {
  spinner: lazy(() => import('./components/loaders/Spinner').then((m) => ({ default: m.Spinner }))),
  'dual-ring': lazy(() => import('./components/loaders/DualRing').then((m) => ({ default: m.DualRing }))),
  circle: lazy(() => import('./components/loaders/Circle').then((m) => ({ default: m.Circle }))),
  dots: lazy(() => import('./components/loaders/Dots').then((m) => ({ default: m.Dots }))),
  bars: lazy(() => import('./components/loaders/Bars').then((m) => ({ default: m.Bars }))),
  pulse: lazy(() => import('./components/loaders/Pulse').then((m) => ({ default: m.Pulse }))),
  ripple: lazy(() => import('./components/loaders/Ripple').then((m) => ({ default: m.Ripple }))),
  wave: lazy(() => import('./components/loaders/Wave').then((m) => ({ default: m.Wave }))),

  beat: lazy(() => import('./components/loaders/Beat').then((m) => ({ default: m.Beat }))),
  bounce: lazy(() => import('./components/loaders/Bounce').then((m) => ({ default: m.Bounce }))),
  scale: lazy(() => import('./components/loaders/Scale').then((m) => ({ default: m.Scale }))),
  sync: lazy(() => import('./components/loaders/Sync').then((m) => ({ default: m.Sync }))),
  rise: lazy(() => import('./components/loaders/Rise').then((m) => ({ default: m.Rise }))),
  skew: lazy(() => import('./components/loaders/Skew').then((m) => ({ default: m.Skew }))),
  square: lazy(() => import('./components/loaders/Square').then((m) => ({ default: m.Square }))),
  hash: lazy(() => import('./components/loaders/Hash').then((m) => ({ default: m.Hash }))),
  fade: lazy(() => import('./components/loaders/Fade').then((m) => ({ default: m.Fade }))),

  clip: lazy(() => import('./components/loaders/Clip').then((m) => ({ default: m.Clip }))),
  puff: lazy(() => import('./components/loaders/Puff').then((m) => ({ default: m.Puff }))),
  ring: lazy(() => import('./components/loaders/Ring').then((m) => ({ default: m.Ring }))),
  rotate: lazy(() => import('./components/loaders/Rotate').then((m) => ({ default: m.Rotate }))),
  'tail-spin': lazy(() => import('./components/loaders/TailSpin').then((m) => ({ default: m.TailSpin }))),
  oval: lazy(() => import('./components/loaders/Oval').then((m) => ({ default: m.Oval }))),
  moon: lazy(() => import('./components/loaders/Moon').then((m) => ({ default: m.Moon }))),
  'color-ring': lazy(() => import('./components/loaders/ColorRing').then((m) => ({ default: m.ColorRing }))),
  'three-circles': lazy(() => import('./components/loaders/ThreeCircles').then((m) => ({ default: m.ThreeCircles }))),

  triangle: lazy(() => import('./components/loaders/Triangle').then((m) => ({ default: m.Triangle }))),
  'ball-triangle': lazy(() => import('./components/loaders/BallTriangle').then((m) => ({ default: m.BallTriangle }))),
  hourglass: lazy(() => import('./components/loaders/Hourglass').then((m) => ({ default: m.Hourglass }))),
  grid: lazy(() => import('./components/loaders/Grid').then((m) => ({ default: m.Grid }))),
  pacman: lazy(() => import('./components/loaders/Pacman').then((m) => ({ default: m.Pacman }))),
  'climbing-box': lazy(() => import('./components/loaders/ClimbingBox').then((m) => ({ default: m.ClimbingBox }))),
  infinity: lazy(() => import('./components/loaders/Infinity').then((m) => ({ default: m.Infinity }))),
  vortex: lazy(() => import('./components/loaders/Vortex').then((m) => ({ default: m.Vortex }))),

  clock: lazy(() => import('./components/loaders/Clock').then((m) => ({ default: m.Clock }))),
  watch: lazy(() => import('./components/loaders/Watch').then((m) => ({ default: m.Watch }))),
  propagate: lazy(() => import('./components/loaders/Propagate').then((m) => ({ default: m.Propagate }))),
  'magnifying-glass': lazy(() => import('./components/loaders/MagnifyingGlass').then((m) => ({ default: m.MagnifyingGlass }))),

  // v0.3.0 — react-loader-spinner remaining
  audio: lazy(() => import('./components/loaders/Audio').then((m) => ({ default: m.Audio }))),
  blocks: lazy(() => import('./components/loaders/Blocks').then((m) => ({ default: m.Blocks }))),
  comment: lazy(() => import('./components/loaders/Comment').then((m) => ({ default: m.Comment }))),
  dna: lazy(() => import('./components/loaders/DNA').then((m) => ({ default: m.DNA }))),
  'falling-lines': lazy(() => import('./components/loaders/FallingLines').then((m) => ({ default: m.FallingLines }))),
  'fidget-spinner': lazy(() => import('./components/loaders/FidgetSpinner').then((m) => ({ default: m.FidgetSpinner }))),
  hearts: lazy(() => import('./components/loaders/Hearts').then((m) => ({ default: m.Hearts }))),
  'line-wave': lazy(() => import('./components/loaders/LineWave').then((m) => ({ default: m.LineWave }))),
  'mutating-dots': lazy(() => import('./components/loaders/MutatingDots').then((m) => ({ default: m.MutatingDots }))),
  radio: lazy(() => import('./components/loaders/Radio').then((m) => ({ default: m.Radio }))),
  'revolving-dot': lazy(() => import('./components/loaders/RevolvingDot').then((m) => ({ default: m.RevolvingDot }))),
  rings: lazy(() => import('./components/loaders/Rings').then((m) => ({ default: m.Rings }))),
  'rotating-lines': lazy(() => import('./components/loaders/RotatingLines').then((m) => ({ default: m.RotatingLines }))),
  'rotating-triangles': lazy(() => import('./components/loaders/RotatingTriangles').then((m) => ({ default: m.RotatingTriangles }))),
  'three-dots': lazy(() => import('./components/loaders/ThreeDots').then((m) => ({ default: m.ThreeDots }))),

  // v0.3.0 — AI / modern
  'gradient-orb': lazy(() => import('./components/loaders/GradientOrb').then((m) => ({ default: m.GradientOrb }))),
  'neural-network': lazy(() => import('./components/loaders/NeuralNetwork').then((m) => ({ default: m.NeuralNetwork }))),
  'ai-thinking': lazy(() => import('./components/loaders/AIThinking').then((m) => ({ default: m.AIThinking }))),
  matrix: lazy(() => import('./components/loaders/Matrix').then((m) => ({ default: m.Matrix }))),
  hologram: lazy(() => import('./components/loaders/Hologram').then((m) => ({ default: m.Hologram }))),
  cyberpunk: lazy(() => import('./components/loaders/Cyberpunk').then((m) => ({ default: m.Cyberpunk }))),
  'floating-glass': lazy(() => import('./components/loaders/FloatingGlass').then((m) => ({ default: m.FloatingGlass }))),

  // v0.3.0 — awesome-loaders creative
  bolt: lazy(() => import('./components/loaders/Bolt').then((m) => ({ default: m.Bolt }))),
  book: lazy(() => import('./components/loaders/Book').then((m) => ({ default: m.Book }))),
  boxes: lazy(() => import('./components/loaders/Boxes').then((m) => ({ default: m.Boxes }))),
  wifi: lazy(() => import('./components/loaders/Wifi').then((m) => ({ default: m.Wifi }))),
  sunspot: lazy(() => import('./components/loaders/Sunspot').then((m) => ({ default: m.Sunspot }))),
  xlvi: lazy(() => import('./components/loaders/XLVI').then((m) => ({ default: m.XLVI }))),

  // v0.3.0 — 3D / advanced
  cube: lazy(() => import('./components/loaders/Cube').then((m) => ({ default: m.Cube }))),
  orbit: lazy(() => import('./components/loaders/Orbit').then((m) => ({ default: m.Orbit }))),
  typing: lazy(() => import('./components/loaders/Typing').then((m) => ({ default: m.Typing }))),
  blink: lazy(() => import('./components/loaders/Blink').then((m) => ({ default: m.Blink }))),
  squircle: lazy(() => import('./components/loaders/Squircle').then((m) => ({ default: m.Squircle }))),

  // v0.4.0
  'rotating-square': lazy(() => import('./components/loaders/RotatingSquare').then((m) => ({ default: m.RotatingSquare }))),
  hairball: lazy(() => import('./components/loaders/Hairball').then((m) => ({ default: m.Hairball }))),
  whirl: lazy(() => import('./components/loaders/Whirl').then((m) => ({ default: m.Whirl }))),
  'flip-flop': lazy(() => import('./components/loaders/FlipFlop').then((m) => ({ default: m.FlipFlop }))),
  'three-d': lazy(() => import('./components/loaders/ThreeD').then((m) => ({ default: m.ThreeD }))),

  // v0.5.0 — text loaders
  'text-sequence': lazy(() => import('./components/loaders/TextSequence').then((m) => ({ default: m.TextSequence as ComponentType<BaseLoaderProps> }))),
  'text-wave': lazy(() => import('./components/loaders/TextWave').then((m) => ({ default: m.TextWave as ComponentType<BaseLoaderProps> }))),
  'text-dots': lazy(() => import('./components/loaders/TextDots').then((m) => ({ default: m.TextDots as ComponentType<BaseLoaderProps> }))),
  'text-shimmer': lazy(() => import('./components/loaders/TextShimmer').then((m) => ({ default: m.TextShimmer as ComponentType<BaseLoaderProps> }))),
  'text-blink': lazy(() => import('./components/loaders/TextBlink').then((m) => ({ default: m.TextBlink as ComponentType<BaseLoaderProps> }))),
  'text-scale': lazy(() => import('./components/loaders/TextScale').then((m) => ({ default: m.TextScale as ComponentType<BaseLoaderProps> }))),
  'text-slide': lazy(() => import('./components/loaders/TextSlide').then((m) => ({ default: m.TextSlide as ComponentType<BaseLoaderProps> }))),
  'text-gradient': lazy(() => import('./components/loaders/TextGradient').then((m) => ({ default: m.TextGradient as ComponentType<BaseLoaderProps> }))),

  // v0.5.1 — extra text effects
  'text-typing': lazy(() => import('./components/loaders/TextTyping').then((m) => ({ default: m.TextTyping as ComponentType<BaseLoaderProps> }))),
  'text-glitch': lazy(() => import('./components/loaders/TextGlitch').then((m) => ({ default: m.TextGlitch as ComponentType<BaseLoaderProps> }))),
  'text-neon': lazy(() => import('./components/loaders/TextNeon').then((m) => ({ default: m.TextNeon as ComponentType<BaseLoaderProps> }))),
  'text-flip-3d': lazy(() => import('./components/loaders/TextFlip3D').then((m) => ({ default: m.TextFlip3D as ComponentType<BaseLoaderProps> }))),
  'text-bounce': lazy(() => import('./components/loaders/TextBounce').then((m) => ({ default: m.TextBounce as ComponentType<BaseLoaderProps> }))),
  'text-elastic': lazy(() => import('./components/loaders/TextElastic').then((m) => ({ default: m.TextElastic as ComponentType<BaseLoaderProps> }))),
  'text-stretch': lazy(() => import('./components/loaders/TextStretch').then((m) => ({ default: m.TextStretch as ComponentType<BaseLoaderProps> }))),
  'text-spin': lazy(() => import('./components/loaders/TextSpin').then((m) => ({ default: m.TextSpin as ComponentType<BaseLoaderProps> }))),
  'text-drop': lazy(() => import('./components/loaders/TextDrop').then((m) => ({ default: m.TextDrop as ComponentType<BaseLoaderProps> }))),
  'text-rainbow': lazy(() => import('./components/loaders/TextRainbow').then((m) => ({ default: m.TextRainbow as ComponentType<BaseLoaderProps> }))),
  'text-ripple': lazy(() => import('./components/loaders/TextRipple').then((m) => ({ default: m.TextRipple as ComponentType<BaseLoaderProps> }))),
  'text-zoom': lazy(() => import('./components/loaders/TextZoom').then((m) => ({ default: m.TextZoom as ComponentType<BaseLoaderProps> }))),

  // v0.6.0 — image loaders: each shares ImageLoader.tsx but binds a fixed animation
  'image-spin':      makeImageLazy('spin'),
  'image-pulse':     makeImageLazy('pulse'),
  'image-bounce':    makeImageLazy('bounce'),
  'image-shake':     makeImageLazy('shake'),
  'image-fade':      makeImageLazy('fade'),
  'image-flip-y':    makeImageLazy('flip-y'),
  'image-flip-x':    makeImageLazy('flip-x'),
  'image-swing':     makeImageLazy('swing'),
  'image-wobble':    makeImageLazy('wobble'),
  'image-heartbeat': makeImageLazy('heartbeat'),
  'image-glow':      makeImageLazy('glow'),
  'image-blur':      makeImageLazy('blur'),
  'image-float':     makeImageLazy('float'),
  'image-rubber':    makeImageLazy('rubber'),
  'image-jello':     makeImageLazy('jello'),
  'image-tada':      makeImageLazy('tada'),
  'image-zoom':      makeImageLazy('zoom'),
  'image-ring':      makeImageLazy('ring'),

  // v0.7.0 — skeletons
  'skeleton-bar':           skeletonLazy('SkeletonBar'),
  'skeleton-text':          skeletonLazy('SkeletonTextWrapper'),
  'skeleton-paragraph':     skeletonLazy('SkeletonParagraph'),
  'skeleton-avatar':        skeletonLazy('SkeletonAvatarWrapper'),
  'skeleton-avatar-square': skeletonLazy('SkeletonAvatarSquare'),
  'skeleton-image':         skeletonLazy('SkeletonImage'),
  'skeleton-button':        skeletonLazy('SkeletonButton'),
  'skeleton-profile':       skeletonLazy('SkeletonProfile'),
  'skeleton-list':          skeletonLazy('SkeletonList'),
  'skeleton-card':          skeletonLazy('SkeletonCardWrapper'),
  'skeleton-grid':          skeletonLazy('SkeletonGrid'),
  'skeleton-comment':       skeletonLazy('SkeletonComment'),
};

type SkeletonExtraExport =
  | 'SkeletonBar'
  | 'SkeletonImage'
  | 'SkeletonButton'
  | 'SkeletonAvatarSquare'
  | 'SkeletonProfile'
  | 'SkeletonList'
  | 'SkeletonGrid'
  | 'SkeletonComment'
  | 'SkeletonParagraph'
  | 'SkeletonTextWrapper'
  | 'SkeletonAvatarWrapper'
  | 'SkeletonCardWrapper';

function skeletonLazy(name: SkeletonExtraExport): LoaderComponent {
  return lazy(async () => {
    const m = await import('./components/skeletons/SkeletonExtras');
    return { default: m[name] as ComponentType<BaseLoaderProps> };
  });
}

function makeImageLazy(anim: ImageAnimation): LoaderComponent {
  return lazy(async () => {
    const m = await import('./components/loaders/ImageLoader');
    const Wrapped: ComponentType<BaseLoaderProps> = (props) =>
      createElement(m.ImageLoader, { ...props, animation: anim });
    Wrapped.displayName = `Image-${anim}`;
    return { default: Wrapped };
  });
}

export const ALL_LOADER_TYPES: LoaderType[] = Object.keys(LOADER_REGISTRY) as LoaderType[];
