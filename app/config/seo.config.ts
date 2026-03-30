import type { ModuleOptions as SchemaOrgOptions } from 'nuxt-schema-org'
import type { SeoSiteOptions } from '../types/seo.types'

const env = process.env

/** Canonical site origin (trailing slash — matches nuxt-site-config / @nuxtjs/sitemap) */
export function resolvePublicSiteUrl(): string {
  const raw =
    env.NUXT_PUBLIC_SITE_URL ||
    env.NUXT_PUBLIC_APP_URL ||
    'https://www.livebhoomi.com'
  return raw.endsWith('/') ? raw : `${raw}/`
}

/** Default OG / Twitter image path (absolute URL built at runtime via useSiteSeo) */
export const defaultOgImagePath = '/og-default.jpg'

/**
 * App-wide SEO/runtime fields (mirrors `runtimeConfig.public` + composables).
 * Real-estate marketplace defaults; override via env per environment.
 */
export const seoSiteConfig: SeoSiteOptions = {
  siteUrl: resolvePublicSiteUrl(),
  siteName: env.NUXT_PUBLIC_SITE_NAME || 'Live Bhoomi',
  siteDescription:
    env.NUXT_PUBLIC_SITE_DESCRIPTION ||
    'Search verified residential and commercial listings — buy, rent, or list property with Live Bhoomi.',
  siteImage: env.NUXT_PUBLIC_SITE_IMAGE || defaultOgImagePath,
  indexable:
    typeof env.NUXT_INDEXABLE !== 'undefined'
      ? env.NUXT_INDEXABLE !== 'false'
      : env.NODE_ENV === 'production',
  titleSeparator: env.NUXT_PUBLIC_TITLE_SEPARATOR || '|',
  trailingSlash: env.NUXT_PUBLIC_TRAILING_SLASH === 'true',
  language: env.NUXT_PUBLIC_LANGUAGE || 'en',
}

/**
 * `site` — nuxt-site-config `configKey` (used by @nuxtjs/sitemap, nuxt-schema-org).
 */
export const nuxtSiteConfig = {
  url: seoSiteConfig.siteUrl,
  name: seoSiteConfig.siteName,
  description: seoSiteConfig.siteDescription,
  defaultLocale: seoSiteConfig.language,
} as const

/** Property / locality SEO templates — use with `useSeoMeta` on listing & search routes */
/** nuxt-schema-org — site-wide identity (listings portal) */
export const schemaOrgConfig: Pick<
  SchemaOrgOptions,
  'enabled' | 'minify' | 'identity' | 'defaults'
> = {
  enabled: true,
  minify: true,
  defaults: true,
  identity: 'Organization',
}

export const seoTemplates = {
  listingTitle: (title: string) => `${title} — Price, Photos, Location`,
  searchTitle: (locality: string) => `Properties in ${locality} — Buy & Rent`,
  defaultKeywords: [
    'property',
    'real estate',
    'buy flat',
    'rent house',
    'commercial property',
    'India property listings',
  ] as const,
} as const
