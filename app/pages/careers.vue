<script setup lang="ts">
import { computed, ref } from 'vue'
import { contactConfig } from '~/config/contact.config'

const { branding } = useTheme()

useSeoMeta({
  title: `Careers — ${branding.productName}`,
  description: `Build with ${branding.shortName}: engineering, product, and marketplace roles in India — hybrid-friendly, impact-driven, and craft-minded.`,
})

type Dept = 'all' | 'engineering' | 'product' | 'design' | 'operations'

type Role = {
  id: string
  title: string
  dept: Exclude<Dept, 'all'>
  location: string
  type: string
  summary: string
  stack?: string
}

const departments: { id: Dept; label: string }[] = [
  { id: 'all', label: 'All roles' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'product', label: 'Product' },
  { id: 'design', label: 'Design' },
  { id: 'operations', label: 'Operations' },
]

const roles: Role[] = [
  {
    id: 'fe-senior',
    title: 'Senior Frontend Engineer',
    dept: 'engineering',
    location: 'Hyderabad · Hybrid',
    type: 'Full-time',
    summary:
      'Own Nuxt/Vue experiences end-to-end — performance, accessibility, and design-system quality for seekers and owners.',
    stack: 'Vue 3, Nuxt, TypeScript, Tailwind',
  },
  {
    id: 'be-mid',
    title: 'Backend Engineer (Node)',
    dept: 'engineering',
    location: 'Hyderabad · Hybrid',
    type: 'Full-time',
    summary:
      'APIs, data modelling, and reliability for listings, search, and owner workflows at marketplace scale.',
    stack: 'Node, TypeScript, PostgreSQL, Redis',
  },
  {
    id: 'pm-growth',
    title: 'Product Manager — Growth',
    dept: 'product',
    location: 'India · Remote-friendly',
    type: 'Full-time',
    summary:
      'Funnels, experiments, and onboarding — connect owner supply with serious demand without spammy growth hacks.',
  },
  {
    id: 'product-analyst',
    title: 'Product Analyst',
    dept: 'product',
    location: 'Hyderabad · Hybrid',
    type: 'Full-time',
    summary:
      'Metrics, cohort views, and narrative dashboards that help teams ship with evidence, not opinions.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    dept: 'design',
    location: 'India · Remote-friendly',
    type: 'Full-time',
    summary:
      'Flows for search, shortlist, and owner tools — systems thinking, prototyping, and tight collaboration with eng.',
  },
  {
    id: 'ops-listings',
    title: 'Marketplace Operations — Listings quality',
    dept: 'operations',
    location: 'Hyderabad',
    type: 'Full-time',
    summary:
      'Playbooks for verification, fraud signals, and owner education — keep the catalogue trustworthy as we scale.',
  },
]

const deptFilter = ref<Dept>('all')

const filteredRoles = computed(() =>
  deptFilter.value === 'all'
    ? roles
    : roles.filter((r) => r.dept === deptFilter.value),
)

function applyMailto(role: Role) {
  const subject = encodeURIComponent(`Careers — ${role.title}`)
  const body = encodeURIComponent(
    `Hi LiveBhoomi team,\n\nI’m applying for: ${role.title}\n\nLinkedIn / portfolio:\n\n`,
  )
  return `mailto:${contactConfig.supportEmail}?subject=${subject}&body=${body}`
}

const perks = [
  {
    title: 'Impact you can see',
    body: 'Ship to real users across cities — search, trust, and owner tools that change how India finds space.',
  },
  {
    title: 'Craft & clarity',
    body: 'We bias toward readable systems, honest UX, and documentation — fewer hero projects, more compounding work.',
  },
  {
    title: 'Hybrid-friendly',
    body: 'Core collaboration in Hyderabad with remote flexibility for roles where it makes sense.',
  },
  {
    title: 'Learning budget',
    body: 'Courses, conferences, and books — grow the craft that matches your lane.',
  },
  {
    title: 'Health & time',
    body: 'Competitive coverage where applicable and respect for weekends — sustainable pace beats burn.',
  },
  {
    title: 'Transparent reviews',
    body: 'Clear expectations, regular feedback, and growth paths tied to outcomes — not politics.',
  },
] as const

const processSteps = [
  {
    step: '01',
    title: 'Apply',
    body: 'Send your CV and links — tell us what you’ve shipped and what you want next.',
  },
  {
    step: '02',
    title: 'Conversation',
    body: 'Short intro with hiring manager — goals, scope, and how you like to work.',
  },
  {
    step: '03',
    title: 'Skills deep-dive',
    body: 'Take-home or live session tailored to the role — no trick puzzles, relevant work samples.',
  },
  {
    step: '04',
    title: 'Offer & onboarding',
    body: 'Aligned on role, comp, and start — structured first month with buddy and docs.',
  },
] as const

const faqs = [
  {
    q: 'Do you hire fresh graduates?',
    a: 'Sometimes, for internships and junior tracks — watch this page and our blog for cohort announcements. Experienced hires are our default for most product and eng roles today.',
  },
  {
    q: 'Is relocation required?',
    a: 'Many roles are hybrid with presence in Hyderabad for collaboration. Fully remote is possible for select positions — say so in your note and we’ll align.',
  },
  {
    q: 'What should I include in my application?',
    a: 'CV, links to work (GitHub, Figma, writing), and a short paragraph on a product or system you’re proud of — what problem it solved and your role.',
  },
  {
    q: 'How long does the process take?',
    a: 'Typically 2–4 weeks from first reply to offer, depending on schedules. We’ll keep you posted at each step.',
  },
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
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_30%_-10%,rgba(255,255,255,0.18),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl motion-reduce:opacity-60"
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
            Join {{ branding.shortName }}
          </p>
          <h1 class="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Build the future of property in India
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg">
            Small team, high bar — product, engineering, design, and ops working on search, trust, and owner tools that millions will feel.
          </p>
        </div>

        <div
          v-motion
          class="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:mx-auto sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3"
          :initial="{ opacity: 0, y: 12 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 28, delay: 100 },
          }"
        >
          <a
            href="#open-roles"
            class="lb-btn-inverse justify-center px-6 py-3 text-sm sm:inline-flex"
          >
            View open roles
          </a>
          <NuxtLink
            to="/about"
            class="inline-flex items-center justify-center rounded-full border-2 border-white/75 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Our story
          </NuxtLink>
        </div>

        <div
          class="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2 sm:mt-10"
        >
          <span
            v-for="tag in ['High ownership', 'Craft-led', 'India scale']"
            :key="tag"
            class="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <!-- Perks -->
      <section aria-labelledby="careers-perks-heading">
        <div
          v-motion
          class="mx-auto max-w-2xl text-center"
          :initial="{ opacity: 0, y: 12 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            Why join
          </p>
          <h2
            id="careers-perks-heading"
            class="mt-2 text-2xl font-bold text-heading sm:text-3xl"
          >
            What we offer
          </h2>
          <p class="mt-3 text-pretty text-muted">
            Tangible benefits and the intangible: respect for your time and a mission worth showing up for.
          </p>
        </div>

        <div
          class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          <div
            v-for="(p, i) in perks"
            :key="p.title"
            v-motion
            class="rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-hero/20 hover:shadow-md motion-reduce:transform-none"
            :initial="{ opacity: 0, y: 20 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 40 + i * 45 },
            }"
          >
            <div
              class="flex size-10 items-center justify-center rounded-xl bg-hero/10 text-hero"
              aria-hidden="true"
            >
              <svg
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5 13 4 4L19 7"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-base font-semibold text-heading">
              {{ p.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ p.body }}
            </p>
          </div>
        </div>
      </section>

      <!-- Open roles -->
      <section
        id="open-roles"
        class="mt-16 scroll-mt-24 sm:mt-20"
        aria-labelledby="careers-roles-heading"
      >
        <div
          v-motion
          class="mx-auto max-w-2xl text-center"
          :initial="{ opacity: 0, y: 12 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
          }"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            Hiring
          </p>
          <h2
            id="careers-roles-heading"
            class="mt-2 text-2xl font-bold text-heading sm:text-3xl"
          >
            Open roles
          </h2>
          <p class="mt-3 text-pretty text-muted">
            Filter by team — every listing links to a pre-filled email so nothing gets lost in the inbox.
          </p>
        </div>

        <div
          v-motion
          class="mt-8 flex flex-wrap justify-center gap-2"
          :initial="{ opacity: 0, scale: 0.98 }"
          :visible="{
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 400, damping: 28, delay: 60 },
          }"
          role="tablist"
          aria-label="Filter by department"
        >
          <button
            v-for="d in departments"
            :key="d.id"
            type="button"
            role="tab"
            :aria-selected="deptFilter === d.id"
            class="rounded-full border px-4 py-2 text-sm font-semibold transition duration-200"
            :class="
              deptFilter === d.id
                ? 'border-hero bg-hero text-white shadow-md shadow-hero/25'
                : 'border-border bg-card text-heading hover:border-hero/30 hover:bg-nav-active/50'
            "
            @click="deptFilter = d.id"
          >
            {{ d.label }}
          </button>
        </div>

        <ul class="mt-10 grid list-none gap-4 p-0 sm:gap-5">
          <li
            v-for="(role, index) in filteredRoles"
            :key="`${deptFilter}-${role.id}`"
            v-motion
            class="rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-300 hover:border-hero/20 hover:shadow-md sm:p-6"
            :initial="{ opacity: 0, y: 16 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 280, damping: 26, delay: 30 + index * 40 },
            }"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    class="rounded-full bg-hero/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-hero"
                  >
                    {{ role.dept }}
                  </span>
                  <span class="text-xs text-muted">{{ role.type }}</span>
                </div>
                <h3 class="mt-2 text-lg font-bold text-heading sm:text-xl">
                  {{ role.title }}
                </h3>
                <p class="mt-1 text-sm font-medium text-muted">
                  {{ role.location }}
                </p>
                <p class="mt-3 text-sm leading-relaxed text-body">
                  {{ role.summary }}
                </p>
                <p
                  v-if="role.stack"
                  class="mt-3 text-xs font-medium text-muted"
                >
                  Stack: {{ role.stack }}
                </p>
              </div>
              <div class="flex shrink-0 flex-col gap-2 sm:items-end">
                <a
                  :href="applyMailto(role)"
                  class="lb-btn-primary w-full justify-center whitespace-nowrap sm:w-auto"
                >
                  Apply by email
                </a>
                <NuxtLink
                  to="/contact"
                  class="text-center text-sm font-semibold text-hero hover:underline sm:text-right"
                >
                  Or use Contact form →
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>

        <p
          v-if="filteredRoles.length === 0"
          class="mt-8 rounded-2xl border border-dashed border-border bg-nav-active/20 py-10 text-center text-sm text-muted"
        >
          No roles in this filter right now — try “All roles” or email us with your background; we often hire ahead of public posts.
        </p>
      </section>

      <!-- Process -->
      <section
        class="mt-16 sm:mt-20"
        aria-labelledby="careers-process-heading"
      >
        <div class="text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            How we hire
          </p>
          <h2
            id="careers-process-heading"
            class="mt-2 text-2xl font-bold text-heading sm:text-3xl"
          >
            Simple, respectful process
          </h2>
        </div>
        <ol
          class="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          <li
            v-for="(s, i) in processSteps"
            :key="s.step"
            v-motion
            class="relative rounded-2xl border border-border bg-card p-5 text-left shadow-sm"
            :initial="{ opacity: 0, y: 22 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 260, damping: 26, delay: 50 + i * 65 },
            }"
          >
            <span
              class="inline-flex size-10 items-center justify-center rounded-xl bg-hero text-sm font-bold text-white shadow-md"
            >{{ s.step }}</span>
            <h3 class="mt-4 text-base font-semibold text-heading">
              {{ s.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ s.body }}
            </p>
          </li>
        </ol>
      </section>

      <!-- FAQ -->
      <section
        class="mx-auto mt-16 max-w-3xl sm:mt-20"
        aria-labelledby="careers-faq-heading"
      >
        <div class="text-center">
          <h2
            id="careers-faq-heading"
            class="text-2xl font-bold text-heading sm:text-3xl"
          >
            FAQ
          </h2>
          <p class="mt-2 text-sm text-muted">
            Still unsure? We’re friendly — ask on Contact.
          </p>
        </div>
        <ul class="mt-8 space-y-3">
          <li
            v-for="(item, i) in faqs"
            :key="i"
          >
            <details
              class="group rounded-2xl border border-border bg-card shadow-sm open:border-hero/20 open:shadow-md"
            >
              <summary
                class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-heading sm:text-base"
              >
                {{ item.q }}
                <svg
                  class="size-5 shrink-0 text-muted transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </summary>
              <div class="border-t border-border px-5 pb-4 pt-2 text-sm leading-relaxed text-muted">
                {{ item.a }}
              </div>
            </details>
          </li>
        </ul>
      </section>

      <!-- CTA -->
      <div
        v-motion
        class="relative mt-16 overflow-hidden rounded-3xl border border-hero/20 bg-gradient-to-br from-hero via-hero to-hero-hover px-6 py-10 text-center shadow-xl sm:mt-20 sm:px-10 sm:py-12"
        :initial="{ opacity: 0, y: 24 }"
        :visible="{
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 24, delay: 80 },
        }"
      >
        <div
          class="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <h2 class="relative text-xl font-bold text-white sm:text-2xl">
          Don’t see your role?
        </h2>
        <p class="relative mx-auto mt-3 max-w-lg text-sm text-white/90 sm:text-base">
          Send a general application — we keep a talent pool for upcoming squads and contract work.
        </p>
        <div class="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a
            :href="`mailto:${contactConfig.supportEmail}?subject=${encodeURIComponent('Careers — General application')}&body=${encodeURIComponent('Hi LiveBhoomi team,\n\nI’d like to be considered for future roles.\n\nProfile / links:\n\n')}`"
            class="lb-btn-inverse justify-center !px-6 !py-3 !text-sm sm:!text-base"
          >
            Email your profile
          </a>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Contact us
          </NuxtLink>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted">
        {{ branding.shortName }} is an equal-opportunity employer. We welcome candidates of all backgrounds and do not discriminate on the basis of race, religion, gender, age, disability, or any other protected characteristic.
      </p>
    </div>
  </div>
</template>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}
</style>
