'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

// "Loading..." wordmark with a ball gliding back and forth across it.
export const LoadingBall = forwardRef<HTMLDivElement, BaseLoaderProps>(
  function LoadingBall(props, ref) {
    return (
      <LoaderBase ref={ref} {...props}>
        <span
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 'calc(var(--rl-size) * 0.16)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--rl-color)',
              whiteSpace: 'nowrap',
            }}
          >
            Loading...
          </span>
          <span
            style={{
              position: 'absolute',
              width: 'calc(var(--rl-size) * 0.18)',
              height: 'calc(var(--rl-size) * 0.18)',
              borderRadius: '50%',
              background: 'var(--rl-color)',
              mixBlendMode: 'difference',
              boxShadow: 'var(--rl-glow)',
              animation: `${KEYFRAME.loadingBall} var(--rl-speed) ease-in-out infinite`,
            }}
          />
        </span>
      </LoaderBase>
    );
  },
);
