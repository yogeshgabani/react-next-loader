'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

/** Sparkle Spin — a single AI sparkle turning with an ease, breathing in size. Great in buttons. */
export const SparkleSpin = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleSpin(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}>
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            ...sparkleShape(),
            animation: `${KEYFRAME.sparkleSpin} calc(var(--rl-speed) * 1.6) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
