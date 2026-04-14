"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GITHUB_URL } from "@/lib/constants";
import { RotatingWord } from "./RotatingWord";
import { HeroVisual } from "./HeroVisual";
import { ProofStrip } from "./ProofStrip";

const ROTATING_WORDS = [
  "autonomous agents",
  "AI agents",
  "agentic commerce",
  "onchain agents",
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function VeldHero() {
  const prefersReducedMotion = useReducedMotion();

  // When reduced motion is on, skip entry animations entirely.
  const initial = prefersReducedMotion ? "show" : "hidden";
  const animate = "show";

  return (
    <section
      aria-labelledby="veld-hero-heading"
      className="relative overflow-hidden"
    >
      {/* ─── Background layers (decorative, behind content) ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Dot-grid — coordinate-plane texture */}
        <div className="absolute inset-0 veld-dot-grid opacity-[0.45]" />

        {/* Radial glow from top-right (behind diagram) */}
        <div className="absolute inset-0 veld-radial-glow" />

        {/* Horizon line echo */}
        <div
          className="absolute left-0 right-0 border-t border-veld-primary/15"
          style={{ top: "62%" }}
        />

        {/* Vignette to darken edges on wide screens */}
        <div className="absolute inset-0 bg-gradient-to-b from-veld-dark/0 via-veld-dark/0 to-veld-dark" />
      </div>

      {/* ─── Content ─── */}
      <motion.div
        variants={containerVariants}
        initial={initial}
        animate={animate}
        className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        {/* Tiny proof line above headline */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-3 rounded-full border border-veld-primary/30 bg-veld-forest/30 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-veld-light opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-veld-light" />
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-veld-pale/80">
              Base + Celo · ERC-8004 · Open source
            </span>
          </div>
        </motion.div>

        {/* Hero grid: copy left, diagram right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ─── Copy column ─── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.h1
              id="veld-hero-heading"
              variants={itemVariants}
              className="font-semibold tracking-tight text-veld-surface leading-[1.04] text-balance"
              style={{ fontSize: "clamp(2rem, 5.4vw, 4rem)" }}
            >
              <span className="block">Settlement &amp; reputation</span>
              <span className="block">
                for{" "}
                <RotatingWord
                  words={ROTATING_WORDS}
                  className="text-veld-gold"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto lg:mx-0 mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-veld-pale/70"
            >
              Veld is the open protocol for agent-to-agent payments, identity,
              and reputation. Built on Base and Celo. Backed by ERC-8004.
            </motion.p>

            {/* Dual CTA row */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {/* Primary */}
              <Link
                href="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-veld-light px-6 py-3.5 text-sm font-semibold text-veld-dark transition-all duration-200 hover:bg-veld-pale hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(82,183,136,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-veld-light focus-visible:ring-offset-2 focus-visible:ring-offset-veld-dark"
              >
                Read the protocol
                <svg
                  viewBox="0 0 20 20"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </Link>

              {/* Secondary (ghost) */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-veld-primary/40 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-veld-pale transition-all duration-200 hover:bg-white/5 hover:border-veld-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-veld-light focus-visible:ring-offset-2 focus-visible:ring-offset-veld-dark"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="size-4" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                View on GitHub
                <svg
                  viewBox="0 0 20 20"
                  className="size-3.5 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 13L13 7M13 7H8M13 7v5" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ─── Diagram column ─── */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 order-first lg:order-last"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <HeroVisual />
            </div>
          </motion.div>
        </div>

        {/* ─── Proof strip ─── */}
        <motion.div variants={itemVariants} className="mt-16 sm:mt-20 lg:mt-24">
          <div className="relative">
            <div
              className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-veld-primary/20 to-transparent"
              aria-hidden="true"
            />
            <div className="relative flex justify-center">
              <div className="bg-veld-dark px-6">
                <ProofStrip />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
