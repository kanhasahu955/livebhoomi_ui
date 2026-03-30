<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  onClickOutside,
  useEventListener,
  useWindowScroll,
  useWindowSize,
} from '@vueuse/core'
import { contactConfig } from '~/config/contact.config'

const { branding } = useTheme()
const route = useRoute()
const { height: winH } = useWindowSize()
const { y: scrollY } = useWindowScroll()

/**
 * Home hero is ~100svh — hide the floater until the user scrolls past that fold.
 * Other routes: show immediately (no full-bleed hero).
 */
const scrolledPastHomeHero = computed(() => {
  if (route.path !== '/') return true
  const fold = Math.max(winH.value * 0.92, 320)
  return scrollY.value > fold
})

/** Full assistant is on the contact page — avoid two panels at once. */
const showWidget = computed(
  () => route.path !== '/contact' && scrolledPastHomeHero.value,
)

const open = ref(false)

watch(showWidget, (visible) => {
  if (!visible) open.value = false
})
const panelRef = ref<HTMLElement | null>(null)
const fabRef = ref<HTMLElement | null>(null)
const chatEndRef = ref<HTMLElement | null>(null)
const chatInput = ref('')

const { messages, sending, ensureWelcome, sendMessage, quickTopics } =
  useLiveBhoomiAssistant()

function scrollToEnd() {
  nextTick(() => {
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
}

watch(messages, () => scrollToEnd(), { deep: true })
watch(sending, () => scrollToEnd())

function toggle() {
  open.value = !open.value
  if (open.value) {
    ensureWelcome()
    scrollToEnd()
  }
}

onClickOutside(
  panelRef,
  () => {
    if (open.value) open.value = false
  },
  { ignore: [fabRef] },
)

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value) {
    open.value = false
  }
})

function sendChat() {
  const t = chatInput.value
  chatInput.value = ''
  sendMessage(t)
}

function onQuickTopic(topic: string) {
  sendMessage(topic)
}

onMounted(() => {
  ensureWelcome()
})
</script>

<template>
  <div
    v-if="showWidget"
    class="pointer-events-none fixed bottom-0 right-0 z-[100] flex max-w-full flex-col items-end"
    aria-live="polite"
  >
    <div
      class="pointer-events-auto flex w-full max-w-[100vw] flex-col items-stretch px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-0 sm:w-auto sm:items-end sm:px-4 sm:pb-6"
    >
      <Transition
        enter-active-class="motion-safe:transition motion-safe:duration-200 motion-safe:ease-out"
        leave-active-class="motion-safe:transition motion-safe:duration-150 motion-safe:ease-in"
        enter-from-class="motion-safe:translate-y-3 motion-safe:scale-95 motion-safe:opacity-0"
        leave-to-class="motion-safe:translate-y-2 motion-safe:opacity-0"
      >
        <div
          v-show="open"
          id="floating-chat-panel"
          ref="panelRef"
          class="mb-3 flex max-h-[min(520px,72dvh)] w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/60 sm:mb-3 sm:w-[min(100vw-2rem,400px)]"
          role="dialog"
          aria-modal="true"
          :aria-label="`${branding.shortName} help chat`"
        >
          <!-- Header -->
          <div
            class="shrink-0 border-b border-border bg-gradient-to-r from-hero/12 via-card to-sky-500/[0.06] px-4 py-3.5 dark:from-hero/18"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-start gap-3">
                <div
                  class="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-hero text-xs font-bold text-white shadow-md shadow-hero/30"
                >
                  LB
                  <span
                    class="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-emerald-500"
                    aria-hidden="true"
                  />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-heading">
                    {{ branding.shortName }} assistant
                  </p>
                  <p class="mt-0.5 text-xs text-muted leading-snug">
                    {{ contactConfig.hoursLine }} ·
                    <NuxtLink
                      to="/contact"
                      class="font-semibold text-hero hover:underline"
                      @click="open = false"
                    >
                      Contact
                    </NuxtLink>
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted transition hover:bg-surface hover:text-heading"
                aria-label="Close chat"
                @click="open = false"
              >
                <svg
                  class="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <button
                v-for="topic in quickTopics"
                :key="topic"
                type="button"
                class="rounded-full border border-hero/20 bg-card px-2.5 py-1 text-left text-[11px] font-medium text-heading transition hover:border-hero/40 hover:bg-nav-active/50 dark:hover:bg-hero/10"
                @click="onQuickTopic(topic)"
              >
                {{ topic }}
              </button>
            </div>
          </div>

          <!-- Messages -->
          <div
            class="min-h-0 flex-1 space-y-3 overflow-y-auto bg-surface/50 p-3 dark:bg-surface/25"
            role="log"
            aria-relevant="additions"
          >
            <div
              v-for="(m, i) in messages"
              :key="i"
              class="flex gap-2"
              :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                v-if="m.role === 'bot'"
                class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-hero/15 text-[9px] font-bold text-hero"
              >
                LB
              </div>
              <div
                class="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm"
                :class="
                  m.role === 'user'
                    ? 'rounded-br-md bg-hero text-white'
                    : 'rounded-bl-md border border-border bg-card text-body'
                "
              >
                {{ m.text }}
              </div>
            </div>
            <div
              v-if="sending"
              class="flex gap-2"
            >
              <div
                class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-hero/15 text-[9px] font-bold text-hero"
              >
                LB
              </div>
              <div
                class="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2"
              >
                <span class="lb-fab-typing size-1.5 rounded-full bg-muted" />
                <span class="lb-fab-typing lb-fab-typing--2 size-1.5 rounded-full bg-muted" />
                <span class="lb-fab-typing lb-fab-typing--3 size-1.5 rounded-full bg-muted" />
              </div>
            </div>
            <div ref="chatEndRef" />
          </div>

          <!-- Input -->
          <form
            class="shrink-0 border-t border-border bg-card p-3"
            @submit.prevent="sendChat"
          >
            <label
              for="floating-chat-input"
              class="sr-only"
            >Message</label>
            <div class="flex gap-2">
              <LbInput
                id="floating-chat-input"
                v-model="chatInput"
                placeholder="Ask us anything…"
                :clearable="false"
                ui-class="flex-1"
                @keydown.enter.exact.prevent="sendChat"
              />
              <LbButton
                type="submit"
                variant="primary"
                :disabled="sending || !chatInput.trim()"
                ui-class="shrink-0 px-4"
              >
                Send
              </LbButton>
            </div>
          </form>
        </div>
      </Transition>

      <button
        ref="fabRef"
        type="button"
        class="ml-auto flex size-14 items-center justify-center rounded-full text-white shadow-lg shadow-hero/35 transition hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
        style="background: linear-gradient(135deg, var(--lb-primary) 0%, var(--lb-hero-hover) 100%)"
        :aria-expanded="open"
        :aria-controls="open ? 'floating-chat-panel' : undefined"
        :aria-label="open ? 'Close help chat' : 'Open help chat'"
        @click="toggle"
      >
        <svg
          v-if="!open"
          class="size-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <svg
          v-else
          class="size-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lb-fab-typing {
  animation: lb-fab-typing 1s ease-in-out infinite;
}
.lb-fab-typing--2 {
  animation-delay: 0.2s;
}
.lb-fab-typing--3 {
  animation-delay: 0.4s;
}
@media (prefers-reduced-motion: reduce) {
  .lb-fab-typing,
  .lb-fab-typing--2,
  .lb-fab-typing--3 {
    animation: none;
    opacity: 0.65;
  }
}
@keyframes lb-fab-typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
}
</style>
