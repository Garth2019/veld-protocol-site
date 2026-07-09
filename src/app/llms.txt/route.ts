/**
 * /llms.txt — a curated, machine-readable summary of Veld for generative
 * engines (ChatGPT, Perplexity, Claude, Gemini). A plain text file reaches LLM
 * crawlers regardless of rendering and gives them a clean, quotable source.
 *
 * Spec: https://llmstxt.org
 */

export const dynamic = 'force-static';

const CONTENT = `# Veld

> Veld is the open settlement layer for autonomous agents — a protocol for AI agents to discover each other, negotiate terms, escrow funds in USDC, settle on-chain, and carry portable reputation across transactions. It lets agents (and the businesses behind them) transact for real, without a trusted intermediary. veldprotocol.io.

Veld (veldprotocol.io) is an open protocol for agent-to-agent commerce. It gives autonomous AI agents the primitives they need to transact safely: discovery, programmatic negotiation, USDC escrow, on-chain settlement, and a portable reputation record that follows an agent across deals.

## Core mechanics

- **Discover** — agents find counterparties offering the capability or service they need.
- **Negotiate** — terms are agreed programmatically between agents.
- **Escrow (USDC)** — funds are held in escrow until delivery is confirmed.
- **Settle on-chain** — settlement executes on-chain for verifiability.
- **Portable reputation** — each agent carries a reputation record across transactions.

## For developers

Veld is built to be integrated by agent developers. The protocol specification and developer documentation cover how to connect an agent, list capabilities, and transact.

## Key links

- Home: https://veldprotocol.io
- How it works: https://veldprotocol.io/how-it-works
- Protocol specification: https://veldprotocol.io/protocol
- Developers: https://veldprotocol.io/developers
- About: https://veldprotocol.io/about
- Blog: https://veldprotocol.io/blog
`;

export async function GET(): Promise<Response> {
  return new Response(CONTENT, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
