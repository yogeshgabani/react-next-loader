'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface DNAProps extends BaseLoaderProps {
  colors?: [string, string];
}

const COUNT = 9;

export const DNA = forwardRef<HTMLDivElement, DNAProps>(function DNA(
  { colors = ['#e91e63', '#22d3ee'], ...rest },
  ref,
) {
  return (
    <LoaderBase ref={ref} {...rest}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '60%',
          perspective: '120px',
        }}
      >
        {[0, 1].map((row) => (
          <span
            key={row}
            style={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              animation: `${KEYFRAME.dnaRotate} var(--rl-speed) linear ${row * -0.5}s infinite`,
            }}
          >
            {Array.from({ length: COUNT }).map((_, i) => {
              const t = i / (COUNT - 1);
              const phase = t * Math.PI * 2 + row * Math.PI;
              const z = Math.sin(phase) * 50;
              const scale = (z + 60) / 120;
              return (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${t * 100}%`,
                    width: `${6 + scale * 6}%`,
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    background: colors[row]!,
                    transform: `translate(-50%, -50%) translateZ(${z}px)`,
                    opacity: 0.4 + scale * 0.6,
                    boxShadow: `0 0 ${6 * scale}px ${colors[row]}`,
                  }}
                />
              );
            })}
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
