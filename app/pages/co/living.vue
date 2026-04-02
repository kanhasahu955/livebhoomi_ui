<script setup lang="ts">
import {
  Coffee,
  ShieldCheck,
  Users,
} from 'lucide-vue-next'
const { branding } = useTheme()

useSeoMeta({
  title: `Co-living spaces — ${branding.productName}`,
  description:
    'Discover co-living with community spaces, flexible leases, and monthly budgets. Search by city, room type, and locality on Live Bhoomi.',
})

const navLinks = [
  { label: 'Skip to catalogue', to: '/properties?intent=pg' },
  { label: 'PG hub', to: '/pg' },
  { label: 'Hostels', to: '/pg/hostel' },
  { label: 'Home', to: '/' },
] as const

const pillars = [
  {
    icon: Users,
    title: 'Community-first layouts',
    body: 'Shared kitchens, lounges, and events — pick stays that match your work rhythm and social style.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent monthly packs',
    body: 'See rent, deposits, and inclusions upfront so you can compare co-living operators fairly.',
  },
  {
    icon: Coffee,
    title: 'Built for relocating pros',
    body: 'Furnished rooms near metros and IT corridors — shortlist and message before you visit.',
  },
] as const

const checklist = [
  'Ask what is bundled: meals, Wi‑Fi, housekeeping, laundry, and AC/electricity caps.',
  'Confirm notice period, lock-in, and guest policies in writing before paying token.',
  'Visit during evening hours to gauge noise, security, and common-area upkeep.',
  'Check distance to office or campus and last-mile transport at rush hour.',
] as const
</script>

<template>
  <PgStayLanding
    input-id-prefix="coliving"
    hub-kicker="Co-living"
    title="Room in a home that feels like a community"
    subtitle="Studio-style private rooms and shared coliving — search by city, budget, and room type. Same PG inventory path with copy tuned for flexible, social stays."
    search-intro="Search co-living in"
    :nav-links="[...navLinks]"
    pillars-section-eyebrow="Why co-living"
    :pillars-heading="`Coliving on ${branding.productName}`"
    pillars-lead="Curated for people who want more than a bed — clearer pricing, locality chips, and a path to full search, compare, and shortlist."
    :pillars="[...pillars]"
    preview-kicker="Preview"
    preview-title-before="Fresh co-living picks in"
    preview-subtitle="A live slice of mock PG-format inventory — open the full grid for sort, list view, compare, and export."
    no-preview-message="No listings match this city in the demo dataset. Try another city or open the full catalogue."
    checklist-title="Before you book a bed"
    checklist-lead="Quick checks for shared housing — not legal advice; confirm agreements with the operator."
    :checklist="[...checklist]"
    list-cta-eyebrow="List your coliving"
    list-cta-title="Operators & asset partners"
    list-cta-body="Post beds, add photos, and reply from chat when seekers message you. Upgrade later for more visibility."
  />
</template>
