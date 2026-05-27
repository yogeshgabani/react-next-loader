'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Wave = forwardRef<HTMLDivElement, BaseLoaderProps>(function Wave(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          gap: '10%',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: '12%',
              height: '100%',
              background: 'var(--rl-color)',
              borderRadius: '4px',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.wave} var(--rl-speed) ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
