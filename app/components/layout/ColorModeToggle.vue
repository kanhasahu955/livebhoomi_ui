<script setup lang="ts">
import { computed } from 'vue'

type ColorPref = 'light' | 'dark' | 'system'

defineProps<{
  /** Matches header dropdown styling (hero vs scrolled). */
  popperClass?: string
}>()

const colorMode = useColorMode()

const preference = computed(() => (colorMode.preference ?? 'system') as ColorPref)

function setPreference(p: ColorPref) {
  colorMode.preference = p
}

const isSystem = computed(() => preference.value === 'system')
const isDarkPref = computed(() => preference.value === 'dark')
const isLightPref = computed(() => preference.value === 'light')

const ariaLabel = computed(() => {
  if (isSystem.value) return 'Theme: system'
  if (isDarkPref.value) return 'Theme: dark'
  return 'Theme: light'
})
</script>

<template>
  <el-dropdown
    trigger="click"
    placement="bottom-end"
    :popper-class="popperClass ?? 'lb-dd-popper'"
  >
    <button
      type="button"
      class="lb-btn-icon-light"
      :aria-label="ariaLabel"
    >
      <svg
        v-if="isSystem"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" stroke-linecap="round" />
      </svg>
      <svg
        v-else-if="isLightPref"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke-linecap="round" />
      </svg>
      <svg
        v-else
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :class="{ 'is-active-pref': isLightPref }" @click="setPreference('light')">
          <span class="flex items-center gap-2">
            <svg class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke-linecap="round" />
            </svg>
            Light
          </span>
        </el-dropdown-item>
        <el-dropdown-item :class="{ 'is-active-pref': isDarkPref }" @click="setPreference('dark')">
          <span class="flex items-center gap-2">
            <svg class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Dark
          </span>
        </el-dropdown-item>
        <el-dropdown-item :class="{ 'is-active-pref': isSystem }" @click="setPreference('system')">
          <span class="flex items-center gap-2">
            <svg class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" stroke-linecap="round" />
            </svg>
            System
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
:deep(.is-active-pref) {
  color: var(--el-color-primary);
  font-weight: 600;
}
</style>
