import { useLocalStorage } from '@vueuse/core'
import { computed, ref, toValue } from 'vue'
import type { PropertyChatMessage } from '~/types/propertyEngagement.types'

const STORAGE_KEY = 'livebhoomi-listing-chats'

type StoreShape = Record<string, PropertyChatMessage[]>

function ownerReply(
  userText: string,
  ctx: { title: string; priceDisplay: string; locality: string },
): string {
  const t = userText.toLowerCase()
  if (/visit|site|see|today|tomorrow|weekend|schedule|come/i.test(userText)) {
    return 'Thanks for reaching out. I can usually arrange a site visit within 24–48 hours. Share a preferred day and time window, and a contact number.'
  }
  if (/negotiat|lower|discount|best price|reduce|offer/i.test(userText)) {
    return `The asking expectation is ${ctx.priceDisplay}. For serious buyers after a visit, we can discuss terms. Let me know if you’d like to schedule.`
  }
  if (/available|still|vacant|occupied/i.test(t)) {
    return 'The listing is active on LiveBhoomi. I’ll confirm current availability and handover timeline in my next reply.'
  }
  if (/rera|document|legal|title|loan|bank/i.test(t)) {
    return 'We can share document checklist and RERA / title details with interested parties. If you’re proceeding, I’ll outline the verification steps.'
  }
  if (/photo|image|video|more picture/i.test(t)) {
    return 'All current photos are on this page. If you need additional angles after your visit, I can share more.'
  }
  if (/hello|hi|hey|^$/i.test(t)) {
    return `Hello! You’re asking about “${ctx.title.slice(0, 72)}${ctx.title.length > 72 ? '…' : ''}” in ${ctx.locality}. What would you like to know — visit, price, or paperwork?`
  }
  return 'Thanks for your message. I’ve noted it for this listing. For urgent help you can also use Contact on the site — I’ll keep the conversation here focused on this property.'
}

/**
 * Per-listing chat thread (demo “owner” replies). Replace with WebSocket / API.
 */
export function usePropertyListingChat(
  listingId: MaybeRefOrGetter<string>,
  context: MaybeRefOrGetter<{
    title: string
    priceDisplay: string
    locality: string
  }>,
) {
  const id = computed(() => toValue(listingId))
  const ctx = computed(() => toValue(context))
  const store = useLocalStorage<StoreShape>(STORAGE_KEY, {})
  const sending = ref(false)

  const messages = computed(() => store.value[id.value] ?? [])

  function ensureWelcome() {
    const thread = store.value[id.value]
    if (thread && thread.length > 0) return
    const welcome: PropertyChatMessage = {
      role: 'owner',
      text: `Hi — I’m the contact for this home in ${ctx.value.locality}. Ask about visits, price, or documents — this is a demo chat until your inbox API is connected.`,
      createdAt: new Date().toISOString(),
    }
    store.value = { ...store.value, [id.value]: [welcome] }
  }

  function sendMessage(text: string) {
    const t = text.trim()
    if (!t || sending.value) return
    const userMsg: PropertyChatMessage = {
      role: 'user',
      text: t,
      createdAt: new Date().toISOString(),
    }
    const prev = store.value[id.value] ?? []
    store.value = { ...store.value, [id.value]: [...prev, userMsg] }
    sending.value = true
    window.setTimeout(() => {
      const reply = ownerReply(t, {
        title: ctx.value.title,
        priceDisplay: ctx.value.priceDisplay,
        locality: ctx.value.locality,
      })
      const ownerMsg: PropertyChatMessage = {
        role: 'owner',
        text: reply,
        createdAt: new Date().toISOString(),
      }
      const cur = store.value[id.value] ?? []
      store.value = { ...store.value, [id.value]: [...cur, ownerMsg] }
      sending.value = false
    }, 700)
  }

  const quickPrompts = [
    'Is a site visit possible this weekend?',
    'Is the price negotiable?',
    'Share RERA / document details',
  ] as const

  return {
    messages,
    sending,
    ensureWelcome,
    sendMessage,
    quickPrompts,
  }
}
