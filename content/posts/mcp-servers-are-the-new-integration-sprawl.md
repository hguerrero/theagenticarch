---
title: 'MCP Servers Are the New Integration Sprawl'
date: 2026-12-22
draft: false
description: 'MCP is valuable because it exposes a new integration boundary. The mistake is believing the protocol eliminates architecture. Without ownership and design, servers recreate the problems we spent decades removing.'
tags: ['mcp', 'integration', 'architecture', 'technical-debt', 'governance']
pillars: ['Context Economy']
cover:
  image: '/images/mcp-servers-are-the-new-integration-sprawl/cover.png'
  alt: 'MCP Servers Are the New Integration Sprawl — a tangle of agents and servers resolving into a layered structure with clear ownership'
---

Every integration era leaves a mess behind, and the mess has a shape.

Point-to-point scripts became a tangle of dependencies. The enterprise service bus promised to tidy that up and, in many places, became its own monolith. Microservices spread logic out and then, without discipline, spread the confusion out with it. Each wave solved a real problem and, used carelessly, produced a new version of the old one.

MCP is the next wave. It is a good protocol with a real purpose. And it is already following the same arc.

I am not arguing against MCP. I am arguing against the idea that adopting it settles the architecture.

> **MCP is valuable precisely because it exposes a new integration boundary. The mistake is pretending that the protocol eliminates architecture.**

## How the sprawl starts

It starts innocently. A team wants an agent to use an internal system, writes a small MCP server in an afternoon, and it works. Another team does the same. Within months, the organization has dozens of servers, built by different people, in different styles, with no shared standards.

Nobody did anything wrong. Each server was a sensible local decision. The problem is what they add up to.

## Why teams reach for it

The pull is real, and it comes from gaps that were there long before agents.

**APIs tell you how to call something, not why.** A `CreateOrder` endpoint documents its parameters. It rarely documents what it sets in motion: when a shipment is triggered, which systems are affected, what must be true before the call. Developers have always filled that gap with Slack threads and guesswork. Now a model has to fill it too.

**Backends are slow to change and logic is scattered.** When the rules live across several services and nobody can say where, a server that wraps them in a friendly, task-level description is the fastest way to get an agent working.

**Contracts were never written for a model.** Specifications such as OpenAPI describe syntax well. They seldom carry usage examples, preconditions, or plain-language intent, which is exactly what a model needs to use an API safely.

So the server fills the vacuum. It encodes intent and flow in one place, and it works. The trouble is *where* it puts that knowledge. Intent that should have been added to the API's contract, or to the owning service, ends up in a component with no owner and no versioning.

![Diagram of many agents connected to many MCP servers in a tangle, each with unknown owners, resolving into a layered structure](/images/mcp-servers-are-the-new-integration-sprawl/fig-1-sprawl-map.png)

## Five kinds of debt

When MCP servers accumulate without design, the same five problems show up. None is new. That is the point.

**Orchestration monoliths.** A server grows to coordinate many systems, make decisions, and manage state. The real workflow now lives inside one component that is hard to test and hard to change, and that none of the underlying teams owns. Everything funnels through it, which is the opposite of the separation of concerns layered architectures were built to protect.

**Duplicated business logic.** The refund rule lives in the billing service. Then someone re-implements it, slightly differently, inside an MCP server, or worse, inside a prompt template, because it was faster. Now there are two versions of the truth, and the agent is using the one nobody reviews.

**Direct data access.** A server connects straight to a database, reads the filesystem, or shells out, bypassing the APIs that enforce access control, validation, and audit. It works until someone asks who changed the data, or why a rule did not apply.

**Weak ownership.** Nobody can say which team maintains a server, which version is running, or who to call when it fails. Prompts and tool descriptions have no version history at all. It was built by someone who has since moved on.

**Difficult maintenance.** Every edit to a prompt or description is a behavior change with no test behind it. Descriptions drift from behavior. Upstream APIs change and the server breaks silently. Dependencies get hard-coded and tangled, because the server was "just glue."

None of this shows up in a demo. It shows up when the team has changed, the flows are mission-critical, and the agents are inside user-facing products, at which point the server is hard to refactor because everything depends on it.

![Five debt patterns in unmanaged MCP servers: orchestration monoliths, duplicated business logic, direct data access, weak ownership, and difficult maintenance](/images/mcp-servers-are-the-new-integration-sprawl/fig-2-five-debts.png)

## We have seen this before

If this feels familiar, it should. BPEL and the enterprise service bus promised centralized orchestration, drag-and-drop workflows, and integration without much code. In practice they produced brittle deployments, single points of failure, and a bottleneck on every change. The industry eventually moved to microservices, domain-driven design, and event-driven architectures, which put logic and ownership back with the teams that understood them.

An MCP server that absorbs orchestration, business rules, and data access is the same pattern with a new interface. This time the workflow is expressed in prompts, so it is harder to see and harder to test.

## Why this is worse for agents

Integration sprawl was always costly. With agents, it carries two extra penalties.

**The consumer is probabilistic.** A script calls a service the same way every time. A model chooses among tools based on descriptions, so duplicate or overlapping servers lead to inconsistent behavior. Two tools that look alike may produce two different answers.

**The blast radius is wider.** A human using a flawed integration notices the problem and stops. An agent may repeat the flaw across many runs before anyone looks. Weak controls on one server become weak controls on everything the agent does with it.

## Keep the boundary, add the architecture

The fix is not to avoid MCP. It is to treat each server as a boundary with a job, and to put the same structure around it that you would around any service.

**Keep servers thin and task-shaped.** A server's job is to present a capability to an agent: a clear name, a precise description, and a small, safe surface. It should not hold business rules.

**Call governed APIs.** The logic and the data stay in the services that own them. The server translates and delegates. That keeps authorization, validation, and audit in one place.

**Name an owner for every server.** Ownership, versioning, and deprecation are not optional. If a server does not have a team behind it, it should not be reachable.

**Register and discover.** Put servers in a [registry](/posts/mcp-registry-app-store-for-agents/) with metadata, so there is one place to see what exists and who owns it.

**Share the controls.** Authentication, authorization, rate limits, and logging should come from common infrastructure, such as a gateway, not be rebuilt per server.

**Test the tools.** A tool is an interface with consumers. Give it contract tests and realistic mocks, just as you would an API.

**Fix the documentation at the source.** If the reason you built a server was that the API does not explain *why* or *when* to use it, add that intent, with examples and preconditions, to the API's own contract. Then every consumer benefits, not only the one behind this server.

**Reuse the integration patterns you already trust.** Content-based routing, message transformation, retries, and circuit breakers all still apply. Wrap them behind a model-friendly description. Do not replace them with a prompt.

**Prefer events over long chains.** Where a flow is "when this happens, those things react," let [events](/posts/events-are-apis-too/) trigger the reactions instead of asking a single server to call everything in sequence. It is easier to test and it fails more gracefully.

**Version prompts and descriptions like code.** If a prompt template or tool description can change behavior, it needs an owner, review, a version, and a rollback.

A server is an interface, not an architecture. Treat it as the former and put the latter behind it.

![Layered structure with an agent calling a thin task-shaped MCP server, which delegates to governed APIs and domain services, with shared controls and a registry alongside](/images/mcp-servers-are-the-new-integration-sprawl/fig-3-boundary-fix.png)

## A simple test

Pick any MCP server in your organization and ask five questions.

1. Who owns it, and how would I reach them?
2. Does it call a governed API, or reach into data directly?
3. Does it contain business rules that also exist somewhere else?
4. Could I describe what it does in one sentence?
5. If it started behaving badly tonight, how would I know?

Then ask the bigger questions. Where should this business logic really live? Are we building for scale and change, or for the demo? Will this server make us faster in twelve months, or slower?

If the answers come easily, you have an asset. If they do not, you have found sprawl early, which is the cheapest time to deal with it.

MCP gave agents a standard way to reach capabilities. The architecture behind each capability is still up to us, and the next integration era is determined by whether we do that work or leave it for later.

## Frequently asked questions

### Is MCP technical debt?

Not by itself. MCP is a sound protocol. Debt comes from how servers are built and managed: orchestration monoliths, duplicated business logic, direct data access, unclear ownership, and weak maintenance. The same patterns appeared in earlier integration eras.

### How is this like the BPEL and ESB era?

Those technologies centralized orchestration in one layer that was supposed to simplify integration, and instead became a brittle bottleneck. An MCP server that absorbs workflow, business rules, and data access repeats the pattern, with the logic expressed in prompts, which makes it harder to see, test, and version.

### What is MCP server sprawl?

It is the uncontrolled growth of MCP servers across an organization, built by different teams in different styles with no shared ownership, standards, or visibility. Each server is a reasonable local decision, but together they recreate the problems of point-to-point integration.

### Should an MCP server contain business logic?

Generally no. Business rules should stay in the services that own them. A server should present a clear, task-shaped capability to an agent and delegate to governed APIs, so rules are not duplicated and controls apply consistently.

### How do you prevent MCP server sprawl?

Keep servers thin and task-shaped, route them through governed APIs, require a named owner for each, register them in a catalog, apply shared controls through common infrastructure such as a gateway, and test tools as you would test any interface.

*Related: [MCP Is a Protocol. Your Architecture Still Matters.](/posts/mcp-is-a-protocol-your-architecture-still-matters/) · [API Discoverability Was Always the Problem](/posts/api-discoverability-was-always-the-problem/)*
