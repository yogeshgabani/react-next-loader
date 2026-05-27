'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Square = forwardRef<HTMLDivElement, BaseLoaderProps>(function Square(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '75%',
          height: '75%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          borderRadius: '6px',
          animation: `${KEYFRAME.squareRotate} ${3 / 1}s ease-in-out infinite`,
          animationDuration: 'var(--rl-speed)',
        }}
      />
    </LoaderBase>
  );
});
