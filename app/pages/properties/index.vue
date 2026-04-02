<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Filter, SlidersHorizontal } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import {
  flattenRouteQuery,
  mergeFacetsIntoQuery,
  parseListingPageQuery,
  parseListingViewMode,
  type ListingFacetQuery,
} from '~/config/listingPageFilters.config'
import { cityOptions, intentTabs } from '~/config/propertySearch.config'
import type { PropertyListSort } from '~/types/propertyListing.types'

const route = useRoute()
const router = useRouter()
const { branding } = useTheme()
const { ids: shortlistIds } = useListingShortlist()
const compare = useListingCompare()

const filterDrawerOpen = ref(false)

const parsed = computed(() =>
  parseListingPageQuery(route.query as Record<string, unknown>, {
    defaultIntent: 'buy',
  }),
)

const filters = computed(() => ({
  ...parsed.value,
  savedIds: shortlistIds.value,
}))

const {
  items,
  hasMore,
  loading,
  initialLoading,
  error,
  totalLoaded,
  totalMatching,
  resetAndLoad,
  loadMore,
} = usePropertyListingsInfinite(() => filters.value)

watch(
  () => ({ q: route.query, saved: shortlistIds.value }),
  () => {
    void resetAndLoad()
  },
  { deep: true, immediate: true },
)

const sentinel = ref<HTMLElement | null>(null)

useIntersectionObserver(
  sentinel,
  ([{ isIntersecting }]) => {
    if (isIntersecting) void loadMore()
  },
  { rootMargin: '480px' },
)

const intentLabel = computed(() => {
  const t = intentTabs.find((x) => x.id === parsed.value.intent)
  return t?.label ?? 'Buy'
})

const filterSummary = computed(() => {
  const p = parsed.value
  const cityL =
    cityOptions.find((c) => c.value === p.city)?.label ?? p.city
  const bits: string[] = [intentLabel.value, cityL]
  if (p.locality.trim()) bits.push(p.locality.trim())
  if (p.bhk) bits.push(`${p.bhk} BHK`)
  if (p.propertyType) bits.push(p.propertyType.replace(/-/g, ' '))
  if (p.furnishing) bits.push(p.furnishing.replace(/-/g, ' '))
  if (p.postedWithinDays) bits.push(`≤${p.postedWithinDays}d`)
  if (p.verifiedOnly) bits.push('Verified')
  if (p.reraOnly) bits.push('RERA')
  if (p.readyToMoveOnly) bits.push('Ready')
  if (p.savedOnly) bits.push('Saved')
  if (p.facing) bits.push(`${p.facing} facing`)
  if (p.minSqft) bits.push(`≥${p.minSqft} sq.ft`)
  if (p.maxSqft) bits.push(`≤${p.maxSqft} sq.ft`)
  return bits.filter(Boolean)
})

const sort = computed(() => parsed.value.sort)
const viewMode = computed(() =>
  parseListingViewMode(route.query as Record<string, unknown>),
)

function listingFacetState(): ListingFacetQuery {
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

function pushFacets(p: Partial<ListingFacetQuery>) {
  const flat = flattenRouteQuery(route.query as Record<string, unknown>)
  void router.replace({
    path: route.path,
    query: mergeFacetsIntoQuery(flat, { ...listingFacetState(), ...p }),
  })
}

function setSort(s: PropertyListSort) {
  pushFacets({ sort: s })
}

function setView(v: 'grid' | 'list') {
  pushFacets({ view: v })
}

function onToggleCompare(id: string) {
  if (!compare.isSelected(id) && !compare.canAdd.value) {
    ElMessage.warning(`You can compare up to ${compare.max} listings.`)
    return
  }
  compare.toggle(id)
}

function exportCsv() {
  if (!items.value.length) {
    ElMessage.info('Load listings first.')
    return
  }
  const headers = [
    'id',
    'title',
    'priceDisplay',
    'areaSqft',
    'locality',
    'city',
    'bhk',
    'type',
    'furnishing',
    'posted',
  ]
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`
  const lines = [
    headers.join(','),
    ...items.value.map((r) =>
      [
        r.id,
        r.title,
        r.priceDisplay,
        String(r.areaSqft),
        r.locality,
        r.cityLabel,
        r.bhkLabel ?? '',
        r.propertyTypeLabel,
        r.furnishing ?? '',
        r.postedLabel,
      ]
        .map((x) => esc(String(x)))
        .join(','),
    ),
  ]
  const blob = new Blob([lines.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `livebhoomi-listings-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('CSV downloaded (current page results).')
}

useSeoMeta({
  title: () => `Property listings ${branding.productName}`,
  description:
    'Browse verified homes — filters, sort, grid or list, compare tray, export, and infinite scroll.',
})

function dismissError() {
  error.value = null
}
</script>

<template>
  <div class="min-h-screen w-full min-w-0 overflow-x-clip bg-surface pb-20">
    <section
      class="border-b border-border/80 bg-gradient-to-b from-nav-active/40 via-card to-surface dark:from-hero/10 dark:via-card"
    >
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-widest text-hero">
              Listings
            </p>
            <h1 class="mt-1 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
              Find your next space
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Powerful filters, URL-shareable state, grid or list view, shortlist filter, compare up to
              {{ compare.max }} homes, and CSV export — swap the mock loader for your search API.
            </p>
          </div>
          <div class="flex min-w-0 flex-wrap gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-heading shadow-sm lg:hidden"
              @click="filterDrawerOpen = true"
            >
              <Filter class="size-4 text-hero" />
              All filters
            </button>
            <NuxtLink
              to="/search"
              class="lb-btn-surface inline-flex items-center gap-2"
            >
              <SlidersHorizontal class="size-4 text-hero" />
              Refine search
            </NuxtLink>
            <NuxtLink to="/map" class="lb-btn-primary text-sm">
              Map explore
            </NuxtLink>
          </div>
        </div>

        <div
          v-if="filterSummary.length"
          class="mt-6 flex flex-wrap gap-2"
        >
          <span
            v-for="bit in filterSummary"
            :key="bit"
            class="rounded-full border border-hero/20 bg-card px-3 py-1 text-xs font-semibold text-heading shadow-sm"
          >
            {{ bit }}
          </span>
        </div>
      </div>
    </section>

    <div
      class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(260px,300px)_1fr] lg:gap-10 lg:items-start"
    >
      <aside
        class="sticky top-24 z-[2] mb-8 hidden lg:block"
      >
        <div class="lb-card-elevated rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
          <PropertyListingsFilterPanel />
        </div>
      </aside>

      <div class="min-w-0">
        <PropertyListingsToolbar
          class="mb-6"
          :total-shown="totalLoaded"
          :total-matching="totalMatching"
          :sort="sort"
          :view-mode="viewMode"
          :compare-count="compare.count"
          :compare-href="compare.compareHref"
          @update:sort="setSort"
          @update:view="setView"
          @export="exportCsv"
        />

        <el-alert
          v-if="error"
          :title="error"
          type="error"
          show-icon
          class="mb-6"
          closable
          @close="dismissError"
        />

        <div
          v-if="initialLoading"
          :class="
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
              : 'flex flex-col gap-4'
          "
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
                  <el-skeleton-item variant="text" class="!w-4/5" />
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>

        <div
          v-else
          :class="
            viewMode === 'grid'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
              : 'flex flex-col gap-4'
          "
        >
          <template v-if="viewMode === 'grid'">
            <PropertyListingCard
              v-for="item in items"
              :key="item.id"
              :listing="item"
              show-compare
              :compare-selected="compare.isSelected(item.id)"
              @toggle-compare="onToggleCompare(item.id)"
            />
          </template>
          <template v-else>
            <PropertyListingRow
              v-for="item in items"
              :key="item.id"
              :listing="item"
              show-compare
              :compare-selected="compare.isSelected(item.id)"
              @toggle-compare="onToggleCompare(item.id)"
            />
          </template>
        </div>

        <div
          v-if="!initialLoading && items.length === 0"
          class="rounded-2xl border border-dashed border-border py-16 text-center"
        >
          <p class="text-heading font-semibold">
            No listings match these filters
          </p>
          <p class="mt-2 text-sm text-muted">
            Relax facets or open advanced search — try turning off “saved only” if your shortlist is empty.
          </p>
          <NuxtLink
            to="/search"
            class="lb-btn-primary mt-6 inline-flex"
          >
            Adjust search
          </NuxtLink>
        </div>

        <div
          ref="sentinel"
          class="h-4 w-full"
          aria-hidden="true"
        />

        <div
          v-if="loading && !initialLoading"
          class="flex justify-center py-10"
        >
          <div class="flex items-center gap-3 text-sm text-muted">
            <span
              class="size-5 animate-spin rounded-full border-2 border-hero border-t-transparent"
            />
            Loading more homes…
          </div>
        </div>

        <p
          v-if="!hasMore && items.length > 0 && !loading"
          class="py-10 text-center text-sm text-muted"
        >
          End of results for this filter set — connect your API for deeper inventory.
        </p>
      </div>
    </div>

    <el-drawer
      v-model="filterDrawerOpen"
      title="Filters"
      direction="btt"
      size="85%"
      class="lg:hidden"
    >
      <div class="pb-8">
        <PropertyListingsFilterPanel />
      </div>
    </el-drawer>
  </div>
</template>
