<script setup lang="ts">
import { contactConfig } from '~/config/contact.config'

const { branding } = useTheme()

useSeoMeta({
  title: `About us — ${branding.productName}`,
  description: `${branding.shortName} is an India-focused property marketplace — verified listings, clear search, and tools for buyers, renters, and owners.`,
})

const pillars = [
  {
    title: 'Clarity first',
    body: 'Filters that match how people actually search — buy, rent, PG, commercial, and plots without resetting your journey.',
  },
  {
    title: 'Trust by design',
    body: 'Verification signals, RERA-aware guidance, and honest owner tools so seekers and listers meet with context.',
  },
  {
    title: 'Built for scale',
    body: 'From Hyderabad to pan-India growth — performance, accessibility, and mobile-first flows stay non-negotiable.',
  },
] as const

const milestones = [
  { year: 'Today', label: 'Active marketplace', detail: 'Listings, shortlist, and owner dashboard in continuous iteration.' },
  { year: 'Next', label: 'Deeper verification', detail: 'Stronger checks and analytics for serious seekers and professional owners.' },
] as const
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <!-- Hero -->
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div
          v-motion
          class="mx-auto max-w-3xl text-center"
          :initial="{ opacity: 0, y: 16 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 320, damping: 30 },
          }"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            About the company
          </p>
          <h1 class="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {{ branding.productName }}
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg">
            We’re building a calmer, clearer way to discover property in India — for everyone who buys, rents, works, stays, or lists.
          </p>
          <p class="mx-auto mt-2 text-sm font-medium text-white/75">
            {{ branding.tagline }}
          </p>
        </div>
        <div
          class="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2"
        >
          <span
            class="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >India-first</span>
          <span
            class="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >Seekers & owners</span>
          <span
            class="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >Long-term product</span>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <!-- Mission -->
      <section
        class="mx-auto max-w-3xl text-center"
        aria-labelledby="about-mission-heading"
      >
        <h2
          id="about-mission-heading"
          class="text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          Our mission
        </h2>
        <p class="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Property decisions are some of the biggest people make. {{ branding.shortName }} exists to reduce noise — with search that respects intent, listings that earn trust, and support when something breaks.
        </p>
        <p class="mt-4 text-pretty text-base leading-relaxed text-muted">
          We’re not chasing vanity metrics. We care about serious seekers, honest owners, and agents who play by the rules — especially RERA and local compliance norms.
        </p>
      </section>

      <!-- Pillars -->
      <section
        class="mt-14 sm:mt-16"
        aria-labelledby="about-pillars-heading"
      >
        <div class="text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            How we work
          </p>
          <h2
            id="about-pillars-heading"
            class="mt-2 text-2xl font-bold text-heading sm:text-3xl"
          >
            Principles behind the product
          </h2>
        </div>
        <div
          class="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6"
        >
          <LbCard
            v-for="(p, i) in pillars"
            :key="p.title"
            v-motion
            :shadow="'hover'"
            ui-class="h-full transition-shadow duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            :initial="{ opacity: 0, y: 18 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 40 + i * 55 },
            }"
          >
            <h3 class="text-base font-semibold text-heading">
              {{ p.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ p.body }}
            </p>
          </LbCard>
        </div>
      </section>

      <!-- What we ship -->
      <section
        class="mt-14 rounded-3xl border border-border bg-card p-6 shadow-sm sm:mt-16 sm:p-10"
        aria-labelledby="about-product-heading"
      >
        <h2
          id="about-product-heading"
          class="text-xl font-bold text-heading sm:text-2xl"
        >
          What {{ branding.shortName }} is today
        </h2>
        <p class="mt-3 max-w-3xl text-muted leading-relaxed">
          A single platform for multiple journeys — not a one-size-fits-all search box bolted onto legacy data.
        </p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2">
          <li
            v-for="item in [
              'Buy, rent, commercial, PG, and plots — each with filters that make sense.',
              'Shortlist, alerts, and owner / agent touchpoints without losing context.',
              'Verification signals and guidance — we point you to what to check, not hype.',
              'Owner tools: post, manage, and grow visibility with transparent options.',
            ]"
            :key="item"
            class="flex gap-3 rounded-2xl border border-border/80 bg-surface/50 px-4 py-3 text-sm leading-relaxed text-body dark:bg-surface/30"
          >
            <span
              class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-hero/15 text-hero"
              aria-hidden="true"
            >
              <svg
                class="size-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5 13 4 4L19 7"
                />
              </svg>
            </span>
            {{ item }}
          </li>
        </ul>
      </section>

      <!-- Roadmap teaser -->
      <section
        class="mt-14 sm:mt-16"
        aria-labelledby="about-roadmap-heading"
      >
        <div class="text-center">
          <h2
            id="about-roadmap-heading"
            class="text-2xl font-bold text-heading sm:text-3xl"
          >
            Where we’re headed
          </h2>
          <p class="mx-auto mt-2 max-w-2xl text-muted">
            Public roadmap details will land on the blog — here’s the direction in plain language.
          </p>
        </div>
        <ol class="mx-auto mt-10 max-w-2xl space-y-4">
          <li
            v-for="(m, i) in milestones"
            :key="m.year"
            v-motion
            class="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            :initial="{ opacity: 0, x: -12 }"
            :visible="{
              opacity: 1,
              x: 0,
              transition: { type: 'spring', stiffness: 280, damping: 26, delay: 50 + i * 70 },
            }"
          >
            <span
              class="flex size-12 shrink-0 flex-col items-center justify-center rounded-xl bg-hero text-center text-xs font-bold leading-tight text-white"
            >
              {{ m.year }}
            </span>
            <div>
              <p class="font-semibold text-heading">
                {{ m.label }}
              </p>
              <p class="mt-1 text-sm text-muted leading-relaxed">
                {{ m.detail }}
              </p>
            </div>
          </li>
        </ol>
      </section>

      <!-- Location -->
      <section
        class="mt-14 rounded-2xl border border-dashed border-border bg-nav-active/20 px-6 py-8 text-center dark:bg-hero/5 sm:mt-16"
        aria-labelledby="about-location-heading"
      >
        <h2
          id="about-location-heading"
          class="text-lg font-semibold text-heading"
        >
          Base of operations
        </h2>
        <p class="mx-auto mt-2 max-w-lg text-sm text-muted leading-relaxed">
          {{ contactConfig.officeDetail }}
        </p>
        <p class="mt-3 text-base font-semibold text-heading">
          {{ contactConfig.officeHeadline }}
        </p>
      </section>

      <!-- CTA -->
      <div
        v-motion
        class="relative mt-14 overflow-hidden rounded-3xl border border-hero/20 bg-gradient-to-br from-hero via-hero to-hero-hover px-6 py-10 text-center shadow-xl sm:mt-16 sm:px-10 sm:py-12"
        :initial="{ opacity: 0, y: 20 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 24, delay: 80 },
        }"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl"
          aria-hidden="true"
        />
        <h2 class="relative text-xl font-bold text-white sm:text-2xl">
          Work with us or say hello
        </h2>
        <p class="relative mx-auto mt-3 max-w-lg text-sm text-white/90 sm:text-base">
          Questions about partnerships, press, or careers — we read every message.
        </p>
        <div class="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <NuxtLink
            to="/contact"
            class="lb-btn-inverse justify-center !px-6 !py-3 !text-sm sm:!text-base"
          >
            Contact
          </NuxtLink>
          <NuxtLink
            to="/careers"
            class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Careers
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/95 hover:bg-white/10"
          >
            Blog
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
