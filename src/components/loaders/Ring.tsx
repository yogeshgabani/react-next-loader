'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Ring = forwardRef<HTMLDivElement, BaseLoaderProps>(function Ring(props, ref) {
  const thickness = props.thickness ?? 4;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `${thickness}px solid color-mix(in srgb, var(--rl-color) 25%, transparent)`,
          borderTopColor: 'var(--rl-color)',
          borderRightColor: 'var(--rl-color)',
          boxSizing: 'border-box',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.ringSpin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
