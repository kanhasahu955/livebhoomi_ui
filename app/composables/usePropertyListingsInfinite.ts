import { computed, ref, shallowRef } from 'vue'
import { fetchPropertyListingsPage } from '~/data/mockPropertyListings'
import type { PropertyListFilters, PropertyListingSummary } from '~/types/propertyListing.types'

export function usePropertyListingsInfinite(filters: () => PropertyListFilters) {
  const items = shallowRef<PropertyListingSummary[]>([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  const initialLoading = ref(true)
  const error = ref<string | null>(null)
  const totalMatching = ref(0)

  async function resetAndLoad() {
    items.value = []
    page.value = 1
    hasMore.value = true
    error.value = null
    initialLoading.value = true
    loading.value = true
    try {
      const f = filters()
      const { items: batch, hasMore: more, total } =
        await fetchPropertyListingsPage(1, f)
      items.value = batch
      hasMore.value = more
      totalMatching.value = total
      page.value = 2
    } catch {
      error.value = 'Could not load listings. Try again.'
      hasMore.value = false
    } finally {
      loading.value = false
      initialLoading.value = false
    }
  }

  async function loadMore() {
    if (loading.value || !hasMore.value) return
    loading.value = true
    error.value = null
    try {
      const f = filters()
      const { items: batch, hasMore: more, total } =
        await fetchPropertyListingsPage(page.value, f)
      items.value = [...items.value, ...batch]
      hasMore.value = more
      totalMatching.value = total
      page.value += 1
    } catch {
      error.value = 'Failed to load more.'
    } finally {
      loading.value = false
    }
  }

  const totalLoaded = computed(() => items.value.length)

  return {
    items,
    hasMore,
    loading,
    initialLoading,
    error,
    totalLoaded,
    totalMatching,
    resetAndLoad,
    loadMore,
  }
}
