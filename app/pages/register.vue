<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import {
  isStrongEnoughPassword,
  isValidEmail,
  isValidIndianMobile,
} from '~/utils/authValidators'

const { branding } = useTheme()

useSeoMeta({
  title: `Create account — ${branding.productName}`,
  description:
    'Join Live Bhoomi — shortlist homes, post property, and chat with owners. Free account (demo registration).',
})

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const rules: FormRules = {
  fullName: [
    { required: true, message: 'Enter your name', trigger: 'blur' },
    { min: 2, message: 'At least 2 characters', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Enter email', trigger: 'blur' },
    {
      validator: (_rule, value: string, callback) => {
        if (isValidEmail(value)) callback()
        else callback(new Error('Enter a valid email'))
      },
      trigger: 'blur',
    },
  ],
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
  password: [
    { required: true, message: 'Create a password', trigger: 'blur' },
    {
      validator: (_rule, value: string, callback) => {
        if (isStrongEnoughPassword(value)) callback()
        else {
          callback(
            new Error('8+ chars with at least one letter and one number'),
          )
        }
      },
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    { required: true, message: 'Confirm your password', trigger: 'blur' },
    {
      validator: (_rule, value: string, callback) => {
        if (value === form.password) callback()
        else callback(new Error('Passwords do not match'))
      },
      trigger: 'blur',
    },
  ],
  acceptTerms: [
    {
      validator: (_rule, value: boolean, callback) => {
        if (value) callback()
        else callback(new Error('Accept the terms to continue'))
      },
      trigger: 'change',
    },
  ],
}

watch(
  () => form.password,
  () => {
    if (form.confirmPassword) {
      formRef.value?.validateField('confirmPassword').catch(() => {})
    }
  },
)

async function submit() {
  const f = formRef.value
  if (!f) return
  loading.value = true
  try {
    await f.validate()
    await new Promise((r) => setTimeout(r, 700))
    ElMessage.success('Account created (demo) — wire POST /auth/register to your API.')
    await navigateTo('/login')
  } catch {
    /* validation errors */
  } finally {
    loading.value = false
  }
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
        <span class="font-medium text-heading">Register</span>
      </nav>

      <div
        class="rounded-3xl border border-border/80 bg-card p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:p-8"
      >
        <p class="text-xs font-bold uppercase tracking-widest text-hero">
          Get started
        </p>
        <h1 class="mt-2 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl">
          Create your account
        </h1>
        <p class="mt-2 text-sm text-muted">
          Have an account?
          <NuxtLink to="/login" class="font-semibold text-hero hover:underline">
            Log in
          </NuxtLink>
        </p>

        <el-form
          ref="formRef"
          class="mt-8"
          :model="form"
          :rules="rules"
          label-position="top"
          @submit.prevent="submit"
        >
          <el-form-item label="Full name" prop="fullName">
            <el-input
              v-model="form.fullName"
              size="large"
              placeholder="As on your ID"
              clearable
              autocomplete="name"
            />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input
              v-model="form.email"
              size="large"
              placeholder="you@example.com"
              clearable
              autocomplete="email"
            />
          </el-form-item>
          <el-form-item label="Mobile" prop="phone">
            <el-input
              v-model="form.phone"
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
          <el-form-item label="Password" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              size="large"
              placeholder="8+ characters, letters & numbers"
              show-password
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="Confirm password" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              size="large"
              placeholder="Repeat password"
              show-password
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item prop="acceptTerms">
            <el-checkbox v-model="form.acceptTerms">
              I agree to the
              <NuxtLink to="/terms" class="font-semibold text-hero hover:underline" @click.stop>
                Terms of use
              </NuxtLink>
              and
              <NuxtLink to="/privacy" class="font-semibold text-hero hover:underline" @click.stop>
                Privacy policy
              </NuxtLink>
            </el-checkbox>
          </el-form-item>
          <button
            type="submit"
            class="lb-btn-primary w-full justify-center py-3.5 text-base font-bold disabled:pointer-events-none disabled:opacity-55"
            :disabled="loading"
          >
            {{ loading ? 'Please wait…' : 'Create account' }}
          </button>
        </el-form>

        <p class="mt-6 text-center text-xs leading-relaxed text-muted">
          Builders &amp; brokers: the same account can unlock the owner dashboard after verification.
        </p>
      </div>
    </div>
  </div>
</template>
