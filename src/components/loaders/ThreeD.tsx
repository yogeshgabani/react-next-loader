'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const DOTS = 8;

export const ThreeD = forwardRef<HTMLDivElement, BaseLoaderProps>(function ThreeD(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          width: '100%',
          height: '100%',
          perspective: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            position: 'relative',
            width: '80%',
            height: '80%',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg)',
            animation: `${KEYFRAME.threeD} var(--rl-speed) linear infinite`,
          }}
        >
          {Array.from({ length: DOTS }).map((_, i) => {
            const angle = (i / DOTS) * 360;
            return (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '18%',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: 'var(--rl-color)',
                  boxShadow: '0 0 14px var(--rl-color)',
                  transformOrigin: '50% 50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-180%)`,
                  opacity: 0.3,
                  animation: `${KEYFRAME.threeDDot} var(--rl-speed) ease-in-out ${(i / DOTS) * -1}s infinite`,
                }}
              />
            );
          })}
        </span>
      </span>
    </LoaderBase>
  );
});
