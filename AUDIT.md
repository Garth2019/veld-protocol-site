# Veld Protocol — audit notes

Newest first. Each entry: what changed, why, and the numbers before and after.

## 26–27 Oct 2026 — waitlist closed (410), hero film no longer delays mobile LCP

**Found by:** S7 Site Health, 26 Oct 2026. Veld was red: mobile Perf 74, LCP 5.8 s, and a waitlist form posting into
a Supabase project (hlpyjifgedpxcurqlqbr) that no longer exists. Garth parked the waitlist on 17 Oct.

### Waitlist
- `/api/waitlist` answers **410 Gone** to GET and POST with a plain message
  ("The Veld waitlist is closed and is not accepting sign-ups. Nothing was submitted or stored."), `Cache-Control: no-store`.
  It reads nothing from the request.
- The old route had a "stub mode": with no Supabase env it returned `{ success: true }` and `console.log`ged every
  address it was sent. So the form told people they were on a list that did not exist, and their emails ended up in
  Vercel's logs.
- The form is hidden on `/`. Both `WaitlistForm` components are deleted; they were the only callers.
- **Left for Garth (copy/product decision, not changed):** the nav and hero "Get early access" buttons and the footer
  "Early access" link still scroll to the closing section. That section still says "We're onboarding builders and
  providers now." The blog post `introducing-veld-protocol.mdx` still links "Join the developer waitlist". What, if
  anything, replaces the form is Garth's call.

### Mobile LCP
The LCP element is the first letter of the big Modak "veld" wordmark in the nav. It painted at **0.86 s observed**
(= FCP), yet Lighthouse's simulated phone connection put LCP at **4.5 s**. Everything requested before first paint
shares the simulated 1.6 Mbps link, and before first paint the page requested:
- the 1.9 MB hero film (`preload="auto"`, requested at 0.17 s, before `load`)
- a 280 KB poster JPG
- seven preloaded fonts, two of them duplicates (the home layout declared its own JetBrains Mono and Modak on top of
  the root layout's)
- PostHog (posthog-js + surveys) on mount

Changes:
- `HeroFilm`: the poster paints first and the film is attached after `load` + idle. Measured on the preview: the film
  request moved from 0.17 s (before `load` at 0.52 s) to 1.18 s (after `load` at 1.13 s). Reduced motion keeps the poster.
- Poster: `veld-hero.webp`, 43 KB (was a 280 KB JPG; same 1919×820 frame under a 50–58 % scrim).
- The home layout reuses the root's JetBrains Mono and Modak: font preloads 7 → 6.
- PostHog loads after `load` + idle. The landing pageview is now recorded in PostHog's `loaded` callback. Before, the
  tracker skipped any view taken before PostHog finished loading, so the landing view was easy to lose.
- The hero copy reveal (`line-rise`, `fade-up`) runs in CSS from the first paint. It used to wait for hydration to add
  `.ready`, so on a slow phone the headline stayed invisible until React booted.
- `/` now has a canonical (`https://veldprotocol.io/`); it had none.

### Numbers (Lighthouse 12, mobile, median of 3)
| | Perf | LCP | TBT | A11y | BP | SEO |
|---|---|---|---|---|---|---|
| Production, 26 Oct (before) | 79 | 4.58 s (max 4.61) | 228 ms | 94 | 100 | 100 |
| Preview, this branch (after) | _see final pass_ | | | | | n/a on a protected preview |

### Gate (preview)
- audit_page: 34/47, 5 blocking. All 5 were already failing on production, which scores 32/47 with 6 blocking; this
  branch clears the dead form and the oversized image.
  - Fixed here: the canonical.
  - Remaining, each needing a decision:
    - business JSON-LD: the check wants a LocalBusiness, and Veld is a protocol
    - no `tel:` link: Veld has no phone line
    - 8 footer links are `href="#"` (Whitepaper, Docs, SDK, Registry API, Testnet, About, Blog, Contact): their
      destinations are an IA/copy call
    - hero chip and stage labels are under 4.5:1 over the film: a design call
- verify_hero: N/A. Veld's hero is a background film, not a scroll-film canvas.
- Headers: all six present. **securityheaders.com A+ will still fail.** `script-src` keeps `'unsafe-inline'
  'unsafe-eval'`. Removing them on App Router needs a per-request nonce, which makes every page dynamic. The same
  trade-off is being measured on studio72.dev in this run, and it is Garth's decision.
