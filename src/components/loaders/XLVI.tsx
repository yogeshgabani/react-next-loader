'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const XLVI = forwardRef<HTMLDivElement, BaseLoaderProps>(function XLVI(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            // Longhand only (see DualRing): the shorthand resets colors on
            // `thickness` change, hiding the ring.
            borderStyle: 'solid',
            borderWidth: `${thickness}px`,
            borderColor: 'transparent',
            borderTopColor: 'var(--rl-color)',
            borderRightColor: 'var(--rl-color)',
            boxSizing: 'border-box',
            boxShadow: 'var(--rl-glow)',
            animation: `${KEYFRAME.xlviOrbit} var(--rl-speed) linear infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: '20%',
            borderRadius: '50%',
            borderStyle: 'solid',
            borderWidth: `${thickness}px`,
            borderColor: 'transparent',
            borderBottomColor: 'var(--rl-color)',
            borderLeftColor: 'var(--rl-color)',
            boxSizing: 'border-box',
            boxShadow: 'var(--rl-glow)',
            opacity: 0.7,
            animation: `${KEYFRAME.spinReverse} var(--rl-speed) linear infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
