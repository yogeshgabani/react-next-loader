'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Scale = forwardRef<HTMLDivElement, BaseLoaderProps>(function Scale(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '8%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              width: '10%',
              height: '100%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              borderRadius: '4px',
              animation: `${KEYFRAME.scaleY} var(--rl-speed) cubic-bezier(0.2, 0.68, 0.18, 1.08) ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
