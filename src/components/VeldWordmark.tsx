/**
 * VeldWordmark — the "noot noot" Veld logo, hand-built in code.
 *
 * A chunky, slightly-wonky, grainy lowercase "veld" wordmark in Modak (a
 * super-fat display face), gold (#E8C766) by default. Each letter carries a
 * tiny rotation + vertical
 * nudge so the mark reads hand-made rather than typeset, and a sparse SVG
 * grain filter (defined once in the showcase layout as #veld-grain) gives the
 * fill its textured, screen-printed character.
 *
 * Scales cleanly from a 20px nav lockup up to a hero-sized display mark.
 */

type Tone = "gold" | "obsidian" | "offwhite";

const TONE_COLORS: Record<Tone, string> = {
  gold: "#E8C766",
  obsidian: "#07090C",
  offwhite: "#F4F6FA",
};

// Per-letter wonk: subtle rotation + baseline nudge so "veld" feels drawn.
// Gentle values — Modak's letters are already fat and characterful.
const LETTERS: ReadonlyArray<{ ch: string; rotate: number; dy: number }> = [
  { ch: "v", rotate: -2.5, dy: 0.3 },
  { ch: "e", rotate: 1.5, dy: -0.7 },
  { ch: "l", rotate: -1, dy: 0.3 },
  { ch: "d", rotate: 2.5, dy: -0.4 },
];

interface VeldWordmarkProps {
  /** Font size — a px number or any CSS length (e.g. a `clamp(...)`). Defaults to 22. */
  size?: number | string;
  /** Fill tone. Gold on dark surfaces; obsidian when sitting on a gold block. */
  tone?: Tone;
  /** Apply the #veld-grain texture filter. Defaults to true. */
  grain?: boolean;
  className?: string;
}

export function VeldWordmark({
  size = 22,
  tone = "gold",
  grain = true,
  className,
}: VeldWordmarkProps) {
  return (
    <span
      role="img"
      aria-label="Veld"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "var(--font-veld-display), system-ui, sans-serif",
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "0.01em",
        color: TONE_COLORS[tone],
        filter: grain ? "url(#veld-grain)" : undefined,
        // Modak has no italic/bold faces — never let the browser fake them.
        fontSynthesis: "none",
        userSelect: "none",
      }}
    >
      {LETTERS.map(({ ch, rotate, dy }, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            transform: `rotate(${rotate}deg) translateY(${dy}px)`,
            transformOrigin: "50% 80%",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
