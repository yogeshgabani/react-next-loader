'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Two staggered waves of 8 particles; the second is rotated half a step and
// fires half a cycle later so the burst never goes quiet.
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  angle: (i % 8) * 45 + (i >= 8 ? 22.5 : 0),
  late: i >= 8,
  size: i >= 8 ? 9 : 12, // % of the box
}));

/** Burst — particles shoot out from the centre and fade, like a firework. */
export const Burst = forwardRef<HTMLDivElement, BaseLoaderProps>(function Burst(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {PARTICLES.map(({ angle, late, size }, i) => (
          <span
            key={i}
            style={{ position: 'absolute', inset: 0, transform: `rotate(${angle}deg)` }}
          >
            <span
              style={{
                position: 'absolute',
                left: `${50 - size / 2}%`,
                top: `${50 - size / 2}%`,
                width: `${size}%`,
                height: `${size}%`,
                borderRadius: '50%',
                background: 'var(--rl-color)',
                boxShadow: 'var(--rl-glow)',
                opacity: 0,
                animation: `${KEYFRAME.burst} calc(var(--rl-speed) * 1.4) cubic-bezier(0.2, 0.6, 0.4, 1) infinite`,
                animationDelay: late ? 'calc(var(--rl-speed) * -0.7)' : '0s',
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
