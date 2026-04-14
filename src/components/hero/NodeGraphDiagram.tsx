"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Clean geometric settlement-network diagram.
 *
 * Design language: architectural / schematic — think Chainlink, LayerZero,
 * Polygon infrastructure diagrams. Straight lines only, no curves, no
 * central glow, no organic shapes. Eight nodes arranged in a clean grid
 * that reads as "network of agents, chains, and protocol primitives."
 *
 * Layout:
 *   - 3 rows × 3 cols on a 600×540 viewBox
 *   - Row 1 (top): AGENT A, [bridge], AGENT B
 *   - Row 2 (middle): IDENTITY, VELD (hub, gold), REPUTATION
 *   - Row 3 (bottom): BASE, [bridge], CELO
 *   - Gold anchors at Veld hub + Base + Celo corners (chain settlement)
 *   - Green interior nodes for Agent, Identity, Reputation
 *
 * Animations (compositor-only):
 *   1. Edges draw in on mount (staggered pathLength)
 *   2. Nodes scale+fade in after edges
 *   3. Settlement pulse travels: AgentA → Veld → AgentB → Veld → BASE → Veld → CELO → Veld → AgentA (loop)
 *   4. Gold anchors pulse with a soft halo ring
 *
 * Respects prefers-reduced-motion: renders static final state.
 */

// ─── Geometry ────────────────────────────────────────────────────────

const W = 600;
const H = 540;

interface GridNode {
  id: string;
  x: number;
  y: number;
  label?: string;
  kind: "anchor" | "interior";
}

// Grid positions — 3×3 with generous breathing room
const COL_L = 110;
const COL_C = 300;
const COL_R = 490;
const ROW_T = 115;
const ROW_M = 270;
const ROW_B = 425;

const NODES: readonly GridNode[] = [
  // Top row
  { id: "agentA", x: COL_L, y: ROW_T, label: "AGENT A", kind: "interior" },
  { id: "agentB", x: COL_R, y: ROW_T, label: "AGENT B", kind: "interior" },
  // Middle row
  { id: "identity", x: COL_L, y: ROW_M, label: "IDENTITY", kind: "interior" },
  { id: "veld", x: COL_C, y: ROW_M, label: "VELD", kind: "anchor" },
  { id: "reputation", x: COL_R, y: ROW_M, label: "REPUTATION", kind: "interior" },
  // Bottom row
  { id: "base", x: COL_L, y: ROW_B, label: "BASE", kind: "anchor" },
  { id: "celo", x: COL_R, y: ROW_B, label: "CELO", kind: "anchor" },
] as const;

function byId(id: string): GridNode {
  return NODES.find((n) => n.id === id)!;
}

// ─── Edges (all straight lines, no crossings) ──────────────────────

const EDGES: readonly [string, string][] = [
  // Top row connections (agents ↔ Veld hub)
  ["agentA", "veld"],
  ["agentB", "veld"],
  ["agentA", "identity"],
  ["agentB", "reputation"],
  // Middle row (Veld hub ↔ primitives)
  ["identity", "veld"],
  ["reputation", "veld"],
  // Middle → Bottom (primitives ↔ chains via Veld)
  ["veld", "base"],
  ["veld", "celo"],
  // Bottom row (chain rails)
  ["base", "identity"],
  ["celo", "reputation"],
] as const;

// ─── Settlement pulse path ─────────────────────────────────────────

const PULSE_PATH_IDS: readonly string[] = [
  "agentA",
  "veld",
  "agentB",
  "reputation",
  "celo",
  "veld",
  "base",
  "identity",
  "agentA",
];

// ─── Component ──────────────────────────────────────────────────────

export function NodeGraphDiagram() {
  const prefersReducedMotion = useReducedMotion();

  const pulsePath = PULSE_PATH_IDS.map(byId);
  const pulseCx = pulsePath.map((n) => n.x);
  const pulseCy = pulsePath.map((n) => n.y);

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Network diagram showing agents, identity, reputation, Veld, and Base + Celo chains connected by settlement paths."
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="veld-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B69121" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#B69121" stopOpacity="0" />
          </radialGradient>
          <filter id="veld-pulse-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* ─── Edges ─── */}
        <g stroke="#40916C" strokeWidth={1.6} strokeLinecap="round">
          {EDGES.map(([from, to], i) => {
            const a = byId(from);
            const b = byId(to);
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeOpacity={0.6}
                initial={
                  prefersReducedMotion
                    ? false
                    : { pathLength: 0, opacity: 0 }
                }
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.9,
                  delay: prefersReducedMotion ? 0 : 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            );
          })}
        </g>

        {/* ─── Interior nodes (green hex-style dots) ─── */}
        {NODES.filter((n) => n.kind === "interior").map((n, i) => (
          <motion.g
            key={n.id}
            initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              delay: prefersReducedMotion ? 0 : 1.1 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* Subtle backdrop */}
            <rect
              x={n.x - 36}
              y={n.y - 14}
              width={72}
              height={28}
              rx={14}
              fill="#0F1A12"
              stroke="#2D6A4F"
              strokeWidth={1}
              strokeOpacity={0.6}
            />
            {/* Inner dot */}
            <circle
              cx={n.x}
              cy={n.y}
              r={4}
              fill="#52B788"
              stroke="#0F1A12"
              strokeWidth={1}
            />
          </motion.g>
        ))}

        {/* ─── Gold anchor nodes (Veld, Base, Celo) ─── */}
        {NODES.filter((n) => n.kind === "anchor").map((n, i) => (
          <motion.g
            key={n.id}
            initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              delay: prefersReducedMotion ? 0 : 1.6 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            {/* Soft glow halo */}
            <circle cx={n.x} cy={n.y} r={40} fill="url(#veld-hub-glow)" />

            {/* Rounded-rect anchor chip */}
            <rect
              x={n.x - 42}
              y={n.y - 17}
              width={84}
              height={34}
              rx={17}
              fill="#0F1A12"
              stroke="#B69121"
              strokeWidth={1.8}
              strokeOpacity={0.85}
            />

            {/* Pulsing halo ring (infinite) */}
            {!prefersReducedMotion && (
              <motion.rect
                x={n.x - 42}
                y={n.y - 17}
                width={84}
                height={34}
                rx={17}
                fill="none"
                stroke="#B69121"
                strokeWidth={1.2}
                animate={{
                  strokeOpacity: [0.6, 0, 0.6],
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 2.4 + i * 0.5,
                }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
            )}

            {/* Inner dot marker */}
            <circle cx={n.x} cy={n.y} r={3} fill="#B69121" />
          </motion.g>
        ))}

        {/* ─── Labels ─── */}
        {NODES.map((n, i) => (
          <motion.text
            key={`${n.id}-label`}
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill={n.kind === "anchor" ? "#B69121" : "#B7E4C7"}
            fillOpacity={n.kind === "anchor" ? 1 : 0.85}
            fontSize={11}
            fontFamily="var(--font-jetbrains-mono), monospace"
            letterSpacing="0.16em"
            fontWeight={500}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{
              opacity: n.kind === "anchor" ? 1 : 0.85,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.5,
              delay: prefersReducedMotion ? 0 : 2.0 + i * 0.06,
            }}
          >
            {n.label}
          </motion.text>
        ))}

        {/* ─── Settlement pulse (travels along edges) ─── */}
        {!prefersReducedMotion && (
          <>
            {/* Outer soft glow */}
            <motion.circle
              r={9}
              fill="#52B788"
              filter="url(#veld-pulse-blur)"
              animate={{
                cx: pulseCx,
                cy: pulseCy,
                opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
                delay: 3.0,
                times: pulseCx.map((_, i) => i / (pulseCx.length - 1)),
              }}
            />
            {/* Bright core */}
            <motion.circle
              r={3.5}
              fill="#F8FAF9"
              animate={{
                cx: pulseCx,
                cy: pulseCy,
                opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "linear",
                delay: 3.0,
                times: pulseCx.map((_, i) => i / (pulseCx.length - 1)),
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
