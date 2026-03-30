<script setup lang="ts">
import type { InputProps } from 'element-plus'

type Props = {
  modelValue?: string | number
  type?: InputProps['type']
  size?: InputProps['size']
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  maxlength?: number
  showWordLimit?: boolean
  /** Prefix icon (Element Plus icon component name string is not used — pass slot #prefix) */
  uiClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'default',
  clearable: true,
  showWordLimit: false,
  uiClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  clear: []
  focus: [evt: FocusEvent]
  blur: [evt: FocusEvent]
}>()

function onInput(val: string) {
  emit('update:modelValue', val)
}
</script>

<template>
  <el-input
    :model-value="modelValue"
    :type="type"
    :size="size"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    :maxlength="maxlength"
    :show-word-limit="showWordLimit"
    :class="uiClass"
    @update:model-value="onInput"
    @clear="emit('clear')"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </el-input>
</template>
