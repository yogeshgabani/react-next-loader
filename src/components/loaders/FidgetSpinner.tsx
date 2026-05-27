'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface FidgetSpinnerProps extends BaseLoaderProps {
  frameColor?: string;
  ballColors?: [string, string, string];
}

const ANGLES = [0, 120, 240];

export const FidgetSpinner = forwardRef<HTMLDivElement, FidgetSpinnerProps>(function FidgetSpinner(
  { frameColor, ballColors = ['#ef4444', '#facc15', '#3b82f6'], ...rest },
  ref,
) {
  return (
    <LoaderBase ref={ref} {...rest}>
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: `${KEYFRAME.fidget} var(--rl-speed) cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`,
        }}
      >
        {/* Y-frame arms */}
        {ANGLES.map((deg, i) => (
          <span
            key={`arm-${i}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '12%',
              height: '40%',
              background: frameColor ?? 'color-mix(in srgb, var(--rl-color) 70%, #16a34a)',
              borderRadius: '8px',
              transformOrigin: '50% 0%',
              transform: `translate(-50%, 0) rotate(${deg}deg)`,
            }}
          />
        ))}
        {/* Outer balls */}
        {ANGLES.map((deg, i) => (
          <span
            key={`ball-${i}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '30%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              background: frameColor ?? 'color-mix(in srgb, var(--rl-color) 70%, #16a34a)',
              boxShadow: 'var(--rl-glow)',
              transformOrigin: '50% 50%',
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-32%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                width: '55%',
                aspectRatio: '1 / 1',
                borderRadius: '50%',
                background: ballColors[i]!,
                transform: `rotate(-${deg}deg)`,
              }}
            />
          </span>
        ))}
        {/* Center hub */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24%',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            background: frameColor ?? 'color-mix(in srgb, var(--rl-color) 70%, #16a34a)',
            border: '2px solid rgba(0,0,0,0.15)',
          }}
        />
      </span>
    </LoaderBase>
  );
});
