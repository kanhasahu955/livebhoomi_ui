/**
 * Shared property search fields — used by home hero and `/search`.
 * Query keys match `navigateTo({ path: '/properties', query })`.
 */
export type SearchIntent = 'buy' | 'rent' | 'commercial' | 'pg' | 'plots'

/** CSS `background` values — shared by home hero and `/search`. */
export const intentHeroBackgrounds: Record<SearchIntent, string> = {
  buy:
    'linear-gradient(122deg, var(--lb-primary) 0%, var(--lb-hero-hover) 50%, var(--lb-primary) 100%)',
  rent:
    'linear-gradient(126deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)',
  commercial:
    'linear-gradient(124deg, var(--lb-primary) 0%, var(--lb-hero-hover) 52%, var(--lb-primary) 100%)',
  pg:
    'linear-gradient(130deg, var(--lb-primary) 0%, var(--lb-hero-hover) 49%, var(--lb-primary) 100%)',
  plots:
    'linear-gradient(120deg, var(--lb-primary) 0%, var(--lb-hero-hover) 51%, var(--lb-primary) 100%)',
}

export const searchIntents: SearchIntent[] = [
  'buy',
  'rent',
  'commercial',
  'pg',
  'plots',
]

export function isSearchIntent(v: string): v is SearchIntent {
  return searchIntents.includes(v as SearchIntent)
}

export const cityOptions = [
  { label: 'Hyderabad', value: 'hyderabad' },
  { label: 'Bangalore', value: 'bangalore' },
  { label: 'Mumbai', value: 'mumbai' },
  { label: 'Delhi NCR', value: 'delhi-ncr' },
  { label: 'Pune', value: 'pune' },
  { label: 'Chennai', value: 'chennai' },
] as const

export const intentTabs: { id: SearchIntent; label: string; short: string }[] = [
  { id: 'buy', label: 'Buy', short: 'Buy' },
  { id: 'rent', label: 'Rent', short: 'Rent' },
  { id: 'commercial', label: 'Commercial', short: 'Comm.' },
  { id: 'pg', label: 'PG / Co-living', short: 'PG' },
  { id: 'plots', label: 'Plots', short: 'Plots' },
]

export const purchasePropertyTypes = [
  { label: 'Property type', value: '' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Independent house', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
] as const

export const commercialPropertyTypes = [
  { label: 'Space type', value: '' },
  { label: 'Office', value: 'office' },
  { label: 'Retail shop', value: 'retail' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Co-working', value: 'coworking' },
] as const

export const pgPropertyTypes = [
  { label: 'Room type', value: '' },
  { label: 'Private room', value: 'private-room' },
  { label: 'Shared room', value: 'shared-room' },
  { label: 'Entire PG', value: 'entire-pg' },
] as const

export const plotsPropertyTypes = [
  { label: 'Plot type', value: '' },
  { label: 'Residential plot', value: 'residential-plot' },
  { label: 'Commercial land', value: 'commercial-land' },
  { label: 'Farm / agriculture', value: 'farmland' },
] as const

export const purchaseBudgetOptions = [
  { label: 'Budget', value: '' },
  { label: 'Under ₹25 Lac', value: '0-25' },
  { label: '₹25 Lac – ₹50 Lac', value: '25-50' },
  { label: '₹50 Lac – ₹1 Cr', value: '50-100' },
  { label: '₹1 Cr+', value: '100+' },
] as const

export const monthlyBudgetOptions = [
  { label: 'Budget / month', value: '' },
  { label: 'Under ₹10,000', value: '0-10k' },
  { label: '₹10k – ₹20k', value: '10-20k' },
  { label: '₹20k – ₹35k', value: '20-35k' },
  { label: '₹35k+', value: '35k+' },
] as const

export const plotBudgetOptions = [
  { label: 'Plot budget', value: '' },
  { label: 'Under ₹30 Lac', value: '0-30' },
  { label: '₹30 – ₹60 Lac', value: '30-60' },
  { label: '₹60 Lac – ₹1.2 Cr', value: '60-120' },
  { label: '₹1.2 Cr+', value: '120+' },
] as const

export const localityChipsByCity: Record<string, string[]> = {
  hyderabad: ['Miyapur', 'Kondapur', 'Gachibowli', 'Banjara Hills'],
  bangalore: ['Whitefield', 'HSR Layout', 'Indiranagar', 'Electronic City'],
  mumbai: ['Andheri', 'Powai', 'Thane West', 'Bandra'],
  'delhi-ncr': ['Noida Sec 62', 'Gurugram DLF', 'Dwarka', 'Indirapuram'],
  pune: ['Hinjewadi', 'Koregaon Park', 'Wakad', 'Viman Nagar'],
  chennai: ['OMR', 'Velachery', 'Adyar', 'Porur'],
}

export const bhkChips = [
  { label: '1 BHK', value: '1' },
  { label: '2 BHK', value: '2' },
  { label: '3 BHK', value: '3' },
  { label: '4+ BHK', value: '4' },
] as const

export function propertyTypeOptionsForIntent(intent: SearchIntent) {
  if (intent === 'commercial') return commercialPropertyTypes
  if (intent === 'pg') return pgPropertyTypes
  if (intent === 'plots') return plotsPropertyTypes
  return purchasePropertyTypes
}

export function budgetOptionsForIntent(intent: SearchIntent) {
  if (intent === 'rent' || intent === 'pg') return monthlyBudgetOptions
  if (intent === 'plots') return plotBudgetOptions
  return purchaseBudgetOptions
}

export type PropertySearchFormState = {
  intent: SearchIntent
  city: string
  locality: string
  propertyType: string
  budget: string
  bhk: string
}

export function buildPropertiesQuery(state: PropertySearchFormState) {
  const q = new URLSearchParams()
  q.set('intent', state.intent)
  if (state.city) q.set('city', state.city)
  if (state.locality.trim()) q.set('q', state.locality.trim())
  if (state.propertyType) q.set('type', state.propertyType)
  if (state.budget) q.set('budget', state.budget)
  if (state.bhk) q.set('bhk', state.bhk)
  return Object.fromEntries(q)
}

/** Hydrate form from `/properties` or `/search` query (strings only). */
export function parseSearchFromRouteQuery(
  query: Record<string, unknown>,
  options?: { defaultIntent?: SearchIntent },
) {
  const fallbackIntent = options?.defaultIntent ?? 'buy'
  const intentRaw = query.intent
  const intent =
    typeof intentRaw === 'string' && isSearchIntent(intentRaw)
      ? intentRaw
      : fallbackIntent

  const cityRaw = query.city
  const city =
    typeof cityRaw === 'string' &&
    cityOptions.some((c) => c.value === cityRaw)
      ? cityRaw
      : 'hyderabad'

  const locality = typeof query.q === 'string' ? query.q : ''
  const propertyType = typeof query.type === 'string' ? query.type : ''
  const budget = typeof query.budget === 'string' ? query.budget : ''
  const bhk = typeof query.bhk === 'string' ? query.bhk : ''

  return { intent, city, locality, propertyType, budget, bhk }
}
