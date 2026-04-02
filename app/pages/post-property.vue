<script setup lang="ts">
import type { FormInstance, FormRules, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import type { SearchIntent } from '~/config/propertySearch.config'
import {
  bhkChips,
  budgetOptionsForIntent,
  cityOptions,
  intentTabs,
  localityChipsByCity,
  propertyTypeOptionsForIntent,
} from '~/config/propertySearch.config'
import {
  isValidEmail,
  isValidIndianMobile,
} from '~/utils/authValidators'

const { branding } = useTheme()

useSeoMeta({
  title: `Post property — ${branding.productName}`,
  description:
    'List your home, plot, or commercial space on Live Bhoomi — guided steps for type, location, pricing, and owner contact (demo submit).',
})

const step = ref(0)
const totalSteps = 5

const formRef = ref<FormInstance>()
const submitting = ref(false)

const form = reactive({
  intent: '' as SearchIntent | '',
  city: 'hyderabad',
  locality: '',
  propertyType: '',
  bhk: '',
  areaSqft: '',
  furnishing: '' as '' | 'furnished' | 'semi-furnished' | 'unfurnished',
  price: '',
  title: '',
  description: '',
  contactName: '',
  phone: '',
  email: '',
  reraId: '',
})

const photoFiles = ref<UploadUserFile[]>([])

const intentLabel = computed(() => {
  const t = intentTabs.find((x) => x.id === form.intent)
  return t?.label ?? 'Listing'
})

const propertyTypeOptions = computed(() =>
  form.intent ? propertyTypeOptionsForIntent(form.intent) : [],
)

const budgetHintOptions = computed(() =>
  form.intent ? budgetOptionsForIntent(form.intent) : [],
)

const localityChips = computed(
  () => localityChipsByCity[form.city] ?? [],
)

const showBhk = computed(
  () =>
    (form.intent === 'buy' || form.intent === 'rent') &&
    !['plots'].includes(form.intent) &&
    form.propertyType &&
    !['studio'].includes(form.propertyType) &&
    form.propertyType !== 'residential-plot' &&
    form.propertyType !== 'commercial-land' &&
    form.propertyType !== 'farmland',
)

const showBhkStudio = computed(
  () =>
    (form.intent === 'buy' || form.intent === 'rent') &&
    form.propertyType === 'studio',
)

const showFurnishing = computed(
  () =>
    form.intent === 'buy' ||
    form.intent === 'rent' ||
    form.intent === 'pg' ||
    form.intent === 'commercial',
)

const priceLabel = computed(() => {
  if (form.intent === 'rent' || form.intent === 'pg') return 'Monthly rent (₹)'
  if (form.intent === 'plots') return 'Expected price (₹)'
  return 'Expected price (₹)'
})

const suggestedTitle = computed(() => {
  const typeOpt = propertyTypeOptions.value.find(
    (o) => o.value === form.propertyType,
  )
  const typeLabel = typeOpt?.label ?? 'Property'
  const parts: string[] = []
  if (form.bhk && (showBhk.value || showBhkStudio.value)) {
    parts.push(`${form.bhk === '4' ? '4+' : form.bhk} BHK`)
  }
  parts.push(typeLabel)
  if (form.locality.trim()) parts.push(form.locality.trim())
  return parts.filter(Boolean).join(' · ')
})

watch(
  () => [form.intent, form.propertyType, form.locality, form.bhk],
  () => {
    if (!form.title.trim()) {
      form.title = suggestedTitle.value
    }
  },
  { flush: 'post' },
)

function applyChip(place: string) {
  form.locality = place
}

const rules: FormRules = {
  intent: [
    { required: true, message: 'Choose what you are listing', trigger: 'change' },
  ],
  city: [{ required: true, message: 'Select city', trigger: 'change' }],
  locality: [
    { required: true, message: 'Add locality or area', trigger: 'blur' },
    { min: 2, message: 'At least 2 characters', trigger: 'blur' },
  ],
  propertyType: [
    { required: true, message: 'Select property type', trigger: 'change' },
  ],
  bhk: [
    {
      validator: (_r, v: string, cb) => {
        if (!showBhk.value && !showBhkStudio.value) {
          cb()
          return
        }
        if (v) cb()
        else cb(new Error('Select BHK'))
      },
      trigger: 'change',
    },
  ],
  areaSqft: [
    { required: true, message: 'Enter super area', trigger: 'blur' },
    {
      validator: (_r, v: string, cb) => {
        const n = Number(String(v).replace(/,/g, ''))
        if (Number.isFinite(n) && n >= 100 && n <= 999999) cb()
        else cb(new Error('Enter a realistic sq.ft (100 – 9,99,999)'))
      },
      trigger: 'blur',
    },
  ],
  furnishing: [
    {
      validator: (_r, v: string, cb) => {
        if (!showFurnishing.value) {
          cb()
          return
        }
        if (v) cb()
        else cb(new Error('Select furnishing'))
      },
      trigger: 'change',
    },
  ],
  price: [
    { required: true, message: 'Enter amount in rupees', trigger: 'blur' },
    {
      validator: (_r, v: string, cb) => {
        const n = Number(String(v).replace(/,/g, ''))
        if (Number.isFinite(n) && n >= 1000) cb()
        else cb(new Error('Enter amount (min ₹1,000)'))
      },
      trigger: 'blur',
    },
  ],
  title: [
    { required: true, message: 'Add a listing title', trigger: 'blur' },
    { min: 8, message: 'At least 8 characters', trigger: 'blur' },
  ],
  description: [
    { required: true, message: 'Describe the property', trigger: 'blur' },
    { min: 40, message: 'At least 40 characters helps seekers', trigger: 'blur' },
  ],
  contactName: [
    { required: true, message: 'Your name', trigger: 'blur' },
    { min: 2, message: 'At least 2 characters', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'Mobile for callbacks', trigger: 'blur' },
    {
      validator: (_r, v: string, cb) => {
        if (isValidIndianMobile(v)) cb()
        else cb(new Error('Valid 10-digit Indian mobile'))
      },
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: 'Email', trigger: 'blur' },
    {
      validator: (_r, v: string, cb) => {
        if (isValidEmail(v)) cb()
        else cb(new Error('Valid email'))
      },
      trigger: 'blur',
    },
  ],
}

const stepFields: (keyof typeof form)[][] = [
  ['intent', 'city', 'locality', 'propertyType'],
  ['areaSqft', 'bhk', 'furnishing'],
  ['price', 'title'],
  ['description', 'contactName', 'phone', 'email'],
  [],
]

async function validateCurrentStep(): Promise<boolean> {
  const fields = stepFields[step.value]
  if (!fields.length) return true
  const f = formRef.value
  if (!f) return false
  try {
    await Promise.all(fields.map((prop) => f.validateField(prop as string)))
    return true
  } catch {
    return false
  }
}

async function nextStep() {
  const ok = await validateCurrentStep()
  if (!ok) return
  if (step.value < totalSteps - 1) {
    step.value += 1
    if (step.value === 2 && !form.title.trim()) {
      form.title = suggestedTitle.value
    }
  }
}

function prevStep() {
  if (step.value > 0) step.value -= 1
}

async function submitListing() {
  const f = formRef.value
  if (!f) return
  submitting.value = true
  try {
    await f.validate()
    await new Promise((r) => setTimeout(r, 800))
    ElMessage.success(
      'Listing draft saved (demo). Wire multipart upload + POST /listings to go live.',
    )
    await navigateTo('/properties')
  } catch {
    ElMessage.warning('Fix the highlighted fields before publishing.')
  } finally {
    submitting.value = false
  }
}

function onIntentChange() {
  form.propertyType = ''
  form.bhk = ''
  form.furnishing = ''
}
</script>

<template>
  <div
    class="relative min-h-[calc(100dvh-5rem)] w-full min-w-0 overflow-x-clip bg-surface pb-16 pt-6 sm:pb-24 sm:pt-10"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[min(55vh,440px)] bg-[radial-gradient(ellipse_88%_55%_at_50%_-14%,color-mix(in_srgb,var(--lb-primary)_18%,transparent),transparent_58%)] dark:bg-[radial-gradient(ellipse_82%_50%_at_50%_-10%,color-mix(in_srgb,var(--lb-primary)_28%,transparent),transparent_52%)]"
      aria-hidden="true"
    />
    <div class="relative z-[1] mx-auto w-full min-w-0 max-w-4xl px-3 sm:px-6 lg:px-8">
      <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <NuxtLink to="/" class="font-medium text-hero hover:underline">
          Home
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="font-medium text-heading">Post property</span>
      </nav>

      <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold uppercase tracking-widest text-hero">
            Owner &amp; agent
          </p>
          <h1 class="mt-2 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl md:text-4xl">
            Post your property
          </h1>
          <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            Free to start — add details in five quick steps. Nothing is published until your backend marks it live.
          </p>

          <div
            class="mt-6 min-w-0 overflow-x-auto overscroll-x-contain pb-2 sm:mt-8 sm:overflow-visible sm:pb-0"
          >
            <el-steps
              class="lb-post-steps w-full min-w-[520px] sm:min-w-0"
              :active="step"
              finish-status="success"
              align-center
            >
              <el-step title="Type &amp; place" />
              <el-step title="Details" />
              <el-step title="Price &amp; title" />
              <el-step title="Story &amp; contact" />
              <el-step title="Review" />
            </el-steps>
          </div>

          <div
            class="mt-8 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:rounded-3xl sm:p-8"
          >
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              class="lb-post-form"
              @submit.prevent
            >
              <!-- Step 0 -->
              <div v-show="step === 0" class="space-y-1">
                <h2 class="mb-4 text-lg font-bold text-heading">
                  What are you listing?
                </h2>
                <el-form-item label="I want to" prop="intent">
                  <el-select
                    v-model="form.intent"
                    size="large"
                    class="w-full"
                    placeholder="Select intent"
                    @change="onIntentChange"
                  >
                    <el-option
                      v-for="t in intentTabs"
                      :key="t.id"
                      :label="t.label"
                      :value="t.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="City" prop="city">
                  <el-select v-model="form.city" size="large" class="w-full" placeholder="City">
                    <el-option
                      v-for="c in cityOptions"
                      :key="c.value"
                      :label="c.label"
                      :value="c.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Locality / area" prop="locality">
                  <el-input
                    v-model="form.locality"
                    size="large"
                    placeholder="e.g. HSR Layout, Sector 62"
                    clearable
                  />
                </el-form-item>
                <p class="mb-2 text-xs font-semibold text-muted">
                  Popular in selected city
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <button
                    v-for="chip in localityChips"
                    :key="chip"
                    type="button"
                    class="rounded-full border border-border/70 bg-nav-active/50 px-3 py-1.5 text-xs font-semibold text-heading transition hover:border-hero/30"
                    @click="applyChip(chip)"
                  >
                    {{ chip }}
                  </button>
                </div>
                <el-form-item label="Property type" prop="propertyType">
                  <el-select
                    v-model="form.propertyType"
                    size="large"
                    class="w-full"
                    placeholder="Choose type"
                    :disabled="!form.intent"
                  >
                    <el-option
                      v-for="o in propertyTypeOptions"
                      :key="o.value || 'any'"
                      :label="o.label"
                      :value="o.value"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Step 1 -->
              <div v-show="step === 1" class="space-y-1">
                <h2 class="mb-4 text-lg font-bold text-heading">
                  Size &amp; fit-out
                </h2>
                <el-form-item label="Super built-up area (sq.ft)" prop="areaSqft">
                  <el-input
                    v-model="form.areaSqft"
                    size="large"
                    placeholder="e.g. 1250"
                    inputmode="numeric"
                  />
                </el-form-item>
                <el-form-item
                  v-if="showBhk || showBhkStudio"
                  label="BHK"
                  prop="bhk"
                >
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="c in bhkChips"
                      :key="c.value"
                      type="button"
                      class="rounded-full border px-4 py-2 text-sm font-bold transition"
                      :class="
                        form.bhk === c.value
                          ? 'border-hero bg-hero/10 text-hero ring-1 ring-hero/25'
                          : 'border-border/80 bg-nav-active/40 text-heading hover:border-hero/20'
                      "
                      @click="form.bhk = c.value"
                    >
                      {{ c.label }}
                    </button>
                  </div>
                </el-form-item>
                <el-form-item
                  v-if="showFurnishing"
                  label="Furnishing"
                  prop="furnishing"
                >
                  <el-select
                    v-model="form.furnishing"
                    size="large"
                    class="w-full"
                    placeholder="Select"
                  >
                    <el-option label="Furnished" value="furnished" />
                    <el-option label="Semi-furnished" value="semi-furnished" />
                    <el-option label="Unfurnished" value="unfurnished" />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Step 2 -->
              <div v-show="step === 2" class="space-y-1">
                <h2 class="mb-4 text-lg font-bold text-heading">
                  Price &amp; headline
                </h2>
                <el-form-item :label="priceLabel" prop="price">
                  <el-input
                    v-model="form.price"
                    size="large"
                    placeholder="e.g. 8500000"
                    inputmode="numeric"
                  />
                  <p class="mt-1 text-xs text-muted">
                    Enter full rupee amount (no commas needed). For rent, monthly amount.
                  </p>
                </el-form-item>
                <p class="text-xs font-semibold text-muted">
                  Reference bands (not saved)
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <span
                    v-for="o in budgetHintOptions.filter((x) => x.value)"
                    :key="o.value"
                    class="rounded-full border border-border/60 bg-nav-active/30 px-2.5 py-1 text-[11px] font-medium text-muted"
                  >
                    {{ o.label }}
                  </span>
                </div>
                <el-form-item label="Listing title" prop="title">
                  <el-input
                    v-model="form.title"
                    size="large"
                    placeholder="Catchy, accurate headline"
                    maxlength="120"
                    show-word-limit
                  />
                </el-form-item>
              </div>

              <!-- Step 3 -->
              <div v-show="step === 3" class="space-y-1">
                <h2 class="mb-4 text-lg font-bold text-heading">
                  Description &amp; how to reach you
                </h2>
                <el-form-item label="Description" prop="description">
                  <el-input
                    v-model="form.description"
                    type="textarea"
                    :rows="6"
                    placeholder="Facing, floor, parking, society name, nearby landmarks, possession timeline…"
                    maxlength="2000"
                    show-word-limit
                  />
                </el-form-item>
                <el-form-item label="RERA ID (optional)" prop="reraId">
                  <el-input
                    v-model="form.reraId"
                    size="large"
                    placeholder="If applicable for your state"
                    clearable
                  />
                </el-form-item>
                <p class="mb-2 text-sm font-semibold text-heading">
                  Photos
                </p>
                <el-upload
                  v-model:file-list="photoFiles"
                  drag
                  multiple
                  :auto-upload="false"
                  accept="image/jpeg,image/png,image/webp"
                  :limit="8"
                  class="w-full"
                >
                  <div class="py-6 text-center">
                    <p class="text-sm font-medium text-heading">
                      Drop files or click to browse
                    </p>
                    <p class="mt-1 text-xs text-muted">
                      JPG / PNG / WebP — demo only; hook to your storage API.
                    </p>
                  </div>
                </el-upload>
                <el-form-item label="Your name" prop="contactName" class="!mt-6">
                  <el-input
                    v-model="form.contactName"
                    size="large"
                    placeholder="Full name"
                    autocomplete="name"
                  />
                </el-form-item>
                <el-form-item label="Mobile" prop="phone">
                  <el-input
                    v-model="form.phone"
                    size="large"
                    placeholder="9876543210"
                    maxlength="14"
                    autocomplete="tel"
                  >
                    <template #prefix>
                      <span class="text-muted">+91</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                  <el-input
                    v-model="form.email"
                    size="large"
                    placeholder="you@example.com"
                    autocomplete="email"
                  />
                </el-form-item>
              </div>

              <!-- Step 4 review -->
              <div v-show="step === 4" class="space-y-4">
                <h2 class="text-lg font-bold text-heading">
                  Review &amp; publish (demo)
                </h2>
                <dl class="divide-y divide-border/60 rounded-2xl border border-border/60 bg-nav-active/20 text-sm dark:bg-nav-active/10">
                  <div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <dt class="shrink-0 text-muted">
                      Type
                    </dt>
                    <dd class="min-w-0 break-words text-left font-semibold text-heading sm:text-right">
                      {{ intentLabel }}
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <dt class="shrink-0 text-muted">
                      Location
                    </dt>
                    <dd class="min-w-0 break-words text-left font-semibold text-heading sm:text-right">
                      {{ form.locality }}, {{ cityOptions.find((c) => c.value === form.city)?.label }}
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <dt class="shrink-0 text-muted">
                      Area
                    </dt>
                    <dd class="min-w-0 break-words text-left font-semibold text-heading sm:text-right">
                      {{ form.areaSqft }} sq.ft
                    </dd>
                  </div>
                  <div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <dt class="shrink-0 text-muted">
                      Price
                    </dt>
                    <dd class="min-w-0 break-words text-left font-semibold text-heading sm:text-right">
                      ₹{{ form.price }}
                    </dd>
                  </div>
                  <div class="px-4 py-3">
                    <dt class="text-muted">
                      Title
                    </dt>
                    <dd class="mt-1 font-semibold text-heading">
                      {{ form.title }}
                    </dd>
                  </div>
                  <div class="px-4 py-3">
                    <dt class="text-muted">
                      Contact
                    </dt>
                    <dd class="mt-1 font-medium text-heading">
                      {{ form.contactName }} · +91 {{ form.phone }} · {{ form.email }}
                    </dd>
                  </div>
                  <div class="px-4 py-3">
                    <dt class="text-muted">
                      Photos
                    </dt>
                    <dd class="mt-1 text-heading">
                      {{ photoFiles.length }} file(s) selected (demo)
                    </dd>
                  </div>
                </dl>
                <p class="text-xs text-muted">
                  Submitting runs validation only — connect your API to create a draft listing and queue moderation.
                </p>
              </div>

              <div class="mt-8 flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <button
                  v-if="step > 0"
                  type="button"
                  class="lb-btn-surface w-full justify-center px-6 py-3 font-semibold sm:w-auto"
                  @click="prevStep"
                >
                  Back
                </button>
                <div class="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:justify-end">
                  <button
                    v-if="step < totalSteps - 1"
                    type="button"
                    class="lb-btn-primary w-full justify-center px-6 py-3 font-bold sm:w-auto sm:px-8"
                    @click="nextStep"
                  >
                    Continue
                  </button>
                  <button
                    v-else
                    type="button"
                    class="lb-btn-primary w-full justify-center px-6 py-3 font-bold disabled:opacity-50 sm:w-auto sm:px-8"
                    :disabled="submitting"
                    @click="submitListing"
                  >
                    {{ submitting ? 'Submitting…' : 'Submit listing' }}
                  </button>
                </div>
              </div>
            </el-form>
          </div>
        </div>

        <aside class="w-full min-w-0 shrink-0 lg:max-w-xs">
          <div
            class="rounded-2xl border border-border/70 bg-card p-5 shadow-sm lg:sticky lg:top-28"
          >
            <p class="text-xs font-bold uppercase tracking-wider text-hero">
              Tips
            </p>
            <ul class="mt-3 space-y-2 text-sm text-muted">
              <li>• Accurate sq.ft and possession dates reduce bounce.</li>
              <li>• Add at least 4 sharp photos for better CTR.</li>
              <li>• RERA ID builds trust for under-construction inventory.</li>
            </ul>
            <NuxtLink
              to="/pricing"
              class="mt-4 block text-sm font-bold text-hero hover:underline"
            >
              Boost visibility →
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="mt-2 block text-sm font-semibold text-muted hover:text-heading hover:underline"
            >
              Log in to manage drafts
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lb-post-steps :deep(.el-step__title) {
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1.2;
}
@media (min-width: 640px) {
  .lb-post-steps :deep(.el-step__title) {
    font-size: 0.8rem;
  }
}
.lb-post-form :deep(.el-form-item__label) {
  font-weight: 600;
}
</style>
