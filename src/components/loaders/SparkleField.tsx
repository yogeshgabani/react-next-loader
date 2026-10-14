'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

// left, top, size (% of box) and phase (fraction of the cycle) — scattered by hand
// so the field looks random but renders identically on server and client.
const STARS = [
  { left: 8, top: 12, size: 22, phase: 0 },
  { left: 58, top: 4, size: 16, phase: 0.45 },
  { left: 34, top: 38, size: 30, phase: 0.2 },
  { left: 74, top: 40, size: 20, phase: 0.7 },
  { left: 10, top: 64, size: 14, phase: 0.85 },
  { left: 52, top: 72, size: 24, phase: 0.35 },
  { left: 82, top: 78, size: 12, phase: 0.6 },
];

/** Sparkle Field — a scattered field of sparkles twinkling on and off. */
export const SparkleField = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleField(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {STARS.map(({ left, top, size, phase }) => (
          <span
            key={`${left}-${top}`}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}%`,
              height: `${size}%`,
              ...sparkleShape(),
              animation: `${KEYFRAME.sparkleTwinkle} calc(var(--rl-speed) * 2) ease-in-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-2 * phase).toFixed(2)})`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
