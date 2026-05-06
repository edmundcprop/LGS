import type { Metadata } from "next";
import Link from "next/link";

const LAST_UPDATED = "6 May 2026";
const CONTROLLER = "Brandnical Home Marketing Enterprise (SSM 202403141886)";
const CONTACT_EMAIL = "brandnical@gmail.com";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing the use of lgsubscribe.co operated by Brandnical Home Marketing Enterprise, an authorised LG home appliance subscription reseller in Malaysia.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <article className="container-xl prose prose-neutral max-w-3xl py-16 lg:py-20">
      <h1>Terms of Use</h1>
      <p className="text-sm text-lg-stone">Last updated: {LAST_UPDATED}</p>

      <p>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use
        of lgsubscribe.co (the &quot;Site&quot;), operated by {CONTROLLER}
        (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) as an authorised
        reseller of LG home appliance subscription plans in Malaysia. By
        using the Site you agree to these Terms. If you do not agree, do
        not use the Site.
      </p>

      <h2>1. About the Site</h2>
      <p>
        The Site provides product information, indicative pricing, and an
        enquiry channel for LG appliance subscription plans. The Site is
        not a transactional storefront. Subscription contracts are entered
        into separately between you and LG Electronics (Malaysia) Sdn Bhd
        or its authorised partner, on their own terms and conditions.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and a resident of Malaysia to
        enquire about a subscription. By using the Site you represent that
        you meet these requirements.
      </p>

      <h2>3. Pricing and availability</h2>
      <p>
        Monthly prices, plan tiers, product specifications, and
        availability shown on the Site are indicative and may change
        without notice. Final pricing, eligibility, deposit (if any),
        contract length, and service terms will be confirmed by us or by
        LG Electronics (Malaysia) Sdn Bhd before you sign a subscription
        agreement.
      </p>

      <h2>4. Enquiries via WhatsApp, email, and forms</h2>
      <p>
        When you submit an enquiry — whether through the Site, WhatsApp,
        email, or phone — you consent to us contacting you in response.
        Communications via WhatsApp are subject to{" "}
        <a href="https://www.whatsapp.com/legal/terms" target="_blank" rel="noreferrer">WhatsApp&apos;s Terms of Service</a>.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The Site&apos;s layout, text, graphics, and design are owned by us
        or our licensors and are protected by Malaysian and international
        copyright law. &quot;LG&quot;, the LG logo, &quot;LG Subscribe&quot;,
        and product names are trademarks of LG Corp. and its affiliates,
        used under authorisation. You may view and share Site content for
        personal, non-commercial purposes only. No other use, reproduction,
        or modification is permitted without our prior written consent.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
        <li>Attempt to gain unauthorised access to the Site or its underlying systems.</li>
        <li>Scrape, mirror, or redistribute Site content for commercial purposes.</li>
        <li>Submit false information or impersonate another person.</li>
        <li>Use the Site or our WhatsApp channel to send unsolicited marketing.</li>
      </ul>

      <h2>7. Third-party links and services</h2>
      <p>
        The Site may link to or embed third-party services, including
        Google, Meta/WhatsApp, and LG. We are not responsible for the
        content, policies, or practices of those third parties.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Site is provided &quot;as is&quot; and &quot;as available&quot;.
        We make no warranties — express or implied — about the
        completeness, accuracy, reliability, or availability of the Site
        or its content. Product images may be illustrative; actual product
        appearance may vary by model and batch.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Malaysian law, we are not
        liable for any indirect, incidental, special, consequential, or
        punitive damages, or for any loss of profit, revenue, data, or
        goodwill, arising from your use of the Site, even if we have been
        advised of the possibility of such damages. Our total liability
        for any claim arising out of or relating to the Site shall not
        exceed RM100.
      </p>
      <p>
        Nothing in these Terms limits liability that cannot be limited
        under Malaysian consumer protection law.
      </p>

      <h2>10. Privacy</h2>
      <p>
        Our handling of personal data is described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>, which forms part of
        these Terms.
      </p>

      <h2>11. Changes to the Site or Terms</h2>
      <p>
        We may modify or discontinue the Site, or update these Terms, at
        any time. The &quot;Last updated&quot; date at the top reflects the
        latest revision. Continued use of the Site after changes
        constitutes acceptance of the updated Terms.
      </p>

      <h2>12. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of Malaysia. Any dispute
        arising from or relating to these Terms or the Site shall be
        submitted to the exclusive jurisdiction of the courts of Malaysia.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </article>
  );
}
