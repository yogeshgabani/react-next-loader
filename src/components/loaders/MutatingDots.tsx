'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const MutatingDots = forwardRef<HTMLDivElement, BaseLoaderProps>(function MutatingDots(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: i === 0 ? '0%' : 'auto',
              right: i === 1 ? '0%' : 'auto',
              transform: 'translateY(-50%)',
              width: '35%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.mutateScale} var(--rl-speed) ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
