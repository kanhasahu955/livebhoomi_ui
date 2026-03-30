import type { QueryClientConfig } from '@tanstack/vue-query'
import type { ModuleOptions as ImageModuleOptions } from '@nuxt/image'
import { resolvePublicSiteUrl } from './seo.config'

const siteHost = () => {
  try {
    return new URL(resolvePublicSiteUrl()).hostname
  } catch {
    return 'www.livebhoomi.com'
  }
}

/**
 * @nuxt/image — allow your CDN, maps tiles, and common listing image hosts.
 * Add production CDN hostnames as you onboard them.
 */
export const imageConfig: Partial<ImageModuleOptions> = {
  domains: [
    siteHost(),
    'api.bhoominow.com',
    'maps.googleapis.com',
    'lh3.googleusercontent.com',
    'images.unsplash.com',
  ],
  format: ['webp', 'avif', 'jpeg'],
  quality: 80,
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  presets: {
    avatar: {
      modifiers: { format: 'webp', width: 48, height: 48 },
    },
    card: {
      modifiers: { format: 'webp', width: 400, height: 300, fit: 'cover' },
    },
    hero: {
      modifiers: { format: 'webp', width: 1280, height: 720, fit: 'cover' },
    },
    gallery: {
      modifiers: { format: 'webp', width: 1200, height: 800, fit: 'inside' },
    },
  },
}

/** TanStack Query — listing search can override per-query `staleTime` */
export const vueQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
}

/**
 * Vite build — chunk vendor libs used across listing flows (maps, charts later).
 * Tune `manualChunks` as your bundles grow.
 */
export const viteBuildSplit = {
  rollupOptions: {
    output: {
      manualChunks(id: string) {
        if (id.includes('node_modules/mapbox-gl')) return 'mapbox'
        if (id.includes('node_modules/element-plus')) return 'element-plus'
        if (id.includes('node_modules/@tanstack/vue-query')) return 'vue-query'
        if (id.includes('node_modules/lodash-es')) return 'lodash'
      },
    },
  },
} as const
