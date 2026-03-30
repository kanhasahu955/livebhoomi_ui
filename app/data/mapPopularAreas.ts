/** Mumbai micro-markets — counts & bands mirror livebhoomi.com/map style (indicative UI data). */
export type MapPopularArea = {
  id: string
  name: string
  lat: number
  lng: number
  propertyCount: number
  priceBand: string
}

export const defaultMapCenter: [number, number] = [19.076, 72.8777]

export const mapPopularAreas: MapPopularArea[] = [
  {
    id: 'bandra-west',
    name: 'Bandra West',
    lat: 19.0544,
    lng: 72.8406,
    propertyCount: 45,
    priceBand: '₹3.2 Cr',
  },
  {
    id: 'juhu',
    name: 'Juhu',
    lat: 19.1075,
    lng: 72.8263,
    propertyCount: 32,
    priceBand: '₹5.8 Cr',
  },
  {
    id: 'andheri-west',
    name: 'Andheri West',
    lat: 19.1364,
    lng: 72.8296,
    propertyCount: 78,
    priceBand: '₹1.9 Cr',
  },
  {
    id: 'powai',
    name: 'Powai',
    lat: 19.1174,
    lng: 72.9097,
    propertyCount: 56,
    priceBand: '₹2.1 Cr',
  },
  {
    id: 'bkc',
    name: 'BKC',
    lat: 19.0675,
    lng: 72.8697,
    propertyCount: 23,
    priceBand: '₹4.5 Cr',
  },
  {
    id: 'worli',
    name: 'Worli',
    lat: 19.0113,
    lng: 72.8155,
    propertyCount: 34,
    priceBand: '₹3.8 Cr',
  },
  {
    id: 'colaba',
    name: 'Colaba',
    lat: 18.9067,
    lng: 72.8147,
    propertyCount: 28,
    priceBand: '₹6.2 Cr',
  },
  {
    id: 'lower-parel',
    name: 'Lower Parel',
    lat: 19.0052,
    lng: 72.8306,
    propertyCount: 41,
    priceBand: '₹2.8 Cr',
  },
]

/** Sample amenity points near a lat/lng (illustrative — replace with POI API later). */
export function amenityPointsAround(
  lat: number,
  lng: number,
): { lat: number; lng: number; label: string; kind: 'school' | 'hospital' | 'transit' }[] {
  const d = 0.012
  return [
    { lat: lat + d * 0.4, lng: lng - d * 0.5, label: 'School', kind: 'school' },
    { lat: lat - d * 0.35, lng: lng + d * 0.45, label: 'Hospital', kind: 'hospital' },
    { lat: lat + d * 0.2, lng: lng + d * 0.55, label: 'Metro / transit', kind: 'transit' },
    { lat: lat - d * 0.5, lng: lng - d * 0.25, label: 'Shopping', kind: 'school' },
  ]
}
