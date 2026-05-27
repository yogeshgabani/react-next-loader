'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Oval = forwardRef<HTMLDivElement, BaseLoaderProps>(function Oval(props, ref) {
  const thickness = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 38 38"
        style={{
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.oval} var(--rl-speed) linear infinite`,
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        <g fill="none" strokeWidth={thickness}>
          <circle cx="19" cy="19" r="16" stroke="color-mix(in srgb, var(--rl-color) 20%, transparent)" />
          <path d="M35 19a16 16 0 0 1-16 16" stroke="var(--rl-color)" strokeLinecap="round" />
        </g>
      </svg>
    </LoaderBase>
  );
});
