<script setup lang="ts">
useHead({ title: 'Premium — Live Bhoomi' })
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="text-2xl font-bold text-heading">Premium</h1>
    <p class="mt-3 text-body">
      Upgrade to unlock unlimited listings and premium tools. See full tiers and compare features on pricing.
    </p>
    <NuxtLink to="/pricing" class="mt-4 inline-block text-sm font-semibold text-hero hover:underline">
      View pricing plans →
    </NuxtLink>
    <NuxtLink to="/" class="mt-4 block text-sm font-semibold text-muted hover:text-hero">
      ← Back home
    </NuxtLink>
  </div>
</template>
