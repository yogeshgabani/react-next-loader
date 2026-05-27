import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  ALL_LOADER_TYPES,
  Loader,
  ThemeProvider,
  useTheme,
  type LoaderSize,
  type LoaderType,
  type ThemeMode,
} from 'react-loadify';
import { LoaderModal } from './LoaderModal';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES: Record<string, LoaderType[]> = {
  Basics: ['spinner', 'dual-ring', 'circle', 'dots', 'bars', 'pulse', 'ripple', 'wave'],
  'Scale & motion': ['beat', 'bounce', 'scale', 'sync', 'rise', 'skew', 'square', 'hash', 'fade'],
  'Ring & circle': ['clip', 'puff', 'ring', 'rotate', 'tail-spin', 'oval', 'moon', 'color-ring', 'three-circles'],
  Shapes: ['triangle', 'ball-triangle', 'hourglass', 'grid', 'pacman', 'climbing-box', 'infinity', 'vortex'],
  Specialty: ['clock', 'watch', 'propagate', 'magnifying-glass'],
  Dots: ['audio', 'comment', 'dna', 'hearts', 'line-wave', 'mutating-dots', 'three-dots', 'rings'],
  Lines: ['falling-lines', 'rotating-lines', 'rotating-triangles', 'radio', 'revolving-dot'],
  Blocks: ['blocks', 'fidget-spinner', 'rotating-square', 'flip-flop'],
  'AI & modern': ['gradient-orb', 'neural-network', 'ai-thinking', 'matrix', 'hologram', 'cyberpunk', 'floating-glass'],
  Creative: ['bolt', 'book', 'boxes', 'wifi', 'sunspot', 'xlvi', 'hairball', 'whirl'],
  '3D & advanced': ['cube', 'orbit', 'typing', 'blink', 'squircle', 'three-d'],
  Text: ['text-sequence', 'text-wave', 'text-dots', 'text-shimmer', 'text-blink', 'text-scale', 'text-slide', 'text-gradient'],
  'Text FX': ['text-typing', 'text-glitch', 'text-neon', 'text-flip-3d', 'text-bounce', 'text-elastic', 'text-stretch', 'text-spin', 'text-drop', 'text-rainbow', 'text-ripple', 'text-zoom'],
  Image: ['image-spin', 'image-pulse', 'image-bounce', 'image-shake', 'image-fade', 'image-flip-y', 'image-flip-x', 'image-swing', 'image-wobble', 'image-heartbeat', 'image-glow', 'image-blur', 'image-float', 'image-rubber', 'image-jello', 'image-tada', 'image-zoom', 'image-ring'],
  Skeleton: ['skeleton-bar', 'skeleton-text', 'skeleton-paragraph', 'skeleton-avatar', 'skeleton-avatar-square', 'skeleton-image', 'skeleton-button', 'skeleton-profile', 'skeleton-list', 'skeleton-card', 'skeleton-grid', 'skeleton-comment'],
};

const COLOR_PRESETS = [
  { name: 'Default', value: '' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Sky', value: '#0ea5e9' },
];

const SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/** Single brand gradient used on every active/selected element + the logo + the scroll-to-top button. */
export const BRAND_GRADIENT =
  'linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%)';
export const BRAND_GRADIENT_SOFT =
  'linear-gradient(135deg, color-mix(in srgb, #6366f1 28%, transparent), color-mix(in srgb, #ec4899 28%, transparent))';
export const BRAND_SHADOW = '0 6px 20px rgba(168, 85, 247, 0.42)';

const BG_PRESETS = [
  { key: 'none', label: 'No fill' },
  { key: 'stripes', label: 'Stripes' },
  { key: '#ffffff', label: 'White' },
  { key: '#0a0a0a', label: 'Black' },
] as const;

const STRIPES_BG = `repeating-linear-gradient(
  45deg,
  color-mix(in srgb, currentColor 4%, transparent) 0 12px,
  transparent 12px 24px
), color-mix(in srgb, currentColor 1.5%, transparent)`;

const CHECKER_BG = `repeating-conic-gradient(
  color-mix(in srgb, currentColor 12%, transparent) 0% 25%,
  transparent 0% 50%
) 0 0 / 12px 12px`;

/** Resolve a previewBg value to a CSS background string for the preview area. */
function resolvePreviewBg(bg: string): string {
  if (!bg || bg === 'none') return 'transparent';
  if (bg === 'stripes') return STRIPES_BG;
  return bg;
}

/** Background used by the small swatch button (visual cue for what's selected). */
function resolveSwatchBg(bg: string): string {
  if (bg === 'none') return CHECKER_BG;
  if (bg === 'stripes') return STRIPES_BG;
  return bg;
}

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function pascalCase(type: LoaderType): string {
  return type
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function snippetForLoader(type: LoaderType, size: LoaderSize, color: string): string {
  const name = pascalCase(type);
  const colorAttr = color ? ` color="${color}"` : '';
  return `import { ${name} } from 'react-loadify';\n\n<${name} size="${size}"${colorAttr} />`;
}

/* ------------------------------------------------------------------ */
/* Shared style tokens                                                 */
/* ------------------------------------------------------------------ */

const card: CSSProperties = {
  border: '1px solid color-mix(in srgb, currentColor 10%, transparent)',
  borderRadius: 14,
  background: 'var(--rl-theme-bg)',
};

const mono: CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

const pill = (active = false): CSSProperties => ({
  padding: '6px 12px',
  borderRadius: 999,
  border: active
    ? '1px solid transparent'
    : '1px solid color-mix(in srgb, currentColor 15%, transparent)',
  background: active ? BRAND_GRADIENT : 'transparent',
  color: active ? '#fff' : 'inherit',
  cursor: 'pointer',
  fontSize: 13,
  fontWeight: active ? 600 : 500,
  transition: 'all 160ms',
  whiteSpace: 'nowrap',
  boxShadow: active ? BRAND_SHADOW : 'none',
});

/* ------------------------------------------------------------------ */
/* Shell that applies background based on theme                        */
/* ------------------------------------------------------------------ */

function ThemedShell({ children }: { children: ReactNode }) {
  const { resolvedMode } = useTheme();
  useEffect(() => {
    const isDark = resolvedMode === 'dark';
    document.body.style.background = isDark ? '#09090b' : '#fafafa';
    document.body.style.color = isDark ? '#e4e4e7' : '#18181b';
    document.body.style.transition = 'background 200ms, color 200ms';

    // Theme-aware solid muted text colors, set on :root so they cascade
    // to every element via CSS-variable inheritance (no opacity tricks needed).
    const root = document.documentElement;
    root.style.setProperty('--rl-text-strong', isDark ? '#f4f4f5' : '#18181b');
    root.style.setProperty('--rl-text-muted',  isDark ? '#d4d4d8' : '#3f3f46');
    root.style.setProperty('--rl-text-faint',  isDark ? '#a1a1aa' : '#52525b');
  }, [resolvedMode]);
  return <>{children}</>;
}

/* ------------------------------------------------------------------ */
/* Top bar                                                             */
/* ------------------------------------------------------------------ */

function TopBar({
  mode,
  setMode,
}: {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'saturate(180%) blur(12px)',
        WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        background: 'color-mix(in srgb, var(--rl-theme-bg) 78%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: BRAND_GRADIENT,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            rl
          </span>
          <strong style={{ fontSize: 16 }}>react-loadify</strong>
          <span
            style={{
              marginLeft: 4,
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--rl-theme-primary) 14%, transparent)',
              color: 'var(--rl-theme-primary)',
              fontWeight: 600,
            }}
          >
            v0.4
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['light', 'dark', 'auto'] as const).map((m) => (
            <button key={m} style={pill(mode === m)} onClick={() => setMode(m)}>
              {m}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ totalCount }: { totalCount: number }) {
  return (
    <section style={{ textAlign: 'center', padding: '64px 24px 32px' }}>
      {/* Version pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 999,
          background: 'color-mix(in srgb, var(--rl-theme-primary) 14%, transparent)',
          border: '1px solid color-mix(in srgb, var(--rl-theme-primary) 30%, transparent)',
          color: 'var(--rl-theme-primary)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 28,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
        v0.4 · Now available
      </div>

      {/* Headline with partial gradient on the middle phrase */}
      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(34px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
        }}
      >
        The complete{' '}
        <span
          style={{
            background:
              'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          loader library
        </span>
        <br />
        for React &amp; Next.js
      </h1>

      <p
        style={{
          margin: '20px auto 0',
          maxWidth: 580,
          fontSize: 17,
          lineHeight: 1.6,
          color: 'var(--rl-text-muted, #52525b)',
        }}
      >
        {totalCount} loaders, skeletons, and progress bars — accessible, SSR-safe,
        tree-shakable. Works with React, Next.js, Vite, Remix, and CRA out of the box.
      </p>

      {/* Feature pills */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 28,
        }}
      >
        {[
          { icon: '⚡', text: 'SSR-Safe' },
          { icon: '♿', text: 'Accessible' },
          { icon: '🎨', text: 'Customizable' },
          { icon: '🪶', text: 'Tree-shakable' },
        ].map((f) => (
          <span
            key={f.text}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
              background: 'color-mix(in srgb, currentColor 3%, transparent)',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 14 }}>{f.icon}</span>
            {f.text}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Install code block                                                  */
/* ------------------------------------------------------------------ */

const PKG_TABS = [
  { key: 'npm', cmd: 'npm install react-loadify' },
  { key: 'pnpm', cmd: 'pnpm add react-loadify' },
  { key: 'yarn', cmd: 'yarn add react-loadify' },
];

function InstallBlock() {
  const [tab, setTab] = useState('npm');
  const [copied, setCopied] = useState(false);
  const cmd = PKG_TABS.find((t) => t.key === tab)?.cmd ?? '';

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(cmd).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section style={{ maxWidth: 640, margin: '0 auto 48px', padding: '0 24px' }}>
      <div
        style={{
          ...card,
          padding: 0,
          overflow: 'hidden',
          background: 'color-mix(in srgb, currentColor 4%, var(--rl-theme-bg))',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 8px 8px 14px',
            borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
          }}
        >
          <div style={{ display: 'flex', gap: 4 }}>
            {PKG_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: tab === t.key ? 'color-mix(in srgb, currentColor 8%, transparent)' : 'transparent',
                  color: 'inherit',
                  fontSize: 13,
                  fontWeight: tab === t.key ? 600 : 500,
                  cursor: 'pointer',
                  ...mono,
                }}
              >
                {t.key}
              </button>
            ))}
          </div>
          <button
            onClick={copy}
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              border: 'none',
              background: copied ? 'var(--rl-theme-primary)' : 'transparent',
              color: copied ? '#fff' : 'inherit',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 160ms',
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div style={{ padding: '16px 18px', ...mono, fontSize: 14, lineHeight: 1.5 }}>
          <span style={{ color: 'var(--rl-text-faint, #71717a)' }}>$ </span>
          {cmd}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Toolbar (search + size + color)                                     */
/* ------------------------------------------------------------------ */

function Toolbar({
  query,
  setQuery,
  size,
  setSize,
  color,
  setColor,
  previewBg,
  setPreviewBg,
  image,
  setImage,
}: {
  query: string;
  setQuery: (q: string) => void;
  size: LoaderSize;
  setSize: (s: LoaderSize) => void;
  color: string;
  setColor: (c: string) => void;
  previewBg: string;
  setPreviewBg: (b: string) => void;
  image: string;
  setImage: (img: string) => void;
}) {
  const onImageFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === 'string') setImage(result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div
      style={{
        ...card,
        padding: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 16,
            color: 'var(--rl-text-faint, #71717a)',
            pointerEvents: 'none',
          }}
        >
          ⌕
        </span>
        <input
          placeholder="Search loaders by name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 14px 11px 36px',
            borderRadius: 10,
            border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
            background: 'color-mix(in srgb, currentColor 4%, transparent)',
            color: 'inherit',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 160ms',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--rl-theme-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'color-mix(in srgb, currentColor 12%, transparent)';
          }}
        />
      </div>

      {/* Size + color row */}
      <div
        style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--rl-text-muted, #52525b)' }}>
            SIZE
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {SIZES.map((s) => (
              <button
                key={s as string}
                onClick={() => setSize(s)}
                style={{
                  width: 36,
                  height: 30,
                  borderRadius: 7,
                  border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                  background:
                    size === s
                      ? 'var(--rl-theme-primary)'
                      : 'color-mix(in srgb, currentColor 3%, transparent)',
                  color: size === s ? '#fff' : 'inherit',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 160ms',
                }}
              >
                {s as string}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--rl-text-muted, #52525b)' }}>
            COLOR
          </span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setColor(p.value)}
                title={p.name}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  border:
                    color === p.value
                      ? '2px solid var(--rl-theme-primary)'
                      : '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                  background:
                    p.value ||
                    'repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 10%, transparent) 0 4px, transparent 4px 8px)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 160ms',
                }}
              />
            ))}
            <input
              type="color"
              value={color || '#7c3aed'}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: 30,
                height: 30,
                padding: 2,
                borderRadius: 7,
                border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                background: 'transparent',
                cursor: 'pointer',
                marginLeft: 4,
              }}
              title="Custom color"
            />
          </div>
        </div>

        {/* Preview background */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--rl-text-muted, #52525b)' }}>
            BACKGROUND
          </span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {BG_PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPreviewBg(p.key)}
                title={p.label}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  border:
                    previewBg === p.key
                      ? '2px solid var(--rl-theme-primary)'
                      : '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                  background: resolveSwatchBg(p.key),
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 160ms',
                }}
              />
            ))}
            <input
              type="color"
              value={previewBg.startsWith('#') ? previewBg : '#0a0a0a'}
              onChange={(e) => setPreviewBg(e.target.value)}
              style={{
                width: 30,
                height: 30,
                padding: 2,
                borderRadius: 7,
                border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                background: 'transparent',
                cursor: 'pointer',
                marginLeft: 4,
              }}
              title="Custom background color"
            />
          </div>
        </div>

        {/* IMAGE upload (used by image-* loaders) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--rl-text-muted, #52525b)' }}>
            IMAGE
          </span>
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 10px',
              borderRadius: 8,
              border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
              background: 'color-mix(in srgb, currentColor 3%, transparent)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              transition: 'all 160ms',
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Selected"
                style={{
                  width: 22,
                  height: 22,
                  objectFit: 'cover',
                  borderRadius: 4,
                  border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                }}
              />
            ) : (
              <span style={{ fontSize: 14 }}>🖼</span>
            )}
            <span>{image ? 'Change image' : 'Upload image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageFile(e.target.files?.[0] ?? null)}
              style={{ display: 'none' }}
            />
          </label>
          {image && (
            <button
              onClick={() => setImage('')}
              title="Use default placeholder"
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                background: 'transparent',
                color: 'inherit',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky category bar                                                 */
/* ------------------------------------------------------------------ */

function CategoryBar({
  active,
  setActive,
  filteredCount,
}: {
  active: string;
  setActive: (c: string) => void;
  filteredCount: number;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const cats = ['All', ...Object.keys(CATEGORIES)];

  return (
    <div
      style={{
        position: 'sticky',
        top: 60,
        zIndex: 20,
        margin: '0 -24px 18px',
        padding: '14px 24px',
        background: 'color-mix(in srgb, var(--rl-theme-bg) 88%, transparent)',
        backdropFilter: 'saturate(180%) blur(12px)',
        WebkitBackdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
      }}
    >
      {/* Header row: label on left, "X showing" pill on right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--rl-text-muted, #52525b)',
          }}
        >
          Categories
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'var(--rl-text-muted, #52525b)',
            ...mono,
            whiteSpace: 'nowrap',
            padding: '6px 10px',
            borderRadius: 8,
            background: 'color-mix(in srgb, currentColor 4%, transparent)',
            border: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: 'var(--rl-theme-primary)',
              boxShadow: '0 0 6px var(--rl-theme-primary)',
            }}
          />
          <strong style={{ color: 'inherit', fontWeight: 700 }}>{filteredCount}</strong>
          <span>showing</span>
        </span>
      </div>

      {/* Responsive grid of category pills — equal cells, no scroll */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 8,
        }}
      >
        {cats.map((cat) => {
          const count =
            cat === 'All' ? ALL_LOADER_TYPES.length : CATEGORIES[cat]?.length ?? 0;
          const isActive = active === cat;
          const isHover = hovered === cat;

          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              onMouseEnter={() => setHovered(cat)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '9px 14px',
                borderRadius: 11,
                border: isActive
                  ? '1px solid transparent'
                  : '1px solid color-mix(in srgb, currentColor 11%, transparent)',
                background: isActive
                  ? BRAND_GRADIENT
                  : isHover
                    ? 'color-mix(in srgb, currentColor 7%, transparent)'
                    : 'color-mix(in srgb, currentColor 2.5%, transparent)',
                color: isActive ? '#fff' : 'inherit',
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '-0.005em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transform: isHover && !isActive ? 'translateY(-1px)' : 'translateY(0)',
                boxShadow: isActive ? BRAND_SHADOW : 'none',
                transition:
                  'transform 160ms, background 160ms, box-shadow 200ms, border-color 160ms',
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}
              >
                {cat}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 24,
                  height: 18,
                  padding: '0 6px',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  background: isActive
                    ? 'rgba(255, 255, 255, 0.22)'
                    : 'color-mix(in srgb, currentColor 9%, transparent)',
                  color: isActive ? '#fff' : 'inherit',
                  flexShrink: 0,
                  ...mono,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Loader card                                                         */
/* ------------------------------------------------------------------ */

function LoaderCard({
  type,
  size,
  color,
  previewBg,
  image,
  onCopy,
  onOpen,
  copied,
}: {
  type: LoaderType;
  size: LoaderSize;
  color: string;
  previewBg: string;
  image: string;
  onCopy: () => void;
  onOpen: () => void;
  copied: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      title="Click to configure & copy"
      style={{
        ...card,
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hover
          ? '0 12px 32px color-mix(in srgb, var(--rl-theme-primary) 15%, transparent)'
          : 'none',
        borderColor: hover
          ? 'color-mix(in srgb, var(--rl-theme-primary) 35%, transparent)'
          : 'color-mix(in srgb, currentColor 10%, transparent)',
        transition: 'transform 200ms, box-shadow 200ms, border-color 200ms',
      }}
    >
      {/* Preview */}
      <div
        style={{
          height: 170,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: resolvePreviewBg(previewBg),
          borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
        }}
      >
        <Loader
          type={type}
          size={size}
          color={color || undefined}
          image={type.startsWith('image-') ? (image || undefined) : undefined}
        />
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>
              {pascalCase(type)}
            </div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: 'var(--rl-text-muted, #52525b)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              type="{type}"
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            title="Quick copy (click card to fine-tune)"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: 'none',
              background: copied ? 'var(--rl-theme-primary)' : 'color-mix(in srgb, var(--rl-theme-primary) 10%, transparent)',
              color: copied ? '#fff' : 'var(--rl-theme-primary)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 160ms',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {copied ? '✓ Copied' : 'Copy code'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer({ totalCount }: { totalCount: number }) {
  const linkBtn: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 16px',
    borderRadius: 12,
    border: '1px solid color-mix(in srgb, currentColor 14%, transparent)',
    background: 'color-mix(in srgb, currentColor 3%, transparent)',
    color: 'inherit',
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 160ms',
    cursor: 'pointer',
  };

  return (
    <footer style={{ marginTop: 64, marginBottom: 24, position: 'relative' }}>
      {/* Gradient outline wrapper */}
      <div
        style={{
          padding: 1.5,
          borderRadius: 18,
          background:
            'linear-gradient(135deg, color-mix(in srgb, #a855f7 50%, transparent), color-mix(in srgb, #38bdf8 50%, transparent))',
        }}
      >
        <div
          style={{
            borderRadius: 16.5,
            background: 'var(--rl-theme-bg)',
            padding: '28px 32px',
          }}
        >
          {/* Top row: brand left, action buttons right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              {/* Mini logo with 3 colored dots */}
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, #a855f7 25%, transparent), color-mix(in srgb, #38bdf8 25%, transparent))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                {['#a855f7', '#ec4899', '#38bdf8'].map((c) => (
                  <span
                    key={c}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: c,
                      boxShadow: `0 0 8px ${c}`,
                    }}
                  />
                ))}
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>
                  react-loadify
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--rl-text-muted, #52525b)',
                    marginTop: 2,
                  }}
                >
                  Modern, accessible loader library for React &amp; Next.js
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                style={linkBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, currentColor 14%, transparent)';
                  e.currentTarget.style.transform = '';
                }}
              >
                <span style={{ fontSize: 14 }}>⌥</span>
                GitHub
              </a>
              <a
                href="https://npmjs.com/package/react-loadify"
                target="_blank"
                rel="noreferrer noopener"
                style={linkBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, currentColor 14%, transparent)';
                  e.currentTarget.style.transform = '';
                }}
              >
                <span style={{ fontSize: 14 }}>📦</span>
                npm
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ ...linkBtn, border: linkBtn.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'color-mix(in srgb, currentColor 14%, transparent)';
                  e.currentTarget.style.transform = '';
                }}
              >
                <span style={{ fontSize: 14 }}>🎛</span>
                Browse loaders
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              margin: '24px 0',
              background:
                'linear-gradient(90deg, transparent, color-mix(in srgb, currentColor 14%, transparent), transparent)',
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: 'var(--rl-text-muted, #52525b)',
                }}
              >
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    background: 'color-mix(in srgb, var(--rl-theme-primary) 16%, transparent)',
                    color: 'var(--rl-theme-primary)',
                  }}
                >
                  MIT
                </span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>© {new Date().getFullYear()} react-loadify</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>
                  <strong>{totalCount}</strong> loaders
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: 'var(--rl-text-muted, #52525b)',
                }}
              >
                Crafted with <span style={{ color: '#ec4899' }}>♥</span> for the React &amp;
                Next.js community
              </div>
            </div>

            <a
              href="https://github.com/yogeshgabani"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                ...linkBtn,
                fontSize: 13,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  'color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  'color-mix(in srgb, currentColor 14%, transparent)';
                e.currentTarget.style.transform = '';
              }}
            >
              <span style={{ color: 'var(--rl-text-muted, #52525b)' }}>
                Built by
              </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 700,
                }}
              >
                Yogesh Gabani
              </span>
              <span style={{ fontSize: 12, opacity: 0.7 }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll to top                                                       */
/* ------------------------------------------------------------------ */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 80,
        width: 46,
        height: 46,
        borderRadius: '50%',
        border: 'none',
        background:
          BRAND_GRADIENT,
        color: '#fff',
        fontSize: 18,
        cursor: 'pointer',
        boxShadow:
          '0 8px 24px color-mix(in srgb, var(--rl-theme-primary) 40%, transparent), 0 2px 6px rgba(0,0,0,0.18)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.85)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      ↑
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export function App() {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [size, setSize] = useState<LoaderSize>('lg');
  const [color, setColor] = useState('');
  const [previewBg, setPreviewBg] = useState<string>('stripes');
  const [image, setImage] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openType, setOpenType] = useState<LoaderType | null>(null);

  const filtered = useMemo(() => {
    const inCat =
      activeCategory === 'All'
        ? ALL_LOADER_TYPES
        : CATEGORIES[activeCategory] ?? ALL_LOADER_TYPES;
    if (!query.trim()) return inCat;
    const q = query.toLowerCase();
    return inCat.filter(
      (t) => t.toLowerCase().includes(q) || pascalCase(t).toLowerCase().includes(q),
    );
  }, [activeCategory, query]);

  const copy = (type: LoaderType) => {
    const snippet = snippetForLoader(type, size, color);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(snippet).catch(() => {});
    }
    setCopiedKey(type);
    window.setTimeout(() => {
      setCopiedKey((curr) => (curr === type ? null : curr));
    }, 1400);
  };

  return (
    <ThemeProvider mode={mode}>
      <ThemedShell>
        <TopBar mode={mode} setMode={setMode} />

        <Hero totalCount={ALL_LOADER_TYPES.length} />
        <InstallBlock />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px' }}>
          <Toolbar
            query={query}
            setQuery={setQuery}
            size={size}
            setSize={setSize}
            color={color}
            setColor={setColor}
            previewBg={previewBg}
            setPreviewBg={setPreviewBg}
            image={image}
            setImage={setImage}
          />
          <CategoryBar
            active={activeCategory}
            setActive={setActiveCategory}
            filteredCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <div
              style={{
                ...card,
                padding: 60,
                textAlign: 'center',
                color: 'var(--rl-text-muted, #52525b)',
                borderStyle: 'dashed',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>⌕</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                No loaders found
              </div>
              <div style={{ fontSize: 13 }}>
                Try a different search term or clear filters.
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {filtered.map((t) => (
                <LoaderCard
                  key={t}
                  type={t}
                  size={size}
                  color={color}
                  previewBg={previewBg}
                  image={image}
                  copied={copiedKey === t}
                  onCopy={() => copy(t)}
                  onOpen={() => setOpenType(t)}
                />
              ))}
            </div>
          )}

          <Footer totalCount={ALL_LOADER_TYPES.length} />
        </main>

        <LoaderModal
          type={openType}
          onClose={() => setOpenType(null)}
          initialSize={size}
          initialColor={color}
          previewBg={previewBg}
          initialImage={image}
        />

        <ScrollToTop />
      </ThemedShell>
    </ThemeProvider>
  );
}
