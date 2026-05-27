'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Beat = forwardRef<HTMLDivElement, BaseLoaderProps>(function Beat(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ display: 'inline-flex', gap: '12%', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '22%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.beat} var(--rl-speed) ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
