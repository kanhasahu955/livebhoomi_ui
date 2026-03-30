<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import HeroIntentDecor from '~/components/home/HeroIntentDecor.vue'
import HeroLineArtBackdrop from '~/components/home/HeroLineArtBackdrop.vue'
import {
  bhkChips,
  budgetOptionsForIntent,
  buildPropertiesQuery,
  cityOptions,
  intentTabs,
  localityChipsByCity,
  propertyTypeOptionsForIntent,
  type SearchIntent,
} from '~/config/propertySearch.config'

const { y: scrollY } = useWindowScroll()

/** When user has scrolled past hero top, flatten bottom edge (straight join to next section). */
const HERO_BOTTOM_STRAIGHT_AFTER_PX = 36

const heroBottomRadiusClass = computed(() =>
  scrollY.value > HERO_BOTTOM_STRAIGHT_AFTER_PX
    ? 'rounded-b-none'
    : 'rounded-b-[1.75rem] sm:rounded-b-[2.25rem] md:rounded-b-[2.25rem]',
)

const intent = ref<SearchIntent>('pg')
const city = ref('hyderabad')
const locality = ref('')
const propertyType = ref('')
const budget = ref('')
const bhk = ref('')

/** Reset dependent fields when journey changes (keeps search coherent). */
watch(intent, () => {
  propertyType.value = ''
  budget.value = ''
  bhk.value = ''
})

const intentBackgrounds: Record<SearchIntent, string> = {
  buy:
    'linear-gradient(122deg, var(--lb-primary) 0%, var(--lb-hero-hover) 50%, var(--lb-primary) 100%)',
  rent:
    'linear-gradient(126deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)',
  commercial:
    'linear-gradient(124deg, var(--lb-primary) 0%, var(--lb-hero-hover) 52%, var(--lb-primary) 100%)',
  pg:
    'linear-gradient(130deg, var(--lb-primary) 0%, var(--lb-hero-hover) 49%, var(--lb-primary) 100%)',
  plots:
    'linear-gradient(120deg, var(--lb-primary) 0%, var(--lb-hero-hover) 51%, var(--lb-primary) 100%)',
}

const heroBgStyle = computed(() => ({
  background: intentBackgrounds[intent.value],
}))

const veilOpacity = computed(() =>
  intent.value === 'pg'
    ? 'opacity-[0.20]'
    : intent.value === 'plots'
      ? 'opacity-[0.18]'
      : 'opacity-[0.16]',
)

const purchasePropertyTypes = [
  { label: 'Property type', value: '' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Independent house', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
]

const commercialPropertyTypes = [
  { label: 'Space type', value: '' },
  { label: 'Office', value: 'office' },
  { label: 'Retail shop', value: 'retail' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Co-working', value: 'coworking' },
]

const pgPropertyTypes = [
  { label: 'Room type', value: '' },
  { label: 'Private room', value: 'private-room' },
  { label: 'Shared room', value: 'shared-room' },
  { label: 'Entire PG', value: 'entire-pg' },
]

const plotsPropertyTypes = [
  { label: 'Plot type', value: '' },
  { label: 'Residential plot', value: 'residential-plot' },
  { label: 'Commercial land', value: 'commercial-land' },
  { label: 'Farm / agriculture', value: 'farmland' },
]

const propertyTypeOptions = computed(() => {
  if (intent.value === 'commercial') return commercialPropertyTypes
  if (intent.value === 'pg') return pgPropertyTypes
  if (intent.value === 'plots') return plotsPropertyTypes
  return purchasePropertyTypes
})

const purchaseBudgetOptions = [
  { label: 'Budget', value: '' },
  { label: 'Under ₹25 Lac', value: '0-25' },
  { label: '₹25 Lac – ₹50 Lac', value: '25-50' },
  { label: '₹50 Lac – ₹1 Cr', value: '50-100' },
  { label: '₹1 Cr+', value: '100+' },
]

const monthlyBudgetOptions = [
  { label: 'Budget / month', value: '' },
  { label: 'Under ₹10,000', value: '0-10k' },
  { label: '₹10k – ₹20k', value: '10-20k' },
  { label: '₹20k – ₹35k', value: '20-35k' },
  { label: '₹35k+', value: '35k+' },
]

const plotBudgetOptions = [
  { label: 'Plot budget', value: '' },
  { label: 'Under ₹30 Lac', value: '0-30' },
  { label: '₹30 – ₹60 Lac', value: '30-60' },
  { label: '₹60 Lac – ₹1.2 Cr', value: '60-120' },
  { label: '₹1.2 Cr+', value: '120+' },
]

const budgetOptions = computed(() => {
  if (intent.value === 'rent' || intent.value === 'pg') return monthlyBudgetOptions
  if (intent.value === 'plots') return plotBudgetOptions
  return purchaseBudgetOptions
})

const localityChipsByCity: Record<string, string[]> = {
  hyderabad: ['Miyapur', 'Kondapur', 'Gachibowli', 'Banjara Hills'],
  bangalore: ['Whitefield', 'HSR Layout', 'Indiranagar', 'Electronic City'],
  mumbai: ['Andheri', 'Powai', 'Thane West', 'Bandra'],
  'delhi-ncr': ['Noida Sec 62', 'Gurugram DLF', 'Dwarka', 'Indirapuram'],
  pune: ['Hinjewadi', 'Koregaon Park', 'Wakad', 'Viman Nagar'],
  chennai: ['OMR', 'Velachery', 'Adyar', 'Porur'],
}

const activeLocalityChips = computed(
  () => localityChipsByCity[city.value] ?? ['City center', 'IT corridor', 'Metro nearby'],
)

const bhkChips = [
  { label: '1 BHK', value: '1' },
  { label: '2 BHK', value: '2' },
  { label: '3 BHK', value: '3' },
  { label: '4+ BHK', value: '4' },
]

const showBhkChips = computed(
  () => intent.value === 'buy' || intent.value === 'rent',
)

const cityLabel = computed(() => {
  const c = cityOptions.find((o) => o.value === city.value)
  return c?.label ?? 'India'
})

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

function applyLocalityChip(place: string) {
  locality.value = place
}

function toggleBhk(value: string) {
  bhk.value = bhk.value === value ? '' : value
}

function clearHeroFilters() {
  locality.value = ''
  propertyType.value = ''
  budget.value = ''
  bhk.value = ''
}

function submitSearch() {
  navigateTo({
    path: '/properties',
    query: buildPropertiesQuery({
      intent: intent.value,
      city: city.value,
      locality: locality.value,
      propertyType: propertyType.value,
      budget: budget.value,
      bhk: bhk.value,
    }),
  })
}

const hasActiveFilters = computed(
  () =>
    Boolean(
      locality.value.trim() || propertyType.value || budget.value || bhk.value,
    ),
)
</script>

<template>
  <section
    class="hero-surface relative isolate flex min-h-[100svh] flex-col text-white motion-safe:transition-[border-radius] motion-safe:duration-500 motion-safe:ease-out"
    :class="heroBottomRadiusClass"
  >
    <!-- subtle top shine -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-white/12 to-transparent"
      aria-hidden="true"
    />

    <div
      class="pointer-events-none absolute inset-0 overflow-hidden motion-safe:transition-[border-radius] motion-safe:duration-500 motion-safe:ease-out"
      :class="heroBottomRadiusClass"
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
      class="relative z-10 flex w-full flex-1 flex-col justify-start px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(4rem+env(safe-area-inset-top))] sm:px-5 sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pt-[calc(4.25rem+env(safe-area-inset-top))] md:px-6 lg:px-8"
    >
      <div
        class="mx-auto flex w-full max-w-4xl flex-1 flex-col xl:max-w-5xl 2xl:max-w-6xl"
      >
        <!-- Eyebrow stats -->
        <p
          class="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:mb-3 sm:text-xs"
        >
          Live listings · Saved alerts · Verified owners
        </p>

        <h1
          :key="`${intent}-head`"
          v-motion
          class="mx-auto max-w-4xl text-center text-[clamp(1.55rem,4.8vw,2.65rem)] font-bold leading-[1.12] tracking-tight text-white text-balance"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 380, damping: 32 },
          }"
        >
          {{ headline }}
        </h1>

        <p
          :key="`${intent}-sub`"
          class="mx-auto mt-2 max-w-2xl text-pretty text-center text-sm leading-relaxed text-white/80 sm:mt-3 sm:text-base"
        >
          {{ subheadline }}
        </p>

        <!-- Trust chips -->
        <div
          class="mx-auto mt-3 flex max-w-xl flex-wrap items-center justify-center gap-1.5 sm:mt-4 sm:gap-2"
        >
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:text-xs"
          >
            <svg class="size-3.5 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Verified listings
          </span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:text-xs"
          >
            <svg class="size-3.5 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            RERA-aware filters
          </span>
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm sm:text-xs"
          >
            <svg class="size-3.5 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" />
            </svg>
            Free owner listings
          </span>
        </div>

        <div
          class="pointer-events-none relative z-20 mx-auto mb-3 mt-4 flex h-[7.5rem] w-full max-w-sm justify-center px-2 sm:mb-3 sm:mt-5 sm:h-[10rem] sm:max-w-md md:h-[11.5rem] md:max-w-lg lg:max-w-xl"
          aria-hidden="true"
        >
          <Transition name="hero-deco" mode="out-in">
            <HeroIntentDecor :key="intent" :intent="intent" placement="center" />
          </Transition>
        </div>

        <!-- Main search card — in-page anchor for /#home-search -->
        <div
          id="home-search"
          v-motion
          class="relative mx-auto w-full max-w-3xl scroll-mt-28 overflow-hidden rounded-[1.35rem] border border-white/25 bg-slate-950/50 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:rounded-3xl sm:scroll-mt-32"
          :initial="{ opacity: 0, y: 24 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30, delay: 60 },
          }"
        >
          <div
            class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
            aria-hidden="true"
          />

          <div class="p-3.5 sm:p-5 md:p-6">
            <!-- Segmented intent control -->
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

            <!-- Search field -->
            <div class="mt-4 sm:mt-5">
              <label class="sr-only" for="hero-locality-input">Locality or landmark</label>
              <div
                class="flex min-h-[3.25rem] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/15 ring-1 ring-slate-200/80 sm:min-h-[3.5rem] sm:flex-row sm:items-stretch sm:rounded-full sm:p-1"
              >
                <div
                  class="flex flex-1 items-center border-b border-slate-100 px-3 py-2.5 sm:border-b-0 sm:py-2 sm:pl-4"
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
                    id="hero-locality-input"
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
                <span>Press <kbd class="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80">Enter</kbd> to search</span>
                <button
                  v-if="hasActiveFilters"
                  type="button"
                  class="font-medium text-white/90 underline decoration-white/30 underline-offset-2 transition hover:text-white"
                  @click="clearHeroFilters"
                >
                  Clear filters
                </button>
              </div>
            </div>

            <!-- Quick localities -->
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

            <!-- BHK quick chips -->
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

            <!-- Secondary filters -->
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

        <!-- Owner CTA: full-width strip, above Premium, stays in first screen on most laptops -->
        <div class="mx-auto mt-4 w-full max-w-3xl sm:mt-5">
          <NuxtLink
            to="/post-property"
            class="lb-outline-owner min-h-[3rem] w-full min-w-0 shadow-lg shadow-black/20 sm:min-h-[3.25rem] sm:px-6"
          >
            <span>Are you a Property Owner?</span>
            <span class="font-bold">Post — Sell / Rent for FREE</span>
            <span class="text-white/70" aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <!-- Premium upsell -->
        <div
          v-motion
          class="mx-auto mt-4 w-full max-w-3xl sm:mt-5"
          :initial="{ opacity: 0, y: 18 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 280, damping: 30, delay: 120 },
          }"
        >
          <NuxtLink
            to="/premium"
            class="group flex overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-slate-900/90 via-hero to-blue-800/95 shadow-xl ring-1 ring-white/10 transition duration-300 hover:border-white/30 hover:shadow-2xl active:scale-[0.99] motion-reduce:transform-none sm:rounded-3xl"
          >
            <div
              class="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4 sm:px-6 sm:py-5"
            >
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-semibold text-white sm:text-base">
                  LiveBhoomi Premium
                </span>
                <span
                  class="rounded-md bg-gradient-to-r from-pink-500/90 to-rose-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm"
                >
                  New
                </span>
              </div>
              <p class="text-xs leading-relaxed text-white/85 sm:text-sm">
                Instant alerts, deeper filters, and priority help when you’re ready to decide.
              </p>
              <span
                class="inline-flex w-fit items-center gap-1 text-xs font-semibold text-white/95 transition group-hover:gap-2"
              >
                See benefits
                <span aria-hidden="true">→</span>
              </span>
            </div>
            <div
              class="relative hidden w-28 shrink-0 sm:flex sm:w-36 md:w-44"
              aria-hidden="true"
            >
              <div
                class="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/10"
              />
              <svg
                class="relative m-auto h-full w-[85%] text-white/35"
                viewBox="0 0 200 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="36" y="28" width="128" height="72" rx="12" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M52 78 L76 54 L100 70 L124 46 L148 62"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="148" cy="62" r="4" fill="currentColor" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Spacer so last card clears safe area when column is shorter than viewport -->
        <div class="min-h-2 flex-1 sm:min-h-4" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-deco-enter-active,
.hero-deco-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.hero-deco-enter-from,
.hero-deco-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .hero-deco-enter-active,
  .hero-deco-leave-active {
    transition: none;
  }
}
</style>
