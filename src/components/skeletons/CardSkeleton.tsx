'use client';

import { forwardRef, type CSSProperties } from 'react';
import { Skeleton, type SkeletonProps } from './Skeleton';
import { TextSkeleton } from './TextSkeleton';
import { AvatarSkeleton } from './AvatarSkeleton';

export interface CardSkeletonProps
  extends Omit<SkeletonProps, 'width' | 'height' | 'circle'> {
  showAvatar?: boolean;
  showImage?: boolean;
  imageHeight?: number;
  lines?: number;
  width?: number | string;
  cardStyle?: CSSProperties;
}

export const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(function CardSkeleton(
  {
    showAvatar = true,
    showImage = true,
    imageHeight = 160,
    lines = 3,
    width = '100%',
    cardStyle,
    animation,
    speed,
    baseColor,
    highlightColor,
    ...rest
  },
  ref,
) {
  const childProps = { animation, speed, baseColor, highlightColor };
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label="Loading card"
      style={{
        width,
        padding: 16,
        borderRadius: 12,
        background: 'var(--rl-theme-bg, transparent)',
        border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        ...cardStyle,
      }}
      {...rest}
    >
      {showImage && <Skeleton height={imageHeight} rounded={8} {...childProps} />}
      {showAvatar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AvatarSkeleton size={40} {...childProps} />
          <div style={{ flex: 1 }}>
            <Skeleton height={12} width="40%" {...childProps} />
            <div style={{ height: 6 }} />
            <Skeleton height={10} width="25%" {...childProps} />
          </div>
        </div>
      )}
      <TextSkeleton lines={lines} {...childProps} />
    </div>
  );
});
