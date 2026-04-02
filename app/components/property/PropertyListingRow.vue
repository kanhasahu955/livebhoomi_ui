<script setup lang="ts">
import { GitCompare, Heart } from 'lucide-vue-next'
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
const src = computed(
  () =>
    props.listing.images[idx.value] ?? props.listing.images[0] ?? '',
)

const badgeClass: Record<ListingBadge, string> = {
  verified: 'bg-emerald-600/95 text-white',
  new_listing: 'bg-amber-500/95 text-slate-950',
  ready_to_move: 'bg-violet-600/95 text-white',
  rera: 'bg-slate-800/90 text-white',
}
</script>

<template>
  <article
    class="group lb-card-elevated flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card p-3 sm:flex-row sm:items-stretch sm:gap-5 sm:p-4"
  >
    <div class="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-nav-active/40 sm:aspect-auto sm:h-40 sm:w-56">
      <NuxtLink
        :to="`/properties/${listing.id}`"
        class="absolute inset-0 z-0"
        :aria-label="listing.title"
      />
      <img
        :src="src"
        :alt="listing.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        loading="lazy"
      >
      <div
        class="absolute left-2 top-2 z-10 flex flex-wrap gap-1"
        @click.stop
      >
        <span
          v-for="b in listing.badges.slice(0, 2)"
          :key="b"
          class="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase text-white shadow-sm"
          :class="badgeClass[b]"
        >{{ b === 'new_listing' ? 'New' : b === 'ready_to_move' ? 'Ready' : b }}</span>
      </div>
      <button
        v-if="showCompare"
        type="button"
        class="absolute bottom-2 left-2 z-10 flex size-8 items-center justify-center rounded-full border border-white/40 bg-slate-950/60 text-white backdrop-blur-sm"
        :class="compareSelected ? '!border-hero !bg-hero' : ''"
        aria-label="Compare"
        @click.stop="emit('toggleCompare')"
      >
        <GitCompare class="size-3.5" />
      </button>
    </div>

    <div class="flex min-w-0 flex-1 flex-col justify-between gap-3">
      <div>
        <NuxtLink :to="`/properties/${listing.id}`">
          <p class="text-xl font-extrabold text-heading tabular-nums">
            {{ listing.priceDisplay }}
          </p>
          <p class="mt-1 line-clamp-2 text-sm font-semibold text-heading/90">
            {{ listing.title }}
          </p>
        </NuxtLink>
        <p class="mt-1 text-xs text-muted">
          {{ listing.locality }}, {{ listing.cityLabel }} · {{ listing.postedLabel }}
        </p>
        <div class="mt-2 flex flex-wrap gap-2 text-xs text-muted">
          <span v-if="listing.bhkLabel" class="font-semibold text-heading">{{ listing.bhkLabel }}</span>
          <span>{{ listing.propertyTypeLabel }}</span>
          <span>{{ formatAreaSqft(listing.areaSqft) }}</span>
          <span v-if="listing.furnishing">{{ listing.furnishing }}</span>
          <span v-if="listing.facing">{{ listing.facing }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <NuxtLink
          :to="`/properties/${listing.id}`"
          class="lb-btn-primary !py-2 text-xs"
        >
          View details
        </NuxtLink>
        <button
          type="button"
          class="lb-btn-surface !py-2 text-xs"
          @click="toggle(listing.id)"
        >
          <Heart
            class="size-3.5"
            :class="isSaved(listing.id) ? 'fill-rose-500 text-rose-500' : ''"
          />
          {{ isSaved(listing.id) ? 'Saved' : 'Save' }}
        </button>
      </div>
    </div>
  </article>
</template>
