<script setup lang="ts">
import {
  Home,
  MessageCircle,
  UtensilsCrossed,
} from 'lucide-vue-next'
const { branding } = useTheme()

useSeoMeta({
  title: `PG, co-living & hostels — ${branding.productName}`,
  description:
    'Find PG stays, co-living, and hostels across India. Search by city, room type, and monthly budget — shortlist, compare, and message on Live Bhoomi.',
})

const navLinks = [
  { label: 'Skip to catalogue', to: '/properties?intent=pg' },
  { label: 'Co-living', to: '/co/living' },
  { label: 'Hostels', to: '/pg/hostel' },
  { label: 'Home', to: '/' },
] as const

const pillars = [
  {
    icon: UtensilsCrossed,
    title: 'Meals & housekeeping',
    body: 'Filter operators who bundle mess, laundry, and cleaning — fewer surprises after move-in.',
  },
  {
    icon: Home,
    title: 'Room types for every budget',
    body: 'Private room, shared, or entire PG — monthly rent bands match how students and pros actually search.',
  },
  {
    icon: MessageCircle,
    title: 'Chat before you visit',
    body: 'Shortlist beds, compare up to four listings, and message owners with context from your search.',
  },
] as const

const checklist = [
  'Visit twice: once in daylight for hygiene, once in the evening for noise and security.',
  'Ask for owner ID, society NOC if applicable, and a simple inventory handover list.',
  'Clarify AC, geyser, and power backup — who pays for units beyond a cap?',
  'Align curfew, guest policy, and lock-in in writing before you transfer deposit.',
] as const
</script>

<template>
  <PgStayLanding
    input-id-prefix="pg-hub"
    hub-kicker="PG & shared stays"
    title="Find your next PG, co-living room, or hostel bed"
    subtitle="One search path for private rooms, shared rooms, and full PG units — tuned for students and professionals. Jump to co-living or hostels anytime from the links below."
    search-intro="Search PG stays in"
    :nav-links="[...navLinks]"
    pillars-section-eyebrow="Built for movers"
    :pillars-heading="`Why search PG on ${branding.productName}`"
    pillars-lead="The same powerful listing experience as buy and rent — locality chips, budgets, shortlist, compare, and CSV export on the full grid."
    :pillars="[...pillars]"
    preview-kicker="Preview"
    preview-title-before="Trending PG-format stays in"
    preview-subtitle="Mock inventory that reacts to your city — open the full grid for filters, sort, list view, and compare."
    no-preview-message="No listings match this city in the demo dataset. Try another city or open the full catalogue."
    checklist-title="Before you move in"
    checklist-lead="Housekeeping tips for PG life — not legal advice; verify agreements locally."
    :checklist="[...checklist]"
    list-cta-eyebrow="List your PG"
    list-cta-title="Owners & operators"
    list-cta-body="Post for free, add photos, and reply from chat when seekers message you. Upgrade later for more visibility."
  />
</template>
