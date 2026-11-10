import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Modak } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { PostHogProvider } from "@/components/PostHogProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Not preloaded: the home page (the showcase) never uses Inter, and a preload there competes with its LCP.
// Other pages discover it from their CSS; display: swap and next/font's fallback metrics cover the gap.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Not preloaded: only small labels and code use it, never the LCP.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Modak — the chunky "veld" wordmark face, available site-wide for the brand mark.
const modak = Modak({
  variable: "--font-veld-display",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  // No canonical or openGraph here: both are per page, so each page sets its own
  // through pageMetadata() and og:url can never drift from the canonical.
  twitter: {
    card: "summary_large_image",
    title: "Veld — Agents that transact for real",
    description: SITE_DESCRIPTION,
  },
  // Icons are provided by the file conventions app/icon.svg + app/apple-icon.tsx
  // (the gold-block "v" mark). No manual icons config needed.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${modak.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-veld-dark text-foreground">
        {/* Grain filter for the Modak wordmark (filter: url(#veld-grain)). */}
        <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
          <defs>
            <filter id="veld-grain" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves={2} seed={11} result="noise" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 -0.16" result="grain" />
              <feComposite in="grain" in2="SourceAlpha" operator="in" result="grainInText" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="grainInText" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <JsonLd />
        <PostHogProvider>
          <SiteChrome>{children}</SiteChrome>
        </PostHogProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
