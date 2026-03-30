<script setup lang="ts">
import { blogPosts } from '~/data/blogPosts'

/** First article — deep-link example for “detail” */
const sampleArticleSlug = blogPosts[0]?.slug ?? 'rera-checklist-before-you-buy'

type Resource = {
  label: string
  description: string
  to: string
  icon: 'search' | 'mail' | 'briefcase' | 'book' | 'building' | 'file'
}

const resources: Resource[] = [
  {
    label: 'Search & query',
    description: 'Jump to the hero search or open the full listings view with your filters.',
    to: '/#home-search',
    icon: 'search',
  },
  {
    label: 'Contact & help',
    description: 'Billing, bugs, partnership — reach the team from a single place.',
    to: '/contact',
    icon: 'mail',
  },
  {
    label: 'Careers',
    description: 'Product, engineering, and marketplace roles — build with us.',
    to: '/careers',
    icon: 'briefcase',
  },
  {
    label: 'Blog',
    description: 'Guides for buyers, renters, and owners — updated regularly.',
    to: '/blog',
    icon: 'book',
  },
  {
    label: 'Company',
    description: 'Mission, team, and how LiveBhoomi fits the Indian property stack.',
    to: '/about',
    icon: 'building',
  },
  {
    label: 'Listing detail',
    description: 'Sample property page — plug in your API and routing id/slug.',
    to: '/properties/sample-listing',
    icon: 'file',
  },
]

const featuredArticle = {
  to: `/blog/${sampleArticleSlug}`,
  label: 'Featured read',
  hint: 'Open full article',
}
</script>

<template>
  <section
    class="border-b border-border bg-card py-12 sm:py-16 md:py-20"
    aria-labelledby="resources-grid-heading"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
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
          Help & company
        </p>
        <h2
          id="resources-grid-heading"
          class="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          Everything you need in one place
        </h2>
        <p class="mt-3 text-pretty text-muted">
          Same destinations as the header and footer — search, talk to us, grow your career, read the blog, or preview a listing detail page.
        </p>
      </div>

      <div
        class="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="(item, index) in resources"
          :key="item.to"
          v-motion
          :to="item.to"
          class="group flex gap-4 rounded-2xl border border-border bg-surface/80 p-5 shadow-sm outline-none backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/25 hover:shadow-md focus-visible:ring-2 focus-visible:ring-hero/40 motion-reduce:transform-none dark:bg-surface/40"
          :initial="{ opacity: 0, y: 18 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 28,
              delay: 40 + index * 40,
            },
          }"
        >
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hero/10 text-hero transition duration-300 group-hover:bg-hero/15"
            aria-hidden="true"
          >
            <svg
              v-if="item.icon === 'search'"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <path
                d="m21 21-4.3-4.3"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else-if="item.icon === 'mail'"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
              />
              <path d="m22 7-10 6L2 7" />
            </svg>
            <svg
              v-else-if="item.icon === 'briefcase'"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect
                x="2"
                y="7"
                width="20"
                height="14"
                rx="2"
                ry="2"
              />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
            <svg
              v-else-if="item.icon === 'book'"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
            <svg
              v-else-if="item.icon === 'building'"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
              <path d="M6 12h12" />
              <path d="M6 8h12" />
              <path d="M10 22v-4h4v4" />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6" />
            </svg>
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-semibold text-heading group-hover:text-hero">{{ item.label }}</span>
            <span class="mt-1 block text-sm leading-relaxed text-muted">{{ item.description }}</span>
            <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-hero">
              Go
              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
            </span>
          </span>
        </NuxtLink>
      </div>

      <div
        v-motion
        class="mt-10 rounded-2xl border border-hero/15 bg-hero/5 p-5 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        :initial="{ opacity: 0, y: 12 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 280, damping: 28, delay: 100 },
        }"
      >
        <div>
          <p class="text-sm font-semibold text-heading">
            {{ featuredArticle.label }}
          </p>
          <p class="mt-1 text-sm text-muted">
            Deep-link example — same pattern as listing detail for your CMS or API-driven posts.
          </p>
        </div>
        <NuxtLink
          :to="featuredArticle.to"
          class="lb-btn-primary mt-4 w-full shrink-0 justify-center sm:mt-0 sm:w-auto"
        >
          {{ featuredArticle.hint }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
