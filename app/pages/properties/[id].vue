<script setup lang="ts">
const route = useRoute()

const id = computed(() => route.params.id as string)

const { branding } = useTheme()

useSeoMeta({
  title: () => `Property ${id.value} — ${branding.productName}`,
  description:
    'Listing detail — connect fields to your API when ready. This page is a layout placeholder.',
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <NuxtLink
      to="/properties"
      class="text-sm font-semibold text-hero hover:underline"
    >
      ← Back to listings
    </NuxtLink>

    <div class="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
      <p class="text-xs font-semibold uppercase tracking-wider text-hero">
        Listing detail
      </p>
      <h1 class="mt-2 text-2xl font-bold text-heading sm:text-3xl">
        Property <span class="tabular-nums text-muted">{{ id }}</span>
      </h1>
      <p class="mt-4 max-w-2xl text-muted leading-relaxed">
        Wire this route to your listing API: share slug or numeric id from search and shortlist links.
        Photos, map, owner CTA, and similar listings will live here.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink
          to="/shortlist"
          class="lb-btn-surface"
        >
          Saved homes
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="lb-btn-primary"
        >
          Contact support
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
