---
title: 'A Simple Agent Request Is Actually a Distributed System'
date: 2026-11-10
draft: false
description: 'Ask an agent for the weather and ten messages cross five components. Agentic AI is not only an AI problem. It is a distributed-systems problem, and it needs distributed-systems discipline.'
tags: ['agents', 'mcp', 'architecture', 'distributed-systems', 'observability']
pillars: ['Context Economy']
cover:
  image: '/images/agent-request-is-a-distributed-system/cover.png'
  alt: 'A Simple Agent Request Is a Distributed System — an agent at the center of a web of user, model, MCP server, API, and identity'
---

Ask an agent, "What's the weather in Boston?" and it feels like one step. You typed a question. You got an answer.

Underneath, that one question is a small distributed system. Several components, owned by different parties, exchange messages over networks that can be slow, wrong, or down. Each hop carries context, identity, and risk. None of this is exotic. It is the same class of problem architects have handled for decades. The difference is that most agent demos hide it.

> **Agentic AI is not only an AI problem. It is a distributed-systems problem.**

## Follow one request

Take the simplest useful case: an agent with one tool that fetches a forecast through an MCP server.

1. The user asks the question.
2. The agent host builds a prompt and sends it to the model, along with the list of tools the model may call.
3. The model replies with a structured tool call.
4. The host's MCP client forwards that call to the MCP server, with a credential.
5. The MCP server calls the upstream weather API.
6. The API returns a forecast.
7. The server returns the result to the client.
8. The host adds the result to the context and calls the model again.
9. The model writes an answer.
10. The host replies to the user.

Ten messages, five components, and at least three network boundaries. That is the *easy* case: one tool, one server, one user, no failures.

![Sequence diagram of one weather question crossing the user, agent host, model, MCP server, and weather API in ten numbered messages](/images/agent-request-is-a-distributed-system/fig-1-ten-messages.png)

## Four things travel along the path

Once you see the path, four questions follow. They are the same four questions a distributed-systems architect would ask about any call chain.

**Where does context move?** The prompt, the tool list, the tool result, and the final answer each cross a boundary. The model only knows what the host puts in front of it. If a tool returns too much, too little, or something stale, the model reasons from that.

**Where does identity move?** At step 4 a credential is attached. Whose is it? The user's, the agent's, or a shared service account? By step 5 the server calls an upstream API, and it may use a different identity again. If the weather is harmless, this does not matter. If the tool is "refund this order," it matters a great deal.

**Where is policy enforced?** A policy that lives only in the prompt, such as "never refund more than $100," is a request, not a control. Enforcement has to happen at a point the model cannot talk its way past: the gateway, the server, or the API.

**Where does it fail?** Every arrow can time out, return an error, return a partial result, or return a well-formed wrong answer. The model may call the wrong tool, or call the right one with the wrong arguments. The host may retry a call that was not safe to retry.

![Grid showing context, identity, policy, and failure at each segment of the agent request path](/images/agent-request-is-a-distributed-system/fig-2-four-things-that-travel.png)

## Why MCP makes this more visible

MCP did not create this complexity. Before it, each integration hid the same path inside custom glue code: one app, one model, one hard-coded API call.

What MCP does is standardize the boundary between the host and the capability. That is valuable, and it makes the path legible. You can see the client, the server, the tool list, and the call. It also means those pieces now multiply, because adding a tool is cheap. Cheap to add means easy to overdo.

## What changes with fifty tools

With one tool, the model picks from a list that fits in the prompt. With fifty, the shape of the problem changes.

- **Selection gets harder.** Tool descriptions compete for the model's attention. Similar names and overlapping descriptions lead to wrong choices.
- **Context gets heavier.** Every tool definition is text the model must read on every turn.
- **Ownership gets fuzzy.** Someone has to know who owns each server, which version is live, and who gets paged when it breaks.
- **Failures and latency compound.** If each hop is individually reliable, a chain of many still fails more often than any one link. And every hop adds time before the agent can decide, so a slow dependency stalls the whole loop.
- **Agents start choosing for each other.** Once several agents share the same tools, one model's tool decision can trigger another agent's, and no person reviews the choices between hops. The path is no longer one you drew in advance.

## What changes with five thousand

At that scale you cannot put the list in the prompt. Tool selection becomes a retrieval and routing problem: the agent needs to *discover* a short list of relevant capabilities at runtime. That is a registry and discovery problem, which we will take up later in this series. Policy can no longer be written per agent, because there are too many agents and too many tools. It has to be enforced centrally, by identity and purpose. And observability stops being optional, because the only way to explain what happened is a trace that follows the request across every hop.

![Three columns comparing a handful of tools, fifty tools, and thousands of tools by selection, context, ownership, and control](/images/agent-request-is-a-distributed-system/fig-3-fifty-to-five-thousand.png)

## Treat it like a distributed system

The practical response is not a new discipline. It is an old one applied on purpose.

- **Trace every request end to end.** Carry one correlation ID from the user's question through the model call, the tool call, and the upstream API. If you cannot answer "what did this agent do, and why," you cannot operate it.
- **Carry identity explicitly.** Decide who the caller is at each hop, and pass that identity on rather than substituting a shared credential.
- **Enforce policy outside the model.** Put hard limits where they cannot be argued with.
- **Design for partial failure.** Set timeouts, make tool calls idempotent where you can, and decide what the agent does when a tool is down.
- **Count your boundaries.** Every new server, tool, or agent is another hop. Add them deliberately.

Skip these and the "simple" flow becomes a blind spot at scale. The problem is not making it work. It is understanding, controlling, and trusting what happens between the hops, and that has to be part of the foundation from day one.

None of this makes the system less capable. It makes the capability something you can trust.

## Frequently asked questions

### Why is an AI agent request a distributed system?

Because even a single question involves several independently owned components, such as the host application, the model, an MCP server, and an upstream API, exchanging messages over networks. Each hop can be slow, fail, or return wrong data, and each carries context and identity. Those are the defining properties of a distributed system.

### How many steps does a simple MCP request involve?

The weather example in this essay has ten messages across five components: the user, the agent host with its MCP client, the model, an MCP server, and an upstream API. Real systems with several tools, servers, or agents involve many more.

### Where should policy be enforced in an agent system?

Outside the model. A rule in a prompt is a request the model may ignore. Hard limits belong at a gateway, in the MCP server, or in the underlying API, where they can be enforced on identity and purpose no matter what the model decides.

### Does MCP make agent systems more complex?

MCP standardizes the boundary between an agent host and its capabilities, which makes the request path clearer. It also makes adding tools cheap, so the number of servers and hops can grow quickly. The complexity was always there. MCP makes it visible and makes it easy to multiply.

*Related: [Your Agents Don't Need Better Models. They Need Better Plumbing.](/posts/agents-need-better-plumbing/)*
