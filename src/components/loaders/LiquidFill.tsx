'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

/**
 * Liquid Fill — a round flask fills with wavy liquid, then drains. The wave
 * surface is the top edge of a large rotating rounded square; a second, paler
 * wave turning the other way adds depth.
 */
export const LiquidFill = forwardRef<HTMLDivElement, BaseLoaderProps>(function LiquidFill(props, ref) {
  const wave = (reverse: boolean) => ({
    position: 'absolute' as const,
    left: '-50%',
    top: reverse ? '-4%' : 0,
    width: '200%',
    height: '200%',
    borderRadius: '42%',
    background: reverse ? 'color-mix(in srgb, var(--rl-color) 45%, transparent)' : 'var(--rl-color)',
    animation: `${reverse ? KEYFRAME.spinReverse : KEYFRAME.spin} calc(var(--rl-speed) * ${reverse ? 5 : 3.5}) linear infinite`,
  });

  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: 'var(--rl-thickness, 3px) solid var(--rl-color)',
          boxShadow: 'var(--rl-glow)',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: '7%',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              animation: `${KEYFRAME.liquidRise} calc(var(--rl-speed) * 4) ease-in-out infinite`,
            }}
          >
            <span style={wave(true)} />
            <span style={wave(false)} />
          </span>
        </span>
      </span>
    </LoaderBase>
  );
});
