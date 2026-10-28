---
title: 'API Discoverability Was Always the Problem. Agents Just Made It Impossible to Ignore.'
date: 2026-12-01
draft: false
description: 'Enterprises have long struggled to help people find the APIs they already own. MCP registries and agent capability discovery extend that old problem. They do not invent a new one.'
tags: ['apis', 'discovery', 'mcp', 'agents', 'api-management']
pillars: ['API Foundation']
cover:
  image: '/images/api-discoverability-was-always-the-problem/cover.png'
  alt: 'API Discoverability Was Always the Problem — a chain from API catalog to developer portal to service catalog to MCP registry to agent capability discovery'
---

A large organization can own hundreds of APIs and still have teams build the same integration twice. Not because the APIs are bad. Because nobody could find the one that already existed.

I co-wrote about this a few years ago, in the context of developer portals: an inventory of APIs is the first and most important step, but it is only the first step. Consumers also need to understand what an API does, how to call it, what it costs, what terms apply, and how to get access. Without that, the catalog is a list of names.

Agents did not create this problem. They made it impossible to ignore.

## The old problem

Discoverability has always had the same shape.

- **Inventory.** What exists?
- **Understanding.** What does each thing do, and how do I use it?
- **Search.** Can I find the right one without already knowing its name?
- **Self-service.** Can I start using it without emailing the team that built it?

When those fail, the consequences are familiar. Teams build duplicates. Good APIs go unused. Questions pile onto the original developers, and that does not scale. Discovery was never a documentation nicety. It was what decided whether an API got adopted.

## The same problem, five times

If you look at the last two decades, each generation of tooling solved discoverability for a new kind of consumer.

**API catalog.** A list of what exists. Useful, but thin.

**Developer portal.** A catalog with documentation, interactive try-it features, subscription plans, and terms. This made self-service possible for human developers.

**Service catalog.** An internal inventory of services, owners, and dependencies, aimed at the teams running them.

**MCP registry.** A catalog of tool servers, with names, descriptions, endpoints, versions, and ownership, that an agent can query.

**Agent capability discovery.** The destination: an agent that, in the middle of a task, can ask what it can do, find a suitable capability, check that it is allowed to use it, and call it.

Read as a sequence, this is one idea moving toward its consumer. MCP did not invent discovery. It extends a problem we were already solving, to a consumer that cannot walk down the hall and ask.

![Five-step evolution from API catalog to developer portal to service catalog to MCP registry to agent capability discovery](/images/api-discoverability-was-always-the-problem/fig-1-discovery-evolution.png)

## What agents need that humans improvised

A human developer filled gaps by inference. They skimmed a page, recognized a convention, guessed at a parameter, and asked a colleague when they were stuck. A lot of discoverability worked because people are good at improvising.

An agent improvises too, but it does so from a description, and it may act on its guess. So the things humans inferred have to be stated.

| A human could infer… | An agent needs it stated |
|---|---|
| What the API is for, from a page title and a skim | A precise description of the capability and when to use it |
| That a call is risky, from experience | Whether it reads or changes state, and what it can affect |
| Who to ask for access | The authentication and authorization requirements, machine-readable |
| Which of two similar APIs to pick | Distinguishing detail: scope, owner, environment, version |
| What went wrong, from an error page | Errors that say what failed and what to do next |

![Comparison of what a human consumer can infer versus what an agent needs stated explicitly, such as purpose, side effects, access requirements, distinguishing detail, and error semantics](/images/api-discoverability-was-always-the-problem/fig-2-human-vs-agent-needs.png)

## What good agent discovery looks like

A workable discovery loop is simple to describe.

1. The agent has a task and needs a capability.
2. It queries a registry, using the task description or metadata such as domain, environment, or owner.
3. The registry returns a short list of candidates, filtered to what this agent and user are allowed to see.
4. The agent selects one, using the descriptions it was given.
5. Policy is checked and the call is made.
6. If nothing fits, the agent stops and says so, instead of improvising.

That last step matters most. A discovery system that returns *something* every time is dangerous. One that is willing to return *nothing* is a control.

![Discovery loop in which an agent queries a registry, receives filtered candidates, selects, passes a policy check, and invokes, with a stop path when nothing matches](/images/api-discoverability-was-always-the-problem/fig-3-discovery-loop.png)

## Where to start

You do not need a new platform to begin.

- **Audit what you have.** If your API catalog is incomplete, an agent registry built on it will be incomplete too.
- **Improve the descriptions.** Rewrite them as if the reader has no context and will act on what it reads.
- **Add the metadata an agent needs.** Ownership, environment, access requirements, and whether a call changes state.
- **Filter by identity.** What an agent can discover should depend on who it is acting for.
- **Treat "no match" as a valid answer.**

The organizations that spent years investing in portals, catalogs, and API management will find that work pays off now. The ones that did not will find the gap is the same one it always was, only more expensive.

## Frequently asked questions

### What is API discoverability?

API discoverability is how easily consumers can find the APIs that exist, understand what they do, and start using them without help. It usually involves an inventory, documentation, search and filtering, and self-service access.

### How does MCP relate to API discovery?

MCP extends the same problem to agents. An MCP server advertises its tools to a client, and registries catalog MCP servers so agents can find them. It is the latest step in a progression from API catalogs and developer portals toward agent capability discovery.

### Why do agents need different discovery information than humans?

Humans infer a lot from context and ask colleagues when unsure. Agents act on the description they are given. Purpose, side effects, access requirements, ownership, and error behavior have to be stated explicitly and in a machine-readable form.

### Should an agent be able to discover every tool?

No. Discovery should be filtered by identity and purpose, so an agent only sees capabilities it is allowed to use for the task at hand. If no suitable capability exists, the agent should stop rather than improvise.

*Related: [What 20 Years of API Design Taught Me About Agents](/posts/what-20-years-of-api-design-taught-me-about-agents/)*
