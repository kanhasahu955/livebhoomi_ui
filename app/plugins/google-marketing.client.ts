/**
 * Loads Google AdSense (display) and optional GA4 / Google Ads gtag when env IDs are set.
 * @see https://support.google.com/adsense/answer/9274634
 */
export default defineNuxtPlugin(() => {
  const pub = useRuntimeConfig().public as {
    adsenseClientId?: string
    gaMeasurementId?: string
  }

  if (pub.adsenseClientId) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(pub.adsenseClientId)}`
    s.crossOrigin = 'anonymous'
    document.head.appendChild(s)
  }

  const gaId = pub.gaMeasurementId?.trim()
  if (!gaId) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', gaId)

  const g = document.createElement('script')
  g.async = true
  g.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(g)

  const router = useRouter()
  router.afterEach((to) => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', gaId, {
      page_path: to.fullPath + (to.hash || ''),
    })
  })
})

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
