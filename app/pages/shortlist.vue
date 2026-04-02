<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { Heart, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { getMockPropertyDetail } from '~/data/mockPropertyListings'
import type { PropertyListSort } from '~/types/propertyListing.types'

const { branding } = useTheme()
const { ids, clearAll } = useListingShortlist()
const compare = useListingCompare()

const sort = ref<PropertyListSort>('relevance')
const viewMode = ref<'grid' | 'list'>('grid')

const ordered = computed(() =>
  ids.value.map((id) => getMockPropertyDetail(id)),
)

function applySort(
  list: typeof ordered.value,
  s: PropertyListSort,
): typeof ordered.value {
  const copy = [...list]
  if (s === 'price_asc') copy.sort((a, b) => a.priceAmount - b.priceAmount)
  else if (s === 'price_desc')
    copy.sort((a, b) => b.priceAmount - a.priceAmount)
  else if (s === 'area_asc') copy.sort((a, b) => a.areaSqft - b.areaSqft)
  else if (s === 'area_desc') copy.sort((a, b) => b.areaSqft - a.areaSqft)
  else if (s === 'newest')
    copy.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  return copy
}

const displayListings = computed(() =>
  applySort(ordered.value, sort.value),
)

function onToggleCompare(id: string) {
  if (!compare.isSelected(id) && !compare.canAdd.value) {
    ElMessage.warning(`You can compare up to ${compare.max} listings.`)
    return
  }
  compare.toggle(id)
}

async function confirmClearShortlist() {
  try {
    await ElMessageBox.confirm(
      'Remove every saved property from your shortlist? This only clears this device.',
      'Clear shortlist',
      {
        type: 'warning',
        confirmButtonText: 'Clear all',
        cancelButtonText: 'Cancel',
      },
    )
    clearAll()
    ElMessage.success('Shortlist cleared.')
  } catch {
    /* dismissed */
  }
}

function exportCsv() {
  if (!displayListings.value.length) {
    ElMessage.info('Your shortlist is empty.')
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
    ...displayListings.value.map((r) =>
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
  a.download = `livebhoomi-shortlist-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('Shortlist exported.')
}

useSeoMeta({
  title: () => `Shortlist — ${branding.productName}`,
  description:
    'Homes you saved on Live Bhoomi — compare, export, and continue browsing.',
})
</script>

<template>
  <div class="min-h-screen w-full min-w-0 overflow-x-clip bg-surface pb-20">
    <section
      class="border-b border-border/80 bg-gradient-to-b from-nav-active/40 via-card to-surface dark:from-hero/10 dark:via-card"
    >
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between"
        >
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-widest text-hero">
              Saved for you
            </p>
            <h1
              class="mt-1 flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight text-heading sm:gap-3 sm:text-3xl md:text-4xl"
            >
              <Heart
                class="size-9 shrink-0 text-hero"
                aria-hidden="true"
                fill="currentColor"
                fill-opacity="0.15"
              />
              Shortlist
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
              Properties you saved from search and listings. Order follows when you saved them;
              use sort to re-rank. Sync to your account when you connect an API.
            </p>
          </div>
          <div class="flex min-w-0 flex-wrap gap-2">
            <NuxtLink to="/properties" class="lb-btn-primary text-sm">
              Browse listings
            </NuxtLink>
            <NuxtLink
              to="/properties?saved=1"
              class="lb-btn-surface text-sm"
            >
              Open saved filter
            </NuxtLink>
            <button
              v-if="ids.length > 0"
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-muted hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
              @click="confirmClearShortlist"
            >
              <Trash2 class="size-4" />
              Clear all
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PropertyListingsToolbar
        v-if="ids.length > 0"
        class="mb-6"
        :total-shown="displayListings.length"
        :total-matching="displayListings.length"
        :sort="sort"
        :view-mode="viewMode"
        :compare-count="compare.count"
        :compare-href="compare.compareHref"
        @update:sort="sort = $event"
        @update:view="viewMode = $event"
        @export="exportCsv"
      />

      <div
        v-if="ids.length === 0"
        class="rounded-2xl border border-dashed border-border py-20 text-center"
      >
        <Heart
          class="mx-auto size-14 text-hero/40"
          aria-hidden="true"
        />
        <p class="mt-6 font-semibold text-heading">
          Nothing saved yet
        </p>
        <p class="mt-2 text-sm text-muted">
          Tap the heart on any listing to save it here. Your shortlist stays on this device until you sign in and sync.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <NuxtLink to="/properties" class="lb-btn-primary inline-flex">
            Explore properties
          </NuxtLink>
          <NuxtLink to="/search" class="lb-btn-surface inline-flex">
            Smart search
          </NuxtLink>
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
            v-for="item in displayListings"
            :key="item.id"
            :listing="item"
            show-compare
            :compare-selected="compare.isSelected(item.id)"
            @toggle-compare="onToggleCompare(item.id)"
          />
        </template>
        <template v-else>
          <PropertyListingRow
            v-for="item in displayListings"
            :key="item.id"
            :listing="item"
            show-compare
            :compare-selected="compare.isSelected(item.id)"
            @toggle-compare="onToggleCompare(item.id)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
