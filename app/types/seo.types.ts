/**
 * Public SEO fields — kept in sync with `runtimeConfig.public` in nuxt.config.
 */
export type SeoSiteOptions = {
  siteUrl: string
  siteName: string
  siteDescription: string
  siteImage: string
  indexable: boolean
  titleSeparator: string
  trailingSlash: boolean
  language: string
}
