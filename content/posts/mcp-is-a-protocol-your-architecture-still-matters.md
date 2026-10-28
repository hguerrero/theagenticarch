---
title: 'MCP Is a Protocol. Your Architecture Still Matters.'
date: 2026-11-24
draft: false
description: 'The Model Context Protocol standardizes how agents talk to tools. It does not decide what a good tool is, who owns it, or what it is allowed to do. Those are still architecture decisions.'
tags: ['mcp', 'agents', 'architecture', 'apis', 'tool-design']
pillars: ['Agentic Infrastructure']
cover:
  image: '/images/mcp-is-a-protocol-your-architecture-still-matters/cover.png'
  alt: 'MCP Is a Protocol. Your Architecture Still Matters. — a thin protocol layer above a larger architecture of ownership, data access, and authorization'
---

The Model Context Protocol is a good idea, well executed. It gives agents a common way to discover and call tools, so a host application does not need a bespoke integration for every capability.

It also creates a tempting conclusion: *we support MCP, so we have an agent integration story.*

That is like saying we support HTTP, so we have an API strategy. The protocol tells you how messages move. It says nothing about whether the thing at the other end is any good.

> **MCP is the protocol. The server is where the architecture happens.**

## What the protocol gives you

MCP standardizes a handful of things well:

- **A message format.** Hosts, clients, and servers speak the same language.
- **Capability discovery.** A client can ask a server what tools, resources, and prompts it offers.
- **A calling convention.** Tools are invoked in a uniform way, with structured inputs and outputs.
- **Transports and an authorization framework.** There are standard ways to connect, locally or over HTTP, and to authenticate a client to a server.

That is real value. It removes a large amount of repetitive glue code and makes the ecosystem composable. It is the reason an agent can connect to a tool that did not exist when the agent was written.

## What it leaves to you

Everything that makes a capability *good* sits on the other side of the protocol boundary.

**Granularity.** Should the server expose one tool per API endpoint, or one tool per user task? The protocol is neutral.

**Data access.** Does the server call a governed API, or does it connect straight to a database? The protocol is neutral.

**Ownership.** Who maintains the server, versions it, and answers when it breaks? The protocol is neutral.

**Authorization.** Whose permissions apply when a tool runs, and what is the agent allowed to change? The protocol gives you a place to authenticate. It does not decide your authorization model.

**Behavior under failure.** What does a tool return when the upstream is down, the input is ambiguous, or the action is half done? The protocol is neutral.

**Observability.** What do you log, trace, and audit? The protocol is neutral.

Every one of those is an architecture decision, and each one gets made whether or not you make it deliberately.

![Diagram contrasting what MCP standardizes, such as messages, discovery, calling, and transport, with what remains an architecture decision, such as granularity, data access, ownership, authorization, failure behavior, and observability](/images/mcp-is-a-protocol-your-architecture-still-matters/fig-1-protocol-vs-architecture.png)

## Three shapes of MCP server

In practice, servers tend to fall into three shapes. Which one you choose determines most of what follows.

**The API wrapper.** One tool per endpoint, generated or hand-written, with the API's own vocabulary. It is quick to build and easy to explain. The cost is that the model must assemble the workflow itself, calling several low-level tools in the right order, and it will sometimes get that wrong. It also tends to expose more surface area than any task needs.

**The task-shaped capability.** A small set of tools named for what a user is trying to accomplish, such as `track_shipment` or `reschedule_delivery`. Each tool hides the sequence of calls behind it and exposes only what the task requires. This is usually the best default for agents: fewer choices, clearer descriptions, a smaller blast radius.

**The orchestration monolith.** A server that contains business logic, calls many systems, and makes decisions on its own. It can look convenient, because the agent just calls one tool. But now the real workflow lives inside a component that is hard to test, hard to own, and invisible to the teams whose systems it touches.

This is not a new idea. When we wrote *Building Great APIs* in 2012, the advice for flexible, simple APIs was to expose atomic operations that can be combined, then add a second layer of macro operations for the common workflows. The API wrapper is the atomic layer on its own. The task-shaped capability is the macro layer. The difference now is that the consumer picking among them is a model, with only the descriptions to go on.

None of the three is wrong in every case. The mistake is picking one by accident.

![Three MCP server shapes: an API wrapper with one tool per endpoint, a task-shaped capability, and an orchestration monolith, compared by effort, model burden, and risk](/images/mcp-is-a-protocol-your-architecture-still-matters/fig-2-three-server-shapes.png)

## Questions to ask before you build a server

You can treat the protocol as settled and spend your attention here.

1. **What task does this capability serve?** If you cannot say it in a sentence, the tool is probably too low level or too broad.
2. **Who owns it?** A named team, with a way to reach them, and a plan for versions and deprecation.
3. **What does it touch?** Prefer calling an existing governed API over reaching into a data store directly.
4. **Whose authority does it run with?** Decide whether the call carries the user's identity, the agent's, or a service account, and what that identity is allowed to do.
5. **What can go wrong, and what does the agent see?** Design the failure responses as carefully as the success ones.
6. **How will you know what happened?** Decide up front what is logged and how a call can be traced from the user's request to the final effect.

![Checklist of six questions to ask before building an MCP server: task, owner, what it touches, whose authority, failure behavior, and traceability](/images/mcp-is-a-protocol-your-architecture-still-matters/fig-3-design-questions.png)

## Protocol first, then architecture

There is an upside to all this, and it is the reason the server matters. A server does not have to start from scratch. It can reuse assets the organization already trusts, such as governed APIs, event streams, and existing tools, and present them to agents as richer context. The work is deciding what to reuse and how to shape it.

None of this argues against MCP. A shared protocol is what makes the rest of the work possible, and standardizing the boundary was the right call.

It argues against treating the protocol as the destination. The teams that get durable value from MCP will be the ones that treat each server as a small product, with a purpose, an owner, a contract, and controls, and that reuse the architecture they already trust behind it.

If you have already thought hard about API design, [you are further along than you think](/posts/what-20-years-of-api-design-taught-me-about-agents/). Most of those instincts transfer directly.

## Frequently asked questions

### What does MCP standardize, and what does it not?

MCP standardizes the message format, capability discovery, tool calling, transports, and an authorization framework for connecting agents to tools. It does not decide how granular a tool should be, where its data comes from, who owns it, whose permissions apply, how it fails, or what it logs. Those remain architecture decisions.

### Is an MCP server just an API wrapper?

It can be, but it usually should not be. A server that mirrors an API one endpoint per tool pushes workflow assembly onto the model. Task-shaped tools, named for what a user is trying to do and implemented on top of governed APIs, tend to work better for agents and are easier to secure.

### Should an MCP server connect directly to a database?

Generally no. Going through an existing API keeps business rules, access control, and auditing in one place. A server with direct data access duplicates that logic and bypasses the controls teams already depend on.

### Who should own an MCP server?

A named team, usually the one that owns the underlying capability. The owner is responsible for the tool descriptions, versioning, authorization behavior, and incident response, just as they would be for an API.

*Related: [A Simple Agent Request Is Actually a Distributed System](/posts/agent-request-is-a-distributed-system/)*
