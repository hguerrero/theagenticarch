---
title: 'Events Are APIs Too'
date: 2026-10-27
draft: false
description: 'Event streams are business products, not an ungoverned firehose. Treating them like APIs makes real-time context usable for people, applications, and agents.'
tags: ['agents', 'architecture', 'events', 'apis', 'governance', 'kafka']
---

APIs made business capabilities reusable. A well-designed API has an owner, a contract, documentation, access controls, a lifecycle, and consumers who can depend on it.

Events deserve the same treatment.

Too often, event streams are treated as an internal plumbing detail: a collection of topics, schemas, credentials, and conventions understood only by the team that created them. That works until the stream becomes valuable to more than one application—or to an agent that needs timely context.

At that point, an event is not just a message. It is a product.

## An event is a promise about change

An API request asks a system to do something or returns a current representation of something. An event says that something happened.

`OrderShipped` is a promise that a specific business fact occurred, with a defined meaning, producer, schema, and delivery expectation. Consumers may use it to update a customer experience, trigger a workflow, train an operational model, or invalidate context used by an agent.

That promise is only useful if people can trust it. A topic name alone is not enough. Consumers need to know who owns the event, whether it is complete, what each field means, how long it will be retained, how changes are introduced, and what access they have.

These are familiar API-product questions. They should be familiar event-product questions too.

## Why agents make the gap visible

An agent that works from a periodically indexed snapshot can give an answer that was correct when the index was built and wrong when the answer was delivered. For many tasks, that is acceptable. For a shipping disruption, fraud signal, price change, or production incident, it may not be.

Events give the system a way to react to change. They can tell an agent that its plan needs reevaluation, supply context when a workflow begins, or record a state transition after a tool action.

But real-time access without governance is not an architecture. Giving agents broad subscription rights to raw streams creates problems quickly: sensitive data leaks, schemas break consumers, costs grow unpredictably, and nobody can explain who used which information.

The answer is not to hide events from agents. It is to publish event products deliberately.

## What an event product needs

**Clear ownership.** A domain team owns the meaning and quality of the event, not only the infrastructure that transports it.

**A versioned contract.** The schema, semantic guarantees, compatibility policy, and examples must be available before consumers build on it. Breaking a widely used event is just as damaging as breaking a public API.

**Discoverability.** Consumers need a catalog that explains the business meaning, sensitivity, producer, delivery behavior, and supported use cases. An undocumented stream is not self-service.

**Purpose-based access.** Authentication alone is not sufficient. Consumers—including agents—should receive the minimum events and fields needed for their purpose, with policies applied consistently.

**Observability and lifecycle.** Teams need to see usage, lag, failures, and unusual consumption. They need a way to deprecate, migrate, and retire events without leaving invisible dependencies behind.

## Design for both pull and push

APIs and events are complements. An agent may pull a customer record to understand the current state, then subscribe to or receive a relevant event because the state changed. A task may call an API to initiate a workflow and emit events as it progresses.

Trying to force everything into synchronous calls loses timeliness. Trying to force everything into streams makes simple queries needlessly complex. The architectural skill is choosing the right interaction model, then applying consistent product discipline to both.

## Start with the events people already depend on

Find a stream with more than one consumer, meaningful business value, and recurring questions about access or schema changes. Give it an owner and a human-readable contract. Add it to a catalog. Define compatibility and deprecation rules. Apply identity-aware policy. Measure consumption.

Then consider how an agent should use it. Should the event enter a task as a trigger? Should it invalidate retrieved context? Should it be available only through a bounded, task-level capability? What action, if any, may follow automatically?

Those questions turn a firehose into a dependable part of an agentic system.

The future of integration will not be APIs *or* events. It will be an architecture where both are discoverable, governable products—and where agents can use each at the right moment.

*This concludes [The Agentic Architect: Season 1](/posts/agentic-architect-season-one/).* 
