'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Blink = forwardRef<HTMLDivElement, BaseLoaderProps>(function Blink(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '20%',
          height: '100%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          borderRadius: '4px',
          animation: `${KEYFRAME.blink} var(--rl-speed) steps(1, end) infinite`,
        }}
      />
    </LoaderBase>
  );
});
