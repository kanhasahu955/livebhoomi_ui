<script setup lang="ts">
import {
  Building2,
  MapPinned,
  Store,
} from 'lucide-vue-next'

const { branding } = useTheme()

useSeoMeta({
  title: `Commercial property — ${branding.productName}`,
  description:
    'Offices, retail, warehouses, and co-working across Indian cities. Search by location, space type, and investment budget — compare and shortlist on Live Bhoomi.',
})

const navLinks = [
  { label: 'Skip to catalogue', to: '/properties?intent=commercial' },
  { label: 'Office space', to: '/commercial/office' },
  { label: 'Home', to: '/' },
] as const

const pillars = [
  {
    icon: Building2,
    title: 'Space types that match ops',
    body: 'Office, retail, warehouse, and co-working filters aligned with how teams actually expand.',
  },
  {
    icon: MapPinned,
    title: 'City & micro-market first',
    body: 'Locality chips and search mirror serious site selection — not just a pin on a map.',
  },
  {
    icon: Store,
    title: 'Retail & frontage',
    body: 'High-street and mall-adjacent discovery when you list or search with clear budgets.',
  },
] as const

const checklist = [
  'Validate title, sanctioned use (IT/retail/industrial), and OC status with your counsel.',
  'Load, parking ratios, and service lift specs — capture in writing before term sheet.',
  'Fit-out capex vs landlord works: who funds AC, flooring, and fire NOC?',
  'Escalation, lock-in, and exit: align with cash-flow models and renewal options.',
] as const
</script>

<template>
  <CommercialSpaceLanding
    input-id-prefix="commercial-hub"
    hub-kicker="Commercial"
    title="Offices, retail, and logistics-ready space"
    subtitle="Search commercial inventory with investment budgets (sale-style bands in the demo), space type, and locality — same listing grid as /properties with intent locked to commercial."
    search-intro="Search commercial space in"
    :nav-links="[...navLinks]"
    pillars-section-eyebrow="For occupiers & investors"
    :pillars-heading="`Discover on ${branding.productName}`"
    pillars-lead="Shortlist, compare up to four listings, export CSV, and chat when you wire the API — today’s UI runs on mock data."
    :pillars="[...pillars]"
    preview-kicker="Preview"
    preview-title-before="Commercial picks in"
    preview-subtitle="Mock slice updates when you change city — open the full catalogue for facets, sort, and list view."
    no-preview-message="No commercial listings match this city in the demo dataset. Try another city or open the full grid."
    checklist-title="Before you sign"
    checklist-lead="High-level diligence reminders — confirm every clause with qualified advisors."
    :checklist="[...checklist]"
    list-cta-eyebrow="List commercial space"
    list-cta-title="Owners & brokers"
    list-cta-body="Post offices or retail, add media, and respond from chat when leads arrive. Upgrade for more visibility."
  />
</template>
