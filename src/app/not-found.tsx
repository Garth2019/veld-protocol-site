import type { Metadata } from "next";
import Link from "next/link";

// Rendered inside SiteChrome (Navbar + Footer, which carries the Studio 72 credit).
// The title template makes this "Page not found | Veld Protocol".
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/protocol", label: "Protocol" },
  { href: "/developers", label: "Developers" },
  { href: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* The numeral is furniture; the heading carries the words. */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-3vw] bottom-0 font-[family-name:var(--font-veld-display)] leading-none text-veld-gold/[0.06] text-[clamp(10rem,30vw,26rem)]"
      >
        404
      </p>
      <div className="relative max-w-4xl mx-auto">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-veld-pale/60">
          404 · Page not found
        </p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-veld-light">
          No route to this page.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-veld-pale/70">
          The address may have moved. The protocol, the docs and the latest writing are one step away.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-full bg-veld-gold px-6 font-medium text-veld-dark transition-opacity hover:opacity-90"
          >
            Back to the homepage
          </Link>
        </div>
        <nav aria-label="Popular pages" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-veld-pale/80">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="py-2 underline underline-offset-4 hover:text-veld-light">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
