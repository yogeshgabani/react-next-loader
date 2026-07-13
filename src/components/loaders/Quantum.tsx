'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Quantum — two dots orbiting a shared centre on opposite ends of a diameter. */
export const Quantum = forwardRef<HTMLDivElement, BaseLoaderProps>(function Quantum(props, ref) {
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
        <span
          style={{
            position: 'absolute',
            top: '38%',
            left: 0,
            width: '24%',
            height: '24%',
            borderRadius: '50%',
            background: 'var(--rl-color)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '38%',
            right: 0,
            width: '24%',
            height: '24%',
            borderRadius: '50%',
            background: 'color-mix(in srgb, var(--rl-color) 55%, transparent)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
