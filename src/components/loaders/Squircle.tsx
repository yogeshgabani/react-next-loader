'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Squircle = forwardRef<HTMLDivElement, BaseLoaderProps>(function Squircle(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '80%',
          height: '80%',
          background: `linear-gradient(135deg, var(--rl-color), color-mix(in srgb, var(--rl-color) 50%, white))`,
          boxShadow: '0 0 18px var(--rl-color)',
          animation: `${KEYFRAME.squircleMorph} var(--rl-speed) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
