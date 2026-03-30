<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  pricingCompareRows,
  pricingFaqs,
  pricingPlans,
  type PricingPlan,
  type PricingPlanId,
} from '~/data/pricingPlans'

const { branding } = useTheme()

useSeoMeta({
  title: `Pricing — ${branding.productName}`,
  description:
    'LiveBhoomi plans for owners, channel partners, agents, and builders — monthly or annual billing. Compare features and get started.',
})

const billing = ref<'monthly' | 'annual'>('monthly')

const annualDiscount = 0.2

const trustPills = [
  { t: 'RERA-aware flows', d: 'Guidance built into search & listings' },
  { t: 'Secure payments', d: 'Trusted processors when you upgrade' },
  { t: 'Human support', d: 'Help for owners & pros on paid tiers' },
] as const

const planAccentBar: Record<PricingPlanId, string> = {
  user: 'from-sky-400 via-cyan-400 to-blue-500',
  channel: 'from-violet-400 via-purple-500 to-indigo-600',
  agent: 'from-blue-500 via-hero to-indigo-600',
  builder: 'from-amber-400 via-orange-500 to-rose-500',
}

const planIconBg: Record<PricingPlanId, string> = {
  user: 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
  channel: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  agent: 'bg-hero/15 text-hero',
  builder: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
}

function formatPlanPrice(plan: PricingPlan) {
  if (plan.monthlyInr === null) {
    return { main: 'Free', sub: 'Forever' }
  }
  if (billing.value === 'monthly') {
    return {
      main: `₹${plan.monthlyInr.toLocaleString('en-IN')}`,
      sub: '/month',
    }
  }
  const effectiveMonthly = Math.round(plan.monthlyInr * (1 - annualDiscount))
  const yearly = Math.round(plan.monthlyInr * 12 * (1 - annualDiscount))
  return {
    main: `₹${effectiveMonthly.toLocaleString('en-IN')}`,
    sub: `/month · ₹${yearly.toLocaleString('en-IN')} billed yearly`,
  }
}

const showAnnualSave = computed(() => billing.value === 'annual')
</script>

<template>
  <div class="relative min-h-[100dvh] overflow-hidden bg-surface">
    <!-- ambient mesh -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_90%_60%_at_50%_-20%,color-mix(in_srgb,var(--lb-primary)_22%,transparent),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,color-mix(in_srgb,var(--lb-primary)_35%,transparent),transparent_50%)]"
      aria-hidden="true"
    />

    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(135deg, #1e3a8a 0%, var(--lb-primary) 38%, var(--lb-hero-hover) 72%, #4f46e5 100%)"
    >
      <div
        class="pricing-hero-pattern pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -right-20 top-1/2 size-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -left-16 bottom-0 size-56 rounded-full bg-indigo-400/20 blur-2xl"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div
          v-motion
          class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md sm:text-xs"
          :initial="{ opacity: 0, y: 8 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } }"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Pricing plans
        </div>
        <h1
          v-motion
          class="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]"
          :initial="{ opacity: 0, y: 14 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 30, delay: 40 } }"
        >
          Choose your perfect plan
        </h1>
        <p
          v-motion
          class="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/88 sm:text-lg"
          :initial="{ opacity: 0, y: 12 }"
          :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 30, delay: 80 } }"
        >
          From individual owners to channel partners, agents, and builders — transparent tiers, clear limits, and room to grow.
        </p>

        <div
          v-motion
          class="mt-8 flex flex-wrap gap-3"
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 120 } }"
        >
          <div
            v-for="pill in trustPills"
            :key="pill.t"
            class="flex max-w-xs flex-1 basis-[220px] items-start gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md"
          >
            <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span>
              <span class="block text-sm font-semibold text-white">{{ pill.t }}</span>
              <span class="mt-0.5 block text-xs leading-snug text-white/70">{{ pill.d }}</span>
            </span>
          </div>
        </div>

        <div
          v-motion
          class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 160 } }"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-white/60">
            Billing
          </p>
          <div
            class="relative grid w-full max-w-[19rem] grid-cols-2 gap-1 rounded-2xl border border-white/25 bg-black/25 p-1 shadow-inner shadow-black/25 backdrop-blur-md sm:w-auto sm:max-w-none sm:inline-grid sm:min-w-[17rem]"
            role="group"
            aria-label="Billing period"
          >
            <span
              class="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-6px)] rounded-xl bg-white shadow-lg transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none"
              :style="{ transform: billing === 'annual' ? 'translateX(calc(100% + 4px))' : 'translateX(0)' }"
              aria-hidden="true"
            />
            <button
              type="button"
              class="relative z-[1] rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-200 sm:px-5"
              :class="billing === 'monthly' ? 'text-heading' : 'text-white/85 hover:text-white'"
              @click="billing = 'monthly'"
            >
              Monthly
            </button>
            <button
              type="button"
              class="relative z-[1] rounded-xl px-4 py-2.5 text-sm font-bold transition-colors duration-200 sm:px-5"
              :class="billing === 'annual' ? 'text-heading' : 'text-white/85 hover:text-white'"
              @click="billing = 'annual'"
            >
              Annual
            </button>
            <span
              class="pointer-events-none absolute -right-1 -top-2.5 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md"
            >
              Save 20%
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid gap-6 sm:gap-7 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        <article
          v-for="(plan, idx) in pricingPlans"
          :key="plan.id"
          v-motion
          class="lb-card-elevated group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6"
          :class="
            plan.popular
              ? 'border-hero/35 ring-2 ring-hero/20 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] xl:scale-[1.02] xl:shadow-xl'
              : 'border-border/90'
          "
          :initial="{ opacity: 0, y: 22 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 28, delay: 60 + idx * 55 },
          }"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-95"
            :class="planAccentBar[plan.id]"
            aria-hidden="true"
          />
          <div
            v-if="plan.popular"
            class="absolute right-4 top-5 rounded-full bg-gradient-to-r from-hero to-indigo-600 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md"
          >
            Most popular
          </div>

          <div
            class="mb-4 inline-flex size-12 items-center justify-center rounded-2xl"
            :class="planIconBg[plan.id]"
          >
            <svg v-if="plan.id === 'user'" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" />
            </svg>
            <svg v-else-if="plan.id === 'channel'" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="plan.id === 'agent'" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <h2 class="text-xl font-bold text-heading">
            {{ plan.name }}
          </h2>
          <p class="mt-1 text-sm text-muted">
            {{ plan.tagline }}
          </p>
          <div class="mt-5 border-b border-border/80 pb-5">
            <template v-if="plan.monthlyInr === null">
              <p class="text-4xl font-extrabold tracking-tight text-heading">
                Free
              </p>
              <p class="mt-1 text-sm font-medium text-muted">
                Forever · no card required
              </p>
            </template>
            <template v-else>
              <p class="text-4xl font-extrabold tracking-tight text-heading">
                {{ formatPlanPrice(plan).main }}
              </p>
              <p class="mt-1 text-sm font-medium text-muted">
                {{ formatPlanPrice(plan).sub }}
              </p>
              <p v-if="showAnnualSave && plan.monthlyInr" class="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                ~20% vs monthly
              </p>
            </template>
          </div>

          <div class="mt-5 flex-1 space-y-5">
            <div>
              <h3 class="text-[11px] font-bold uppercase tracking-[0.14em] text-heading">
                What’s included
              </h3>
              <ul class="mt-3 space-y-2.5 text-sm text-muted">
                <li v-for="item in plan.included" :key="item" class="flex gap-2.5">
                  <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                    <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  <span class="leading-snug">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div v-if="plan.limitations.length">
              <h3 class="text-[11px] font-bold uppercase tracking-[0.14em] text-heading">
                Limitations
              </h3>
              <ul class="mt-3 space-y-2.5 text-sm text-muted">
                <li v-for="item in plan.limitations" :key="item" class="flex gap-2.5">
                  <span class="mt-0.5 size-1.5 shrink-0 rounded-full bg-amber-500/90" aria-hidden="true" />
                  <span class="leading-snug">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLink
            :to="plan.ctaTo"
            class="mt-8 inline-flex w-full items-center justify-center gap-2 py-3.5 text-center text-sm font-bold transition"
            :class="
              plan.popular
                ? 'lb-btn-primary rounded-2xl'
                : 'lb-btn-surface rounded-2xl border-2'
            "
          >
            {{ plan.cta }}
            <svg class="size-4 opacity-80 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </article>
      </div>

      <section class="mt-20 lg:mt-24" aria-labelledby="compare-heading">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="compare-heading" class="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              Compare features
            </h2>
            <p class="mt-2 max-w-xl text-sm text-muted sm:text-base">
              Full matrix — pick the column that matches how you list and sell.
            </p>
          </div>
          <NuxtLink to="/contact" class="text-sm font-semibold text-hero hover:underline">
            Need a custom bundle? Talk to us →
          </NuxtLink>
        </div>
        <div
          class="lb-card-elevated mt-8 overflow-hidden rounded-2xl border-0 bg-card shadow-xl ring-1 ring-border/60 dark:ring-border"
        >
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr class="border-b border-border bg-gradient-to-r from-nav-active/90 to-card dark:from-hero/15 dark:to-card">
                  <th scope="col" class="sticky left-0 z-[2] border-r border-border/60 bg-card px-4 py-4 text-xs font-bold uppercase tracking-wider text-muted backdrop-blur-sm">
                    Features
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-heading">
                    User
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-heading">
                    Channel
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-hero">
                    Agent Pro
                  </th>
                  <th scope="col" class="px-3 py-4 text-center text-xs font-bold uppercase tracking-wide text-heading">
                    Builder
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(row, ri) in pricingCompareRows"
                  :key="row.feature"
                  class="border-b border-border/70 transition-colors hover:bg-nav-active/40 dark:hover:bg-hero/5"
                  :class="ri % 2 === 1 ? 'bg-muted/20 dark:bg-white/[0.02]' : ''"
                >
                  <th
                    scope="row"
                    class="sticky left-0 z-[2] border-r border-border/60 bg-card px-4 py-3 text-left text-sm font-semibold text-heading backdrop-blur-sm"
                  >
                    {{ row.feature }}
                  </th>
                  <td
                    v-for="(cell, i) in row.cells"
                    :key="i"
                    class="px-3 py-3 text-center text-muted"
                  >
                    <span v-if="cell === 'Yes'" class="inline-flex items-center justify-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span class="flex size-6 items-center justify-center rounded-full bg-emerald-500/15 text-xs">✓</span>
                      Yes
                    </span>
                    <span v-else-if="cell === 'No'" class="text-muted/70">—</span>
                    <span v-else class="text-sm">{{ cell }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="mt-20 lg:mt-24" aria-labelledby="faq-heading">
        <h2 id="faq-heading" class="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
          Frequently asked questions
        </h2>
        <p class="mt-2 max-w-xl text-sm text-muted sm:text-base">
          Billing, upgrades, and security — the short version.
        </p>
        <el-collapse
          class="pricing-faq mt-8 space-y-3 [&_.el-collapse-item]:overflow-hidden [&_.el-collapse-item]:rounded-2xl [&_.el-collapse-item]:border [&_.el-collapse-item]:border-border [&_.el-collapse-item]:bg-card [&_.el-collapse-item]:shadow-sm"
        >
          <el-collapse-item
            v-for="(faq, index) in pricingFaqs"
            :key="index"
            :title="faq.q"
            :name="String(index)"
          >
            <p class="text-sm leading-relaxed text-muted">
              {{ faq.a }}
            </p>
          </el-collapse-item>
        </el-collapse>
      </section>

      <section
        class="relative mt-16 overflow-hidden rounded-3xl border border-hero/20 bg-gradient-to-br from-hero/10 via-card to-indigo-500/10 p-10 text-center shadow-[0_24px_60px_-24px_rgba(37,99,235,0.35)] dark:from-hero/15 dark:via-card dark:to-violet-950/30 sm:mt-20 sm:p-12"
      >
        <div
          class="pointer-events-none absolute inset-0 opacity-30"
          style="background-image: radial-gradient(circle at 20% 50%, rgba(99,102,241,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(37,99,235,0.2), transparent 40%)"
          aria-hidden="true"
        />
        <div class="relative">
          <h2 class="text-2xl font-bold text-heading sm:text-3xl">
            Ready to get started?
          </h2>
          <p class="mx-auto mt-3 max-w-lg text-sm text-muted sm:text-base">
            Start with a free listing or talk to us about Agent Pro and Builder Premium.
          </p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <NuxtLink to="/post-property" class="lb-btn-primary-lg justify-center px-8">
              Start free
            </NuxtLink>
            <NuxtLink to="/contact" class="lb-btn-surface justify-center border-2 px-8 py-3 text-base">
              Contact sales
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Data URL in CSS avoids Vue HTML parser choking on `/` inside inline `style` attributes. */
.pricing-hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath fill='%23fff' fill-opacity='.06' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/svg%3E");
}
.pricing-faq :deep(.el-collapse-item__header) {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--lb-foreground);
  padding: 1rem 1.25rem;
  border: none;
  transition: background-color 0.15s ease;
}
.pricing-faq :deep(.el-collapse-item__header:hover) {
  background-color: color-mix(in srgb, var(--lb-nav-active) 80%, transparent);
}
.pricing-faq :deep(.el-collapse-item__wrap) {
  border: none;
}
.pricing-faq :deep(.el-collapse-item__content) {
  padding: 0 1.25rem 1.125rem;
  color: var(--lb-muted-foreground);
}
</style>
