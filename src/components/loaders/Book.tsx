'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Book = forwardRef<HTMLDivElement, BaseLoaderProps>(function Book(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '80%',
          background: 'transparent',
          borderLeft: '2px solid var(--rl-color)',
          borderRight: '2px solid var(--rl-color)',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '600px',
        }}
      >
        <span
          style={{
            display: 'block',
            width: '50%',
            height: '100%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
            transformOrigin: 'left center',
            animation: `${KEYFRAME.bookFlip} var(--rl-speed) ease-in-out infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
