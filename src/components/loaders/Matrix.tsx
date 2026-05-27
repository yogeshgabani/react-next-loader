'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

const COLUMNS = 5;
const CHARS = ['0', '1', '0', '1'];

export const Matrix = forwardRef<HTMLDivElement, BaseLoaderProps>(function Matrix(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '8%',
          background: 'color-mix(in srgb, var(--rl-color) 8%, transparent)',
          fontFamily: 'ui-monospace, "SF Mono", monospace',
        }}
      >
        {Array.from({ length: COLUMNS }).map((_, col) => (
          <span
            key={col}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(col / COLUMNS) * 100}%`,
              width: `${100 / COLUMNS}%`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--rl-color)',
              textShadow: '0 0 8px var(--rl-color)',
              fontSize: '18%',
              lineHeight: 1.1,
              animation: `${KEYFRAME.matrixFall} ${1.4 + col * 0.3}s linear ${col * -0.4}s infinite`,
            }}
          >
            {CHARS.map((c, ci) => (
              <span key={ci} style={{ opacity: 1 - ci * 0.18 }}>
                {Math.random() > 0.5 ? c : '1'}
              </span>
            ))}
          </span>
        ))}
      </span>
    </LoaderBase>
  );
});
