'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Typing = forwardRef<HTMLDivElement, BaseLoaderProps>(function Typing(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          gap: '12%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
          height: '60%',
          padding: '0 8%',
          borderRadius: '50px',
          background: 'color-mix(in srgb, var(--rl-color) 12%, transparent)',
          border: '1px solid color-mix(in srgb, var(--rl-color) 25%, transparent)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '16%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              animation: `${KEYFRAME.typing} var(--rl-speed) ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
