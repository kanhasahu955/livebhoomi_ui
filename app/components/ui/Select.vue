<script setup lang="ts">
import type { SelectProps } from 'element-plus'
import type { LbSelectOption } from '~/types/ui'

type Props = {
  modelValue?: string | number | (string | number)[]
  options: LbSelectOption[]
  placeholder?: string
  size?: SelectProps['size']
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  disabled?: boolean
  loading?: boolean
  uiClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select',
  size: 'default',
  clearable: true,
  filterable: false,
  multiple: false,
  disabled: false,
  loading: false,
  uiClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | undefined]
  change: [value: string | number | (string | number)[] | undefined]
}>()

function onUpdate(val: string | number | (string | number)[] | undefined) {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <el-select
    :model-value="modelValue"
    :placeholder="placeholder"
    :size="size"
    :clearable="clearable"
    :filterable="filterable"
    :multiple="multiple"
    :disabled="disabled"
    :loading="loading"
    :class="uiClass"
    @update:model-value="onUpdate"
  >
    <el-option
      v-for="opt in options"
      :key="String(opt.value)"
      :label="opt.label"
      :value="opt.value"
      :disabled="opt.disabled"
    />
  </el-select>
</template>
