<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  blogCategoryLabels,
  postsByNewest,
  type BlogCategory,
} from '~/data/blogPosts'

const { branding } = useTheme()

useSeoMeta({
  title: `Blog — ${branding.productName}`,
  description:
    'Guides for buyers, renters, and owners — RERA, search tips, and marketplace best practices.',
})

const searchQuery = ref('')
const category = ref<'all' | BlogCategory>('all')

const categories = Object.entries(blogCategoryLabels) as [BlogCategory, string][]

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const filteredPosts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return postsByNewest().filter((p) => {
    if (category.value !== 'all' && p.category !== category.value) return false
    if (!q) return true
    const hay = `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase()
    return hay.includes(q)
  })
})

const featured = computed(() => {
  if (searchQuery.value.trim() || category.value !== 'all') return null
  const list = filteredPosts.value
  return list[0] ?? null
})

const gridPosts = computed(() => {
  const f = featured.value
  if (!f) return filteredPosts.value
  return filteredPosts.value.filter((p) => p.slug !== f.slug)
})

const chips = [
  'RERA & compliance',
  'Search & shortlist',
  'Owner playbook',
] as const

function clearFilters() {
  searchQuery.value = ''
  category.value = 'all'
}
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <!-- Hero -->
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_65%_-8%,rgba(255,255,255,0.2),transparent_52%)]"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div
          v-motion
          class="mx-auto max-w-3xl text-center"
          :initial="{ opacity: 0, y: 18 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 320, damping: 30 },
          }"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            {{ branding.shortName }} journal
          </p>
          <h1 class="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
            Blog & guides
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            Clear, practical writing for Indian property — search smarter, list honestly, and close with confidence.
          </p>
        </div>
        <div
          class="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2"
        >
          <span
            v-for="c in chips"
            :key="c"
            class="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >
            {{ c }}
          </span>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <!-- Toolbar -->
      <div
        v-motion
        class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        :initial="{ opacity: 0, y: 14 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 28, delay: 60 },
        }"
      >
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            Browse
          </p>
          <h2 class="mt-1 text-xl font-bold text-heading sm:text-2xl">
            Articles & playbooks
          </h2>
          <p class="mt-1 text-sm text-muted">
            Filter by audience or search tags and titles.
          </p>
        </div>
        <div class="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
          <LbInput
            v-model="searchQuery"
            placeholder="Search articles…"
            ui-class="w-full min-w-[min(100%,18rem)] sm:w-64"
          />
        </div>
      </div>

      <div
        class="mt-5 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Article category"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="category === 'all'"
          class="rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200"
          :class="
            category === 'all'
              ? 'border-hero bg-hero text-white shadow-md shadow-hero/25'
              : 'border-border bg-card text-heading hover:border-hero/30'
          "
          @click="category = 'all'"
        >
          All
        </button>
        <button
          v-for="[key, label] in categories"
          :key="key"
          type="button"
          role="tab"
          :aria-selected="category === key"
          class="rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-200"
          :class="
            category === key
              ? 'border-hero bg-hero text-white shadow-md shadow-hero/25'
              : 'border-border bg-card text-heading hover:border-hero/30'
          "
          @click="category = key"
        >
          {{ label }}
        </button>
      </div>

      <p
        v-if="filteredPosts.length === 0"
        class="mt-10 rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-muted"
      >
        No articles match your filters.
        <button
          type="button"
          class="mt-3 block w-full font-semibold text-hero hover:underline sm:inline sm:w-auto"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </p>

      <!-- Featured -->
      <NuxtLink
        v-if="featured"
        v-motion
        :to="`/blog/${featured.slug}`"
        class="group relative mt-10 block overflow-hidden rounded-3xl border border-hero/20 bg-gradient-to-br from-hero/[0.08] via-card to-sky-500/[0.05] p-1 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none dark:from-hero/15"
        :initial="{ opacity: 0, y: 22 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 280, damping: 26, delay: 80 },
        }"
      >
        <div class="rounded-[1.35rem] bg-card/95 p-6 backdrop-blur-sm sm:p-8 lg:flex lg:items-stretch lg:gap-10 dark:bg-card/90">
          <div class="flex-1">
            <span
              class="inline-flex rounded-full bg-hero/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-hero"
            >
              Latest
            </span>
            <time
              class="mt-3 block text-xs font-medium text-muted"
              :datetime="featured.date"
            >{{ formatDate(featured.date) }}</time>
            <h3 class="mt-2 text-2xl font-bold tracking-tight text-heading group-hover:text-hero sm:text-3xl">
              {{ featured.title }}
            </h3>
            <p class="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
              {{ featured.excerpt }}
            </p>
            <ul class="mt-5 space-y-2">
              <li
                v-for="(line, i) in featured.keyTakeaways.slice(0, 3)"
                :key="i"
                class="flex gap-2 text-sm text-body"
              >
                <span
                  class="mt-1.5 size-1.5 shrink-0 rounded-full bg-hero"
                  aria-hidden="true"
                />
                {{ line }}
              </li>
            </ul>
            <p class="mt-6 inline-flex items-center gap-1 text-sm font-bold text-hero">
              Read full article
              <svg
                class="size-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </div>
          <div
            class="mt-8 flex flex-wrap gap-2 lg:mt-0 lg:w-48 lg:flex-col lg:justify-center"
          >
            <span
              v-for="tag in featured.tags"
              :key="tag"
              class="rounded-lg border border-border bg-surface px-2.5 py-1 text-center text-xs font-medium text-heading dark:bg-surface/50"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>

      <!-- Grid -->
      <ul
        class="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6"
      >
        <li
          v-for="(post, index) in gridPosts"
          :key="post.slug"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 28,
              delay: 100 + index * 55,
            },
          }"
        >
          <NuxtLink
            :to="`/blog/${post.slug}`"
            class="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-hero/25 hover:shadow-lg motion-reduce:transform-none sm:p-6"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-full bg-nav-active px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-hero"
              >
                {{ blogCategoryLabels[post.category] }}
              </span>
              <time
                class="text-xs text-muted"
                :datetime="post.date"
              >{{ formatDate(post.date) }}</time>
            </div>
            <h3 class="mt-3 text-lg font-bold text-heading group-hover:text-hero">
              {{ post.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {{ post.excerpt }}
            </p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="tag in post.tags.slice(0, 3)"
                :key="tag"
                class="rounded-md border border-border/80 px-2 py-0.5 text-[11px] font-medium text-muted"
              >
                {{ tag }}
              </span>
            </div>
            <p class="mt-4 text-xs font-semibold text-hero">
              {{ post.readMinutes }} min read →
            </p>
          </NuxtLink>
        </li>
      </ul>

      <!-- Bottom CTA -->
      <div
        v-motion
        class="mt-14 rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:mt-16 sm:p-10"
        :initial="{ opacity: 0, y: 16 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 280, damping: 26, delay: 120 },
        }"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-hero">
          Next step
        </p>
        <h3 class="mt-2 text-xl font-bold text-heading sm:text-2xl">
          Put the guides to work on LiveBhoomi
        </h3>
        <p class="mx-auto mt-2 max-w-lg text-sm text-muted">
          Search with intent, shortlist with notes, or list your property — the product is built for these habits.
        </p>
        <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink
            to="/#home-search"
            class="lb-btn-primary justify-center"
          >
            Start search
          </NuxtLink>
          <NuxtLink
            to="/post-property"
            class="lb-btn-surface justify-center"
          >
            Post property
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
