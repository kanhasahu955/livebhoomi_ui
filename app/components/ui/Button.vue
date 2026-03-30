<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from 'element-plus'

type Variant = 'primary' | 'secondary' | 'text' | 'danger' | 'success'

type Props = {
  /** Maps to Element Plus `type` + `plain` / `text` */
  variant?: Variant
  size?: ButtonProps['size']
  /** Extra classes for Tailwind / layout */
  uiClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default',
  uiClass: '',
})

const elType = computed<ButtonProps['type']>(() => {
  switch (props.variant) {
    case 'danger':
      return 'danger'
    case 'success':
      return 'success'
    case 'secondary':
      return 'default'
    default:
      return 'primary'
  }
})

const isText = computed(() => props.variant === 'text')
const isPlain = computed(() => props.variant === 'secondary')
</script>

<template>
  <el-button
    :type="elType"
    :size="size"
    :text="isText"
    :plain="isPlain"
    :class="uiClass"
  >
    <slot />
  </el-button>
</template>
