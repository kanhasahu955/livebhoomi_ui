<script setup lang="ts">
import {
  BedDouble,
  GraduationCap,
  ShieldCheck,
} from 'lucide-vue-next'
const { branding } = useTheme()

useSeoMeta({
  title: `PG & hostels — ${branding.productName}`,
  description:
    'Find PGs and hostels for students and working professionals. Filter by city, monthly budget, and room type — shortlist safer stays on Live Bhoomi.',
})

const navLinks = [
  { label: 'Skip to catalogue', to: '/properties?intent=pg' },
  { label: 'PG hub', to: '/pg' },
  { label: 'Co-living', to: '/co/living' },
  { label: 'Home', to: '/' },
] as const

const pillars = [
  {
    icon: GraduationCap,
    title: 'Near campus & commutes',
    body: 'Prioritise walkable distances to colleges, coaching centres, and metro corridors.',
  },
  {
    icon: ShieldCheck,
    title: 'Clarity on rules & fees',
    body: 'Curfew, visitors, mess timings, and breakage deposits — know what is fixed vs variable.',
  },
  {
    icon: BedDouble,
    title: 'Room types that fit',
    body: 'Private, shared, or dorm-style — filter mock inventory the same way you will with a live API.',
  },
] as const

const checklist = [
  'Inspect mattress quality, ventilation, and shared washrooms on a weekday evening.',
  'Ask for written mess schedule, refund policy, and what happens if you leave mid-term.',
  'Note security: CCTV coverage, entry logs, and warden availability at night.',
  'Capture meter readings or AC remotes handed over — small details prevent disputes.',
] as const
</script>

<template>
  <PgStayLanding
    input-id-prefix="hostel"
    hub-kicker="PG & hostel"
    title="A dependable bed while you study or start work"
    subtitle="Hostels and PGs with monthly budgets and room-type filters — built for students, interns, and early-career moves. Same listing stack as our PG hub."
    search-intro="Search PG & hostels in"
    :nav-links="[...navLinks]"
    pillars-section-eyebrow="For students & newcomers"
    :pillars-heading="`Stays you can compare on ${branding.productName}`"
    pillars-lead="Shortlist faster with locality chips, then open the full catalogue for sort, compare tray, and export when you are ready."
    :pillars="[...pillars]"
    preview-kicker="Preview"
    preview-title-before="Fresh PG & hostel picks in"
    preview-subtitle="Demo inventory refreshes when you change city above — connect your API for real-time beds and pricing."
    no-preview-message="No listings match this city in the demo dataset. Try another city or open the full catalogue."
    checklist-title="Before you pay security deposit"
    checklist-lead="Practical checks for dorm and PG life — confirm final terms with the owner or warden."
    :checklist="[...checklist]"
    list-cta-eyebrow="List your PG or hostel"
    list-cta-title="Owners & wardens"
    list-cta-body="Post rooms, add photos, and reply from chat when seekers message you. Upgrade later for more visibility."
  />
</template>
