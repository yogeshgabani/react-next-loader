'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Moon = forwardRef<HTMLDivElement, BaseLoaderProps>(function Moon(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid color-mix(in srgb, var(--rl-color) 25%, transparent)',
          boxSizing: 'border-box',
          animation: `${KEYFRAME.moonOrbit} var(--rl-speed) linear infinite`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
