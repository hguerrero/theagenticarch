---
title: 'Your Agents Don’t Need Better Models. They Need Better Plumbing.'
date: 2026-09-22
draft: false
description: 'Agentic systems usually fail at the integration layer: context, capabilities, identity, and controls—not at the model.'
tags: ['agents', 'architecture', 'apis', 'governance', 'context']
---

There is a familiar pattern in enterprise AI projects.

The team starts with a model. When the prototype disappoints, they change the prompt. Then they add retrieval. Then they try a larger model, a longer context window, or a new framework.

Eventually someone asks the question that should have come first: **why does the agent still fail when it leaves the demo?**

Often, the model is not the answer.

The plumbing is.

## We improved intelligence faster than integration

Most enterprise infrastructure was built for deterministic software. An application knows which API to call. A workflow follows a route defined in advance. A batch job runs on a schedule.

An agent behaves differently. It interprets an objective, decides which capability may help, retrieves information, takes an action, evaluates the result, and may change course. The sequence is partly discovered during execution.

That difference exposes weaknesses that ordinary applications can sometimes hide:

- information is stale, incomplete, or hard to find;
- business capabilities are buried in inconsistent APIs and screens;
- identity and authorization do not travel with the task;
- events arrive too late or cannot be governed consistently;
- no one can reconstruct what the system saw, decided, or changed.

Putting a better model on top of those conditions gives the organization a more articulate way to encounter them. It does not remove them.

## An agent needs a working environment

Useful agents require more than a context window. They need an environment with a few dependable properties.

**Discoverable capabilities.** An agent should work with a curated set of business actions—not a raw inventory of endpoints. “Resolve a customer’s shipping exception” is a meaningful capability. A collection of poorly named CRUD operations is not.

**Grounded, current context.** Context comes from systems of record, documents, events, and prior task state. It has to be relevant, timely, and scoped to the task. More context is not automatically better; untrusted or obsolete context is actively harmful.

**Identity and authority.** Every action must answer who is acting, on whose behalf, what it may access, and what it may change. This cannot live only in an instruction to the model.

**Controls at the point of action.** Policies for data access, rate limits, budgets, approvals, and sensitive operations must be enforced by systems that can actually stop an action.

**Operational evidence.** Teams need a trace across model calls, tool calls, decisions, events, and writes. A final answer is not an audit trail.

These are integration and platform concerns. They are the connective tissue between an agent and the enterprise.

## The difference between a demo and a system

A demo can succeed with a single, well-prepared context and a narrow tool path. Production has to handle revoked access, partial failures, concurrent changes, slow dependencies, unexpected inputs, and a user who asks for something adjacent to the happy path.

That is why the important design question is not simply, “Which model should we use?” It is:

> What can this agent reliably know and safely do at this moment?

The answer depends on the architecture around the model. A model may be excellent at interpreting intent, but it cannot infer a company’s authorization policy or compensate for an undocumented API. It cannot tell whether an inventory record changed five seconds ago unless the system delivers that change. And it should not be expected to remember a transaction history that the platform failed to preserve.

## Start with one capability, end to end

The most productive way to improve the plumbing is not a grand platform rewrite. Choose one bounded, valuable workflow and make its full path trustworthy.

For that workflow, define the agent’s purpose and the outcome it may own. Curate the tools it can discover. Connect authoritative sources of context. Give it a scoped identity. Place approvals around consequential actions. Capture its inputs, tool calls, state changes, and outputs. Then test the uncomfortable cases: stale data, denied access, a duplicate request, a failed downstream call.

This creates a reusable pattern instead of another isolated pilot.

## Better models will still matter

None of this is an argument against model progress. Better reasoning, lower latency, and lower cost expand what agents can do. But those benefits compound only when the surrounding system is ready to use them.

The lasting advantage will not come from access to the same model as everyone else. It will come from making the organization’s real capabilities discoverable, its context dependable, and its actions governable.

That is the plumbing.

And it is where agentic architecture begins.

*This is the first essay in [The Agentic Architect: Season 1](/posts/agentic-architect-season-one/). Next: [iPaaS Was Built for Applications. Agents Need a Context Mesh.](/posts/agents-need-a-context-mesh/)*
