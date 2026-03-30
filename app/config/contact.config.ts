/**
 * Production contact endpoints — replace placeholders before go-live.
 */
export const contactConfig = {
  /** Shown in UI next to the call button */
  supportPhoneDisplay: '+91 1800-XXX-XXXX',
  /** E.164 or digits for `tel:` — no spaces */
  supportPhoneTel: '+911800000000',
  supportEmail: 'support@livebhoomi.com',
  /** WhatsApp deep link (encode pre-filled text in query if needed) */
  whatsappUrl: 'https://wa.me/919876543210?text=Hi%20LiveBhoomi%2C%20I%20need%20help%20with%20',
  whatsappLabel: 'WhatsApp',
  /** Support window copy */
  hoursLine: 'Mon–Sat · 9:00–18:00 IST',
  /** Hero / visit card */
  officeHeadline: 'Hyderabad · India',
  officeDetail: 'Registered office & product hub — in-person visits by appointment.',
  /** SLA copy for trust row */
  emailReplySla: 'Under 24 hours',
  phoneSla: 'Live during business hours',
  chatSla: 'Instant guidance + handoff',
} as const

/** Social proof links — set href to your real profiles */
export const contactSocialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/livebhoomi',
  },
  {
    label: 'X',
    href: 'https://x.com/livebhoomi',
  },
] as const
