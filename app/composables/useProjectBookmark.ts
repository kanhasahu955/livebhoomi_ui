const STORAGE_KEY = 'livebhoomi:saved-project-ids'

function readIds(): string[] {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

function writeIds(ids: string[]) {
  if (!import.meta.client) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* quota */
  }
}

export function useProjectBookmark() {
  const savedIds = useState<string[]>('lb-project-bookmarks', () => [])

  function hydrate() {
    savedIds.value = readIds()
  }

  function isSaved(projectId: string) {
    return savedIds.value.includes(projectId)
  }

  function toggle(projectId: string) {
    hydrate()
    if (isSaved(projectId)) {
      savedIds.value = savedIds.value.filter((id) => id !== projectId)
    } else {
      savedIds.value = [...savedIds.value, projectId]
    }
    writeIds(savedIds.value)
  }

  return { savedIds, hydrate, isSaved, toggle }
}
