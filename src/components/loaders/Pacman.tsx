'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export const Pacman = forwardRef<HTMLDivElement, BaseLoaderProps>(function Pacman(props, ref) {
  return (
    <LoaderBase ref={ref} {...props}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',
          height: '70%',
          gap: '6%',
        }}
      >
        {/* Pac-Man (left) — two halves that pivot on his left side to chomp.
            aspect-ratio 1/1 keeps him perfectly round (not an ellipse). */}
        <span
          style={{
            position: 'relative',
            width: '45%',
            aspectRatio: '1 / 1',
            flexShrink: 0,
            alignSelf: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'var(--rl-color)',
              // 50% horizontal radius + 100% vertical radius forms a perfect
              // top semicircle on a square box.
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: '0% 100%',
              animation: `${KEYFRAME.pacmanTop} var(--rl-speed) ease-in-out infinite`,
            }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'var(--rl-color)',
              borderRadius: '0 0 50% 50% / 0 0 100% 100%',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: '0% 0%',
              animation: `${KEYFRAME.pacmanBottom} var(--rl-speed) ease-in-out infinite`,
            }}
          />
        </span>

        {/* Dots — fed into Pac-Man's mouth from the right */}
        <span
          style={{
            position: 'relative',
            flex: 1,
            height: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '14%',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: '18%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: 'var(--rl-color)',
                boxShadow: 'var(--rl-glow)',
                animation: `${KEYFRAME.pacmanDot} var(--rl-speed) linear ${i * 0.33}s infinite`,
              }}
            />
          ))}
        </span>
      </span>
    </LoaderBase>
  );
});
