'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/** Newton's Cradle — four hanging balls; the outer two swing in alternation. */
export const NewtonCradle = forwardRef<HTMLDivElement, BaseLoaderProps>(function NewtonCradle(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              width: '22%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              transformOrigin: 'top center',
              animation:
                i === 0
                  ? `${KEYFRAME.newtonLeft} calc(var(--rl-speed) * 1.4) ease-in-out infinite`
                  : i === 3
                    ? `${KEYFRAME.newtonRight} calc(var(--rl-speed) * 1.4) ease-in-out infinite`
                    : undefined,
            }}
          >
            <span
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                boxShadow: 'var(--rl-glow)',
              }}
            />
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
