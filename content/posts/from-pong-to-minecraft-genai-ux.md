---
title: 'From Pong to Minecraft: How GenAI Is Redefining the User Experience'
date: 2026-08-20
draft: false
description: 'Generative AI shifts enterprise software from predefined workflows to intent-driven experiences—and makes architecture the foundation of UX.'
tags: ['agents', 'architecture', 'generative-ai', 'user-experience', 'apis']
---

For decades, enterprise software has worked roughly the same way.

You find the application. You find the right screen. You follow the workflow. You fill in the fields. You click the button.

The software tells you what you can do, and you adapt yourself to it.

For a long time, that was enough.

But we are entering a very different era.

If enterprise software was **Pong**, and modern applications evolved into something closer to **Mario Bros**, then generative AI is taking us into the **Minecraft generation**.

And that changes much more than the user interface.

## From Pong to Mario

Think about Pong.

There are two paddles, a ball, and a very small number of things you can do. The rules are fixed. The experience is completely predictable.

That is not too far removed from the earliest generations of enterprise software.

Applications were built around clearly defined transactions:

> Create a customer.  
> Submit an order.  
> Approve an expense.  
> Generate a report.

The user had to understand the system's model of the world and navigate through it.

Then came the **Mario Bros generation**.

Software became dramatically more capable. There were more screens, more options, richer interfaces, workflows, integrations, and increasingly sophisticated business logic.

But the fundamental contract remained the same:

**The software defines the journey. The user follows it.**

You might have more paths through the application, but those paths were still designed in advance.

If the business process changed, someone had to change the workflow.

If the user wanted something that wasn't supported, someone had to build a new feature.

If two systems needed to work together, someone had to integrate them.

The workflow diagram was still the boundary of what was possible.

## Welcome to Minecraft

Minecraft changed the relationship between the player and the software.

There is no single prescribed way to play the game.

You can build a house. You can build a city. You can explore. You can automate. You can create something nobody anticipated when the game was designed.

The system provides the primitives, capabilities, and environment.

**You decide what to build.**

That is the shift GenAI is bringing to software.

Instead of navigating a predefined workflow, users can express an **intent**.

> “Find the customers affected by this issue, identify which contracts are at risk, and prepare a summary for the account team.”

That request may require information from a CRM, a contract system, an incident platform, analytics, and perhaps several internal APIs.

The user doesn't necessarily need to know which applications are involved. They don't need to understand the workflow. They don't even need to know which API to call.

They describe the outcome they want.

The system figures out how to get there.

That's a fundamentally different user experience.

## The interface is no longer the application

This is where the conversation about AI often becomes too focused on chat.

A chat window is not the transformation.

The transformation is the ability to move from:

**“Tell me which button to press.”**

to:

**“Tell the system what you're trying to accomplish.”**

And that distinction matters.

A conversational interface is simply one way of expressing intent. The same model could power a voice interface, an autonomous agent, an embedded copilot, an application workflow, or something we haven't invented yet.

The important thing is what sits behind the interface.

The system needs to understand intent, discover capabilities, access the right context, interact with enterprise systems, make decisions, and potentially coordinate multiple steps.

That means the user experience is no longer just a UX problem.

**It becomes an architecture problem.**

## Agents are only as capable as the systems behind them

This is where APIs become incredibly important.

We often talk about agents as if intelligence alone will make them useful.

It won't.

An intelligent agent with poor access to enterprise capabilities is still a limited agent.

If the APIs behind your organization are inconsistent, poorly documented, difficult to discover, overly coupled to user interfaces, or impossible to govern, adding an LLM on top doesn't magically fix the problem.

It just gives you a very intelligent way to discover those problems.

The organizations that are prepared for the agentic era will have something much more valuable than a collection of models.

They will have a **machine-accessible foundation for their business**.

APIs become the building blocks. Events become signals. MCP and other emerging protocols become ways for agents to discover and interact with capabilities. Identity and authorization determine what an agent is allowed to do. Governance determines what it should be allowed to do. And context connects all of those capabilities to the user's intent.

The architecture underneath the experience suddenly matters as much as the experience itself.

## From workflows to capabilities

This also changes how we should think about integration.

Traditional integration asks:

> “How do we connect System A to System B?”

Agentic integration asks a different question:

> “What capabilities should an agent be able to discover and use?”

That's a much more interesting problem.

Instead of designing every possible journey in advance, we expose reusable capabilities that can be composed dynamically.

An API might represent a capability. An MCP tool might expose that capability to an agent. An event might tell the agent that something changed. A policy might determine whether the agent can act. A data source might provide the context required to make a decision.

Together, these become the primitives from which new experiences can be constructed—just like Minecraft gives players blocks.

## But Minecraft without rules becomes chaos

There is an important catch.

Giving users more freedom does not mean removing governance.

Quite the opposite.

When software moves from predefined workflows to dynamic, intent-driven experiences, governance becomes more important.

In a traditional application, you can often predict the path a user will take.

In an agentic system, you may not know exactly which tools will be used, what data will be accessed, or which sequence of actions will be executed.

That introduces a new set of questions:

- Which agents can access which capabilities?
- Which data can they see?
- What actions can they perform?
- How do we authenticate and authorize them?
- How do we protect sensitive information?
- How do we control the cost of model and tool usage?
- How do we observe what an agent actually did?
- How do we prevent an agent from taking an unintended path?
- How do we make these decisions consistently across hundreds or thousands of capabilities?

The answer cannot be “just add another prompt.”

We need infrastructure that treats agents as first-class participants in the enterprise.

## Your API strategy just became your AI strategy

This is why I believe the AI conversation needs to move beyond models.

Models will continue to get better, cheaper, faster, and more capable.

But the competitive advantage for many organizations won't come from having access to the same model as everyone else.

It will come from what that model can actually **do**.

And what it can do depends on the systems around it.

Can the agent discover the capability?

Can it access the right context?

Can it authenticate?

Can it invoke the API?

Can it subscribe to an event?

Can it execute asynchronously?

Can the organization observe and govern the interaction?

Can the business trust the result?

Those are architecture questions.

And many of them are questions the API and cloud-native communities have already been solving for years.

That's why the path to agentic AI shouldn't start with throwing away everything that came before.

It should start by asking whether your existing digital foundation is ready to become **agent-accessible**.

## The next UX isn't a better workflow

The biggest change GenAI brings to enterprise software isn't that we can have conversations with applications.

It's that we can start escaping the assumption that every experience needs to be designed in advance.

The old model was:

**Application → Workflow → User**

The emerging model looks more like:

**User Intent → Agent → Capabilities → Systems**

The workflow becomes dynamic. The interface becomes fluid. The application becomes less of a destination and more of an environment of capabilities.

And the user moves from being someone who follows a process to someone who describes an outcome.

That's the Minecraft moment.

The question is no longer:

**“Which workflow should we build?”**

It's:

**“Which capabilities should we expose, and how much freedom should we give intelligent systems to compose them?”**

That is a much bigger architectural question.

And it is one we'll be exploring here.

Welcome to **The Agentic Architect**.
