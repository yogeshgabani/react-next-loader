'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Pulse = forwardRef<HTMLDivElement, BaseLoaderProps>(function Pulse(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.pulse} var(--rl-speed) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
