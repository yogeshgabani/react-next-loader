'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// Filled heart, URL-encoded for a CSS mask.
const HEART =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E";

/** Heart — a single heart with a lifelike beating pulse. */
export const Heart = forwardRef<HTMLDivElement, BaseLoaderProps>(function Heart(props, ref) {
  const mask = `url("${HEART}") center / contain no-repeat`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--rl-color)',
          WebkitMask: mask,
          mask,
          animation: `${KEYFRAME.heartBeat} calc(var(--rl-speed) * 1.3) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
