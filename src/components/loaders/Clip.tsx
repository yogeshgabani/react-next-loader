'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Clip = forwardRef<HTMLDivElement, BaseLoaderProps>(function Clip(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `${thickness}px solid var(--rl-color)`,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          boxShadow: 'var(--rl-glow)',
          boxSizing: 'border-box',
          animation: `${KEYFRAME.clip} var(--rl-speed) cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite`,
        }}
      />
    </LoaderBase>
  );
});
