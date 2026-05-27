'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const GradientOrb = forwardRef<HTMLDivElement, BaseLoaderProps>(function GradientOrb(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--rl-color) 70%, white) 0%, var(--rl-color) 60%, transparent 100%)',
          boxShadow: '0 0 28px var(--rl-color), inset 0 0 18px color-mix(in srgb, var(--rl-color) 40%, transparent)',
          animation: `${KEYFRAME.orbPulse} var(--rl-speed) ease-in-out infinite`,
        }}
      />
    </LoaderBase>
  );
});
