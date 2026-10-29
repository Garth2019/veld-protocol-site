import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared shell for the privacy and cookie notices — the same section frame and
 * heading as the other inner pages, with a readable measure for long text.
 */

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /** Human date, e.g. "28 October 2026". */
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-veld-light">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-veld-pale/60">
          Last updated: {updated}
        </p>
      </header>
      <div className="mt-10 max-w-[70ch] space-y-5 text-[15px] leading-relaxed text-veld-pale/80 sm:text-base">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-4 pt-6">
      <h2 id={id} className="text-xl font-semibold tracking-tight text-veld-surface">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-veld-gold/70">{children}</ul>;
}

const LINK_CLASS = "text-veld-gold underline underline-offset-2 transition-colors hover:text-veld-surface";

/** Internal paths use next/link; external and mailto links are plain anchors. */
export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={LINK_CLASS} {...(external ? { rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function LegalTable({
  label,
  head,
  rows,
  wide = false,
}: {
  /** Accessible name for the scrollable table region. */
  label: string;
  head: readonly string[];
  rows: readonly (readonly ReactNode[])[];
  /** Five-column tables need more room before they scroll sideways on a phone. */
  wide?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-xs text-veld-pale/60 sm:hidden" aria-hidden="true">
        Swipe the table sideways to see every column.
      </p>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto rounded-md border border-white/10 focus-visible:outline-2 focus-visible:outline-veld-gold"
      >
        <table
          className={`w-full ${wide ? "min-w-[44rem]" : "min-w-[30rem]"} border-collapse text-left text-sm`}
        >
          <thead className="bg-white/5 text-veld-surface">
            <tr>
              {head.map((cell) => (
                <th key={cell} scope="col" className="px-3 py-2.5 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/10 align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
