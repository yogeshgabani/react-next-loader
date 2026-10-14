'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const PULSE_PATH = 'M2 27 H15 L18 22 L21 31 L25 9 L30 43 L33 27 H48';

/** Cardio — an ECG heartbeat line drawn and erased on a loop over a faint trace. */
export const Cardio = forwardRef<HTMLDivElement, BaseLoaderProps>(function Cardio(props, ref) {
  const strokeProps = {
    d: PULSE_PATH,
    fill: 'none',
    stroke: 'var(--rl-color)',
    strokeWidth: props.thickness ?? 3.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 50 50"
        style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        <path {...strokeProps} opacity={0.15} />
        <path
          {...strokeProps}
          pathLength={100}
          strokeDasharray={100}
          style={{ animation: `${KEYFRAME.drawPath} calc(var(--rl-speed) * 1.6) ease-in-out infinite` }}
        />
      </svg>
    </LoaderBase>
  );
});
