<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import logoSrc from '~/assets/images/logo.png?url'

const mobileOpen = ref(false)
const { y: scrollY } = useWindowScroll()

/** Same threshold as before on home: bar becomes floating gradient after this scroll. */
const SCROLL_THRESHOLD = 48

const isScrolled = computed(() => scrollY.value > SCROLL_THRESHOLD)

type NavChild = { label: string; to: string }
type NavGroup = { label: string; defaultTo: string; children: NavChild[] }

const navGroups: NavGroup[] = [
  {
    label: 'Buy',
    defaultTo: '/properties',
    children: [
      { label: 'Flats & houses for sale', to: '/properties' },
      { label: 'Search & query', to: '/search' },
      { label: 'New projects', to: '/projects' },
      { label: 'Plots & land', to: '/properties?intent=plots' },
    ],
  },
  {
    label: 'Rent',
    defaultTo: '/rent',
    children: [
      { label: 'Flats on rent', to: '/rent' },
      { label: 'PG / Hostel', to: '/pg' },
      { label: 'Co-living', to: '/pg' },
    ],
  },
  {
    label: 'Commercial',
    defaultTo: '/commercial',
    children: [
      { label: 'Office space', to: '/commercial' },
      { label: 'Retail / shop', to: '/commercial' },
    ],
  },
  {
    label: 'Services',
    defaultTo: '/contact',
    children: [
      { label: 'Contact & help', to: '/contact' },
      { label: 'Blog', to: '/blog' },
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
    ],
  },
]

function go(to: string) {
  mobileOpen.value = false
  navigateTo(to)
}

/** At top: dark menus (over hero / gradient strip). Scrolled: light menus. */
const ddPopperClass = computed(() =>
  isScrolled.value ? 'lb-dd-popper' : 'lb-dd-popper lb-dd-popper--hero',
)

const headerRootClass = computed(() =>
  isScrolled.value
    ? 'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out'
    : 'absolute inset-x-0 top-0 z-50 transition-all duration-300 ease-out',
)

const headerBarClass = computed(() =>
  isScrolled.value
    ? 'lb-header-float w-full rounded-none rounded-b-[1.25rem] border-b border-white/25 pt-[env(safe-area-inset-top)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-xl backdrop-saturate-150 sm:rounded-b-[1.75rem]'
    : 'w-full border-b border-white/10 bg-transparent backdrop-blur-md',
)

const headerRowClass =
  'mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-[3.75rem] sm:px-6 lg:px-8'

const navTriggerClass =
  'group inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-tight text-white/95 transition duration-200 hover:bg-white/15 hover:text-white xl:px-3.5'

const navShellClass = computed(() =>
  isScrolled.value
    ? 'rounded-full border border-white/20 bg-white/10 px-1 py-1 shadow-inner shadow-black/10 backdrop-blur-md'
    : 'rounded-full border border-white/20 bg-white/10 px-1 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl',
)

/** Map & pricing live only in the header (not home cards). */
const headerFeatureLinks = [
  { label: 'Map explore', to: '/map' },
  { label: 'Pricing', to: '/pricing' },
] as const

const mobileQuickLinks = [
  { label: 'Search', to: '/search', icon: 'search' },
  { label: 'Map explore', to: '/map', icon: 'map' },
  { label: 'Pricing', to: '/pricing', icon: 'tag' },
] as const
</script>

<template>
  <!-- Every page: transparent at top → floating LiveBhoomi gradient bar on scroll (same as old home). -->
  <header :class="headerRootClass">
    <div :class="headerBarClass">
      <div :class="headerRowClass">
        <NuxtLink
          to="/"
          class="relative z-10 flex shrink-0 items-center rounded-lg outline-none ring-offset-2 focus-visible:ring-2 ring-white/35"
          @click="mobileOpen = false"
        >
          <img
            :src="logoSrc"
            alt="Live Bhoomi"
            width="160"
            height="48"
            class="h-8 w-auto max-w-[132px] object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:h-9 sm:max-w-[152px]"
            loading="eager"
            decoding="async"
          />
        </NuxtLink>

        <div
          class="hidden min-w-0 flex-1 items-center justify-center gap-2 px-2 lg:flex xl:gap-3"
        >
          <nav
            :class="navShellClass"
            class="flex max-w-full flex-wrap items-center justify-center gap-0.5 xl:gap-0.5"
            aria-label="Primary"
          >
            <el-dropdown
              v-for="group in navGroups"
              :key="group.label"
              trigger="hover"
              placement="bottom"
              :popper-class="ddPopperClass"
              :show-timeout="80"
              :hide-timeout="120"
            >
              <span
                :class="navTriggerClass"
                role="button"
                tabindex="0"
              >
                {{ group.label }}
                <svg
                  class="h-3 w-3 opacity-80 transition duration-200 group-hover:translate-y-px group-hover:opacity-100"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2.5 4.25 6 7.75 9.5 4.25z" />
                </svg>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="child in group.children"
                    :key="child.to"
                    @click="go(child.to)"
                  >
                    {{ child.label }}
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="go(group.defaultTo)">
                    View all {{ group.label.toLowerCase() }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </nav>
          <div
            class="hidden h-8 w-px shrink-0 bg-white/25 lg:block"
            aria-hidden="true"
          />
          <nav
            class="hidden items-center gap-0.5 lg:flex"
            aria-label="Map and pricing"
          >
            <NuxtLink
              v-for="link in headerFeatureLinks"
              :key="link.to"
              :to="link.to"
              :class="navTriggerClass"
              :title="link.label"
            >
              <span class="xl:hidden">{{ link.label === 'Map explore' ? 'Map' : link.label }}</span>
              <span class="hidden xl:inline">{{ link.label }}</span>
            </NuxtLink>
          </nav>
        </div>

        <div
          class="relative z-10 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5"
        >
          <ColorModeToggle :popper-class="ddPopperClass" />
          <button
            type="button"
            class="lb-link-underline-light hidden sm:inline"
            @click="go('/contact')"
          >
            Download App
          </button>
          <button
            type="button"
            class="lb-btn-ghost-light hidden md:inline"
            @click="go('/shortlist')"
          >
            Shortlist
          </button>
          <button
            type="button"
            class="lb-btn-inverse hidden sm:inline-flex"
            @click="go('/post-property')"
          >
            Post Property
            <span class="lb-badge-free ml-1.5">Free</span>
          </button>
          <button
            type="button"
            class="lb-btn-icon-light"
            aria-label="Account"
            @click="go('/login')"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          <button
            type="button"
            class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white shadow-inner shadow-black/10 backdrop-blur-sm transition hover:bg-white/15 lg:hidden"
            :aria-expanded="mobileOpen"
            :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
              v-if="!mobileOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="lb-mobile-drawer">
      <div
        v-if="mobileOpen"
        class="w-full lg:hidden"
      >
        <div
          class="border-t px-4 py-5"
          :class="
            isScrolled
              ? 'lb-header-float rounded-b-2xl border-t border-white/20 shadow-2xl shadow-black/25'
              : 'border-white/15 bg-slate-950/80 backdrop-blur-2xl'
          "
        >
          <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
            Quick links
          </p>
          <div class="mb-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <NuxtLink
              v-for="q in mobileQuickLinks"
              :key="q.to"
              :to="q.to"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-white/20"
              @click="mobileOpen = false"
            >
              <svg v-if="q.icon === 'search'" class="size-3.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" stroke-linecap="round" />
              </svg>
              <svg v-else-if="q.icon === 'map'" class="size-3.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 20l-6-3V4l6 3 6-3 6 3v13l-6 3-6-3z" stroke-linejoin="round" />
                <path d="M9 10V20M15 7v13" stroke-linejoin="round" />
              </svg>
              <svg v-else class="size-3.5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ q.label }}
            </NuxtLink>
          </div>
          <nav class="flex flex-col gap-3" aria-label="Mobile">
          <button
            type="button"
            class="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10"
            @click="go('/contact'); mobileOpen = false"
          >
            Download App
          </button>
          <button
            type="button"
            class="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10"
            @click="go('/shortlist'); mobileOpen = false"
          >
            Shortlist
          </button>
          <div
            v-for="group in navGroups"
            :key="group.label"
            class="space-y-1"
          >
            <p class="text-[11px] font-bold uppercase tracking-[0.12em] text-white/50">
              {{ group.label }}
            </p>
            <NuxtLink
              v-for="child in group.children"
              :key="child.to"
              :to="child.to"
              class="rounded-xl px-3 py-2.5 text-sm font-medium text-white/95 transition hover:bg-white/10"
              @click="mobileOpen = false"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
          <div class="mt-3 flex flex-col gap-2 border-t border-white/15 pt-4">
            <NuxtLink
              to="/post-property"
              class="lb-btn-inverse w-full justify-center py-3 sm:w-auto"
              @click="mobileOpen = false"
            >
              Post Property
              <span class="lb-badge-free ml-2">Free</span>
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="lb-btn-primary w-full justify-center py-3 sm:w-auto"
              @click="mobileOpen = false"
            >
              Login
            </NuxtLink>
          </div>
        </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style>
.lb-mobile-drawer-enter-active,
.lb-mobile-drawer-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.lb-mobile-drawer-enter-from,
.lb-mobile-drawer-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}
@media (prefers-reduced-motion: reduce) {
  .lb-mobile-drawer-enter-active,
  .lb-mobile-drawer-leave-active {
    transition: none;
  }
}

/* Floated scrolled header — purple → primary blue (LiveBhoomi tokens). */
.lb-header-float {
  background: linear-gradient(
    105deg,
    #5b21b6 0%,
    #4f46e5 18%,
    var(--lb-primary) 52%,
    color-mix(in srgb, var(--lb-accent-text) 82%, white) 100%
  );
}
.lb-dd-popper.el-popper {
  --el-bg-color-overlay: #ffffff;
  --el-border-color-light: var(--lb-border);
  border-radius: 1rem;
  padding: 0.35rem 0;
  box-shadow:
    0 22px 50px -14px rgb(15 23 42 / 0.2),
    0 0 0 1px rgb(15 23 42 / 0.05);
}
.lb-dd-popper .el-dropdown-menu__item {
  border-radius: 0.5rem;
  margin: 0 0.35rem;
  padding: 0.55rem 0.85rem;
}
html.dark .lb-dd-popper.el-popper,
.dark .lb-dd-popper.el-popper {
  --el-bg-color-overlay: var(--lb-card);
  --el-border-color-light: var(--lb-border);
}
.lb-dd-popper--hero.el-popper {
  --el-bg-color-overlay: rgb(15 23 42 / 0.96);
  --el-border-color-light: rgb(255 255 255 / 0.12);
  box-shadow:
    0 20px 50px -12px rgb(0 0 0 / 0.45),
    0 0 0 1px rgb(255 255 255 / 0.08);
}
.lb-dd-popper--hero .el-dropdown-menu__item {
  color: rgb(248 250 252 / 0.92);
}
.lb-dd-popper--hero .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgb(255 255 255 / 0.08);
  color: #fff;
}
.lb-dd-popper--hero .el-dropdown-menu__item--divided:before {
  background-color: rgb(255 255 255 / 0.12);
}
</style>
