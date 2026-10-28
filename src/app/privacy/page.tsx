import type { Metadata } from "next";
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
  LegalTable,
} from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How GETBOOKD LTD collects and uses personal data on veldprotocol.io — the early-access list, server logs and optional analytics.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "28 October 2026";
const CONTACT_EMAIL = "info@getbookd.io";

const LAWFUL_BASES = [
  [
    "Telling you when early access opens, if you joined the list before it closed",
    "Consent, which you gave by joining and can withdraw at any time (UK GDPR Art 6(1)(a))",
  ],
  [
    "Replying when you email us",
    "Legitimate interests — answering people who contact us (Art 6(1)(f))",
  ],
  [
    "Keeping the website secure and working (server logs)",
    "Legitimate interests — protecting the site from abuse (Art 6(1)(f))",
  ],
  [
    "Measuring visits with PostHog analytics",
    "Consent, given through our cookie banner (PECR reg 6 and Art 6(1)(a))",
  ],
] as const;

export default function PrivacyNotice() {
  return (
    <LegalPage title="Privacy notice" updated={LAST_UPDATED}>
      <p>
        This notice explains how GETBOOKD LTD (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and
        uses personal data when you visit veldprotocol.io, and the email addresses of people who
        joined the Veld early-access list.
        Veld Protocol is a product of GETBOOKD LTD. We are the data controller under the UK
        General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <LegalSection id="who-we-are" title="Who we are">
        <p>
          GETBOOKD LTD is a company registered in England and Wales, company number 17088679.
          Our registered office is 49 Maes y Crofft, Morganstown, Cardiff CF15 8FE. Our ICO
          registration number is C1896648. Contact us about anything in this notice at{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection id="what-we-collect" title="What we collect">
        <LegalList>
          <li>
            <strong className="text-veld-surface">If you joined the early-access list</strong> —
            your email address, which form you used and the date you joined. The list closed to
            new sign-ups on 17 October 2026; we&apos;ll write to people already on it when early
            access opens.
          </li>
          <li>
            <strong className="text-veld-surface">When you email us</strong> — your email address
            and whatever you choose to tell us.
          </li>
          <li>
            <strong className="text-veld-surface">When you browse</strong> — our host keeps
            standard server logs (IP address, browser, the pages requested and when) for
            security.
          </li>
          <li>
            <strong className="text-veld-surface">Only if you choose Accept</strong> in our cookie
            banner — PostHog analytics records the pages you view, the page you arrived from, the
            links and buttons you click, when you leave a page, and your browser, device type and
            screen size, linked to a random ID stored in your browser. PostHog is set not to store
            your IP address, and it does not record your screen. See our{" "}
            <LegalLink href="/cookies">cookie notice</LegalLink>.
          </li>
        </LegalList>
        <p>We do not collect special category data through this website.</p>
      </LegalSection>

      <LegalSection id="lawful-basis" title="Why we use it, and our lawful basis">
        <LegalTable label="Purposes and lawful bases" head={["Purpose", "Lawful basis"]} rows={LAWFUL_BASES} />
        <p>We do not sell your data or use it for advertising.</p>
      </LegalSection>

      <LegalSection id="who-we-share-it-with" title="Who we share it with">
        <p>
          Only the service providers that run this website for us, each bound to use the data
          only on our instructions:
        </p>
        <LegalList>
          <li>
            <strong className="text-veld-surface">Vercel Inc.</strong> — hosts the website and
            keeps its server logs (
            <LegalLink href="https://vercel.com/legal/privacy-policy">privacy policy</LegalLink>).
          </li>
          <li>
            <strong className="text-veld-surface">Supabase Inc.</strong> — stores the early-access
            list in a database hosted in the EU, in Stockholm (
            <LegalLink href="https://supabase.com/privacy">privacy policy</LegalLink>).
          </li>
          <li>
            <strong className="text-veld-surface">PostHog Inc.</strong> — website analytics, only
            if you choose Accept; the data is held in PostHog&apos;s EU cloud (
            <LegalLink href="https://posthog.com/privacy">privacy policy</LegalLink>).
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="international-transfers" title="International transfers">
        <p>
          Supabase and PostHog keep this data in the EU, which UK law recognises as giving
          adequate protection. Vercel serves the site from a global network and is based in the
          USA. Where data leaves the UK and the EU, we rely on the UK–US data bridge or the
          ICO&apos;s international data transfer agreement and addendum to keep it protected to
          UK standards.
        </p>
      </LegalSection>

      <LegalSection id="how-long-we-keep-it" title="How long we keep it">
        <LegalList>
          <li>
            Early-access list: until we&apos;ve told you early access is open or you ask us to
            remove you — and never more than 2 years from the day you joined.
          </li>
          <li>Emails you send us: 2 years from our last contact, then deleted.</li>
          <li>Analytics (if you accepted): PostHog deletes events after 1 year.</li>
          <li>Server logs: kept by our host for a short period for security.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="your-rights" title="Your rights">
        <p>
          You can ask us to: see the data we hold about you; correct it; delete it; restrict or
          object to how we use it; give it to you in a portable format; and, where we rely on
          consent, withdraw that consent at any time. To leave the early-access list, or for any
          of these, email <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>{" "}
          — we reply within one month. You can withdraw analytics consent yourself at any time
          with Cookie settings at the foot of every page.
        </p>
        <p>No decisions are made about you by automated means.</p>
      </LegalSection>

      <LegalSection id="complaints" title="Complaints">
        <p>
          If you&apos;re unhappy with how we&apos;ve handled your data, please tell us first. You
          also have the right to complain to the Information Commissioner&apos;s Office:{" "}
          <LegalLink href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</LegalLink>{" "}
          · 0303 123 1113.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes">
        <p>
          We&apos;ll update this notice when how we use data changes. The date at the top shows
          the latest version. See also our <LegalLink href="/cookies">cookie notice</LegalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
