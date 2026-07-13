'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const RotatingSquare = forwardRef<HTMLDivElement, BaseLoaderProps>(function RotatingSquare(
  props,
  ref,
) {
  const thickness = props.thickness ?? 4;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '80%',
          height: '80%',
          // Longhand only (see DualRing): the shorthand would restore the bottom
          // edge on every `thickness` change.
          borderStyle: 'solid',
          borderWidth: `${thickness}px`,
          borderColor: 'var(--rl-color)',
          borderBottomColor: 'transparent',
          boxSizing: 'border-box',
          boxShadow: 'var(--rl-glow)',
          borderRadius: '4px',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
