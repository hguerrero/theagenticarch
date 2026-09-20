---
title: 'The Agentic AI Race Starts With APIs'
date: 2026-09-20
draft: false
description: 'API infrastructure offers a strong foundation for agentic AI—but only vendors that treat agents as first-class architectural concerns will lead the transition.'
tags: ['agents', 'architecture', 'apis', 'mcp', 'cloud-native', 'governance']
---

There is a strange debate happening in the infrastructure world right now.

As enterprises begin moving from AI experiments to production agentic systems, everyone wants to own the layer between agents, models, tools, data, and applications.

Data platforms want to own it. Cloud providers want to own it. AI infrastructure vendors want to own it. And, increasingly, API infrastructure vendors are showing up with a surprisingly strong claim:

**We have already been here.**

Not with agents. Not with MCP. Not with LLMs.

But with the infrastructure problems that make distributed software work: authentication, authorization, traffic management, rate limiting, identity, observability, policy, multi-tenancy, reliability, discovery, governance, and connectivity.

For decades, API infrastructure has been solving these problems for software that communicates with other software.

Agentic AI changes what is communicating, what it knows, what it can do, and how it behaves. It does not eliminate those problems. It makes them more important.

That is why the strongest foundation for enterprise agentic AI will come from infrastructure that understands APIs **and** understands what makes agents fundamentally different from APIs.

And that distinction matters.

## Agentic AI is not just another API workload

The easiest mistake to make is to look at an agent and see another application making HTTP requests.

After all, an agent calls an API. It authenticates, sends a request, and receives a response. Why not simply put an API gateway in front of it?

Because the important unit of interaction is changing.

An API call is generally explicit. A developer decides which endpoint to call, which parameters to provide, and what the response means.

An agent operates differently. It decides which tool to use. It may call several tools—or decide not to call one. It may interpret a result and make another decision, delegate work to another agent, and interact with an LLM multiple times during the process.

It may do all of this with a level of autonomy that was never part of the traditional API interaction model.

MCP makes this shift particularly visible. Tools are not simply endpoints anymore. They become capabilities exposed to a model, which can discover those capabilities and decide when to invoke them.

The question is no longer simply:

> Can this client call this API?

It becomes:

> Should this agent, with this identity and context, be allowed to discover and invoke this capability with these parameters at this point in its execution?

That is a very different question.

## This is why APIs still matter

The arrival of MCP does not make APIs obsolete. Quite the opposite: enterprise agents need APIs more than ever.

Most systems an agent needs to interact with already exist: payments, orders, customers, inventory, identity, shipping, CRM, ERP, databases, internal services, partner platforms, and event streams.

Those systems are not going to be rewritten as agent-native systems overnight. And they should not be.

We spent decades turning business capabilities into reusable APIs. The agentic era should not throw that investment away. It should make those capabilities consumable by agents.

This is where the API foundation becomes incredibly valuable. An organization with a mature API platform already has many of the primitives required to build the connectivity layer for agents. It understands how to expose capabilities, establish identity and authorization, apply policies, observe traffic, set rate limits and quotas, and operate connectivity across Kubernetes, cloud, hybrid, and on-premises environments.

Cloud-native infrastructure has spent years making these concerns boring. And boring infrastructure is exactly what you want underneath autonomous systems.

## The data platform argument is different

There is another natural place to build agent infrastructure: the data layer.

It makes intuitive sense. Agents need context. Data provides context. Therefore, the data platform should become the agent platform.

There is truth in this. But it misses an important distinction:

**Context is not connectivity.**

Knowing where data lives is not the same thing as governing how an autonomous system interacts with everything around it.

An agent does not just need to retrieve a customer record. It may need to:

1. Discover a customer capability.
2. Authenticate.
3. Determine whether it is authorized.
4. Retrieve context.
5. Call a business API.
6. Trigger an asynchronous workflow.
7. Wait for a result.
8. Call another service.
9. Delegate part of the task to another agent.
10. Record what happened.
11. Remain within a budget.
12. Produce an auditable decision trail.

That is a connectivity problem as much as it is a data problem.

The data industry has enormous expertise in storing, processing, indexing, and retrieving information. The API industry has enormous expertise in making distributed systems communicate safely. Agentic systems need both.

## But API vendors have a problem too

Having solved yesterday's problems does not automatically qualify anyone to solve tomorrow's.

There is a dangerous temptation among established API vendors: take the existing gateway, add an LLM plugin, add token counting, add an MCP proxy, add an agent object, and call it an AI gateway.

That is not enough.

It is the equivalent of taking a microservices architecture, putting “cloud native” on the slide, and calling it a cloud-native platform. The technology may technically work. The architecture can still be wrong.

The difference between an API gateway and an agentic gateway is not simply the protocols passing through the proxy. It is the **mental model**.

An API platform thinks in terms of services, consumers, routes, and requests. An agentic platform needs to understand models, agents, tools, context, capabilities, tasks, decisions, sessions, delegation, and autonomous behavior.

Those concepts have relationships that do not map cleanly onto traditional API abstractions. The infrastructure has to evolve—not necessarily by throwing everything away, but by being willing to rethink the core architecture.

## The winners will understand both worlds

The most interesting companies in this space will sit somewhere between API infrastructure and AI infrastructure.

The API heritage provides the foundation. The AI-native architecture provides the evolution. You need both.

An agentic gateway should understand an existing REST API. But it should also understand why exposing every API operation as an individual tool might be a terrible idea.

It should understand OAuth, but also agent identity and delegated authorization. It should understand rate limiting, but also token budgets, inference costs, and autonomous consumption. It should understand HTTP, but also MCP, A2A, and the protocols that will inevitably follow them.

It should understand observability, but also tool calls, reasoning boundaries, agent-to-agent interactions, and the lifecycle of an autonomous task. It should understand Kubernetes, but also understand that an agent is not simply another microservice.

That combination is the opportunity.

## The cloud-native connection is not accidental

There is another reason to be bullish on API infrastructure as a foundation for agentic AI: the agentic world is rapidly becoming cloud native.

Agents need identity, isolation, policies, autoscaling, observability, secure communication, deployment automation, resilience, multi-tenancy, and lifecycle management.

None of these concepts were invented for AI. That is good news.

We do not need to build a completely parallel infrastructure universe just because software happens to use a model. The better approach is to extend cloud-native primitives into an AI-native architecture.

The opportunity is not to replace cloud native. It is to make cloud native **agent native**.

## The uncomfortable lesson for the API industry

The API industry should have moved faster.

The signals were there. AI was increasingly API-driven. LLMs were becoming infrastructure. Agents were beginning to interact with APIs. MCP made tool connectivity a first-class architectural concern. A2A made agent-to-agent communication another part of the connectivity problem.

Yet many established API vendors initially treated AI as another feature set to bolt onto the existing gateway. That approach made sense commercially. It made less sense architecturally.

The industry spent years building increasingly sophisticated API platforms, but when the interaction model changed, many of us tried to preserve the old abstractions for too long.

Newer players could start from a cleaner architecture. They could build an AI-native data plane, embrace cloud-native technologies from the beginning, participate in emerging standards and open foundations, and ask a different question:

> What should a connectivity platform look like if agents are first-class consumers of infrastructure?

That is a much more interesting question than:

> How do we add AI to our gateway?

## Open foundations matter more than ever

Agentic infrastructure is too important to become a collection of proprietary abstractions.

MCP and A2A are examples of an emerging standards layer. Infrastructure vendors should contribute to that ecosystem, not simply wrap standards in proprietary APIs and call it innovation.

The most valuable infrastructure in the cloud-native era was rarely valuable because one company controlled the protocol. It was valuable because an ecosystem formed around it.

Agentic infrastructure will follow the same pattern. The companies that understand this will build platforms that can evolve with the ecosystem. The companies that do not will build increasingly elaborate islands.

## The real API advantage

So, are API infrastructure vendors better positioned for agentic AI than data infrastructure vendors?

Potentially, yes. But not because they own APIs, and certainly not because an API gateway can magically become an agent gateway.

Their advantage is that they already understand something fundamental:

**Enterprise AI eventually has to touch the enterprise.**

And touching the enterprise means connectivity.

Models need tools. Agents need APIs. Agents need other agents. Applications need models. Models need context. Workflows need events.

Every one of those interactions creates an infrastructure problem: authentication, authorization, routing, policy, observability, security, reliability, and governance.

Those are problems the API and cloud-native worlds have been solving for years. But the advantage disappears if API vendors refuse to rethink the architecture.

## APIs are not the destination

The future is not about making agents consume APIs exactly the way humans and applications consume them today. The future is about making enterprise capabilities **agentically consumable**.

APIs will remain part of that foundation. MCP will be part of it. A2A will be part of it. Events, models, and context will be part of it. New protocols will almost certainly appear that we have not even named yet.

The platform needs to absorb that evolution without forcing every new interaction model into yesterday's abstractions. That is what separates an AI-native architecture from an API platform with AI features.

## The real test

There is a simple test for every vendor claiming to have an agentic platform:

**Remove the word “AI” from the marketing material and look at the architecture.**

Are agents actually first-class? Are tools first-class? Is context first-class? Is agent identity first-class? Can the platform reason about autonomous interactions rather than just HTTP requests? Can it govern the relationship between an agent and the capabilities it can invoke? Can it operate across cloud-native infrastructure? Does it participate in open standards? Does it contribute to the foundations it depends on?

If the answer is yes, there is something real there.

If the answer is no, you probably have an API gateway wearing an AI costume.

And that distinction is going to matter.

The agentic era will not be won by the company that adds the most AI features to an existing platform. It will be won by the companies that understand **what changed, what did not, and where the old foundations need to evolve.**

The API industry already knows a lot about connectivity.

Now it needs to learn how to connect **agents**.

And that is a very different problem.
