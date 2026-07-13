// Unified entry point — re-exports everything.
// For best tree-shaking, prefer subpath imports:
//   import { Spinner } from 'react-next-loader/loaders';
//   import { Skeleton } from 'react-next-loader/skeletons';

export { Loader } from './components/loader/Loader';
export type { LoaderProps } from './components/loader/Loader';
export { ALL_LOADER_TYPES } from './registry';
export type { LoaderType } from './registry';

// All loaders
export {
  Spinner,
  DualRing,
  Circle,
  Dots,
  Bars,
  Pulse,
  Ripple,
  Wave,
  Beat,
  Bounce,
  Scale,
  Sync,
  Rise,
  Skew,
  Square,
  Hash,
  Fade,
  Clip,
  Puff,
  Ring,
  Rotate,
  TailSpin,
  Oval,
  Moon,
  ColorRing,
  ThreeCircles,
  Triangle,
  BallTriangle,
  Hourglass,
  Grid,
  Pacman,
  ClimbingBox,
  Infinity,
  Vortex,
  Clock,
  Watch,
  Propagate,
  MagnifyingGlass,
  MagnifyingScan,
  // v0.3.0 — react-loader-spinner remaining
  Audio,
  Blocks,
  Comment,
  DNA,
  FallingLines,
  FidgetSpinner,
  Hearts,
  LineWave,
  MutatingDots,
  Radio,
  RevolvingDot,
  Rings,
  RotatingLines,
  RotatingTriangles,
  ThreeDots,
  // v0.3.0 — AI / modern
  GradientOrb,
  NeuralNetwork,
  AIThinking,
  Matrix,
  Hologram,
  Cyberpunk,
  FloatingGlass,
  // v0.3.0 — awesome-loaders creative
  Bolt,
  Book,
  Boxes,
  Wifi,
  Sunspot,
  XLVI,
  // v0.3.0 — 3D / advanced
  Cube,
  Pyramid,
  Orbit,
  Typing,
  Blink,
  Squircle,
  // v0.4.0
  RotatingSquare,
  Hairball,
  Whirl,
  FlipFlop,
  ThreeD,
  // v0.5.0 — text loaders
  TextSequence,
  TextWave,
  TextDots,
  TextShimmer,
  TextBlink,
  TextScale,
  TextSlide,
  TextGradient,
  // v0.5.1 — extra text effects
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
  // v0.6.0 — image loader
  ImageLoader,
  // v1.1.0 — gradient & circle designs
  GradientSpinner,
  ConicGradient,
  BorderRotate,
  SimpleCircle,
  // v1.1.0 — extended classic loaders
  FoldingCube,
  CubeGrid,
  ChasingDots,
  DoubleBounce,
  RotatingPlane,
  FadingCircle,
  Atom,
  Fingerprint,
  Flower,
  Pinwheel,
  Helix,
  NewtonCradle,
  Jelly,
  Spiral,
  Gear,
  Heart,
  // v1.2.0 — more loaders (ldrs + fun/shapes)
  Roller,
  Ellipsis,
  Ring2,
  SpinnerBlade,
  Ping,
  Metronome,
  Waveform,
  Wobble,
  Quantum,
  Trefoil,
  DotStream,
  Reuleaux,
  Droplet,
  Battery,
  Star,
  CoinFlip,
  Hexagon,
  Pentagon,
  Gears,
  Planet,
  Superballs,
  PulseRing,
  // v1.3.0 — line & bar loaders
  LineBar,
  LineSlide,
  Barcode,
  LineScale,
  LineScalePulse,
  Equalizer,
  // v1.3.0 — more text effects
  TextFade,
  TextBlur,
  TextJump,
  TextSwing,
  TextSquish,
  TextFill,
  // v1.4.0 — uiverse picks
  NeonRing,
  AudiRings,
  CapsulePinwheel,
  StaggerBars,
  ProgressBar,
  CurveArcs,
  FoldRibbon,
  ShapeDraw,
  Bicycle,
  LoadingBall,
  RainCloud,
  Matchstick,
} from './components/loaders';
export type {
  ImageLoaderProps,
  ImageAnimation,
} from './components/loaders';
export type {
  ColorRingProps,
  HairballProps,
  WhirlProps,
  DNAProps,
  FidgetSpinnerProps,
  RotatingTrianglesProps,
  AudiRingsProps,
  CapsulePinwheelProps,
  CurveArcsProps,
  FoldRibbonProps,
  RainCloudProps,
  MatchstickProps,
} from './components/loaders';

export {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  CardSkeleton,
  // v0.7.0 — extra skeleton variants
  SkeletonBar,
  SkeletonImage,
  SkeletonButton,
  SkeletonAvatarSquare,
  SkeletonProfile,
  SkeletonList,
  SkeletonGrid,
  SkeletonComment,
  SkeletonParagraph,
} from './components/skeletons';
export type {
  SkeletonProps,
  SkeletonAnimation,
  TextSkeletonProps,
  AvatarSkeletonProps,
  CardSkeletonProps,
} from './components/skeletons';

export { LinearProgress, CircularProgress } from './components/progress';
export type { LinearProgressProps, CircularProgressProps } from './components/progress';

export { ThemeProvider, useTheme, lightTokens, darkTokens } from './theme';
export type { ThemeProviderProps, ThemeContextValue } from './theme';

export { useReducedMotion, useDelayedLoading } from './hooks';
export type { UseDelayedLoadingOptions } from './hooks';

export { LoaderBase } from './primitives/LoaderBase';
export type { LoaderBaseProps } from './primitives/LoaderBase';

export type {
  BaseLoaderProps,
  LoaderSize,
  LabelPosition,
  ThemeMode,
  ThemeTokens,
} from './types';
