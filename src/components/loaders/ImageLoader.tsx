'use client';

import { forwardRef, type CSSProperties } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export type ImageAnimation =
  | 'spin'
  | 'pulse'
  | 'bounce'
  | 'shake'
  | 'fade'
  | 'flip-y'
  | 'flip-x'
  | 'swing'
  | 'wobble'
  | 'heartbeat'
  | 'glow'
  | 'blur'
  | 'float'
  | 'rubber'
  | 'jello'
  | 'tada'
  | 'zoom'
  | 'ring';

export interface ImageLoaderProps extends BaseLoaderProps {
  /** Which animation to apply to the image. */
  animation?: ImageAnimation;
}

/** Built-in placeholder logo used when no `image` prop is provided. */
const DEFAULT_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
       <defs>
         <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
           <stop offset='0' stop-color='#a855f7'/>
           <stop offset='1' stop-color='#38bdf8'/>
         </linearGradient>
       </defs>
       <rect width='64' height='64' rx='12' fill='url(#g)'/>
       <text x='50%' y='56%' text-anchor='middle' font-family='ui-sans-serif,system-ui,sans-serif' font-weight='900' font-size='28' fill='white'>rl</text>
     </svg>`,
  );

interface AnimConfig {
  keyframe: string;
  duration: number;
  easing: string;
}

const ANIM_CONFIG: Record<Exclude<ImageAnimation, 'ring'>, AnimConfig> = {
  spin:      { keyframe: KEYFRAME.spin,         duration: 1.6, easing: 'linear' },
  pulse:     { keyframe: KEYFRAME.imgPulse,     duration: 1.2, easing: 'ease-in-out' },
  bounce:    { keyframe: KEYFRAME.imgBounce,    duration: 1.4, easing: 'cubic-bezier(0.28, 0.84, 0.42, 1)' },
  shake:     { keyframe: KEYFRAME.imgShake,     duration: 0.9, easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)' },
  fade:      { keyframe: KEYFRAME.imgFade,      duration: 1.4, easing: 'ease-in-out' },
  'flip-y':  { keyframe: KEYFRAME.imgFlipY,     duration: 1.8, easing: 'linear' },
  'flip-x':  { keyframe: KEYFRAME.imgFlipX,     duration: 1.8, easing: 'linear' },
  swing:     { keyframe: KEYFRAME.imgSwing,     duration: 1.4, easing: 'ease-in-out' },
  wobble:    { keyframe: KEYFRAME.imgWobble,    duration: 1.4, easing: 'ease-in-out' },
  heartbeat: { keyframe: KEYFRAME.imgHeartbeat, duration: 1.6, easing: 'ease-in-out' },
  glow:      { keyframe: KEYFRAME.imgGlow,      duration: 1.6, easing: 'ease-in-out' },
  blur:      { keyframe: KEYFRAME.imgBlur,      duration: 1.6, easing: 'ease-in-out' },
  float:     { keyframe: KEYFRAME.imgFloat,     duration: 2.4, easing: 'ease-in-out' },
  rubber:    { keyframe: KEYFRAME.imgRubber,    duration: 1.4, easing: 'ease-in-out' },
  jello:     { keyframe: KEYFRAME.imgJello,     duration: 1.6, easing: 'ease-in-out' },
  tada:      { keyframe: KEYFRAME.imgTada,      duration: 1.6, easing: 'ease-in-out' },
  zoom:      { keyframe: KEYFRAME.imgZoom,      duration: 1.4, easing: 'ease-in-out' },
};

const SWING_ORIGIN: Partial<Record<ImageAnimation, string>> = {
  swing: 'top center',
};

export const ImageLoader = forwardRef<HTMLDivElement, ImageLoaderProps>(function ImageLoader(
  {
    image,
    imageAlt,
    animation = 'spin',
    rounded,
    speed = 1,
    glow,
    'aria-label': ariaLabel,
    ...baseProps
  },
  ref,
) {
  const src = image || DEFAULT_IMAGE;
  const alt = imageAlt ?? ariaLabel ?? 'Loading';
  const imgRadius = rounded ? '50%' : '12%';
  const imgGlow = glow
    ? 'drop-shadow(0 0 12px var(--rl-color, currentColor))'
    : undefined;

  // Ring animation is special — image stays still, an animated ring rotates around it.
  if (animation === 'ring') {
    const ringDuration = `${1.4 / Math.max(speed, 0.01)}s`;
    return (
      <LoaderBase
        ref={ref}
        rounded={rounded}
        speed={speed}
        glow={glow}
        aria-label={ariaLabel}
        {...baseProps}
      >
        <span style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: imgRadius,
              filter: imgGlow,
              display: 'block',
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-8%',
              borderRadius: imgRadius,
              border: '3px solid transparent',
              borderTopColor: 'var(--rl-color, currentColor)',
              borderRightColor: 'var(--rl-color, currentColor)',
              boxSizing: 'border-box',
              animation: `${KEYFRAME.spin} ${ringDuration} linear infinite`,
              filter: glow ? 'drop-shadow(0 0 8px var(--rl-color, currentColor))' : undefined,
            }}
          />
        </span>
      </LoaderBase>
    );
  }

  const cfg = ANIM_CONFIG[animation];
  const duration = `${cfg.duration / Math.max(speed, 0.01)}s`;
  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: imgRadius,
    animation: `${cfg.keyframe} ${duration} ${cfg.easing} infinite`,
    transformOrigin: SWING_ORIGIN[animation] ?? 'center',
    filter: imgGlow,
    display: 'block',
  };

  return (
    <LoaderBase
      ref={ref}
      rounded={rounded}
      speed={speed}
      glow={glow}
      aria-label={ariaLabel}
      {...baseProps}
    >
      <img src={src} alt={alt} draggable={false} style={imgStyle} />
    </LoaderBase>
  );
});
