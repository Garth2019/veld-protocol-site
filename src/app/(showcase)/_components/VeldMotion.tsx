"use client";

import { useEffect } from "react";

/**
 * Port of veld-motion.js: hero reveal trigger, sticky-nav scroll state, scroll
 * reveals, and the signature agent-to-agent transaction timeline. Drives the
 * markup rendered by page.tsx (styled by veld.css) via element ids/classes.
 */

const STEP_MS = 1750;
const PHASES = [
  "Discovering providers",
  "Negotiating terms",
  "Locking escrow on Base",
  "Settling · 3% fee",
  "Writing reputation",
];
// viewBox of #stageSvg — used to map path points into the canvas.
const VB_W = 1100;
const VB_H = 420;
const PACKET_HALF = 8;

export function VeldMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stopped = false;

    // ---- Hero ready (rAF with a setTimeout fallback for throttled tabs) ----
    const hero = document.getElementById("hero");
    const markReady = () => hero?.classList.add("ready");
    const raf = requestAnimationFrame(() => requestAnimationFrame(markReady));
    const readyTimer = window.setTimeout(markReady, 250);

    // ---- Sticky-nav scroll state ----
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Scroll reveals ----
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((r) => io?.observe(r));
    } else {
      reveals.forEach((r) => r.classList.add("in"));
    }

    // ---- Signature transaction timeline ----
    const path = document.getElementById("netPath") as unknown as SVGPathElement | null;
    const packet = document.getElementById("packet");
    const ledger = document.getElementById("ledger");
    const steps = ledger ? Array.from(ledger.querySelectorAll<HTMLElement>(".ledger-step")) : [];
    const agentA = document.getElementById("agentA");
    const agentB = document.getElementById("agentB");
    const phaseLabel = document.getElementById("phaseLabel");
    const canvas = document.getElementById("stageCanvas");

    ledger?.style.setProperty("--step-ms", `${STEP_MS}ms`);

    const pathLen = path ? path.getTotalLength() : 0;
    let cur = -1;
    let stepTimer: number | undefined;
    let packetRaf: number | undefined;

    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    // Map a 0..1 position along the path to a transform inside the canvas
    // (the SVG uses preserveAspectRatio xMidYMid meet, so scale uniformly + centre).
    function positionPacket(frac: number) {
      if (!path || !packet || !canvas) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const scale = Math.min(cw / VB_W, ch / VB_H);
      const offX = (cw - VB_W * scale) / 2;
      const offY = (ch - VB_H * scale) / 2;
      const p = path.getPointAtLength(frac * pathLen);
      packet.style.transform = `translate(${offX + p.x * scale - PACKET_HALF}px, ${offY + p.y * scale - PACKET_HALF}px)`;
    }

    function movePacket(from: number, to: number, dur: number) {
      if (!path || !packet) return;
      const start = performance.now();
      packet.style.opacity = "1";
      const frame = (now: number) => {
        if (stopped) return;
        const t = Math.min(1, (now - start) / dur);
        positionPacket(from + (to - from) * easeInOut(t));
        if (t < 1) packetRaf = requestAnimationFrame(frame);
        else if (to === 0) packet!.style.opacity = "0";
      };
      packetRaf = requestAnimationFrame(frame);
    }

    function setStep(i: number) {
      cur = i;
      steps.forEach((s, idx) => {
        s.classList.toggle("active", idx === i);
        s.classList.toggle("done", idx < i);
      });
      if (phaseLabel) phaseLabel.textContent = PHASES[i] ?? "Idle";
      agentA?.classList.toggle("active", i <= 1 || i === 4);
      agentB?.classList.toggle("active", i >= 1 && i <= 3);

      if (packet) {
        if (i === 0) packet.style.opacity = "0";
        else if (i === 2) movePacket(0, 1, STEP_MS * 0.85);
        else if (i === 3) movePacket(1, 0, STEP_MS * 0.85);
      }
    }

    function tick() {
      if (stopped) return;
      setStep((cur + 1) % 5);
      stepTimer = window.setTimeout(tick, STEP_MS);
    }

    if (reduce) {
      steps.forEach((s) => s.classList.add("done"));
      if (phaseLabel) phaseLabel.textContent = "Settled & rated";
    } else {
      stepTimer = window.setTimeout(tick, 500);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      if (stepTimer) window.clearTimeout(stepTimer);
      if (packetRaf) cancelAnimationFrame(packetRaf);
    };
  }, []);

  return null;
}
