/**
 * Proof strip — four credibility chips displayed beneath the hero.
 *
 * Static by design (no live metrics) — matches the "above-the-fold proof
 * modules without real-time dashboards" pattern from the hero research.
 * Icons are inline SVG so the whole strip ships zero additional assets.
 */

interface Proof {
  label: string;
  icon: React.ReactNode;
}

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const PROOFS: readonly Proof[] = [
  {
    label: "Open Source",
    icon: (
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
        <path {...STROKE} d="M7 4 3 10l4 6M13 4l4 6-4 6" />
      </svg>
    ),
  },
  {
    label: "ERC-8004 Identity",
    icon: (
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
        <circle {...STROKE} cx="10" cy="7" r="3" />
        <path {...STROKE} d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
  {
    label: "Base + Celo Rails",
    icon: (
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
        <circle {...STROKE} cx="6" cy="10" r="3" />
        <circle {...STROKE} cx="14" cy="10" r="3" />
        <path {...STROKE} d="M9 10h2" />
      </svg>
    ),
  },
  {
    label: "Agent-Grade Settlement",
    icon: (
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
        <path {...STROKE} d="M4 11l4 4 8-8" />
      </svg>
    ),
  },
] as const;

export function ProofStrip() {
  return (
    <ul
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10"
      aria-label="Veld Protocol credentials"
    >
      {PROOFS.map(({ label, icon }) => (
        <li
          key={label}
          className="flex items-center gap-2 text-veld-mid"
        >
          <span className="flex items-center justify-center rounded-md border border-veld-primary/30 bg-veld-forest/30 p-1.5 text-veld-gold">
            {icon}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-veld-pale/70">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
