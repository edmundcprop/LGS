import type { Metadata } from "next";
import Link from "next/link";

const LAST_UPDATED = "6 May 2026";
const CONTROLLER = "Brandnical Home Marketing Enterprise (SSM 202403141886)";
const CONTACT_EMAIL = "brandnical@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Brandnical Home Marketing Enterprise collects, uses, shares, and protects personal data on lgsubscribe.co under Malaysia's Personal Data Protection Act 2010 (PDPA).",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="container-xl prose prose-neutral max-w-3xl py-16 lg:py-20">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-lg-stone">Last updated: {LAST_UPDATED}</p>

      <p>
        This Privacy Policy describes how {CONTROLLER} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
        collects, uses, discloses, and protects personal data when you visit
        lgsubscribe.co or interact with us through WhatsApp, email, or our
        enquiry forms. This Policy is issued in accordance with the Personal
        Data Protection Act 2010 of Malaysia (&quot;PDPA&quot;).
      </p>

      <h2>1. Who we are</h2>
      <p>
        We operate as an authorised reseller of LG home appliance subscription
        plans in Malaysia. The data controller for personal data collected on
        this website is {CONTROLLER}. You can reach us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Personal data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Information you provide</strong> — name, email address,
          phone number, location (city/area), preferred product or plan,
          message content, and any details you share when you submit an
          enquiry, click a WhatsApp link, or call us.
        </li>
        <li>
          <strong>Automatically collected information</strong> — IP address,
          device and browser type, operating system, referring URL, pages
          viewed, time on page, and click events. This is collected through
          Google Analytics 4 and Google Ads conversion tracking and, where
          you have consented, through cookies and similar technologies.
        </li>
        <li>
          <strong>Marketing identifiers</strong> — Google Click Identifier
          (gclid) and similar campaign parameters carried in URLs to
          attribute marketing performance.
        </li>
      </ul>
      <p>
        We do not knowingly collect financial account numbers, government
        identification numbers, or sensitive personal data through this
        website.
      </p>

      <h2>3. How we use your personal data</h2>
      <p>We use personal data to:</p>
      <ul>
        <li>Respond to your enquiries and provide quotations or product recommendations.</li>
        <li>Arrange product demonstrations, installation, delivery, and after-sales support together with LG Electronics (Malaysia) Sdn Bhd.</li>
        <li>Measure marketing performance, including which advertisements lead to enquiries.</li>
        <li>Improve the website, content, and product offering.</li>
        <li>Comply with legal obligations and protect against fraud or misuse.</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>We process personal data on the following bases:</p>
      <ul>
        <li><strong>Consent</strong> — for analytics and advertising cookies, given through our consent banner.</li>
        <li><strong>Performance of a contract or pre-contract steps</strong> — to handle your enquiry and prepare a subscription plan.</li>
        <li><strong>Legitimate interests</strong> — to operate, secure, and improve this website.</li>
        <li><strong>Legal obligation</strong> — to comply with applicable Malaysian law.</li>
      </ul>

      <h2>5. Cookies and consent</h2>
      <p>
        We use Google Tag Manager to deploy analytics and advertising tags
        (Google Analytics 4 and Google Ads). Tags load with{" "}
        <strong>Google Consent Mode v2 set to denied by default</strong>.
        Cookies that store personal identifiers are only set after you
        accept on our consent banner. Until then, only privacy-preserving,
        cookieless signals (with redacted advertising data) may be sent to
        Google to model aggregate performance.
      </p>
      <p>
        You can withdraw consent at any time by clearing the
        &quot;lg-consent-v1&quot; entry in your browser&apos;s site storage,
        which will re-show the banner on your next visit, or by emailing us.
      </p>

      <h2>6. Who we share your personal data with</h2>
      <p>We share personal data only with:</p>
      <ul>
        <li>
          <strong>LG Electronics (Malaysia) Sdn Bhd</strong> and its
          authorised service partners — to fulfil your subscription
          enquiry, schedule installation, and provide warranty service.
        </li>
        <li>
          <strong>Google LLC</strong> — Google Analytics 4, Google Ads
          conversion tracking, and Google Tag Manager. Data is processed
          subject to Google&apos;s{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">privacy policy</a>.
        </li>
        <li>
          <strong>WhatsApp / Meta Platforms Ireland Limited</strong> — when
          you click a WhatsApp link to chat with us, the conversation and
          your phone number are processed by WhatsApp under{" "}
          <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">WhatsApp&apos;s privacy policy</a>.
        </li>
        <li>
          <strong>Hosting and infrastructure providers</strong> — Netlify,
          Inc. (website hosting and edge delivery).
        </li>
        <li>
          Government authorities or law enforcement, where we are legally
          required to do so.
        </li>
      </ul>
      <p>
        We do not sell your personal data, and we do not share it with
        third parties for their independent marketing purposes.
      </p>

      <h2>7. International transfers</h2>
      <p>
        Some of our service providers (notably Google and Meta) process
        data outside Malaysia, including in the United States and the
        European Union. Where we transfer personal data outside Malaysia,
        we rely on the contractual safeguards of those providers and their
        own compliance frameworks.
      </p>

      <h2>8. Data retention</h2>
      <p>
        We retain enquiry data for up to 24 months from the last
        interaction, unless you request earlier deletion or unless a longer
        retention period is required by law or to defend legal claims.
        Analytics data retained by Google Analytics 4 is set to its
        standard 14-month event retention.
      </p>

      <h2>9. Your rights under the PDPA</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Request access to the personal data we hold about you.</li>
        <li>Request correction of inaccurate or incomplete data.</li>
        <li>Withdraw consent for direct marketing or analytics cookies.</li>
        <li>Limit how we process your data.</li>
        <li>Lodge a complaint with the Personal Data Protection Commissioner of Malaysia.</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will
        respond within 21 days.
      </p>

      <h2>10. Security</h2>
      <p>
        We use industry-standard measures, including HTTPS, access controls,
        and trusted third-party processors, to protect personal data. No
        method of transmission over the internet is fully secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>11. Children</h2>
      <p>
        This website is intended for users aged 18 and above. We do not
        knowingly collect personal data from minors.
      </p>

      <h2>12. Changes to this Policy</h2>
      <p>
        We may update this Policy from time to time. The &quot;Last
        updated&quot; date at the top reflects the latest revision.
        Material changes will be highlighted on this page.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about this Policy or about how we handle your personal
        data: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <p className="text-sm text-lg-stone">
        Also see our <Link href="/terms">Terms of Use</Link>.
      </p>
    </article>
  );
}
