import type { LoaderSize } from '../types';

const SIZE_MAP: Record<Exclude<LoaderSize, number>, number> = {
  xs: 16,
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
};

export function resolveSize(size: LoaderSize = 'md'): number {
  return typeof size === 'number' ? size : SIZE_MAP[size];
}

export function toPx(value: number): string {
  return `${value}px`;
}
