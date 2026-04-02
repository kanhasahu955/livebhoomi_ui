import type { ModuleOptions } from 'nuxt-security'

/** CORS / security origin: must match the browser origin (no path). Align with `seo.config` defaults. */
function resolveCorsOrigin(): string {
  const raw =
    process.env.NUXT_PUBLIC_SITE_URL ||
    process.env.NUXT_PUBLIC_APP_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://www.livebhoomi.com'
      : 'http://localhost:3000')
  try {
    const u = raw.startsWith('http') ? raw : `https://${raw}`
    return new URL(u).origin
  } catch {
    return raw
  }
}

const siteOrigin = resolveCorsOrigin()

/**
 * Merged by nuxt-security with `defaultSecurityConfig` (OWASP baseline).
 * Extend CSP for maps, listing CDNs, and your API — arrays replace defaults per key.
 *
 * @see https://nuxt-security.vercel.app
 */
export const securityConfig: Partial<ModuleOptions> = {
  strict: process.env.NUXT_SECURITY_STRICT === 'true',
  enabled: process.env.NUXT_SECURITY_ENABLED !== 'false',
  nonce: true,
  hidePoweredBy: true,
  csrf: false,
  corsHandler: {
    origin: siteOrigin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflight: { statusCode: 204 },
  },
  headers: {
    /**
     * Default `credentialless` breaks many cross-origin images/tiles (listings, OSM/Leaflet)
     * that do not send `Cross-Origin-Resource-Policy`. Disable unless you rely on COEP isolation.
     */
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https:',
        'https://*.googleusercontent.com',
        'https://*.ggpht.com',
      ],
      'connect-src': [
        "'self'",
        'https://api.bhoominow.com',
        'https://*.bhoominow.com',
        'https://maps.googleapis.com',
        'https://*.googleapis.com',
        'https://*.gstatic.com',
        'https://api.mapbox.com',
        'https://*.mapbox.com',
        'https://events.mapbox.com',
        'wss://*.mapbox.com',
        'https://*.openstreetmap.org',
        'https://*.tile.openstreetmap.org',
        /* Google AdSense / Analytics / Tag Manager */
        'https://pagead2.googlesyndication.com',
        'https://*.googlesyndication.com',
        'https://googleads.g.doubleclick.net',
        'https://*.doubleclick.net',
        'https://www.google-analytics.com',
        'https://*.google-analytics.com',
        'https://analytics.google.com',
        'https://www.googletagmanager.com',
        'https://*.googletagmanager.com',
        'https://region1.google-analytics.com',
        'https://region1.analytics.google.com',
      ],
      'frame-src': [
        "'self'",
        'https://www.google.com',
        'https://*.google.com',
        'https://*.mapbox.com',
        'https://googleads.g.doubleclick.net',
        'https://*.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://*.googlesyndication.com',
      ],
      'worker-src': ["'self'", 'blob:'],
    },
    permissionsPolicy: {
      geolocation: ['self'],
      fullscreen: ['self'],
      camera: [],
      microphone: [],
      notifications: ['self'],
    },
  },
}
