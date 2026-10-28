---
title: 'What 20 Years of API Design Taught Me About Agents'
date: 2026-11-17
draft: false
description: 'We spent two decades making APIs easy for developers to discover and consume. Agents change the consumer, and the old lessons apply in a stricter form.'
tags: ['agents', 'apis', 'api-design', 'architecture', 'mcp']
pillars: ['API Foundation']
cover:
  image: '/images/what-20-years-of-api-design-taught-me-about-agents/cover.png'
  alt: 'What 20 Years of API Design Taught Me About Agents — a timeline from API design to agents with the consumer changing from developer to machine'
---

I started writing about API design in 2012. Back then the question was how to make an API good enough that a developer would pick it, learn it quickly, and keep using it.

Since then the question has barely changed, but the reader has. The consumer is no longer only a developer reading documentation at a desk. Increasingly it is an agent, working from whatever it can discover and understand at runtime.

I think that makes the old lessons more important, not less.

> We spent two decades optimizing APIs for developers discovering and consuming capabilities. Agents change the consumer, and now machines must discover, understand, select, and safely invoke those capabilities.

## The lessons, then and now

The *Building Great APIs* series I wrote with Steven Willmott at Red Hat, in 2012 and 2013, started from a simple checklist for what makes an API succeed: it provides real value, it has a plan and a business model, it is simple and flexible, it is well managed, and it is well supported. Four of those ideas carry straight across to agents. Each one gets stricter.

![Timeline from API design and API management through developer portals and event-driven APIs to MCP and agents, with the consumer shifting from developer to machine](/images/what-20-years-of-api-design-taught-me-about-agents/fig-1-same-problem-new-consumer.png)

### 1. Value: the API is a channel into the business

The first lesson was that the value of an API is the effect it produces, not the API itself. Our example was a pizza company: the API succeeds if it sells pizza, and it serves developers if it makes ordering and delivery easy. Three consequences followed. Raw metrics such as call counts can mislead, because a chatty API that completes no real transactions is not succeeding. The API has to support *complete use cases*: a catalog you can browse but not buy from is not valuable. And the benefit has to be clear from the start.

For agents this is sharper. A model choosing among tools has no patience for plumbing. A tool named `update_row` exposes your system. A tool named `reschedule_delivery` completes a task. Design the capability around the outcome the consumer wants, then implement it however you like, and judge it by completed tasks rather than by call counts.

### 2. Simplicity and flexibility: atomic operations and macros

Part II warned against *false simplicity*: an API whose individual methods are simple but which forces a client to make many calls to get anything useful done. Our advice was to expose atomic operations that can be combined to cover everything the system can sensibly do, then add a second layer of macro operations for the common workflows.

That is the shape of a good MCP server today. A server that exposes one tool per endpoint offers only the atomic layer and pushes workflow assembly onto the model. A server with task-shaped tools adds the macro layer. The principle is fourteen years old.

The same part introduced TTFHW, *time to first hello world*: how long it takes a new developer to get working code. We counted signup in it, because "email us for a key" is as much of a barrier as poor documentation. The agent version is **time to first safe action**. How quickly can an agent find the capability, understand it, call it correctly, and recover if it does not? An access process that needs a human to read an email is a barrier for an agent too, and often a worse one.

### 3. Management: someone has to run it

Part III argued that an API is a window into an organization's data and functions, so it creates dependencies and needs managing. We split management into technical operations, such as access control, rate limits, kill switches, and monitoring, and business operations, such as access rights and per-application analytics. Even APIs with no commercial purpose benefit from knowing who uses them, because analytics reveal design problems and abuse.

Agents raise the stakes. A developer integrates once and tests the result. An agent may call the same capability thousands of times, in sequences nobody anticipated, on behalf of different users. Identity, quotas, a kill switch, and usage visibility are not optional extras for that traffic. They are how you find out what the agent actually did.

### 4. Support: the description is the support

Part IV treated support as a hierarchy: get the developer to meaningful results quickly, let them solve most problems themselves with overview documentation, reference documentation, interactive sandboxes, and code samples, and have knowledgeable people ready when self-service fails. It also separated support during development from support at runtime, when something breaks after launch.

For an agent, there is no one to call. The description *is* the support. The name, the parameter descriptions, the examples, and the error messages are everything the model has. A sandbox becomes a test environment where a tool can be tried safely, and runtime support becomes observability: a trace that shows what the agent did and why. What an agent needs has to be stated: what the capability does, when to use it, when not to, what it requires, and what it may change.

![Four lessons from Building Great APIs (value, simplicity and flexibility, management, support), each paired with its agent-era equivalent](/images/what-20-years-of-api-design-taught-me-about-agents/fig-2-four-lessons.png)

## What actually changed

Three things differ when the consumer is an agent.

**Discovery moves to runtime.** A developer picks an API once, at design time. An agent may need to find a suitable capability in the middle of a task.

**Judgment moves into the loop.** A developer reads the docs and decides how to use the API. An agent makes that decision itself, every run, from the description it was given.

**Trust has to be built in.** When a developer makes a mistake, it appears in testing. When an agent makes one, it may appear in production, after the action has been taken. Authorization, limits, and audit have to be properties of the capability, not habits of the caller.

![Side-by-side flows showing a developer finding, reading, trying, and integrating an API once versus an agent discovering, understanding, selecting, and invoking safely on every run](/images/what-20-years-of-api-design-taught-me-about-agents/fig-3-consumer-shift.png)

## From a human-to-API economy to an AI-to-API economy

The API economy we built was designed for humans. Access sat behind half-documented guides, tutorials, sign-up forms, and layers of tribal knowledge. A person could muddle through. An agent cannot message the team or fill out a form to get its credentials, and that is the next bottleneck.

The race is not only about building smarter brains. It is about wiring the hands and nervous system that let those brains do real work. We are moving from a human-to-API economy to an AI-to-API economy, and standards like MCP are becoming the on-ramp. The open question is how fast we redesign our systems to let agents in safely.

## What did not change

Good APIs are still products. They still need owners, contracts, versioning, and a lifecycle. They still succeed when they are easy to find, easy to understand, and hard to misuse.

That is the encouraging part. Organizations that invested in API design, API management, and developer portals already hold much of what agents need: a catalog of capabilities, contracts that describe them, and infrastructure that governs them. The work now is making that foundation legible to a machine consumer.

I made this argument from another angle in [The Agentic AI Race Starts With APIs](/posts/the-agentic-ai-race-starts-with-apis/). The short version is that agentic systems will not be built on top of a blank page. They will be built on top of the APIs, events, and contracts we already have.

## What to do with this

If you own APIs, start by reading one the way an agent would. Strip away everything you know. Can you tell what it does, when to use it, what it needs, and what it changes? If not, the gap is a design problem, and it was a design problem for human developers too.

Then ask the questions the 2012 series asked, in their agent form. Is the capability valuable on its own terms? How fast can a new consumer use it safely? What infrastructure governs it? And is the description good enough to stand alone?

The consumer changed. The craft did not.

## Frequently asked questions

### Do the principles of good API design still apply to AI agents?

Yes, and in a stricter form. Value, simplicity, management, and support all still matter. But an agent has no one to ask, so clear naming, precise schemas, explicit descriptions, and enforced limits matter more than they did for human developers.

### What is time to first hello world, and what is the agent equivalent?

Time to first hello world (TTFHW) measures how long it takes a new developer to make a first successful API call. For agents, the equivalent is time to first safe action: how quickly an agent can find a capability, understand it, call it correctly, and recover from errors.

### How is an agent different from a human API consumer?

An agent discovers capabilities at runtime, makes the decision about how to use them each time it runs, and may act at a scale and speed no developer would. That means discovery, judgment, and trust controls must be built into the capability instead of left to the caller.

### Do we need new APIs for agents?

Usually not new ones from scratch. Most organizations should first make existing APIs legible to agents with better descriptions, clearer contracts, and consistent governance, and then add task-shaped capabilities where raw endpoints are too low level.

*Related: [The Agentic AI Race Starts With APIs](/posts/the-agentic-ai-race-starts-with-apis/)*
