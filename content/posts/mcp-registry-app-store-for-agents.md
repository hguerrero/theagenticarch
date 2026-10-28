---
title: 'The MCP Registry Is Becoming the App Store for Agents'
date: 2026-12-15
draft: false
description: 'Hard-coded tool lists work for prototypes and break in the enterprise. A registry separates finding a capability from running it, and that makes governance possible. The app store analogy is useful and incomplete.'
tags: ['mcp', 'registry', 'agents', 'governance', 'discovery']
pillars: ['Agentic Infrastructure']
cover:
  image: '/images/mcp-registry-app-store-for-agents/cover.png'
  alt: 'The MCP Registry Is Becoming the App Store for Agents — a shelf of tool listings with owner, version, and status that an agent browses'
---

The first version of almost every agent has its tools hard-coded. A list in a config file, a few connection strings, and it works. For a prototype, that is the right call.

Then the organization grows. New tools appear every week. Existing ones change on their own schedules. Production exposes different capabilities from staging. And every change means editing the agent's configuration and redeploying it.

This is the point where a registry stops being a nice idea and becomes load-bearing infrastructure.

## From hard-coded to discovered

With hard-coded tools, the agent *knows* its capabilities at build time. The list is part of the agent.

With a registry, the agent *asks*. It describes what it needs, queries a catalog, and receives the servers that can help. The agent no longer carries a list of tools. It carries the ability to look one up. Think of a registry as a service catalog for AI: the idea teams already use for services, applied to tools an agent can choose at runtime.

The important consequence is that **finding a capability is separated from running it.** Each can then be controlled on its own terms. New tools can appear without changing agent code, and the places where capabilities can be found become a place where you can apply policy.

![Comparison of an agent with a hard-coded tool list that needs redeploying for every change, versus an agent that queries a registry for current capabilities](/images/mcp-registry-app-store-for-agents/fig-1-hardcoded-vs-discovered.png)

## What a registry holds

A registry is a catalog of MCP servers, and its value depends on the metadata it carries. A useful entry includes:

- **Name and description.** What the server does, written for a model to read.
- **Endpoint and execution context.** Where and how to connect, and whether the server runs locally or remotely.
- **Namespace.** A stable identifier that keeps similarly named servers from colliding.
- **Version.** So changes can be rolled out and rolled back deliberately.
- **Owner.** The team responsible, with a way to reach them.
- **Environment and scope.** Whether it is experimental, staging, or production, and what domain it covers.
- **Access requirements.** What authentication and authorization it expects.
- **Status.** Whether it is active, deprecated, or retired.

The MCP project publishes a registry specification, and vendors and enterprises are building private registries on top of the same idea. Some of these are still early, and the details vary. The pattern is stable: a single place that is the source of truth for what agents can use. Entries can be grouped by metadata such as environment, domain, access boundary, and owning team, and agents query the registry through an API instead of reading a config file.

![Anatomy of a registry entry listing name, description, endpoint, version, owner, environment, access requirements, and status](/images/mcp-registry-app-store-for-agents/fig-2-registry-entry.png)

## Why the app store analogy works

An app store is a good mental model, because it solves the same structural problem.

- **A listing** describes what an app does in language the buyer understands.
- **Review** means something checked it before it was offered.
- **Versions** let updates ship without breaking everyone.
- **Permissions** say what the app is allowed to touch.
- **Deprecation** gives the store a way to retire what is no longer supported.

A registry offers each of those to agents. A tool that is listed, reviewed, versioned, and permissioned is a tool you can reason about. A tool an agent found on its own is not.

This also makes governance practical. A development registry can hold experimental servers while a production registry holds only approved ones. Groups of servers can have separate access controls. Ownership and version metadata make clear who is responsible for what. And if no match exists, the agent stops instead of improvising, which is a guardrail against invented actions.

## Where the analogy breaks

It is worth being honest about where an app store is the wrong picture, because that is where the risk hides.

**The "buyer" is software, acting at runtime.** A person installing an app makes a one-time decision. An agent selects and calls tools in the middle of a task, possibly thousands of times, without anyone watching. Approval has to be encoded as policy, not left to a human's judgment in the moment.

**Listing is not trust.** A store listing says the app exists. It does not say that every use of it is appropriate. Whether an agent may call a given tool, for a given user, for a given purpose, is an authorization decision that a registry alone does not make.

**The catalog is a target.** If an attacker can add a malicious entry, or alter an existing one, agents may be steered toward it. Registries need write controls, provenance, and review, and the descriptions themselves are text a model reads, so they can carry instructions.

**Descriptions are part of the interface.** In a store, a listing is marketing. In a registry, it is what the model uses to decide. Poor or misleading descriptions cause wrong tool choices, even with no one acting maliciously.

![Table matching app store concepts such as listing, review, version, permission, and deprecation to registry equivalents, with notes on where the analogy breaks for runtime selection, authorization, and trust](/images/mcp-registry-app-store-for-agents/fig-3-app-store-analogy.png)

## Curated views, not raw schemas

A registry entry should point at a governed interface, not at a raw schema. Give a model direct access to internal schemas and it will guess at parameters. A proxy or thin layer in front of the data can present a curated, AI-ready view that enforces business rules and schemas before anything reaches the model. The registry lists that view. The raw API stays behind it. [The MCP Data Path](/posts/the-mcp-data-path/) shows why this matters for where data ends up.

## What to put in place

If you are building toward a registry, a few decisions matter early.

1. **Pick the source of truth.** One registry, or a small set separated by environment, rather than a scatter of lists.
2. **Make ownership mandatory.** An entry without an owner does not get listed.
3. **Separate environments.** Experimental tools should not be discoverable from production.
4. **Filter discovery by identity.** An agent should see only what it and its user may use.
5. **Control writes.** Review changes to entries and descriptions as you would changes to code.
6. **Connect it to policy and observability.** Discovery, selection, and calls should all show up in the same trace. Add tool-level authorization and rate limits so a runaway agent cannot overwhelm a service or run up cost, and track which tools are used, by whom, and how much context they add.

This builds directly on the problem described in [API Discoverability Was Always the Problem](/posts/api-discoverability-was-always-the-problem/): a registry is the same idea, shaped for a consumer that selects at runtime.

## Frequently asked questions

### What is an MCP registry?

An MCP registry is a catalog of MCP servers, with metadata such as name, description, endpoint, version, owner, environment, and access requirements. Agents can query it to find tools dynamically instead of relying on a hard-coded list.

### Why use a registry instead of configuring tools directly?

Hard-coded tool lists force a redeploy for every change and give no central place to apply governance. A registry separates discovery from execution, so capabilities can change independently of agents and policy can be applied where tools are found.

### Is a registry the same as an app store for agents?

It is a useful analogy, since both offer listings, versions, permissions, and deprecation. But agents select and call tools at runtime without a human in the loop, so approval must be encoded as policy, and listing a tool does not by itself authorize any particular use of it.

### How do you secure an MCP registry?

Control who can add or change entries, require ownership and provenance, separate development and production registries, filter discovery by identity and purpose, and treat descriptions as untrusted text that a model will read.

*Related: [MCP Is a Protocol. Your Architecture Still Matters.](/posts/mcp-is-a-protocol-your-architecture-still-matters/)*
