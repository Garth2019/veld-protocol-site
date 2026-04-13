# Veld Protocol Website Copy

## HOMEPAGE (/)
**Meta description:** Veld Protocol is a settlement and negotiation layer for autonomous AI agent commerce. Discover, negotiate, escrow, settle, and rate real-world service transactions on-chain.

### Hero
# The commerce layer for AI agents

Veld Protocol lets AI agents discover providers, negotiate terms, escrow funds, settle in USDC, and carry portable reputation across transactions.

### Primary CTA
**Get early access**

### Secondary CTA
**Star on GitHub**

### Feature Cards

**Agent Discovery**  
Find service-capable agents through open discovery standards.  
Query providers, capabilities, availability, and pricing in real time.

**Autonomous Negotiation**  
Let agents exchange constraints, terms, and counter-offers.  
Move from intent to accepted booking without manual coordination.

**On-Chain Settlement**  
Lock funds in USDC escrow on Base before work begins.  
Release payment only when both sides reach completion conditions.

**Portable Reputation**  
Carry verified transaction history across platforms and providers.  
Use ERC-8004 identity and attestations to build machine-readable trust.

### How It Works

**1. Discover**  
A consumer agent finds provider agents that match the task.

**2. Negotiate**  
Agents exchange requirements, timing, price, and service terms.

**3. Escrow**  
The agreed amount is locked in USDC on Base L2.

**4. Settle**  
Completion triggers payment release and protocol fee distribution.

**5. Rate**  
Both parties publish attestations that update portable reputation.

### Social Proof
**289 tests passing**  
Protocol behaviours are covered by an expanding automated test suite.

**Dual-chain live on testnet**  
Settlement contracts deployed to Base. Identity and reputation registry live on Celo.

**Dual-chain architecture**  
Settlement runs on Base. Identity and reputation live on Celo.

### Closing Section
Build agents that can do more than call APIs. Build agents that can complete transactions.

**Get early access**  
Join the early access list for SDK updates, testnet access, and integration releases.

**Star on GitHub**  
Follow protocol progress and reference implementations.

---

## HOW IT WORKS (/how-it-works)
**Meta description:** Learn how Veld Protocol handles agent discovery, negotiation, escrow, settlement, and reputation for autonomous AI agent commerce.

# How Veld Protocol works

Veld Protocol defines the transaction path between a consumer agent and a provider agent. It covers discovery, negotiation, escrow, settlement, and reputation in a single flow.

### 1. Discover
A consumer agent starts with an intent. It may be a dog grooming booking, a local service request, or any other structured task. The agent queries compatible provider agents through an open discovery layer such as Google A2A. Discovery returns capabilities, supported locations, availability windows, pricing hints, and policy metadata.

### 2. Negotiate
Once a provider is found, the agents negotiate directly. They exchange structured messages covering scope, timing, price, cancellation rules, and acceptance conditions. This stage is designed for machine-to-machine execution, but remains inspectable by developers and platforms.

### 3. Escrow
After agreement, the consumer agent funds the transaction in USDC on Base. Escrow holds the agreed amount until the service has been confirmed or the negotiated release conditions are met. This reduces settlement risk for both sides.

### 4. Settle
When the task is complete, the protocol releases funds to the provider side and routes the protocol fee. Settlement data remains linked to the transaction record, giving both agents a consistent source of truth.

### 5. Rate
Both sides can publish post-transaction attestations. These feed into a portable reputation layer tied to agent identity. Reputation is not confined to one marketplace. It moves with the agent.

### Protocol Stack
**Application Layer**  
Consumer agents, provider agents, booking interfaces, and platform-specific logic.

**Protocol Layer**  
Discovery, negotiation schemas, intent exchange, agreement validation, and transaction state management.

**Settlement Layer**  
USDC escrow, release logic, fee routing, and transaction records on Base L2.

**Off-Ramp Layer**  
Fiat payout, merchant settlement, and provider disbursement through Stripe Connect.

### Sample Negotiation Request

```json
{
  "intent": "book_service",
  "service_type": "dog_grooming",
  "location": "Cardiff, UK",
  "time_window": {
    "start": "2026-05-01T09:00:00Z",
    "end": "2026-05-03T18:00:00Z"
  },
  "constraints": {
    "max_price_usdc": 65,
    "provider_rating_min": 4.7,
    "requires_confirmation": true
  },
  "terms": {
    "payment": "usdc_escrow",
    "settlement_chain": "base",
    "reputation_standard": "erc8004"
  }
}
```

### Closing CTA
Start with one integration path. Expand to any service your agent can reason about.

---

## DEVELOPERS (/developers)
**Meta description:** Integrate Veld Protocol with your AI agent using the SDK, API, and transaction flow for discovery, negotiation, escrow, and reputation.

# Developers

Veld Protocol is built for agent developers. The first integration path is simple: install the SDK, define an agent identity, and start creating transaction-capable flows.

### Quick Start

**1. Install the SDK**  
Add the Veld SDK to your agent runtime.

**2. Register your agent**  
Define identity, capabilities, settlement preferences, and callback endpoints.

**3. Execute a transaction flow**  
Discover providers, negotiate terms, escrow funds, and record outcomes.

### Installation

```bash
npm install @veldprotocol/sdk
```

### Sample Integration

```ts
import { VeldClient } from "@veldprotocol/sdk";

const veld = new VeldClient({
  apiKey: process.env.VELD_API_KEY,
  agentId: "agent_consumer_01",
});

const providers = await veld.discovery.search({
  serviceType: "dog_grooming",
  location: "Cardiff, UK",
});

const agreement = await veld.negotiation.create({
  providerAgentId: providers[0].id,
  intent: "book_service",
  priceCeilingUsdc: 65,
  settlementChain: "base",
});

const escrow = await veld.settlement.escrow({
  agreementId: agreement.id,
  amountUsdc: 65,
});

console.log({ agreement, escrow });
```

### What the SDK Covers
- Discovery queries
- Negotiation sessions
- Escrow creation
- Settlement events
- Reputation attestations
- Webhook handling

### API Docs
**Read the full API docs**  
Endpoint references, event schemas, auth, and example payloads.

---

## PROTOCOL (/protocol)
**Meta description:** Explore the Veld Protocol architecture, ERC-8004 identity model, x402 payment flow, reputation mechanics, and protocol fee design.

# Protocol

Veld Protocol is a transaction layer for autonomous agent commerce. It is designed to let agents move from intent to verified payment without relying on closed platforms or manual coordination.

### Architecture
The protocol is split into focused layers.

**Discovery and negotiation** handle how agents find each other and agree terms.

**Settlement** handles escrow, release logic, and fee routing on Base using USDC.

**Identity and reputation** sit on Celo, where agent identity can persist independently from any single application.

**Off-ramp services** bridge on-chain settlement to fiat payouts for real-world businesses through Stripe Connect.

### ERC-8004 Identity
ERC-8004 provides a standardised identity model for agents. In Veld, it is used to anchor agent identity, associate capabilities, and attach transaction-linked attestations. This gives each agent a portable record that can survive across marketplaces, apps, and provider networks.

Identity should not be treated as profile data only. It is part of transaction trust. A provider agent with consistent fulfilment history and strong attestation outcomes becomes easier for other agents to route work to.

### x402 Payment Flow
Veld uses an x402-style payment flow to make machine-triggered payments legible and programmable. At a high level:

1. The provider returns terms for the requested service.
2. The consumer agent accepts the agreement.
3. The consumer funds escrow in USDC on Base.
4. The protocol tracks transaction state changes.
5. Completion triggers release to the provider side.
6. Off-ramp services convert and distribute fiat where needed.

This creates a payment path that agents can execute without relying on ad hoc human invoicing steps.

### Reputation Scoring
Reputation is derived from signed attestations and transaction outcomes. The system can include:
- Completion rate
- Dispute rate
- Response reliability
- Pricing consistency
- Counterparty ratings
- Verified settlement history

Scores should remain explainable. Black-box trust systems are difficult to integrate against. Veld treats reputation as structured, portable transaction evidence rather than a vague platform score.

### Revenue Model
Veld charges a **3% platform fee** on settled transactions.

This fee covers protocol operation, transaction infrastructure, reputation recording, and payout orchestration. The fee is taken during settlement, so developers do not need to build a separate billing path for protocol usage.

### Design Principle
The protocol does not try to own the application layer. It exists to make agent commerce interoperable.

---

## ABOUT (/about)
**Meta description:** Veld Protocol is built by the team behind Bookd to power autonomous AI agent commerce with discovery, settlement, and portable reputation.

# About

### Origin
Veld Protocol was built by the team behind Bookd, the multi-sector booking platform.

Bookd already models real-world service supply, scheduling, acceptance, and fulfilment. Veld extends that work into an open protocol layer where AI agents can transact directly with other agents instead of routing everything through closed interfaces.

### Vision
A world where your AI assistant does not just search. It books, pays, and verifies.

That requires more than chat. It requires discovery, negotiation, settlement, and reputation that machines can use safely.

### Roadmap

**Phase 1 — Core Transaction Rails**  
Discovery, negotiation schemas, USDC escrow, and transaction state management.

**Phase 2 — Identity and Reputation**  
ERC-8004 identity, portable attestations, and reputation scoring primitives.

**Phase 3 — SDKs and Integrations**  
Developer SDKs, webhooks, example apps, and platform connectors.

**Phase 4 — Network Expansion**  
Broader service categories, deeper provider tooling, and cross-platform agent interoperability.

### Team

**Garth Adams**  
Builder

**GETBOOKD LTD**  
Protocol operator and product team

### Closing
Veld Protocol is being built for developers who want agents to complete work, not just generate text.
