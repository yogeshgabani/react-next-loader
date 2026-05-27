'use client';

import { forwardRef } from 'react';
import { Skeleton, type SkeletonProps } from './Skeleton';

export interface TextSkeletonProps extends Omit<SkeletonProps, 'height' | 'width'> {
  lines?: number;
  lineHeight?: number | string;
  lastLineWidth?: string | number;
  gap?: number | string;
}

export const TextSkeleton = forwardRef<HTMLDivElement, TextSkeletonProps>(function TextSkeleton(
  { lines = 3, lineHeight = 12, lastLineWidth = '60%', gap = 8, style, ...rest },
  ref,
) {
  const lineArr = Array.from({ length: Math.max(lines, 1) });
  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label="Loading text"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        width: '100%',
        ...style,
      }}
    >
      {lineArr.map((_, i) => {
        const isLast = i === lineArr.length - 1;
        return (
          <Skeleton
            key={i}
            height={lineHeight}
            width={isLast && lineArr.length > 1 ? lastLineWidth : '100%'}
            {...rest}
          />
        );
      })}
    </div>
  );
});
