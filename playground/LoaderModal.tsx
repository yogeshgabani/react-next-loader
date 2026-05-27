import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  Loader,
  type LabelPosition,
  type LoaderSize,
  type LoaderType,
} from 'react-loadify';

interface LoaderModalProps {
  type: LoaderType | null;
  onClose: () => void;
  initialSize: LoaderSize;
  initialColor: string;
  /** Background applied to the live-preview area. Pass 'none' or 'stripes' or a CSS color. */
  previewBg?: string;
  /** Image (data URL or URL) used by image-* loaders. */
  initialImage?: string;
}

const STRIPES_BG = `repeating-linear-gradient(
  45deg,
  color-mix(in srgb, currentColor 4%, transparent) 0 12px,
  transparent 12px 24px
), color-mix(in srgb, currentColor 2%, transparent)`;

function resolvePreviewBg(bg: string | undefined): string {
  if (!bg || bg === 'none') return 'transparent';
  if (bg === 'stripes') return STRIPES_BG;
  return bg;
}

/** Shared brand gradient — same palette as App.tsx, inlined to avoid a cross-file import. */
const BRAND_GRADIENT =
  'linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%)';
const BRAND_SHADOW = '0 6px 20px rgba(168, 85, 247, 0.42)';

const SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const COLOR_PRESETS = [
  { name: 'Default', value: '' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Sky', value: '#0ea5e9' },
];

const LABEL_PRESETS = ['Loading…', 'Please wait', 'Fetching data', 'Saving…', 'Almost there'];

const LABEL_POSITIONS: { value: LabelPosition; icon: string; title: string }[] = [
  { value: 'left', icon: '←', title: 'left' },
  { value: 'right', icon: '→', title: 'right' },
  { value: 'top', icon: '↑', title: 'top' },
  { value: 'bottom', icon: '↓', title: 'bottom' },
];

const mono: CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

function pascalCase(type: LoaderType): string {
  return type
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--rl-text-muted, #52525b)',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

const inputStyle: CSSProperties = {
  height: 32,
  padding: '0 12px',
  borderRadius: 7,
  border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
  background: 'color-mix(in srgb, currentColor 3%, transparent)',
  color: 'inherit',
  fontSize: 13,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

function highlight(snippet: string): React.ReactNode {
  const tokens = snippet.split(
    /(\/\/.*|"[^"]*"|\{[^{}]*\}|<\/?[A-Za-z][\w-]*|\bimport\b|\bfrom\b)/g,
  );
  return tokens.map((tok, i) => {
    if (!tok) return null;
    if (tok === 'import' || tok === 'from')
      return (
        <span key={i} style={{ color: '#c084fc' }}>
          {tok}
        </span>
      );
    if (/^".*"$/.test(tok))
      return (
        <span key={i} style={{ color: '#86efac' }}>
          {tok}
        </span>
      );
    if (/^\{.*\}$/.test(tok))
      return (
        <span key={i} style={{ color: '#fbbf24' }}>
          {tok}
        </span>
      );
    if (/^<\/?[A-Za-z]/.test(tok))
      return (
        <span key={i} style={{ color: '#7dd3fc' }}>
          {tok}
        </span>
      );
    return <span key={i}>{tok}</span>;
  });
}

export function LoaderModal({
  type,
  onClose,
  initialSize,
  initialColor,
  previewBg = 'stripes',
  initialImage = '',
}: LoaderModalProps) {
  const [size, setSize] = useState<LoaderSize>(initialSize);
  const [color, setColor] = useState(initialColor);
  const [speed, setSpeed] = useState(1);
  const [thickness, setThickness] = useState<number | ''>('');
  const [glow, setGlow] = useState(false);
  const [ariaLabel, setAriaLabel] = useState('Loading');
  const [label, setLabel] = useState('');
  const [labelPosition, setLabelPosition] = useState<LabelPosition>('right');
  const [customWidth, setCustomWidth] = useState<number | ''>('');
  const [customHeight, setCustomHeight] = useState<number | ''>('');
  const [className, setClassName] = useState('');
  const [labelColor, setLabelColor] = useState('');
  const [labelFontSize, setLabelFontSize] = useState<number>(14);
  const [labelWeight, setLabelWeight] = useState<number | ''>('');
  const [gap, setGap] = useState<number>(8);
  const [text, setText] = useState('');
  const [image, setImage] = useState(initialImage);
  const [skeletonAnimation, setSkeletonAnimation] = useState<
    'shimmer' | 'pulse' | 'wave' | 'none'
  >('shimmer');
  const [copied, setCopied] = useState(false);

  const isTextLoader = !!type && type.startsWith('text-');
  const isImageLoader = !!type && type.startsWith('image-');
  const isSkeletonLoader = !!type && type.startsWith('skeleton-');

  // Reset on each open.
  useEffect(() => {
    if (!type) return;
    setSize(initialSize);
    setColor(initialColor);
    setSpeed(1);
    setThickness('');
    setGlow(false);
    setAriaLabel('Loading');
    setLabel('');
    setLabelPosition('right');
    setCustomWidth('');
    setCustomHeight('');
    setClassName('');
    setLabelColor('');
    setLabelFontSize(14);
    setLabelWeight('');
    setGap(8);
    // Default text differs slightly across loader styles.
    if (type?.startsWith('text-')) {
      const sentenceCase = type === 'text-dots' || type === 'text-blink';
      setText(sentenceCase ? 'Loading' : 'LOADING');
    } else {
      setText('');
    }
    setImage(initialImage);
    setSkeletonAnimation('shimmer');
    setCopied(false);
  }, [type, initialSize, initialColor, initialImage]);

  // ESC + body scroll lock while open.
  useEffect(() => {
    if (!type) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [type, onClose]);

  const { name, snippet } = useMemo(() => {
    if (!type) return { name: '', snippet: '' };
    const n = pascalCase(type);
    const props: string[] = [];
    props.push(`size="${size}"`);
    if (typeof customWidth === 'number') props.push(`width={${customWidth}}`);
    if (typeof customHeight === 'number') props.push(`height={${customHeight}}`);
    if (color) props.push(`color="${color}"`);
    if (speed !== 1) props.push(`speed={${speed}}`);
    if (typeof thickness === 'number') props.push(`thickness={${thickness}}`);
    if (glow) props.push('glow');
    if (label) props.push(`label="${label}"`);
    if (label && labelPosition !== 'right') props.push(`labelPosition="${labelPosition}"`);
    if (label && labelColor) props.push(`labelColor="${labelColor}"`);
    if (label && labelFontSize !== 14) props.push(`labelFontSize={${labelFontSize}}`);
    if (label && typeof labelWeight === 'number') props.push(`labelWeight={${labelWeight}}`);
    if (label && gap !== 8) props.push(`gap={${gap}}`);
    if (text) props.push(`text="${text}"`);
    if (image) {
      // Data URLs are huge — show a placeholder path in the snippet.
      const imgVal = image.startsWith('data:') ? '/your-image.png' : image;
      props.push(`image="${imgVal}"`);
    }
    if (skeletonAnimation && skeletonAnimation !== 'shimmer') {
      props.push(`skeletonAnimation="${skeletonAnimation}"`);
    }
    if (ariaLabel && ariaLabel !== 'Loading') props.push(`aria-label="${ariaLabel}"`);
    if (className) props.push(`className="${className}"`);

    const propLines = props.length === 1 ? ` ${props[0]} ` : `\n  ${props.join('\n  ')}\n`;
    return {
      name: n,
      snippet: `import { ${n} } from 'react-loadify';\n\n<${n}${propLines}/>`,
    };
  }, [
    type,
    size,
    color,
    speed,
    thickness,
    glow,
    label,
    labelPosition,
    labelColor,
    labelFontSize,
    labelWeight,
    gap,
    text,
    image,
    skeletonAnimation,
    ariaLabel,
    customWidth,
    customHeight,
    className,
  ]);

  if (!type) return null;

  const copy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(snippet).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Configure ${name} loader`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'rl-modal-fade 180ms ease-out',
      }}
    >
      <style>{`
        @keyframes rl-modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rl-modal-pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--rl-theme-bg)',
          color: 'inherit',
          borderRadius: 18,
          width: '100%',
          maxWidth: 1100,
          maxHeight: '94vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)',
          border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
          animation: 'rl-modal-pop 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 20, letterSpacing: '-0.01em' }}>{name}</h2>
            <div
              style={{
                ...mono,
                fontSize: 12,
                marginTop: 2,
                color: 'var(--rl-text-muted, #52525b)',
              }}
            >
              type="{type}"
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
              background: 'transparent',
              color: 'inherit',
              fontSize: 18,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Controls (scrollable when many) */}
        <div
          style={{
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
            background: 'color-mix(in srgb, currentColor 2.5%, transparent)',
            maxHeight: '44vh',
            overflowY: 'auto',
          }}
        >
          <Field label="Size">
            <div style={{ display: 'flex', gap: 4 }}>
              {SIZES.map((s) => (
                <button
                  key={s as string}
                  onClick={() => setSize(s)}
                  style={{
                    flex: 1,
                    height: 32,
                    borderRadius: 7,
                    border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background:
                      size === s
                        ? BRAND_GRADIENT
                        : 'color-mix(in srgb, currentColor 3%, transparent)',
                    color: size === s ? '#fff' : 'inherit',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {s as string}
                </button>
              ))}
            </div>
          </Field>

          {isSkeletonLoader && (
            <Field label="Skeleton animation">
              <div style={{ display: 'flex', gap: 4 }}>
                {(['shimmer', 'pulse', 'wave', 'none'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setSkeletonAnimation(a)}
                    style={{
                      flex: 1,
                      height: 32,
                      borderRadius: 7,
                      border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                      background:
                        skeletonAnimation === a
                          ? BRAND_GRADIENT
                          : 'color-mix(in srgb, currentColor 3%, transparent)',
                      color: skeletonAnimation === a ? '#fff' : 'inherit',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </Field>
          )}

          {isImageLoader && (
            <Field label="Image">
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                  background: 'color-mix(in srgb, currentColor 3%, transparent)',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 500,
                  height: 32,
                  boxSizing: 'border-box',
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Selected"
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: 'cover',
                      borderRadius: 4,
                      border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    }}
                  />
                ) : (
                  <span style={{ fontSize: 14 }}>🖼</span>
                )}
                <span>{image ? 'Change' : 'Upload image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const result = ev.target?.result;
                      if (typeof result === 'string') setImage(result);
                    };
                    reader.readAsDataURL(file);
                  }}
                  style={{ display: 'none' }}
                />
              </label>
              {image && (
                <button
                  onClick={() => setImage('')}
                  style={{
                    marginTop: 4,
                    padding: '3px 8px',
                    borderRadius: 999,
                    border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background: 'transparent',
                    color: 'inherit',
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  Use placeholder
                </button>
              )}
            </Field>
          )}

          {isTextLoader && (
            <Field label="Text content">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="LOADING"
                style={inputStyle}
              />
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                {['LOADING', 'Loading', 'PLEASE WAIT', 'Fetching', 'Saving…'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setText(p)}
                    style={{
                      fontSize: 10,
                      padding: '3px 8px',
                      borderRadius: 999,
                      border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                      background: text === p ? BRAND_GRADIENT : 'transparent',
                      color: text === p ? '#fff' : 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </Field>
          )}

          <Field label={`Speed × ${speed.toFixed(1)}`}>
            <input
              type="range"
              min={0.2}
              max={3}
              step={0.1}
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rl-theme-primary)' }}
            />
          </Field>

          <Field label="Color">
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
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
                }}
                title="Custom color"
              />
            </div>
          </Field>

          <Field label="Thickness">
            <input
              type="number"
              min={1}
              max={12}
              placeholder="auto"
              value={thickness}
              onChange={(e) => {
                const v = e.target.value;
                setThickness(v === '' ? '' : Math.max(1, Math.min(12, Number(v))));
              }}
              style={{ ...inputStyle, ...mono }}
            />
          </Field>

          <Field label="Glow">
            <button
              onClick={() => setGlow((g) => !g)}
              style={{
                position: 'relative',
                width: 56,
                height: 30,
                borderRadius: 999,
                border: 'none',
                background: glow
                  ? BRAND_GRADIENT
                  : 'color-mix(in srgb, currentColor 15%, transparent)',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 160ms',
              }}
              role="switch"
              aria-checked={glow}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: glow ? 28 : 3,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  transition: 'left 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </button>
          </Field>

          <Field label="aria-label">
            <input
              type="text"
              value={ariaLabel}
              onChange={(e) => setAriaLabel(e.target.value)}
              placeholder="Loading"
              style={inputStyle}
            />
          </Field>

          {/* Label text + presets */}
          <Field label="Label text">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Loading…"
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
              {LABEL_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setLabel(p)}
                  style={{
                    fontSize: 10,
                    padding: '3px 8px',
                    borderRadius: 999,
                    border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background:
                      label === p ? BRAND_GRADIENT : 'transparent',
                    color: label === p ? '#fff' : 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>

          {/* Label position */}
          <Field label="Label position">
            <div style={{ display: 'flex', gap: 4 }}>
              {LABEL_POSITIONS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setLabelPosition(p.value)}
                  disabled={!label}
                  title={p.title}
                  style={{
                    flex: 1,
                    height: 32,
                    borderRadius: 7,
                    border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background:
                      labelPosition === p.value && label
                        ? BRAND_GRADIENT
                        : 'color-mix(in srgb, currentColor 3%, transparent)',
                    color: labelPosition === p.value && label ? '#fff' : 'inherit',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: label ? 'pointer' : 'not-allowed',
                    opacity: label ? 1 : 0.5,
                  }}
                >
                  {p.icon}
                </button>
              ))}
            </div>
          </Field>

          {/* Label color */}
          <Field label="Label color">
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => label && setLabelColor(p.value)}
                  disabled={!label}
                  title={p.name}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 6,
                    border:
                      labelColor === p.value
                        ? '2px solid var(--rl-theme-primary)'
                        : '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background:
                      p.value ||
                      'repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 10%, transparent) 0 4px, transparent 4px 8px)',
                    cursor: label ? 'pointer' : 'not-allowed',
                    opacity: label ? 1 : 0.5,
                    padding: 0,
                  }}
                />
              ))}
              <input
                type="color"
                value={labelColor || '#7c3aed'}
                onChange={(e) => setLabelColor(e.target.value)}
                disabled={!label}
                style={{
                  width: 30,
                  height: 30,
                  padding: 2,
                  borderRadius: 7,
                  border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                  background: 'transparent',
                  cursor: label ? 'pointer' : 'not-allowed',
                  opacity: label ? 1 : 0.5,
                }}
                title="Custom label color"
              />
            </div>
          </Field>

          {/* Label font size */}
          <Field label={`Label font size · ${labelFontSize}px`}>
            <input
              type="range"
              min={10}
              max={40}
              step={1}
              value={labelFontSize}
              onChange={(e) => setLabelFontSize(parseInt(e.target.value, 10))}
              disabled={!label}
              style={{
                width: '100%',
                accentColor: 'var(--rl-theme-primary)',
                opacity: label ? 1 : 0.5,
                cursor: label ? 'pointer' : 'not-allowed',
              }}
            />
          </Field>

          {/* Label weight */}
          <Field label="Label weight">
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { label: 'Auto', value: '' as number | '' },
                { label: 'Normal', value: 400 },
                { label: 'Semi', value: 600 },
                { label: 'Bold', value: 700 },
              ].map((w) => (
                <button
                  key={String(w.value)}
                  onClick={() => label && setLabelWeight(w.value)}
                  disabled={!label}
                  style={{
                    flex: 1,
                    height: 32,
                    borderRadius: 7,
                    border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                    background:
                      labelWeight === w.value && label
                        ? BRAND_GRADIENT
                        : 'color-mix(in srgb, currentColor 3%, transparent)',
                    color: labelWeight === w.value && label ? '#fff' : 'inherit',
                    fontSize: 11,
                    fontWeight: typeof w.value === 'number' ? w.value : 500,
                    cursor: label ? 'pointer' : 'not-allowed',
                    opacity: label ? 1 : 0.5,
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Gap */}
          <Field label={`Gap · ${gap}px`}>
            <input
              type="range"
              min={0}
              max={40}
              step={1}
              value={gap}
              onChange={(e) => setGap(parseInt(e.target.value, 10))}
              disabled={!label}
              style={{
                width: '100%',
                accentColor: 'var(--rl-theme-primary)',
                opacity: label ? 1 : 0.5,
                cursor: label ? 'pointer' : 'not-allowed',
              }}
            />
          </Field>

          {/* Custom width */}
          <Field label="Width (px)">
            <input
              type="number"
              min={8}
              max={500}
              placeholder="auto (from size)"
              value={customWidth}
              onChange={(e) => {
                const v = e.target.value;
                setCustomWidth(v === '' ? '' : Math.max(8, Math.min(500, Number(v))));
              }}
              style={{ ...inputStyle, ...mono }}
            />
          </Field>

          {/* Custom height */}
          <Field label="Height (px)">
            <input
              type="number"
              min={8}
              max={500}
              placeholder="auto (from size)"
              value={customHeight}
              onChange={(e) => {
                const v = e.target.value;
                setCustomHeight(v === '' ? '' : Math.max(8, Math.min(500, Number(v))));
              }}
              style={{ ...inputStyle, ...mono }}
            />
          </Field>

          {/* ClassName */}
          <Field label="className">
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. my-loader"
              style={{ ...inputStyle, ...mono }}
            />
          </Field>
        </div>

        {/* Body: code + preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          {/* Code panel */}
          <div
            style={{
              position: 'relative',
              padding: '20px 24px',
              background: '#0d1117',
              color: '#e6edf3',
              borderRight: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
              minHeight: 280,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8b949e',
                }}
              >
                Code
              </span>
              <button
                onClick={copy}
                style={{
                  padding: '6px 14px',
                  borderRadius: 7,
                  border: 'none',
                  background: copied ? '#22c55e' : BRAND_GRADIENT,
                  boxShadow: copied ? 'none' : BRAND_SHADOW,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 160ms',
                }}
              >
                {copied ? '✓ Copied!' : 'Copy code'}
              </button>
            </div>
            <pre
              style={{
                ...mono,
                margin: 0,
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {highlight(snippet)}
            </pre>
          </div>

          {/* Preview panel */}
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 280,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--rl-text-muted, #52525b)',
                marginBottom: 14,
              }}
            >
              Live preview
            </span>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                background: resolvePreviewBg(previewBg),
                border: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
                minHeight: 220,
                padding: 24,
              }}
            >
              <Loader
                type={type}
                size={size}
                width={typeof customWidth === 'number' ? customWidth : undefined}
                height={typeof customHeight === 'number' ? customHeight : undefined}
                color={color || undefined}
                speed={speed}
                thickness={typeof thickness === 'number' ? thickness : undefined}
                glow={glow}
                aria-label={ariaLabel || 'Loading'}
                label={label || undefined}
                labelPosition={labelPosition}
                labelColor={labelColor || undefined}
                labelFontSize={labelFontSize}
                labelWeight={typeof labelWeight === 'number' ? labelWeight : undefined}
                gap={gap}
                text={text || undefined}
                image={image || undefined}
                skeletonAnimation={isSkeletonLoader ? skeletonAnimation : undefined}
                className={className || undefined}
              />
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 12,
                color: 'var(--rl-text-muted, #52525b)',
                textAlign: 'center',
              }}
            >
              Press <kbd style={kbdStyle}>Esc</kbd> or click outside to close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const kbdStyle: CSSProperties = {
  ...mono,
  fontSize: 11,
  padding: '2px 6px',
  borderRadius: 4,
  background: 'color-mix(in srgb, currentColor 10%, transparent)',
  border: '1px solid color-mix(in srgb, currentColor 15%, transparent)',
};
