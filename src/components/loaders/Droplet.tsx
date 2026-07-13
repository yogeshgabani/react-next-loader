'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DROP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='black' d='M50 6 C74 40 84 58 84 68 a34 34 0 0 1 -68 0 C16 58 26 40 50 6 Z'/%3E%3C/svg%3E";

/** Droplet — a teardrop that gently pulses. */
export const Droplet = forwardRef<HTMLDivElement, BaseLoaderProps>(function Droplet(props, ref) {
  const mask = `url("${DROP}") center / contain no-repeat`;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--rl-color)',
          WebkitMask: mask,
          mask,
          animation: `${KEYFRAME.pulse} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
