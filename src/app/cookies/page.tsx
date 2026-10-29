import type { Metadata } from "next";
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
  LegalTable,
} from "@/components/legal/LegalPage";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "The cookies and browser storage veldprotocol.io uses, why, for how long, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "28 October 2026";
const CONTACT_EMAIL = "info@getbookd.io";

const code = (text: string) => (
  <code className="font-mono text-[13px] text-veld-surface [overflow-wrap:anywhere]">{text}</code>
);

// Inventory from a headless crawl of the site before and after choosing Accept.
const STORED_ITEMS = [
  [
    code("veld-cookie-consent"),
    "This site — local storage",
    "Remembers whether you accepted or rejected analytics cookies, and the date",
    "12 months, then we ask again",
    "Strictly necessary",
  ],
  [
    code("ph_phc_…_posthog"),
    "PostHog (EU) — cookie",
    "A random ID so repeat visits can be counted, and details of the current visit. Set only after you accept",
    "1 year",
    "Analytics",
  ],
  [
    code("ph_phc_…_posthog"),
    "PostHog (EU) — local storage",
    "A copy of the same ID and visit details. Set only after you accept",
    "Until you change your choice or clear it",
    "Analytics",
  ],
  [
    <>
      {code("ph_phc_…_posthog")}, {code("ph_phc_…_primary_window_exists")}
    </>,
    "PostHog (EU) — session storage",
    "Keeps track of the current visit and browser tab. Set only after you accept",
    "Until you close the tab",
    "Analytics",
  ],
] as const;

const NO_COOKIE_SERVICES = [
  ["Vercel", "Hosts the website and keeps security logs, which include your IP address"],
] as const;

const BROWSER_HELP = [
  ["Chrome", "https://support.google.com/chrome/answer/95647"],
  ["Safari", "https://support.apple.com/en-gb/guide/safari/sfri11471/mac"],
  ["Firefox", "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"],
  [
    "Edge",
    "https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  ],
] as const;

export default function CookieNotice() {
  return (
    <LegalPage title="Cookie notice" updated={LAST_UPDATED}>
      <p>
        We only set non-essential cookies if you choose &ldquo;Accept&rdquo; in our cookie
        banner. You can change your mind at any time with the{" "}
        <strong className="text-veld-surface">Cookie settings</strong> link at the foot of every
        page, or the button below.
      </p>
      <p>
        <CookieSettingsButton className="inline-flex min-h-11 items-center justify-center rounded-md border border-veld-gold/60 px-5 text-sm font-semibold text-veld-surface transition-colors hover:bg-veld-gold hover:text-veld-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-veld-gold" />
      </p>

      <LegalSection id="what-a-cookie-is" title="What a cookie is">
        <p>
          A small file a website stores in your browser. Similar technologies — such as your
          browser&apos;s local storage and session storage — are covered by the same rules, so we
          list them here too.
        </p>
      </LegalSection>

      <LegalSection id="what-this-site-stores" title="What this site stores">
        <LegalTable
          label="Cookies and storage this site uses"
          head={["Name", "Provider", "Purpose", "Duration", "Type"]}
          rows={STORED_ITEMS}
          wide
        />
        <p>
          The middle part of each PostHog name is our PostHog project&apos;s public key. PostHog
          is set not to store your IP address and does not record your screen.
        </p>
        <p>
          Before you choose, the site stores nothing on your device. If you reject — or withdraw
          consent later — the site deletes every PostHog cookie and storage item it finds. An earlier version of this site set PostHog&apos;s cookie without asking
          first; that cookie is also deleted on your next visit unless you choose Accept.
        </p>
      </LegalSection>

      <LegalSection id="services-without-cookies" title="Services that receive your IP address but set no cookies">
        <LegalTable label="Services without cookies" head={["Service", "Why"]} rows={NO_COOKIE_SERVICES} />
        <p>
          The typefaces, images and film on this site are served from veldprotocol.io itself, so
          no font or video service sees your visit.
        </p>
      </LegalSection>

      <LegalSection id="managing-cookies" title="Managing cookies">
        <p>
          Use Cookie settings at the foot of any page to accept or reject analytics cookies. You
          can also block or delete cookies in your browser settings:
        </p>
        <LegalList>
          {BROWSER_HELP.map(([browser, href]) => (
            <li key={browser}>
              <LegalLink href={href}>{browser}</LegalLink>
            </li>
          ))}
        </LegalList>
      </LegalSection>

      <LegalSection id="questions" title="Questions">
        <p>
          Email <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>. See also
          our <LegalLink href="/privacy">privacy notice</LegalLink>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
