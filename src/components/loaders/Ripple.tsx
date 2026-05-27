'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Ripple = forwardRef<HTMLDivElement, BaseLoaderProps>(function Ripple(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'inline-block',
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${thickness}px solid var(--rl-color)`,
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.ripple} var(--rl-speed) cubic-bezier(0, 0.2, 0.8, 1) ${i * 0.5}s infinite`,
              boxSizing: 'border-box',
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
