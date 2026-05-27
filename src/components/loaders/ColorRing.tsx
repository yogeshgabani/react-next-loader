'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface ColorRingProps extends BaseLoaderProps {
  colors?: [string, string, string, string, string];
}

const DEFAULTS: [string, string, string, string, string] = ['#e91e63', '#03a9f4', '#ffc107', '#4caf50', '#9c27b0'];

export const ColorRing = forwardRef<HTMLDivElement, ColorRingProps>(function ColorRing(
  { colors = DEFAULTS, ...rest },
  ref,
) {
  const thickness = rest.thickness ?? 4;
  return (
    <LoaderBase ref={ref} {...rest}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.spin} var(--rl-speed) linear infinite`,
        }}
      >
        {colors.map((c, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `${thickness}px solid transparent`,
              borderTopColor: c,
              boxSizing: 'border-box',
              animation: `${KEYFRAME.spin} ${1.5 + i * 0.3}s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
