import { cityOptions } from '~/config/propertySearch.config'
import { listingImagePool } from '~/data/mockPropertyListings'
import { formatAreaSqft, formatInrSale } from '~/utils/inrFormat'
import type {
  BuilderProject,
  BuilderProjectDetail,
  BuilderProjectStatus,
  ProjectFaq,
  ProjectMilestone,
} from '~/types/newProject.types'

const cityCenters: Record<string, { lat: number; lng: number }> = {
  hyderabad: { lat: 17.385, lng: 78.4867 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  mumbai: { lat: 19.076, lng: 72.8777 },
  'delhi-ncr': { lat: 28.6139, lng: 77.209 },
  pune: { lat: 18.5204, lng: 73.8567 },
  chennai: { lat: 13.0827, lng: 80.2707 },
}

const faqPool: ProjectFaq[] = [
  {
    question: 'Is the project RERA registered?',
    answer:
      'Demo listings show a sample RERA reference. Before booking, verify the registration on your state RERA portal and match the project name, promoter, and phase.',
  },
  {
    question: 'What payment schedule is typical?',
    answer:
      'Builders often follow slab-wise milestones (on booking, foundation, floor slabs, possession). Exact terms vary — request the official payment plan during site visit.',
  },
  {
    question: 'Can I get a home loan for under-construction units?',
    answer:
      'Yes, many banks offer construction-linked disbursal. Compare offers, processing fees, and approved project lists with your lender.',
  },
  {
    question: 'Are maintenance charges included in the price?',
    answer:
      'Usually excluded until handover. Ask for society maintenance estimates, corpus, and parking charges in writing.',
  },
  {
    question: 'How do I book a site visit?',
    answer:
      'Use Enquire on Live Bhoomi to reach the sales desk, or call the builder’s registered number from the RERA filing.',
  },
]

function milestonesFor(
  base: BuilderProject,
): ProjectMilestone[] {
  const s = base.status
  return [
    { label: 'Launch & approvals', date: 'Q1 2025', done: true },
    {
      label: 'Structural milestone',
      date: 'Q3 2025',
      done: s !== 'launching',
    },
    {
      label: 'Finishing & MEP',
      date: 'Q1 2026',
      done: s === 'nearing_completion' || s === 'ready_to_move',
    },
    {
      label: 'Possession batches',
      date: base.possessionLabel,
      done: s === 'ready_to_move',
    },
  ]
}

function progressPctFor(status: BuilderProjectStatus): number {
  switch (status) {
    case 'launching':
      return 18
    case 'under_construction':
      return 52
    case 'nearing_completion':
      return 82
    case 'ready_to_move':
      return 100
    default:
      return 40
  }
}

const names = [
  'Skyline Residency',
  'Lakeview Towers',
  'The Meridian',
  'Greenfield County',
  'Urban Crest',
  'Riviera Heights',
  'Solitaire Park',
  'Aurora One',
  'Nexus Boulevard',
  'Elevation 12',
  'Civic Square Homes',
  'Palm Grove Enclave',
  'Vertex City',
  'Harmony Gardens',
  'Metro Skyline',
] as const

const builders = [
  'Bhoomi Developers',
  'Metro Buildcon',
  'Lakefront Estates',
  'UrbanAxis Homes',
  'RERA Prime Builders',
  'Skyline Infra',
] as const

const localities: Record<string, string[]> = {
  hyderabad: ['Kondapur', 'Gachibowli', 'Banjara Hills', 'Miyapur', 'Financial District'],
  bangalore: ['Whitefield', 'Sarjapur Road', 'Electronic City', 'Hebbal', 'HSR Layout'],
  mumbai: ['Powai', 'Thane West', 'Andheri East', 'Worli', 'Malad'],
  'delhi-ncr': ['Sector 62 Noida', 'Gurugram DLF', 'Dwarka', 'Indirapuram', 'Greater Noida West'],
  pune: ['Hinjewadi', 'Wakad', 'Baner', 'Kharadi', 'Viman Nagar'],
  chennai: ['OMR', 'Velachery', 'Porur', 'Adyar', 'Ambattur'],
}

const statusCycle: BuilderProjectStatus[] = [
  'launching',
  'under_construction',
  'nearing_completion',
  'ready_to_move',
]

const statusLabels: Record<BuilderProjectStatus, string> = {
  launching: 'New launch',
  under_construction: 'Under construction',
  nearing_completion: 'Nearing completion',
  ready_to_move: 'Ready to move',
}

const highlightPool = [
  'Corner units available',
  'Metro within 15 min',
  'Clubhouse & pool',
  'EV-ready parking',
  'RERA registered',
  'Sea / lake facing towers',
  'Low-density wings',
  'Sky deck amenities',
] as const

function hash(parts: number[]): number {
  let h = 2166136261
  for (const n of parts) {
    h ^= n
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length]!
}

function imagesFor(seed: number): string[] {
  const n = 3 + (seed % 3)
  const out: string[] = []
  for (let i = 0; i < n; i++) {
    out.push(listingImagePool[(seed + i * 11) % listingImagePool.length]!)
  }
  return out
}

function buildOne(globalIndex: number, cityValue: string, cityLabel: string): BuilderProject {
  const locs = localities[cityValue] ?? ['City center', 'IT corridor']
  const h = hash([globalIndex, cityValue.charCodeAt(0) ?? 0, globalIndex * 13])
  const status = statusCycle[globalIndex % statusCycle.length]!
  const minP = 45e5 + (h % 120) * 1e5
  const maxP = minP + (8e5 + (h % 80) * 1e5)
  const configVariants = [
    '2, 3 & 4 BHK',
    '2 & 3 BHK',
    '3 & 4 BHK',
    '3, 4 & 5 BHK',
    'Studio, 1 & 2 BHK',
  ] as const
  const bhks = pick(configVariants, h)

  const hiCount = 2 + (h % 3)
  const highlights: string[] = []
  for (let i = 0; i < hiCount; i++) {
    highlights.push(pick(highlightPool, h + i * 17))
  }

  const month = ['Mar', 'Jun', 'Sep', 'Dec'][h % 4]!
  const year = 2025 + (h % 4)
  const possessionLabel =
    status === 'ready_to_move'
      ? 'Immediate / phased'
      : `${month} ${year}`

  return {
    id: `proj-${cityValue}-${globalIndex + 1}`,
    name: `${pick(names, h)} ${globalIndex + 1}`,
    builder: pick(builders, h + 5),
    locality: pick(locs, h + 3),
    cityLabel,
    cityValue,
    status,
    statusLabel: statusLabels[status],
    possessionLabel,
    reraId: `RERA/${cityValue.slice(0, 3).toUpperCase()}/${1000 + (h % 9000)}`,
    priceFromDisplay: formatInrSale(minP),
    priceUptoDisplay: formatInrSale(maxP),
    configurationsLabel: bhks,
    areaLabel: `${formatAreaSqft(1100 + (h % 80) * 15)} – ${formatAreaSqft(1800 + (h % 100) * 12)}`,
    images: imagesFor(h),
    highlights,
  }
}

let cached: BuilderProject[] | null = null

export function getMockBuilderProjects(): BuilderProject[] {
  if (cached) return cached
  const out: BuilderProject[] = []
  let idx = 0
  for (const c of cityOptions) {
    const perCity = 5
    for (let i = 0; i < perCity; i++) {
      out.push(buildOne(idx, c.value, c.label))
      idx += 1
    }
  }
  cached = out
  return out
}

export function filterBuilderProjects(
  list: BuilderProject[],
  filters: {
    city: string
    q: string
    status: '' | BuilderProjectStatus
  },
): BuilderProject[] {
  const q = filters.q.trim().toLowerCase()
  return list.filter((p) => {
    if (p.cityValue !== filters.city) return false
    if (filters.status && p.status !== filters.status) return false
    if (!q) return true
    const blob = `${p.name} ${p.locality} ${p.builder} ${p.reraId}`.toLowerCase()
    return blob.includes(q)
  })
}

export function getMockBuilderProjectDetail(id: string): BuilderProjectDetail | null {
  const all = getMockBuilderProjects()
  const base = all.find((p) => p.id === id)
  if (!base) return null
  const h = hash([...id].map((c) => c.charCodeAt(0)))
  const desc = `${base.name} by ${base.builder} is a thoughtfully planned community in ${base.locality}, ${base.cityLabel}. ${base.statusLabel.toLowerCase()} with ${base.configurationsLabel.toLowerCase()} configurations and amenities designed for daily convenience. Walkable greens, drop-off plazas, and efficient cores — validate possession milestones and bank tie-ups on site.`
  const towers = 1 + (h % 4)
  const totalUnits = 120 + (h % 400)
  const amenityPick = [
    'Clubhouse',
    'Swimming pool',
    'Gym',
    'Indoor games',
    'Co-working lounge',
    'Jogging track',
    'Kids play area',
    'Multipurpose court',
    'Rainwater harvesting',
    'Power backup',
    'EV charging bays',
    'Visitor parking',
  ]
  const amenities: string[] = []
  for (let i = 0; i < 6 + (h % 4); i++) {
    amenities.push(pick(amenityPick, h + i * 9))
  }

  const center = cityCenters[base.cityValue] ?? { lat: 20.5937, lng: 78.9629 }
  const latitude = center.lat + ((h % 80) - 40) / 800
  const longitude = center.lng + ((h % 90) - 45) / 800

  const faqCount = 4 + (h % 2)
  const faqs: ProjectFaq[] = []
  for (let i = 0; i < faqCount; i++) {
    faqs.push(faqPool[(h + i * 3) % faqPool.length]!)
  }
  const faqsUnique = faqs.filter(
    (f, i, arr) => arr.findIndex((x) => x.question === f.question) === i,
  )

  const paymentPlanNote =
    'Typical slab-wise schedule: 10–20% on booking, balance linked to construction milestones until possession. Exact percentages differ by builder — request the sanctioned plan and allotment letter.'

  return {
    ...base,
    description: desc,
    amenities: [...new Set(amenities)],
    towers,
    totalUnits,
    latitude,
    longitude,
    constructionProgressPct: progressPctFor(base.status),
    milestones: milestonesFor(base),
    faqs: faqsUnique.length ? faqsUnique : faqPool.slice(0, 4),
    paymentPlanNote,
  }
}

export function getRelatedMockProjects(
  current: BuilderProject,
  limit: number,
): BuilderProject[] {
  return getMockBuilderProjects()
    .filter((p) => p.id !== current.id && p.cityValue === current.cityValue)
    .slice(0, limit)
}
