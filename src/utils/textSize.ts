import type { LoaderSize } from '../types';

const TEXT_SIZE_MAP: Record<Exclude<LoaderSize, number>, number> = {
  xs: 11,
  sm: 13,
  md: 16,
  lg: 22,
  xl: 32,
};

export function resolveTextSize(size: LoaderSize = 'md'): number {
  if (typeof size === 'number') return Math.max(10, Math.round(size * 0.35));
  return TEXT_SIZE_MAP[size];
}
