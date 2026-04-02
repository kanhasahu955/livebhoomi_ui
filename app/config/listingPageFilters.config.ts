import {
  parseSearchFromRouteQuery,
  type SearchIntent,
} from '~/config/propertySearch.config'
import type {
  PropertyListFilters,
  PropertyListSort,
} from '~/types/propertyListing.types'

const SORT_VALUES: PropertyListSort[] = [
  'relevance',
  'price_asc',
  'price_desc',
  'newest',
  'area_asc',
  'area_desc',
]

export function isPropertyListSort(v: string): v is PropertyListSort {
  return (SORT_VALUES as readonly string[]).includes(v)
}

export type ListingFacetQuery = {
  sort: PropertyListSort
  furnishing: PropertyListFilters['furnishing']
  verifiedOnly: boolean
  reraOnly: boolean
  readyToMoveOnly: boolean
  minSqft: string
  maxSqft: string
  postedWithinDays: PropertyListFilters['postedWithinDays']
  savedOnly: boolean
  facing: PropertyListFilters['facing']
  view: 'grid' | 'list'
}

function boolQuery(v: unknown): boolean {
  return v === '1' || v === 'true' || v === true
}

function strQuery(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

/** Hydrate full listing filters from route (search params + facet query keys). */
export function parseListingPageQuery(
  query: Record<string, unknown>,
  options?: { defaultIntent?: SearchIntent },
): PropertyListFilters {
  const p = parseSearchFromRouteQuery(query, options)
  const sortRaw = strQuery(query.sort)
  const sort: PropertyListSort = isPropertyListSort(sortRaw)
    ? sortRaw
    : 'relevance'

  const furnishingRaw = strQuery(query.furnishing).toLowerCase()
  const furnishing: PropertyListFilters['furnishing'] =
    furnishingRaw === 'furnished' ||
    furnishingRaw === 'semi-furnished' ||
    furnishingRaw === 'unfurnished'
      ? furnishingRaw
      : ''

  const posted = strQuery(query.posted)
  const postedWithinDays: PropertyListFilters['postedWithinDays'] =
    posted === '7' || posted === '14' || posted === '30' ? posted : ''

  const facingRaw = strQuery(query.facing)
  const facings = ['East', 'North', 'West', 'South', 'North-East'] as const
  const facing: PropertyListFilters['facing'] = facings.includes(
    facingRaw as (typeof facings)[number],
  )
    ? (facingRaw as PropertyListFilters['facing'])
    : ''

  return {
    ...p,
    sort,
    furnishing,
    verifiedOnly: boolQuery(query.verified),
    reraOnly: boolQuery(query.rera),
    readyToMoveOnly: boolQuery(query.ready),
    minSqft: strQuery(query.minSqft),
    maxSqft: strQuery(query.maxSqft),
    postedWithinDays,
    savedOnly: boolQuery(query.saved),
    facing,
    savedIds: undefined,
  }
}

export function parseListingViewMode(
  query: Record<string, unknown>,
): 'grid' | 'list' {
  const v = strQuery(query.view).toLowerCase()
  return v === 'list' ? 'list' : 'grid'
}

const FACET_KEYS = [
  'sort',
  'furnishing',
  'verified',
  'rera',
  'ready',
  'minSqft',
  'maxSqft',
  'posted',
  'saved',
  'facing',
  'view',
] as const

/** Flatten `route.query` to a single-level string map (first value of arrays). */
export function flattenRouteQuery(
  query: Record<string, unknown>,
): Record<string, string> {
  const o: Record<string, string> = {}
  for (const [k, v] of Object.entries(query)) {
    if (v == null) continue
    if (Array.isArray(v)) {
      if (v[0] != null && String(v[0]) !== '') o[k] = String(v[0])
    } else if (String(v) !== '') {
      o[k] = String(v)
    }
  }
  return o
}

/** Apply facet toolbar state onto a flat query; drops empty facet keys. */
export function mergeFacetsIntoQuery(
  flat: Record<string, string>,
  facets: ListingFacetQuery,
): Record<string, string> {
  const q = { ...flat }
  for (const k of FACET_KEYS) {
    delete q[k]
  }
  if (facets.sort !== 'relevance') q.sort = facets.sort
  if (facets.furnishing) q.furnishing = facets.furnishing
  if (facets.verifiedOnly) q.verified = '1'
  if (facets.reraOnly) q.rera = '1'
  if (facets.readyToMoveOnly) q.ready = '1'
  if (facets.minSqft) q.minSqft = facets.minSqft
  if (facets.maxSqft) q.maxSqft = facets.maxSqft
  if (facets.postedWithinDays) q.posted = facets.postedWithinDays
  if (facets.savedOnly) q.saved = '1'
  if (facets.facing) q.facing = facets.facing
  if (facets.view === 'list') q.view = 'list'
  return q
}
