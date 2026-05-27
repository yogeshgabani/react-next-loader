'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const ClimbingBox = forwardRef<HTMLDivElement, BaseLoaderProps>(function ClimbingBox(
  props,
  ref,
) {
  const thickness = props.thickness ?? 2;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Diagonal line from bottom-left to top-right */}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '142%',
            height: `${thickness}px`,
            background: 'var(--rl-color)',
            transformOrigin: '0% 100%',
            transform: 'rotate(-45deg)',
            borderRadius: '999px',
          }}
        />
        {/* Climbing box */}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '20%',
            aspectRatio: '1 / 1',
            border: `${thickness}px solid var(--rl-color)`,
            boxSizing: 'border-box',
            boxShadow: 'var(--rl-glow)',
            transformOrigin: 'center',
            animation: `${KEYFRAME.climbBox} var(--rl-speed) cubic-bezier(0.79, 0, 0.47, 0.97) infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
