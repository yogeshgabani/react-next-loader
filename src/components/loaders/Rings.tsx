'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Rings = forwardRef<HTMLDivElement, BaseLoaderProps>(function Rings(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${thickness}px solid var(--rl-color)`,
              boxSizing: 'border-box',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.ringsPulse} var(--rl-speed) cubic-bezier(0, 0.2, 0.8, 1) ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
