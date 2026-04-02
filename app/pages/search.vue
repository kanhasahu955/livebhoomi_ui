<script setup lang="ts">
import { computed } from 'vue'
import HeroLineArtBackdrop from '~/components/home/HeroLineArtBackdrop.vue'
import {
  intentHeroBackgrounds,
  type SearchIntent,
} from '~/config/propertySearch.config'

useSeoMeta({
  title: 'Search & query',
  description:
    'Search buy, rent, commercial, PG, and plots across Indian cities. Same filters as the home search — open listings when you are ready.',
})

const {
  intent,
  city,
  locality,
  propertyType,
  budget,
  bhk,
  propertyTypeOptions,
  budgetOptions,
  activeLocalityChips,
  showBhkChips,
  cityLabel,
  applyLocalityChip,
  toggleBhk,
  clearFilters,
  submitSearch,
  hasActiveFilters,
  intentTabs,
  cityOptions,
  bhkChips,
} = usePropertySearchForm({
  syncFromRoute: true,
  defaultIntentFromRoute: 'pg',
})

const heroBgStyle = computed(() => ({
  background: intentHeroBackgrounds[intent.value],
}))

const veilOpacity = computed(() =>
  intent.value === 'pg'
    ? 'opacity-[0.20]'
    : intent.value === 'plots'
      ? 'opacity-[0.18]'
      : 'opacity-[0.16]',
)

const headline = computed(() => {
  if (intent.value === 'pg') {
    return `PG / Co-living in ${cityLabel.value}`
  }
  if (intent.value === 'rent') {
    return `Rent homes in ${cityLabel.value}`
  }
  if (intent.value === 'buy') {
    return `Buy your home in ${cityLabel.value}`
  }
  if (intent.value === 'commercial') {
    return `Commercial spaces in ${cityLabel.value}`
  }
  return `Plots & land in ${cityLabel.value}`
})

const subheadline = computed(() => {
  const map: Record<SearchIntent, string> = {
    buy: 'Compare how-tos, shortlist faster, and chat with verified owners — in one flow.',
    rent: 'Daily-updated rentals with clear deposits, furnishing, and move-in timelines.',
    commercial: 'Offices, retail, and flex space with location and visibility that match your brand.',
    pg: 'Food, Wi‑Fi, room type — filter PGs like you mean it, then book a visit.',
    plots: 'RERA-friendly parcels, clear frontage, and location context before you visit the site.',
  }
  return map[intent.value]
})
</script>

<template>
  <section
    class="hero-surface relative isolate flex min-h-[min(100svh,56rem)] w-full min-w-0 flex-col overflow-x-clip rounded-b-[1.75rem] text-white sm:rounded-b-[2.25rem]"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-white/12 to-transparent"
      aria-hidden="true"
    />

    <div
      class="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[inherit]"
      aria-hidden="true"
    >
      <div
        class="absolute inset-0 transition-[background] duration-700 ease-out"
        :style="heroBgStyle"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_12%,rgba(255,255,255,0.28),transparent_52%)] transition-opacity duration-700"
        :class="veilOpacity"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_85%,rgba(255,255,255,0.16),transparent_48%)] transition-opacity duration-700"
      />
      <HeroLineArtBackdrop :intent="intent" class="absolute inset-0 z-[1]" />
    </div>

    <div
      class="relative z-10 flex w-full flex-1 flex-col px-4 pb-12 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:px-6 lg:px-8"
    >
      <div class="mx-auto w-full max-w-3xl">
        <p
          class="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-xs"
        >
          Search & query
        </p>
        <h1
          class="text-center text-[clamp(1.45rem,4vw,2.25rem)] font-bold leading-tight tracking-tight text-white text-balance"
        >
          {{ headline }}
        </h1>
        <p
          class="mx-auto mt-2 max-w-2xl text-pretty text-center text-sm leading-relaxed text-white/80 sm:text-base"
        >
          {{ subheadline }}
        </p>
        <p class="mt-3 text-center text-xs text-white/60">
          <NuxtLink
            to="/"
            class="font-medium text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            ← Back to home
          </NuxtLink>
        </p>

        <div
          class="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-[1.35rem] border border-white/25 bg-slate-950/50 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-3xl"
        >
          <div
            class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
            aria-hidden="true"
          />

          <div class="p-3.5 sm:p-5 md:p-6">
            <div
              class="flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-white/15 bg-black/20 p-1 sm:gap-1 sm:p-1.5"
              role="tablist"
              aria-label="Search category"
            >
              <button
                v-for="tab in intentTabs"
                :key="tab.id"
                type="button"
                role="tab"
                :aria-selected="intent === tab.id"
                class="min-h-[42px] rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-all duration-200 sm:min-h-[44px] sm:px-3.5 sm:text-xs"
                :class="
                  intent === tab.id
                    ? 'bg-white text-heading shadow-md shadow-slate-900/25 ring-1 ring-white/80'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                "
                @click="intent = tab.id"
              >
                <span class="sm:hidden">{{ tab.short }}</span>
                <span class="hidden sm:inline">{{ tab.label }}</span>
              </button>
            </div>

            <div class="mt-4 sm:mt-5">
              <label class="sr-only" for="search-locality-input">Locality or landmark</label>
              <div
                class="flex min-h-[3.25rem] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/15 ring-1 ring-slate-200/80 sm:min-h-[3.5rem] sm:flex-row sm:items-stretch sm:rounded-full sm:p-1"
              >
                <div
                  class="flex min-w-0 flex-1 items-center border-b border-slate-100 px-3 py-2.5 sm:border-b-0 sm:py-2 sm:pl-4"
                >
                  <span class="mr-1 hidden text-xs font-semibold uppercase tracking-wide text-muted sm:mr-2 sm:inline">
                    City
                  </span>
                  <select
                    v-model="city"
                    aria-label="City"
                    class="max-w-[8.5rem] shrink-0 cursor-pointer border-0 bg-transparent text-sm font-semibold text-heading focus:ring-0 sm:max-w-[9.5rem]"
                  >
                    <option v-for="o in cityOptions" :key="o.value" :value="o.value">
                      {{ o.label }}
                    </option>
                  </select>
                  <span
                    class="mx-2 hidden h-8 w-px shrink-0 bg-slate-200 sm:mx-3 sm:block"
                    aria-hidden="true"
                  />
                  <span class="mr-2 hidden shrink-0 text-slate-400 sm:block" aria-hidden="true">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" stroke-linecap="round" />
                    </svg>
                  </span>
                  <input
                    id="search-locality-input"
                    v-model="locality"
                    type="search"
                    class="min-w-0 flex-1 border-0 bg-transparent py-1 text-sm text-heading placeholder:text-muted focus:ring-0"
                    :placeholder="
                      intent === 'commercial'
                        ? 'Area, business park, high street…'
                        : intent === 'plots'
                          ? 'Village, corridor, highway access…'
                          : 'Locality, landmark, project…'
                    "
                    autocomplete="off"
                    @keydown.enter.prevent="submitSearch"
                  />
                </div>
                <div class="flex shrink-0 items-stretch p-2 sm:p-0 sm:pr-1">
                  <button
                    type="button"
                    class="lb-btn-primary-lg w-full min-w-[7.5rem] justify-center sm:w-auto sm:px-8"
                    @click="submitSearch"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div
                class="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/55 sm:text-xs"
              >
                <span>Press <kbd class="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80">Enter</kbd> to open listings</span>
                <button
                  v-if="hasActiveFilters"
                  type="button"
                  class="font-medium text-white/90 underline decoration-white/30 underline-offset-2 transition hover:text-white"
                  @click="clearFilters"
                >
                  Clear filters
                </button>
              </div>
            </div>

            <div class="mt-4">
              <p class="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                Popular in {{ cityLabel }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="place in activeLocalityChips"
                  :key="place"
                  type="button"
                  class="rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200"
                  :class="
                    locality.trim().toLowerCase() === place.toLowerCase()
                      ? 'border-white bg-white text-heading shadow-sm'
                      : 'border-white/25 bg-white/10 text-white/90 hover:border-white/40 hover:bg-white/15'
                  "
                  @click="applyLocalityChip(place)"
                >
                  {{ place }}
                </button>
              </div>
            </div>

            <div v-if="showBhkChips" class="mt-4">
              <p class="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                BHK
              </p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="chip in bhkChips"
                  :key="chip.value"
                  type="button"
                  class="rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200"
                  :class="
                    bhk === chip.value
                      ? 'border-white bg-white/95 text-heading shadow-sm'
                      : 'border-white/25 bg-transparent text-white/85 hover:bg-white/10'
                  "
                  @click="toggleBhk(chip.value)"
                >
                  {{ chip.label }}
                </button>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div class="relative">
                <label class="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/50 sm:text-xs">
                  {{ propertyTypeOptions[0]?.label?.replace(' type', '') || 'Type' }}
                </label>
                <select
                  v-model="propertyType"
                  class="min-h-11 w-full cursor-pointer rounded-xl border border-white/25 bg-white/12 px-3 py-2.5 text-sm text-white shadow-inner shadow-black/10 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option
                    v-for="o in propertyTypeOptions"
                    :key="o.value || 'any'"
                    :value="o.value"
                    class="bg-slate-900 text-white"
                  >
                    {{ o.label }}
                  </option>
                </select>
              </div>
              <div class="relative">
                <label class="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/50 sm:text-xs">
                  Budget
                </label>
                <select
                  v-model="budget"
                  class="min-h-11 w-full cursor-pointer rounded-xl border border-white/25 bg-white/12 px-3 py-2.5 text-sm text-white shadow-inner shadow-black/10 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option
                    v-for="o in budgetOptions"
                    :key="o.value || 'any-b'"
                    :value="o.value"
                    class="bg-slate-900 text-white"
                  >
                    {{ o.label }}
                  </option>
                </select>
              </div>
            </div>

            <div
              class="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-center text-[11px] text-white/55 sm:justify-between sm:text-left sm:text-xs"
            >
              <NuxtLink
                to="/shortlist"
                class="font-medium text-white/90 underline decoration-white/25 underline-offset-4 transition hover:text-white"
              >
                View shortlist
              </NuxtLink>
              <NuxtLink
                to="/properties"
                class="font-medium text-white/90 underline decoration-white/25 underline-offset-4 transition hover:text-white"
              >
                Browse all in {{ cityLabel }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
