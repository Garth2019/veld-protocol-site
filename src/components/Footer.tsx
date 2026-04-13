import Link from "next/link";

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
            <Link href="/" className="text-base font-semibold tracking-wider text-veld-light">
              VELD PROTOCOL
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

        <div className="mt-12 border-t border-white/5 pt-8">
          <p className="text-xs text-veld-pale/30">
            &copy; {new Date().getFullYear()} Veld Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
