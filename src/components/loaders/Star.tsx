'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const STAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M50 5 L61 39 L97 39 L68 61 L79 95 L50 74 L21 95 L32 61 L3 39 L39 39 Z'/%3E%3C/svg%3E";

/** Star — a star that twinkles with a soft pulse. */
export const Star = forwardRef<HTMLDivElement, BaseLoaderProps>(function Star(props, ref) {
  const mask = `url("${STAR}") center / contain no-repeat`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--rl-color)',
          WebkitMask: mask,
          mask,
          animation: `${KEYFRAME.pulse} calc(var(--rl-speed) * 1.1) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
