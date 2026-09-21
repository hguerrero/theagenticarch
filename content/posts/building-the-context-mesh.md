---
title: 'Building the Context Mesh'
date: 2026-10-06
draft: false
description: 'A practical architecture for connecting agents to APIs, events, knowledge, and controls without creating another centralized bottleneck.'
tags: ['agents', 'architecture', 'context', 'apis', 'events', 'governance']
---

Once an organization accepts that agents need governed, current context, the next question is unavoidable: what do we actually build?

The answer is not an all-powerful agent platform that absorbs every system. It is a set of layers that make existing capabilities usable in a new way. The goal is to preserve domain ownership while giving agents a safe, observable path to information and action.

Think of the context mesh as connective tissue rather than a replacement for the systems that already hold the truth.

## Start with the sources of truth

Most enterprises already have the raw materials. Operational systems hold the current state of customers, orders, inventory, and transactions. Event streams record changes as they happen. Document stores contain policies and procedures. APIs expose operations. Identity systems define who may do what.

The gap is usually not the absence of data. It is that these assets were designed for people and applications with prior knowledge of where to look. They are inconsistent to discover, difficult to combine, and governed differently from one another.

The mesh does not copy all of this into one place. It creates dependable ways to find, retrieve, and act on it.

## The layers

**Capability layer.** Publish a small number of task-oriented tools and workflows with explicit inputs, outputs, ownership, and side effects. A good capability says what business outcome it supports. It does not merely surface a database table.

**Context layer.** Provide access to authoritative records, knowledge, and task state. Distinguish between facts that can be retrieved on demand and information that must be pushed because a change is important now.

**Event layer.** Treat events as first-class context. An agent making a time-sensitive decision should not depend exclusively on a periodically refreshed index. It needs a controlled way to respond when an order, policy, or operational condition changes.

**Control layer.** Enforce authentication, delegated authorization, data protection, rate limits, budgets, schema validation, and approval rules consistently across capabilities. The control layer should sit where it can prevent unsafe work, not merely describe it afterward.

**Evidence layer.** Record task boundaries, sources consulted, tool calls, approvals, outputs, and state changes. This makes troubleshooting, governance, and continuous improvement possible.

These layers may be implemented with different technologies. Their value is in the contracts between them.

## The Backend for Agents pattern

One useful design choice is to place a purpose-built boundary between agents and the enterprise. Call it a backend for agents, an agent access layer, or something else—the name matters less than the responsibility.

This boundary translates curated business capabilities into interfaces an agent can use. It hides accidental complexity, normalizes contracts, applies policy, and returns results that are meaningful for a task. It should not simply repackage every internal endpoint as a tool.

For example, an agent that needs to help a customer does not need unrestricted access to every customer, order, billing, and logistics operation. It needs a few composed capabilities such as “get service case context,” “propose eligible resolution,” and, with appropriate authority, “execute approved resolution.”

That boundary reduces prompt complexity and dramatically reduces the blast radius of a mistake.

## A first implementation path

Choose a workflow where timeliness and cross-system context genuinely matter. Define the decision an agent may make. Identify the systems of record, the events that invalidate a decision, and the actions that have consequences.

Then build the narrowest useful path:

1. Publish read-only context first, with source and freshness metadata.
2. Add one or two task-level capabilities with strong schemas.
3. Bind every call to an identity and an explicit scope.
4. Require approval for consequential writes.
5. Capture an ordered task record from the beginning.
6. Test failure, revocation, stale context, and duplicate action—not only the happy path.

This is enough to create a foundation that can be reused. Broad access and autonomous execution can be earned through evidence, rather than assumed at launch.

## Architecture is the product

Agent experiences often look simple from the outside: a request, a response, perhaps a few actions taken in the background. But the product people trust is the architecture that makes the response grounded, the action authorized, and the result explainable.

That is what the context mesh provides: not more data, but a disciplined route from intent to reliable action.

*Part of [The Agentic Architect: Season 1](/posts/agentic-architect-season-one/). Next: [Agents Don’t Really Talk. They Exchange Context.](/posts/agents-exchange-context/)*
