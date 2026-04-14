# Veld Protocol — Marketing Site

The official marketing site for [Veld Protocol](https://veldprotocol.io) — the commerce layer for AI agents.

Veld Protocol is a settlement and negotiation layer that lets autonomous agents transact in the real world. Built on a dual-chain architecture (Base L2 for USDC escrow, Celo for ERC-8004 agent identity and reputation), it integrates with open standards including Google A2A for discovery and x402 for micropayments.

**Live site:** [veldprotocol.io](https://veldprotocol.io)
**Join the waitlist:** [veldprotocol.io/#waitlist](https://veldprotocol.io/#waitlist)
**Launch blog post:** [Introducing Veld Protocol](https://veldprotocol.io/blog/introducing-veld-protocol)

---

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4
- **Content:** MDX for blog posts, with Shiki for syntax highlighting
- **OG cards:** `@vercel/og` for dynamic social previews
- **Analytics:** PostHog (EU region, env-gated)
- **Error tracking:** Sentry (env-gated)
- **Waitlist:** Supabase upsert via `/api/waitlist`
- **Hosting:** Vercel (auto-deploy from `main`)

## Local Development

```bash
git clone https://github.com/Garth2019/veld-protocol-site.git
cd veld-protocol-site
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and populate. All integrations are env-gated — the site runs fine without them in local dev.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key (EU) |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry project DSN |
| `SUPABASE_URL` | Supabase project URL (waitlist persistence) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `BREVO_API_KEY` | Brevo transactional email (waitlist auto-responder — TODO) |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server on :3000 |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript) |

## Deployment

Pushes to `main` auto-deploy to production via Vercel. Preview deployments are created for all other branches and PRs.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── (marketing)/     # Home, protocol, developers, about
│   ├── blog/            # Blog index + [slug] MDX pages
│   ├── og/              # Dynamic OG card route
│   └── api/waitlist/    # Waitlist signup endpoint
├── components/          # React components
├── lib/                 # Utilities, constants, helpers
└── styles/              # Global styles
content/
├── copy.md              # Source of truth for page copy
└── blog/                # MDX blog posts
public/
└── Brand/               # SVG brand assets (mark, wordmark, variants)
```

## License

© 2026 GETBOOKD LTD. All rights reserved.

The "Veld Protocol" name and brand assets are proprietary. The protocol specification and SDK are released separately under the Apache 2.0 license in the forthcoming [veld-protocol](https://github.com) repository.
