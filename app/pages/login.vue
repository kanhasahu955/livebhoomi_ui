<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onUnmounted, reactive, ref } from 'vue'
import {
  isValidEmail,
  isValidIndianMobile,
  normalizeIndianMobile,
} from '~/utils/authValidators'

const { branding } = useTheme()

useSeoMeta({
  title: `Log in — ${branding.productName}`,
  description:
    'Sign in to Live Bhoomi — save shortlists, manage listings, and message owners. Password or OTP (demo UI).',
})

type LoginMethod = 'password' | 'otp'

const method = ref<LoginMethod>('password')
const passwordFormRef = ref<FormInstance>()
const otpFormRef = ref<FormInstance>()
const loading = ref(false)

const passwordForm = reactive({
  identifier: '',
  password: '',
  remember: true,
})

const otpForm = reactive({
  phone: '',
  otp: '',
})

const otpSent = ref(false)
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

const passwordRules: FormRules = {
  identifier: [
    { required: true, message: 'Enter email or mobile', trigger: 'blur' },
    {
      validator: (_rule, value: string, callback) => {
        const v = value.trim()
        if (!v) {
          callback(new Error('Required'))
          return
        }
        if (isValidEmail(v) || isValidIndianMobile(v)) {
          callback()
          return
        }
        callback(new Error('Use a valid email or 10-digit mobile'))
      },
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Enter your password', trigger: 'blur' },
    { min: 8, message: 'At least 8 characters', trigger: 'blur' },
  ],
}

const otpRules: FormRules = {
  phone: [
    { required: true, message: 'Enter mobile number', trigger: 'blur' },
    {
      validator: (_rule, value: string, callback) => {
        if (isValidIndianMobile(value)) callback()
        else callback(new Error('Enter a valid 10-digit Indian mobile'))
      },
      trigger: 'blur',
    },
  ],
  otp: [
    { required: true, message: 'Enter the OTP', trigger: 'blur' },
    {
      len: 6,
      message: 'Enter 6 digits',
      trigger: 'blur',
    },
  ],
}

function startCooldown(seconds: number) {
  resendCooldown.value = seconds
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value -= 1
    if (resendCooldown.value <= 0 && cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

async function submitPassword() {
  const form = passwordFormRef.value
  if (!form) return
  loading.value = true
  try {
    await form.validate()
    await new Promise((r) => setTimeout(r, 650))
    ElMessage.success('Demo login — wire POST /auth/login to your API.')
    await navigateTo('/')
  } catch {
    /* validation failed */
  } finally {
    loading.value = false
  }
}

async function sendOtp() {
  const form = otpFormRef.value
  if (!form) return
  loading.value = true
  try {
    await form.validateField('phone')
    await new Promise((r) => setTimeout(r, 500))
    otpSent.value = true
    otpForm.otp = ''
    ElMessage.success(
      `OTP sent to +91 ${normalizeIndianMobile(otpForm.phone)} (demo — any 6 digits)`,
    )
    startCooldown(45)
  } catch {
    /* invalid phone */
  } finally {
    loading.value = false
  }
}

async function verifyOtp() {
  const form = otpFormRef.value
  if (!form) return
  loading.value = true
  try {
    await form.validate()
    await new Promise((r) => setTimeout(r, 550))
    ElMessage.success('Demo OTP verified — connect to your SMS provider.')
    await navigateTo('/')
  } catch {
    /* validation failed */
  } finally {
    loading.value = false
  }
}

function switchMethod(m: LoginMethod) {
  method.value = m
  otpSent.value = false
  otpForm.otp = ''
  passwordFormRef.value?.clearValidate()
  otpFormRef.value?.clearValidate()
}

function forgotPassword() {
  ElMessage.info('Wire POST /auth/forgot-password when ready.')
}
</script>

<template>
  <div
    class="relative min-h-[calc(100dvh-5rem)] bg-surface pb-16 pt-8 sm:pb-20 sm:pt-10"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-[min(65vh,520px)] bg-[radial-gradient(ellipse_88%_58%_at_50%_-12%,color-mix(in_srgb,var(--lb-primary)_20%,transparent),transparent_58%)] dark:bg-[radial-gradient(ellipse_82%_52%_at_50%_-10%,color-mix(in_srgb,var(--lb-primary)_32%,transparent),transparent_52%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nav-active/35 to-transparent dark:from-hero/5"
      aria-hidden="true"
    />
    <div class="relative z-[1] mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8">
      <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <NuxtLink to="/" class="font-medium text-hero hover:underline">
          Home
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="font-medium text-heading">Log in</span>
      </nav>

      <div
        class="rounded-3xl border border-border/80 bg-card p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <p class="text-xs font-bold uppercase tracking-widest text-hero">
          Account
        </p>
        <h1 class="mt-2 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
          Log in
        </h1>
        <p class="mt-2 text-sm text-muted">
          New here?
          <NuxtLink
            to="/register"
            class="font-semibold text-hero hover:underline"
          >
            Create an account
          </NuxtLink>
        </p>

        <div
          class="mt-8 inline-flex rounded-full border border-border/80 bg-nav-active/50 p-1 dark:bg-nav-active/30"
          role="tablist"
          aria-label="Sign-in method"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="method === 'password'"
            class="rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm"
            :class="
              method === 'password'
                ? 'bg-card text-heading shadow-sm ring-1 ring-border/60'
                : 'text-muted hover:text-heading'
            "
            @click="switchMethod('password')"
          >
            Password
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="method === 'otp'"
            class="rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm"
            :class="
              method === 'otp'
                ? 'bg-card text-heading shadow-sm ring-1 ring-border/60'
                : 'text-muted hover:text-heading'
            "
            @click="switchMethod('otp')"
          >
            OTP
          </button>
        </div>

        <el-form
          v-show="method === 'password'"
          ref="passwordFormRef"
          class="mt-8"
          :model="passwordForm"
          :rules="passwordRules"
          label-position="top"
          @submit.prevent="submitPassword"
        >
          <el-form-item label="Email or mobile" prop="identifier">
            <el-input
              v-model="passwordForm.identifier"
              size="large"
              placeholder="you@example.com or 9876543210"
              clearable
              autocomplete="username"
            />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="passwordForm.password"
              type="password"
              size="large"
              placeholder="••••••••"
              show-password
              autocomplete="current-password"
            />
          </el-form-item>
          <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
            <el-checkbox v-model="passwordForm.remember">
              Remember this device
            </el-checkbox>
            <button
              type="button"
              class="text-xs font-semibold text-hero hover:underline sm:text-sm"
              @click="forgotPassword"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            class="lb-btn-primary mt-6 w-full justify-center py-3.5 text-base font-bold disabled:pointer-events-none disabled:opacity-55"
            :disabled="loading"
          >
            {{ loading ? 'Please wait…' : 'Continue' }}
          </button>
        </el-form>

        <el-form
          v-show="method === 'otp'"
          ref="otpFormRef"
          class="mt-8"
          :model="otpForm"
          :rules="otpRules"
          label-position="top"
        >
          <el-form-item label="Mobile number" prop="phone">
            <el-input
              v-model="otpForm.phone"
              size="large"
              placeholder="9876543210"
              clearable
              maxlength="14"
              autocomplete="tel"
            >
              <template #prefix>
                <span class="pr-1 text-muted">+91</span>
              </template>
            </el-input>
          </el-form-item>
          <el-button
            class="w-full !rounded-xl !font-semibold"
            :disabled="loading || resendCooldown > 0"
            @click="sendOtp"
          >
            {{
              resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : otpSent
                  ? 'Resend OTP'
                  : 'Send OTP'
            }}
          </el-button>
          <template v-if="otpSent">
            <el-form-item
              label="One-time password"
              prop="otp"
              class="!mt-6"
            >
              <el-input
                v-model="otpForm.otp"
                size="large"
                placeholder="6-digit code"
                maxlength="6"
                inputmode="numeric"
                autocomplete="one-time-code"
              />
            </el-form-item>
            <button
              type="button"
              class="lb-btn-primary mt-2 w-full justify-center py-3.5 text-base font-bold disabled:pointer-events-none disabled:opacity-55"
              :disabled="loading"
              @click="verifyOtp"
            >
              {{ loading ? 'Please wait…' : 'Verify & continue' }}
            </button>
          </template>
        </el-form>

        <p class="mt-8 text-center text-xs leading-relaxed text-muted">
          By continuing you agree to the
          <NuxtLink to="/terms" class="font-semibold text-hero hover:underline">Terms</NuxtLink>
          and
          <NuxtLink to="/privacy" class="font-semibold text-hero hover:underline">Privacy policy</NuxtLink>.
        </p>
      </div>
    </div>
  </div>
</template>
