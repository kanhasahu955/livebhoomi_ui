/** Indian locale display — sale (Lac/Cr) or rent (per month). */
export function formatInrSale(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '—'
  if (amount >= 1e7) {
    const cr = amount / 1e7
    return `₹${cr >= 10 ? cr.toFixed(1) : cr.toFixed(2)} Cr`
  }
  const lac = amount / 1e5
  return `₹${lac >= 100 ? lac.toFixed(0) : lac.toFixed(2)} Lac`
}

export function formatInrRentPerMonth(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '—'
  return `${new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)}/mo`
}

export function formatAreaSqft(sqft: number): string {
  if (!Number.isFinite(sqft) || sqft <= 0) return '—'
  return `${new Intl.NumberFormat('en-IN').format(Math.round(sqft))} sq.ft`
}

/** Whole rupees, e.g. EMI — no fractional paisa noise for large amounts. */
export function formatInrPlain(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
