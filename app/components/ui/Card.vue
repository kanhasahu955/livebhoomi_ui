<script setup lang="ts">
type Props = {
  title?: string
  /** Element Plus shadow: always | hover | never */
  shadow?: 'always' | 'hover' | 'never'
  /** Hover lift + border accent for listing tiles */
  interactive?: boolean
  uiClass?: string
}

withDefaults(defineProps<Props>(), {
  shadow: 'hover',
  interactive: false,
  uiClass: '',
})
</script>

<template>
  <el-card
    :shadow="shadow"
    :class="[
      uiClass,
      interactive &&
        'transition-shadow duration-200 hover:shadow-md cursor-pointer border border-border',
    ]"
  >
    <template v-if="title || $slots.header" #header>
      <slot name="header">
        <span class="text-heading font-semibold text-base">{{ title }}</span>
      </slot>
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-card>
</template>
