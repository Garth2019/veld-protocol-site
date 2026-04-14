"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingWordProps {
  words: readonly string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Kinetic-typography word cycler — Lido-inspired.
 *
 * Cycles through `words` with a fade+slide transition. Respects
 * `prefers-reduced-motion` (shows only the first word statically).
 *
 * The rotating word renders inline so it can wrap naturally on small
 * viewports. On larger screens where everything fits on a single line,
 * the reflow from word-length changes is only a few pixels and the
 * slide/fade animation masks any visual jump.
 */
export function RotatingWord({
  words,
  intervalMs = 2800,
  className = "",
}: RotatingWordProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [prefersReducedMotion, intervalMs, words.length]);

  const active = words[index];

  return (
    <span
      className={`inline-block align-baseline ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {active}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
