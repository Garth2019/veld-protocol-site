"use client";

import { useEffect, useRef } from "react";

const FILM_SRC = "/video/veld-agents.mp4";
const POSTER_SRC = "/img/veld-hero.webp";
/** Safari has no requestIdleCallback; this is the fallback delay after `load`. */
const IDLE_FALLBACK_MS = 200;

/**
 * HeroFilm — the cinematic "agents on the veld" background film.
 *
 * The poster paints first. The 1.9 MB film is attached only once the page has loaded and
 * the main thread is idle, so it never competes with the first paint on a phone
 * connection. Visitors who prefer reduced motion keep the static poster frame.
 */
export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idleId: number | undefined;
    let timerId: number | undefined;
    const attach = () => {
      video.src = FILM_SRC;
      video.play().catch(() => undefined); // e.g. iOS Low Power Mode: the poster stays.
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(attach, { timeout: 2000 });
      else timerId = window.setTimeout(attach, IDLE_FALLBACK_MS);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="none"
      poster={POSTER_SRC}
    />
  );
}
