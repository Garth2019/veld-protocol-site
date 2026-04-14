import Link from "next/link";
import Image from "next/image";
import { GITHUB_URL } from "@/lib/constants";

const FOOTER_SECTIONS = [
  {
    title: "Protocol",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/protocol", label: "Specification" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/developers", label: "Documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-veld-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Wordmark column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/Brand/veld-wordmark-white.svg" alt="Veld Protocol"
                     width={160} height={24} />
            </Link>
            <p className="mt-3 text-sm text-veld-pale/50 max-w-xs">
              Open infrastructure for decentralised coordination.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-veld-pale/40">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-veld-pale/60 transition-colors hover:text-veld-pale"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-veld-pale/30">
            &copy; {new Date().getFullYear()} Veld Protocol. All rights reserved.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-veld-pale/30 transition-colors hover:text-veld-pale/60"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
