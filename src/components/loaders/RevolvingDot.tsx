'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const RevolvingDot = forwardRef<HTMLDivElement, BaseLoaderProps>(function RevolvingDot(
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
          borderRadius: '50%',
          border: `${thickness}px solid color-mix(in srgb, var(--rl-color) 25%, transparent)`,
          boxSizing: 'border-box',
          animation: `${KEYFRAME.revolve} var(--rl-speed) linear infinite`,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '25%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: 'var(--rl-color)',
            boxShadow: 'var(--rl-glow)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
