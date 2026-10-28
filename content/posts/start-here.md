---
title: 'Start Here: Six Essays on the Architecture Beneath AI Agents'
date: 2026-11-03
draft: false
description: 'A reading guide to The Agentic Architect: six essays on the APIs, events, context, memory, and control beneath useful, trustworthy AI agents, in the order that makes the argument easiest to follow.'
tags: ['agents', 'architecture', 'context', 'apis', 'events']
aliases:
  - /posts/agentic-architect-season-one/
cover:
  image: '/images/start-here/cover.png'
  alt: 'The Agentic Architect: Start Here — six numbered essays orbiting a central agent'
---

Everyone is talking about agents. This site is about the architecture underneath them.

If you are new here, start with these six essays. They explore the infrastructure that connects agents to the real world: APIs, events, context, memory, tools, and other agents. They are not about finding the perfect model. It was about building systems that can make a capable model useful and safe to trust.

They start from a simple observation: intelligence is only one part of an agentic system. An agent also needs timely information, well-designed capabilities, clear authority, a reliable record of what happened, and controls that continue to work when the path through a task is not known in advance.

![Intelligence is only one part of the system: the model also needs timely information, well-designed capabilities, clear authority, a reliable record, and controls that work off the known path](/images/start-here/fig-1-more-than-a-model.png)

## The reading order

1. **September 22 — [Your Agents Don’t Need Better Models. They Need Better Plumbing.](/posts/agents-need-better-plumbing/)**  
   The integration layer, not the model, is often where agentic systems break.
2. **September 29 — [iPaaS Was Built for Applications. Agents Need a Context Layer.](/posts/agents-need-a-context-layer/)**  
   Why deterministic integration patterns are necessary but insufficient for autonomous systems.
3. **October 6 — [Building the Context Layer.](/posts/building-the-context-layer/)**  
   The practical layers that make context available, governed, and current.
4. **October 13 — [Agents Don’t Really Talk. They Exchange Context.](/posts/agents-exchange-context/)**  
   What multi-agent workflows actually share, and why the handoff is the architecture.
5. **October 20 — [Your AI Agent Needs a History, Not Just a Memory.](/posts/agents-need-history-not-just-memory/)**  
   Why a durable history matters when agents decide and act.
6. **October 27 — [Events Are APIs Too.](/posts/events-are-apis-too/)**  
   How to treat real-time data as a discoverable, dependable product.

Each essay stands on its own. Read in order, they make the case for a different starting point for enterprise AI: begin with the capabilities, context, and controls that allow intelligence to participate responsibly in the business.

The sequence begins with the plumbing and ends with events as dependable products. You can read the essays independently, but the order is deliberate: capabilities need context; context needs reliable handoffs and history; and real-time events keep all of it connected to a changing world.

![Diagram showing how the six essays connect: better plumbing leads to a context layer, to building the layer, to exchanging context, to history not memory, to events are APIs too](/images/start-here/fig-2-how-the-essays-connect.png)

Two earlier essays set up the premise: [From Pong to Minecraft: How GenAI Is Redefining the User Experience](/posts/from-pong-to-minecraft-genai-ux/) frames the shift from predefined workflows to intent-driven experiences, and [The Agentic AI Race Starts With APIs](/posts/the-agentic-ai-race-starts-with-apis/) makes the case for API infrastructure as the foundation agents build on.

## Where to go next

The essays after these six are organized by topic rather than by sequence. Each topic page lists everything published under it:

- **[API Foundation](/pillars/api-foundation/):** the contracts and capabilities agents inherit.
- **[Agentic Infrastructure](/pillars/agentic-infrastructure/):** gateways, registries, MCP servers, and the controls around them.
- **[Context Economy](/pillars/context-economy/):** how context is assembled, moved, and governed.
- **[Agentic Reliability](/pillars/agentic-reliability/):** state, history, and evidence that make agent behavior dependable.
- **[Event-Driven Agents](/pillars/event-driven-agents/):** real-time context and events as products.

## Frequently asked questions

### What are these six essays about?

The architecture beneath useful, trustworthy AI agents: why agents fail at the integration layer rather than the model, why they need a governed context layer instead of predetermined integration flows, how multi-agent handoffs and durable history work, and why event streams need the same product discipline as APIs.

### Do I need to read the essays in order?

No. Each essay stands on its own, but the sequence is deliberate: better plumbing motivates a context layer, the context layer needs reliable handoffs and history, and events keep all of it connected to a changing world. Reading in order makes the throughline easiest to follow.

### What's the throughline connecting all six essays?

Intelligence is only one part of an agentic system. An agent also needs discoverable capabilities, current and governed context, clear authority, a reliable record of what happened, and controls that keep working when the path through a task isn't known in advance.

### Where do I go after the six essays?

Browse by topic. The five topic pages (API Foundation, Agentic Infrastructure, Context Economy, Agentic Reliability, and Event-Driven Agents) each collect the essays published under them, so the list stays current as new posts go up.
