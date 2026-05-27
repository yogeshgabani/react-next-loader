'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface RotatingTrianglesProps extends BaseLoaderProps {
  colors?: [string, string];
}

export const RotatingTriangles = forwardRef<HTMLDivElement, RotatingTrianglesProps>(
  function RotatingTriangles({ colors = ['#3b82f6', '#f97316'], ...rest }, ref) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <span
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            animation: `${KEYFRAME.spin} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
        >
          {/* Top triangle pointing DOWN */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              filter: 'drop-shadow(var(--rl-glow))',
            }}
          >
            <polygon points="10,5 90,5 50,95" fill={colors[0]} />
          </svg>
          {/* Bottom triangle pointing UP */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '50%',
              filter: 'drop-shadow(var(--rl-glow))',
            }}
          >
            <polygon points="50,5 90,95 10,95" fill={colors[1]} />
          </svg>
        </span>
      </LoaderBase>
    );
  },
);
