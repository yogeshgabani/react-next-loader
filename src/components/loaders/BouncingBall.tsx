'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Bouncing Ball — a ball drops, squashes on impact and rebounds over a breathing shadow. */
export const BouncingBall = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function BouncingBall(props, ref) {
    const duration = 'calc(var(--rl-speed) * 1.1)';
    return (
      <LoaderBase ref={ref} {...props}>
        <span style={{ position: 'relative', width: '100%', height: '100%' }}>
          <span
            style={{
              position: 'absolute',
              left: '20%',
              bottom: '4%',
              width: '60%',
              height: '8%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              filter: 'blur(1px)',
              animation: `${KEYFRAME.ballShadow} ${duration} infinite`,
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '37%',
              top: '8%',
              width: '26%',
              height: '26%',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: '50% 100%',
              animation: `${KEYFRAME.ballBounce} ${duration} infinite`,
            }}
          />
        </span>
      </LoaderBase>
    );
  },
);
