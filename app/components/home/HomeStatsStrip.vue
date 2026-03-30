<script setup lang="ts">
const stats = [
  { value: '12K+', label: 'Active listings', hint: 'Updated daily' },
  { value: '45+', label: 'Cities covered', hint: 'Pan-India growth' },
  { value: '4.8', label: 'Trust score', hint: 'From user reviews' },
  { value: '2.4K', label: 'Verified owners', hint: 'KYC on select listings' },
] as const
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-border bg-card"
    aria-label="Platform highlights"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_oklch,var(--lb-primary)_22%,transparent),transparent_60%)] opacity-90 dark:opacity-70"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-hero/10 blur-3xl motion-reduce:opacity-0"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-400/15 blur-3xl motion-reduce:opacity-0 dark:bg-sky-500/10"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-12 lg:px-8">
      <div
        class="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:gap-8"
      >
        <div
          v-for="(s, index) in stats"
          :key="s.label"
          v-motion
          class="group text-center sm:text-left"
          :initial="{ opacity: 0, y: 16 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 320,
              damping: 28,
              delay: 40 + index * 55,
            },
          }"
        >
          <p
            class="text-2xl font-bold tabular-nums tracking-tight text-heading transition duration-300 group-hover:text-hero sm:text-3xl lg:text-[1.65rem]"
          >
            {{ s.value }}
          </p>
          <p class="mt-0.5 text-sm font-semibold text-heading">
            {{ s.label }}
          </p>
          <p class="mt-0.5 text-xs text-muted">
            {{ s.hint }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
