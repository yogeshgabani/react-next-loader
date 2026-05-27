'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const DualRing = forwardRef<HTMLDivElement, BaseLoaderProps>(function DualRing(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `${thickness}px solid transparent`,
          borderTopColor: 'var(--rl-color)',
          borderBottomColor: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.dualRing} var(--rl-speed) linear infinite`,
          boxSizing: 'border-box',
        }}
      />
    </LoaderBase>
  );
});
