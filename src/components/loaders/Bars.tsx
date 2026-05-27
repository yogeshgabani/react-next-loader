'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Bars = forwardRef<HTMLDivElement, BaseLoaderProps>(function Bars(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          gap: '12%',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              width: '14%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '2px',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.bars} var(--rl-speed) ease-in-out ${i * 0.12}s infinite`,
              transformOrigin: 'center',
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
