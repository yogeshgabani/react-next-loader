'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Jelly — a soft blob that wobbles and squishes, morphing its border radius. */
export const Jelly = forwardRef<HTMLDivElement, BaseLoaderProps>(function Jelly(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '78%',
          height: '78%',
          borderRadius: '50%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.jelly} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
