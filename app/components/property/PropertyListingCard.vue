<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  GitCompare,
  Heart,
  ImageIcon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { ListingBadge, PropertyListingSummary } from '~/types/propertyListing.types'
import { formatAreaSqft } from '~/utils/inrFormat'

const props = withDefaults(
  defineProps<{
    listing: PropertyListingSummary
    showCompare?: boolean
    compareSelected?: boolean
  }>(),
  { showCompare: false, compareSelected: false },
)

const emit = defineEmits<{
  toggleCompare: []
}>()

const { isSaved, toggle } = useListingShortlist()

const idx = ref(0)
const imgCount = computed(() => props.listing.images.length)

function prev(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  idx.value = (idx.value - 1 + imgCount.value) % imgCount.value
}
function next(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  idx.value = (idx.value + 1) % imgCount.value
}

function onHeart(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  toggle(props.listing.id)
}

const badgeClass: Record<ListingBadge, string> = {
  verified: 'bg-emerald-600/95 text-white',
  new_listing: 'bg-amber-500/95 text-slate-950',
  ready_to_move: 'bg-violet-600/95 text-white',
  rera: 'bg-slate-800/90 text-white',
}

const badgeLabel: Record<ListingBadge, string> = {
  verified: 'Verified',
  new_listing: 'New',
  ready_to_move: 'Ready',
  rera: 'RERA',
}

const currentSrc = computed(
  () =>
    props.listing.images[idx.value] ?? props.listing.images[0] ?? '',
)
</script>

<template>
  <article
    class="group lb-card-elevated flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-nav-active/40">
      <NuxtLink
        :to="`/properties/${listing.id}`"
        class="absolute inset-0 z-0"
        :aria-label="listing.title"
      />

      <img
        :src="currentSrc"
        :alt="listing.title"
        class="pointer-events-none h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      >

      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20"
      />

      <div
        class="absolute left-2 top-2 z-10 flex flex-wrap gap-1.5"
        @click.stop
      >
        <span
          v-for="b in listing.badges"
          :key="b"
          class="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm backdrop-blur-sm"
          :class="badgeClass[b]"
        >
          {{ badgeLabel[b] }}
        </span>
      </div>

      <button
        type="button"
        class="absolute right-2 top-2 z-10 flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/95 text-rose-500 shadow-md transition hover:scale-105 hover:bg-white dark:bg-slate-900/90 dark:text-rose-400"
        :aria-pressed="isSaved(listing.id)"
        aria-label="Save to shortlist"
        @click="onHeart"
      >
        <Heart
          class="size-5"
          :class="isSaved(listing.id) ? 'fill-current' : ''"
          :stroke-width="2.25"
        />
      </button>

      <template v-if="imgCount > 1">
        <button
          type="button"
          class="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/55 text-white opacity-0 shadow-md backdrop-blur-sm transition hover:bg-slate-950/75 group-hover:opacity-100"
          aria-label="Previous photo"
          @click="prev"
        >
          <ChevronLeft class="size-5" :stroke-width="2" />
        </button>
        <button
          type="button"
          class="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/55 text-white opacity-0 shadow-md backdrop-blur-sm transition hover:bg-slate-950/75 group-hover:opacity-100"
          aria-label="Next photo"
          @click="next"
        >
          <ChevronRight class="size-5" :stroke-width="2" />
        </button>
        <div
          class="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-slate-950/45 px-2 py-1 backdrop-blur-sm"
          @click.stop
        >
          <span
            v-for="i in imgCount"
            :key="i"
            class="block h-1 rounded-full transition-all duration-300"
            :class="
              i - 1 === idx
                ? 'w-4 bg-white'
                : 'w-1 bg-white/45 hover:bg-white/70'
            "
          />
        </div>
      </template>

      <div
        v-else
        class="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-md bg-slate-950/50 px-1.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm"
      >
        <ImageIcon class="size-3 opacity-80" />
        1 photo
      </div>

      <button
        v-if="showCompare"
        type="button"
        class="absolute bottom-2 left-2 z-20 flex size-9 items-center justify-center rounded-full border shadow-md backdrop-blur-sm transition hover:scale-105"
        :class="
          compareSelected
            ? 'border-hero bg-hero text-white'
            : 'border-white/40 bg-slate-950/55 text-white hover:bg-slate-950/75'
        "
        :aria-pressed="compareSelected"
        aria-label="Add to compare"
        @click.stop="emit('toggleCompare')"
      >
        <GitCompare class="size-4" :stroke-width="2.25" />
      </button>
    </div>

    <div class="relative z-[1] flex flex-1 flex-col p-4 pt-3">
      <div class="flex items-start justify-between gap-2">
        <NuxtLink
          :to="`/properties/${listing.id}`"
          class="min-w-0 flex-1"
        >
          <p class="text-lg font-bold leading-snug text-heading transition group-hover:text-hero">
            {{ listing.priceDisplay }}
          </p>
          <p class="mt-1 line-clamp-2 text-sm font-medium text-heading/90">
            {{ listing.title }}
          </p>
        </NuxtLink>
      </div>

      <p class="mt-2 text-xs text-muted">
        {{ listing.locality }}, {{ listing.cityLabel }}
      </p>

      <div
        class="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-border/60 pt-3 text-xs text-muted"
      >
        <span v-if="listing.bhkLabel" class="font-semibold text-heading/80">
          {{ listing.bhkLabel }}
        </span>
        <span>{{ listing.propertyTypeLabel }}</span>
        <span>{{ formatAreaSqft(listing.areaSqft) }}</span>
        <span v-if="listing.furnishing">{{ listing.furnishing }}</span>
      </div>

      <div class="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted">
        <span>{{ listing.postedLabel }}</span>
        <NuxtLink
          :to="`/properties/${listing.id}`"
          class="font-semibold text-hero hover:underline"
          @click.stop
        >
          View details
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
