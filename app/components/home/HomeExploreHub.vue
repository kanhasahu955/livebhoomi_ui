<script setup lang="ts">
type HubItem = {
  title: string
  description: string
  to: string
  accent: string
}

const items: HubItem[] = [
  {
    title: 'Buy a home',
    description: 'Apartments, villas & independent houses with clear budgets and BHK filters.',
    to: '/properties',
    accent: 'from-blue-500/15 via-hero/10 to-transparent dark:from-blue-400/20',
  },
  {
    title: 'Rent & lease',
    description: 'Furnished & semi-furnished homes, flexible tenures, locality-first search.',
    to: '/rent',
    accent: 'from-emerald-500/12 via-teal-500/10 to-transparent dark:from-emerald-400/15',
  },
  {
    title: 'Commercial',
    description: 'Offices, retail, warehouses — built for business discovery across cities.',
    to: '/commercial',
    accent: 'from-violet-500/12 via-purple-500/10 to-transparent dark:from-violet-400/15',
  },
  {
    title: 'PG & co-living',
    description: 'PG hub, co-living spaces, and hostels — room types and monthly budgets.',
    to: '/pg',
    accent: 'from-amber-500/14 via-orange-500/10 to-transparent dark:from-amber-400/15',
  },
  {
    title: 'Plots & land',
    description: 'Residential parcels, commercial land, and project-linked inventory.',
    to: '/projects',
    accent: 'from-sky-500/14 via-cyan-500/10 to-transparent dark:from-sky-400/15',
  },
]
</script>

<template>
  <section
    class="border-b border-border bg-surface py-12 sm:py-16 md:py-20"
    aria-labelledby="explore-hub-heading"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
      <div
        v-motion
        class="mx-auto max-w-2xl text-center"
        :initial="{ opacity: 0, y: 18 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        }"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-hero">
          Explore LiveBhoomi
        </p>
        <h2
          id="explore-hub-heading"
          class="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          Every property journey, one platform
        </h2>
        <p class="mt-3 text-pretty text-muted">
          Jump into the experience that matches how you actually search — buy, rent, work, stay, or build.
        </p>
      </div>

      <div
        class="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5"
      >
        <NuxtLink
          v-for="(item, index) in items"
          :key="item.to"
          v-motion
          :to="item.to"
          class="group relative flex flex-col overflow-hidden rounded-2xl border border-border/90 bg-card p-5 shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-hero/25 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-hero/40 motion-reduce:transform-none"
          :initial="{ opacity: 0, y: 22 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 280,
              damping: 26,
              delay: 60 + index * 45,
            },
          }"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            :class="item.accent"
            aria-hidden="true"
          />
          <div class="relative flex flex-1 flex-col">
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-hero/10 text-hero transition duration-300 group-hover:bg-hero/15"
              aria-hidden="true"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </span>
            <h3 class="mt-4 text-base font-semibold text-heading">
              {{ item.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {{ item.description }}
            </p>
            <span
              class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hero"
            >
              Browse
              <svg
                class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
