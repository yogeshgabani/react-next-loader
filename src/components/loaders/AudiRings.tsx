'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface AudiRingsProps extends BaseLoaderProps {
  colors?: [string, string, string, string];
}

// Four overlapping rings (Audi-style) lighting up in sequence.
export const AudiRings = forwardRef<HTMLDivElement, AudiRingsProps>(
  function AudiRings(
    { colors = ['#2563eb', '#dc2626', '#eab308', '#16a34a'], ...rest },
    ref,
  ) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {colors.map((c, i) => (
            <span
              key={i}
              style={{
                width: '34%',
                height: '34%',
                marginLeft: i === 0 ? 0 : '-8%',
                borderRadius: '50%',
                border: 'var(--rl-thickness, 3px) solid',
                color: c,
                boxShadow: '0 0 8px currentColor',
                animation: `${KEYFRAME.audiPulse} var(--rl-speed) ease-in-out infinite`,
                animationDelay: `calc(var(--rl-speed) * ${i * 0.15})`,
              }}
            />
          ))}
        </span>
      </LoaderBase>
    );
  },
);
