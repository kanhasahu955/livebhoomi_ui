<!-- unDraw SVGs from public/illustrations/undraw — see SOURCE.txt for links & license. -->
<script setup lang="ts">
import { computed, withDefaults } from 'vue'

export type HeroIntent = 'buy' | 'rent' | 'commercial' | 'pg' | 'plots'

const props = withDefaults(
  defineProps<{
    intent: HeroIntent
    /** `center` = hero main art; `right` mirrors for optional side layouts. */
    placement?: 'left' | 'right' | 'center'
  }>(),
  { placement: 'center' },
)

const flipClass = computed(() => (props.placement === 'right' ? '-scale-x-100' : ''))

const breatheClass = computed(() =>
  props.placement === 'center' ? 'lb-ill-breathe' : '',
)

/** unDraw scenes — people & places per journey (tinted #2563eb in files). */
const undrawSrc: Record<HeroIntent, string> = {
  buy: '/illustrations/undraw/house-searching.svg',
  rent: '/illustrations/undraw/moving.svg',
  commercial: '/illustrations/undraw/in-the-office.svg',
  pg: '/illustrations/undraw/working-together.svg',
  plots: '/illustrations/undraw/adventure-map.svg',
}
</script>

<template>
  <div class="relative h-full w-full" :class="flipClass">
    <div class="lb-ill-float relative h-full w-full">
      <div class="relative h-full w-full" :class="breatheClass">
        <img
          :src="undrawSrc[intent]"
          alt=""
          width="800"
          height="800"
          decoding="async"
          fetchpriority="low"
          class="pointer-events-none h-full w-full max-h-full select-none object-contain object-center opacity-[0.97] [filter:drop-shadow(0_4px_28px_rgb(0_0_0_/_0.22))]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes lb-ill-float-y {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes lb-ill-breathe-s {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

.lb-ill-float {
  animation: lb-ill-float-y 5.5s ease-in-out infinite;
}

.lb-ill-breathe {
  animation: lb-ill-breathe-s 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .lb-ill-float,
  .lb-ill-breathe {
    animation: none !important;
  }
}
</style>
