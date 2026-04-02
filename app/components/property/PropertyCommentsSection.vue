<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  listingId: string
}>()

const author = ref('')
const body = ref('')

const { comments, addComment } = usePropertyComments(
  () => props.listingId,
)

function submit() {
  addComment(author.value, body.value)
  body.value = ''
}

function formatWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}
</script>

<template>
  <section
    id="property-comments"
    class="lb-card-elevated rounded-3xl border border-border/80 p-5 shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.06] sm:p-7"
  >
    <h2 class="flex items-center gap-2 text-lg font-bold text-heading">
      <MessageCircle class="size-5 text-hero" />
      Questions &amp; comments
    </h2>
    <p class="mt-1 text-sm text-muted">
      Public thread for this listing — stored in your browser until you connect
      <code class="rounded bg-nav-active px-1 text-[11px]">POST /listings/:id/comments</code>.
    </p>

    <ul
      v-if="comments.length"
      class="mt-6 space-y-4 border-t border-border/60 pt-6"
    >
      <li
        v-for="c in comments"
        :key="c.id"
        class="rounded-xl border border-border/70 bg-nav-active/25 px-4 py-3 dark:bg-hero/5"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <span class="text-sm font-bold text-heading">{{ c.author }}</span>
          <time
            class="text-[11px] text-muted tabular-nums"
            :datetime="c.createdAt"
          >{{ formatWhen(c.createdAt) }}</time>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-body">
          {{ c.body }}
        </p>
      </li>
    </ul>
    <p
      v-else
      class="mt-6 rounded-xl border border-dashed border-border bg-surface/50 py-8 text-center text-sm text-muted"
    >
      No comments yet — start the conversation below.
    </p>

    <form
      class="mt-6 space-y-3 border-t border-border/60 pt-6"
      @submit.prevent="submit"
    >
      <div>
        <label
          for="listing-comment-author"
          class="mb-1.5 block text-xs font-semibold text-heading"
        >Your name (optional)</label>
        <LbInput
          id="listing-comment-author"
          v-model="author"
          placeholder="e.g. Rahul"
          ui-class="w-full"
        />
      </div>
      <div>
        <label
          for="listing-comment-body"
          class="mb-1.5 block text-xs font-semibold text-heading"
        >Comment</label>
        <el-input
          id="listing-comment-body"
          v-model="body"
          type="textarea"
          :rows="3"
          maxlength="1200"
          show-word-limit
          placeholder="Ask a question or leave a note for others viewing this listing…"
        />
      </div>
      <LbButton
        type="submit"
        variant="primary"
        :disabled="!body.trim()"
        ui-class="w-full sm:w-auto"
      >
        Post comment
      </LbButton>
    </form>
  </section>
</template>
