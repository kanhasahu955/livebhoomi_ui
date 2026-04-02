import { computed } from 'vue'

export type AppNotificationItem = {
  id: string
  title: string
  body: string
  at: number
  read: boolean
  href?: string
}

const STORAGE_KEY = 'livebhoomi:app-notifications:v1'
const SEED_KEY = 'livebhoomi:app-notifications-seeded'

function safeParse(raw: string | null): AppNotificationItem[] {
  if (!raw) return []
  try {
    const v = JSON.parse(raw) as unknown
    if (!Array.isArray(v)) return []
    return v.filter(
      (x) =>
        x &&
        typeof x === 'object' &&
        typeof (x as AppNotificationItem).id === 'string' &&
        typeof (x as AppNotificationItem).title === 'string',
    ) as AppNotificationItem[]
  } catch {
    return []
  }
}

export function useAppNotifications() {
  const items = useState<AppNotificationItem[]>(
    'lb-app-notifications',
    () => [],
  )

  function loadFromStorage() {
    if (!import.meta.client) return
    const parsed = safeParse(localStorage.getItem(STORAGE_KEY))
    if (parsed.length) items.value = parsed
  }

  function persist() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    } catch {
      /* quota / private mode */
    }
  }

  function add(entry: Omit<AppNotificationItem, 'id' | 'at' | 'read'>) {
    const row: AppNotificationItem = {
      ...entry,
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      at: Date.now(),
      read: false,
    }
    items.value = [row, ...items.value].slice(0, 80)
    persist()
    if (
      import.meta.client &&
      typeof Notification !== 'undefined' &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification(row.title, {
          body: row.body,
          icon: '/favicon.ico',
        })
      } catch {
        /* ignore */
      }
    }
    return row
  }

  function markRead(id: string) {
    items.value = items.value.map((n) =>
      n.id === id ? { ...n, read: true } : n,
    )
    persist()
  }

  function markAllRead() {
    items.value = items.value.map((n) => ({ ...n, read: true }))
    persist()
  }

  function remove(id: string) {
    items.value = items.value.filter((n) => n.id !== id)
    persist()
  }

  function clearAll() {
    items.value = []
    persist()
  }

  const unreadCount = computed(
    () => items.value.filter((n) => !n.read).length,
  )

  return {
    items,
    unreadCount,
    loadFromStorage,
    add,
    markRead,
    markAllRead,
    remove,
    clearAll,
  }
}

export function seedWelcomeNotificationOnce() {
  if (!import.meta.client) return
  const { items, add, loadFromStorage } = useAppNotifications()
  loadFromStorage()
  if (localStorage.getItem(SEED_KEY)) return
  if (items.value.length > 0) {
    localStorage.setItem(SEED_KEY, '1')
    return
  }
  localStorage.setItem(SEED_KEY, '1')
  add({
    title: 'Notifications are on',
    body: 'You’ll see alerts for saved searches, messages, and tips here. Enable browser alerts in the bell menu if you want pop-ups.',
  })
}
