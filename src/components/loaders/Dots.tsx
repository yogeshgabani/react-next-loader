'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Dots = forwardRef<HTMLDivElement, BaseLoaderProps>(function Dots(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          gap: '20%',
          width: '100%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '20%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.dots} var(--rl-speed) ease-in-out ${i * 0.16}s infinite both`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
