'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Line Bar — an indeterminate horizontal loading bar sweeping across a track. */
export const LineBar = forwardRef<HTMLDivElement, BaseLoaderProps>(function LineBar(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '18%',
          minHeight: 4,
          borderRadius: '999px',
          overflow: 'hidden',
          background: 'color-mix(in srgb, var(--rl-color) 20%, transparent)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '40%',
            borderRadius: '999px',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
            animation: `${KEYFRAME.lineBar} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
