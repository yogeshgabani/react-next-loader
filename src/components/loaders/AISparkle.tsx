'use client';

import { forwardRef, type CSSProperties } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

const STARS: CSSProperties[] = [
  { left: '4%', top: '22%', width: '64%', height: '64%' },
  { right: '4%', top: '4%', width: '32%', height: '32%' },
  { right: '14%', bottom: '6%', width: '24%', height: '24%' },
];

/** AI Sparkle — Gemini-style four-point stars twinkling in turn. */
export const AISparkle = forwardRef<HTMLDivElement, BaseLoaderProps>(function AISparkle(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(var(--rl-glow))',
        }}
      >
        {STARS.map((pos, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              ...sparkleShape(),
              animation: `${KEYFRAME.sparkle} calc(var(--rl-speed) * 1.8) ease-in-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-0.6 * i).toFixed(1)})`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
