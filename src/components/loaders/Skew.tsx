'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Skew = forwardRef<HTMLDivElement, BaseLoaderProps>(function Skew(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '70%',
          height: '70%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          borderRadius: '4px',
          animation: `${KEYFRAME.skew} var(--rl-speed) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
