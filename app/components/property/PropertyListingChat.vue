<script setup lang="ts">
import { MessagesSquare } from 'lucide-vue-next'
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  listingId: string
  title: string
  priceDisplay: string
  locality: string
}>()

const chatInput = ref('')
const endRef = ref<HTMLElement | null>(null)

const { messages, sending, ensureWelcome, sendMessage, quickPrompts } =
  usePropertyListingChat(
    () => props.listingId,
    () => ({
      title: props.title,
      priceDisplay: props.priceDisplay,
      locality: props.locality,
    }),
  )

function scrollToEnd() {
  nextTick(() => {
    endRef.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
}

watch(messages, () => scrollToEnd(), { deep: true })
watch(sending, () => scrollToEnd())

function submit() {
  const t = chatInput.value
  chatInput.value = ''
  sendMessage(t)
}

function onQuick(p: string) {
  sendMessage(p)
}

onMounted(() => {
  ensureWelcome()
  scrollToEnd()
})

watch(
  () => props.listingId,
  () => {
    ensureWelcome()
    scrollToEnd()
  },
)
</script>

<template>
  <section
    id="property-listing-chat"
    class="lb-card-elevated flex max-h-[min(520px,70dvh)] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl ring-1 ring-black/[0.04] dark:ring-white/[0.06]"
  >
    <div
      class="shrink-0 border-b border-border bg-gradient-to-r from-hero/10 via-card to-sky-500/[0.06] px-4 py-3 dark:from-hero/15"
    >
      <h2 class="flex items-center gap-2 text-sm font-bold text-heading">
        <MessagesSquare class="size-5 shrink-0 text-hero" />
        Chat about this property
      </h2>
      <p class="mt-1 text-[11px] leading-snug text-muted">
        Demo owner thread — wire to inbox or WhatsApp. For general help, use the site chat bubble or
        <NuxtLink to="/contact" class="font-semibold text-hero hover:underline">Contact</NuxtLink>.
      </p>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <button
          v-for="p in quickPrompts"
          :key="p"
          type="button"
          class="rounded-full border border-hero/20 bg-card px-2.5 py-1 text-left text-[11px] font-medium text-heading transition hover:border-hero/40 hover:bg-nav-active/50 dark:hover:bg-hero/10"
          @click="onQuick(p)"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <div
      class="min-h-0 flex-1 space-y-3 overflow-y-auto bg-surface/40 p-3 dark:bg-surface/20"
      role="log"
    >
      <div
        v-for="(m, i) in messages"
        :key="`${m.createdAt}-${i}`"
        class="flex gap-2"
        :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          v-if="m.role === 'owner'"
          class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600/15 text-[9px] font-bold text-emerald-800 dark:text-emerald-300"
        >
          OC
        </div>
        <div
          class="max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm"
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
          class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600/15 text-[9px] font-bold text-emerald-800 dark:text-emerald-300"
        >
          OC
        </div>
        <div
          class="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-card px-3 py-2"
        >
          <span class="size-1.5 animate-pulse rounded-full bg-muted" />
          <span class="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
          <span class="size-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
        </div>
      </div>
      <div ref="endRef" />
    </div>

    <form
      class="shrink-0 border-t border-border bg-card p-3"
      @submit.prevent="submit"
    >
      <label for="property-chat-input" class="sr-only">Message</label>
      <div class="flex gap-2">
        <LbInput
          id="property-chat-input"
          v-model="chatInput"
          placeholder="Message about this listing…"
          :clearable="false"
          ui-class="flex-1"
          @keydown.enter.exact.prevent="submit"
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
  </section>
</template>
