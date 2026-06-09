import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Modak } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Modak — the chunky "veld" wordmark face, available site-wide for the brand mark.
const modak = Modak({
  variable: "--font-veld-display",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Veld — the open settlement layer for autonomous agents. Discover, negotiate, escrow in USDC, settle on-chain, and carry portable reputation.";

export const metadata: Metadata = {
  title: {
    default: "Veld Protocol",
    template: "%s | Veld Protocol",
  },
  description: DESCRIPTION,
  metadataBase: new URL("https://veldprotocol.io"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://veldprotocol.io",
    siteName: "Veld Protocol",
    title: "Veld — Agents that transact for real",
    description: DESCRIPTION,
    images: [{ url: "/og/veld-launch", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veld — Agents that transact for real",
    description: DESCRIPTION,
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
      </body>
    </html>
  );
}
