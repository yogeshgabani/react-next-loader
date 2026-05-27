'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const ThreeDots = forwardRef<HTMLDivElement, BaseLoaderProps>(function ThreeDots(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '14%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '40%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '22%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.threeDot} var(--rl-speed) cubic-bezier(0.45, 0.05, 0.55, 0.95) ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
