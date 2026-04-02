<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import HeroLineArtBackdrop from '~/components/home/HeroLineArtBackdrop.vue'
import { cityOptions, intentHeroBackgrounds } from '~/config/propertySearch.config'
import {
  filterBuilderProjects,
  getMockBuilderProjects,
} from '~/data/mockNewProjects'
import type { BuilderProjectStatus } from '~/types/newProject.types'

const { branding } = useTheme()
const route = useRoute()

useSeoMeta({
  title: `New projects & launches — ${branding.productName}`,
  description:
    'Explore RERA-registered builder projects across major cities — possession timelines, configurations, price bands, and enquiry-ready detail pages.',
})

const heroBgStyle = computed(() => ({
  background: intentHeroBackgrounds.buy,
}))

const city = ref('hyderabad')
const q = ref('')
const status = ref<'' | BuilderProjectStatus>('')

const statusOptions: { value: '' | BuilderProjectStatus; label: string }[] = [
  { value: '', label: 'All stages' },
  { value: 'launching', label: 'New launch' },
  { value: 'under_construction', label: 'Under construction' },
  { value: 'nearing_completion', label: 'Nearing completion' },
  { value: 'ready_to_move', label: 'Ready to move' },
]

function isProjectStatus(v: string): v is BuilderProjectStatus {
  return (
    v === 'launching' ||
    v === 'under_construction' ||
    v === 'nearing_completion' ||
    v === 'ready_to_move'
  )
}

onMounted(() => {
  const c = route.query.city
  if (typeof c === 'string' && cityOptions.some((o) => o.value === c)) {
    city.value = c
  }
  const qq = route.query.q
  if (typeof qq === 'string') q.value = qq
  const st = route.query.status
  if (typeof st === 'string' && isProjectStatus(st)) status.value = st
})

const allProjects = computed(() => getMockBuilderProjects())

const filtered = computed(() =>
  filterBuilderProjects(allProjects.value, {
    city: city.value,
    q: q.value,
    status: status.value,
  }),
)

const cityLabel = computed(() => {
  const o = cityOptions.find((c) => c.value === city.value)
  return o?.label ?? city.value
})

const pillars = [
  {
    title: 'RERA-forward',
    body: 'Every card carries a demo registration id — swap for live compliance from your CRM.',
  },
  {
    title: 'Possession clarity',
    body: 'Launch, construction, and handover states help seekers compare timelines at a glance.',
  },
  {
    title: 'Enquiry-ready',
    body: 'Detail pages are structured for site visits, bank lists, and broker co-ordination later.',
  },
] as const
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <section
      class="hero-surface relative isolate min-h-[min(92svh,48rem)] flex flex-col rounded-b-[1.75rem] text-white sm:rounded-b-[2.25rem]"
    >
      <div
        class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-white/12 to-transparent"
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
          class="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(255,255,255,0.22),transparent_52%)] opacity-[0.2]"
        />
        <HeroLineArtBackdrop intent="buy" class="absolute inset-0 z-[1]" />
      </div>

      <div
        class="relative z-10 flex flex-1 flex-col px-4 pb-12 pt-[calc(4.75rem+env(safe-area-inset-top))] sm:px-6 lg:px-8"
      >
        <div class="mx-auto w-full max-w-4xl text-center">
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-xs">
            New launches
          </p>
          <h1
            class="mt-2 text-[clamp(1.55rem,4.2vw,2.5rem)] font-bold leading-tight tracking-tight text-white text-balance"
          >
            Discover builder projects worth your site visit
          </h1>
          <p
            class="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base"
          >
            Curated demo inventory across {{ cityOptions.length }} cities — filter by stage, search by builder or locality,
            then open a project brief built for serious buyers.
          </p>
          <p class="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/65">
            <NuxtLink
              to="/properties?intent=buy"
              class="font-semibold text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              Browse resale listings
            </NuxtLink>
            <span class="text-white/35">·</span>
            <NuxtLink
              to="/post-property"
              class="font-semibold text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              List as a builder
            </NuxtLink>
          </p>
        </div>

        <div
          class="relative mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/25 bg-slate-950/45 p-4 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:rounded-3xl sm:p-5"
        >
          <div class="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div>
              <label class="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/50">
                City
              </label>
              <select
                v-model="city"
                class="min-h-11 w-full cursor-pointer rounded-xl border border-white/25 bg-white/12 px-3 py-2.5 text-sm font-semibold text-white focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option
                  v-for="o in cityOptions"
                  :key="o.value"
                  :value="o.value"
                  class="bg-slate-900 text-white"
                >
                  {{ o.label }}
                </option>
              </select>
            </div>
            <div>
              <label class="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/50">
                Stage
              </label>
              <select
                v-model="status"
                class="min-h-11 w-full cursor-pointer rounded-xl border border-white/25 bg-white/12 px-3 py-2.5 text-sm font-semibold text-white focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option
                  v-for="o in statusOptions"
                  :key="o.value || 'all'"
                  :value="o.value"
                  class="bg-slate-900 text-white"
                >
                  {{ o.label }}
                </option>
              </select>
            </div>
            <div class="sm:col-span-1 sm:pb-0">
              <p class="mb-1.5 hidden text-[11px] font-semibold uppercase tracking-wide text-white/50 sm:block">
                &nbsp;
              </p>
              <p class="text-center text-[11px] text-white/50 sm:text-left">
                {{ filtered.length }} in {{ cityLabel }}
              </p>
            </div>
          </div>
          <div class="relative mt-3">
            <Search
              class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/45"
              aria-hidden="true"
            />
            <input
              v-model="q"
              type="search"
              class="min-h-11 w-full rounded-xl border border-white/25 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-heading placeholder:text-muted focus:border-hero/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              placeholder="Project, builder, RERA id…"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-border bg-card py-10 sm:py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            Why projects here
          </p>
          <h2 class="mt-2 text-2xl font-bold text-heading sm:text-3xl">
            Built for discovery, ready for your API
          </h2>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div
            v-for="(p, i) in pillars"
            :key="p.title"
            v-motion
            class="rounded-2xl border border-border/70 bg-surface p-6"
            :initial="{ opacity: 0, y: 16 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 280, damping: 28, delay: i * 45 },
            }"
          >
            <h3 class="text-lg font-bold text-heading">
              {{ p.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ p.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-surface py-10 sm:py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-xl font-extrabold text-heading sm:text-2xl">
          Projects in {{ cityLabel }}
        </h2>
        <p class="mt-1 text-sm text-muted">
          {{ filtered.length }} match{{ filtered.length === 1 ? '' : 'es' }} — connect this grid to your project CMS when ready.
        </p>

        <div
          v-if="!filtered.length"
          class="mt-10 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center"
        >
          <p class="text-sm font-medium text-heading">
            No projects match these filters
          </p>
          <p class="mt-2 text-sm text-muted">
            Try another city, clear the search box, or set stage to “All stages”.
          </p>
          <button
            type="button"
            class="lb-btn-surface mt-6"
            @click="q = ''; status = ''"
          >
            Reset filters
          </button>
        </div>

        <div
          v-else
          class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NewProjectCard
            v-for="proj in filtered"
            :key="proj.id"
            :project="proj"
          />
        </div>
      </div>
    </section>
  </div>
</template>
