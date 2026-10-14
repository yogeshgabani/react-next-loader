'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const STEAM_X = [16, 22, 28];

/** Coffee — a cup on a saucer with wisps of steam rising and fading. */
export const Coffee = forwardRef<HTMLDivElement, BaseLoaderProps>(function Coffee(props, ref) {
  const sw = props.thickness ?? 3;
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 50 50"
        style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {STEAM_X.map((x, i) => (
          <path
            key={x}
            d={`M${x} 18 c-2.5 -3 2.5 -5 0 -8 c-2.5 -3 2.5 -5 0 -8`}
            fill="none"
            stroke="color-mix(in srgb, var(--rl-color) 65%, transparent)"
            strokeWidth={sw * 0.75}
            strokeLinecap="round"
            opacity={0}
            style={{
              animation: `${KEYFRAME.steam} calc(var(--rl-speed) * 1.8) ease-out infinite`,
              animationDelay: `calc(var(--rl-speed) * ${(-0.6 * i).toFixed(1)})`,
            }}
          />
        ))}
        <path d="M9 22 H35 V31 A9 9 0 0 1 26 40 H18 A9 9 0 0 1 9 31 Z" fill="var(--rl-color)" />
        <path
          d="M35 25 H38 A4.5 4.5 0 0 1 38 34 H34"
          fill="none"
          stroke="var(--rl-color)"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path d="M5 45 H39" stroke="var(--rl-color)" strokeWidth={sw} strokeLinecap="round" />
      </svg>
    </LoaderBase>
  );
});
