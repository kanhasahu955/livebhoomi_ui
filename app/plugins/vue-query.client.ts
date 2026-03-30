import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryConfig } from '../config/performance.config'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient(vueQueryConfig)
  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })
  return {
    provide: {
      queryClient,
    },
  }
})
