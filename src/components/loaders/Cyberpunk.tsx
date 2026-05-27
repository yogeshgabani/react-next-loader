'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Cyberpunk = forwardRef<HTMLDivElement, BaseLoaderProps>(function Cyberpunk(
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
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: 'transparent',
            border: '2px solid var(--rl-color)',
            boxShadow: '0 0 14px var(--rl-color), inset 0 0 14px var(--rl-color)',
            clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)',
            animation: `${KEYFRAME.cyberFlicker} var(--rl-speed) steps(8, end) infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '4%',
            background: 'var(--rl-color)',
            boxShadow: '0 0 12px var(--rl-color)',
            animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
