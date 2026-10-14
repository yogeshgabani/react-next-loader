'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// x = left offset, s = diameter (both % of the box), d = phase offset in cycles.
const BUBBLES = [
  { x: 10, s: 16, d: 0 },
  { x: 36, s: 24, d: 0.35 },
  { x: 64, s: 14, d: 0.7 },
  { x: 76, s: 20, d: 0.2 },
  { x: 24, s: 12, d: 0.55 },
];

/** Bubbles — bubbles of different sizes rise, sway and pop at the top. */
export const Bubbles = forwardRef<HTMLDivElement, BaseLoaderProps>(function Bubbles(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {BUBBLES.map(({ x, s, d }, i) => (
          // Full-height column so translateY(%) is relative to the box height.
          <span
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${x}%`,
              width: `${s}%`,
              display: 'flex',
              alignItems: 'flex-end',
              opacity: 0,
              animation: `${KEYFRAME.bubbleRise} calc(var(--rl-speed) * 2) ease-in infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-2 * d).toFixed(2)})`,
            }}
          >
            <span
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                border: 'var(--rl-thickness, 2px) solid var(--rl-color)',
                background: 'color-mix(in srgb, var(--rl-color) 18%, transparent)',
                boxShadow: 'var(--rl-glow)',
                boxSizing: 'border-box',
                animation: `${KEYFRAME.bubbleSway} calc(var(--rl-speed) * 0.9) ease-in-out infinite`,
                animationDelay: `calc(var(--rl-speed) * ${(-0.3 * i).toFixed(1)})`,
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
