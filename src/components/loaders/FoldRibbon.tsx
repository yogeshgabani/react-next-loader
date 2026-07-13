'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface FoldRibbonProps extends BaseLoaderProps {
  ribbonColor?: string;
}

// A glossy 3D ribbon that folds and tumbles, casting a soft shadow.
export const FoldRibbon = forwardRef<HTMLDivElement, FoldRibbonProps>(
  function FoldRibbon({ ribbonColor = '#eab308', ...rest }, ref) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <span
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '260px',
          }}
        >
          <span
            style={{
              position: 'relative',
              width: '62%',
              height: '34%',
              transformStyle: 'preserve-3d',
              animation: `${KEYFRAME.foldRibbon} var(--rl-speed) ease-in-out infinite`,
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '999px',
                background: `linear-gradient(135deg, color-mix(in srgb, ${ribbonColor} 100%, #fff 25%), ${ribbonColor} 55%, color-mix(in srgb, ${ribbonColor} 60%, #000 30%))`,
                boxShadow: `0 14px 18px -8px color-mix(in srgb, ${ribbonColor} 55%, transparent)`,
                backfaceVisibility: 'hidden',
              }}
            />
          </span>
        </span>
      </LoaderBase>
    );
  },
);
