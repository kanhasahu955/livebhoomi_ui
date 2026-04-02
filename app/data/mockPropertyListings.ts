import type { SearchIntent } from '~/config/propertySearch.config'
import { cityOptions, searchIntents } from '~/config/propertySearch.config'
import {
  formatAreaSqft,
  formatInrRentPerMonth,
  formatInrSale,
} from '~/utils/inrFormat'
import type {
  FurnishingKey,
  ListingBadge,
  PropertyListingDetail,
  PropertyListingSummary,
  PropertyListFilters,
} from '~/types/propertyListing.types'

/** Curated Unsplash interiors — fast CDN, good for demos. */
export const listingImagePool = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
] as const

const amenityPool = [
  'Power backup',
  'Lift',
  'Security',
  'Clubhouse',
  'Gym',
  'Swimming pool',
  'Kids play area',
  'Visitor parking',
  'Rainwater harvesting',
  'Intercom',
  'CCTV',
  'Garden',
  'Indoor games',
  'Solar panels',
  'EV charging',
] as const

const titleParts = {
  buy: [
    'Spacious',
    'Premium',
    'Corner',
    'Sunlit',
    'Park-facing',
    'Vastu-compliant',
  ],
  mid: [
    'apartment',
    'flat',
    'duplex',
    'penthouse',
    'villa unit',
    'builder floor',
  ],
} as const

function hashSeed(parts: number[]): number {
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

function imagesForSeed(seed: number, count: number): string[] {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    out.push(listingImagePool[(seed + i * 7) % listingImagePool.length]!)
  }
  return out
}

function badgesForSeed(seed: number): ListingBadge[] {
  const all: ListingBadge[] = [
    'verified',
    'new_listing',
    'ready_to_move',
    'rera',
  ]
  const n = 1 + (seed % 3)
  const set = new Set<ListingBadge>()
  let s = seed
  while (set.size < n) {
    set.add(all[s % all.length]!)
    s += 3
  }
  return [...set]
}

function budgetRangeAmounts(intent: SearchIntent, budgetKey: string): [number, number] {
  if (intent === 'rent' || intent === 'pg') {
    const map: Record<string, [number, number]> = {
      '0-10k': [6000, 10000],
      '10-20k': [10000, 20000],
      '20-35k': [20000, 35000],
      '35k+': [35000, 85000],
    }
    return map[budgetKey] ?? [12000, 28000]
  }
  if (intent === 'plots') {
    const map: Record<string, [number, number]> = {
      '0-30': [18e5, 30e5],
      '30-60': [30e5, 60e5],
      '60-120': [60e5, 120e5],
      '120+': [120e5, 250e5],
    }
    return map[budgetKey] ?? [35e5, 90e5]
  }
  const map: Record<string, [number, number]> = {
    '0-25': [18e5, 25e5],
    '25-50': [25e5, 50e5],
    '50-100': [50e5, 100e5],
    '100+': [100e5, 450e5],
  }
  return map[budgetKey] ?? [40e5, 95e5]
}

function furnishingFromSeed(seed: number): {
  label: string
  key: FurnishingKey
} {
  const labels = ['Semi-furnished', 'Furnished', 'Unfurnished'] as const
  const label = pick(labels, seed)
  const key: FurnishingKey =
    label === 'Furnished'
      ? 'furnished'
      : label === 'Unfurnished'
        ? 'unfurnished'
        : 'semi-furnished'
  return { label, key }
}

/** Neutral facets for detail / similar mock paths. */
export function neutralListingFilters(
  overrides: Partial<PropertyListFilters> & Pick<PropertyListFilters, 'intent' | 'city'>,
): PropertyListFilters {
  return {
    locality: '',
    propertyType: '',
    budget: '',
    bhk: '',
    sort: 'relevance',
    furnishing: '',
    verifiedOnly: false,
    reraOnly: false,
    readyToMoveOnly: false,
    minSqft: '',
    maxSqft: '',
    postedWithinDays: '',
    savedOnly: false,
    facing: '',
    ...overrides,
  }
}

export function buildSummary(
  globalIndex: number,
  filters: PropertyListFilters,
): PropertyListingSummary {
  const seed = hashSeed([
    globalIndex,
    filters.city.charCodeAt(0) || 0,
    filters.intent.length,
    filters.bhk.length,
  ])

  const cityOpt = cityOptions.find((c) => c.value === filters.city)
  const cityLabel = cityOpt?.label ?? 'Hyderabad'
  const cityValue = cityOpt?.value ?? 'hyderabad'

  const localities =
    filters.locality.trim() ||
    ['Miyapur', 'Kondapur', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills'][
      seed % 5
    ]!

  const intent = filters.intent
  const bhkN =
    intent === 'buy' || intent === 'rent'
      ? filters.bhk
        ? Math.min(4, Math.max(1, Number.parseInt(filters.bhk, 10) || 2))
        : 1 + (seed % 4)
      : null
  const bhkLabel =
    bhkN != null ? `${bhkN} BHK` : intent === 'pg' ? 'Private room' : null

  const typeLabels: Record<SearchIntent, string> = {
    buy: filters.propertyType || pick(['Apartment', 'Villa', 'Studio'], seed),
    rent: filters.propertyType || pick(['Apartment', 'Builder floor'], seed + 1),
    commercial: filters.propertyType || pick(['Office', 'Retail'], seed + 2),
    pg: filters.propertyType || 'PG',
    plots: filters.propertyType || 'Residential plot',
  }

  const [lo, hi] = budgetRangeAmounts(intent, filters.budget)
  const t = (seed % 1000) / 1000
  const priceAmount = Math.round(lo + (hi - lo) * t)
  const priceDisplay =
    intent === 'rent' || intent === 'pg'
      ? formatInrRentPerMonth(priceAmount)
      : formatInrSale(priceAmount)

  const areaSqft =
    intent === 'plots'
      ? 1200 + (seed % 8) * 400
      : 850 + (seed % 25) * 65

  const title = `${pick(titleParts.buy, seed)} ${bhkLabel ?? typeLabels[intent]} ${pick(titleParts.mid, seed + 2)} in ${localities}`

  const postedDaysAgo = seed % 21
  const postedLabel =
    postedDaysAgo === 0
      ? 'Today'
      : postedDaysAgo === 1
        ? 'Yesterday'
        : `${postedDaysAgo} days ago`

  const { label: furnishing, key: furnishingKey } = furnishingFromSeed(seed + 4)
  const facing = pick(['East', 'North', 'West', 'South', 'North-East'], seed + 5)
  const floorLabel = `${1 + (seed % 12)}/${14 + (seed % 6)} floor`

  return {
    id: `lb-${globalIndex}`,
    title,
    locality: localities,
    cityLabel,
    cityValue,
    intent,
    bhkLabel,
    propertyTypeLabel: typeLabels[intent],
    areaSqft,
    priceAmount,
    priceDisplay,
    images: imagesForSeed(seed, 5 + (seed % 3)),
    badges: badgesForSeed(seed),
    postedLabel,
    postedDaysAgo,
    furnishing,
    furnishingKey,
    facing,
    floorLabel,
  }
}

export function listingMatchesFilters(
  s: PropertyListingSummary,
  filters: PropertyListFilters,
): boolean {
  if (filters.furnishing && s.furnishingKey !== filters.furnishing) return false
  if (filters.verifiedOnly && !s.badges.includes('verified')) return false
  if (filters.reraOnly && !s.badges.includes('rera')) return false
  if (filters.readyToMoveOnly && !s.badges.includes('ready_to_move'))
    return false
  if (filters.facing && s.facing !== filters.facing) return false

  const minSq = filters.minSqft ? Number.parseInt(filters.minSqft, 10) : NaN
  if (Number.isFinite(minSq) && s.areaSqft < minSq) return false
  const maxSq = filters.maxSqft ? Number.parseInt(filters.maxSqft, 10) : NaN
  if (Number.isFinite(maxSq) && s.areaSqft > maxSq) return false

  if (filters.postedWithinDays) {
    const maxDays = Number.parseInt(filters.postedWithinDays, 10)
    if (Number.isFinite(maxDays) && s.postedDaysAgo > maxDays) return false
  }

  if (filters.savedOnly) {
    const ids = filters.savedIds
    if (!ids?.length) return false
    if (!ids.includes(s.id)) return false
  }

  return true
}

function sortSummaries(
  list: PropertyListingSummary[],
  sort: PropertyListFilters['sort'],
): PropertyListingSummary[] {
  const copy = [...list]
  if (sort === 'price_asc') copy.sort((a, b) => a.priceAmount - b.priceAmount)
  else if (sort === 'price_desc')
    copy.sort((a, b) => b.priceAmount - a.priceAmount)
  else if (sort === 'area_asc') copy.sort((a, b) => a.areaSqft - b.areaSqft)
  else if (sort === 'area_desc') copy.sort((a, b) => b.areaSqft - a.areaSqft)
  else if (sort === 'newest')
    copy.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
  return copy
}

const PAGE_SIZE = 12
const MOCK_TOTAL = 96

function collectMatching(filters: PropertyListFilters): PropertyListingSummary[] {
  const out: PropertyListingSummary[] = []
  for (let i = 1; i <= MOCK_TOTAL; i++) {
    const s = buildSummary(i, filters)
    if (listingMatchesFilters(s, filters)) out.push(s)
  }
  return sortSummaries(out, filters.sort)
}

/**
 * Replace with: `return axios.get('/listings', { params: { page, ...filters } })`
 */
export async function fetchPropertyListingsPage(
  page: number,
  filters: PropertyListFilters,
): Promise<{
  items: PropertyListingSummary[]
  hasMore: boolean
  total: number
}> {
  await new Promise((r) => setTimeout(r, 280))

  const all = collectMatching(filters)
  const start = (page - 1) * PAGE_SIZE
  const slice = all.slice(start, start + PAGE_SIZE)
  const hasMore = start + PAGE_SIZE < all.length
  return { items: slice, hasMore, total: all.length }
}

/** Accepts router param (string | string[] | undefined) — never throws on bad input. */
export function normalizeListingIdParam(
  raw: string | string[] | undefined | null,
): string {
  if (raw == null) return 'lb-1'
  const s = Array.isArray(raw) ? raw[0] : raw
  if (s == null || s === '') return 'lb-1'
  return String(s)
}

export function getMockPropertyDetail(
  rawId: string | string[] | undefined | null,
): PropertyListingDetail {
  const id = normalizeListingIdParam(rawId)
  const match = /^lb-(\d+)$/.exec(id)
  const idx = match
    ? Number.parseInt(match[1]!, 10)
    : hashSeed([...id].map((c) => c.charCodeAt(0)))
  const safeIdx = (((idx - 1) % MOCK_TOTAL) + MOCK_TOTAL) % MOCK_TOTAL + 1
  const seedIntent = searchIntents[safeIdx % searchIntents.length]!

  const base = buildSummary(
    safeIdx,
    neutralListingFilters({ intent: seedIntent, city: 'hyderabad' }),
  )

  const seed = hashSeed([safeIdx, id.length])
  const description = `${base.title} — thoughtfully laid out with ample natural light, ventilation, and practical storage. Ideal for ${base.intent === 'rent' ? 'working professionals seeking a calm commute' : 'families looking for schools and healthcare nearby'}. Well-connected to arterial roads and daily conveniences.`

  const amenityCount = 6 + (seed % 7)
  const amenities: string[] = []
  for (let i = 0; i < amenityCount; i++) {
    amenities.push(amenityPool[(seed + i * 5) % amenityPool.length]!)
  }

  const fullAddress = `${base.locality}, ${base.cityLabel} — pin via API`

  return {
    ...base,
    id,
    description,
    amenities: [...new Set(amenities)],
    fullAddress,
    reraId: seed % 4 === 0 ? `RERA/${base.cityValue.toUpperCase()}/${10000 + seed}` : undefined,
    latitude: 17.4 + (seed % 100) / 500,
    longitude: 78.4 + (seed % 100) / 500,
  }
}

export function getSimilarMockListings(
  detail: PropertyListingDetail,
  limit = 6,
): PropertyListingSummary[] {
  const start = hashSeed([detail.cityValue.length, detail.locality.length]) % 40
  const out: PropertyListingSummary[] = []
  for (let i = 0; i < limit; i++) {
    const s = buildSummary(
      start + i + 2,
      neutralListingFilters({
        intent: detail.intent,
        city: detail.cityValue,
        locality: detail.locality,
      }),
    )
    if (s.id !== detail.id) out.push({ ...s, id: `lb-sim-${detail.id}-${i}` })
  }
  return out.slice(0, limit)
}
