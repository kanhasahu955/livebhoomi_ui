<script setup lang="ts">
import { contactConfig } from '~/config/contact.config'

const { branding } = useTheme()

const lastUpdated = '31 March 2026'

useSeoMeta({
  title: `Terms of use — ${branding.productName}`,
  description:
    'Terms and conditions for using LiveBhoomi’s property marketplace, listings, accounts, and limitations of liability.',
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
          <span class="text-white/90">Terms</span>
        </nav>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Terms of use
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
            1. Agreement
          </h2>
          <p>
            These Terms of Use (“Terms”) govern your access to and use of {{ branding.productName }} (“{{ branding.shortName }}”, “we”, “us”), including our website, mobile experiences, and related services (collectively, the “Services”). By accessing or using the Services, you agree to these Terms and our
            <NuxtLink to="/privacy" class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero">
              Privacy policy
            </NuxtLink>.
          </p>
          <p>
            If you are using the Services on behalf of an organisation, you represent that you have authority to bind that organisation.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            2. The Services
          </h2>
          <p>
            {{ branding.shortName }} provides tools to discover, list, and enquire about property and related offerings. We are a technology platform. We are not a party to transactions between users unless explicitly stated in a separate written agreement (e.g. paid products). We do not guarantee the existence, quality, legality, or availability of any listing.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            3. Eligibility and accounts
          </h2>
          <p>
            You must be at least 18 years old and capable of entering a binding contract. You agree to provide accurate registration information and to keep your credentials secure. You are responsible for activity under your account. Notify us promptly of unauthorised use.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            4. Listings and user content
          </h2>
          <p>
            You retain ownership of content you submit. You grant {{ branding.shortName }} a non-exclusive, worldwide, royalty-free licence to host, display, distribute, and adapt your content solely to operate, promote, and improve the Services. You represent that you have the rights to grant this licence and that your content does not violate law or third-party rights.
          </p>
          <p>
            Listings must be truthful and not misleading. You are responsible for compliance with applicable laws (including advertising, housing, and broker regulations where they apply to you). We may remove or restrict content that violates these Terms or poses risk to users.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            5. Prohibited conduct
          </h2>
          <p>You agree not to:</p>
          <ul class="list-inside list-disc space-y-2 pl-1">
            <li>Scrape, overload, or interfere with the Services or other users’ use.</li>
            <li>Post malware, spam, discriminatory content, or illegal offers.</li>
            <li>Misrepresent identity, ownership, or authority related to a property.</li>
            <li>Circumvent fees, verification, or security controls where they apply.</li>
            <li>Use the Services for laundering, fraud, or harassment.</li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            6. Intellectual property
          </h2>
          <p>
            The Services, branding, and software are owned by {{ branding.shortName }} or its licensors and are protected by intellectual property laws. Except as allowed by these Terms or written permission, you may not copy, modify, or create derivative works from our proprietary materials.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            7. Third-party services and links
          </h2>
          <p>
            The Services may link to maps, payments, analytics, or other third parties. Their terms and privacy practices apply to your use of those services. We are not responsible for third-party sites or tools.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            8. Disclaimers
          </h2>
          <p>
            The Services are provided “as is” and “as available”. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free operation. Property information is supplied by users and third parties; you must conduct your own due diligence, including title, encumbrances, approvals, and RERA registration where relevant.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            9. Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, {{ branding.shortName }} and its affiliates, officers, and employees will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising from your use of the Services. Our aggregate liability for claims relating to the Services shall not exceed the greater of (a) the amount you paid us for the Services in the twelve months before the claim or (b) INR 5,000, except where law prohibits such limitations.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            10. Indemnity
          </h2>
          <p>
            You will defend and indemnify {{ branding.shortName }} and its affiliates against claims, damages, losses, and expenses (including reasonable legal fees) arising from your content, your use of the Services, or your breach of these Terms, except to the extent caused by our wilful misconduct.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            11. Suspension and termination
          </h2>
          <p>
            We may suspend or terminate access if you violate these Terms, create risk, or if required by law. You may stop using the Services at any time. Provisions that by their nature should survive (e.g. licences granted to us for necessary archival, liability limits, governing law) will survive termination.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            12. Governing law and disputes
          </h2>
          <p>
            These Terms are governed by the laws of India, without regard to conflict-of-law rules. Subject to applicable mandatory provisions, courts at Hyderabad, Telangana shall have exclusive jurisdiction over disputes arising from these Terms or the Services, unless we agree otherwise in writing.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            13. Changes
          </h2>
          <p>
            We may modify these Terms. We will post the updated Terms with a new “Last updated” date. Continued use after changes become effective constitutes acceptance. If you do not agree, discontinue use of the Services.
          </p>
        </section>

        <section class="space-y-3">
          <h2 class="text-lg font-semibold text-heading">
            14. Contact
          </h2>
          <p>
            For questions about these Terms:
            <a
              :href="`mailto:${contactConfig.supportEmail}`"
              class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero"
            >{{ contactConfig.supportEmail }}</a>
            ·
            <NuxtLink to="/contact" class="font-medium text-hero underline decoration-hero/30 underline-offset-2 hover:decoration-hero">
              Contact & help
            </NuxtLink>
          </p>
        </section>
      </div>
    </article>
  </div>
</template>
