'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Fading Circle — twelve dots arranged in a ring, fading in sequence (SpinKit). */
export const FadingCircle = forwardRef<HTMLDivElement, BaseLoaderProps>(function FadingCircle(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ position: 'absolute', inset: 0, transform: `rotate(${i * 30}deg)` }}>
            <span
              style={{
                display: 'block',
                width: '16%',
                height: '16%',
                margin: '0 auto',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                animation: `${KEYFRAME.circleFade} calc(var(--rl-speed) * 1.2) linear ${(i * 0.1).toFixed(1)}s infinite both`,
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
