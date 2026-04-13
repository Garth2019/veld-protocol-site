import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
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

export const metadata: Metadata = {
  title: {
    default: "Veld Protocol",
    template: "%s | Veld Protocol",
  },
  description:
    "Veld Protocol — open infrastructure for decentralised coordination.",
  metadataBase: new URL("https://veldprotocol.io"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://veldprotocol.io",
    siteName: "Veld Protocol",
    title: "Veld Protocol",
    description:
      "Open infrastructure for decentralised coordination.",
    images: [{ url: "/og/veld-launch", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veld Protocol",
    description:
      "Open infrastructure for decentralised coordination.",
  },
  icons: {
    icon: [
      { url: "/Brand/veld-mark-favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/Brand/veld-mark-favicon.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-veld-dark text-foreground">
        <JsonLd />
        <PostHogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
