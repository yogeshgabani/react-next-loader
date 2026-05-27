'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Sync = forwardRef<HTMLDivElement, BaseLoaderProps>(function Sync(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '12%', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '24%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.sync} var(--rl-speed) ease-in-out ${i * 0.07}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
