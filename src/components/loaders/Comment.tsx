'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Comment = forwardRef<HTMLDivElement, BaseLoaderProps>(function Comment(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '85%',
          background: 'var(--rl-color)',
          borderRadius: '24% 24% 24% 0',
          boxShadow: 'var(--rl-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8%',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '12%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: 'var(--rl-theme-bg, #fff)',
              animation: `${KEYFRAME.commentDot} var(--rl-speed) ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </span>
    </LoaderBase>
  );
});
