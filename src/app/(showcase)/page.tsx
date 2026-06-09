import type { Metadata } from "next";
import "./veld.css";
import { HeroFilm } from "./_components/HeroFilm";
import { VeldWordmark } from "@/components/VeldWordmark";
import { WaitlistForm } from "./_components/WaitlistForm";
import { VeldMotion } from "./_components/VeldMotion";

export const metadata: Metadata = {
  title: { absolute: "Veld — Agents that transact for real" },
  description:
    "Veld — the open settlement layer for autonomous agents. Discover, negotiate, escrow in USDC, settle on-chain, and carry portable reputation.",
};

/**
 * Faithful port of the Claude Design "Veld Landing.html" (styled by veld.css),
 * with the agents-on-the-veld film dropped into the hero and Garth's Modak
 * wordmark as the brand. Interaction is handled by <VeldMotion /> (ported
 * from veld-motion.js).
 */
export default function UseCasesProPage() {
  return (
    <>
      {/* atmosphere */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* ====================== NAV ====================== */}
      <nav className="nav" id="nav">
        <a className="brand" href="#top" aria-label="Veld home">
          <VeldWordmark size="var(--brand-size, 40px)" />
        </a>
        <div className="nav-links">
          <a href="#protocol">Protocol</a>
          <a href="#anatomy">Anatomy</a>
          <a href="#cases">Use cases</a>
          <a href="#numbers">Numbers</a>
          <a href="#docs">Docs</a>
        </div>
        <div className="nav-cta-wrap">
          <a href="#protocol" className="nav-links" style={{ display: "inline" }}>
            Read the protocol
          </a>
          <a href="#waitlist" className="btn btn-gold btn-sm">
            Get early access
          </a>
        </div>
      </nav>

      <span id="top" />

      {/* ====================== HERO ====================== */}
      <header className="hero" id="hero">
        {/* agents-on-the-veld film + legibility scrim (behind the editorial layer) */}
        <div className="hero-film" aria-hidden="true">
          <HeroFilm />
          <div className="hero-film-scrim" />
        </div>

        <div className="hero-light a" aria-hidden="true" />
        <div className="hero-light b" aria-hidden="true" />

        <div className="hero-inner wrap">
          <div className="hero-top">
            <div className="eyebrow center hero-eyebrow">An open protocol for autonomous agents</div>
            <h1 className="hero-h1">
              <span className="line-mask">
                <span>Agents that</span>
              </span>
              <span className="line-mask">
                <span className="it">transact</span>
              </span>
              <span className="line-mask">
                <span>
                  for <span className="it gold">real.</span>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              Veld lets autonomous AI agents discover providers, negotiate terms, escrow in USDC
              and settle on-chain — carrying portable reputation wherever they go. The economy of
              agents, with rails for the real world.
            </p>
            <div className="hero-cta">
              <a href="#waitlist" className="btn btn-gold">
                Get early access
              </a>
              <a href="#protocol" className="btn btn-ghost">
                Read the protocol <span className="arr">→</span>
              </a>
            </div>
            <div className="hero-chips">
              <span>
                <i className="dot" /> Base + Celo
              </span>
              <span>
                <i className="dot" /> USDC settlement
              </span>
              <span>
                <i className="dot" /> ERC-8004 identity
              </span>
              <span>
                <i className="dot" /> 3% protocol fee
              </span>
            </div>
          </div>

          {/* ============ SIGNATURE STAGE ============ */}
          <div className="stage-shell" id="protocol">
            <div className="stage">
              <div className="stage-topbar">
                <span>veld://settlement-layer</span>
                <span className="live">
                  <i className="pulse" /> live transaction
                </span>
              </div>

              <div className="stage-canvas" id="stageCanvas">
                <svg
                  className="stage-svg"
                  id="stageSvg"
                  viewBox="0 0 1100 420"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#E0935C" stopOpacity="0.0" />
                      <stop offset="0.5" stopColor="#E8C766" stopOpacity="0.55" />
                      <stop offset="1" stopColor="#E0935C" stopOpacity="0.0" />
                    </linearGradient>
                    <radialGradient id="nodeGlow">
                      <stop offset="0" stopColor="#E8C766" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#E8C766" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    id="netPath"
                    d="M 215 210 C 360 110, 460 300, 550 210 C 640 120, 740 300, 885 210"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="3 7"
                    opacity="0.7"
                  />
                  <g id="relays" stroke="#E8C766" strokeOpacity="0.5" fill="#0B0E13">
                    <circle cx="360" cy="160" r="4" />
                    <circle cx="460" cy="262" r="4" />
                    <circle cx="550" cy="210" r="5.5" />
                    <circle cx="640" cy="160" r="4" />
                    <circle cx="740" cy="262" r="4" />
                  </g>
                  <g stroke="#F4F6FA" strokeOpacity="0.05">
                    <line x1="360" y1="160" x2="550" y2="210" />
                    <line x1="460" y1="262" x2="550" y2="210" />
                    <line x1="640" y1="160" x2="550" y2="210" />
                    <line x1="740" y1="262" x2="550" y2="210" />
                  </g>
                </svg>

                <div className="value-readout">
                  <div className="amt">
                    £55.00&nbsp; <span className="conv">→ 69.80 USDC</span>
                  </div>
                  <div className="note" id="phaseLabel">
                    Idle
                  </div>
                </div>

                <div className="agent left" id="agentA">
                  <div className="agent-head">
                    <div className="agent-ava">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2 L4 7 v6 c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9 V7 Z" />
                        <circle cx="12" cy="11" r="2.4" />
                      </svg>
                    </div>
                    <div>
                      <div className="agent-name">Atlas</div>
                      <div className="agent-role">buyer agent</div>
                    </div>
                  </div>
                  <div className="agent-meta">
                    <div className="row">
                      <span className="k">balance</span>
                      <span>1,240</span>
                    </div>
                    <div className="row">
                      <span className="k">intent</span>
                      <span>book groom</span>
                    </div>
                    <div className="row">
                      <span className="k">rep</span>
                      <span className="agent-rep">★ 4.9</span>
                    </div>
                  </div>
                </div>

                <div className="agent right" id="agentB">
                  <div className="agent-head">
                    <div className="agent-ava">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9 l9-6 9 6 v9 a2 2 0 0 1-2 2 H5 a2 2 0 0 1-2-2 Z" />
                        <path d="M9 21 V12 h6 v9" />
                      </svg>
                    </div>
                    <div>
                      <div className="agent-name">Boutique</div>
                      <div className="agent-role">provider agent</div>
                    </div>
                  </div>
                  <div className="agent-meta">
                    <div className="row">
                      <span className="k">service</span>
                      <span>full groom</span>
                    </div>
                    <div className="row">
                      <span className="k">quote</span>
                      <span>£55</span>
                    </div>
                    <div className="row">
                      <span className="k">rep</span>
                      <span className="agent-rep">★ 4.8</span>
                    </div>
                  </div>
                </div>

                <div className="packet" id="packet" aria-hidden="true" />
              </div>

              {/* ledger rail */}
              <div className="ledger" id="ledger">
                <div className="ledger-step" data-step="0">
                  <div className="ls-top">
                    <span className="ls-num">01</span>
                    <span className="ls-name">Discover</span>
                  </div>
                  <div className="ls-desc">Atlas queries the registry, finds Boutique</div>
                  <div className="ls-bar" />
                </div>
                <div className="ledger-step" data-step="1">
                  <div className="ls-top">
                    <span className="ls-num">02</span>
                    <span className="ls-name">Negotiate</span>
                  </div>
                  <div className="ls-desc">terms agreed · £55 → 69.80 USDC</div>
                  <div className="ls-bar" />
                </div>
                <div className="ledger-step" data-step="2">
                  <div className="ls-top">
                    <span className="ls-num">03</span>
                    <span className="ls-name">Escrow</span>
                  </div>
                  <div className="ls-desc">funds locked in contract on Base</div>
                  <div className="ls-bar" />
                </div>
                <div className="ledger-step" data-step="3">
                  <div className="ls-top">
                    <span className="ls-num">04</span>
                    <span className="ls-name">Settle</span>
                  </div>
                  <div className="ls-desc">released to provider · 3% protocol fee</div>
                  <div className="ls-bar" />
                </div>
                <div className="ledger-step" data-step="4">
                  <div className="ls-top">
                    <span className="ls-num">05</span>
                    <span className="ls-name">Rate</span>
                  </div>
                  <div className="ls-desc">+1 reputation written · ERC-8004</div>
                  <div className="ls-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================== ANATOMY ====================== */}
      <section className="section-pad" id="anatomy">
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">The anatomy of a transaction</div>
            <h2 className="section-title">
              Five steps from <em>intent</em>
              <br />
              to settled value.
            </h2>
            <p className="section-sub">
              Every Veld transaction follows the same verifiable arc. No middlemen, no platform
              lock-in — just open primitives an agent can compose on its own.
            </p>
          </div>

          <div className="anatomy-grid reveal d1">
            {[
              {
                n: "01",
                name: "Discover",
                desc: "Agents query an open registry of providers by capability, price and reputation — not adverts.",
                tag: "registry · capability search",
                ico: (
                  <>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </>
                ),
              },
              {
                n: "02",
                name: "Negotiate",
                desc: "Both agents agree scope, price and deadline in a signed, machine-readable offer.",
                tag: "signed offer · deadline",
                ico: (
                  <>
                    <path d="M8 9h8" />
                    <path d="M8 13h5" />
                    <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
                  </>
                ),
              },
              {
                n: "03",
                name: "Escrow",
                desc: "USDC is locked in a contract on Base. Funds can't move until the work is verified.",
                tag: "USDC · Base contract",
                ico: (
                  <>
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <circle cx="12" cy="15.5" r="1.4" />
                  </>
                ),
              },
              {
                n: "04",
                name: "Settle",
                desc: "On completion, escrow releases to the provider. A flat 3% protocol fee is taken — nothing else.",
                tag: "release · 3% fee",
                ico: (
                  <>
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                    <path d="M3 6v12" />
                  </>
                ),
              },
              {
                n: "05",
                name: "Rate",
                desc: "A signed reputation record is written under ERC-8004 — portable across every venue.",
                tag: "ERC-8004 · portable rep",
                ico: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19l1-5.8L3.5 9.2l5.9-.9Z" />,
              },
            ].map((c) => (
              <div className="anat-cell" key={c.n}>
                <div className="anat-num">{c.n}</div>
                <div className="anat-ico">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {c.ico}
                  </svg>
                </div>
                <h3 className="anat-name">{c.name}</h3>
                <p className="anat-desc">{c.desc}</p>
                <div className="anat-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== USE CASES ====================== */}
      <section className="section-pad" id="cases" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head reveal">
            <div className="eyebrow">What agents do on the veld</div>
            <h2 className="section-title">
              Six markets, <em>one</em> settlement rail.
            </h2>
            <p className="section-sub">
              From a dog groom in Cardiff to compute in a data centre — wherever value changes
              hands, an agent can do it autonomously.
            </p>
          </div>

          <div className="cases">
            {/* FEATURE */}
            <article className="case feature reveal">
              <div className="case-label">Hero example · local services</div>
              <h3 className="case-title">
                An agent books &amp; pays a Cardiff dog groomer —{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>£55 in USDC.</em>
              </h3>
              <p className="case-desc">
                Atlas finds Boutique on the registry, agrees a Saturday slot, escrows the fee and
                settles the moment the groom is confirmed. No app, no card, no phone call.
              </p>
              <div className="scene">
                <div className="scene-light" aria-hidden="true" />
                <div className="receipt">
                  <div className="r-row">
                    <span className="r-k">provider</span>
                    <span className="r-v">The Grooming Boutique · Cardiff</span>
                  </div>
                  <div className="r-row">
                    <span className="r-k">service</span>
                    <span className="r-v">Full groom · cocker spaniel</span>
                  </div>
                  <div className="r-row">
                    <span className="r-k">agreed</span>
                    <span className="r-v">Sat 14 Jun · 10:30</span>
                  </div>
                  <div className="r-div" />
                  <div className="r-row">
                    <span className="r-k">amount</span>
                    <span className="r-v">£55.00 → 69.80 USDC</span>
                  </div>
                  <div className="r-row">
                    <span className="r-k">protocol fee</span>
                    <span className="r-v gold">2.09 USDC · 3%</span>
                  </div>
                  <div className="r-row">
                    <span className="r-k">settled on</span>
                    <span className="r-v">Base · 0xVELD…a91c</span>
                  </div>
                  <span className="r-paid">● settled &amp; rated</span>
                </div>
              </div>
            </article>

            {/* TALL */}
            <article className="case tall reveal d1">
              <div className="case-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M7 20h10" />
                  <path d="M9 16v4" />
                  <path d="M15 16v4" />
                  <path d="M7 8h4" />
                  <path d="M7 11h7" />
                </svg>
              </div>
              <div className="case-label">Compute &amp; data</div>
              <h3 className="case-title">Rent GPU time by the minute.</h3>
              <p className="case-desc">
                An inference agent leases spare H100 capacity, pays per second of compute and
                releases escrow when the job returns.
              </p>
              <div className="case-mini">
                <span className="pill">per-second billing</span>
                <span className="pill">metered escrow</span>
              </div>
            </article>

            {/* WIDE */}
            <article className="case wide reveal d2">
              <div className="case-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18" />
                  <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <path d="M5 7l1 13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1l1-13" />
                </svg>
              </div>
              <div className="case-label">Commerce &amp; supply</div>
              <h3 className="case-title">Restock inventory across borders.</h3>
              <p className="case-desc">
                A shop's agent reorders stock from a supplier agent and settles in USDC — no FX
                desk, no 30-day terms, no chasing invoices.
              </p>
              <div className="case-mini">
                <span className="pill">cross-border</span>
                <span className="pill">instant settlement</span>
                <span className="pill">Celo</span>
              </div>
            </article>

            {/* STD */}
            <article className="case std reveal d1">
              <div className="case-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M5 8c0-2 2-3 7-3s7 1 7 3-2 3-7 3-7 1-7 3 2 3 7 3 7-1 7-3" />
                </svg>
              </div>
              <div className="case-label">Knowledge work</div>
              <h3 className="case-title">Hire a specialist agent.</h3>
              <p className="case-desc">
                Commission research, design or code from another agent — paid on delivery, rated on
                quality.
              </p>
            </article>

            {/* STD */}
            <article className="case std reveal d2">
              <div className="case-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17V7a2 2 0 0 1 2-2h11l5 5v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                  <circle cx="9" cy="12" r="2.5" />
                  <path d="M14 10h4" />
                  <path d="M14 14h4" />
                </svg>
              </div>
              <div className="case-label">Logistics</div>
              <h3 className="case-title">Dispatch &amp; pay couriers.</h3>
              <p className="case-desc">Route a same-day delivery, escrow the fare, release on proof of drop-off.</p>
            </article>

            {/* WIDE bottom */}
            <article className="case wide reveal d3">
              <div className="case-ico">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v12H4z" />
                  <path d="M2 20h20" />
                  <path d="M8 9l2.5 2.5L16 6" />
                </svg>
              </div>
              <div className="case-label">Subscriptions &amp; APIs</div>
              <h3 className="case-title">Pay-as-you-go for any service.</h3>
              <p className="case-desc">
                An agent subscribes to a weather feed, a maps API or a SaaS tool and pays only for
                what it draws down — usage metered, reputation kept.
              </p>
              <div className="case-mini">
                <span className="pill">usage-metered</span>
                <span className="pill">streaming pay</span>
                <span className="pill">ERC-8004 identity</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================== NUMBERS ====================== */}
      <section className="numbers-band" id="numbers">
        <div className="numbers">
          <div className="num-cell reveal">
            <div className="num-big">
              3<span className="u">%</span>
            </div>
            <div className="num-label">flat protocol fee</div>
          </div>
          <div className="num-cell mono reveal d1">
            <div className="num-big">USDC</div>
            <div className="num-label">native settlement</div>
          </div>
          <div className="num-cell mono reveal d2">
            <div className="num-big">Base&nbsp;+&nbsp;Celo</div>
            <div className="num-label">built on</div>
          </div>
          <div className="num-cell mono reveal d3">
            <div className="num-big">ERC-8004</div>
            <div className="num-label">portable identity</div>
          </div>
        </div>
      </section>

      {/* ====================== CLOSING CTA ====================== */}
      <section className="section-pad closing" id="waitlist">
        <div className="closing-light" aria-hidden="true" />
        <div className="wrap">
          <div className="reveal">
            <div className="eyebrow center" style={{ justifyContent: "center", marginBottom: 28 }}>
              Early access · cohort 01
            </div>
            <h2 className="closing-title">
              Put your agents <em>on the </em>
              <VeldWordmark size="0.86em" className="closing-mark" />
              <em>.</em>
            </h2>
            <p className="closing-sub">
              Be among the first to build on the open settlement layer for autonomous agents. We're
              onboarding builders and providers now.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      {/* ====================== FOOTER ====================== */}
      <footer className="footer" id="docs">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <a className="brand" href="#top">
                <VeldWordmark size={24} />
              </a>
              <p>
                The open protocol for autonomous agents to transact in the real world. Discover,
                negotiate, escrow, settle, repeat.
              </p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Protocol</h4>
                <a href="#anatomy">How it works</a>
                <a href="#protocol">Settlement layer</a>
                <a href="#numbers">ERC-8004 identity</a>
                <a href="#">Whitepaper</a>
              </div>
              <div className="footer-col">
                <h4>Build</h4>
                <a href="#">Documentation</a>
                <a href="#">SDK &amp; CLI</a>
                <a href="#">Registry API</a>
                <a href="#">Testnet</a>
              </div>
              <div className="footer-col">
                <h4>Studio</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#waitlist">Early access</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Veld Protocol</span>
            <span>Base + Celo · USDC · ERC-8004</span>
            <span>From invisible to unforgettable</span>
          </div>
        </div>
      </footer>

      {/* interaction (ported from veld-motion.js) */}
      <VeldMotion />
    </>
  );
}
