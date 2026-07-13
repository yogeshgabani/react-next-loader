'use client';

import { forwardRef } from 'react';
import { LoaderBase } from '../../primitives/LoaderBase';
import { KEYFRAME } from '../../animations/keyframes';
import type { BaseLoaderProps } from '../../types';

export interface CapsulePinwheelProps extends BaseLoaderProps {
  colors?: [string, string, string, string];
}

// Four coloured capsules arranged as a pinwheel that rotates around the centre.
export const CapsulePinwheel = forwardRef<HTMLDivElement, CapsulePinwheelProps>(
  function CapsulePinwheel(
    { colors = ['#14b8a6', '#3b82f6', '#ec4899', '#f59e0b'], ...rest },
    ref,
  ) {
    return (
      <LoaderBase ref={ref} {...rest}>
        <span
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            animation: `${KEYFRAME.spin} var(--rl-speed) cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
        >
          {colors.map((c, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '16%',
                height: '32%',
                borderRadius: '999px',
                background: c,
                // point each capsule outward, offset from the centre, tilted for the pinwheel look
                transform: `rotate(${i * 90 + 45}deg) translateY(-90%)`,
                transformOrigin: 'center top',
              }}
            />
          ))}
        </span>
      </LoaderBase>
    );
  },
);
