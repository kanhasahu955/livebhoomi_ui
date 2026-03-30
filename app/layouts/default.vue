<template>
  <div class="relative flex min-h-screen min-h-[100dvh] flex-col bg-surface text-body antialiased">
    <AppHeader />
    <!--
      Pages without `.hero-surface` (home hero): gradient band under the overlay header
      so white nav matches old home. Home keeps full-bleed hero only.
    -->
    <main
      class="w-full flex-1 [&:not(:has(.hero-surface))]:before:pointer-events-none [&:not(:has(.hero-surface))]:before:block [&:not(:has(.hero-surface))]:before:h-[calc(3.5rem+env(safe-area-inset-top))] [&:not(:has(.hero-surface))]:before:w-full [&:not(:has(.hero-surface))]:before:shrink-0 [&:not(:has(.hero-surface))]:before:bg-gradient-to-br [&:not(:has(.hero-surface))]:before:from-hero [&:not(:has(.hero-surface))]:before:to-hero-hover sm:[&:not(:has(.hero-surface))]:before:h-[calc(3.75rem+env(safe-area-inset-top))]"
    >
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <FloatingChatWidget />
    </ClientOnly>
  </div>
</template>
