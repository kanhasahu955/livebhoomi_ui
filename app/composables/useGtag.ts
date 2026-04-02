/**
 * Fire GA4 / Google Ads events when `NUXT_PUBLIC_GA_MEASUREMENT_ID` is set and gtag loaded.
 */
export function useGtag() {
  function event(
    name: string,
    params?: Record<string, string | number | boolean>,
  ) {
    if (!import.meta.client || typeof window.gtag !== 'function') return
    window.gtag('event', name, params ?? {})
  }

  function configPatch(patch: Record<string, string | number | boolean>) {
    const id = useRuntimeConfig().public.gaMeasurementId as string | undefined
    if (!import.meta.client || typeof window.gtag !== 'function' || !id) return
    window.gtag('config', id, patch)
  }

  return { event, configPatch }
}
