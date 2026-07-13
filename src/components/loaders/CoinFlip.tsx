'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Coin Flip — a disc flipping in 3D around its vertical axis. */
export const CoinFlip = forwardRef<HTMLDivElement, BaseLoaderProps>(function CoinFlip(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '72%',
          height: '72%',
          borderRadius: '50%',
          background: 'var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          animation: `${KEYFRAME.imgFlipY} calc(var(--rl-speed) * 1.3) linear infinite`,
        }}
      />
    </LoaderBase>
  );
});
