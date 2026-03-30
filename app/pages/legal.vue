<script setup lang="ts">
const { branding } = useTheme()

useSeoMeta({
  title: `Legal — ${branding.productName}`,
  description:
    'Privacy policy, terms of use, and how LiveBhoomi handles your data and marketplace responsibilities.',
})

const docs = [
  {
    title: 'Privacy policy',
    description:
      'What we collect, why we use it, cookies, retention, your choices, and how to reach us about personal data.',
    to: '/privacy',
    cta: 'Read privacy policy',
  },
  {
    title: 'Terms of use',
    description:
      'Rules for using the platform, listings and user content, disclaimers, liability limits, and governing law.',
    to: '/terms',
    cta: 'Read terms of use',
  },
] as const
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <nav class="text-[11px] font-medium text-white/70 sm:text-xs" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-white">
            Home
          </NuxtLink>
          <span class="mx-2 text-white/40" aria-hidden="true">/</span>
          <span class="text-white/90">Legal</span>
        </nav>
        <h1 class="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Legal
        </h1>
        <p class="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
          Policies that govern {{ branding.productName }} — how we treat personal information and how you may use our services.
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <ul class="grid gap-4 sm:gap-5">
        <li v-for="doc in docs" :key="doc.to">
          <NuxtLink
            :to="doc.to"
            class="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-hero/25 hover:shadow-md sm:p-6"
          >
            <h2 class="text-lg font-semibold text-heading group-hover:text-hero">
              {{ doc.title }}
            </h2>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ doc.description }}
            </p>
            <span
              class="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-hero"
            >
              {{ doc.cta }}
              <span aria-hidden="true" class="transition group-hover:translate-x-0.5">→</span>
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div
        class="mt-10 rounded-2xl border border-dashed border-border bg-nav-active/30 px-5 py-6 text-sm leading-relaxed text-muted dark:bg-hero/5"
      >
        <p class="font-medium text-heading">
          Not legal advice
        </p>
        <p class="mt-2">
          These pages describe how {{ branding.shortName }} intends to operate the product. They are not a substitute for independent legal, tax, or property advice. For property transactions, verify documents and regulatory status with qualified professionals.
        </p>
      </div>
    </div>
  </div>
</template>
