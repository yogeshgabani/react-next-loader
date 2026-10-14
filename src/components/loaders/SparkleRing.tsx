'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import { sparkleShape } from '../../utils/sparkle';
import type { BaseLoaderProps } from '../../types';

// Tinted towards pink and cyan for an "AI glow", while still following `color`.
const RING_GRADIENT =
  'conic-gradient(from 0deg, var(--rl-color), color-mix(in srgb, var(--rl-color) 55%, #ec4899), color-mix(in srgb, var(--rl-color) 55%, #22d3ee), var(--rl-color))';
const RING_WIDTH = 'var(--rl-thickness, calc(var(--rl-size) / 10))';
const RING_MASK = `radial-gradient(farthest-side, transparent calc(100% - ${RING_WIDTH}), #000 calc(100% - ${RING_WIDTH} + 1px))`;

/** Sparkle Ring — a spinning multi-tone glow ring around a beating sparkle. */
export const SparkleRing = forwardRef<HTMLDivElement, BaseLoaderProps>(function SparkleRing(props, ref) {
  const ring = {
    position: 'absolute' as const,
    inset: 0,
    borderRadius: '50%',
    background: RING_GRADIENT,
    WebkitMask: RING_MASK,
    mask: RING_MASK,
    animation: `${KEYFRAME.spin} calc(var(--rl-speed) * 1.4) linear infinite`,
  };

  return (
    <LoaderBase ref={ref} {...props}>
      <span style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Blurred copy underneath = soft glow. The blur sits on a wrapper so the mask doesn't clip it. */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            filter: 'blur(calc(var(--rl-size) / 14))',
            opacity: 0.7,
          }}
        >
          <span style={ring} />
        </span>
        <span style={ring} />
        <span
          style={{
            position: 'absolute',
            inset: '30%',
            ...sparkleShape(),
            animation: `${KEYFRAME.beat} calc(var(--rl-speed) * 1.2) ease-in-out infinite`,
          }}
        />
      </span>
    </LoaderBase>
  );
});
