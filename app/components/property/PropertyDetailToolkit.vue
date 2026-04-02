<script setup lang="ts">
import {
  Calculator,
  Layers2,
  MapPinned,
  PlayCircle,
  Sparkles,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { SearchIntent } from '~/config/propertySearch.config'
import type { PropertyListingDetail } from '~/types/propertyListing.types'
import { formatInrPlain } from '~/utils/inrFormat'

const props = defineProps<{
  detail: PropertyListingDetail
}>()

const emit = defineEmits<{
  virtualTour: []
  floorPlan: []
}>()

function onVirtualTour() {
  emit('virtualTour')
}

function onFloorPlan() {
  emit('floorPlan')
}

const tenureYears = ref(20)
const interestRate = ref(8.6)
const loanRatioPct = ref(82)

const isSaleLike = computed(() => {
  const i: SearchIntent = props.detail.intent
  return i === 'buy' || i === 'plots'
})

const principal = computed(() => {
  if (!isSaleLike.value) return 0
  return Math.round(
    props.detail.priceAmount * (loanRatioPct.value / 100),
  )
})

const monthlyEmi = computed(() => {
  const P = principal.value
  const n = Math.max(1, tenureYears.value) * 12
  const r = interestRate.value / 100 / 12
  if (P <= 0 || n <= 0) return 0
  if (r <= 0) return P / n
  const pow = (1 + r) ** n
  return (P * r * pow) / (pow - 1)
})

const depositExample = computed(() => props.detail.priceAmount * 2)

const staticMapUrl = computed(() => {
  const { latitude: lat, longitude: lng } = props.detail
  const z = 14
  const w = 640
  const h = 280
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${z}&size=${w}x${h}&maptype=mapnik`
})
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <!-- EMI / rent snapshot -->
    <div
      v-motion
      class="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-indigo-500/[0.07] p-5 shadow-lg ring-1 ring-black/[0.03] dark:to-hero/10 dark:ring-white/[0.05] sm:p-6"
      :initial="{ opacity: 0, y: 18 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 260, damping: 28 },
      }"
    >
      <div
        class="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-hero/10 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative flex items-start gap-3">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-hero/12 text-hero shadow-inner"
        >
          <Calculator class="size-5" />
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="flex items-center gap-2 text-base font-bold text-heading">
            {{ isSaleLike ? 'EMI planner' : 'Move-in costs' }}
            <Sparkles class="size-4 text-amber-500/90" />
          </h3>
          <p class="mt-1 text-xs leading-relaxed text-muted">
            {{
              isSaleLike
                ? 'Adjust loan, tenure, and rate — indicative only until bank API is wired.'
                : 'Typical deposit (2× rent) for planning — confirm with owner.'
            }}
          </p>
        </div>
      </div>

      <template v-if="isSaleLike">
        <div class="relative mt-5 space-y-4">
          <div>
            <div class="mb-1 flex justify-between text-[11px] font-semibold text-muted">
              <span>Loan ({{ loanRatioPct }}% of price)</span>
              <span class="tabular-nums text-heading">{{ formatInrPlain(principal) }}</span>
            </div>
            <el-slider
              v-model="loanRatioPct"
              :min="50"
              :max="95"
              :step="1"
              :show-tooltip="false"
            />
          </div>
          <div>
            <div class="mb-1 flex justify-between text-[11px] font-semibold text-muted">
              <span>Tenure (years)</span>
              <span class="tabular-nums text-heading">{{ tenureYears }} yrs</span>
            </div>
            <el-slider
              v-model="tenureYears"
              :min="5"
              :max="30"
              :step="1"
              :show-tooltip="false"
            />
          </div>
          <div>
            <div class="mb-1 flex justify-between text-[11px] font-semibold text-muted">
              <span>Interest (% p.a.)</span>
              <span class="tabular-nums text-heading">{{ interestRate.toFixed(1) }}%</span>
            </div>
            <el-slider
              v-model="interestRate"
              :min="6"
              :max="12"
              :step="0.1"
              :show-tooltip="false"
            />
          </div>
          <div
            class="rounded-2xl border border-hero/20 bg-gradient-to-r from-hero/10 to-indigo-500/10 px-4 py-3 text-center"
          >
            <p class="text-[10px] font-bold uppercase tracking-widest text-muted">
              Est. monthly EMI
            </p>
            <p class="mt-1 text-2xl font-black tabular-nums text-heading sm:text-3xl">
              {{ formatInrPlain(monthlyEmi) }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="relative mt-5 rounded-2xl border border-border/60 bg-nav-active/30 px-4 py-5 dark:bg-hero/10"
        >
          <p class="text-xs font-semibold text-muted">
            Example security deposit (2× monthly)
          </p>
          <p class="mt-2 text-2xl font-black tabular-nums text-heading">
            {{ formatInrPlain(depositExample) }}
          </p>
          <p class="mt-2 text-[11px] text-muted">
            Based on listed {{ detail.priceDisplay }} — not legal advice.
          </p>
        </div>
      </template>
    </div>

    <!-- Map + tour -->
    <div
      v-motion
      class="flex flex-col gap-4"
      :initial="{ opacity: 0, y: 18 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 260, damping: 28, delay: 70 },
      }"
    >
      <NuxtLink
        :to="`/map?lat=${detail.latitude}&lng=${detail.longitude}`"
        class="group relative block overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lg ring-1 ring-black/[0.03] dark:ring-white/[0.05]"
      >
        <div class="relative aspect-[16/9] max-h-[200px] overflow-hidden sm:max-h-[220px]">
          <img
            :src="staticMapUrl"
            :alt="`Map near ${detail.locality}`"
            class="h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent"
          />
          <div
            class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2"
          >
            <div class="flex items-center gap-2 text-white">
              <div
                class="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md"
              >
                <MapPinned class="size-4" />
              </div>
              <div>
                <p class="text-xs font-bold">
                  Neighbourhood
                </p>
                <p class="text-[11px] text-white/85">
                  {{ detail.locality }}, {{ detail.cityLabel }}
                </p>
              </div>
            </div>
            <span
              class="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-heading shadow-md transition group-hover:bg-white"
            >
              Open map →
            </span>
          </div>
        </div>
      </NuxtLink>

      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card py-5 text-center shadow-sm transition hover:border-hero/30 hover:shadow-md"
          @click="onVirtualTour"
        >
          <div
            class="flex size-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 transition group-hover:scale-105 motion-reduce:transition-none dark:text-rose-400"
          >
            <PlayCircle class="size-7" />
          </div>
          <span class="text-xs font-bold text-heading">Virtual tour</span>
          <span class="px-2 text-[10px] text-muted">360° / video embed</span>
        </button>
        <button
          type="button"
          class="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card py-5 text-center shadow-sm transition hover:border-hero/30 hover:shadow-md"
          @click="onFloorPlan"
        >
          <div
            class="flex size-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 transition group-hover:scale-105 motion-reduce:transition-none dark:text-sky-400"
          >
            <Layers2 class="size-6" />
          </div>
          <span class="text-xs font-bold text-heading">Floor plan</span>
          <span class="px-2 text-[10px] text-muted">Upload in dashboard</span>
        </button>
      </div>
    </div>
  </div>
</template>
