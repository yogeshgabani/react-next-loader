'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DELAYS = [0, 0.25, 0.5];

export const FallingLines = forwardRef<HTMLDivElement, BaseLoaderProps>(function FallingLines(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'inline-flex',
          gap: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {DELAYS.map((d, i) => (
          <span
            key={i}
            style={{
              width: '12%',
              height: '75%',
              background: 'var(--rl-color)',
              borderRadius: '8px',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: 'bottom center',
              transform: 'rotate(20deg)',
              opacity: 0.4 + i * 0.2,
              animation: `${KEYFRAME.fadeInOut} var(--rl-speed) ease-in-out ${d}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
