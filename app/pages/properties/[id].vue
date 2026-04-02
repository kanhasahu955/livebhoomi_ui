<script setup lang="ts">
import {
  Building2,
  CalendarClock,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Flag,
  GraduationCap,
  Heart,
  Home,
  Layers2,
  MapPin,
  Maximize2,
  MessageCircle,
  MessagesSquare,
  Share2,
  ShieldCheck,
  Sofa,
  Sparkles,
  Stethoscope,
  Train,
  TrendingUp,
  Users,
} from 'lucide-vue-next'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { intentTabs } from '~/config/propertySearch.config'
import {
  getMockPropertyDetail,
  getSimilarMockListings,
  normalizeListingIdParam,
} from '~/data/mockPropertyListings'
import type { ListingBadge } from '~/types/propertyListing.types'
import { formatAreaSqft } from '~/utils/inrFormat'

const route = useRoute()
const { branding } = useTheme()
const { isSaved, toggle } = useListingShortlist()

const id = computed(() => normalizeListingIdParam(route.params.id))
const detail = computed(() => getMockPropertyDetail(id.value))
const similar = computed(() => getSimilarMockListings(detail.value, 8))

const vibe = computed(() => {
  let h = 0
  for (let i = 0; i < id.value.length; i++) {
    h = (Math.imul(31, h) + id.value.charCodeAt(i)) | 0
  }
  return Math.abs(h)
})

const intentLabel = computed(
  () => intentTabs.find((t) => t.id === detail.value.intent)?.label ?? 'Listing',
)

const spotlightLines = computed(() => {
  const raw = detail.value.description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 14)
  if (raw.length >= 3) return raw.slice(0, 3)
  const fallback = [
    'Sunlit rooms with practical storage and a layout that feels easy to live in.',
    'Strong connectivity to workplaces, schools, and healthcare within a short drive.',
    'A confident next step — book a visit and validate documents on-site.',
  ]
  return [...raw, ...fallback].slice(0, 3)
})

const connectivity = computed(() => {
  const v = vibe.value
  return [
    {
      icon: Train,
      label: 'Metro / rail',
      text: `~${8 + (v % 18)} min drive to nearest station`,
    },
    {
      icon: GraduationCap,
      label: 'Schools',
      text: `~${3 + (v % 12)} km to established campuses`,
    },
    {
      icon: Stethoscope,
      label: 'Healthcare',
      text: `Hospitals & clinics within ~${10 + (v % 20)} min`,
    },
  ] as const
})

const trustStats = computed(() => {
  const v = vibe.value
  return [
    {
      icon: Clock,
      label: 'Typical reply',
      value: `${1 + (v % 4)}–${3 + (v % 5)} hrs`,
    },
    {
      icon: Users,
      label: 'Tour asks (demo)',
      value: `${12 + (v % 48)}`,
    },
    {
      icon: TrendingUp,
      label: 'Saved in area',
      value: `${80 + (v % 160)}`,
    },
  ] as const
})

/** Main column only — sticky aside (chat) stays in view and breaks spy. */
const SCROLL_SPY_IDS = [
  'property-overview',
  'property-spotlight',
  'property-connectivity',
  'property-toolkit',
  'property-trust',
  'property-amenities',
  'property-comments',
] as const

const activeNavId = ref<string>('property-overview')

let sectionObserver: IntersectionObserver | null = null

function isScrollSpyActive(sectionId: string) {
  return (
    activeNavId.value === sectionId &&
    (SCROLL_SPY_IDS as readonly string[]).includes(sectionId)
  )
}

onMounted(() => {
  void nextTick(() => {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const sid = hit?.target?.id
        if (sid && (SCROLL_SPY_IDS as readonly string[]).includes(sid)) {
          activeNavId.value = sid
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.12, 0.28] },
    )
    for (const sid of SCROLL_SPY_IDS) {
      const el = document.getElementById(sid)
      if (el) sectionObserver.observe(el)
    }
  })
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  sectionObserver = null
})

const badgeClass: Record<ListingBadge, string> = {
  verified: 'bg-emerald-500/15 text-emerald-800 ring-emerald-500/25 dark:text-emerald-200',
  new_listing: 'bg-amber-500/15 text-amber-900 ring-amber-500/25 dark:text-amber-200',
  ready_to_move: 'bg-violet-500/15 text-violet-800 ring-violet-500/25 dark:text-violet-200',
  rera: 'bg-slate-500/15 text-slate-800 ring-slate-400/30 dark:text-slate-200',
}

const badgeShort: Record<ListingBadge, string> = {
  verified: 'Verified',
  new_listing: 'New',
  ready_to_move: 'Ready',
  rera: 'RERA',
}

useSeoMeta({
  title: () => `${detail.value.title} — ${branding.productName}`,
  description: () => detail.value.description.slice(0, 155),
})

function scrollToId(elId: string) {
  document.getElementById(elId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function shareListing() {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'
  ) {
    void navigator.share({
      title: detail.value.title,
      text: detail.value.priceDisplay,
      url,
    })
  } else if (url && typeof navigator !== 'undefined' && navigator.clipboard) {
    void navigator.clipboard.writeText(url)
    ElMessage.success('Link copied')
  }
}

function reportListing() {
  ElMessage.info('Report flow — wire to POST /listings/:id/report')
}

function openVirtualTour() {
  ElMessage.info(
    'Wire Matterport / YouTube — add virtualTourUrl on the listing API.',
  )
}

function openFloorPlan() {
  ElMessage.info(
    'Serve floor-plan PDF or image from CDN after owner upload.',
  )
}

function scheduleVisit() {
  scrollToId('property-cta')
  ElMessage.success('Pick a slot below or message the owner in chat.')
}

function requestDocPack() {
  ElMessage.info('Connect document vault API')
}
</script>

<template>
  <div class="relative min-h-screen w-full min-w-0 overflow-x-clip bg-surface pb-24 lg:pb-20">
    <!-- Ambient -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[min(72vh,640px)] bg-[radial-gradient(ellipse_85%_55%_at_50%_-8%,color-mix(in_srgb,var(--lb-primary)_20%,transparent),transparent_58%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,color-mix(in_srgb,var(--lb-primary)_32%,transparent),transparent_52%)]"
      aria-hidden="true"
    />

    <!-- Top bar -->
    <header
      class="sticky top-0 z-50 border-b border-border/60 bg-card/75 backdrop-blur-xl backdrop-saturate-150"
    >
      <div
        class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
      >
        <NuxtLink
          to="/properties"
          class="group inline-flex items-center gap-1 text-sm font-semibold text-hero"
        >
          <span class="transition group-hover:-translate-x-0.5">←</span>
          Listings
        </NuxtLink>
        <div class="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            class="rounded-full border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-heading shadow-sm transition hover:border-hero/25 hover:bg-nav-active/50 sm:text-sm"
            @click="scrollToId('property-listing-chat')"
          >
            <MessagesSquare class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4" />
            Chat
          </button>
          <button
            type="button"
            class="rounded-full border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-heading shadow-sm transition hover:border-hero/25 hover:bg-nav-active/50 sm:text-sm"
            @click="scrollToId('property-comments')"
          >
            <MessageCircle class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4" />
            Comment
          </button>
          <button
            type="button"
            class="rounded-full border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-heading shadow-sm transition hover:border-hero/25 hover:bg-nav-active/50 sm:text-sm"
            @click="shareListing"
          >
            <Share2 class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4" />
            Share
          </button>
          <button
            type="button"
            class="rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm"
            :class="
              isSaved(detail.id)
                ? 'border-rose-300/80 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300'
                : 'border-border/80 bg-card text-heading hover:border-hero/25 hover:bg-nav-active/50'
            "
            @click="toggle(detail.id)"
          >
            <Heart
              class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4"
              :class="isSaved(detail.id) ? 'fill-current' : ''"
            />
            {{ isSaved(detail.id) ? 'Saved' : 'Save' }}
          </button>
        </div>
      </div>

      <!-- Section nav -->
      <nav
        class="border-t border-border/40 bg-card/50 px-4 py-2 sm:px-6 lg:px-8"
        aria-label="On this page"
      >
        <div
          class="mx-auto flex max-w-7xl gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            v-for="item in [
              { id: 'property-overview', label: 'Overview' },
              { id: 'property-spotlight', label: 'Highlights' },
              { id: 'property-connectivity', label: 'Area' },
              { id: 'property-toolkit', label: 'Plan & EMI' },
              { id: 'property-trust', label: 'Activity' },
              { id: 'property-amenities', label: 'Amenities' },
              { id: 'property-listing-chat', label: 'Chat' },
              { id: 'property-comments', label: 'Comments' },
            ]"
            :key="item.id"
            type="button"
            class="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition"
            :class="
              isScrollSpyActive(item.id)
                ? 'bg-hero/12 text-hero ring-1 ring-hero/20'
                : 'text-muted hover:bg-nav-active/70 hover:text-heading'
            "
            @click="scrollToId(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
      </nav>
    </header>

    <div class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <!-- Breadcrumb + intent -->
      <div
        v-motion
        class="mb-6 flex flex-wrap items-center gap-2 text-sm"
        :initial="{ opacity: 0, y: 8 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 380, damping: 32 },
        }"
      >
        <NuxtLink
          to="/properties"
          class="font-medium text-muted transition hover:text-hero"
        >
          Properties
        </NuxtLink>
        <ChevronRight class="size-3.5 text-border" />
        <span class="font-medium text-heading">{{ detail.locality }}</span>
        <ChevronRight class="size-3.5 text-border" />
        <span class="text-muted">Ref {{ detail.id }}</span>
        <span
          class="ml-1 rounded-full bg-hero/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-hero"
        >
          {{ intentLabel }}
        </span>
      </div>

      <div class="grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div class="min-w-0 space-y-10 lg:col-span-2">
          <div id="property-overview" class="scroll-mt-36 space-y-8 lg:scroll-mt-40">
            <PropertyDetailGallery
              :images="detail.images"
              :title="detail.title"
            />

            <section
              v-motion
              class="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-nav-active/30 p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] dark:to-hero/10 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] sm:p-8"
              :initial="{ opacity: 0, y: 20 }"
              :enter="{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 260, damping: 28, delay: 60 },
              }"
            >
              <div
                class="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full bg-hero/10 blur-3xl dark:bg-hero/20"
                aria-hidden="true"
              />
              <div class="relative flex flex-wrap items-start justify-between gap-4">
                <div class="min-w-0 flex-1">
                  <p
                    class="lb-detail-price bg-gradient-to-r from-hero via-indigo-600 to-hero bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl md:text-5xl"
                  >
                    {{ detail.priceDisplay }}
                  </p>
                  <h1
                    class="mt-3 text-xl font-bold leading-snug text-heading sm:text-2xl"
                  >
                    {{ detail.title }}
                  </h1>
                  <p
                    class="mt-3 flex items-start gap-2 text-sm text-muted sm:text-base"
                  >
                    <MapPin
                      class="mt-0.5 size-5 shrink-0 text-hero"
                    />
                    {{ detail.fullAddress }}
                  </p>
                  <div class="mt-4 flex flex-wrap gap-2">
                    <span
                      v-for="b in detail.badges"
                      :key="b"
                      class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset"
                      :class="badgeClass[b]"
                    >
                      {{ badgeShort[b] }}
                    </span>
                    <span
                      class="inline-flex items-center rounded-full bg-nav-active/80 px-2.5 py-1 text-[11px] font-semibold text-muted ring-1 ring-border/60"
                    >
                      {{ detail.postedLabel }}
                    </span>
                  </div>
                </div>
                <div
                  v-if="detail.reraId"
                  class="flex max-w-full items-center gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-xs font-bold text-emerald-900 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-100"
                >
                  <ShieldCheck class="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {{ detail.reraId }}
                </div>
              </div>

              <div
                id="property-facts"
                class="scroll-mt-40 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                <div
                  v-motion
                  class="rounded-2xl border border-border/50 bg-card/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
                  :initial="{ opacity: 0, y: 12 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 320, damping: 26, delay: 80 },
                  }"
                >
                  <Maximize2 class="size-5 text-hero" />
                  <p class="mt-2 text-[10px] font-bold uppercase tracking-wide text-muted">
                    Area
                  </p>
                  <p class="mt-0.5 text-sm font-bold text-heading">
                    {{ formatAreaSqft(detail.areaSqft) }}
                  </p>
                </div>
                <div
                  v-motion
                  class="rounded-2xl border border-border/50 bg-card/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
                  :initial="{ opacity: 0, y: 12 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 320, damping: 26, delay: 120 },
                  }"
                >
                  <Layers2 class="size-5 text-hero" />
                  <p class="mt-2 text-[10px] font-bold uppercase tracking-wide text-muted">
                    Config
                  </p>
                  <p class="mt-0.5 text-sm font-bold text-heading">
                    {{ detail.bhkLabel ?? '—' }}
                  </p>
                </div>
                <div
                  v-motion
                  class="rounded-2xl border border-border/50 bg-card/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
                  :initial="{ opacity: 0, y: 12 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 320, damping: 26, delay: 160 },
                  }"
                >
                  <Home class="size-5 text-hero" />
                  <p class="mt-2 text-[10px] font-bold uppercase tracking-wide text-muted">
                    Type
                  </p>
                  <p class="mt-0.5 text-sm font-bold text-heading">
                    {{ detail.propertyTypeLabel }}
                  </p>
                </div>
                <div
                  v-motion
                  class="rounded-2xl border border-border/50 bg-card/90 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
                  :initial="{ opacity: 0, y: 12 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 320, damping: 26, delay: 200 },
                  }"
                >
                  <Sofa class="size-5 text-hero" />
                  <p class="mt-2 text-[10px] font-bold uppercase tracking-wide text-muted">
                    Furnishing
                  </p>
                  <p class="mt-0.5 text-sm font-bold text-heading">
                    {{ detail.furnishing ?? '—' }}
                  </p>
                </div>
              </div>
              <div
                v-if="detail.facing || detail.floorLabel"
                class="mt-4 flex flex-wrap gap-3 text-xs text-muted"
              >
                <span
                  v-if="detail.facing"
                  class="inline-flex items-center gap-1.5 rounded-full bg-nav-active/60 px-3 py-1 font-medium text-heading"
                >
                  <Compass class="size-3.5 text-hero" />
                  {{ detail.facing }} facing
                </span>
                <span
                  v-if="detail.floorLabel"
                  class="inline-flex items-center gap-1.5 rounded-full bg-nav-active/60 px-3 py-1 font-medium text-heading"
                >
                  <Layers2 class="size-3.5 text-hero" />
                  {{ detail.floorLabel }}
                </span>
              </div>
            </section>
          </div>

          <!-- Spotlight -->
          <section
            id="property-spotlight"
            class="scroll-mt-36 lg:scroll-mt-40"
          >
            <div
              v-motion
              class="mb-5 flex items-center gap-2"
              :initial="{ opacity: 0, x: -8 }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: { type: 'spring', stiffness: 300, damping: 28 },
              }"
            >
              <div
                class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-hero/20 to-indigo-500/15 text-hero shadow-inner"
              >
                <Sparkles class="size-5" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-heading sm:text-xl">
                  Why you’ll love it
                </h2>
                <p class="text-xs text-muted sm:text-sm">
                  Curated from the listing narrative — swap for AI highlights later.
                </p>
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
              <div
                v-for="(line, i) in spotlightLines"
                :key="i"
                v-motion
                class="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition duration-300 hover:border-hero/20 hover:shadow-md"
                :initial="{ opacity: 0, y: 16 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 280, damping: 26, delay: 40 + i * 70 },
                }"
              >
                <span
                  class="text-xs font-bold uppercase tracking-wider text-hero/80"
                >0{{ i + 1 }}</span>
                <p class="mt-2 text-sm leading-relaxed text-body">
                  {{ line }}
                </p>
              </div>
            </div>
          </section>

          <!-- Connectivity -->
          <section
            id="property-connectivity"
            class="scroll-mt-36 lg:scroll-mt-40"
          >
            <h2
              class="mb-4 flex items-center gap-2 text-lg font-bold text-heading sm:text-xl"
            >
              <MapPin class="size-5 text-hero" />
              Location &amp; connectivity
            </h2>
            <p class="mb-5 text-sm text-muted">
              Illustrative distances for demo — replace with map SDK + your POI graph.
            </p>
            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="(c, i) in connectivity"
                :key="c.label"
                v-motion
                class="flex gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-nav-active/25 p-4 dark:to-hero/5"
                :initial="{ opacity: 0, scale: 0.97 }"
                :enter="{
                  opacity: 1,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 24, delay: i * 50 },
                }"
              >
                <div
                  class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-hero/10 text-hero"
                >
                  <component :is="c.icon" class="size-5" />
                </div>
                <div>
                  <p class="text-xs font-bold uppercase tracking-wide text-muted">
                    {{ c.label }}
                  </p>
                  <p class="mt-1 text-sm font-semibold text-heading">
                    {{ c.text }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Toolkit: EMI, map, tour / floor plan -->
          <section
            id="property-toolkit"
            class="scroll-mt-36 space-y-4 lg:scroll-mt-40"
          >
            <div
              v-motion
              class="flex items-center gap-2"
              :initial="{ opacity: 0, x: -8 }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: { type: 'spring', stiffness: 300, damping: 28 },
              }"
            >
              <div
                class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-hero/15 text-hero shadow-inner"
              >
                <Layers2 class="size-5" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-heading sm:text-xl">
                  Plan, EMI &amp; map
                </h2>
                <p class="text-xs text-muted sm:text-sm">
                  Interactive estimates — replace rates with your lending partners.
                </p>
              </div>
            </div>
            <PropertyDetailToolkit
              :detail="detail"
              @virtual-tour="openVirtualTour"
              @floor-plan="openFloorPlan"
            />
          </section>

          <!-- Trust / activity strip -->
          <section
            id="property-trust"
            class="scroll-mt-36 lg:scroll-mt-40"
          >
            <h2
              class="mb-4 text-lg font-bold text-heading sm:text-xl"
            >
              Listing activity
            </h2>
            <p class="mb-5 text-sm text-muted">
              Demo engagement metrics — swap for real analytics from your API.
            </p>
            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="(t, i) in trustStats"
                :key="t.label"
                v-motion
                class="rounded-2xl border border-border/60 bg-card p-5 shadow-sm ring-1 ring-black/[0.02] transition duration-300 hover:border-hero/20 hover:shadow-md dark:ring-white/[0.04]"
                :initial="{ opacity: 0, y: 14 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 26, delay: i * 55 },
                }"
              >
                <div
                  class="flex size-10 items-center justify-center rounded-xl bg-hero/10 text-hero"
                >
                  <component :is="t.icon" class="size-5" />
                </div>
                <p class="mt-3 text-2xl font-black tabular-nums text-heading">
                  {{ t.value }}
                </p>
                <p class="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {{ t.label }}
                </p>
              </div>
            </div>
          </section>

          <!-- About -->
          <section
            v-motion
            class="rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
            :initial="{ opacity: 0, y: 18 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 240, damping: 26 },
            }"
          >
            <h2 class="flex items-center gap-2 text-lg font-bold text-heading sm:text-xl">
              <Building2 class="size-5 text-hero" />
              About this property
            </h2>
            <p
              class="mt-5 text-base leading-relaxed text-body sm:text-lg sm:leading-relaxed"
            >
              {{ detail.description }}
            </p>
          </section>

          <!-- Documents teaser -->
          <section
            v-motion
            class="rounded-3xl border border-dashed border-hero/25 bg-gradient-to-r from-hero/[0.06] via-card to-indigo-500/[0.06] p-6 sm:p-7"
            :initial="{ opacity: 0, y: 14 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 260, damping: 28, delay: 40 },
            }"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex gap-3">
                <div
                  class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card text-hero shadow-md ring-1 ring-border/60"
                >
                  <FileText class="size-6" />
                </div>
                <div>
                  <h3 class="font-bold text-heading">
                    Documents &amp; compliance
                  </h3>
                  <p class="mt-1 text-sm text-muted">
                    Title, encumbrance, approvals — gate behind auth + e-sign when you go live.
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="lb-btn-surface shrink-0 justify-center sm:px-6"
                @click="requestDocPack"
              >
                Request pack
              </button>
            </div>
          </section>

          <!-- Amenities -->
          <section
            id="property-amenities"
            class="scroll-mt-36 lg:scroll-mt-40"
          >
            <h2 class="text-lg font-bold text-heading sm:text-xl">
              Amenities &amp; highlights
            </h2>
            <p class="mt-1 text-sm text-muted">
              Tap-friendly chips — great for mobile discovery.
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="(a, i) in detail.amenities"
                :key="a"
                v-motion
                class="rounded-full border border-hero/15 bg-gradient-to-r from-nav-active/50 to-card px-4 py-2 text-xs font-semibold text-heading shadow-sm ring-1 ring-border/40 transition hover:border-hero/30 hover:shadow dark:from-hero/10"
                :initial="{ opacity: 0, scale: 0.92 }"
                :enter="{
                  opacity: 1,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 400, damping: 22, delay: Math.min(i * 35, 280) },
                }"
              >
                {{ a }}
              </span>
            </div>
          </section>

          <PropertyCommentsSection :listing-id="detail.id" />
        </div>

        <aside class="flex flex-col gap-6 lg:col-span-1">
          <div
            class="lg:sticky lg:top-36 lg:flex lg:max-h-[calc(100dvh-10rem)] lg:flex-col lg:gap-6 lg:overflow-y-auto lg:pr-1"
          >
            <PropertyListingChat
              :listing-id="detail.id"
              :title="detail.title"
              :price-display="detail.priceDisplay"
              :locality="detail.locality"
            />

            <div
              id="property-cta"
              class="scroll-mt-40 rounded-3xl border border-border/60 bg-gradient-to-b from-card to-nav-active/40 p-6 shadow-[0_16px_48px_-20px_rgba(37,99,235,0.25)] ring-1 ring-hero/10 dark:from-card dark:to-hero/10 dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)]"
            >
              <p
                class="text-[11px] font-bold uppercase tracking-[0.2em] text-hero"
              >
                Next step
              </p>
              <p class="mt-2 text-sm leading-relaxed text-muted">
                Owner-ready CTAs — hook to
                <code class="rounded bg-nav-active px-1 text-[11px]">POST /leads</code>
                &amp; calendar.
              </p>
              <NuxtLink
                :to="`/contact?ref=${detail.id}`"
                class="lb-btn-primary mt-5 flex w-full justify-center py-3 text-center font-bold shadow-lg shadow-hero/25"
              >
                Contact owner
              </NuxtLink>
              <button
                type="button"
                class="lb-btn-surface mt-3 w-full justify-center py-3 font-semibold"
                @click="scrollToId('property-listing-chat')"
              >
                <MessagesSquare class="mr-2 inline size-4" />
                Message on chat
              </button>
              <button
                type="button"
                class="lb-btn-surface mt-2 w-full justify-center py-3 font-semibold"
                @click="scheduleVisit"
              >
                <CalendarClock class="mr-2 inline size-4" />
                Schedule site visit
              </button>
              <NuxtLink
                to="/map"
                class="mt-4 block text-center text-sm font-bold text-hero hover:underline"
              >
                Open in map explore →
              </NuxtLink>
              <button
                type="button"
                class="mt-5 w-full text-center text-xs font-semibold text-muted underline decoration-border underline-offset-4 transition hover:text-destructive"
                @click="reportListing"
              >
                <Flag class="mr-1 inline size-3.5" />
                Report this listing
              </button>
            </div>
          </div>
        </aside>
      </div>

      <!-- Similar -->
      <section
        class="mt-16 border-t border-border/80 pt-14 lg:mt-20 lg:pt-16"
      >
        <div
          v-motion
          class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          :initial="{ opacity: 0, y: 12 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 280, damping: 28 },
          }"
        >
          <div>
            <h2 class="text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
              Similar homes
            </h2>
            <p class="mt-1 max-w-xl text-sm text-muted">
              Swipe on mobile — curated from the same intent &amp; city in the mock layer.
            </p>
          </div>
          <NuxtLink
            to="/properties"
            class="text-sm font-bold text-hero hover:underline"
          >
            Browse all →
          </NuxtLink>
        </div>
        <div
          class="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          <div
            v-for="(s, i) in similar"
            :key="s.id"
            v-motion
            class="w-[min(100%,300px)] shrink-0 snap-center sm:w-auto sm:shrink"
            :initial="{ opacity: 0, y: 22 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 280, damping: 26, delay: Math.min(i * 45, 360) },
            }"
          >
            <PropertyListingCard :listing="s" />
          </div>
        </div>
      </section>
    </div>

    <!-- Mobile sticky actions -->
    <div
      class="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/90 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
    >
      <div class="mx-auto flex max-w-lg items-center gap-2">
        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-nav-active/50 py-3 text-xs font-bold text-heading"
          @click="scrollToId('property-listing-chat')"
        >
          <MessagesSquare class="size-4 text-hero" />
          Chat
        </button>
        <NuxtLink
          :to="`/contact?ref=${detail.id}`"
          class="lb-btn-primary flex-[1.35] justify-center py-3 text-center text-xs font-bold"
        >
          Contact
        </NuxtLink>
        <button
          type="button"
          class="flex size-12 items-center justify-center rounded-xl border border-border bg-card"
          :class="isSaved(detail.id) ? 'text-rose-500' : 'text-heading'"
          aria-label="Save"
          @click="toggle(detail.id)"
        >
          <Heart
            class="size-5"
            :class="isSaved(detail.id) ? 'fill-current' : ''"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lb-detail-price {
  background-size: 200% auto;
}
@media (prefers-reduced-motion: no-preference) {
  .lb-detail-price {
    animation: lb-detail-price-shift 10s ease-in-out infinite;
  }
}
@keyframes lb-detail-price-shift {
  0%,
  100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}
</style>
