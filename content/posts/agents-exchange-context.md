---
title: 'Agents Don’t Really Talk. They Exchange Context.'
date: 2026-10-13
draft: false
description: 'Multi-agent systems are context-distribution systems. Reliable handoffs need contracts, ownership, and evidence—not conversational improvisation.'
tags: ['agents', 'architecture', 'context', 'multi-agent', 'governance']
cover:
  image: '/images/agents-exchange-context/cover.png'
  alt: 'Agents Don’t Really Talk. They Exchange Context — two agents connected by a handoff, not a chat bubble'
---

Multi-agent demos make it look as though agents are having a conversation: one delegate asks another for research, a specialist returns an answer, and an orchestrator turns it into action.

That image is useful, but incomplete.

Agents do not collaborate because they can exchange prose. They collaborate because one part of a system can make the right context available to another part at the right time. The architecture of that handoff determines whether a multi-agent workflow is reliable or merely entertaining.

## Every handoff changes the system

When one agent delegates to another, something is being passed: a task objective, a set of facts, a reference to records, an authorization scope, a proposed action, or an updated state. The receiving agent uses that material to make its next decision.

This creates two fundamental operations:

- **retrieval**: obtaining context needed to reason or act;
- **mutation**: changing state that another agent, person, or system will later depend on.

The first operation needs relevance, freshness, and provenance. The second needs authority, validation, idempotency, and an audit trail. Treating both as “messages between agents” hides the questions that actually matter.

![Diagram of the two handoff operations: retrieval needs relevance, freshness, and provenance; mutation needs authority, validation, idempotency, and an audit trail](/images/agents-exchange-context/fig-1-retrieval-vs-mutation.png)

## Pass references, not a pile of prompt text

Copying large, raw payloads from one context window into another is tempting. It is also fragile. The payload may be stale, incomplete, sensitive, or too large. It loses the connection to the system that owns the fact and makes revocation difficult.

Where possible, a handoff should contain structured task state and references to authoritative context. The receiving agent can retrieve the specific information it is allowed to use, with the applicable identity and policy. This keeps the source of truth in control and creates a record of what was actually read.

There are exceptions: a concise, structured summary can be a valuable artifact when it records what an agent learned or decided. But it should be treated as a versioned output with an owner and a purpose—not as an invisible fragment of a conversation.

![Diagram contrasting copying a raw payload between agents with passing a reference to task state and a source of truth](/images/agents-exchange-context/fig-2-references.png)

## Define the handoff contract

A good handoff is closer to an API contract than a chat message. At minimum, define:

- the task identifier and objective;
- the expected output and completion condition;
- the context references and their freshness requirements;
- the identity, delegated authority, and data scope;
- the permitted actions and approval boundary;
- the correlation and trace identifiers;
- the failure and escalation behavior.

This may sound formal, but it is what lets a workflow scale beyond a single demonstration. Without these contracts, each new agent becomes another place where assumptions accumulate.

![Diagram of a handoff contract with task, output, context, authority, actions, trace, and failure fields defined between agent A and agent B](/images/agents-exchange-context/fig-3-handoff-contract.png)

## Keep responsibility clear

Adding agents does not automatically divide work well. A workflow with three agents all able to update the same customer record is not a team; it is a concurrency problem.

Give each agent a narrow responsibility. A research agent can gather evidence. A policy agent can evaluate eligibility. An execution agent can perform an approved change. An orchestrator can coordinate, but should not become an unbounded superuser.

This separation improves security and makes evaluation meaningful. You can ask whether the policy decision was correct without confusing it with whether a downstream API was available.

## The most important conversation is with the platform

The reliability of a multi-agent system depends less on natural-language dialogue than on its relationship with the surrounding platform. Can it retrieve current context? Can it make a change exactly once? Can it detect that a decision is now invalid? Can it prove which identity authorized an action? Can a human intervene?

Those are context and control questions. Solve them well, and additional agents can create useful specialization. Ignore them, and every added agent multiplies uncertainty.

The right mental model is simple: multi-agent systems are **context distribution systems with decision-makers attached**. Design the distribution carefully.

## Frequently asked questions

### Do agents actually communicate through natural language?

Not in any way that matters architecturally. What looks like conversation between agents is really a handoff of task state, facts, references, and authority. The reliability of a multi-agent workflow depends on how well that handoff is structured, not on how fluent the exchanged text sounds.

### Should agents pass full context or references between each other?

Prefer references to authoritative context over copying raw payloads. A large pasted context can be stale, incomplete, sensitive, or oversized, and it severs the connection to the system that owns the fact. A receiving agent should retrieve what it's authorized to use, under its own identity and policy, which also creates a record of what was actually read.

### What should a handoff contract between agents define?

At minimum: the task identifier and objective, the expected output and completion condition, context references and freshness requirements, identity and delegated authority, permitted actions and approval boundaries, correlation and trace identifiers, and failure or escalation behavior. Treat it like an API contract, not a chat message.

*Next: [Your AI Agent Needs a History, Not Just a Memory.](/posts/agents-need-history-not-just-memory/)*
