<script setup lang="ts">
import { ArrowLeft, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { getMockPropertyDetail } from '~/data/mockPropertyListings'
import { formatAreaSqft } from '~/utils/inrFormat'

const route = useRoute()
const { branding } = useTheme()
const compare = useListingCompare()

const ids = computed(() => {
  const raw = route.query.ids
  const s = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : ''
  if (!s) return compare.ids.value.slice(0, compare.max)
  return s
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, compare.max)
})

const rows = computed(() => ids.value.map((id) => getMockPropertyDetail(id)))

useSeoMeta({
  title: () => `Compare properties — ${branding.productName}`,
  description: 'Side-by-side comparison of shortlisted homes on LiveBhoomi.',
})

function remove(id: string) {
  compare.remove(id)
}
</script>

<template>
  <div class="min-h-screen w-full min-w-0 overflow-x-clip bg-surface pb-20">
    <div class="border-b border-border bg-card/90 backdrop-blur-sm">
      <div
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
      >
        <NuxtLink
          to="/properties"
          class="inline-flex items-center gap-2 text-sm font-semibold text-hero hover:underline"
        >
          <ArrowLeft class="size-4" />
          Back to listings
        </NuxtLink>
        <button
          v-if="compare.count > 0"
          type="button"
          class="text-xs font-semibold text-muted hover:text-heading"
          @click="compare.clear()"
        >
          Clear compare tray
        </button>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-extrabold text-heading sm:text-3xl">
        Compare listings
      </h1>
      <p class="mt-2 max-w-2xl text-sm text-muted">
        Demo comparison using mock data. Connect columns to your API fields and persist the tray server-side when users are logged in.
      </p>

      <div
        v-if="rows.length === 0"
        class="mt-10 rounded-2xl border border-dashed border-border py-16 text-center"
      >
        <p class="font-semibold text-heading">
          No listings selected
        </p>
        <p class="mt-2 text-sm text-muted">
          Add up to {{ compare.max }} homes from the grid using the compare icon, then open this page again.
        </p>
        <NuxtLink
          to="/properties"
          class="lb-btn-primary mt-6 inline-flex"
        >
          Browse listings
        </NuxtLink>
      </div>

      <div
        v-else
        class="mt-8 -mx-4 overflow-x-auto overscroll-x-contain px-4 sm:mx-0 sm:px-0"
      >
        <div class="rounded-2xl border border-border/80 bg-card shadow-sm">
        <table class="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr class="border-b border-border bg-nav-active/40 dark:bg-hero/10">
              <th class="sticky left-0 z-[1] min-w-[140px] bg-inherit px-4 py-3 font-bold text-heading">
                Attribute
              </th>
              <th
                v-for="r in rows"
                :key="r.id"
                class="min-w-[200px] border-l border-border px-4 py-3 align-top"
              >
                <div class="flex items-start justify-between gap-2">
                  <NuxtLink
                    :to="`/properties/${r.id}`"
                    class="font-bold text-hero hover:underline"
                  >
                    {{ r.priceDisplay }}
                  </NuxtLink>
                  <button
                    type="button"
                    class="rounded-full p-1 text-muted hover:bg-nav-active hover:text-heading"
                    aria-label="Remove from compare"
                    @click="remove(r.id)"
                  >
                    <X class="size-4" />
                  </button>
                </div>
                <p class="mt-2 line-clamp-3 text-xs font-medium text-heading/90">
                  {{ r.title }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="text-body">
            <tr class="border-b border-border/80">
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                Locality
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-loc`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ r.locality }}, {{ r.cityLabel }}
              </td>
            </tr>
            <tr class="border-b border-border/80">
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                BHK / type
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-bhk`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ r.bhkLabel ?? '—' }} · {{ r.propertyTypeLabel }}
              </td>
            </tr>
            <tr class="border-b border-border/80">
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                Area
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-area`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ formatAreaSqft(r.areaSqft) }}
              </td>
            </tr>
            <tr class="border-b border-border/80">
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                Furnishing
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-fur`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ r.furnishing ?? '—' }}
              </td>
            </tr>
            <tr class="border-b border-border/80">
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                Facing / floor
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-face`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ r.facing ?? '—' }} · {{ r.floorLabel ?? '—' }}
              </td>
            </tr>
            <tr>
              <td class="sticky left-0 bg-card px-4 py-2.5 text-xs font-semibold text-muted">
                Listed
              </td>
              <td
                v-for="r in rows"
                :key="`${r.id}-post`"
                class="border-l border-border/80 px-4 py-2.5"
              >
                {{ r.postedLabel }}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </div>
</template>
