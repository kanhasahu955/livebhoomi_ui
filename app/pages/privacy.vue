<script setup lang="ts">
import { contactConfig } from '~/config/contact.config'

const { branding } = useTheme()

const lastUpdated = '31 March 2026'

useSeoMeta({
  title: `Privacy policy — ${branding.productName}`,
  description:
    'How LiveBhoomi collects, uses, stores, and shares personal information when you use our property marketplace.',
})
</script>

<template>
  <div class="min-h-[100dvh] bg-surface">
    <div
      class="relative overflow-hidden border-b border-white/10"
      style="background: linear-gradient(125deg, var(--lb-primary) 0%, var(--lb-hero-hover) 48%, var(--lb-primary) 100%)"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-10%,rgba(255,255,255,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <nav class="text-[11px] font-medium text-white/70 sm:text-xs" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-white">
            Home
          </NuxtLink>
          <span class="mx-2 text-white/40" aria-hidden="true">/</span>
          <NuxtLink to="/legal" class="hover:text-white">
            Legal
          </NuxtLink>
          <span class="mx-2 text-white/40" aria-hidden="true">/</span>
          <span class="text-white/90">Privacy</span>
        </nav>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy policy
        </h1>
        <p class="mt-3 max-w-2xl text-pretty text-sm text-white/80 sm:text-base">
          Last updated: {{ lastUpdated }}
        </p>
      </div>
    </div>

    <article class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div class="space-y-10 text-sm leading-relaxed text-muted sm:text-[15px]">
        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            1. Introduction
          </h2>
          <p>
            {{ branding.productName }} (“{{ branding.shortName }}”, “we”, “us”) operates a digital property discovery and listing platform. This Privacy Policy explains how we handle personal information when you visit our website or app, create an account, post or browse listings, contact owners or seekers, or use support and marketing channels.
          </p>
          <p>
            By using our services, you agree to this policy together with our
            <NuxtLink to="/terms" class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero">
              Terms of use
            </NuxtLink>.
            If you do not agree, please stop using the platform.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            2. Information we collect
          </h2>
          <p>We may collect the following categories of information, depending on how you use {{ branding.shortName }}:</p>
          <ul class="list-inside list-disc space-y-2 pl-1">
            <li>
              <span class="font-medium text-heading">Account & profile:</span> name, email address, phone number, city or region, role (e.g. seeker, owner, agent), and preferences you choose to save.
            </li>
            <li>
              <span class="font-medium text-heading">Listings & content:</span> property descriptions, photos, pricing hints, location fields, and messages you send through forms or in-product tools.
            </li>
            <li>
              <span class="font-medium text-heading">Usage & device:</span> pages viewed, search filters, approximate location if you allow it, device type, browser, IP address, timestamps, and diagnostic logs needed to keep the service secure and fast.
            </li>
            <li>
              <span class="font-medium text-heading">Support & communications:</span> content of emails, chat transcripts, call notes (where recorded with notice), and feedback you provide.
            </li>
            <li>
              <span class="font-medium text-heading">Payments & billing (if enabled):</span> transaction references and billing contact details processed by our payment partners — we do not store full card numbers on our servers when a certified processor tokenises them.
            </li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            3. How we use information
          </h2>
          <p>We use personal information to:</p>
          <ul class="list-inside list-disc space-y-2 pl-1">
            <li>Provide, operate, and improve search, listings, shortlists, alerts, and owner tools.</li>
            <li>Authenticate users, prevent fraud and abuse, and enforce our terms.</li>
            <li>Send service messages (e.g. verification, security alerts) and, where permitted, marketing you can opt out of.</li>
            <li>Analyse aggregated or de-identified usage to improve product and performance.</li>
            <li>Comply with law, respond to lawful requests, and protect rights and safety.</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            4. Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share data with service providers who host infrastructure, send email, analyse errors, or process payments — under contracts that require appropriate confidentiality and security. We may disclose information if required by law or to protect {{ branding.shortName }}, our users, or the public.
          </p>
          <p>
            Listing information you choose to publish (e.g. contact fields you expose on a listing) may be visible to other users and search engines according to your settings and product design.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            5. Cookies and similar technologies
          </h2>
          <p>
            We use cookies and similar technologies to keep you signed in, remember preferences, measure traffic, and reduce spam. You can control cookies through your browser; disabling some cookies may limit certain features.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            6. Retention
          </h2>
          <p>
            We retain information for as long as your account is active, as needed to provide the service, and as required for legal, tax, or dispute resolution. When data is no longer needed, we delete or de-identify it subject to backup and archival cycles.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            7. Security
          </h2>
          <p>
            We use administrative, technical, and organisational measures designed to protect personal information. No method of transmission over the internet is completely secure; we encourage strong passwords and caution when sharing sensitive documents outside the platform.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            8. Your choices
          </h2>
          <p>
            Where applicable law applies, you may request access, correction, or deletion of certain personal data, or object to or restrict some processing. You may unsubscribe from marketing emails via the link in those messages. To exercise other rights, contact us using the details below. We may need to verify your identity before fulfilling a request.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            9. Children
          </h2>
          <p>
            {{ branding.shortName }} is not directed at children under 18. We do not knowingly collect personal information from children. If you believe we have, please contact us and we will take appropriate steps.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            10. International transfers
          </h2>
          <p>
            Our primary operations are in India. If we use tools hosted in other regions, we take steps consistent with applicable law to protect your information.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            11. Changes
          </h2>
          <p>
            We may update this policy from time to time. We will post the revised version with a new “Last updated” date and, where appropriate, notify you by email or in-product notice.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            12. Contact
          </h2>
          <p>
            Questions about this Privacy Policy or your personal data:
            <a
              :href="`mailto:${contactConfig.supportEmail}`"
              class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero"
            >{{ contactConfig.supportEmail }}</a>.
            You may also reach us via
            <NuxtLink to="/contact" class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero">
              Contact & help
            </NuxtLink>.
          </p>
        </section>
      </div>
    </article>
  </div>
</template>
