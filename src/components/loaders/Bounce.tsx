'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Bounce = forwardRef<HTMLDivElement, BaseLoaderProps>(function Bounce(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'var(--rl-color)',
              opacity: 0.6,
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.bounceTwo} var(--rl-speed) ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
