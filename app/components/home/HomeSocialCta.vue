<script setup lang="ts">
const quotes = [
  {
    quote:
      'Finally a portal that doesn’t make me re-enter filters on every page. The PG flow actually makes sense.',
    name: 'Ananya K.',
    role: 'IT professional, Hyderabad',
  },
  {
    quote:
      'We listed two apartments and got qualified leads without paying for junk clicks. Owner tools feel honest.',
    name: 'Ramesh & Sunita',
    role: 'Independent owners, Pune',
  },
  {
    quote:
      'Commercial search with clear space types saved my team hours. Shortlist + share was the killer feature.',
    name: 'Vikram S.',
    role: 'Ops lead, Bengaluru',
  },
] as const

const badges = [
  'RERA-first mindset',
  'Owner verification',
  'Shortlist sync',
  'City & locality aware',
] as const
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-border bg-surface py-12 sm:py-16 md:py-20"
    aria-labelledby="social-proof-heading"
  >
    <div
      class="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-hero/10 blur-3xl motion-reduce:opacity-0"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
      <div
        v-motion
        class="mx-auto max-w-2xl text-center"
        :initial="{ opacity: 0, y: 14 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        }"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-hero">
          Loved by seekers & owners
        </p>
        <h2
          id="social-proof-heading"
          class="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          Built for clarity, not clutter
        </h2>
        <p class="mt-3 text-pretty text-muted">
          Real feedback from people who want fewer tabs, fewer forms, and more signal.
        </p>
      </div>

      <div
        class="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12"
      >
        <span
          v-for="(b, i) in badges"
          :key="b"
          v-motion
          class="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-heading shadow-sm"
          :initial="{ opacity: 0, scale: 0.92 }"
          :visible="{
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 400, damping: 24, delay: 40 + i * 40 },
          }"
        >
          {{ b }}
        </span>
      </div>

      <div
        class="mt-10 grid gap-5 md:grid-cols-3 md:gap-6"
      >
        <figure
          v-for="(q, index) in quotes"
          :key="q.name"
          v-motion
          class="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
          :initial="{ opacity: 0, y: 20 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 280,
              damping: 26,
              delay: 70 + index * 60,
            },
          }"
        >
          <div
            class="flex gap-0.5 text-amber-400"
            aria-label="5 star rating"
          >
            <span
              v-for="n in 5"
              :key="n"
              aria-hidden="true"
            >★</span>
          </div>
          <blockquote class="mt-3 flex-1 text-sm leading-relaxed text-heading">
            “{{ q.quote }}”
          </blockquote>
          <figcaption class="mt-4 border-t border-border pt-4">
            <p class="text-sm font-semibold text-heading">
              {{ q.name }}
            </p>
            <p class="text-xs text-muted">
              {{ q.role }}
            </p>
          </figcaption>
        </figure>
      </div>

      <div
        v-motion
        class="relative mt-14 overflow-hidden rounded-3xl border border-hero/20 bg-gradient-to-br from-hero via-hero to-hero-hover px-6 py-10 text-center shadow-xl sm:mt-16 sm:px-10 sm:py-12"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 24, delay: 120 },
        }"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-slate-900/20 blur-2xl"
          aria-hidden="true"
        />

        <p class="relative text-xs font-bold uppercase tracking-wider text-white/90">
          Ready when you are
        </p>
        <h3 class="relative mt-2 text-2xl font-bold text-white sm:text-3xl">
          List your property or upgrade to Premium
        </h3>
        <p class="relative mx-auto mt-3 max-w-xl text-pretty text-sm text-white/90 sm:text-base">
          Reach serious seekers with better placement, analytics, and owner tools — without spammy upsell noise.
        </p>
        <div
          class="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <NuxtLink
            to="/post-property"
            class="lb-btn-inverse justify-center !px-6 !py-3 !text-sm sm:!text-base"
          >
            Post property — free
          </NuxtLink>
          <NuxtLink
            to="/premium"
            class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Explore Premium
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
