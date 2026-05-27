'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Puff = forwardRef<HTMLDivElement, BaseLoaderProps>(function Puff(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${thickness}px solid var(--rl-color)`,
              boxShadow: 'var(--rl-glow)',
              boxSizing: 'border-box',
              animation: `${KEYFRAME.puff} var(--rl-speed) cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
