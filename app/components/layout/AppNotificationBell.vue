<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { ElMessage } from 'element-plus'
import { onMounted } from 'vue'
import type { AppNotificationItem } from '~/composables/useAppNotifications'

defineProps<{
  popperClass?: string
}>()

const {
  items,
  unreadCount,
  loadFromStorage,
  markRead,
  markAllRead,
  clearAll,
} = useAppNotifications()

onMounted(() => {
  loadFromStorage()
})

function formatTime(at: number) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(at))
  } catch {
    return ''
  }
}

async function enableBrowserNotifications() {
  if (!import.meta.client || typeof Notification === 'undefined') {
    ElMessage.warning('Browser notifications are not supported here.')
    return
  }
  if (Notification.permission === 'granted') {
    ElMessage.success('Browser alerts are already on.')
    return
  }
  if (Notification.permission === 'denied') {
    ElMessage.warning('Unblock notifications in your browser settings for this site.')
    return
  }
  const p = await Notification.requestPermission()
  if (p === 'granted') {
    ElMessage.success('You may get price drops and message alerts here.')
    try {
      new Notification('Live Bhoomi', {
        body: 'Browser alerts are enabled.',
        icon: '/favicon.ico',
      })
    } catch {
      /* ignore */
    }
  }
}

function onOpenItem(n: AppNotificationItem) {
  markRead(n.id)
  if (n.href) void navigateTo(n.href)
}
</script>

<template>
  <el-popover
    placement="bottom-end"
    :width="340"
    trigger="click"
    :popper-class="`${popperClass ?? 'lb-dd-popper'} lb-notif-popper !p-0`"
  >
    <template #reference>
      <button
        type="button"
        class="relative lb-btn-icon-light"
        aria-label="Notifications"
      >
        <Bell class="h-5 w-5" aria-hidden="true" />
        <span
          v-if="unreadCount > 0"
          class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-sm"
        >
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </button>
    </template>
    <div class="overflow-hidden rounded-xl bg-card">
      <div
        class="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5"
      >
        <span class="text-sm font-bold text-heading">Notifications</span>
        <button
          v-if="items.length && unreadCount"
          type="button"
          class="text-xs font-semibold text-hero hover:underline"
          @click="markAllRead"
        >
          Mark all read
        </button>
      </div>
      <div class="max-h-72 overflow-y-auto py-1">
        <p
          v-if="!items.length"
          class="px-4 py-8 text-center text-sm text-muted"
        >
          No notifications yet.
        </p>
        <button
          v-for="n in items"
          :key="n.id"
          type="button"
          class="flex w-full flex-col gap-0.5 border-b border-border/40 px-3 py-2.5 text-left transition last:border-0 hover:bg-nav-active/50"
          :class="n.read ? 'opacity-75' : 'bg-hero/[0.04]'"
          @click="onOpenItem(n)"
        >
          <span class="text-sm font-semibold text-heading">{{ n.title }}</span>
          <span class="text-xs leading-snug text-muted">{{ n.body }}</span>
          <span class="text-[10px] font-medium text-muted">{{ formatTime(n.at) }}</span>
        </button>
      </div>
      <div class="space-y-2 border-t border-border/60 px-3 py-3">
        <button
          type="button"
          class="w-full rounded-lg border border-border/70 bg-nav-active/40 py-2 text-xs font-bold text-heading transition hover:border-hero/25"
          @click="enableBrowserNotifications"
        >
          Enable browser alerts
        </button>
        <div class="flex items-center justify-between gap-2">
          <p class="text-[10px] text-muted">
            Hook this list to your API when messaging ships.
          </p>
          <button
            v-if="items.length"
            type="button"
            class="shrink-0 text-[10px] font-bold text-destructive hover:underline"
            @click="clearAll"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </el-popover>
</template>
