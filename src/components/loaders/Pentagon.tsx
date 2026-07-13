'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Pentagon — a spinning pentagon. */
export const Pentagon = forwardRef<HTMLDivElement, BaseLoaderProps>(function Pentagon(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '86%',
          height: '86%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
