'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Flower — six petals arranged radially, pulsing in sequence while the flower spins. */
export const Flower = forwardRef<HTMLDivElement, BaseLoaderProps>(function Flower(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 2) linear infinite`,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '34%',
              height: '34%',
              marginLeft: '-17%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              transformOrigin: '50% 147%',
              // The keyframe reads --rl-petal so the per-petal rotation survives the scale animation.
              ['--rl-petal' as string]: `${i * 60}deg`,
              transform: `rotate(${i * 60}deg)`,
              animation: `${KEYFRAME.flowerPulse} calc(var(--rl-speed) * 1.2) ease-in-out ${(i * 0.12).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
