/// <reference types="node" />
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { elementPlusVitePlugins } from './app/config/element-plus.vite'
import { imageConfig, viteBuildSplit } from './app/config/performance.config'
import {
  nuxtSiteConfig,
  schemaOrgConfig,
  seoSiteConfig,
} from './app/config/seo.config'
import { securityConfig } from './app/config/security.config'

const __root = dirname(fileURLToPath(import.meta.url))
const appDir = resolve(__root, 'app')
const r = (...p: string[]) => resolve(appDir, ...p)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  future: { compatibilityVersion: 4 },

  /**
   * Path aliases (Vite + TS). `~` / `@` already map to `app/`; these add explicit feature paths.
   */
  alias: {
    /** Explicit `app/` root — improves resolution in `.vue` scripts (Volar / Vite). */
    '~': appDir,
    '@': appDir,
    '@components': r('components'),
    '@config': r('config'),
    '@composables': r('composables'),
    '@types': r('types'),
    '@stores': r('stores'),
    '@utils': r('utils'),
    '@assets': r('assets'),
    '@plugins': r('plugins'),
  },

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
      prefix: 'Lb',
    },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/home', pathPrefix: false },
  ],

  /** nuxt-site-config — canonical URL/name for sitemap + schema.org */
  site: nuxtSiteConfig,

  /** nuxt-security — headers, CORS, rate limits (merged with module defaults) */
  security: securityConfig,

  /** @nuxt/image — listing photos, avatars, hero presets */
  image: imageConfig,

  /** nuxt-schema-org — marketplace identity */
  schemaOrg: schemaOrgConfig,

  modules: [
    'nuxt-site-config',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-security',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
  ],

  sitemap: {
    strictNuxtContentPaths: false,
  },

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        global: true,
        weights: [300, 400, 500, 600, 700, 800],
      },
    ],
  },

  app: {
    baseURL: '/',
    layoutTransition: false,
    pageTransition: false,
    head: {
      htmlAttrs: { lang: seoSiteConfig.language },
      titleTemplate: `%s ${seoSiteConfig.titleSeparator} ${seoSiteConfig.siteName}`,
      title: seoSiteConfig.siteName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: seoSiteConfig.siteDescription },
        {
          name: 'robots',
          content: seoSiteConfig.indexable ? 'index, follow' : 'noindex, nofollow',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  pinia: {
    storesDirs: ['stores/**'],
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'livebhoomi-theme',
  },

  vite: {
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tailwindcss() as any,
      ...elementPlusVitePlugins(),
    ],
    optimizeDeps: {
      include: ['element-plus/es'],
    },
    build: {
      ...viteBuildSplit,
    },
  },

  runtimeConfig: {
    indexable: seoSiteConfig.indexable,
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE || 'https://api.bhoominow.com/api/v1',
      siteUrl: seoSiteConfig.siteUrl,
      siteName: seoSiteConfig.siteName,
      siteDescription: seoSiteConfig.siteDescription,
      siteImage: seoSiteConfig.siteImage,
      trailingSlash: seoSiteConfig.trailingSlash,
      titleSeparator: seoSiteConfig.titleSeparator,
      language: seoSiteConfig.language,
      auth: {
        cookieName: 'livebhoomi_token',
        loginPath: '/login',
        homePath: '/',
        publicPaths: ['/login'],
      },
    },
  },

  css: [
    '~/assets/css/livebhoomi-tokens.css',
    '~/assets/css/element-plus-theme.css',
    '~/assets/css/main.css',
  ],
})
