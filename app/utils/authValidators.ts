/** Shared rules for auth forms (Element Plus + plain checks). */

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

/** 10-digit Indian mobile after normalizing +91 / spaces. */
export function normalizeIndianMobile(v: string): string {
  let s = v.replace(/\D/g, '')
  if (s.startsWith('91') && s.length === 12) s = s.slice(2)
  return s
}

export function isValidIndianMobile(v: string): boolean {
  const s = normalizeIndianMobile(v)
  return /^[6-9]\d{9}$/.test(s)
}

export function isStrongEnoughPassword(v: string): boolean {
  if (v.length < 8) return false
  if (!/[a-zA-Z]/.test(v)) return false
  if (!/\d/.test(v)) return false
  return true
}
