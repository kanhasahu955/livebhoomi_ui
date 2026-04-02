<script setup lang="ts">
import { Building2, ChevronLeft, ChevronRight, MapPin } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { BuilderProject } from '~/types/newProject.types'

const props = defineProps<{
  project: BuilderProject
}>()

const idx = ref(0)
const imgCount = computed(() => props.project.images.length)

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

const currentSrc = computed(
  () =>
    props.project.images[idx.value] ?? props.project.images[0] ?? '',
)

const statusClass: Record<string, string> = {
  launching: 'bg-amber-500/95 text-slate-950',
  under_construction: 'bg-sky-600/95 text-white',
  nearing_completion: 'bg-violet-600/95 text-white',
  ready_to_move: 'bg-emerald-600/95 text-white',
}
</script>

<template>
  <article
    class="group lb-card-elevated flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition hover:border-hero/20 hover:shadow-lg"
  >
    <div class="relative aspect-[16/10] overflow-hidden bg-nav-active/40">
      <NuxtLink
        :to="`/projects/${project.id}`"
        class="absolute inset-0 z-0"
        :aria-label="project.name"
      />

      <img
        :src="currentSrc"
        :alt="project.name"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />

      <div
        class="absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-slate-950/55 to-transparent p-3"
      >
        <span
          class="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ring-1 ring-white/25 backdrop-blur-sm"
          :class="statusClass[project.status] ?? 'bg-slate-800/90'"
        >
          {{ project.statusLabel }}
        </span>
        <span
          class="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200/80"
        >
          {{ project.reraId }}
        </span>
      </div>

      <div
        v-if="imgCount > 1"
        class="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 opacity-0 transition group-hover:opacity-100"
      >
        <button
          type="button"
          class="rounded-full bg-slate-950/55 p-2 text-white backdrop-blur-sm transition hover:bg-slate-950/75"
          aria-label="Previous image"
          @click="prev"
        >
          <ChevronLeft class="size-4" />
        </button>
        <button
          type="button"
          class="rounded-full bg-slate-950/55 p-2 text-white backdrop-blur-sm transition hover:bg-slate-950/75"
          aria-label="Next image"
          @click="next"
        >
          <ChevronRight class="size-4" />
        </button>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <NuxtLink
            :to="`/projects/${project.id}`"
            class="line-clamp-2 text-base font-bold text-heading transition hover:text-hero sm:text-lg"
          >
            {{ project.name }}
          </NuxtLink>
          <p class="mt-1 flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Building2 class="size-3.5 shrink-0 text-hero" />
            {{ project.builder }}
          </p>
        </div>
      </div>

      <p class="mt-2 flex items-start gap-1.5 text-sm text-body">
        <MapPin class="mt-0.5 size-4 shrink-0 text-hero" />
        <span>{{ project.locality }}, {{ project.cityLabel }}</span>
      </p>

      <p class="mt-3 text-lg font-black text-heading">
        {{ project.priceFromDisplay }}
        <span class="text-sm font-semibold text-muted"> – </span>
        <span class="text-base font-bold text-heading">{{ project.priceUptoDisplay }}</span>
      </p>
      <p class="mt-0.5 text-xs text-muted">
        {{ project.configurationsLabel }} · {{ project.areaLabel }}
      </p>

      <p class="mt-2 text-xs font-semibold text-hero">
        Possession: {{ project.possessionLabel }}
      </p>

      <div class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="(hi, i) in project.highlights.slice(0, 3)"
          :key="i"
          class="rounded-full border border-border/70 bg-nav-active/40 px-2.5 py-0.5 text-[10px] font-semibold text-heading"
        >
          {{ hi }}
        </span>
      </div>

      <div class="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4">
        <NuxtLink
          :to="`/projects/${project.id}`"
          class="lb-btn-primary flex-1 justify-center py-2.5 text-center text-xs font-bold sm:text-sm"
        >
          View project
        </NuxtLink>
        <NuxtLink
          :to="`/contact?ref=${encodeURIComponent(project.id)}`"
          class="lb-btn-surface flex-1 justify-center py-2.5 text-center text-xs font-semibold sm:text-sm"
        >
          Enquire
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
