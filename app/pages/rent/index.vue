<script setup lang="ts">
import {
  CheckCircle2,
  KeyRound,
  MessageCircle,
  ShieldCheck,
} from 'lucide-vue-next'
import { computed, watch } from 'vue'
import HeroLineArtBackdrop from '~/components/home/HeroLineArtBackdrop.vue'
import { parseListingPageQuery } from '~/config/listingPageFilters.config'
import { intentHeroBackgrounds } from '~/config/propertySearch.config'

const { branding } = useTheme()

useSeoMeta({
  title: `Rent homes & flats — ${branding.productName}`,
  description:
    'Browse verified rental apartments, independent houses, and studios. Filter by city, monthly budget, BHK, and furnishing — shortlist, compare, and message owners on Live Bhoomi.',
})

const {
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
  cityOptions,
  bhkChips,
} = usePropertySearchForm({
  syncFromRoute: true,
  defaultIntentFromRoute: 'rent',
  lockedIntent: 'rent',
})

const heroBgStyle = computed(() => ({
  background: intentHeroBackgrounds.rent,
}))

const previewFilters = computed(() =>
  parseListingPageQuery(
    { intent: 'rent', city: city.value } as Record<string, unknown>,
    { defaultIntent: 'rent' },
  ),
)

const {
  items,
  initialLoading,
  error,
  resetAndLoad,
} = usePropertyListingsInfinite(() => previewFilters.value)

watch(
  city,
  () => {
    void resetAndLoad()
  },
  { immediate: true },
)

const previewListings = computed(() => items.value.slice(0, 6))

const browseAllQuery = computed(() => ({
  intent: 'rent' as const,
  city: city.value,
  ...(locality.value.trim() ? { q: locality.value.trim() } : {}),
  ...(propertyType.value ? { type: propertyType.value } : {}),
  ...(budget.value ? { budget: budget.value } : {}),
  ...(bhk.value ? { bhk: bhk.value } : {}),
}))

const tenantPillars = [
  {
    icon: ShieldCheck,
    title: 'Clear monthly pricing',
    body: 'See rent, deposit norms, and furnishing upfront — fewer surprises at handover.',
  },
  {
    icon: KeyRound,
    title: 'Move-in ready options',
    body: 'Filter semi-furnished & fully furnished homes when you need to relocate fast.',
  },
  {
    icon: MessageCircle,
    title: 'Talk to owners first',
    body: 'Per-listing chat and visits — negotiate terms before you sign.',
  },
] as const

const checklist = [
  'Visit in daylight; check water pressure, power backup, and noise.',
  'Ask for society NOC / owner ID copy before token advance.',
  'Capture meter readings and document existing damages on video.',
  'Align deposit, lock-in, and notice period in writing.',
] as const
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <section
      class="hero-surface relative isolate min-h-[min(100svh,52rem)] flex flex-col rounded-b-[1.75rem] text-white sm:rounded-b-[2.25rem]"
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
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_10%,rgba(255,255,255,0.26),transparent_50%)] opacity-[0.18]"
        />
        <div
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_88%,rgba(255,255,255,0.14),transparent_46%)]"
        />
        <HeroLineArtBackdrop intent="rent" class="absolute inset-0 z-[1]" />
      </div>

      <div
        class="relative z-10 flex w-full flex-1 flex-col px-4 pb-14 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:px-6 lg:px-8"
      >
        <div class="mx-auto w-full max-w-3xl">
          <p
            class="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-xs"
          >
            Rentals
          </p>
          <h1
            class="text-center text-[clamp(1.5rem,4.2vw,2.35rem)] font-bold leading-tight tracking-tight text-white text-balance"
          >
            Rent a home you’ll enjoy coming back to
          </h1>
          <p
            class="mx-auto mt-2 max-w-2xl text-pretty text-center text-sm leading-relaxed text-white/80 sm:text-base"
          >
            Flats, houses, and studios with monthly budgets, BHK, and furnishing filters — same powerful listing
            experience as buy, tuned for tenants.
          </p>
          <p class="mt-3 text-center text-xs text-white/60">
            <NuxtLink
              to="/properties?intent=rent"
              class="font-medium text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              Skip to all rentals
            </NuxtLink>
            <span class="mx-2 text-white/35">·</span>
            <NuxtLink
              to="/"
              class="font-medium text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              Home
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
              <p
                class="mb-3 text-center text-[11px] font-semibold uppercase tracking-wide text-white/45"
              >
                Search rentals in {{ cityLabel }}
              </p>

              <div class="mt-1">
                <label class="sr-only" for="rent-locality-input">Locality or landmark</label>
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
                      id="rent-locality-input"
                      v-model="locality"
                      type="search"
                      class="min-w-0 flex-1 border-0 bg-transparent py-1 text-sm text-heading placeholder:text-muted focus:ring-0"
                      placeholder="Society, metro, landmark…"
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
                  <span>Press <kbd class="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80">Enter</kbd> for full results</span>
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
                    Property type
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
                    Budget / month
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
                  :to="{ path: '/properties', query: browseAllQuery }"
                  class="font-medium text-white/90 underline decoration-white/25 underline-offset-4 transition hover:text-white"
                >
                  Open filters &amp; compare →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-card py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          class="mx-auto max-w-2xl text-center"
          :initial="{ opacity: 0, y: 14 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            For tenants
          </p>
          <h2 class="mt-2 text-2xl font-bold text-heading sm:text-3xl">
            Rent with confidence on {{ branding.productName }}
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-pretty text-muted">
            The same verified listing stack as buy — monthly rent display, furnishing tags, and owner chat so you can shortlist without endless calls.
          </p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
          <div
            v-for="(pillar, i) in tenantPillars"
            :key="pillar.title"
            v-motion
            class="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm transition hover:border-hero/20 hover:shadow-md"
            :initial="{ opacity: 0, y: 18 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 280, damping: 28, delay: 40 + i * 50 },
            }"
          >
            <div
              class="flex size-11 items-center justify-center rounded-xl bg-hero/10 text-hero"
            >
              <component :is="pillar.icon" class="size-5" />
            </div>
            <h3 class="mt-4 text-lg font-bold text-heading">
              {{ pillar.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ pillar.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-surface py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-hero">
              Preview
            </p>
            <h2 class="mt-1 text-2xl font-extrabold text-heading sm:text-3xl">
              Fresh rentals in {{ cityLabel }}
            </h2>
            <p class="mt-2 max-w-xl text-sm text-muted">
              A live slice of mock inventory — change city above to refresh. Open the full grid for sort, list view, compare, and export.
            </p>
          </div>
          <NuxtLink
            :to="{ path: '/properties', query: browseAllQuery }"
            class="lb-btn-primary shrink-0 justify-center px-6 py-3 text-sm font-bold"
          >
            View all in {{ cityLabel }}
          </NuxtLink>
        </div>

        <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          class="mt-8"
        />

        <div
          v-if="initialLoading"
          class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="overflow-hidden rounded-2xl border border-border/80 bg-card"
          >
            <el-skeleton animated class="p-0">
              <template #template>
                <el-skeleton-item variant="image" class="!h-52 !w-full" />
                <div class="p-4">
                  <el-skeleton-item variant="h3" class="!w-2/5" />
                  <el-skeleton-item variant="text" class="!mt-3" />
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>

        <div
          v-else
          class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <PropertyListingCard
            v-for="l in previewListings"
            :key="l.id"
            :listing="l"
          />
        </div>

        <p
          v-if="!initialLoading && !previewListings.length"
          class="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted"
        >
          No rentals match this city in the demo dataset. Try another city or open the full catalogue.
        </p>
      </div>
    </section>

    <section class="border-t border-border bg-card py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div>
            <h2 class="text-2xl font-bold text-heading sm:text-3xl">
              Before you pay the deposit
            </h2>
            <p class="mt-3 text-sm text-muted leading-relaxed">
              Quick sanity checks that save headaches — not legal advice; confirm with your counsel for agreements.
            </p>
            <ul class="mt-6 space-y-3">
              <li
                v-for="(line, i) in checklist"
                :key="i"
                class="flex gap-3 text-sm text-body"
              >
                <CheckCircle2 class="mt-0.5 size-5 shrink-0 text-hero" />
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
          <div
            class="rounded-3xl border border-hero/20 bg-gradient-to-br from-hero/[0.06] via-card to-indigo-500/[0.05] p-8 shadow-inner"
          >
            <p class="text-xs font-bold uppercase tracking-widest text-hero">
              List your rental
            </p>
            <h3 class="mt-2 text-xl font-bold text-heading">
              Owners &amp; managers
            </h3>
            <p class="mt-2 text-sm text-muted leading-relaxed">
              Post for free, add photos, and reply from chat when seekers message you. Upgrade later for more visibility.
            </p>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/post-property"
                class="lb-btn-primary justify-center px-6 py-3 text-center text-sm font-bold"
              >
                Post property
              </NuxtLink>
              <NuxtLink
                to="/pricing"
                class="lb-btn-surface justify-center px-6 py-3 text-center text-sm font-semibold"
              >
                See plans
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
