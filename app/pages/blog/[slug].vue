<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import {
  adjacentPosts,
  blogCategoryLabels,
  getPostBySlug,
  relatedPosts,
} from '~/data/blogPosts'

const route = useRoute()
const post = getPostBySlug(route.params.slug as string)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const { branding } = useTheme()
const requestURL = useRequestURL()

useSeoMeta({
  title: `${post.title} — ${branding.productName}`,
  description: post.excerpt,
})

const canonicalUrl = computed(
  () => `${requestURL.origin}/blog/${post.slug}`,
)

const { y: scrollY } = useWindowScroll()
const readProgress = computed(() => {
  if (typeof document === 'undefined') return 0
  const el = document.documentElement
  const max = el.scrollHeight - el.clientHeight
  return max > 0 ? Math.min(100, (scrollY.value / max) * 100) : 0
})

const toc = computed(() =>
  post.paragraphs.map((p, i) => {
    const sentence = p.split(/(?<=[.!?])\s/)[0] ?? p
    const short =
      sentence.length > 56 ? `${sentence.slice(0, 54)}…` : sentence
    return { id: `section-${i}`, label: short }
  }),
)

const related = computed(() => relatedPosts(post.slug, 2))
const { prev, next } = adjacentPosts(post.slug)

const copied = ref(false)

async function copyLink() {
  try {
    await navigator.clipboard.writeText(canonicalUrl.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    /* ignore */
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <!-- Reading progress -->
    <div
      class="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-1 bg-slate-900/10 dark:bg-white/10"
      aria-hidden="true"
    >
      <div
        class="h-full bg-hero motion-reduce:transition-none"
        :style="{
          width: `${readProgress}%`,
          transition: 'width 120ms linear',
        }"
      />
    </div>

    <article>
      <!-- Article hero -->
      <div
        class="relative overflow-hidden border-b border-white/10"
        style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(255,255,255,0.18),transparent_50%)]"
          aria-hidden="true"
        />
        <div class="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <nav
            v-motion
            class="text-sm text-white/80"
            aria-label="Breadcrumb"
            :initial="{ opacity: 0, y: 8 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 400, damping: 32 },
            }"
          >
            <NuxtLink
              to="/"
              class="font-medium hover:text-white hover:underline"
            >Home</NuxtLink>
            <span class="mx-1.5 text-white/50">/</span>
            <NuxtLink
              to="/blog"
              class="font-medium hover:text-white hover:underline"
            >Blog</NuxtLink>
            <span class="mx-1.5 text-white/50">/</span>
            <span class="text-white/90">{{ blogCategoryLabels[post.category] }}</span>
          </nav>

          <header
            v-motion
            class="mt-8"
            :initial="{ opacity: 0, y: 16 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 320, damping: 30, delay: 40 },
            }"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
              >
                {{ blogCategoryLabels[post.category] }}
              </span>
              <time
                class="text-sm text-white/75"
                :datetime="post.date"
              >{{ formatDate(post.date) }}</time>
              <span class="text-sm text-white/60">·</span>
              <span class="text-sm text-white/75">{{ post.readMinutes }} min read</span>
            </div>
            <h1 class="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
              {{ post.title }}
            </h1>
            <p class="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg">
              {{ post.excerpt }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                @click="copyLink"
              >
                <svg
                  class="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {{ copied ? 'Copied link' : 'Copy link' }}
              </button>
              <a
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonicalUrl)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Share on X
              </a>
            </div>
          </header>
        </div>
      </div>

      <div
        class="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12 lg:px-8 lg:py-12 xl:grid-cols-[minmax(0,1fr)_17.5rem]"
      >
        <!-- Body -->
        <div>
          <div
            v-motion
            class="rounded-2xl border border-hero/15 bg-gradient-to-br from-hero/[0.06] to-card p-5 shadow-sm dark:from-hero/12 sm:p-6"
            :initial="{ opacity: 0, y: 12 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 80 },
            }"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-hero">
              Key takeaways
            </p>
            <ul class="mt-3 space-y-2">
              <li
                v-for="(line, i) in post.keyTakeaways"
                :key="i"
                class="flex gap-2 text-sm leading-relaxed text-body"
              >
                <span
                  class="mt-2 size-1.5 shrink-0 rounded-full bg-hero"
                  aria-hidden="true"
                />
                {{ line }}
              </li>
            </ul>
          </div>

          <div class="mt-10 space-y-8">
            <section
              v-for="(para, i) in post.paragraphs"
              :key="i"
              v-motion
              :id="`section-${i}`"
              class="scroll-mt-28"
              :initial="{ opacity: 0, y: 16 }"
              :visible="{
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 280,
                  damping: 28,
                  delay: 60 + i * 40,
                },
              }"
            >
              <p class="text-base leading-[1.75] text-body sm:text-[1.05rem]">
                {{ para }}
              </p>
            </section>
          </div>

          <!-- Prev / next -->
          <nav
            v-motion
            class="mt-12 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
            aria-label="Adjacent articles"
            :initial="{ opacity: 0 }"
            :visible="{
              opacity: 1,
              transition: { delay: 200 },
            }"
          >
            <NuxtLink
              v-if="prev"
              :to="`/blog/${prev.slug}`"
              class="group rounded-2xl border border-border bg-card p-4 transition hover:border-hero/25 hover:shadow-md"
            >
              <p class="text-xs font-semibold uppercase tracking-wide text-muted">
                Previous
              </p>
              <p class="mt-1 font-semibold text-heading group-hover:text-hero">
                {{ prev.title }}
              </p>
            </NuxtLink>
            <div
              v-else
              class="hidden sm:block"
            />
            <NuxtLink
              v-if="next"
              :to="`/blog/${next.slug}`"
              class="group rounded-2xl border border-border bg-card p-4 text-right transition hover:border-hero/25 hover:shadow-md sm:col-start-2"
            >
              <p class="text-xs font-semibold uppercase tracking-wide text-muted">
                Next
              </p>
              <p class="mt-1 font-semibold text-heading group-hover:text-hero">
                {{ next.title }}
              </p>
            </NuxtLink>
          </nav>

          <div
            v-motion
            class="mt-10 rounded-3xl border border-hero/20 bg-gradient-to-br from-hero to-hero-hover px-6 py-8 text-center text-white shadow-lg sm:py-10"
            :initial="{ opacity: 0, y: 14 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 260, damping: 24 },
            }"
          >
            <h2 class="text-lg font-bold sm:text-xl">
              Questions about this topic?
            </h2>
            <p class="mx-auto mt-2 max-w-md text-sm text-white/90">
              Talk to us — or use the in-app assistant from any page.
            </p>
            <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <NuxtLink
                to="/contact"
                class="lb-btn-inverse justify-center"
              >
                Contact
              </NuxtLink>
              <NuxtLink
                to="/blog"
                class="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10"
              >
                All articles
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Sidebar: TOC + related -->
        <aside
          class="lg:sticky lg:top-28 lg:self-start"
          aria-label="Article tools"
        >
          <div
            v-motion
            class="rounded-2xl border border-border bg-card p-5 shadow-sm"
            :initial="{ opacity: 0, x: 12 }"
            :visible="{
              opacity: 1,
              x: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 100 },
            }"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-hero">
              On this page
            </p>
            <ol class="mt-3 space-y-2 border-t border-border pt-3">
              <li
                v-for="item in toc"
                :key="item.id"
              >
                <a
                  :href="`#${item.id}`"
                  class="text-sm leading-snug text-muted transition hover:text-hero"
                >
                  {{ item.label }}
                </a>
              </li>
            </ol>
          </div>

          <div
            v-if="related.length"
            v-motion
            class="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm"
            :initial="{ opacity: 0, x: 12 }"
            :visible="{
              opacity: 1,
              x: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 140 },
            }"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-hero">
              Related
            </p>
            <ul class="mt-3 space-y-3">
              <li
                v-for="r in related"
                :key="r.slug"
              >
                <NuxtLink
                  :to="`/blog/${r.slug}`"
                  class="group block text-sm font-semibold text-heading hover:text-hero"
                >
                  {{ r.title }}
                  <span class="mt-0.5 block text-xs font-normal text-muted">
                    {{ blogCategoryLabels[r.category] }} · {{ r.readMinutes }} min
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  </div>
</template>
