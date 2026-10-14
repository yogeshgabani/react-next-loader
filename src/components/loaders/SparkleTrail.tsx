'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

// Leader first: each follower is smaller, fainter and a little behind.
const TRAIL = [
  { size: 26, opacity: 1 },
  { size: 19, opacity: 0.7 },
  { size: 14, opacity: 0.5 },
  { size: 10, opacity: 0.35 },
  { size: 7, opacity: 0.2 },
];
const LAG = 0.07; // seconds (× speed) between trail members

/** Sparkle Trail — a sparkle sweeps around a circle, leaving a comet tail of smaller sparkles. */
export const SparkleTrail = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleTrail(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{ position: 'relative', width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {TRAIL.map(({ size, opacity }, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 1.4) cubic-bezier(0.5, 0, 0.5, 1) infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-(TRAIL.length - i) * LAG).toFixed(2)})`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: `${50 - size / 2}%`,
                top: `${(26 - size) / 2}%`,
                width: `${size}%`,
                height: `${size}%`,
                opacity,
                ...sparkleShape(),
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
