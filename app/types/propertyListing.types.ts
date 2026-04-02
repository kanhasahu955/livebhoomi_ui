import type { SearchIntent } from '~/config/propertySearch.config'

export type ListingBadge = 'verified' | 'new_listing' | 'ready_to_move' | 'rera'

export type FurnishingKey = 'furnished' | 'semi-furnished' | 'unfurnished'

/** Card + list API shape — swap mock for real backend fields. */
export type PropertyListingSummary = {
  id: string
  title: string
  locality: string
  cityLabel: string
  cityValue: string
  intent: SearchIntent
  bhkLabel: string | null
  propertyTypeLabel: string
  areaSqft: number
  /** Sale price in ₹, or monthly rent in ₹ */
  priceAmount: number
  priceDisplay: string
  images: string[]
  badges: ListingBadge[]
  postedLabel: string
  /** Numeric age for filters (mock: 0–20). */
  postedDaysAgo: number
  furnishing?: string
  furnishingKey: FurnishingKey
  facing?: string
  floorLabel?: string
}

export type PropertyListingDetail = PropertyListingSummary & {
  description: string
  amenities: string[]
  fullAddress: string
  reraId?: string
  latitude: number
  longitude: number
}

export type PropertyListSort =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'area_asc'
  | 'area_desc'

export type PropertyListFilters = {
  intent: SearchIntent
  city: string
  locality: string
  propertyType: string
  budget: string
  bhk: string
  sort: PropertyListSort
  furnishing: '' | FurnishingKey
  verifiedOnly: boolean
  reraOnly: boolean
  readyToMoveOnly: boolean
  minSqft: string
  maxSqft: string
  postedWithinDays: '' | '7' | '14' | '30'
  savedOnly: boolean
  facing: '' | 'East' | 'North' | 'West' | 'South' | 'North-East'
  /** Injected client-side for saved filter; not in URL. */
  savedIds?: string[]
}
