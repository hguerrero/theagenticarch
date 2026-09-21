---
title: 'iPaaS Was Built for Applications. Agents Need a Context Mesh.'
date: 2026-09-29
draft: false
description: 'Traditional integration moves data along predetermined paths. Agentic systems need governed context that can be discovered and assembled at runtime.'
tags: ['agents', 'architecture', 'context', 'integration', 'governance']
---

Integration platforms earned their place in the enterprise by solving a real problem: connect known systems through known flows. An order enters one application, a record is updated in another, and a workflow moves data from point A to point B according to rules someone designed.

That model still matters. But it assumes the application knows the journey before it begins.

Agents do not always have that luxury.

An agent starts with an objective and has to assemble the information and capabilities required to pursue it. It may need a current customer record, an event that just arrived, a policy document, a specialist tool, or an approval from a person. Which of those it needs—and in what order—depends on the task.

This is why agentic systems need more than integration flows. They need a **context mesh**.

## A context mesh is not another data lake

The phrase can sound like a new label for an existing repository. It is not.

A context mesh is the architectural layer that makes trustworthy context available to an agent at the time it needs it. It connects systems of record, APIs, event streams, documents, policies, and task state while preserving meaning, ownership, identity, and control.

It is not a single database. It is not a giant prompt. And it is not an invitation to give every agent access to everything.

The mesh exists so an agent can answer three questions reliably:

1. What information is relevant to this objective right now?
2. Which capabilities can I use to make progress?
3. What am I authorized to see or do?

Traditional integration is often a fixed pipe. A context mesh is a governed environment for dynamic work.

## Why predetermined flows fall short

Imagine a service agent asked to resolve a delayed shipment for a high-value customer. A conventional workflow might retrieve an order, check tracking, and open a case. An agent may need to do more: inspect the customer’s service tier, identify a disruption event, compare inventory at nearby locations, check policy constraints, propose remedies, and seek approval before issuing credit.

The route changes with the facts. The architecture must support retrieval and action without pretending that every possible path can be modeled in advance.

That does not mean abandoning workflow. It means placing workflow where it belongs: as one kind of capability an agent can invoke, especially when a process must be deterministic. The agent can decide that a refund workflow is appropriate; the workflow should still execute with its own checks and guarantees.

## Four properties of a useful mesh

**Curated discovery.** Agents should discover business-level capabilities and context sources with clear descriptions, contracts, owners, and limits. Discovery without curation creates a catalog of traps.

**Freshness.** A context mesh must combine durable records with signals about change. A snapshot can explain what was true this morning. An event can tell the agent that the situation is different now.

**Policy-aware access.** Context is not neutral. A customer’s record, a pricing rule, and an operational event carry different sensitivities. The mesh should apply identity, delegated authority, data rules, and purpose constraints before information reaches the agent.

**Traceable composition.** When an answer or action matters, teams must know which sources contributed to it, which tools were called, and what changed. The mesh should make provenance normal, not a forensic exercise.

## Build it incrementally

Do not begin by trying to connect every enterprise system. Start with one decision that currently requires people to gather information across several places. Map the context required, its authoritative source, how current it must be, and who may use it.

Then expose a small set of well-bounded capabilities. Keep actions separate from reads where possible. Make high-impact writes explicit and reviewable. Add events when freshness changes the decision. Capture a durable record of the task.

That pattern can extend across domains without turning the architecture into a central bottleneck. The mesh is not a team that owns all context. It is a set of shared contracts and controls that allow domain teams to publish context responsibly.

## The shift in mental model

The question is no longer only, “How do we integrate these two applications?”

It becomes, “How do we make the right business context and capabilities available for this decision—safely, currently, and with evidence?”

That is a bigger question. It is also the one agents force us to confront.

*Part of [The Agentic Architect: Season 1](/posts/agentic-architect-season-one/). Next: [Building the Context Mesh.](/posts/building-the-context-mesh/)*
