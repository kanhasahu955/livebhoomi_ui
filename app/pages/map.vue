<script setup lang="ts">
import { computed, ref } from 'vue'
import { mapPopularAreas, type MapPopularArea } from '~/data/mapPopularAreas'

const { branding } = useTheme()

useSeoMeta({
  title: `Interactive map — ${branding.productName}`,
  description:
    'Explore properties on a map — pick Mumbai neighbourhoods, toggle nearby amenities, and jump to search or contact.',
})

const mapRef = ref<{
  flyToArea: (a: MapPopularArea) => void
  resetMap: () => void
} | null>(null)

const selectedAreaId = ref<string | null>(null)
const areaSearch = ref('')

const filteredPopular = computed(() => {
  const q = areaSearch.value.trim().toLowerCase()
  if (!q) return mapPopularAreas
  return mapPopularAreas.filter((a) => a.name.toLowerCase().includes(q))
})

const steps = [
  {
    n: '1',
    title: 'Select location',
    body: 'Choose a popular area or tap a pin — the map flies to that neighbourhood.',
  },
  {
    n: '2',
    title: 'Explore properties',
    body: 'Open the pin popup for counts and price bands, then continue to full search.',
  },
  {
    n: '3',
    title: 'View details',
    body: 'Use Search or Contact to talk to owners and agents with context.',
  },
] as const

function selectArea(area: MapPopularArea) {
  mapRef.value?.flyToArea(area)
}
</script>

<template>
  <div class="min-h-[100dvh] w-full min-w-0 overflow-x-clip bg-surface">
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
          Interactive map
        </p>
        <h1 class="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
          Find your perfect location
        </h1>
        <p class="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg">
          Explore properties on an interactive map. Select locations, view nearby amenity hints, and discover your ideal neighbourhood — same flow as
          <a
            href="https://livebhoomi.com/map"
            class="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            rel="noopener noreferrer"
            target="_blank"
          >livebhoomi.com/map</a>.
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <section aria-labelledby="map-how-heading" class="mb-12 lg:mb-16">
        <h2 id="map-how-heading" class="text-xl font-bold text-heading sm:text-2xl">
          How it works
        </h2>
        <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          Follow these steps to orient yourself before you shortlist or talk to an agent.
        </p>
        <ol class="mt-8 grid gap-6 sm:grid-cols-3">
          <li
            v-for="s in steps"
            :key="s.n"
            class="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <span
              class="inline-flex size-9 items-center justify-center rounded-full bg-hero/10 text-sm font-bold text-hero"
            >{{ s.n }}</span>
            <h3 class="mt-3 font-semibold text-heading">
              {{ s.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ s.body }}
            </p>
          </li>
        </ol>
      </section>

      <div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7 xl:col-span-8">
          <ClientOnly>
            <ExplorePropertyMap ref="mapRef" v-model="selectedAreaId" />
            <template #fallback>
              <div
                class="flex h-[min(420px,55vh)] min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-border bg-nav-active/30 text-sm text-muted"
              >
                Loading map…
              </div>
            </template>
          </ClientOnly>
        </div>

        <aside class="lg:col-span-5 xl:col-span-4" aria-labelledby="popular-areas-heading">
          <h2 id="popular-areas-heading" class="text-lg font-semibold text-heading">
            Popular areas
          </h2>
          <p class="mt-1 text-xs text-muted sm:text-sm">
            Mumbai micro-markets (sample data). Tap a row to fly the map.
          </p>
          <label class="sr-only" for="popular-filter">Filter areas</label>
          <input
            id="popular-filter"
            v-model="areaSearch"
            type="search"
            placeholder="Search area…"
            class="mt-4 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-heading placeholder:text-muted focus:border-hero/40 focus:outline-none focus:ring-2 focus:ring-hero/20"
            autocomplete="off"
          />
          <ul class="mt-4 space-y-2">
            <li v-for="area in filteredPopular" :key="area.id">
              <button
                type="button"
                class="w-full rounded-xl border px-4 py-3 text-left transition"
                :class="
                  selectedAreaId === area.id
                    ? 'border-hero/40 bg-hero/5 ring-1 ring-hero/20'
                    : 'border-border bg-card hover:border-hero/25 hover:bg-nav-active/40'
                "
                @click="selectArea(area)"
              >
                <span class="font-semibold text-heading">{{ area.name }}</span>
                <span class="mt-0.5 block text-xs text-muted">
                  {{ area.propertyCount }} properties · from {{ area.priceBand }}
                </span>
              </button>
            </li>
          </ul>
          <p v-if="!filteredPopular.length" class="mt-4 text-sm text-muted">
            No areas match that search.
          </p>
        </aside>
      </div>

      <section
        class="mt-14 rounded-2xl border border-border bg-gradient-to-br from-nav-active/80 to-card p-8 text-center dark:from-hero/10 dark:to-card sm:mt-16 sm:p-10"
      >
        <h2 class="text-xl font-bold text-heading sm:text-2xl">
          Ready to explore properties?
        </h2>
        <p class="mx-auto mt-2 max-w-lg text-sm text-muted sm:text-base">
          Use search for full filters, or reach the team when you’re ready to go deeper on a location.
        </p>
        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/search" class="lb-btn-primary justify-center">
            Start exploring
          </NuxtLink>
          <NuxtLink to="/contact" class="lb-btn-surface justify-center">
            Contact agent
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
