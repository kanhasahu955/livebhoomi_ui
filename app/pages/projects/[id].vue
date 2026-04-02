<script setup lang="ts">
import {
  Bookmark,
  Building2,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers2,
  MapPinned,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-vue-next'
import { ElMessage } from 'element-plus'
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import {
  getMockBuilderProjectDetail,
  getRelatedMockProjects,
} from '~/data/mockNewProjects'

const route = useRoute()
const { branding } = useTheme()
const { hydrate, isSaved, toggle } = useProjectBookmark()

const id = computed(() => {
  const p = route.params.id
  if (typeof p === 'string') return p
  if (Array.isArray(p)) return p[0] ?? ''
  return ''
})

const detail = computed(() =>
  id.value ? getMockBuilderProjectDetail(id.value) : null,
)

const related = computed(() =>
  detail.value ? getRelatedMockProjects(detail.value, 4) : [],
)

const imgIdx = ref(0)
const images = computed(() => detail.value?.images ?? [])
const currentImg = computed(
  () => images.value[imgIdx.value] ?? images.value[0] ?? '',
)

const imgLabel = computed(
  () =>
    images.value.length
      ? `${imgIdx.value + 1} / ${images.value.length}`
      : '',
)

const staticMapUrl = computed(() => {
  const d = detail.value
  if (!d) return ''
  const z = 14
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${d.latitude},${d.longitude}&zoom=${z}&size=640x280&maptype=mapnik`
})

const sectionNav = [
  { id: 'project-overview', label: 'Overview' },
  { id: 'project-progress', label: 'Progress' },
  { id: 'project-about', label: 'About' },
  { id: 'project-amenities', label: 'Amenities' },
  { id: 'project-location', label: 'Location' },
  { id: 'project-payment', label: 'Payment' },
  { id: 'project-faq', label: 'FAQ' },
] as const

const activeSection = ref<string>('project-overview')

function scrollToSection(elId: string) {
  document.getElementById(elId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

let sectionObserver: IntersectionObserver | null = null

const SPY_IDS = sectionNav.map((s) => s.id)

function bindSectionSpy() {
  sectionObserver?.disconnect()
  sectionObserver = null
  if (!detail.value) return
  void nextTick(() => {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const sid = visible?.target?.id
        if (sid && SPY_IDS.includes(sid)) activeSection.value = sid
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.12, 0.25] },
    )
    for (const sid of SPY_IDS) {
      const el = document.getElementById(sid)
      if (el) sectionObserver!.observe(el)
    }
  })
}

function onGalleryKeydown(e: KeyboardEvent) {
  if (!detail.value || images.value.length <= 1) return
  const t = e.target as HTMLElement | null
  if (t?.closest('input, textarea, [contenteditable], select')) return
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevImg()
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextImg()
  }
}

onMounted(() => {
  hydrate()
  window.addEventListener('keydown', onGalleryKeydown)
  bindSectionSpy()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGalleryKeydown)
  sectionObserver?.disconnect()
  sectionObserver = null
})

watch(id, () => {
  bindSectionSpy()
})

function prevImg() {
  const n = images.value.length
  if (n <= 0) return
  imgIdx.value = (imgIdx.value - 1 + n) % n
}

function nextImg() {
  const n = images.value.length
  if (n <= 0) return
  imgIdx.value = (imgIdx.value + 1) % n
}

watch(
  () => detail.value?.id,
  () => {
    imgIdx.value = 0
  },
)

function shareProject() {
  const d = detail.value
  if (!d) return
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const title = d.name
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'
  ) {
    void navigator.share({
      title,
      text: `${d.builder} · ${d.locality}`,
      url,
    })
  } else if (url && typeof navigator !== 'undefined' && navigator.clipboard) {
    void navigator.clipboard.writeText(url)
    ElMessage.success('Project link copied')
  }
}

function downloadBrochure() {
  ElMessage.info('Brochure PDF — wire to CDN or signed URL from your project API.')
}

function onBookmark() {
  const d = detail.value
  if (!d) return
  toggle(d.id)
  ElMessage.success(isSaved(d.id) ? 'Saved to your projects' : 'Removed from saved')
}

useSeoMeta({
  title: () =>
    detail.value
      ? `${detail.value.name} — ${branding.productName}`
      : `Project — ${branding.productName}`,
  description: () =>
    detail.value
      ? `${detail.value.name} by ${detail.value.builder} in ${detail.value.locality}, ${detail.value.cityLabel}. ${detail.value.statusLabel}.`
      : 'Builder project on Live Bhoomi.',
})
</script>

<template>
  <div class="relative min-h-screen bg-surface pb-24 lg:pb-20">
    <!-- Ambient -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,560px)] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,color-mix(in_srgb,var(--lb-primary)_18%,transparent),transparent_55%)] dark:bg-[radial-gradient(ellipse_75%_48%_at_50%_-8%,color-mix(in_srgb,var(--lb-primary)_28%,transparent),transparent_50%)]"
      aria-hidden="true"
    />

    <template v-if="detail">
      <!-- Sticky top bar -->
      <header
        class="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl backdrop-saturate-150"
      >
        <div
          class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8"
        >
          <NuxtLink
            to="/projects"
            class="group inline-flex items-center gap-1 text-sm font-semibold text-hero"
          >
            <span class="transition group-hover:-translate-x-0.5">←</span>
            Projects
          </NuxtLink>
          <p
            class="hidden min-w-0 max-w-[40%] truncate text-center text-sm font-bold text-heading sm:block lg:max-w-md"
          >
            {{ detail.name }}
          </p>
          <div class="flex flex-wrap items-center justify-end gap-1.5">
            <button
              type="button"
              class="rounded-full border border-border/80 bg-card px-3 py-2 text-xs font-semibold text-heading shadow-sm transition hover:border-hero/25 hover:bg-nav-active/50 sm:text-sm"
              @click="shareProject"
            >
              <Share2 class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4" />
              Share
            </button>
            <button
              type="button"
              class="rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm"
              :class="
                isSaved(detail.id)
                  ? 'border-amber-300/80 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200'
                  : 'border-border/80 bg-card text-heading hover:border-hero/25 hover:bg-nav-active/50'
              "
              @click="onBookmark"
            >
              <Bookmark
                class="mr-1 inline size-3.5 sm:mr-1.5 sm:size-4"
                :class="isSaved(detail.id) ? 'fill-current' : ''"
              />
              {{ isSaved(detail.id) ? 'Saved' : 'Save' }}
            </button>
          </div>
        </div>
        <nav
          class="border-t border-border/40 bg-card/60 px-4 py-2 sm:px-6 lg:px-8"
          aria-label="On this page"
        >
          <div
            class="mx-auto flex max-w-7xl gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              v-for="item in sectionNav"
              :key="item.id"
              type="button"
              class="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition"
              :class="
                activeSection === item.id
                  ? 'bg-hero/12 text-hero ring-1 ring-hero/20'
                  : 'text-muted hover:bg-nav-active/70 hover:text-heading'
              "
              @click="scrollToSection(item.id)"
            >
              {{ item.label }}
            </button>
          </div>
        </nav>
      </header>

      <div class="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div class="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <!-- Main column -->
          <div class="min-w-0 space-y-12 lg:col-span-2">
            <div id="project-overview" class="scroll-mt-40 space-y-6">
              <div
                v-motion
                class="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)] dark:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)]"
                :initial="{ opacity: 0, y: 16 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 260, damping: 28 },
                }"
              >
                <div
                  class="group relative aspect-[16/10] overflow-hidden bg-nav-active/40 lg:aspect-[2/1]"
                >
                  <img
                    v-if="currentImg"
                    :src="currentImg"
                    :alt="detail.name"
                    class="lb-project-hero-img h-full w-full object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20"
                    aria-hidden="true"
                  />
                  <div
                    class="absolute left-4 top-4 flex flex-wrap gap-2"
                  >
                    <span
                      class="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-heading shadow-md"
                    >
                      {{ detail.statusLabel }}
                    </span>
                    <span
                      class="rounded-full bg-emerald-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md"
                    >
                      {{ detail.reraId }}
                    </span>
                  </div>
                  <span
                    v-if="imgLabel"
                    class="absolute right-4 top-4 rounded-full bg-slate-950/65 px-3 py-1 text-xs font-bold text-white backdrop-blur-md"
                  >
                    {{ imgLabel }}
                  </span>
                  <div
                    v-if="images.length > 1"
                    class="absolute inset-x-0 bottom-0 flex justify-between p-4"
                  >
                    <button
                      type="button"
                      class="rounded-full border border-white/20 bg-slate-950/50 p-2.5 text-white backdrop-blur-md transition hover:bg-slate-950/70"
                      aria-label="Previous photo"
                      @click="prevImg"
                    >
                      <ChevronLeft class="size-5" />
                    </button>
                    <button
                      type="button"
                      class="rounded-full border border-white/20 bg-slate-950/50 p-2.5 text-white backdrop-blur-md transition hover:bg-slate-950/70"
                      aria-label="Next photo"
                      @click="nextImg"
                    >
                      <ChevronRight class="size-5" />
                    </button>
                  </div>
                </div>
                <div
                  class="flex gap-2 overflow-x-auto border-t border-border/50 bg-card/95 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <button
                    v-for="(src, i) in images"
                    :key="i"
                    type="button"
                    class="h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ring-offset-2 ring-offset-card"
                    :class="i === imgIdx ? 'border-hero ring-2 ring-hero/30' : 'border-border/50 opacity-75 hover:opacity-100'"
                    @click="imgIdx = i"
                  >
                    <img :src="src" alt="" class="h-full w-full object-cover" />
                  </button>
                </div>
              </div>

              <!-- Price + specs strip -->
              <section
                v-motion
                class="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-nav-active/35 p-6 shadow-lg dark:to-hero/10 sm:p-8"
                :initial="{ opacity: 0, y: 18 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 240, damping: 26, delay: 80 },
                }"
              >
                <div
                  class="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-hero/10 blur-3xl dark:bg-hero/20"
                  aria-hidden="true"
                />
                <div class="relative">
                  <h1
                    class="text-2xl font-black leading-tight tracking-tight text-heading sm:text-3xl md:text-4xl"
                  >
                    {{ detail.name }}
                  </h1>
                  <p class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-muted">
                    <span class="inline-flex items-center gap-1.5">
                      <Building2 class="size-4 text-hero" />
                      {{ detail.builder }}
                    </span>
                    <span class="hidden text-border sm:inline">·</span>
                    <span class="inline-flex items-start gap-1.5">
                      <MapPin class="mt-0.5 size-4 shrink-0 text-hero" />
                      {{ detail.locality }}, {{ detail.cityLabel }}
                    </span>
                  </p>
                  <p
                    class="lb-project-price mt-5 bg-gradient-to-r from-hero via-indigo-600 to-hero bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl md:text-4xl"
                  >
                    {{ detail.priceFromDisplay }}
                    <span class="text-lg font-semibold text-muted"> – </span>
                    {{ detail.priceUptoDisplay }}
                  </p>
                  <p class="mt-2 text-sm text-muted">
                    {{ detail.configurationsLabel }} · {{ detail.areaLabel }}
                  </p>
                  <p class="mt-1 text-sm font-bold text-hero">
                    Possession: {{ detail.possessionLabel }}
                  </p>
                </div>
              </section>
            </div>

            <!-- Progress -->
            <section
              id="project-progress"
              class="scroll-mt-40"
            >
              <div
                v-motion
                class="mb-5 flex items-center gap-2"
                :initial="{ opacity: 0, x: -8 }"
                :visible="{
                  opacity: 1,
                  x: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 28 },
                }"
              >
                <div
                  class="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-hero/20 to-indigo-500/15 text-hero shadow-inner"
                >
                  <Layers2 class="size-5" />
                </div>
                <div>
                  <h2 class="text-lg font-bold text-heading sm:text-xl">
                    Construction progress
                  </h2>
                  <p class="text-xs text-muted sm:text-sm">
                    Illustrative timeline — replace with live ERP / site-engineering feeds.
                  </p>
                </div>
              </div>
              <div
                v-motion
                class="rounded-3xl border border-border/70 bg-card p-6 sm:p-8"
                :initial="{ opacity: 0, y: 14 }"
                :visible="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 260, damping: 28 },
                }"
              >
                <div class="mb-4 flex items-end justify-between gap-3">
                  <span class="text-4xl font-black tabular-nums text-heading">
                    {{ detail.constructionProgressPct }}%
                  </span>
                  <span class="text-xs font-semibold uppercase tracking-wide text-muted">
                    Overall completion (demo)
                  </span>
                </div>
                <div
                  class="h-3 overflow-hidden rounded-full bg-nav-active/80 ring-1 ring-border/50"
                >
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-hero to-indigo-500 transition-[width] duration-700 ease-out motion-reduce:transition-none"
                    :style="{ width: `${detail.constructionProgressPct}%` }"
                  />
                </div>
                <ol class="mt-8 space-y-4">
                  <li
                    v-for="(m, i) in detail.milestones"
                    :key="m.label"
                    v-motion
                    class="flex gap-4"
                    :initial="{ opacity: 0, x: -10 }"
                    :visible="{
                      opacity: 1,
                      x: 0,
                      transition: { type: 'spring', stiffness: 280, damping: 26, delay: i * 55 },
                    }"
                  >
                    <div
                      class="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      :class="
                        m.done
                          ? 'bg-emerald-500/15 text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300'
                          : 'bg-nav-active text-muted ring-1 ring-border/60'
                      "
                    >
                      {{ i + 1 }}
                    </div>
                    <div class="min-w-0 flex-1 border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <p class="font-bold text-heading">
                        {{ m.label }}
                      </p>
                      <p class="text-sm text-muted">
                        {{ m.date }}
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <!-- About -->
            <section
              id="project-about"
              class="scroll-mt-40"
            >
              <div
                v-motion
                class="mb-4 flex items-center gap-2"
                :initial="{ opacity: 0, x: -8 }"
                :visible="{
                  opacity: 1,
                  x: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 28 },
                }"
              >
                <Sparkles class="size-6 text-hero" />
                <h2 class="text-xl font-bold text-heading sm:text-2xl">
                  About this project
                </h2>
              </div>
              <div
                v-motion
                class="rounded-3xl border border-border/70 bg-card p-6 leading-relaxed text-body sm:p-8 sm:text-lg"
                :initial="{ opacity: 0, y: 12 }"
                :visible="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 240, damping: 26 },
                }"
              >
                {{ detail.description }}
              </div>
            </section>

            <!-- Amenities -->
            <section
              id="project-amenities"
              class="scroll-mt-40"
            >
              <h2 class="text-xl font-bold text-heading sm:text-2xl">
                Amenities &amp; lifestyle
              </h2>
              <p class="mt-1 text-sm text-muted">
                Tap-friendly chips — great on mobile walkthroughs with sales.
              </p>
              <div class="mt-6 flex flex-wrap gap-2">
                <span
                  v-for="(a, i) in detail.amenities"
                  :key="a"
                  v-motion
                  class="rounded-full border border-hero/15 bg-gradient-to-r from-nav-active/60 to-card px-4 py-2 text-xs font-semibold text-heading shadow-sm ring-1 ring-border/40 transition hover:border-hero/30 hover:shadow dark:from-hero/10"
                  :initial="{ opacity: 0, scale: 0.94 }"
                  :visible="{
                    opacity: 1,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 400, damping: 22, delay: Math.min(i * 32, 240) },
                  }"
                >
                  {{ a }}
                </span>
              </div>
            </section>

            <!-- Location -->
            <section
              id="project-location"
              class="scroll-mt-40"
            >
              <div class="mb-4 flex items-center gap-2">
                <MapPinned class="size-6 text-hero" />
                <h2 class="text-xl font-bold text-heading sm:text-2xl">
                  Location
                </h2>
              </div>
              <div
                v-motion
                class="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-md"
                :initial="{ opacity: 0, y: 14 }"
                :visible="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 260, damping: 28 },
                }"
              >
                <NuxtLink
                  :to="`/map?lat=${detail.latitude}&lng=${detail.longitude}`"
                  class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-hero"
                >
                  <img
                    :src="staticMapUrl"
                    alt=""
                    class="h-48 w-full object-cover transition duration-300 hover:opacity-95 sm:h-56"
                    loading="lazy"
                  />
                </NuxtLink>
                <div class="border-t border-border/60 p-5">
                  <p class="flex items-start gap-2 text-sm text-body">
                    <MapPin class="mt-0.5 size-4 shrink-0 text-hero" />
                    {{ detail.locality }}, {{ detail.cityLabel }}
                  </p>
                  <NuxtLink
                    :to="`/map?lat=${detail.latitude}&lng=${detail.longitude}`"
                    class="mt-3 inline-flex text-sm font-bold text-hero hover:underline"
                  >
                    Open in map explore →
                  </NuxtLink>
                </div>
              </div>
            </section>

            <!-- Payment -->
            <section
              id="project-payment"
              class="scroll-mt-40"
            >
              <h2 class="text-xl font-bold text-heading sm:text-2xl">
                Payment plan
              </h2>
              <div
                v-motion
                class="mt-4 rounded-3xl border border-dashed border-hero/30 bg-gradient-to-br from-hero/[0.07] via-card to-indigo-500/[0.06] p-6 sm:p-8"
                :initial="{ opacity: 0, y: 12 }"
                :visible="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 260, damping: 28 },
                }"
              >
                <p class="text-sm leading-relaxed text-body sm:text-base">
                  {{ detail.paymentPlanNote }}
                </p>
                <button
                  type="button"
                  class="lb-btn-surface mt-5"
                  @click="downloadBrochure"
                >
                  <Download class="mr-2 inline size-4" />
                  Download brochure (demo)
                </button>
              </div>
            </section>

            <!-- FAQ -->
            <section
              id="project-faq"
              class="scroll-mt-40"
            >
              <h2 class="text-xl font-bold text-heading sm:text-2xl">
                Frequently asked
              </h2>
              <p class="mt-1 text-sm text-muted">
                Starter answers for buyers — swap for CMS or legal-approved copy.
              </p>
              <el-collapse
                class="lb-project-faq mt-6 rounded-2xl border border-border/70 bg-card"
              >
                <el-collapse-item
                  v-for="(f, i) in detail.faqs"
                  :key="i"
                  :title="f.question"
                  :name="String(i)"
                >
                  <p class="text-sm leading-relaxed text-body">
                    {{ f.answer }}
                  </p>
                </el-collapse-item>
              </el-collapse>
            </section>
          </div>

          <!-- Sticky aside -->
          <aside class="min-w-0 lg:col-span-1">
            <div
              class="lg:sticky lg:top-36 lg:flex lg:flex-col lg:gap-6"
            >
              <div
                v-motion
                class="rounded-3xl border border-border/70 bg-card p-6 shadow-[0_20px_50px_-24px_rgba(37,99,235,0.2)] ring-1 ring-hero/10 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]"
                :initial="{ opacity: 0, y: 16 }"
                :enter="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 260, damping: 28, delay: 100 },
                }"
              >
                <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-hero">
                  Next step
                </p>
                <div
                  class="mt-4 grid grid-cols-2 gap-3"
                >
                  <div class="rounded-2xl border border-border/50 bg-nav-active/40 p-3">
                    <Layers2 class="size-4 text-hero" />
                    <p class="mt-1 text-[10px] font-bold uppercase text-muted">
                      Towers
                    </p>
                    <p class="text-lg font-bold text-heading">
                      {{ detail.towers }}
                    </p>
                  </div>
                  <div class="rounded-2xl border border-border/50 bg-nav-active/40 p-3">
                    <Users class="size-4 text-hero" />
                    <p class="mt-1 text-[10px] font-bold uppercase text-muted">
                      Units
                    </p>
                    <p class="text-lg font-bold text-heading">
                      {{ detail.totalUnits }}+
                    </p>
                  </div>
                </div>
                <div
                  class="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-3 py-2.5 text-xs font-bold text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/35 dark:text-emerald-100"
                >
                  <ShieldCheck class="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  {{ detail.reraId }}
                </div>
                <NuxtLink
                  :to="`/contact?ref=${encodeURIComponent(detail.id)}`"
                  class="lb-btn-primary mt-5 flex w-full justify-center py-3 text-center text-sm font-bold shadow-lg shadow-hero/20"
                >
                  Enquire now
                </NuxtLink>
                <button
                  type="button"
                  class="lb-btn-surface mt-3 w-full justify-center py-3 text-sm font-semibold"
                  @click="downloadBrochure"
                >
                  <Download class="mr-2 inline size-4" />
                  Brochure PDF
                </button>
                <NuxtLink
                  :to="{ path: '/properties', query: { intent: 'buy', city: detail.cityValue } }"
                  class="lb-btn-surface mt-2 flex w-full justify-center py-3 text-center text-sm font-semibold"
                >
                  Resale in {{ detail.cityLabel }}
                </NuxtLink>
                <button
                  type="button"
                  class="mt-4 w-full text-center text-xs font-semibold text-muted underline decoration-border underline-offset-4 hover:text-heading"
                  @click="scrollToSection('project-faq')"
                >
                  Read FAQs
                </button>
              </div>
            </div>
          </aside>
        </div>

        <!-- Related -->
        <section
          v-if="related.length"
          class="mt-16 border-t border-border/80 pt-14 lg:mt-20 lg:pt-16"
        >
          <h2 class="text-2xl font-extrabold text-heading sm:text-3xl">
            More in {{ detail.cityLabel }}
          </h2>
          <p class="mt-1 text-sm text-muted">
            Continue exploring before you shortlist for a site visit.
          </p>
          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="(p, i) in related"
              :key="p.id"
              v-motion
              :initial="{ opacity: 0, y: 22 }"
              :visible="{
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 280, damping: 26, delay: Math.min(i * 50, 300) },
              }"
            >
              <NewProjectCard :project="p" />
            </div>
          </div>
        </section>
      </div>
    </template>

    <!-- Not found -->
    <div
      v-else
      class="relative mx-auto max-w-lg px-4 py-24 text-center"
    >
      <h1 class="text-2xl font-bold text-heading">
        Project not found
      </h1>
      <p class="mt-2 text-muted">
        This id isn’t in the demo catalogue. Open the hub and pick a live card.
      </p>
      <NuxtLink
        to="/projects"
        class="lb-btn-primary mt-8 inline-flex justify-center px-8 py-3"
      >
        Back to projects
      </NuxtLink>
    </div>

    <!-- Mobile sticky CTAs -->
    <div
      v-if="detail"
      class="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
    >
      <div class="mx-auto flex max-w-lg items-center gap-2">
        <button
          type="button"
          class="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card"
          :class="isSaved(detail.id) ? 'text-amber-600' : 'text-heading'"
          aria-label="Save project"
          @click="onBookmark"
        >
          <Bookmark class="size-5" :class="isSaved(detail.id) ? 'fill-current' : ''" />
        </button>
        <NuxtLink
          :to="`/contact?ref=${encodeURIComponent(detail.id)}`"
          class="lb-btn-primary flex flex-[1.4] justify-center py-3 text-center text-xs font-bold"
        >
          Enquire
        </NuxtLink>
        <button
          type="button"
          class="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border bg-nav-active/50 py-3 text-xs font-bold text-heading"
          @click="shareProject"
        >
          <Share2 class="size-4 text-hero" />
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lb-project-hero-img {
  transition: transform 8s ease-out;
}
@media (prefers-reduced-motion: no-preference) {
  .group:hover .lb-project-hero-img {
    transform: scale(1.04);
  }
}
.lb-project-price {
  background-size: 200% auto;
}
@media (prefers-reduced-motion: no-preference) {
  .lb-project-price {
    animation: lb-project-price-shift 12s ease-in-out infinite;
  }
}
@keyframes lb-project-price-shift {
  0%,
  100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

.lb-project-faq :deep(.el-collapse-item__header) {
  font-weight: 700;
  font-size: 0.875rem;
  padding: 1rem 1.25rem;
  line-height: 1.4;
}
.lb-project-faq :deep(.el-collapse-item__wrap) {
  border-color: color-mix(in srgb, var(--lb-border) 80%, transparent);
}
.lb-project-faq :deep(.el-collapse-item__content) {
  padding: 0 1.25rem 1rem;
}
</style>
