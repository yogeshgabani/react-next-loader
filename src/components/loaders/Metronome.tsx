'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Metronome — a weighted arm swinging from a pivot at the base. */
export const Metronome = forwardRef<HTMLDivElement, BaseLoaderProps>(function Metronome(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Swinging arm */}
        <span
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            width: '8%',
            height: '78%',
            marginLeft: '-4%',
            borderRadius: '999px',
            background: 'var(--rl-color)',
            transformOrigin: 'bottom center',
            animation: `${KEYFRAME.metronomeSwing} calc(var(--rl-speed) * 1.1) ease-in-out infinite`,
          }}
        />
        {/* Base */}
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '46%',
            height: '10%',
            marginLeft: '-23%',
            borderRadius: '999px',
            background: 'var(--rl-color)',
            opacity: 0.5,
          }}
        />
      </span>
    </LoaderBase>
  );
});
