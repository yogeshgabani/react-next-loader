'use client';

import { forwardRef, useEffect, useState } from 'react';
import type { BaseLoaderProps } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { resolveTextSize } from '../../utils/textSize';
import { cn } from '../../utils/cn';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=?<>/\\';
const FRAMES_PER_CHAR = 3;
const HOLD_FRAMES = 18;

/**
 * Text Scramble — random glyphs resolve into the text left-to-right, hold, then
 * re-scramble. JS-driven; renders the plain text on the server and stays static
 * when the user prefers reduced motion.
 */
export const TextScramble = forwardRef<HTMLSpanElement, BaseLoaderProps>(function TextScramble(
  { text = 'LOADING', size, inline, color, speed = 1, glow, className, style, 'aria-label': ariaLabel },
  ref,
) {
  const reducedMotion = useReducedMotion();
  // -1 = plain text (server render / reduced motion). Every tick changes the
  // frame, which re-renders with fresh random glyphs for unresolved chars.
  const [frame, setFrame] = useState(-1);
  const chars = (text || '').split('');

  useEffect(() => {
    if (reducedMotion || !text) {
      setFrame(-1);
      return;
    }
    const total = text.length * FRAMES_PER_CHAR + HOLD_FRAMES;
    let next = 0;
    const id = setInterval(() => {
      setFrame(next);
      next = (next + 1) % total;
    }, 55 / Math.max(speed, 0.01));
    return () => clearInterval(id);
  }, [text, speed, reducedMotion]);

  const resolved = frame < 0 ? chars.length : Math.floor(frame / FRAMES_PER_CHAR);

  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel ?? text ?? 'Loading'}
      className={cn('rl-text-loader', className)}
      style={{
        display: 'inline-flex',
        fontWeight: 700,
        fontSize: inline ? 'inherit' : resolveTextSize(size),
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        letterSpacing: '0.08em',
        lineHeight: 1.4,
        color: color ?? (inline ? 'currentColor' : 'var(--rl-theme-primary, currentColor)'),
        textShadow: glow ? '0 0 12px currentColor' : undefined,
        ...style,
      }}
    >
      {chars.map((char, i) => {
        if (char === ' ') return <span key={i} aria-hidden="true">{' '}</span>;
        const settled = i < resolved;
        return (
          <span key={i} aria-hidden="true" style={{ opacity: settled ? 1 : 0.45 }}>
            {settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]}
          </span>
        );
      })}
    </span>
  );
});
