<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { contactConfig, contactSocialLinks } from '~/config/contact.config'

const { branding } = useTheme()

useSeoMeta({
  title: `Contact — ${branding.productName}`,
  description:
    'Call, message, chat with our assistant, or subscribe for product updates from LiveBhoomi.',
})

const chatInput = ref('')
const chatEndRef = ref<HTMLElement | null>(null)

const {
  messages: chatMessages,
  sending: chatSending,
  ensureWelcome,
  sendMessage,
  quickTopics,
} = useLiveBhoomiAssistant()

const trustChips = [
  'RERA-aware guidance',
  'No spam callbacks',
  'Human handoff in hours',
] as const

const slaCards = [
  {
    title: 'Email',
    stat: contactConfig.emailReplySla,
    hint: 'Best for documents & screenshots',
  },
  {
    title: 'Phone',
    stat: contactConfig.phoneSla,
    hint: 'Priority for owners & agents',
  },
  {
    title: 'Live chat',
    stat: contactConfig.chatSla,
    hint: 'Tips + routing to the right team',
  },
] as const

const faqs = [
  {
    q: 'How fast will you respond?',
    a: 'Chat gives instant guidance. Email is typically answered within one business day. Phone support follows the queue during published hours.',
  },
  {
    q: 'Can you verify a listing for me?',
    a: 'We can explain what to check and how to use on-platform signals — we do not guarantee third-party listings. Escalate suspicious posts with links via email.',
  },
  {
    q: 'I’m an owner — how do I get help?',
    a: 'Use Post property and the owner dashboard first. For payouts, boosts, or verification, email support with your registered phone number.',
  },
  {
    q: 'Where is my data stored?',
    a: 'We follow our Privacy policy for retention and subprocessors. Ask compliance questions through the email channel with “Privacy” in the subject.',
  },
] as const

function scrollChatToEnd() {
  nextTick(() => {
    chatEndRef.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
}

watch(
  chatMessages,
  () => {
    scrollChatToEnd()
  },
  { deep: true },
)

watch(chatSending, () => scrollChatToEnd())

function sendChat() {
  const t = chatInput.value
  chatInput.value = ''
  sendMessage(t)
}

function onQuickTopic(topic: string) {
  sendMessage(topic)
}

const subscribeEmail = ref('')
const subscribeStatus = ref<'idle' | 'ok' | 'invalid'>('idle')

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

function onSubscribe() {
  if (!isValidEmail(subscribeEmail.value)) {
    subscribeStatus.value = 'invalid'
    return
  }
  subscribeStatus.value = 'ok'
  subscribeEmail.value = ''
  window.setTimeout(() => {
    subscribeStatus.value = 'idle'
  }, 5000)
}

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`${branding.productName} — Support request`)
  const body = encodeURIComponent('Hi LiveBhoomi team,\n\n')
  return `mailto:${contactConfig.supportEmail}?subject=${subject}&body=${body}`
})

onMounted(() => {
  ensureWelcome()
})
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <!-- Hero: LiveBhoomi primary gradient band -->
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(255,255,255,0.22),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl motion-reduce:opacity-40"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-slate-900/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8 lg:pb-28 lg:pt-16"
      >
        <div
          v-motion
          class="mx-auto max-w-3xl text-center"
          :initial="{ opacity: 0, y: 18 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 320, damping: 30 },
          }"
        >
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
            {{ branding.shortName }} support
          </p>
          <h1 class="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Get in touch — your way
          </h1>
          <p class="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
            Call, email, WhatsApp, live assistant, or subscribe. Same team behind the marketplace — clear answers, no runaround.
          </p>
        </div>

        <div
          class="mx-auto mt-6 flex max-w-xl flex-wrap items-center justify-center gap-2 sm:mt-8"
        >
          <span
            v-for="chip in trustChips"
            :key="chip"
            class="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
          >
            {{ chip }}
          </span>
        </div>

        <div
          class="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3 sm:gap-4"
        >
          <div
            v-for="(card, i) in slaCards"
            :key="card.title"
            v-motion
            class="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-center backdrop-blur-md sm:px-5 sm:text-left"
            :initial="{ opacity: 0, y: 14 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 28, delay: 80 + i * 60 },
            }"
          >
            <p class="text-[11px] font-semibold uppercase tracking-wide text-white/65">
              {{ card.title }}
            </p>
            <p class="mt-1 text-lg font-bold text-white sm:text-xl">
              {{ card.stat }}
            </p>
            <p class="mt-1 text-xs text-white/75">
              {{ card.hint }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlapping main panel -->
    <div class="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div
        class="-mt-14 rounded-3xl border border-border bg-card shadow-[0_25px_80px_-24px_rgba(15,23,42,0.25)] dark:shadow-slate-950/50 sm:-mt-16"
      >
        <div class="grid gap-0 lg:grid-cols-12 lg:gap-0">
          <!-- Contact channels -->
          <div
            class="flex flex-col gap-0 border-b border-border p-5 sm:p-7 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-8"
          >
            <p class="text-xs font-semibold uppercase tracking-wider text-hero">
              Channels
            </p>
            <h2 class="mt-1 text-xl font-bold text-heading sm:text-2xl">
              Choose a channel
            </h2>
            <p class="mt-2 text-sm text-muted leading-relaxed">
              {{ contactConfig.hoursLine }} · {{ contactConfig.officeHeadline }}
            </p>

            <div class="mt-8 flex flex-col gap-4">
              <!-- Call -->
              <div
                class="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-nav-active/80 to-card p-5 transition duration-300 hover:border-hero/25 hover:shadow-md dark:from-hero/10 dark:to-card"
              >
                <div class="flex items-start gap-4">
                  <span
                    class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-hero text-white shadow-md shadow-hero/25"
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
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
                      />
                    </svg>
                  </span>
                  <div class="min-w-0 flex-1">
                    <h3
                      id="contact-call-heading"
                      class="text-base font-semibold text-heading"
                    >
                      Phone
                    </h3>
                    <p class="mt-1 text-sm text-muted leading-relaxed">
                      Voice support for owners, agents, and urgent listing issues.
                    </p>
                    <a
                      :href="`tel:${contactConfig.supportPhoneTel}`"
                      class="lb-btn-primary mt-4 inline-flex w-full justify-center sm:w-auto"
                    >
                      {{ contactConfig.supportPhoneDisplay }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Message -->
              <div
                class="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition duration-300 hover:border-hero/25 hover:shadow-md"
              >
                <div class="flex items-start gap-4">
                  <span
                    class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface text-hero dark:bg-surface/80"
                  >
                    <svg
                      class="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <rect
                        x="2"
                        y="4"
                        width="20"
                        height="16"
                        rx="2"
                      />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  </span>
                  <div class="min-w-0 flex-1">
                    <h3
                      id="contact-message-heading"
                      class="text-base font-semibold text-heading"
                    >
                      Email & WhatsApp
                    </h3>
                    <p class="mt-1 text-sm text-muted leading-relaxed">
                      Async threads with attachments, or quick WhatsApp for short questions.
                    </p>
                    <div class="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                      <a
                        :href="mailtoHref"
                        class="lb-btn-surface inline-flex flex-1 justify-center gap-2"
                      >
                        <span class="text-hero">@</span>
                        Email us
                      </a>
                      <a
                        :href="contactConfig.whatsappUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-600/25 bg-emerald-50/90 px-4 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-900/40"
                      >
                        <svg
                          class="size-4 shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                          />
                        </svg>
                        {{ contactConfig.whatsappLabel }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subscribe -->
              <div
                class="relative overflow-hidden rounded-2xl border border-hero/20 bg-gradient-to-br from-hero/[0.06] via-card to-sky-500/[0.04] p-5 dark:from-hero/15 dark:via-card dark:to-slate-900/40"
              >
                <div
                  class="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-hero/10 blur-2xl"
                  aria-hidden="true"
                />
                <h3
                  id="contact-subscribe-heading"
                  class="relative text-base font-semibold text-heading"
                >
                  Newsletter
                </h3>
                <p class="relative mt-1 text-sm text-muted leading-relaxed">
                  Product updates, new cities, and owner tips — low volume, easy unsubscribe.
                </p>
                <form
                  class="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-start"
                  @submit.prevent="onSubscribe"
                >
                  <div class="min-w-0 flex-1">
                    <label
                      for="subscribe-email"
                      class="sr-only"
                    >Email for newsletter</label>
                    <LbInput
                      id="subscribe-email"
                      v-model="subscribeEmail"
                      type="email"
                      autocomplete="email"
                      placeholder="you@example.com"
                      :clearable="true"
                      ui-class="w-full"
                    />
                    <p
                      v-if="subscribeStatus === 'invalid'"
                      class="mt-2 text-xs font-medium text-destructive"
                      role="alert"
                    >
                      Enter a valid email address.
                    </p>
                    <p
                      v-else-if="subscribeStatus === 'ok'"
                      class="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                      role="status"
                    >
                      Subscribed — thank you. Connect this field to your ESP when ready.
                    </p>
                  </div>
                  <LbButton
                    type="submit"
                    variant="primary"
                    ui-class="w-full shrink-0 sm:w-auto sm:min-w-[8.5rem]"
                  >
                    Subscribe
                  </LbButton>
                </form>
              </div>

              <!-- Visit + social -->
              <div
                class="rounded-2xl border border-dashed border-border bg-surface/60 p-5 dark:bg-surface/30"
              >
                <h3 class="text-sm font-semibold text-heading">
                  Visit & follow
                </h3>
                <p class="mt-2 text-sm text-muted leading-relaxed">
                  {{ contactConfig.officeDetail }}
                </p>
                <p class="mt-3 text-sm font-medium text-heading">
                  {{ contactConfig.officeHeadline }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <a
                    v-for="s in contactSocialLinks"
                    :key="s.href"
                    :href="s.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-heading transition hover:border-hero/30 hover:text-hero"
                  >
                    {{ s.label }}
                  </a>
                </div>
                <div class="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  <NuxtLink
                    to="/post-property"
                    class="text-xs font-semibold text-hero hover:underline"
                  >
                    Post property
                  </NuxtLink>
                  <span
                    class="text-xs text-muted"
                    aria-hidden="true"
                  >·</span>
                  <NuxtLink
                    to="/blog"
                    class="text-xs font-semibold text-hero hover:underline"
                  >
                    Blog
                  </NuxtLink>
                  <span
                    class="text-xs text-muted"
                    aria-hidden="true"
                  >·</span>
                  <NuxtLink
                    to="/premium"
                    class="text-xs font-semibold text-hero hover:underline"
                  >
                    Premium
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Live agent -->
          <section
            id="live-agent"
            class="flex flex-col lg:col-span-7"
            aria-labelledby="contact-live-agent-heading"
          >
            <div
              class="flex min-h-[min(32rem,70vh)] flex-1 flex-col border-border lg:min-h-[36rem]"
            >
              <div
                class="border-b border-border bg-gradient-to-r from-hero/10 via-card to-sky-500/[0.06] px-5 py-5 dark:from-hero/15 sm:px-6"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-hero text-sm font-bold text-white shadow-lg shadow-hero/30"
                  >
                    LB
                    <span
                      class="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-card bg-emerald-500"
                      title="Assistant online"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h2
                      id="contact-live-agent-heading"
                      class="text-lg font-bold text-heading sm:text-xl"
                    >
                      Live assistant
                    </h2>
                    <p class="mt-1 text-sm text-muted leading-relaxed">
                      Guided answers now · human agents {{ contactConfig.hoursLine }}
                    </p>
                  </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    v-for="topic in quickTopics"
                    :key="topic"
                    type="button"
                    class="rounded-full border border-hero/20 bg-card px-3 py-1.5 text-left text-xs font-medium text-heading transition hover:border-hero/40 hover:bg-nav-active/60 dark:hover:bg-hero/10"
                    @click="onQuickTopic(topic)"
                  >
                    {{ topic }}
                  </button>
                </div>
              </div>

              <div
                class="flex flex-1 flex-col overflow-hidden bg-surface/40 dark:bg-surface/20"
              >
                <div
                  class="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5"
                  role="log"
                  aria-live="polite"
                  aria-relevant="additions"
                  aria-label="Chat messages"
                >
                  <div
                    v-for="(m, i) in chatMessages"
                    :key="i"
                    class="flex gap-2"
                    :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
                  >
                    <div
                      v-if="m.role === 'bot'"
                      class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-hero/15 text-[10px] font-bold text-hero"
                    >
                      LB
                    </div>
                    <div
                      class="max-w-[min(100%,26rem)] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm"
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
                    v-if="chatSending"
                    class="flex gap-2"
                  >
                    <div
                      class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-hero/15 text-[10px] font-bold text-hero"
                    >
                      LB
                    </div>
                    <div
                      class="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3"
                    >
                      <span
                        class="lb-typing-dot size-2 rounded-full bg-muted motion-reduce:animate-none"
                      />
                      <span
                        class="lb-typing-dot lb-typing-dot--2 size-2 rounded-full bg-muted motion-reduce:animate-none"
                      />
                      <span
                        class="lb-typing-dot lb-typing-dot--3 size-2 rounded-full bg-muted motion-reduce:animate-none"
                      />
                    </div>
                  </div>
                  <div ref="chatEndRef" />
                </div>

                <form
                  class="border-t border-border bg-card p-3 sm:p-4"
                  @submit.prevent="sendChat"
                >
                  <label
                    for="live-agent-input"
                    class="sr-only"
                  >Message to assistant</label>
                  <div class="flex gap-2">
                    <LbInput
                      id="live-agent-input"
                      v-model="chatInput"
                      placeholder="Ask anything about LiveBhoomi…"
                      :clearable="false"
                      ui-class="flex-1"
                      @keydown.enter.exact.prevent="sendChat"
                    />
                    <LbButton
                      type="submit"
                      variant="primary"
                      :disabled="chatSending || !chatInput.trim()"
                      ui-class="shrink-0 px-5"
                    >
                      Send
                    </LbButton>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- FAQ -->
      <div
        class="mx-auto mt-12 max-w-3xl lg:mt-14"
      >
        <div class="text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-hero">
            FAQ
          </p>
          <h2 class="mt-2 text-2xl font-bold text-heading sm:text-3xl">
            Common questions
          </h2>
          <p class="mt-2 text-sm text-muted">
            Straight answers — escalate anytime via email with screenshots.
          </p>
        </div>
        <ul class="mt-8 space-y-3">
          <li
            v-for="(item, i) in faqs"
            :key="i"
          >
            <details
              class="group rounded-2xl border border-border bg-card shadow-sm open:border-hero/20 open:shadow-md"
            >
              <summary
                class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-heading sm:text-base"
              >
                {{ item.q }}
                <svg
                  class="size-5 shrink-0 text-muted transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </summary>
              <div class="border-t border-border px-5 pb-4 pt-2 text-sm leading-relaxed text-muted">
                {{ item.a }}
              </div>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}
.lb-typing-dot {
  animation: lb-typing 1s ease-in-out infinite;
}
.lb-typing-dot--2 {
  animation-delay: 0.2s;
}
.lb-typing-dot--3 {
  animation-delay: 0.4s;
}
@media (prefers-reduced-motion: reduce) {
  .lb-typing-dot,
  .lb-typing-dot--2,
  .lb-typing-dot--3 {
    animation: none;
    opacity: 0.7;
  }
}
@keyframes lb-typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}
</style>
