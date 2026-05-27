'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const NODES = [
  { cx: 15, cy: 50 },
  { cx: 50, cy: 20 },
  { cx: 50, cy: 80 },
  { cx: 85, cy: 50 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [1, 2],
];

export const NeuralNetwork = forwardRef<HTMLDivElement, BaseLoaderProps>(function NeuralNetwork(
  props,
  ref,
) {
  return (
    <LoaderBase ref={ref} {...props}>
      <svg
        viewBox="0 0 100 100"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(var(--rl-glow))' }}
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={NODES[a]!.cx}
            y1={NODES[a]!.cy}
            x2={NODES[b]!.cx}
            y2={NODES[b]!.cy}
            stroke="var(--rl-color)"
            strokeWidth={1.4}
            opacity={0.4}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`n-${i}`}
            cx={n.cx}
            cy={n.cy}
            r={6}
            fill="var(--rl-color)"
            style={{
              transformOrigin: `${n.cx}px ${n.cy}px`,
              animation: `${KEYFRAME.neuralPulse} var(--rl-speed) ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </svg>
    </LoaderBase>
  );
});
