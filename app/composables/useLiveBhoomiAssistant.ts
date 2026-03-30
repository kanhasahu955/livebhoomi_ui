export type LiveBhoomiChatMsg = { role: 'user' | 'bot'; text: string }

export const liveBhoomiQuickTopics = [
  'Help me search for a flat to rent',
  'How do I post my property?',
  'Question about Premium billing',
] as const

const WELCOME_TEXT =
  'Hi — I’m the LiveBhoomi assistant. Ask about listings, shortlist, or account help. A human agent can take over during business hours.'

function botReplyFor(text: string): string {
  const lower = text.toLowerCase()
  if (/price|budget|rent|buy|flat|search/i.test(text)) {
    return 'For budgets and availability, use the home search or open Listings — filters apply to what’s live on the marketplace.'
  }
  if (/rera|verify|fraud|scam/i.test(text)) {
    return 'We encourage RERA checks and document verification before any payment. I can’t validate a specific listing here — use Contact to email support with the listing link.'
  }
  if (/post|list|owner|property/i.test(text)) {
    return 'Owners can start from Post property — add photos, price, and locality. Verification steps appear in the dashboard when applicable.'
  }
  if (/premium|bill|payment|subscription/i.test(text)) {
    return 'Premium questions are best over email with your account email in the thread. Open Premium from the menu or the Contact page.'
  }
  if (/hello|hi|hey/.test(lower)) {
    return 'Hello! Tell me what you’re trying to do (search, post a property, billing, or technical issue) and I’ll point you the right way.'
  }
  return 'Thanks for your message. For phone, WhatsApp, or email, open the Contact page — our team will pick up from there. You can keep asking quick questions here anytime.'
}

/**
 * Shared assistant state across the floating widget and the Contact page (same thread).
 */
export function useLiveBhoomiAssistant() {
  const messages = useState<LiveBhoomiChatMsg[]>('lb-assistant-messages', () => [])
  const sending = useState<boolean>('lb-assistant-sending', () => false)

  function ensureWelcome() {
    if (messages.value.length > 0) return
    messages.value = [...messages.value, { role: 'bot', text: WELCOME_TEXT }]
  }

  function sendMessage(text: string) {
    const t = text.trim()
    if (!t || sending.value) return
    messages.value = [...messages.value, { role: 'user', text: t }]
    sending.value = true

    window.setTimeout(() => {
      messages.value = [...messages.value, { role: 'bot', text: botReplyFor(t) }]
      sending.value = false
    }, 650)
  }

  return {
    messages,
    sending,
    ensureWelcome,
    sendMessage,
    quickTopics: liveBhoomiQuickTopics,
  }
}
