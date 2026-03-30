<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  LCircleMarker,
  LLayerGroup,
  LMap,
  LPopup,
  LTileLayer,
} from '@vue-leaflet/vue-leaflet'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  amenityPointsAround,
  defaultMapCenter,
  mapPopularAreas,
  type MapPopularArea,
} from '~/data/mapPopularAreas'

const props = withDefaults(
  defineProps<{
    areas?: MapPopularArea[]
    /** Synced when user picks an area (list or marker). */
    modelValue?: string | null
  }>(),
  {
    areas: () => mapPopularAreas,
    modelValue: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [id: string | null]
}>()

const zoom = ref(11)
const center = ref<[number, number]>([...defaultMapCenter])
const mapRef = ref<InstanceType<typeof LMap> | null>(null)

const showAmenities = ref(false)

const selectedId = computed({
  get: () => props.modelValue ?? null,
  set: (v) => emit('update:modelValue', v),
})

const selectedArea = computed(
  () => props.areas.find((a) => a.id === selectedId.value) ?? null,
)

const amenityMarkers = computed(() => {
  if (!showAmenities.value || !selectedArea.value) return []
  return amenityPointsAround(selectedArea.value.lat, selectedArea.value.lng)
})

function resolveLeafletMap(): LeafletMap | null {
  const comp = mapRef.value as unknown as {
    leafletObject?: LeafletMap | { value: LeafletMap }
  } | null
  const lo = comp?.leafletObject
  if (!lo) return null
  return typeof (lo as { value?: LeafletMap }).value !== 'undefined'
    ? (lo as { value: LeafletMap }).value
    : (lo as LeafletMap)
}

function flyToArea(area: MapPopularArea) {
  selectedId.value = area.id
  const map = resolveLeafletMap()
  if (map) {
    map.flyTo([area.lat, area.lng], 14, { duration: 0.85 })
  } else {
    center.value = [area.lat, area.lng]
    zoom.value = 14
  }
}

function resetMap() {
  selectedId.value = null
  showAmenities.value = false
  const map = resolveLeafletMap()
  if (map) {
    map.flyTo(defaultMapCenter, 11, { duration: 0.75 })
  } else {
    center.value = [...defaultMapCenter]
    zoom.value = 11
  }
}

function toggleAmenities() {
  if (!selectedArea.value) return
  showAmenities.value = !showAmenities.value
}

function amenityColor(kind: string) {
  if (kind === 'hospital') return '#dc2626'
  if (kind === 'transit') return '#2563eb'
  return '#16a34a'
}

defineExpose({
  flyToArea,
  resetMap,
  toggleAmenities,
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-base font-semibold text-heading">
          Interactive map
        </h2>
        <p class="text-xs text-muted">
          OpenStreetMap tiles · pan and zoom to explore
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-heading transition hover:border-hero/30 hover:bg-nav-active/50 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!selectedArea"
          @click="toggleAmenities"
        >
          {{ showAmenities ? 'Hide amenities' : 'Amenities' }}
        </button>
        <button
          type="button"
          class="rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-heading transition hover:border-hero/30 hover:bg-nav-active/50"
          @click="resetMap"
        >
          Reset
        </button>
      </div>
    </div>

    <div
      class="relative isolate overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06]"
    >
      <div class="h-[min(420px,55vh)] w-full min-h-[280px] sm:h-[min(480px,60vh)]">
        <LMap
          ref="mapRef"
          v-model:zoom="zoom"
          v-model:center="center"
          :use-global-leaflet="false"
          class="h-full w-full [&_.leaflet-container]:z-0 [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:bg-slate-100 dark:[&_.leaflet-container]:bg-slate-900"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            layer-type="base"
            name="OpenStreetMap"
          />

          <LCircleMarker
            v-for="area in areas"
            :key="area.id"
            :lat-lng="[area.lat, area.lng]"
            :radius="selectedId === area.id ? 11 : 7"
            :weight="2"
            :color="selectedId === area.id ? '#1d4ed8' : '#3b82f6'"
            :fill-color="selectedId === area.id ? '#2563eb' : '#60a5fa'"
            :fill-opacity="0.85"
            @click="flyToArea(area)"
          >
            <LPopup>
              <div class="min-w-[10rem] text-sm">
                <p class="font-semibold text-heading">
                  {{ area.name }}
                </p>
                <p class="mt-1 text-xs text-muted">
                  {{ area.propertyCount }} properties · from {{ area.priceBand }}
                </p>
                <NuxtLink
                  :to="{ path: '/search', query: { q: area.name } }"
                  class="mt-2 inline-block text-xs font-semibold text-hero hover:underline"
                >
                  Search this area →
                </NuxtLink>
              </div>
            </LPopup>
          </LCircleMarker>

          <LLayerGroup v-if="amenityMarkers.length">
            <LCircleMarker
              v-for="(am, i) in amenityMarkers"
              :key="`${am.lat}-${am.lng}-${i}`"
              :lat-lng="[am.lat, am.lng]"
              :radius="5"
              :weight="1"
              :color="amenityColor(am.kind)"
              :fill-color="amenityColor(am.kind)"
              :fill-opacity="0.75"
            >
              <LPopup>
                <span class="text-sm font-medium">{{ am.label }}</span>
              </LPopup>
            </LCircleMarker>
          </LLayerGroup>
        </LMap>
      </div>
      <p class="border-t border-border px-3 py-2 text-[10px] text-muted sm:text-xs">
        <a
          href="https://leafletjs.com/"
          rel="noopener noreferrer"
          target="_blank"
          class="font-medium text-hero hover:underline"
        >Leaflet</a>
        · © OpenStreetMap contributors
      </p>
    </div>
  </div>
</template>
