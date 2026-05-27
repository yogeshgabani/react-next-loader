'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Hologram = forwardRef<HTMLDivElement, BaseLoaderProps>(function Hologram(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid var(--rl-color)',
          boxShadow: '0 0 24px var(--rl-color), inset 0 0 24px var(--rl-color)',
          background:
            'repeating-linear-gradient(0deg, color-mix(in srgb, var(--rl-color) 18%, transparent) 0 2px, transparent 2px 6px)',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--rl-color) 45%, transparent) 50%, transparent 100%)',
            animation: `${KEYFRAME.holoScan} var(--rl-speed) linear infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
