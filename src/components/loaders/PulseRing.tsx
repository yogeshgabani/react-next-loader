'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Pulse Ring — a solid dot with a ring pulsing outward from it. */
export const PulseRing = forwardRef<HTMLDivElement, BaseLoaderProps>(function PulseRing(props, ref) {
  const bw = props.thickness != null ? `${props.thickness}px` : 'calc(var(--rl-size) / 14)';
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            borderStyle: 'solid',
            borderWidth: bw,
            borderColor: 'var(--rl-color)',
            animation: `${KEYFRAME.ripple} calc(var(--rl-speed) * 1.3) ease-out infinite`,
          }}
        />
        <span
          style={{
            width: '38%',
            height: '38%',
            borderRadius: '50%',
            background: 'var(--rl-color)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
