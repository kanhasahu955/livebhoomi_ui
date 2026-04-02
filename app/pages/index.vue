<script setup lang="ts">
const { branding } = useTheme()
const site = useSiteSeo()

const valueProps = [
  { t: 'Verified listings', d: 'KYC & document checks on select properties.' },
  { t: 'Smart search', d: 'City, budget, BHK, furnishing — in seconds.' },
  { t: 'Shortlist & alerts', d: 'Save homes and get updates when prices move.' },
  { t: 'Agent connect', d: 'Chat with owners and RERA-registered agents.' },
  { t: 'Maps & locality', d: 'See schools, transit, and amenities before you visit.' },
  { t: 'Owner dashboard', d: 'Edit listings, boost visibility, and track engagement.' },
] as const

useSeoMeta({
  title: `${branding.productName} — ${branding.tagline}`,
  description: site.siteDescription,
  ogTitle: `${branding.productName} — Find your perfect property`,
  ogDescription: site.siteDescription,
})
</script>

<template>
  <div class="w-full min-w-0 overflow-x-clip">
    <HeroSection />

    <HomeStatsStrip />

    <HomeIllustrationStrip />

    <HomeExploreHub />

    <section class="border-b border-border bg-card py-12 sm:py-16 md:py-20">
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
            Why LiveBhoomi
          </p>
          <h2 class="mt-2 text-2xl font-bold text-heading sm:text-3xl">
            Why buyers & tenants choose us
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-pretty text-muted">
            Built like the portals you already trust — with clearer filters, verified listings, and tools that respect your time.
          </p>
        </div>
        <div
          class="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <LbCard
            v-for="(item, index) in valueProps"
            :key="item.t"
            v-motion
            :shadow="'hover'"
            ui-class="h-full transition-shadow duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            :initial="{ opacity: 0, y: 20 }"
            :visible="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 50 + index * 45 },
            }"
          >
            <h3 class="text-base font-semibold text-heading">
              {{ item.t }}
            </h3>
            <p class="mt-2 text-sm text-muted leading-relaxed">
              {{ item.d }}
            </p>
          </LbCard>
        </div>
      </div>
    </section>

    <HomeJourneyTimeline />

    <HomeResourcesGrid />

    <HomeSocialCta />
  </div>
</template>
