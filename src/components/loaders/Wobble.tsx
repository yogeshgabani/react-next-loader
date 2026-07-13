'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Wobble — a disc that squishes and slides side to side. */
export const Wobble = forwardRef<HTMLDivElement, BaseLoaderProps>(function Wobble(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '62%',
          height: '62%',
          borderRadius: '50%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.wobbleX} calc(var(--rl-speed) * 1) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
