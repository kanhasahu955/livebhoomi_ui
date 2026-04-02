<script setup lang="ts">
import {
  ArrowDownWideNarrow,
  Download,
  GitCompare,
  LayoutGrid,
  List,
} from 'lucide-vue-next'
import type { PropertyListSort } from '~/types/propertyListing.types'

defineProps<{
  totalShown: number
  totalMatching?: number
  sort: PropertyListSort
  viewMode: 'grid' | 'list'
  compareCount: number
  compareHref: string
}>()

const emit = defineEmits<{
  'update:sort': [v: PropertyListSort]
  'update:view': [v: 'grid' | 'list']
  export: []
}>()

const sortOptions: { value: PropertyListSort; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest listed' },
  { value: 'price_asc', label: 'Price: low → high' },
  { value: 'price_desc', label: 'Price: high → low' },
  { value: 'area_asc', label: 'Area: small → large' },
  { value: 'area_desc', label: 'Area: large → small' },
]
</script>

<template>
  <div
    class="flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-border/80 bg-card/90 px-3 py-3 shadow-sm backdrop-blur-sm sm:px-4"
  >
    <div
      class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
    >
      <div class="flex flex-wrap items-center gap-3 text-sm text-heading">
        <div class="flex items-center gap-2">
          <LayoutGrid class="size-4 text-hero" />
          <span class="font-semibold tabular-nums">{{ totalShown }}</span>
          <span class="text-muted">shown</span>
        </div>
        <span
          v-if="totalMatching != null && totalMatching !== totalShown"
          class="text-xs text-muted"
        >
          of {{ totalMatching }} matches
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <div
          class="inline-flex rounded-full border border-border bg-nav-active/40 p-0.5 dark:bg-hero/10"
          role="group"
          aria-label="Layout"
        >
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
            :class="
              viewMode === 'grid'
                ? 'bg-card text-hero shadow-sm'
                : 'text-muted hover:text-heading'
            "
            @click="emit('update:view', 'grid')"
          >
            <LayoutGrid class="mx-auto size-4" />
          </button>
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
            :class="
              viewMode === 'list'
                ? 'bg-card text-hero shadow-sm'
                : 'text-muted hover:text-heading'
            "
            @click="emit('update:view', 'list')"
          >
            <List class="mx-auto size-4" />
          </button>
        </div>

        <NuxtLink
          :to="compareHref"
          class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-hero/30"
          :class="
            compareCount > 0 ? 'border-hero/30 bg-hero/5 text-hero' : 'text-muted'
          "
        >
          <GitCompare class="size-3.5" />
          Compare
          <span
            v-if="compareCount"
            class="rounded-full bg-hero px-1.5 py-0.5 text-[10px] font-bold text-white"
          >{{ compareCount }}</span>
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-heading transition hover:border-hero/30"
          @click="emit('export')"
        >
          <Download class="size-3.5" />
          CSV
        </button>
      </div>
    </div>

    <div class="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      <div class="flex w-full min-w-0 items-center gap-2 sm:w-auto">
        <ArrowDownWideNarrow class="size-4 text-muted max-sm:hidden" />
        <span class="text-xs font-medium text-muted max-sm:hidden">Sort</span>
        <el-select
          class="min-w-0 w-full sm:min-w-[220px] sm:w-auto"
          :model-value="sort"
          size="default"
          placeholder="Sort by"
          @update:model-value="emit('update:sort', $event as PropertyListSort)"
        >
          <el-option
            v-for="opt in sortOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>
