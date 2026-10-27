---
title: 'AGNTCon + MCPCon San Jose: MCP Grows Up, and So Do the Attackers'
date: 2026-10-28
draft: false
description: 'My takeaways from two days at AGNTCon + MCPCon North America: MCP tasks and events, skills over MCP, agent identity, and what Solo.io announced, including Agent Shield, standalone agentgateway, and Agent Substrate.'
tags: ['agntcon', 'mcp', 'agents', 'security', 'agentgateway', 'kagent', 'agentshield']
cover:
  image: '/images/agntcon-mcpcon-san-jose-recap/cover.png'
  alt: 'MCP Grows Up. So Do the Attackers. — a sketch of an agent calling tools through a gateway that checks who is acting and for whom, while an unknown agent is blocked'
---

I'm writing this a few days after the end of AGNTCon + MCPCon North America in San Jose. The Amsterdam edition ran a couple of weeks earlier, so this was the second stop of the first year. I spent two days in sessions, hallway conversations, and the Solo.io booth. I recorded a short recap video on the last day, and this post expands on it.

One disclosure up front: I work at Solo.io. Several of the announcements below are ours. I have marked them in their own section so you can weigh them accordingly.

*Prefer to watch? Here is the full on-location recap from the last day of the conference.*

{{< youtube id="gAxMwOIu4DU" title="AGNTCon + MCPCon North America 2026 recap">}}

## The short version

Three themes ran through the conference:

1. **MCP is changing quickly.** Tasks and events are now central, and people are starting to ask what else MCP could carry, including skills.
2. **Identity is the hard part.** Registration, authentication, and delegated authority came up in session after session.
3. **Defenders are catching up.** The threat conversation shifted from "can an agent be tricked?" to "what if every agent in the environment can become hostile?"

## What is changing in MCP

### Tasks and events

Tasks are now a first-class concern. Long-running work needs a way to start, be tracked, and finish later without holding a connection open. Events add a surface for managing how a client and its tools interact over time, not just call-and-response.

If you build agents that do real work, you already know why. A call that returns in 200 ms is easy. A job that takes ten minutes, needs a human approval halfway, and reports back later is the one that breaks naive designs.

### Skills over MCP: worth exploring

The idea that caught my attention most was distributing skills through MCP. Skills today mostly live on a laptop or inside a repo. If they can be served over MCP, a team could curate that knowledge once and let agents consume it remotely.

To be clear, this was exploratory in the sessions I attended. I am not reporting a released protocol feature. But for platform teams, the question is real: who owns, versions, and distributes the knowledge your agents use?

### Tool calling: an open question

One point I want to understand better. I heard a position, attributed to OpenAI's approach, that exposing "list tools" and "execute tool" as separate steps is an anti-pattern. I did not get enough detail to judge it, so I am treating it as a prompt to dig in, not a conclusion.

It does connect to a problem I see in practice: loading a large tool catalog into context is expensive and noisy. Approaches like searching for the tools you need, or letting the agent write a short script that calls tools, are two answers people are trying. More on that below.

### WebMCP and dynamic UI

We also heard about WebMCP and how agents could present richer interfaces, even generating them dynamically. In a hallway conversation I had a related thought: much of the web was built for human eyes, and making pages programmatically accessible to agents is a large, unsolved migration. People are only starting to think about it seriously.

## Identity is the recurring theme

I attended a couple of security sessions with people from modern identity providers, including Okta. The topics were dynamic client registration, Client ID Metadata Documents (CIMD), delegation of authority, and the identity of agents versus users.

The pattern I took away: it is no longer enough to ask "is this user allowed?" You also need to answer "which agent is acting, for whom, and with what authority?" That is why the session count on this topic keeps growing. It will keep evolving, and it is worth tracking closely.

## What Solo.io announced

This is the section where I am not neutral. Here is what we showed, with links to the source material.

### Agent Shield (new, open source)

Keith Babo introduced **Agent Shield** in his keynote, "Agents as Actors: Harnessing the Power of Agentic Infrastructure." The motivation matches the mood of the week. There was a steady flow of news about hijacks, hacking, and CVEs, and the assumption behind Agent Shield is that any agent might turn hostile, with attackers able to probe around the clock.

According to the [project site](https://agent-shield.dev/), it is a self-hosted, Apache 2.0 defense against lateral movement across Kubernetes and AWS. It builds a graph of how workloads communicate, flags suspicious paths with evidence, and proposes fixes that are applied only after a human approves them. Plugins read from Kubernetes, Istio, Cilium, agentgateway, and AWS networking, and it accepts Falco runtime alerts.

A few details I appreciate as an architect:

- **Models are optional.** Discovery, the graph, and the explorer work without one. Model-assisted investigation is opt-in.
- **Findings must cite evidence.** The investigator's output is promoted only if it references facts the graph actually returned.
- **Remediation has a workflow:** plan, dry run, approve, apply, verify.

The caveats matter, and the project states them plainly. It is early and pre-1.0. The HTTP API and UI have no authentication. Verification confirms that a declared policy is present, not that traffic is actually blocked. The project's own guidance is: evaluate it, do not expose it. Treat it as something to try in a lab, not to put in front of production.

### Solo Enterprise for agentgateway, on any infrastructure

agentgateway, an official project of the Agentic AI Foundation, now has a **standalone mode** in Solo Enterprise. It runs outside Kubernetes, on VMs, ECS, or bare metal, with a full read-write management UI and a shared, database-backed configuration store. Kubernetes mode remains, and both share the same policy model, identity model, and MCP gateway capabilities. The [announcement post](https://www.solo.io/blog/introducing-solo-enterprise-for-agentgateway-on-any-infrastructure) has the details.

The enterprise MCP features line up neatly with the themes above:

- **Code mode and search mode** address the tool-catalog problem: the agent writes a short script to call tools, or looks up only the tools it needs.
- **Brokered elicitation** means the gateway handles user login and holds the session, so MCP servers never see user credentials.
- **Impersonation and delegation** swap or combine credentials so downstream systems can see both the user and the agent acting for them.
- **Dual authentication** verifies the agent's identity and re-checks with a trusted credential before a request reaches internal systems.

That is a direct answer to "which agent, acting for whom, with what authority," implemented at the gateway rather than inside every agent.

### Agent Substrate and kagent

The other announcement I flagged in my recap is **Agent Substrate**, which works with kagent to run agents at scale on Kubernetes. The [docs](https://kagent.dev/docs/kagent/0.x/concepts/agent-substrate/) describe it as separating an agent's lifecycle from pod infrastructure: idle agents are checkpointed to object storage, and when one is invoked it is restored onto a pre-warmed gVisor-sandboxed worker. Many actors share a small set of pods, which is how you increase agent density without giving every agent its own always-on pod. The docs do not state a maturity level for Agent Substrate itself, so check the current status before planning around it.

### agentdesktop

**agentdesktop** is an open source visibility, policy, and management layer for AI tools across desktop fleets. It helps teams discover and govern agents, MCP servers, skills, and models where they actually run. After a week of thinking about skills living on laptops, this one felt timely.

### Sessions and community

Solo speakers covered a lot of ground: Shane O'Donnell on keeping AI usage and spend under control with agentgateway, Christian Posta on why agents should not be given credentials, and a workshop from Lin Sun and Christian on keeping infrastructure out of your agents and MCP servers. Lin and Christian also signed copies of *AI Agents in Kubernetes*, and Lin received the AAIF Technical Excellence Award. The keynote recording is [on YouTube](https://youtu.be/iNV5-YkPHW4?t=18018).

## What this means for architects

If I had to compress the week into one design principle: **keep the cross-cutting concerns out of the agent.**

Identity, credentials, tool discovery, spend limits, isolation, and containment are all problems you do not want to solve separately inside every agent framework. The conference showed several layers converging on that idea at once: the protocol (tasks, events, registration), the gateway (delegation, brokered login, tool search), the runtime (snapshotting and sandboxed execution), and the defensive layer (graph-based detection and approved remediation).

A practical checklist for the next quarter:

- **Inventory your agent identities.** Can you say which agent acted for which user, and under what delegated authority?
- **Decide where credentials live.** If the answer is "inside the agent," revisit it.
- **Plan for long-running work.** If your tool design assumes synchronous calls, look at MCP tasks.
- **Ask who owns skills.** If they live on laptops, you have a distribution and governance gap.
- **Try, don't deploy, the new security tooling.** Agent Shield is pre-1.0 by its own description, so run it against a test environment first.

## What I am following next

Three questions I want to dig into, and I would like to know which interests you most: what shared skills over MCP could look like in practice, how to think about the list-and-execute tool-calling debate, and how to make delegation auditable end to end.

Tell me what you are building, and I will write the deep dive that answers it.

---

*Sources: [Solo.io at AGNTCon + MCPCon North America](https://www.solo.io/blog/agntcon-mcpcon-north-america-2026), [Key Announcements from AGNTCon + MCPCon 2026](https://www.solo.io/community/agntcon-mcpcon-2026), [Agent Shield](https://agent-shield.dev/), [Solo Enterprise for agentgateway on any infrastructure](https://www.solo.io/blog/introducing-solo-enterprise-for-agentgateway-on-any-infrastructure), [Agent Substrate docs](https://kagent.dev/docs/kagent/0.x/concepts/agent-substrate/), and my own on-location recap recorded in San Jose.*
