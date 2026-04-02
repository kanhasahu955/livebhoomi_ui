<script setup lang="ts">
import { RotateCcw } from 'lucide-vue-next'
import {
  flattenRouteQuery,
  mergeFacetsIntoQuery,
  parseListingPageQuery,
  parseListingViewMode,
  type ListingFacetQuery,
} from '~/config/listingPageFilters.config'
import type { PropertyListFilters } from '~/types/propertyListing.types'
import {
  bhkChips,
  cityOptions,
  intentTabs,
} from '~/config/propertySearch.config'

const route = useRoute()
const router = useRouter()

const SEARCH_KEYS = [
  'intent',
  'city',
  'q',
  'type',
  'budget',
  'bhk',
] as const

function currentFacets(): ListingFacetQuery {
  const q = route.query as Record<string, unknown>
  const cur = parseListingPageQuery(q, { defaultIntent: 'buy' })
  return {
    sort: cur.sort,
    furnishing: cur.furnishing,
    verifiedOnly: cur.verifiedOnly,
    reraOnly: cur.reraOnly,
    readyToMoveOnly: cur.readyToMoveOnly,
    minSqft: cur.minSqft,
    maxSqft: cur.maxSqft,
    postedWithinDays: cur.postedWithinDays,
    savedOnly: cur.savedOnly,
    facing: cur.facing,
    view: parseListingViewMode(q),
  }
}

function patchFacets(p: Partial<ListingFacetQuery>) {
  const flat = flattenRouteQuery(route.query as Record<string, unknown>)
  const merged = { ...currentFacets(), ...p }
  void router.replace({
    path: route.path,
    query: mergeFacetsIntoQuery(flat, merged),
  })
}

function setSearchKey(key: string, value: string) {
  const flat = flattenRouteQuery(route.query as Record<string, unknown>)
  if (!value) delete flat[key]
  else flat[key] = value
  void router.replace({ path: route.path, query: flat })
}

function clearFacetFilters() {
  const flat = flattenRouteQuery(route.query as Record<string, unknown>)
  const next: Record<string, string> = {}
  for (const k of SEARCH_KEYS) {
    const v = flat[k]
    if (v) next[k] = v
  }
  void router.replace({ path: route.path, query: next })
}

const parsed = computed(() =>
  parseListingPageQuery(route.query as Record<string, unknown>, {
    defaultIntent: 'buy',
  }),
)

const furnishingOptions = [
  { label: 'Any furnishing', value: '' },
  { label: 'Furnished', value: 'furnished' },
  { label: 'Semi-furnished', value: 'semi-furnished' },
  { label: 'Unfurnished', value: 'unfurnished' },
] as const

const postedOptions = [
  { label: 'Any time', value: '' },
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 14 days', value: '14' },
  { label: 'Last 30 days', value: '30' },
] as const

const facingOptions = [
  { label: 'Any facing', value: '' },
  { label: 'East', value: 'East' },
  { label: 'North', value: 'North' },
  { label: 'West', value: 'West' },
  { label: 'South', value: 'South' },
  { label: 'North-East', value: 'North-East' },
] as const
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-sm font-bold uppercase tracking-wide text-heading">
        Filters
      </h2>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted transition hover:border-hero/30 hover:text-heading"
        @click="clearFacetFilters"
      >
        <RotateCcw class="size-3.5" />
        Reset facets
      </button>
    </div>

    <div>
      <p class="mb-2 text-xs font-semibold text-muted">
        Intent
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="tab in intentTabs"
          :key="tab.id"
          type="button"
          class="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
          :class="
            parsed.intent === tab.id
              ? 'border-hero bg-hero/10 text-hero'
              : 'border-border bg-card text-heading hover:border-hero/25'
          "
          @click="setSearchKey('intent', tab.id)"
        >
          {{ tab.short }}
        </button>
      </div>
    </div>

    <div>
      <label class="mb-2 block text-xs font-semibold text-muted">City</label>
      <el-select
        class="w-full"
        :model-value="parsed.city"
        placeholder="City"
        @update:model-value="setSearchKey('city', $event as string)"
      >
        <el-option
          v-for="c in cityOptions"
          :key="c.value"
          :label="c.label"
          :value="c.value"
        />
      </el-select>
    </div>

    <div v-if="parsed.intent === 'buy' || parsed.intent === 'rent'">
      <p class="mb-2 text-xs font-semibold text-muted">
        BHK
      </p>
      <div class="flex flex-wrap gap-1.5">
        <button
          type="button"
          class="rounded-full border px-2.5 py-1 text-xs font-semibold transition"
          :class="
            !parsed.bhk
              ? 'border-hero bg-hero/10 text-hero'
              : 'border-border bg-card text-heading hover:border-hero/25'
          "
          @click="setSearchKey('bhk', '')"
        >
          Any
        </button>
        <button
          v-for="b in bhkChips"
          :key="b.value"
          type="button"
          class="rounded-full border px-2.5 py-1 text-xs font-semibold transition"
          :class="
            parsed.bhk === b.value
              ? 'border-hero bg-hero/10 text-hero'
              : 'border-border bg-card text-heading hover:border-hero/25'
          "
          @click="setSearchKey('bhk', b.value)"
        >
          {{ b.label }}
        </button>
      </div>
    </div>

    <div>
      <label class="mb-2 block text-xs font-semibold text-muted">Furnishing</label>
      <el-select
        class="w-full"
        :model-value="parsed.furnishing || ''"
        placeholder="Any"
        clearable
        @update:model-value="
          patchFacets({ furnishing: ($event as string) || '' })
        "
      >
        <el-option
          v-for="o in furnishingOptions"
          :key="String(o.value)"
          :label="o.label"
          :value="o.value"
        />
      </el-select>
    </div>

    <div>
      <label class="mb-2 block text-xs font-semibold text-muted">Posted</label>
      <el-select
        class="w-full"
        :model-value="parsed.postedWithinDays || ''"
        placeholder="Any"
        clearable
        @update:model-value="
          patchFacets({
            postedWithinDays: ($event as '' | '7' | '14' | '30') || '',
          })
        "
      >
        <el-option
          v-for="o in postedOptions"
          :key="String(o.value)"
          :label="o.label"
          :value="o.value"
        />
      </el-select>
    </div>

    <div>
      <label class="mb-2 block text-xs font-semibold text-muted">Facing</label>
      <el-select
        class="w-full"
        :model-value="parsed.facing || ''"
        placeholder="Any"
        clearable
        @update:model-value="
          patchFacets({
            facing: ($event
              ? String($event)
              : '') as PropertyListFilters['facing'],
          })
        "
      >
        <el-option
          v-for="o in facingOptions"
          :key="String(o.value)"
          :label="o.label"
          :value="o.value"
        />
      </el-select>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="mb-1 block text-[11px] font-semibold text-muted">Min sq.ft</label>
        <el-input
          :model-value="parsed.minSqft"
          placeholder="Min"
          inputmode="numeric"
          @update:model-value="patchFacets({ minSqft: String($event || '') })"
        />
      </div>
      <div>
        <label class="mb-1 block text-[11px] font-semibold text-muted">Max sq.ft</label>
        <el-input
          :model-value="parsed.maxSqft"
          placeholder="Max"
          inputmode="numeric"
          @update:model-value="patchFacets({ maxSqft: String($event || '') })"
        />
      </div>
    </div>

    <div class="space-y-2 rounded-xl border border-border/80 bg-nav-active/20 p-3 dark:bg-hero/5">
      <p class="text-xs font-semibold text-heading">
        Listing tags
      </p>
      <el-checkbox
        :model-value="parsed.verifiedOnly"
        @update:model-value="patchFacets({ verifiedOnly: Boolean($event) })"
      >
        Verified only
      </el-checkbox>
      <el-checkbox
        :model-value="parsed.reraOnly"
        @update:model-value="patchFacets({ reraOnly: Boolean($event) })"
      >
        RERA badge
      </el-checkbox>
      <el-checkbox
        :model-value="parsed.readyToMoveOnly"
        @update:model-value="patchFacets({ readyToMoveOnly: Boolean($event) })"
      >
        Ready to move
      </el-checkbox>
      <el-checkbox
        :model-value="parsed.savedOnly"
        @update:model-value="patchFacets({ savedOnly: Boolean($event) })"
      >
        Saved homes only
      </el-checkbox>
    </div>

    <NuxtLink
      to="/search"
      class="block text-center text-xs font-semibold text-hero hover:underline"
    >
      Advanced search →
    </NuxtLink>
  </div>
</template>
