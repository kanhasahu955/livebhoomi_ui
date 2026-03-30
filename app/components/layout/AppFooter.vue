<script setup lang="ts">
const year = new Date().getFullYear()

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
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
  <footer class="border-t border-border bg-card mt-auto">
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
                class="text-sm text-heading/80 hover:text-hero transition"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="mt-10 flex flex-col gap-2 border-t border-border pt-8 text-center text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left"
      >
        <p>© {{ year }} Live Bhoomi. All rights reserved.</p>
        <p>Property listings are indicative; verify with sellers before transacting.</p>
      </div>
    </div>
  </footer>
</template>
