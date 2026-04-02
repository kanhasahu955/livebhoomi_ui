import { useLocalStorage } from '@vueuse/core'
import { computed, toValue } from 'vue'
import type { ListingComment } from '~/types/propertyEngagement.types'

const STORAGE_KEY = 'livebhoomi-listing-comments'

type StoreShape = Record<string, ListingComment[]>

/**
 * Public comments per listing — reactive local persistence until API wiring.
 */
export function usePropertyComments(listingId: MaybeRefOrGetter<string>) {
  const id = computed(() => toValue(listingId))
  const store = useLocalStorage<StoreShape>(STORAGE_KEY, {})

  const comments = computed(() => store.value[id.value] ?? [])

  function addComment(author: string, body: string) {
    const t = body.trim()
    if (!t) return
    const row: ListingComment = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `c-${Date.now()}`,
      author: author.trim() || 'Visitor',
      body: t,
      createdAt: new Date().toISOString(),
    }
    const prev = store.value[id.value] ?? []
    store.value = { ...store.value, [id.value]: [...prev, row] }
  }

  return { comments, addComment }
}
