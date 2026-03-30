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
    ? 'lb-header-float w-full rounded-none rounded-b-[1.25rem] border-b border-white/20 pt-[env(safe-area-inset-top)] shadow-lg shadow-slate-900/30 backdrop-blur-md sm:rounded-b-[1.75rem]'
    : 'w-full border-b border-white/10 bg-transparent backdrop-blur-[6px]',
)

const headerRowClass =
  'mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-[3.75rem] sm:px-6 lg:px-8'

const navTriggerClass =
  'inline-flex cursor-pointer items-center gap-0.5 rounded-md px-2 py-2 text-sm font-medium text-white/92 transition hover:bg-white/10 hover:text-white xl:px-2.5'
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

        <div class="hidden min-w-0 flex-1 justify-center px-2 lg:flex">
          <nav
            class="flex max-w-full flex-wrap items-center justify-center gap-0.5 xl:gap-1"
            aria-label="Primary"
          >
            <el-dropdown
              v-for="group in navGroups"
              :key="group.label"
              trigger="hover"
              placement="bottom"
              :popper-class="ddPopperClass"
            >
              <span
                :class="navTriggerClass"
                role="button"
                tabindex="0"
              >
                {{ group.label }}
                <svg
                  class="h-3 w-3 opacity-75"
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
        </div>

        <div
          class="relative z-10 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5"
        >
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
            class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 text-white hover:bg-white/10 lg:hidden"
            :aria-expanded="mobileOpen"
            aria-label="Open menu"
            @click="mobileOpen = !mobileOpen"
          >
            <svg
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
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="mobileOpen"
      class="w-full lg:hidden"
    >
      <div
        class="border-t px-4 py-4"
        :class="
          isScrolled
            ? 'lb-header-float rounded-none border-t border-white/20 shadow-lg'
            : 'border-white/15 bg-slate-950/75 backdrop-blur-xl'
        "
      >
        <nav class="flex flex-col gap-3" aria-label="Mobile">
          <button
            type="button"
            class="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white hover:bg-white/10"
            @click="go('/contact'); mobileOpen = false"
          >
            Download App
          </button>
          <button
            type="button"
            class="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white hover:bg-white/10"
            @click="go('/shortlist'); mobileOpen = false"
          >
            Shortlist
          </button>
          <div
            v-for="group in navGroups"
            :key="group.label"
            class="space-y-1"
          >
            <p class="text-[11px] font-bold uppercase tracking-wider text-white/50">
              {{ group.label }}
            </p>
            <NuxtLink
              v-for="child in group.children"
              :key="child.to"
              :to="child.to"
              class="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
              @click="mobileOpen = false"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
          <div class="mt-2 flex flex-col gap-2 border-t border-white/15 pt-3">
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
  </header>
</template>

<style>
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
  border-radius: 0.75rem;
  padding: 0.25rem 0;
  box-shadow:
    0 18px 40px -12px rgb(15 23 42 / 0.18),
    0 0 0 1px rgb(15 23 42 / 0.06);
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
