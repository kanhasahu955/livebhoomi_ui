import { computed, ref, watch } from 'vue'
import type { SearchIntent } from '~/config/propertySearch.config'
import {
  bhkChips,
  budgetOptionsForIntent,
  buildPropertiesQuery,
  cityOptions,
  intentTabs,
  localityChipsByCity,
  parseSearchFromRouteQuery,
  propertyTypeOptionsForIntent,
} from '~/config/propertySearch.config'

export type UsePropertySearchFormOptions = {
  /** When true, fields follow `route.query` (e.g. `/search?intent=rent`). */
  syncFromRoute?: boolean
  /** When syncing, used if `intent` is missing from the query (home hero defaults to PG). */
  defaultIntentFromRoute?: SearchIntent
}

export function usePropertySearchForm(
  options: UsePropertySearchFormOptions = {},
) {
  const route = useRoute()

  const intent = ref<SearchIntent>('pg')
  const city = ref('hyderabad')
  const locality = ref('')
  const propertyType = ref('')
  const budget = ref('')
  const bhk = ref('')

  const suppressIntentDependentReset = ref(false)

  function hydrateFromRoute() {
    const p = parseSearchFromRouteQuery(route.query, {
      defaultIntent: options.defaultIntentFromRoute,
    })
    suppressIntentDependentReset.value = true
    intent.value = p.intent
    city.value = p.city
    locality.value = p.locality
    propertyType.value = p.propertyType
    budget.value = p.budget
    bhk.value = p.bhk
    suppressIntentDependentReset.value = false
  }

  if (options.syncFromRoute) {
    watch(() => route.query, hydrateFromRoute, { deep: true, immediate: true })
  }

  watch(intent, () => {
    if (suppressIntentDependentReset.value) return
    propertyType.value = ''
    budget.value = ''
    bhk.value = ''
  })

  const propertyTypeOptions = computed(() =>
    propertyTypeOptionsForIntent(intent.value),
  )
  const budgetOptions = computed(() => budgetOptionsForIntent(intent.value))
  const activeLocalityChips = computed(
    () =>
      localityChipsByCity[city.value] ?? [
        'City center',
        'IT corridor',
        'Metro nearby',
      ],
  )
  const showBhkChips = computed(
    () => intent.value === 'buy' || intent.value === 'rent',
  )

  const cityLabel = computed(() => {
    const c = cityOptions.find((o) => o.value === city.value)
    return c?.label ?? 'India'
  })

  function applyLocalityChip(place: string) {
    locality.value = place
  }

  function toggleBhk(value: string) {
    bhk.value = bhk.value === value ? '' : value
  }

  function clearFilters() {
    locality.value = ''
    propertyType.value = ''
    budget.value = ''
    bhk.value = ''
  }

  function submitSearch() {
    navigateTo({
      path: '/properties',
      query: buildPropertiesQuery({
        intent: intent.value,
        city: city.value,
        locality: locality.value,
        propertyType: propertyType.value,
        budget: budget.value,
        bhk: bhk.value,
      }),
    })
  }

  const hasActiveFilters = computed(
    () =>
      Boolean(
        locality.value.trim() ||
          propertyType.value ||
          budget.value ||
          bhk.value,
      ),
  )

  return {
    intent,
    city,
    locality,
    propertyType,
    budget,
    bhk,
    propertyTypeOptions,
    budgetOptions,
    activeLocalityChips,
    showBhkChips,
    cityLabel,
    applyLocalityChip,
    toggleBhk,
    clearFilters,
    submitSearch,
    hasActiveFilters,
    intentTabs,
    cityOptions,
    bhkChips,
  }
}
