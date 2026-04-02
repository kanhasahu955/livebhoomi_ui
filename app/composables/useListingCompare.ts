import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

const STORAGE_KEY = 'livebhoomi-compare-ids'
const MAX = 4

/**
 * Side-by-side compare tray (up to 4 listing ids). Wire `/properties/compare` to API later.
 */
export function useListingCompare() {
  const ids = useLocalStorage<string[]>(STORAGE_KEY, [])

  const count = computed(() => ids.value.length)
  const canAdd = computed(() => ids.value.length < MAX)

  function isSelected(id: string) {
    return ids.value.includes(id)
  }

  function toggle(id: string) {
    const i = ids.value.indexOf(id)
    if (i >= 0) {
      ids.value = ids.value.filter((x) => x !== id)
      return
    }
    if (ids.value.length >= MAX) return
    ids.value = [...ids.value, id]
  }

  function remove(id: string) {
    ids.value = ids.value.filter((x) => x !== id)
  }

  function clear() {
    ids.value = []
  }

  const compareHref = computed(() => {
    if (!ids.value.length) return '/properties/compare'
    const q = ids.value.join(',')
    return `/properties/compare?ids=${encodeURIComponent(q)}`
  })

  return {
    ids,
    count,
    canAdd,
    isSelected,
    toggle,
    remove,
    clear,
    compareHref,
    max: MAX,
  }
}
