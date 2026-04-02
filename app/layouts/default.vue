<script setup lang="ts">
const route = useRoute()
const { adsenseClientId, adsenseSlotBanner } = useRuntimeConfig().public

const showAdsenseBanner = computed(
  () => Boolean(adsenseClientId && adsenseSlotBanner),
)
</script>

<template>
  <div class="relative flex min-h-screen min-h-[100dvh] w-full min-w-0 flex-col overflow-x-clip bg-surface text-body antialiased selection:bg-hero/20">
    <AppHeader />
    <!--
      Pages without `.hero-surface` (home hero): gradient band under the overlay header
      so white nav matches old home. Home keeps full-bleed hero only.
    -->
    <main
      class="w-full min-w-0 flex-1 [&:not(:has(.hero-surface))]:before:pointer-events-none [&:not(:has(.hero-surface))]:before:block [&:not(:has(.hero-surface))]:before:h-[calc(3.5rem+env(safe-area-inset-top))] [&:not(:has(.hero-surface))]:before:w-full [&:not(:has(.hero-surface))]:before:shrink-0 [&:not(:has(.hero-surface))]:before:bg-gradient-to-br [&:not(:has(.hero-surface))]:before:from-hero [&:not(:has(.hero-surface))]:before:to-hero-hover sm:[&:not(:has(.hero-surface))]:before:h-[calc(3.75rem+env(safe-area-inset-top))]"
    >
      <slot />
    </main>
    <ClientOnly>
      <GoogleAdsenseSlot
        v-if="showAdsenseBanner"
        :key="route.path"
      />
    </ClientOnly>
    <AppFooter />
    <ClientOnly>
      <FloatingChatWidget />
    </ClientOnly>
  </div>
</template>
