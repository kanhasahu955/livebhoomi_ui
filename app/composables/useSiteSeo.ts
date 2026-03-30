import { defaultOgImagePath, resolvePublicSiteUrl } from '../config/seo.config'

/**
 * Canonical marketing + SEO fields from `runtimeConfig.public` (see nuxt.config).
 */
export function useSiteSeo() {
  const config = useRuntimeConfig()
  const pub = config.public as Record<string, unknown>

  const siteUrl = (pub.siteUrl as string) || resolvePublicSiteUrl()
  const siteImagePath =
    (pub.siteImage as string) || defaultOgImagePath
  const absoluteSiteImage = siteImagePath.startsWith('http')
    ? siteImagePath
    : new URL(siteImagePath.replace(/^\//, ''), siteUrl).href

  return {
    siteUrl,
    siteName: (pub.siteName as string) || 'Live Bhoomi',
    siteDescription: (pub.siteDescription as string) || '',
    siteImage: absoluteSiteImage,
    indexable: Boolean(config.indexable ?? pub.indexable),
    trailingSlash: Boolean(pub.trailingSlash),
    titleSeparator: (pub.titleSeparator as string) || '|',
    language: (pub.language as string) || 'en',
  }
}
