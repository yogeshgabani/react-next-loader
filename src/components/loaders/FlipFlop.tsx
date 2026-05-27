'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const FlipFlop = forwardRef<HTMLDivElement, BaseLoaderProps>(function FlipFlop(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          gap: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '70%',
          perspective: '120px',
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              width: '34%',
              height: '100%',
              background: `linear-gradient(135deg, var(--rl-color), color-mix(in srgb, var(--rl-color) 50%, white))`,
              borderRadius: '8px',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: 'center center',
              animation: `${KEYFRAME.flipFlop} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
