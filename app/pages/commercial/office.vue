<script setup lang="ts">
import {
  Layers,
  ShieldCheck,
  TrainFront,
} from 'lucide-vue-next'

const { branding } = useTheme()

useSeoMeta({
  title: `Office space for rent & sale — ${branding.productName}`,
  description:
    'Find office and co-working space by city, budget, and micro-market. Compare floor plates, commute, and compliance-friendly options on Live Bhoomi.',
})

const navLinks = [
  { label: 'Skip to catalogue', to: '/properties?intent=commercial&type=office' },
  { label: 'All commercial', to: '/commercial' },
  { label: 'Home', to: '/' },
] as const

const pillars = [
  {
    icon: Layers,
    title: 'Floor plates & efficiency',
    body: 'Use area and price bands to shortlist before you tour — plug in carpet vs super area from your API later.',
  },
  {
    icon: TrainFront,
    title: 'Commute &amp; catchment',
    body: 'Pair locality search with metro and arterial access — especially for hybrid teams.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance-ready mindset',
    body: 'Fire, occupancy, and use permissions should be verified with your facility and legal partners.',
  },
] as const

const checklist = [
  'Ask for latest sanctioned plan, fire NOC, and lift AMC before token.',
  'Clarify CAM, generator, and parking charges — fixed vs metered.',
  'Fit-out timeline: handover condition, slab-to-slab, and landlord contribution cap.',
  'Option to renew and rent escalation caps — align with finance before LOI.',
] as const
</script>

<template>
  <CommercialSpaceLanding
    input-id-prefix="commercial-office"
    hub-kicker="Office"
    title="Office space that fits how your team works"
    subtitle="Grade-A towers, business parks, and co-working — search defaults to office space type (change anytime). Investment budget bands match the commercial mock catalogue."
    search-intro="Search offices in"
    :nav-links="[...navLinks]"
    pillars-section-eyebrow="Workplace search"
    :pillars-heading="`Offices on ${branding.productName}`"
    pillars-lead="Preview cards use the same commercial intent as the hub — filters and compare tray unlock on the full listings page."
    :pillars="[...pillars]"
    preview-kicker="Preview"
    preview-title-before="Office-format listings in"
    preview-subtitle="Demo data mixes office with other commercial types in the pool — narrow further with filters after Search."
    no-preview-message="No listings for this city in the demo set. Try another city or open the full catalogue."
    checklist-title="Office lease checklist"
    checklist-lead="Practical items before LOI — not legal advice."
    :checklist="[...checklist]"
    list-cta-eyebrow="List office space"
    list-cta-title="Landlords & asset managers"
    list-cta-body="Show floor plate, amenities, and photos. Reply from chat when teams shortlist you."
    preset-property-type="office"
  />
</template>
