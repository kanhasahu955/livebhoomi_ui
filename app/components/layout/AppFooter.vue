<script setup lang="ts">
const year = new Date().getFullYear()

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Contact', to: '/contact' },
      { label: 'Interactive map', to: '/map' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'For owners',
    links: [
      { label: 'Post property', to: '/post-property' },
      { label: 'Manage listings', to: '/dashboard' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Overview', to: '/legal' },
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of use', to: '/terms' },
    ],
  },
] as const
</script>

<template>
  <footer class="relative mt-auto border-t border-border bg-card">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hero/35 to-transparent"
      aria-hidden="true"
    />
    <div
      class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
    >
      <div
        class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
      >
        <div class="lg:col-span-1">
          <p class="text-sm font-semibold text-heading">
            Live Bhoomi
          </p>
          <p class="mt-2 max-w-xs text-sm text-muted leading-relaxed">
            Find verified homes, offices, and PGs across India — search, shortlist, and connect with trusted agents.
          </p>
        </div>
        <div
          v-for="col in cols"
          :key="col.title"
        >
          <p class="text-xs font-semibold uppercase tracking-wide text-muted">
            {{ col.title }}
          </p>
          <ul class="mt-4 space-y-2">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group text-sm text-heading/80 transition hover:text-hero"
              >
                <span class="border-b border-transparent pb-0.5 transition group-hover:border-hero/40">
                  {{ link.label }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="mt-10 flex flex-col gap-2 border-t border-border px-1 pt-8 text-center text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-0 sm:text-left"
      >
        <p>© {{ year }} Live Bhoomi. All rights reserved.</p>
        <p>Property listings are indicative; verify with sellers before transacting.</p>
      </div>
    </div>
  </footer>
</template>
