// Default theme tokens used as fallback and as "reset to defaults" target.
// Keys map 1:1 to entries in the site_settings table (theme.* namespace).
export type ThemeTokens = {
  // Brand
  accent: string;
  accentHover: string;
  accentDim: string;
  // Backgrounds
  background: string;
  surface: string;
  surface2: string;
  border: string;
  // Text
  foreground: string;
  mutedForeground: string;
  heading: string;
  // Navbar
  navBg: string;
  navBorder: string;
  navLink: string;
  navLinkActive: string;
  // Buttons
  btnPrimaryBg: string;
  btnPrimaryFg: string;
  btnSecondaryBorder: string;
  btnSecondaryFg: string;
  // Bottom nav
  bottomNavBg: string;
  bottomNavActive: string;
  bottomNavInactive: string;
  // Typography
  fontHeading: string;
  fontBody: string;
  fontBaseSize: string;
  headingTracking: string;
};

export const DEFAULT_THEME: ThemeTokens = {
  accent: "#00E5A0",
  accentHover: "#00C98A",
  accentDim: "rgba(0, 229, 160, 0.12)",
  background: "#0A0A0A",
  surface: "#111111",
  surface2: "#1A1A1A",
  border: "#1F1F1F",
  foreground: "#F5F5F5",
  mutedForeground: "#888888",
  heading: "#FFFFFF",
  navBg: "rgba(0, 0, 0, 0.6)",
  navBorder: "rgba(255, 255, 255, 0.05)",
  navLink: "#F5F5F5",
  navLinkActive: "#00E5A0",
  btnPrimaryBg: "#00E5A0",
  btnPrimaryFg: "#0A0A0A",
  btnSecondaryBorder: "#F5F5F5",
  btnSecondaryFg: "#F5F5F5",
  bottomNavBg: "#000000",
  bottomNavActive: "#00E5A0",
  bottomNavInactive: "#666666",
  fontHeading: "Syne",
  fontBody: "Inter",
  fontBaseSize: "16px",
  headingTracking: "-0.02em",
};

export const PRESETS: { label: string; accent: string; accentHover: string; accentDim: string }[] = [
  { label: "Electric Green", accent: "#00E5A0", accentHover: "#00C98A", accentDim: "rgba(0, 229, 160, 0.12)" },
  { label: "Royal Purple", accent: "#7C3AED", accentHover: "#6D28D9", accentDim: "rgba(124, 58, 237, 0.12)" },
  { label: "Cyber Blue", accent: "#0EA5E9", accentHover: "#0284C7", accentDim: "rgba(14, 165, 233, 0.12)" },
  { label: "Sunset Orange", accent: "#F97316", accentHover: "#EA580C", accentDim: "rgba(249, 115, 22, 0.12)" },
  { label: "Hot Pink", accent: "#EC4899", accentHover: "#DB2777", accentDim: "rgba(236, 72, 153, 0.12)" },
  { label: "Gold", accent: "#EAB308", accentHover: "#CA8A04", accentDim: "rgba(234, 179, 8, 0.12)" },
];

// Mapping from theme token key -> CSS custom property name.
export const CSS_VAR_MAP: Record<keyof ThemeTokens, string> = {
  accent: "--accent",
  accentHover: "--accent-hover",
  accentDim: "--accent-dim",
  background: "--background",
  surface: "--surface",
  surface2: "--surface-2",
  border: "--border",
  foreground: "--foreground",
  mutedForeground: "--muted-foreground",
  heading: "--heading",
  navBg: "--nav-bg",
  navBorder: "--nav-border",
  navLink: "--nav-link",
  navLinkActive: "--nav-link-active",
  btnPrimaryBg: "--btn-primary-bg",
  btnPrimaryFg: "--btn-primary-fg",
  btnSecondaryBorder: "--btn-secondary-border",
  btnSecondaryFg: "--btn-secondary-fg",
  bottomNavBg: "--bottom-nav-bg",
  bottomNavActive: "--bottom-nav-active",
  bottomNavInactive: "--bottom-nav-inactive",
  fontHeading: "--font-heading",
  fontBody: "--font-body",
  fontBaseSize: "--font-base-size",
  headingTracking: "--heading-tracking",
};

export function applyThemeToDocument(tokens: Partial<ThemeTokens>) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  for (const [key, value] of Object.entries(tokens)) {
    const cssVar = CSS_VAR_MAP[key as keyof ThemeTokens];
    if (cssVar && value) el.style.setProperty(cssVar, value);
  }
  // Also override --accent-foreground based on accent
  if (tokens.btnPrimaryFg) el.style.setProperty("--accent-foreground", tokens.btnPrimaryFg);
}
