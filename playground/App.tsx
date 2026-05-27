import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ALL_LOADER_TYPES,
  Loader,
  ThemeProvider,
  useTheme,
  type LoaderSize,
  type LoaderType,
  type ThemeMode,
} from "react-next-loader";
import { LoaderModal } from "./LoaderModal";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES: Record<string, LoaderType[]> = {
  Basics: [
    "spinner",
    "dual-ring",
    "circle",
    "dots",
    "bars",
    "pulse",
    "ripple",
    "wave",
  ],
  "Scale & motion": [
    "beat",
    "bounce",
    "scale",
    "sync",
    "rise",
    "skew",
    "square",
    "hash",
    "fade",
  ],
  "Ring & circle": [
    "clip",
    "puff",
    "ring",
    "rotate",
    "tail-spin",
    "oval",
    "moon",
    "color-ring",
    "three-circles",
  ],
  Shapes: [
    "triangle",
    "ball-triangle",
    "hourglass",
    "grid",
    "pacman",
    "climbing-box",
    "infinity",
    "vortex",
  ],
  Specialty: ["clock", "watch", "propagate", "magnifying-glass"],
  Dots: [
    "audio",
    "comment",
    "dna",
    "hearts",
    "line-wave",
    "mutating-dots",
    "three-dots",
    "rings",
  ],
  Lines: [
    "falling-lines",
    "rotating-lines",
    "rotating-triangles",
    "radio",
    "revolving-dot",
  ],
  Blocks: ["blocks", "fidget-spinner", "rotating-square", "flip-flop"],
  "AI & modern": [
    "gradient-orb",
    "neural-network",
    "ai-thinking",
    "matrix",
    "hologram",
    "cyberpunk",
    "floating-glass",
  ],
  Creative: [
    "bolt",
    "book",
    "boxes",
    "wifi",
    "sunspot",
    "xlvi",
    "hairball",
    "whirl",
  ],
  "3D & advanced": ["cube", "orbit", "typing", "blink", "squircle", "three-d"],
  Text: [
    "text-sequence",
    "text-wave",
    "text-dots",
    "text-shimmer",
    "text-blink",
    "text-scale",
    "text-slide",
    "text-gradient",
  ],
  "Text FX": [
    "text-typing",
    "text-glitch",
    "text-neon",
    "text-flip-3d",
    "text-bounce",
    "text-elastic",
    "text-stretch",
    "text-spin",
    "text-drop",
    "text-rainbow",
    "text-ripple",
    "text-zoom",
  ],
  Image: [
    "image-spin",
    "image-pulse",
    "image-bounce",
    "image-shake",
    "image-fade",
    "image-flip-y",
    "image-flip-x",
    "image-swing",
    "image-wobble",
    "image-heartbeat",
    "image-glow",
    "image-blur",
    "image-float",
    "image-rubber",
    "image-jello",
    "image-tada",
    "image-zoom",
    "image-ring",
  ],
  Skeleton: [
    "skeleton-bar",
    "skeleton-text",
    "skeleton-paragraph",
    "skeleton-avatar",
    "skeleton-avatar-square",
    "skeleton-image",
    "skeleton-button",
    "skeleton-profile",
    "skeleton-list",
    "skeleton-card",
    "skeleton-grid",
    "skeleton-comment",
  ],
};

const COLOR_PRESETS = [
  { name: "Default", value: "" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Sky", value: "#0ea5e9" },
];

const SIZES: LoaderSize[] = ["xs", "sm", "md", "lg", "xl"];

/** Single brand gradient used on every active/selected element + the logo + the scroll-to-top button. */
export const BRAND_GRADIENT =
  "linear-gradient(135deg, #6366f1 0%, #a855f7 45%, #ec4899 100%)";
export const BRAND_GRADIENT_SOFT =
  "linear-gradient(135deg, color-mix(in srgb, #6366f1 28%, transparent), color-mix(in srgb, #ec4899 28%, transparent))";
export const BRAND_SHADOW = "0 6px 20px rgba(168, 85, 247, 0.42)";

const BG_PRESETS = [
  { key: "none", label: "No fill" },
  { key: "stripes", label: "Stripes" },
  { key: "#ffffff", label: "White" },
  { key: "#0a0a0a", label: "Black" },
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
  if (!bg || bg === "none") return "transparent";
  if (bg === "stripes") return STRIPES_BG;
  return bg;
}

/** Background used by the small swatch button (visual cue for what's selected). */
function resolveSwatchBg(bg: string): string {
  if (bg === "none") return CHECKER_BG;
  if (bg === "stripes") return STRIPES_BG;
  return bg;
}

/* ------------------------------------------------------------------ */
/* Utils                                                               */
/* ------------------------------------------------------------------ */

function pascalCase(type: LoaderType): string {
  return type
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function snippetForLoader(
  type: LoaderType,
  size: LoaderSize,
  color: string,
): string {
  const name = pascalCase(type);
  const colorAttr = color ? ` color="${color}"` : "";
  return `import { ${name} } from 'react-next-loader';\n\n<${name} size="${size}"${colorAttr} />`;
}

/* ------------------------------------------------------------------ */
/* Shared style tokens                                                 */
/* ------------------------------------------------------------------ */

const card: CSSProperties = {
  border: "1px solid color-mix(in srgb, currentColor 10%, transparent)",
  borderRadius: 14,
  background: "var(--rl-theme-bg)",
};

const mono: CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

const pill = (active = false): CSSProperties => ({
  padding: "6px 12px",
  borderRadius: 999,
  border: active
    ? "1px solid transparent"
    : "1px solid color-mix(in srgb, currentColor 15%, transparent)",
  background: active ? BRAND_GRADIENT : "transparent",
  color: active ? "#fff" : "inherit",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: active ? 600 : 500,
  transition: "all 160ms",
  whiteSpace: "nowrap",
  boxShadow: active ? BRAND_SHADOW : "none",
});

/* ------------------------------------------------------------------ */
/* Shell that applies background based on theme                        */
/* ------------------------------------------------------------------ */

function ThemedShell({ children }: { children: ReactNode }) {
  const { resolvedMode } = useTheme();
  useEffect(() => {
    const isDark = resolvedMode === "dark";
    document.body.style.background = isDark ? "#09090b" : "#fafafa";
    document.body.style.color = isDark ? "#e4e4e7" : "#18181b";
    document.body.style.transition = "background 200ms, color 200ms";

    // Theme-aware solid muted text colors, set on :root so they cascade
    // to every element via CSS-variable inheritance (no opacity tricks needed).
    const root = document.documentElement;
    root.style.setProperty("--rl-text-strong", isDark ? "#f4f4f5" : "#18181b");
    root.style.setProperty("--rl-text-muted", isDark ? "#d4d4d8" : "#3f3f46");
    root.style.setProperty("--rl-text-faint", isDark ? "#a1a1aa" : "#52525b");
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
  const [isMobile, setIsMobile] = useState(false);
  const [isXs, setIsXs] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsXs(window.innerWidth < 380);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Compact icon-only theme switcher for mobile
  const themePill = (active: boolean): CSSProperties => ({
    width: 32,
    height: 32,
    padding: 0,
    borderRadius: 999,
    border: active
      ? "1px solid transparent"
      : "1px solid color-mix(in srgb, currentColor 15%, transparent)",
    background: active ? BRAND_GRADIENT : "transparent",
    color: active ? "#fff" : "inherit",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: active ? 600 : 500,
    transition: "all 160ms",
    boxShadow: active ? BRAND_SHADOW : "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  });

  const THEME_ICON: Record<ThemeMode, string> = {
    light: "☀",
    dark: "☾",
    auto: "◐",
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        background: "color-mix(in srgb, var(--rl-theme-bg) 78%, transparent)",
        borderBottom:
          "1px solid color-mix(in srgb, currentColor 8%, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "10px 14px" : "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 8 : 10,
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <span
            style={{
              width: isMobile ? 26 : 28,
              height: isMobile ? 26 : 28,
              borderRadius: 8,
              background: BRAND_GRADIENT,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: isMobile ? 12 : 14,
              flexShrink: 0,
            }}
          >
            rl
          </span>
          <strong
            style={{
              fontSize: isMobile ? 13 : 16,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minWidth: 0,
            }}
          >
            react-next-loader
          </strong>
          {!isXs && (
            <span
              style={{
                marginLeft: 4,
                fontSize: isMobile ? 10 : 11,
                padding: isMobile ? "2px 6px" : "2px 8px",
                borderRadius: 999,
                background:
                  "color-mix(in srgb, var(--rl-theme-primary) 14%, transparent)",
                color: "var(--rl-theme-primary)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              V1.0.0
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: isMobile ? 4 : 6,
            flexShrink: 0,
          }}
        >
          {(["light", "dark", "auto"] as const).map((m) =>
            isMobile ? (
              <button
                key={m}
                style={themePill(mode === m)}
                onClick={() => setMode(m)}
                aria-label={`${m} theme`}
                title={`${m} theme`}
              >
                {THEME_ICON[m]}
              </button>
            ) : (
              <button
                key={m}
                style={pill(mode === m)}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            ),
          )}
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
    <section style={{ textAlign: "center", padding: "64px 24px 32px" }}>
      {/* Version pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: 999,
          background:
            "color-mix(in srgb, var(--rl-theme-primary) 14%, transparent)",
          border:
            "1px solid color-mix(in srgb, var(--rl-theme-primary) 30%, transparent)",
          color: "var(--rl-theme-primary)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "currentColor",
          }}
        />
        V1.0.0 · Now available
      </div>

      {/* Headline with partial gradient on the middle phrase */}
      <h1
        style={{
          margin: 0,
          fontSize: "clamp(34px, 6vw, 64px)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1.05,
        }}
      >
        The complete{" "}
        <span
          style={{
            background:
              "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #38bdf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          loader library
        </span>
        <br />
        for React &amp; Next.js
      </h1>

      <p
        style={{
          margin: "20px auto 0",
          maxWidth: 580,
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--rl-text-muted, #52525b)",
        }}
      >
        {totalCount} loaders, skeletons, and progress bars — accessible,
        SSR-safe, tree-shakable. Works with React, Next.js, Vite, Remix, and CRA
        out of the box.
      </p>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 28,
        }}
      >
        {[
          { icon: "⚡", text: "SSR-Safe" },
          { icon: "♿", text: "Accessible" },
          { icon: "🎨", text: "Customizable" },
          { icon: "🪶", text: "Tree-shakable" },
        ].map((f) => (
          <span
            key={f.text}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 999,
              border:
                "1px solid color-mix(in srgb, currentColor 12%, transparent)",
              background: "color-mix(in srgb, currentColor 3%, transparent)",
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
  { key: "npm", cmd: "npm install react-next-loader" },
  { key: "pnpm", cmd: "pnpm add react-next-loader" },
  { key: "yarn", cmd: "yarn add react-next-loader" },
];

/* ------------------------------------------------------------------ */
/* Social links — URLs are read from .env (VITE_SOCIAL_*) with sample */
/* fallbacks so the playground works out-of-the-box.                  */
/* ------------------------------------------------------------------ */

interface SocialLink {
  key: string;
  label: string;
  href: string;
  brand: string; // brand color used on hover (light theme / default)
  brandDark?: string; // optional override for dark theme (use when `brand` has poor contrast on dark bg)
  icon: ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: import.meta.env.VITE_SOCIAL_WHATSAPP || "https://wa.me/919999999999",
    brand: "#25D366",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href:
      import.meta.env.VITE_SOCIAL_INSTAGRAM ||
      "https://instagram.com/yogeshgabani",
    brand: "#E4405F",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324ZM12 16a4 4 0 110-8 4 4 0 010 8Zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881Z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    label: "Facebook",
    href:
      import.meta.env.VITE_SOCIAL_FACEBOOK ||
      "https://facebook.com/yogeshgabani",
    brand: "#1877F2",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.005 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.687 4.533-4.687 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.255h3.328l-.532 3.49h-2.796V24C19.612 23.078 24 18.092 24 12.073Z" />
      </svg>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href:
      import.meta.env.VITE_SOCIAL_YOUTUBE ||
      "https://youtube.com/@yogeshgabani",
    brand: "#FF0000",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    href:
      import.meta.env.VITE_SOCIAL_TWITTER || "https://twitter.com/yogeshgabani",
    brand: "#0F1419",
    brandDark: "#E7E9EA",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href:
      import.meta.env.VITE_SOCIAL_LINKEDIN ||
      "https://linkedin.com/in/yogeshgabani",
    brand: "#0A66C2",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
  {
    key: "github",
    label: "GitHub",
    href:
      import.meta.env.VITE_SOCIAL_GITHUB || "https://github.com/yogeshgabani",
    brand: "#24292F",
    brandDark: "#F0F6FC",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013-.405c1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z" />
      </svg>
    ),
  },
];

function SocialIcons({ size = 36 }: { size?: number }) {
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {SOCIAL_LINKS.map((s) => {
        const hoverColor = isDark && s.brandDark ? s.brandDark : s.brand;
        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={s.label}
            title={s.label}
            style={{
              width: size,
              height: size,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "inherit",
              background: "color-mix(in srgb, currentColor 4%, transparent)",
              border:
                "1px solid color-mix(in srgb, currentColor 12%, transparent)",
              textDecoration: "none",
              transition: "all 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `color-mix(in srgb, ${hoverColor} 14%, transparent)`;
              e.currentTarget.style.borderColor = `color-mix(in srgb, ${hoverColor} 55%, transparent)`;
              e.currentTarget.style.color = hoverColor;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "color-mix(in srgb, currentColor 4%, transparent)";
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, currentColor 12%, transparent)";
              e.currentTarget.style.color = "inherit";
              e.currentTarget.style.transform = "";
            }}
          >
            {s.icon}
          </a>
        );
      })}
    </div>
  );
}

function InstallBlock() {
  const [tab, setTab] = useState("npm");
  const [copied, setCopied] = useState(false);
  const cmd = PKG_TABS.find((t) => t.key === tab)?.cmd ?? "";

  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cmd).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section
      style={{ maxWidth: 640, margin: "0 auto 48px", padding: "0 24px" }}
    >
      <div
        style={{
          ...card,
          padding: 0,
          overflow: "hidden",
          background: "color-mix(in srgb, currentColor 4%, var(--rl-theme-bg))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 8px 8px 14px",
            borderBottom:
              "1px solid color-mix(in srgb, currentColor 8%, transparent)",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            {PKG_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 8,
                  border: "none",
                  background:
                    tab === t.key
                      ? "color-mix(in srgb, currentColor 8%, transparent)"
                      : "transparent",
                  color: "inherit",
                  fontSize: 13,
                  fontWeight: tab === t.key ? 600 : 500,
                  cursor: "pointer",
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
              padding: "5px 12px",
              borderRadius: 8,
              border: "none",
              background: copied ? "var(--rl-theme-primary)" : "transparent",
              color: copied ? "#fff" : "inherit",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 160ms",
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div
          style={{
            padding: "16px 18px",
            ...mono,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: "var(--rl-text-faint, #71717a)" }}>$ </span>
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
      if (typeof result === "string") setImage(result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div
      style={{
        ...card,
        padding: 16,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {/* Search */}
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
            color: "var(--rl-text-faint, #71717a)",
            pointerEvents: "none",
          }}
        >
          ⌕
        </span>
        <input
          placeholder="Search loaders by name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 14px 11px 36px",
            borderRadius: 10,
            border:
              "1px solid color-mix(in srgb, currentColor 12%, transparent)",
            background: "color-mix(in srgb, currentColor 4%, transparent)",
            color: "inherit",
            fontSize: 14,
            outline: "none",
            transition: "border-color 160ms",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--rl-theme-primary)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "color-mix(in srgb, currentColor 12%, transparent)";
          }}
        />
      </div>

      {/* Size + color row */}
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--rl-text-muted, #52525b)",
            }}
          >
            SIZE
          </span>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {SIZES.map((s) => (
              <button
                key={s as string}
                onClick={() => setSize(s)}
                style={{
                  width: 36,
                  height: 30,
                  borderRadius: 7,
                  border:
                    "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                  background:
                    size === s
                      ? "var(--rl-theme-primary)"
                      : "color-mix(in srgb, currentColor 3%, transparent)",
                  color: size === s ? "#fff" : "inherit",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "all 160ms",
                }}
              >
                {s as string}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--rl-text-muted, #52525b)",
            }}
          >
            COLOR
          </span>
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
                      ? "2px solid var(--rl-theme-primary)"
                      : "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                  background:
                    p.value ||
                    "repeating-linear-gradient(45deg, color-mix(in srgb, currentColor 10%, transparent) 0 4px, transparent 4px 8px)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 160ms",
                }}
              />
            ))}
            <input
              type="color"
              value={color || "#7c3aed"}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: 30,
                height: 30,
                padding: 2,
                borderRadius: 7,
                border:
                  "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                background: "transparent",
                cursor: "pointer",
                marginLeft: 4,
              }}
              title="Custom color"
            />
          </div>
        </div>

        {/* Preview background */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--rl-text-muted, #52525b)",
            }}
          >
            BACKGROUND
          </span>
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
                      ? "2px solid var(--rl-theme-primary)"
                      : "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                  background: resolveSwatchBg(p.key),
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 160ms",
                }}
              />
            ))}
            <input
              type="color"
              value={previewBg.startsWith("#") ? previewBg : "#0a0a0a"}
              onChange={(e) => setPreviewBg(e.target.value)}
              style={{
                width: 30,
                height: 30,
                padding: 2,
                borderRadius: 7,
                border:
                  "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                background: "transparent",
                cursor: "pointer",
                marginLeft: 4,
              }}
              title="Custom background color"
            />
          </div>
        </div>

        {/* IMAGE upload (used by image-* loaders) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--rl-text-muted, #52525b)",
            }}
          >
            IMAGE
          </span>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 10px",
              borderRadius: 8,
              border:
                "1px solid color-mix(in srgb, currentColor 12%, transparent)",
              background: "color-mix(in srgb, currentColor 3%, transparent)",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
              transition: "all 160ms",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Selected"
                style={{
                  width: 22,
                  height: 22,
                  objectFit: "cover",
                  borderRadius: 4,
                  border:
                    "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                }}
              />
            ) : (
              <span style={{ fontSize: 14 }}>🖼</span>
            )}
            <span>{image ? "Change image" : "Upload image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageFile(e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
          </label>
          {image && (
            <button
              onClick={() => setImage("")}
              title="Use default placeholder"
              style={{
                padding: "4px 8px",
                borderRadius: 6,
                border:
                  "1px solid color-mix(in srgb, currentColor 12%, transparent)",
                background: "transparent",
                color: "inherit",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
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
  const [isMobile, setIsMobile] = useState(false);
  const cats = ["All", ...Object.keys(CATEGORIES)];

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // On mobile → horizontal scrollable chip row (saves vertical space)
  // On desktop → responsive grid of equal-width cells
  const listStyle: CSSProperties = isMobile
    ? {
        display: "flex",
        gap: 6,
        overflowX: "auto",
        overflowY: "hidden",
        // Bleed to viewport edges so chips can scroll past the main container padding
        margin: "0 -14px",
        padding: "0 14px 6px",
        scrollSnapType: "x proximity",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
      }
    : {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 8,
      };

  return (
    <div
      style={{
        position: "sticky",
        top: 60,
        zIndex: 20,
        margin: isMobile ? "0 -14px 14px" : "0 -24px 18px",
        padding: isMobile ? "10px 14px" : "14px 24px",
        background: "color-mix(in srgb, var(--rl-theme-bg) 88%, transparent)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom:
          "1px solid color-mix(in srgb, currentColor 8%, transparent)",
      }}
    >
      {/* Header row: label on left, "X showing" pill on right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: isMobile ? 8 : 12,
        }}
      >
        <span
          style={{
            fontSize: isMobile ? 10 : 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--rl-text-muted, #52525b)",
          }}
        >
          Categories
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isMobile ? 5 : 6,
            fontSize: isMobile ? 11 : 12,
            color: "var(--rl-text-muted, #52525b)",
            ...mono,
            whiteSpace: "nowrap",
            padding: isMobile ? "4px 8px" : "6px 10px",
            borderRadius: 8,
            background: "color-mix(in srgb, currentColor 4%, transparent)",
            border:
              "1px solid color-mix(in srgb, currentColor 8%, transparent)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--rl-theme-primary)",
              boxShadow: "0 0 6px var(--rl-theme-primary)",
            }}
          />
          <strong style={{ color: "inherit", fontWeight: 700 }}>
            {filteredCount}
          </strong>
          <span>showing</span>
        </span>
      </div>

      {/* Mobile → horizontal scroll chips · Desktop → responsive grid */}
      <div style={listStyle}>
        {cats.map((cat) => {
          const count =
            cat === "All"
              ? ALL_LOADER_TYPES.length
              : (CATEGORIES[cat]?.length ?? 0);
          const isActive = active === cat;
          const isHover = hovered === cat;

          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              onMouseEnter={() => setHovered(cat)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: isMobile ? 6 : 8,
                padding: isMobile ? "6px 10px" : "9px 14px",
                borderRadius: isMobile ? 9 : 11,
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid color-mix(in srgb, currentColor 11%, transparent)",
                background: isActive
                  ? BRAND_GRADIENT
                  : isHover
                    ? "color-mix(in srgb, currentColor 7%, transparent)"
                    : "color-mix(in srgb, currentColor 2.5%, transparent)",
                color: isActive ? "#fff" : "inherit",
                fontSize: isMobile ? 12 : 13,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: "-0.005em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transform:
                  isHover && !isActive ? "translateY(-1px)" : "translateY(0)",
                boxShadow: isActive ? BRAND_SHADOW : "none",
                transition:
                  "transform 160ms, background 160ms, box-shadow 200ms, border-color 160ms",
                textAlign: "left",
                overflow: "hidden",
                // Mobile: keep buttons at their natural width inside the horizontal scroll row
                flexShrink: isMobile ? 0 : undefined,
                scrollSnapAlign: isMobile ? "start" : undefined,
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                {cat}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: isMobile ? 20 : 24,
                  height: isMobile ? 15 : 18,
                  padding: isMobile ? "0 5px" : "0 6px",
                  borderRadius: 999,
                  fontSize: isMobile ? 9 : 10,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  background: isActive
                    ? "rgba(255, 255, 255, 0.22)"
                    : "color-mix(in srgb, currentColor 9%, transparent)",
                  color: isActive ? "#fff" : "inherit",
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
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      title="Click to configure & copy"
      style={{
        ...card,
        overflow: "hidden",
        cursor: "pointer",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover
          ? "0 12px 32px color-mix(in srgb, var(--rl-theme-primary) 15%, transparent)"
          : "none",
        borderColor: hover
          ? "color-mix(in srgb, var(--rl-theme-primary) 35%, transparent)"
          : "color-mix(in srgb, currentColor 10%, transparent)",
        transition: "transform 200ms, box-shadow 200ms, border-color 200ms",
      }}
    >
      {/* Preview */}
      <div
        style={{
          height: 170,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: resolvePreviewBg(previewBg),
          borderBottom:
            "1px solid color-mix(in srgb, currentColor 8%, transparent)",
        }}
      >
        <Loader
          type={type}
          size={size}
          color={color || undefined}
          image={type.startsWith("image-") ? image || undefined : undefined}
        />
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {pascalCase(type)}
            </div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: "var(--rl-text-muted, #52525b)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
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
              padding: "6px 12px",
              borderRadius: 8,
              border: "none",
              background: copied
                ? "var(--rl-theme-primary)"
                : "color-mix(in srgb, var(--rl-theme-primary) 10%, transparent)",
              color: copied ? "#fff" : "var(--rl-theme-primary)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 160ms",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {copied ? "✓ Copied" : "Copy code"}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Font scale — smaller on mobile so the footer doesn't dominate the screen
  const fs = {
    brand: isMobile ? 14 : 16,
    tagline: isMobile ? 11 : 13,
    meta: isMobile ? 11 : 13,
    badge: isMobile ? 10 : 11,
    link: isMobile ? 12 : 13,
    connect: isMobile ? 11 : 13,
    iconEmoji: isMobile ? 12 : 14,
  };

  const linkBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: isMobile ? 6 : 8,
    padding: isMobile ? "6px 12px" : "8px 16px",
    borderRadius: 12,
    border: "1px solid color-mix(in srgb, currentColor 14%, transparent)",
    background: "color-mix(in srgb, currentColor 3%, transparent)",
    color: "inherit",
    fontSize: fs.link,
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 160ms",
    cursor: "pointer",
  };

  return (
    <footer style={{ marginTop: 64, marginBottom: 24, position: "relative" }}>
      {/* Gradient outline wrapper */}
      <div
        style={{
          padding: 1.5,
          borderRadius: 18,
          background:
            "linear-gradient(135deg, color-mix(in srgb, #a855f7 50%, transparent), color-mix(in srgb, #38bdf8 50%, transparent))",
        }}
      >
        <div
          style={{
            borderRadius: 16.5,
            background: "var(--rl-theme-bg)",
            padding: isMobile ? "16px 14px" : "20px 20px",
          }}
        >
          {/* Top row: brand left, action buttons right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                minWidth: 0,
              }}
            >
              {/* Mini logo with 3 colored dots */}
              <span
                style={{
                  width: isMobile ? 36 : 44,
                  height: isMobile ? 36 : 44,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, #a855f7 25%, transparent), color-mix(in srgb, #38bdf8 25%, transparent))",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                {["#a855f7", "#ec4899", "#38bdf8"].map((c) => (
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
                <div
                  style={{
                    fontSize: fs.brand,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  react-next-loader
                </div>
                <div
                  style={{
                    fontSize: fs.tagline,
                    color: "var(--rl-text-muted, #52525b)",
                    marginTop: 2,
                  }}
                >
                  Modern, accessible loader library for React &amp; Next.js
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                style={linkBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, currentColor 14%, transparent)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <span style={{ fontSize: fs.iconEmoji }}>⌥</span>
                GitHub
              </a>
              <a
                href="https://npmjs.com/package/react-next-loader"
                target="_blank"
                rel="noreferrer noopener"
                style={linkBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, currentColor 14%, transparent)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <span style={{ fontSize: fs.iconEmoji }}>📦</span>
                npm
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ ...linkBtn, border: linkBtn.border }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "color-mix(in srgb, currentColor 14%, transparent)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <span style={{ fontSize: fs.iconEmoji }}>🎛</span>
                Browse loaders
              </button>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              margin: "24px 0",
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, currentColor 14%, transparent), transparent)",
            }}
          />

          {/* Social row — connect with Yogesh */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: fs.connect,
                fontWeight: 600,
                color: "var(--rl-text-muted, #52525b)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Connect with Yogesh
              </span>
              <span style={{ opacity: 0.4 }}>—</span>
              <span style={{ fontWeight: 400 }}>
                follow for updates &amp; new loaders
              </span>
            </div>
            <SocialIcons />
          </div>

          {/* Divider 2 */}
          <div
            style={{
              height: 1,
              margin: "0 0 24px",
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, currentColor 14%, transparent), transparent)",
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  fontSize: fs.meta,
                  color: "var(--rl-text-muted, #52525b)",
                }}
              >
                <span
                  style={{
                    padding: "3px 9px",
                    borderRadius: 6,
                    fontSize: fs.badge,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    background:
                      "color-mix(in srgb, var(--rl-theme-primary) 16%, transparent)",
                    color: "var(--rl-theme-primary)",
                  }}
                >
                  MIT
                </span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>© {new Date().getFullYear()} react-next-loader</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>
                  <strong>{totalCount}</strong> loaders
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: fs.meta,
                  color: "var(--rl-text-muted, #52525b)",
                }}
              >
                Crafted with <span style={{ color: "#ec4899" }}>♥</span> for the
                React &amp; Next.js community
              </div>
            </div>

            <a
              href="https://github.com/yogeshgabani"
              target="_blank"
              rel="noreferrer noopener"
              style={{
                ...linkBtn,
                fontSize: fs.link,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--rl-theme-primary) 40%, transparent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, currentColor 14%, transparent)";
                e.currentTarget.style.transform = "";
              }}
            >
              <span style={{ color: "var(--rl-text-muted, #52525b)" }}>
                Built by
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #a855f7, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show earlier on mobile (200px) than on desktop (400px)
      const threshold = window.innerWidth < 640 ? 200 : 400;
      setVisible(window.scrollY > threshold);
    };
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
      onScroll();
    };
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const size = isMobile ? 44 : 46;
  const edge = isMobile ? 14 : 24;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        // Respect iOS / Android safe-area insets so the button doesn't sit under the home indicator
        bottom: `calc(${edge}px + env(safe-area-inset-bottom, 0px))`,
        right: `calc(${edge}px + env(safe-area-inset-right, 0px))`,
        zIndex: 80,
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        background: BRAND_GRADIENT,
        color: "#fff",
        fontSize: isMobile ? 17 : 18,
        fontWeight: 700,
        lineHeight: 1,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
        boxShadow:
          "0 8px 24px color-mix(in srgb, var(--rl-theme-primary) 40%, transparent), 0 2px 6px rgba(0,0,0,0.18)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "all 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [size, setSize] = useState<LoaderSize>("lg");
  const [color, setColor] = useState("");
  const [previewBg, setPreviewBg] = useState<string>("stripes");
  const [image, setImage] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openType, setOpenType] = useState<LoaderType | null>(null);

  const filtered = useMemo(() => {
    const inCat =
      activeCategory === "All"
        ? ALL_LOADER_TYPES
        : (CATEGORIES[activeCategory] ?? ALL_LOADER_TYPES);
    if (!query.trim()) return inCat;
    const q = query.toLowerCase();
    return inCat.filter(
      (t) =>
        t.toLowerCase().includes(q) || pascalCase(t).toLowerCase().includes(q),
    );
  }, [activeCategory, query]);

  const copy = (type: LoaderType) => {
    const snippet = snippetForLoader(type, size, color);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
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

        <main
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 12px 48px" }}
        >
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
                textAlign: "center",
                color: "var(--rl-text-muted, #52525b)",
                borderStyle: "dashed",
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
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
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
