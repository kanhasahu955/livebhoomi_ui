/**
 * LiveBhoomi theme — hex mirrors https://livebhoomi.com/ + `app/assets/css/livebhoomi-tokens.css`.
 * CSS is source of truth for light/dark; keep these aligned for TS (charts, canvas, native bridges).
 */

/** Product / marketing copy — use with `useTheme()` or legal footers */
export const themeBranding = {
  productName: 'Live Bhoomi',
  shortName: 'LiveBhoomi',
  tagline: 'Find your next home',
  vertical: 'real_estate' as const,
  defaultLocale: 'en',
  listingGrid: {
    minCardWidthPx: 280,
    gapClass: 'gap-4' as const,
  },
} as const

/** Light theme (default) — matches production `:root` */
export const themeColors = {
  hero: '#2563EB',
  accent: '#3B82F6',
  heading: '#020617',
  body: '#4B5563',
  surface: '#F8FAFC',
  navActive: '#EFF6FF',
  card: '#FFFFFF',
  heroHover: '#1D4ED8',
  border: '#E2E8F0',
  muted: '#64748B',
} as const

export type ThemeColorName = keyof typeof themeColors

/** CSS variables in `livebhoomi-tokens.css` (+ aliases) */
export const themeCssVarNames = {
  hero: '--lb-hero',
  accent: '--lb-accent',
  heading: '--lb-heading',
  body: '--lb-body',
  surface: '--lb-surface',
  navActive: '--lb-nav-active',
  card: '--lb-card',
  heroHover: '--lb-hero-hover',
  border: '--lb-border',
  muted: '--lb-muted-foreground',
} as const satisfies Record<ThemeColorName, string>

export const theme = {
  branding: themeBranding,
  colors: themeColors,
  cssVar: themeCssVarNames,
} as const

export function themeColorVars(
  names: ThemeColorName[],
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const name of names) {
    out[themeCssVarNames[name]] = themeColors[name]
  }
  return out
}
