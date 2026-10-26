import type { ReactNode, CSSProperties } from "react";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";

// The Claude Design type system (confirmed from veld.css), self-hosted via next/font.
// JetBrains Mono and Modak (the wordmark face, --font-veld-display) come from the root layout:
// declaring them again here preloaded a second copy of each on the home page.
const display = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-pro-display", display: "swap" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-pro-body", display: "swap" });

// Redirect veld.css's font tokens to the self-hosted next/font faces.
const fontVars: CSSProperties = {
  ["--serif" as string]: "var(--font-pro-display), 'Instrument Serif', Georgia, serif",
  ["--grotesk" as string]: "var(--font-pro-body), 'Hanken Grotesk', system-ui, sans-serif",
  ["--mono" as string]: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, monospace",
};

export default function UseCasesProLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${display.variable} ${body.variable}`}
      style={{
        ...fontVars,
        minHeight: "100vh",
        background: "#07090C",
        color: "#F4F6FA",
        fontFamily: "var(--grotesk)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        /* Hero film integration — veld.css has no video, so the layer + scrim live here. */
        .hero-film { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .hero-film-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(rgba(7,9,12,0.5), rgba(7,9,12,0.58)),
            radial-gradient(65% 55% at 50% 32%, rgba(7,9,12,0.26), transparent 72%),
            linear-gradient(to bottom, transparent 44%, #07090C 90%);
        }

        /* Big, diagonal, prominent top-left brand logo — shrinks when the nav sticks on scroll. */
        .nav { --brand-size: clamp(56px, 12vw, 190px); align-items: flex-start; }
        .nav.scrolled { --brand-size: 34px; align-items: center; }
        .nav .brand { transform: rotate(-7deg); transform-origin: left center; margin-top: 34px; }
        .nav.scrolled .brand { margin-top: 0; }
        .nav .brand [role="img"] { transition: font-size 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
        /* Inline "veld" logo standing in for the word in the closing headline. */
        .closing-mark { vertical-align: -0.05em; margin: 0 0.04em; }
        /* Mobile collapse — keep the nav + numbers band from overflowing small screens. */
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 720px) {
          .numbers { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .numbers { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Grain texture for the Modak wordmark (filter: url(#veld-grain)) */}
      <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute" }}>
        <defs>
          <filter id="veld-grain" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves={2} seed={11} result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 -0.16"
              result="grain"
            />
            <feComposite in="grain" in2="SourceAlpha" operator="in" result="grainInText" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="grainInText" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}
