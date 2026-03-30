import type { ModuleOptions } from 'nuxt-security'

const siteOrigin =
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.NUXT_PUBLIC_APP_URL ||
  'http://localhost:3000'

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
      ],
      'frame-src': [
        "'self'",
        'https://www.google.com',
        'https://*.google.com',
        'https://*.mapbox.com',
      ],
      'worker-src': ["'self'", 'blob:'],
    },
    permissionsPolicy: {
      geolocation: ['self'],
      fullscreen: ['self'],
      camera: [],
      microphone: [],
    },
  },
}
