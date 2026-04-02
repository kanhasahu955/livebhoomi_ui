const STORAGE_KEY = 'livebhoomi-shortlist-ids'

export function useListingShortlist() {
  const ids = useLocalStorage<string[]>(STORAGE_KEY, [])

  function isSaved(id: string) {
    return ids.value.includes(id)
  }

  function toggle(id: string) {
    const i = ids.value.indexOf(id)
    if (i >= 0) ids.value = ids.value.filter((x) => x !== id)
    else ids.value = [...ids.value, id]
  }

  function clearAll() {
    ids.value = []
  }

  return { ids, isSaved, toggle, clearAll }
}
