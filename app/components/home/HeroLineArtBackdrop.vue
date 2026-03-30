<!-- Left + right line art per intent; tiny non-circular center mark only (no halo rings). -->
<script setup lang="ts">
type HeroLineIntent = 'buy' | 'rent' | 'commercial' | 'pg' | 'plots'

defineProps<{
  intent: HeroLineIntent
}>()
</script>

<template>
  <div
    class="hero-line-backdrop pointer-events-none absolute inset-0 select-none"
    aria-hidden="true"
  >
    <!-- Minimal center: corner brackets + crosshair (no circles / ellipses) -->
    <svg
      class="lb-base-svg absolute inset-0 h-full w-full text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      <g
        class="lb-center-min lb-drift-center"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.34"
      >
        <path stroke-width="1.15" d="M576 260 L560 260 L560 244" />
        <path stroke-width="1.15" d="M624 260 L640 260 L640 244" />
        <path stroke-width="1.15" d="M576 292 L560 292 L560 308" />
        <path stroke-width="1.15" d="M624 292 L640 292 L640 308" />
        <path stroke-width="1" d="M600 250v24M588 262h24" opacity="0.55" />
      </g>
      <path
        class="lb-ground"
        stroke="currentColor"
        stroke-width="1.15"
        stroke-linecap="round"
        d="M-40 528 Q600 472 1240 528"
        opacity="0.22"
      />
    </svg>

    <Transition name="hero-lines" mode="out-in">
      <svg
        :key="intent"
        class="lb-intent-svg absolute inset-0 h-full w-full text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <!-- BUY: left house + trees | right key -->
        <g
          v-if="intent === 'buy'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-[0.5]"
        >
          <g class="lb-drift-a">
            <path
              stroke-width="1.5"
              d="M96 392 L96 320 M96 320 L134 290 L172 320 L172 392 M114 392 V364 h40 V392"
              opacity="0.95"
            />
            <circle cx="134" cy="346" r="5" stroke-width="1.25" />
            <path
              class="lb-dash"
              stroke-width="1.2"
              stroke-dasharray="4 6"
              d="M80 428c24-20 56-20 80 0"
              opacity="0.7"
            />
            <path stroke-width="1.2" d="M48 418v-32M48 386c-10-6-10-18 0-24M48 386c10-6 10-18 0-24" opacity="0.65" />
            <path stroke-width="1.2" d="M76 424v-26M76 398c-8-5-8-14 0-18M76 398c8-5 8-14 0-18" opacity="0.6" />
          </g>
          <g class="lb-drift-b">
            <path
              stroke-width="1.35"
              d="M1012 256 L1032 236 L1052 248 L1040 268 Z M1022 268 V296"
              opacity="0.88"
            />
            <path stroke-width="1.15" d="M988 308c26-12 52-12 78 0M998 326h60" opacity="0.62" />
          </g>
        </g>

        <!-- RENT: left building | right pin -->
        <g
          v-else-if="intent === 'rent'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-[0.48]"
        >
          <g class="lb-drift-a">
            <rect x="100" y="210" width="128" height="176" rx="8" stroke-width="1.4" />
            <path stroke-width="1.15" d="M100 276h128M100 342h128" opacity="0.65" />
            <rect x="122" y="236" width="30" height="22" rx="2" stroke-width="1" opacity="0.8" />
            <rect x="170" y="236" width="30" height="22" rx="2" stroke-width="1" opacity="0.8" />
          </g>
          <g class="lb-drift-b">
            <path
              stroke-width="1.35"
              d="M1028 204 V288 M1010 204h36 M986 314a20 20 0 1040 0a20 20 0 10-40 0"
              opacity="0.9"
            />
            <path stroke-width="1.15" d="M1020 334 V372" opacity="0.75" />
          </g>
        </g>

        <!-- PG: left bunk | right sofa -->
        <g
          v-else-if="intent === 'pg'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-[0.5]"
        >
          <g class="lb-drift-a">
            <rect x="92" y="228" width="140" height="58" rx="8" stroke-width="1.35" />
            <rect x="92" y="304" width="140" height="58" rx="8" stroke-width="1.35" />
            <path stroke-width="1.15" d="M92 256h140M92 332h140" opacity="0.55" />
          </g>
          <g class="lb-drift-b">
            <path
              stroke-width="1.3"
              d="M1008 356h132a12 12 0 0112 12v28H996V368a12 12 0 0112-12z"
              opacity="0.8"
            />
            <path stroke-width="1.1" d="M1022 368h108M1050 368V356M1096 368V356" opacity="0.5" />
          </g>
        </g>

        <!-- COMMERCIAL: left briefcase | right skyline -->
        <g
          v-else-if="intent === 'commercial'"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-[0.48]"
        >
          <g class="lb-drift-a">
            <rect x="86" y="276" width="128" height="92" rx="8" stroke-width="1.4" />
            <path stroke-width="1.15" d="M112 276 V256 M138 276 V246 M164 276 V264 M138 246h26" opacity="0.62" />
          </g>
          <g class="lb-drift-b">
            <path
              stroke-width="1.3"
              d="M978 408V236h44v172 M1062 408V196h50v212 M1148 408V256h54v152"
              opacity="0.92"
            />
            <path stroke-width="1.1" d="M948 204c30-20 62-20 92 0" opacity="0.48" />
          </g>
        </g>

        <!-- PLOTS: left fence | right tree / contours -->
        <g
          v-else
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-[0.48]"
        >
          <g class="lb-drift-a">
            <path stroke-width="1.35" d="M102 368 V288 M138 368 V288 M174 368 V288 M102 288h72" opacity="0.88" />
            <path stroke-width="1.15" d="M90 320h108" opacity="0.48" />
          </g>
          <g class="lb-drift-b">
            <path
              stroke-width="1.15"
              d="M1018 328 L1038 228 L1078 240 L1102 320 M1032 316 Q1058 276 1092 308"
              opacity="0.62"
            />
            <path stroke-width="1.1" d="M920 424 Q1000 388 1100 404 Q1150 412 1180 418" opacity="0.42" />
            <path stroke-width="1.05" d="M936 396 Q1060 358 1168 378" opacity="0.36" />
          </g>
        </g>
      </svg>
    </Transition>
  </div>
</template>

<style scoped>
.hero-lines-enter-active,
.hero-lines-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.45s ease;
}
.hero-lines-enter-from,
.hero-lines-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@keyframes lb-lines-drift-a {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(5px, -8px);
  }
}
@keyframes lb-lines-drift-b {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-6px, 7px);
  }
}
@keyframes lb-line-steam-move {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -40;
  }
}
@keyframes lb-ground-drift {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}
@keyframes lb-center-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -4px);
  }
}

.lb-drift-center {
  animation: lb-center-drift 24s ease-in-out infinite;
}

.lb-drift-a {
  animation: lb-lines-drift-a 20s ease-in-out infinite;
}
.lb-drift-b {
  animation: lb-lines-drift-b 24s ease-in-out infinite;
}
.lb-ground {
  animation: lb-ground-drift 32s ease-in-out infinite;
}
.lb-dash {
  animation: lb-line-steam-move 6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-lines-enter-active,
  .hero-lines-leave-active {
    transition: none;
  }
  .lb-drift-center,
  .lb-drift-a,
  .lb-drift-b,
  .lb-ground,
  .lb-dash {
    animation: none !important;
  }
}
</style>
