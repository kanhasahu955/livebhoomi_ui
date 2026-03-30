/** Mirrors livebhoomi.com/pricing structure (copy & tiers). */
export type PricingPlanId = 'user' | 'channel' | 'agent' | 'builder'

export type PricingPlan = {
  id: PricingPlanId
  name: string
  tagline: string
  monthlyInr: number | null
  popular?: boolean
  included: string[]
  limitations: string[]
  cta: string
  ctaTo: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'user',
    name: 'User',
    tagline: 'Individual property owner',
    monthlyInr: null,
    included: [
      '1 free listing',
      'Limited property images',
      'Contact buyer via email',
      '10 saved searches',
      '10 favorite properties',
      'Email notifications',
    ],
    limitations: [
      'No project/unit creation',
      'No property videos',
      'No advanced filters',
      'Basic map visibility',
      'No push notifications',
      'No high-res images',
      'No virtual tours',
      'No analytics or lead management',
      'Featured property paid add-on',
    ],
    cta: 'Get started free',
    ctaTo: '/post-property',
  },
  {
    id: 'channel',
    name: 'Channel Partner',
    tagline: 'Marketing partner',
    monthlyInr: 6999,
    included: [
      'Promote builder projects',
      '10 active listings',
      'Full images & videos',
      'Lead access',
      'Advanced filters',
      'Priority map visibility',
      'Unlimited saved searches & favorites',
      'Push + email notifications',
      'High-resolution images',
      'Basic lead management',
    ],
    limitations: [
      'No project/unit creation',
      'No virtual tours',
      'No analytics dashboard',
      'No bulk upload',
      'No priority listing',
      'No verified badge',
      'Featured property paid add-on',
    ],
    cta: 'Start CP plan',
    ctaTo: '/contact',
  },
  {
    id: 'agent',
    name: 'Agent Pro',
    tagline: 'Property broker',
    monthlyInr: 4999,
    popular: true,
    included: [
      'Client property listings',
      '25 active listings',
      'Full images, videos, virtual tours',
      'Lead access',
      'Advanced filters',
      'Priority map visibility',
      'Unlimited saved searches & favorites',
      'Push + email notifications',
      'High-resolution images',
      'Basic analytics',
      'Advanced lead management',
      'Priority listing',
      'Verified badge',
    ],
    limitations: [
      'No project/unit creation',
      'No bulk upload',
      'No dedicated support',
      'No team collaboration',
      'Featured property paid add-on',
    ],
    cta: 'Start Agent Pro',
    ctaTo: '/contact',
  },
  {
    id: 'builder',
    name: 'Builder Premium',
    tagline: 'Developer',
    monthlyInr: 15999,
    included: [
      'Project + units',
      'Unlimited active listings',
      'Project & unit creation',
      'Full images, videos, virtual tours',
      'Lead access',
      'Advanced filters',
      'Premium map visibility',
      'Unlimited saved searches & favorites',
      'Advanced analytics',
      'Enterprise lead management',
      'Bulk property upload',
      'Priority listing',
      'Verified badge',
      'Dedicated support',
      'Team collaboration',
    ],
    limitations: [],
    cta: 'Contact sales',
    ctaTo: '/contact',
  },
]

export type CompareRow = { feature: string; cells: [string, string, string, string] }

export const pricingCompareRows: CompareRow[] = [
  { feature: 'Account type', cells: ['Individual', 'Marketing Partner', 'Property Broker', 'Developer'] },
  { feature: 'Free plan available', cells: ['Yes', 'No', 'No', 'No'] },
  { feature: 'Property listing', cells: ['1 free listing', 'Promote builder projects', 'Client property listings', 'Project + units'] },
  { feature: 'Max active listings', cells: ['1', '10', '25', 'Unlimited (project units)'] },
  { feature: 'Project creation', cells: ['No', 'No', 'No', 'Yes'] },
  { feature: 'Unit creation', cells: ['No', 'No', 'No', 'Yes'] },
  { feature: 'Property images', cells: ['Limited', 'Full', 'Full', 'Full'] },
  { feature: 'Property videos', cells: ['No', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Contact buyer directly', cells: ['Email', 'Lead access', 'Lead access', 'Lead access'] },
  { feature: 'Advanced filters', cells: ['No', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Map search visibility', cells: ['Basic', 'Priority', 'Priority', 'Premium'] },
  { feature: 'Saved searches', cells: ['10', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Favorite properties', cells: ['10', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { feature: 'Push notifications', cells: ['No', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Email notifications', cells: ['Yes', 'Yes', 'Yes', 'Yes'] },
  { feature: 'High resolution images', cells: ['No', 'Yes', 'Yes', 'Yes'] },
  { feature: 'Virtual tours', cells: ['No', 'No', 'Yes', 'Yes'] },
  { feature: 'Analytics dashboard', cells: ['No', 'No', 'Basic', 'Advanced'] },
  { feature: 'Lead management', cells: ['No', 'Basic', 'Advanced', 'Enterprise'] },
  { feature: 'Bulk property upload', cells: ['No', 'No', 'No', 'Yes'] },
  { feature: 'Priority listing', cells: ['No', 'No', 'Yes', 'Yes'] },
  { feature: 'Verified badge', cells: ['No', 'No', 'Yes', 'Yes'] },
  { feature: 'Featured property', cells: ['Paid', 'Paid', 'Paid', 'Paid'] },
  { feature: 'Dedicated support', cells: ['No', 'No', 'No', 'Yes'] },
  { feature: 'Team collaboration', cells: ['No', 'No', 'No', 'Yes'] },
]

export const pricingFaqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrades take effect on your next billing cycle unless we confirm an immediate proration with you. Downgrades follow the terms in your subscription agreement.',
  },
  {
    q: 'Is there a free plan?',
    a: 'The User plan includes one free listing with core discovery features. Paid plans unlock more listings, leads, and tools for professionals.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We support common Indian payment methods including UPI, cards, and net banking where enabled. Enterprise Builder plans can be invoiced.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'You can cancel renewal at any time from your account or by contacting support. Access continues until the end of the paid period.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual billing includes roughly 20% savings versus paying month-to-month on paid tiers.',
  },
  {
    q: 'Is my data secure?',
    a: 'We use industry-standard encryption in transit, access controls, and partner processors for payments. See our Privacy policy for details.',
  },
] as const
