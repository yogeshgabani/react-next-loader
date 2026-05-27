'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Rise = forwardRef<HTMLDivElement, BaseLoaderProps>(function Rise(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '8%', alignItems: 'flex-end', justifyContent: 'center', width: '100%', height: '100%' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: '12%',
              height: '40%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              borderRadius: '4px',
              animation: `${KEYFRAME.rise} var(--rl-speed) cubic-bezier(0.39, 0.575, 0.565, 1) ${i * 0.12}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
