export type BlogCategory = 'buyers' | 'renters' | 'owners' | 'market'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  /** ISO date */
  date: string
  readMinutes: number
  category: BlogCategory
  tags: string[]
  /** Short bullets for the article hero */
  keyTakeaways: string[]
  /** Plain paragraphs for the detail page */
  paragraphs: string[]
}

export const blogCategoryLabels: Record<BlogCategory, string> = {
  buyers: 'Buyers',
  renters: 'Renters',
  owners: 'Owners',
  market: 'Market',
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'rera-checklist-before-you-buy',
    title: 'RERA checklist before you buy',
    excerpt:
      'What to verify on the portal, with the builder, and in documents — a practical pre-visit list.',
    date: '2026-03-12',
    readMinutes: 6,
    category: 'buyers',
    tags: ['RERA', 'Due diligence', 'First-time buyer'],
    keyTakeaways: [
      'Cross-check registration before you pay token money.',
      'Ask for encumbrance and sanctioned plans on every serious shortlist.',
      'Use shortlist notes so family decisions stay aligned.',
    ],
    paragraphs: [
      'Buying a home is as much about paperwork as it is about location. Before you shortlist seriously, confirm that the project or resale listing is aligned with your state’s RERA registration norms.',
      'On LiveBhoomi, prioritise listings where ownership and compliance signals are clear in the description. When you visit, ask for the latest encumbrance and approved plan copies.',
      'Keep a shared note (or shortlist comment) per property so family decisions stay transparent. Small habits early prevent expensive surprises later.',
    ],
  },
  {
    slug: 'renting-faster-without-spam-calls',
    title: 'Rent faster without spam calls',
    excerpt:
      'How to filter for furnished readiness, tenure, and deposit — and reach owners with context.',
    date: '2026-03-05',
    readMinutes: 4,
    category: 'renters',
    tags: ['Rent search', 'Shortlist', 'Communication'],
    keyTakeaways: [
      'Lock city, budget, and BHK before narrowing localities.',
      'Paste shortlist notes when you message — fewer repeat questions.',
      'Ask for a quick video before blocking a weekend visit.',
    ],
    paragraphs: [
      'Renters often lose time re-explaining requirements on every call. Start with city, budget band, and BHK locked in the search card, then add locality chips only when you are ready to narrow.',
      'Use shortlist notes for must-haves (pets, parking, WFH desk). When you message an owner or agent, paste that snippet — it signals you are serious.',
      'If a listing lacks photos of key areas, request a video walkthrough before blocking a weekend slot. It saves everyone time.',
    ],
  },
  {
    slug: 'what-owners-gain-from-verified-listings',
    title: 'What owners gain from verified listings',
    excerpt:
      'Why verification isn’t bureaucracy — it improves lead quality and reduces repeat enquiries.',
    date: '2026-02-21',
    readMinutes: 5,
    category: 'owners',
    tags: ['Verification', 'Leads', 'Premium'],
    keyTakeaways: [
      'Verification filters casual browsers early.',
      'Stale prices train users to ignore your future alerts.',
      'Honest titles and photos beat keyword stuffing.',
    ],
    paragraphs: [
      'Verified signals help seekers pre-trust your listing. That means fewer “is this still available?” pings and more visits from people who understand the price band.',
      'Keep price and availability current. Stale listings train users to ignore notifications — and that hurts everyone on the marketplace.',
      'Premium placement can amplify reach, but clarity in the title and honest photos convert better than keyword stuffing ever will.',
    ],
  },
  {
    slug: 'how-we-think-about-marketplace-trust',
    title: 'How we think about marketplace trust',
    excerpt:
      'Signals, not slogans — what LiveBhoomi optimises for as the network grows.',
    date: '2026-02-01',
    readMinutes: 7,
    category: 'market',
    tags: ['Trust', 'Product', 'Transparency'],
    keyTakeaways: [
      'Trust is observable behaviour, not a badge alone.',
      'Seekers and owners both win when context travels with the listing.',
      'We bias toward long-term reputation over short-term clicks.',
    ],
    paragraphs: [
      'Marketplaces fail when buyers feel spammed and owners feel unheard. Our product bets start from that tension: fewer dead-end calls, more context preserved between search, shortlist, and conversation.',
      'We publish guidance — like this blog — because informed users make better decisions and raise the bar for everyone on the supply side.',
      'As we add cities and categories, verification and dispute tooling will deepen. The goal stays the same: clarity at decision time.',
    ],
  },
]

export function postsByNewest(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  const same = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  )
  const fill = blogPosts.filter((p) => p.slug !== slug && !same.includes(p))
  return [...same, ...fill].slice(0, limit)
}

export function adjacentPosts(slug: string): {
  prev: BlogPost | null
  next: BlogPost | null
} {
  const ordered = postsByNewest()
  const i = ordered.findIndex((p) => p.slug === slug)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: ordered[i + 1] ?? null,
    next: ordered[i - 1] ?? null,
  }
}
