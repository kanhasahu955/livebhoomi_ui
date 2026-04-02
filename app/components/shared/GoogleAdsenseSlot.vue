<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    /** AdSense ad unit slot id (numeric string from AdSense UI). */
    adSlot?: string
    /** e.g. horizontal, rectangle, auto */
    adFormat?: string
  }>(),
  { adFormat: 'horizontal' },
)

const config = useRuntimeConfig()

const clientId = computed(() => config.public.adsenseClientId as string)
const resolvedSlot = computed(
  () => props.adSlot || (config.public.adsenseSlotBanner as string) || '',
)

const ready = computed(
  () => Boolean(clientId.value && resolvedSlot.value),
)

function pushUnit() {
  if (!ready.value || !import.meta.client) return
  try {
    const w = window as Window & { adsbygoogle?: Record<string, unknown>[] }
    w.adsbygoogle = w.adsbygoogle || []
    w.adsbygoogle.push({})
  } catch {
    /* blocked or CSP */
  }
}

onMounted(() => {
  void nextTick(() => pushUnit())
})
</script>

<template>
  <div
    v-if="ready"
    class="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8"
    aria-label="Advertisement"
  >
    <p
      class="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted"
    >
      Sponsored
    </p>
    <div class="overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-2">
      <ins
        class="adsbygoogle block min-h-[90px] w-full"
        style="display: block"
        :data-ad-client="clientId"
        :data-ad-slot="resolvedSlot"
        :data-ad-format="adFormat"
        data-full-width-responsive="true"
      />
    </div>
  </div>
</template>
