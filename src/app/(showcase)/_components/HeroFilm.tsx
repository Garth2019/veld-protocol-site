"use client";

import { useReducedMotion } from "framer-motion";

/**
 * HeroFilm — the cinematic "agents on the veld" background film.
 * Autoplays muted + looped; falls back to a static poster frame when the
 * visitor prefers reduced motion (or before the video paints).
 */
export function HeroFilm() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/img/veld-hero.jpg')" }}
      />
    );
  }

  return (
    <video
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/img/veld-hero.jpg"
    >
      <source src="/video/veld-agents.mp4" type="video/mp4" />
    </video>
  );
}
