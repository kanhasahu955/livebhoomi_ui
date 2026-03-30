<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-heading sm:text-3xl">
      Property listings
    </h1>
    <p class="mt-2 text-muted">
      Filters from your home search are applied here (wire to API when ready).
    </p>
    <div
      v-if="Object.keys(route.query).length"
      class="mt-6 rounded-xl border border-border bg-card p-4 text-sm"
    >
      <p class="font-medium text-heading">
        Active filters
      </p>
      <ul class="mt-2 list-inside list-disc text-muted">
        <li v-for="(v, k) in route.query" :key="k">
          {{ k }}: {{ v }}
        </li>
      </ul>
    </div>
    <div
      v-else
      class="mt-8 rounded-xl border border-dashed border-border bg-nav-active/30 p-10 text-center text-muted"
    >
      <p>
        Use
        <NuxtLink to="/search" class="font-semibold text-hero underline decoration-hero/30 underline-offset-2">
          Search & query
        </NuxtLink>
        , the home hero search, or pick a journey from the header.
      </p>
    </div>
  </div>
</template>
