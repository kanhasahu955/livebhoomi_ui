<script setup lang="ts">
import { ZoomIn } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

type CarouselExpose = { setActiveItem: (index: number) => void }

const props = defineProps<{
  images: string[]
  title: string
}>()

const active = ref(0)
const carouselRef = ref<CarouselExpose | null>(null)

const countLabel = computed(
  () => `${active.value + 1} / ${props.images.length}`,
)

watch(
  () => props.images,
  () => {
    active.value = 0
    carouselRef.value?.setActiveItem(0)
  },
)

function onCarouselChange(i: number) {
  active.value = i
}

function goToSlide(i: number) {
  active.value = i
  carouselRef.value?.setActiveItem(i)
}
</script>

<template>
  <div
    v-motion
    class="space-y-4"
    :initial="{ opacity: 0, y: 16 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 280, damping: 30 },
    }"
  >
    <div
      v-if="!images.length"
      class="flex aspect-[16/10] max-h-[460px] items-center justify-center rounded-3xl border border-dashed border-border/80 bg-gradient-to-br from-nav-active/50 to-card text-sm text-muted"
    >
      No photos available
    </div>
    <div
      v-else
      class="group/gal relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_24px_64px_-24px_rgba(15,23,42,0.2)] ring-1 ring-black/[0.04] dark:shadow-[0_24px_64px_-24px_rgba(0,0,0,0.55)] dark:ring-white/[0.06]"
    >
      <div
        class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-slate-950/25 via-transparent to-slate-950/10 opacity-0 transition duration-500 group-hover/gal:opacity-100"
        aria-hidden="true"
      />
      <el-carousel
        ref="carouselRef"
        :interval="0"
        height="440px"
        indicator-position="outside"
        arrow="hover"
        class="property-gallery-carousel"
        @change="onCarouselChange"
      >
        <el-carousel-item
          v-for="(src, i) in images"
          :key="`${src}-${i}`"
        >
          <div class="relative h-full w-full bg-nav-active/20">
            <el-image
              :src="src"
              :alt="`${title} — photo ${i + 1}`"
              fit="cover"
              class="gallery-main-image h-full w-full"
              :preview-src-list="images"
              :initial-index="i"
              preview-teleported
              hide-on-click-modal
            >
              <template #placeholder>
                <div
                  class="flex h-[440px] w-full items-center justify-center bg-gradient-to-br from-nav-active/60 to-card text-muted"
                >
                  <span class="text-sm">Loading…</span>
                </div>
              </template>
            </el-image>
            <div
              class="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"
            >
              <span class="tabular-nums">{{ countLabel }}</span>
            </div>
            <div
              class="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-slate-950/60 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-md"
            >
              <ZoomIn class="size-3.5 opacity-90" />
              Tap to zoom
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div
      v-if="images.length > 1"
      class="flex gap-2.5 overflow-x-auto pb-1 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="(src, i) in images"
        :key="`t-${i}`"
        type="button"
        class="relative h-[4.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-xl border-2 shadow-sm transition duration-300 [scroll-snap-align:start] motion-reduce:transition-none"
        :class="
          i === active
            ? 'scale-[1.02] border-hero ring-2 ring-hero/30'
            : 'border-transparent opacity-75 hover:scale-[1.02] hover:opacity-100'
        "
        @click="goToSlide(i)"
      >
        <img
          :src="src"
          :alt="`Thumbnail ${i + 1}`"
          class="h-full w-full object-cover"
          loading="lazy"
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery-main-image :deep(.el-image__inner) {
  width: 100%;
  height: 100%;
  min-height: 440px;
  object-fit: cover;
}
.property-gallery-carousel :deep(.el-carousel__container) {
  min-height: 440px;
}
.property-gallery-carousel :deep(.el-carousel__indicators--outside) {
  margin-top: 0.75rem;
}
</style>
