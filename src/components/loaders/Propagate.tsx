'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Propagate = forwardRef<HTMLDivElement, BaseLoaderProps>(function Propagate(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              right: 0,
              width: '20%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.propagate} var(--rl-speed) linear ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
