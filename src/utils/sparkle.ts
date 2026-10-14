import type { CSSProperties } from 'react';

/** Four-point "AI" sparkle with concave sides, in a 24×24 box. */
const SPARKLE_PATH =
  'M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z';

const SPARKLE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='${SPARKLE_PATH}'/></svg>`,
)}") center / contain no-repeat`;

/** Default sparkle fill: a diagonal gradient from `--rl-color` to a lighter tint. */
export const SPARKLE_GRADIENT =
  'linear-gradient(135deg, var(--rl-color), color-mix(in srgb, var(--rl-color) 45%, #ffffff))';

/**
 * Styles that paint an element as a sparkle. It is a CSS mask (not an SVG with a
 * gradient id), so any number of instances can share a page without id clashes.
 * A mask also clips `filter`, so put glows on a wrapper element.
 */
export function sparkleShape(background: string = SPARKLE_GRADIENT): CSSProperties {
  return { background, WebkitMask: SPARKLE_MASK, mask: SPARKLE_MASK };
}
