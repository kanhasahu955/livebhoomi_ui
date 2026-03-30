<!-- Original flat SVG illustrations — free to use, no external CDN. -->
<script setup lang="ts">
const blocks = [
  {
    title: 'Search smarter',
    body: 'Filter by city, budget, and lifestyle — see what actually fits.',
    variant: 'search' as const,
  },
  {
    title: 'Verified listings',
    body: 'Spot genuine owners and RERA-registered agents before you visit.',
    variant: 'shield' as const,
  },
  {
    title: 'Shortlist & move',
    body: 'Save homes, compare notes, and get alerts when prices shift.',
    variant: 'keys' as const,
  },
]
</script>

<template>
  <section
    class="border-b border-border bg-gradient-to-b from-card to-surface py-12 sm:py-16 md:py-20"
    aria-labelledby="home-illustrations-heading"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
      <div
        v-motion
        class="mx-auto max-w-2xl text-center"
        :initial="{ opacity: 0, y: 16 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        }"
      >
        <h2
          id="home-illustrations-heading"
          class="text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          Everything in one place
        </h2>
        <p class="mt-3 text-pretty text-muted">
          A calmer way to discover property — illustrated steps you can trust.
        </p>
      </div>

      <div
        class="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
      >
        <article
          v-for="(item, index) in blocks"
          :key="item.variant"
          v-motion
          class="group flex flex-col items-center rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm transition-shadow duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none sm:p-8"
          :initial="{ opacity: 0, y: 28 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 280,
              damping: 26,
              delay: 80 + index * 70,
            },
          }"
        >
          <div
            class="mb-5 flex h-44 w-full max-w-[220px] items-center justify-center rounded-xl bg-gradient-to-br from-hero/10 via-sky-500/5 to-slate-100/80 text-hero dark:from-hero/20 dark:via-slate-800/50 dark:to-slate-900/80"
            aria-hidden="true"
          >
            <!-- Search / map -->
            <svg
              v-if="item.variant === 'search'"
              class="h-36 w-36"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ill-g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="var(--lb-primary)" stop-opacity="0.35" />
                  <stop offset="100%" stop-color="var(--lb-accent-text)" stop-opacity="0.2" />
                </linearGradient>
              </defs>
              <rect x="24" y="36" width="152" height="112" rx="14" fill="url(#ill-g1)" />
              <path
                d="M44 68h112M44 92h72M44 116h96"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                class="text-hero opacity-60"
              />
              <circle cx="140" cy="56" r="22" stroke="currentColor" stroke-width="2.5" class="text-hero" />
              <path
                d="M154 70l18 18"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                class="text-hero"
              />
              <circle cx="72" cy="148" r="6" fill="var(--lb-primary)" opacity="0.85" />
              <path
                d="M72 148 L72 124 L96 112 L120 124 L144 108"
                stroke="var(--lb-primary)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity="0.5"
              />
            </svg>

            <!-- Shield / home -->
            <svg
              v-else-if="item.variant === 'shield'"
              class="h-36 w-36"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 28 L156 52 V104 C156 142 130 168 100 180 C70 168 44 142 44 104 V52 Z"
                fill="var(--lb-primary)"
                fill-opacity="0.12"
                stroke="var(--lb-primary)"
                stroke-width="2.5"
                stroke-linejoin="round"
              />
              <path
                d="M78 102 L92 118 L128 82"
                stroke="var(--lb-primary)"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="84"
                y="128"
                width="32"
                height="24"
                rx="4"
                stroke="var(--lb-accent-text)"
                stroke-width="2"
                opacity="0.6"
              />
            </svg>

            <!-- Keys / celebration -->
            <svg
              v-else
              class="h-36 w-36"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="88" r="40" fill="var(--lb-primary)" fill-opacity="0.15" />
              <rect
                x="88"
                y="96"
                width="24"
                height="36"
                rx="4"
                stroke="var(--lb-primary)"
                stroke-width="2.5"
                fill="none"
              />
              <circle cx="100" cy="88" r="14" stroke="var(--lb-primary)" stroke-width="2.5" />
              <path
                d="M112 108l28 28M118 114l12-12"
                stroke="var(--lb-accent-text)"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M52 52l8 8M148 48l-8 8M100 36v10"
                stroke="var(--lb-primary)"
                stroke-width="2"
                stroke-linecap="round"
                opacity="0.45"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-heading">
            {{ item.title }}
          </h3>
          <p class="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {{ item.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
