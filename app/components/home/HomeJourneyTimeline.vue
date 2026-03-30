<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: 'Search with intent',
    body: 'Pick buy, rent, PG, commercial, or plots — filters stay meaningful for that journey.',
  },
  {
    step: '02',
    title: 'Shortlist & compare',
    body: 'Save favourites, share with family, and get nudges when listings update.',
  },
  {
    step: '03',
    title: 'Connect safely',
    body: 'Reach owners and RERA-registered agents with context from your shortlist.',
  },
  {
    step: '04',
    title: 'Visit & decide',
    body: 'Schedule visits, keep notes, and close on your terms — online or offline.',
  },
] as const
</script>

<template>
  <section
    class="border-b border-border bg-card py-12 sm:py-16 md:py-20"
    aria-labelledby="journey-heading"
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
        <p class="text-xs font-semibold uppercase tracking-wider text-hero">
          How it works
        </p>
        <h2
          id="journey-heading"
          class="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          From first search to keys in hand
        </h2>
        <p class="mt-3 text-pretty text-muted">
          A linear flow designed for real Indian property hunting — fast on mobile, calm on desktop.
        </p>
      </div>

      <ol
        class="relative mt-12 grid gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        <li
          v-for="(s, index) in steps"
          :key="s.step"
          v-motion
          class="relative"
          :initial="{ opacity: 0, y: 24 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 26,
              delay: 80 + index * 70,
            },
          }"
        >
          <div
            class="relative flex h-full flex-col rounded-2xl border border-border/80 bg-surface/80 p-6 shadow-sm backdrop-blur-sm transition duration-300 hover:border-hero/20 hover:shadow-md dark:bg-surface/40"
          >
            <span
              class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-hero text-sm font-bold text-white shadow-md"
            >
              {{ s.step }}
            </span>
            <h3 class="mt-4 text-base font-semibold text-heading">
              {{ s.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ s.body }}
            </p>
          </div>
        </li>
      </ol>

      <div
        v-motion
        class="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
        :initial="{ opacity: 0, y: 12 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 28, delay: 200 },
        }"
      >
        <NuxtLink
          to="/properties"
          class="lb-btn-primary-lg w-full justify-center sm:w-auto"
        >
          Start browsing
        </NuxtLink>
        <NuxtLink
          to="/shortlist"
          class="lb-btn-surface w-full justify-center sm:w-auto"
        >
          Open shortlist
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
