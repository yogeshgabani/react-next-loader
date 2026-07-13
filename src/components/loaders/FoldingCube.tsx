'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const LEAVES = [
  { top: 0, left: 0, origin: '100% 100%', delay: '0s' },
  { top: 0, left: '50%', origin: '0% 100%', delay: '0.3s' },
  { top: '50%', left: '50%', origin: '0% 0%', delay: '0.6s' },
  { top: '50%', left: 0, origin: '100% 0%', delay: '0.9s' },
] as const;

/** Folding Cube — four leaves fold in and out of the plane in sequence (SpinKit). */
export const FoldingCube = forwardRef<HTMLDivElement, BaseLoaderProps>(function FoldingCube(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%', transform: 'rotateZ(45deg)' }}>
        {LEAVES.map((l, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              top: l.top,
              left: l.left,
              background: 'var(--rl-color)',
              transformOrigin: l.origin,
              animation: `${KEYFRAME.foldCube} calc(var(--rl-speed) * 2.4) linear ${l.delay} infinite both`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
