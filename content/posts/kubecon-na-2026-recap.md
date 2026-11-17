---
title: 'KubeCon Salt Lake City: Is the Pod Still the Unit?'
date: 2026-11-15
draft: false
description: 'My takeaways from KubeCon + CloudNativeCon North America 2026: agents strain the pod model, sandboxes compete for the runtime layer, identity becomes the control point, and what Solo.io shared in Salt Lake City.'
tags: ['kubecon', 'kubernetes', 'agents', 'sandboxing', 'identity', 'agentgateway', 'kagent']
pillars: ['Agentic Infrastructure']
cover:
  image: '/images/kubecon-na-2026-recap/cover.png'
  alt: 'Is the Pod Still the Unit? — a stack of pods, one per agent, next to a shared worker hosting many small actors, one of them suspended'
---

I was in Salt Lake City last week for KubeCon + CloudNativeCon North America, plus Agent Substrate Day the Monday before. I spent most of the week in keynotes, hallway conversations, and the Solo.io booth. This post is my recap, built from my notes and photos.

## The short version

1. **Agents are now the workload that shapes the platform.** The keynotes were mostly about AI, and the numbers showed why.
2. **The pod is under pressure as the unit of agent compute.** Sandboxes, snapshots, and fleet-wide inference all treat something other than a pod as the thing you schedule.
3. **Identity is the control point.** Shared service accounts break per-agent audit, and every serious runtime answer included a short-lived identity per session.

## The numbers explain the mood

Agents are no longer a rounding error in the traffic. A few data points from the keynotes:

- NVIDIA showed that **80 percent of tokens consumed on OpenRouter come from agents**, with agent token usage up about 37x since February 2026. Their slide cited OpenRouter data through September.
- Anthropic's data on Claude Code usage showed human turns per session falling from 6.2 to 4.1, while autonomous actions per session rose from 9.8 to 21.2. The day three keynote put the same trend another way: agents take about 21 actions before a person gets involved, roughly double what they did six months earlier.
- The CNCF's own survey figures: 82 percent of container users run Kubernetes in production, and about two thirds of organizations host generative AI models on it. But 44 percent of Kubernetes users do not run AI on it yet, and only 7 percent deploy models daily. The wave has not crested.

![NVIDIA keynote slide: 80 percent of tokens consumed by agents, and 37x growth in agent token usage since February 2026](/images/kubecon-na-2026-recap/keynote-agent-tokens.jpg)
*NVIDIA's keynote slide on agent token share, from OpenRouter data.*

![Keynote slide titled Human Speed vs. Agent Speed, showing human turns per session falling from 6.2 to 4.1 and autonomous actions per session rising from 9.8 to 21.2](/images/kubecon-na-2026-recap/day2-human-vs-agent-speed.jpg)
*Day two: Anthropic on the shift from human speed to agent speed.*

## Are we moving away from pods?

That was the line I wrote in my notes during the first keynote. It was not a slogan from the stage. It was a question that kept coming up as the talks went by.

On the inference side, the answer was already "partly." KubeRay joined the CNCF. llm-d reached 1.0. Google's OpenRL, which is also a new sandbox project, schedules trainer and sampler steps across mixed accelerator pools instead of scheduling pods. Upbound showed Model Plane, a fleet-wide control plane built on Crossplane, deploying one model across AWS and Vultr behind a single OpenAI-compatible endpoint. AWS reminded everyone that the pod layer is still being pushed hard, with upstream work for clusters of 100,000 nodes.

![Keynote slide titled New Sandbox Projects, showing logos including Agent Substrate, agentregistry, gVisor, KubeRay, llm-d, OpenShell, and VM API](/images/kubecon-na-2026-recap/keynote-sandbox-projects.jpg)
*The new CNCF sandbox projects included Agent Substrate, OpenShell, KubeRay, VM API, and agentregistry.*

On the agent side, the pod assumptions break in three ways. I heard this laid out clearly in a session on Wednesday:

- Agents **write and run code nobody reviewed**: scripts, CLIs, Python, at runtime.
- Agents **accumulate task-specific state**, so they cannot be swapped like interchangeable replicas.
- Agents **spend most of their time idle**, waiting for a person, an event, or an approval.

Map each agent to a pod and you also strain the control plane. Per-session pods, stateful sets, and sandbox pods multiply the object count quickly, and the Kubernetes API server was not designed for that cardinality. A slide at Agent Substrate Day said it plainly: one CRD per actor breaks the control plane when you are heading toward a billion actors.

![Agent Substrate Day slide titled One CRD per actor breaks the control plane, with one billion registered actors](/images/kubecon-na-2026-recap/atecon-one-crd.jpg)
*Agent Substrate Day: why an object per actor does not scale.*

![Figure: five layers around the pod, from pods, nodes, and scheduler at the base up through inference and training, sandbox and lifecycle, identity and access, and governance](/images/kubecon-na-2026-recap/fig-1-layers-around-the-pod.png)

My read: Kubernetes is not going away. The pod is still the base. What changed is that new layers are growing around it, each one answering a question the pod was never built to answer.

## The sandbox fight

Sandboxing was the main battleground of the week, and there is no single answer yet.

- **Agent Substrate** announced 1.0 as a CNCF sandbox project. It separates the *actor* (session, state, identity, policy) from the compute underneath. Idle actors are suspended to object storage and rehydrated onto any free worker.
- **OpenShell**, which NVIDIA is donating to the CNCF, runs agents in isolated sandboxes and enforces policy outside the agent. Red Hat showed it on top of Kata Containers, with an escape-room analogy: assume the agent is already compromised and build up from there.
- **Agent Sandbox** and other approaches also came up, and so did workflow frameworks like Temporal for durable execution.
- **Microsoft** announced Agent Sessions and Agent Suites, two open source projects. A session records an agent run in an append-only, hash-linked journal so you can replay it, fork it from any point, and verify it independently. In the demo, compute was released while the agent waited for an SRE's approval and resumed exactly where it stopped. It is early, but the idea that "waiting for approval" is a first-class state is the right one.

![Red Hat slide titled OpenClaw Enterprise with OpenShell, showing a control plane cluster and a data plane cluster where agents run in OpenShell sandboxes](/images/kubecon-na-2026-recap/redhat-openshell-diagram.jpg)
*Red Hat's architecture for running agents in OpenShell sandboxes, with the control plane kept separate.*

Agent Substrate Day, hosted by Google, Solo.io, and the community, made the contrast useful. The talks covered running Substrate on EKS, Microsoft's snapshot plugin API, and where GPUs go when agents run on Substrate. One session ran five non-AI workloads on a three-pod worker pool, including a game, a Raft cluster, and an SSH honeypot, to show that suspend and resume is not only for agents.

![Agent Substrate Day welcome panel on stage, with the ATECon 2026 octopus logo](/images/kubecon-na-2026-recap/atecon-welcome.jpg)
*Agent Substrate Day opened with a panel and a full room.*

I wrote about the underlying idea earlier this month in [Your Agent Shouldn't Need Your Laptop](https://theagenticarch.com/posts/always-on-agents-need-a-home/): isolation answers what an agent can touch while it runs, and lifecycle answers what it costs and where its state lives while it waits. The week made clear that the two questions are separate and that most tools answer only one.

## Identity is the control point

The identity theme from AGNTCon followed me to Salt Lake City. If you read [my San Jose recap](https://theagenticarch.com/posts/agntcon-mcpcon-san-jose-recap/), this will sound familiar, but it was sharper here because it ran into Kubernetes primitives.

A Google Cloud keynote laid out the problem: when you scale an agent past one replica, all the replicas share one service account. That breaks per-agent auditability. The proposed answer is SPIFFE and SPIRE for short-lived, context-scoped identities per agent session, a proxy in front for authorization, and a sandbox as mandatory isolation. The framing I liked best was the goal: move from human-in-the-loop *approvals* to human-in-the-loop *governance*.

![Keynote slide titled The Identity Crisis: Who is the AI Agent in Your Cluster?](/images/kubecon-na-2026-recap/keynote-identity-crisis.jpg)
*The identity keynote framed the shared-service-account problem.*

At Agent Substrate Day, a demo showed a mail agent that never holds credentials, and the roadmap slide listed token exchange, on-behalf-of credentials, and enterprise IdP policy in place of consent screens. The session I attended on Wednesday took the same direction. Sandboxes are treated as hostile by default and all egress is blocked unless policy allows it. The credential is never injected into the actor. A gateway intercepts egress and adds the right credential based on policy, and the actor's identity travels with the call so each actor can be audited separately. This is the same idea as keeping policy outside the model, which I covered in [The Agent Request Is a Distributed System](https://theagenticarch.com/posts/agent-request-is-a-distributed-system/).

## What the platform teams are doing

The day two end-user keynotes were a useful reality check, because they were mostly about platforms, not agents:

- **CVS** built an internal platform in the spirit of Backstage, with the goal that a new hire can ship to production on the first morning.
- **Access Group** uses AI to generate, build, and deploy apps, so a power user never needs to see what runs underneath.
- Both described the same pattern: specialist teams expose capabilities through APIs, and the platform team is an *enabler* that owns the rails, not a *gatekeeper* that owns every capability behind them.
- **Meta** moved application deployment from a Terraform monolith to GitOps with Argo CD. Early results: deployment time dropped from over four hours to minutes, and about 15 engineers manage roughly 100 clusters for agentic workloads.
- **Apple** showed an open source tool where each container runs in its own lightweight VM on Apple silicon, including a local Kubernetes cluster that shares an image store with the host. It is a nice fit for the laptop-to-cluster gap.

Anthropic also announced it is donating 3,000 Claude Ultra codes to CNCF maintainers, in addition to its existing open source program.

## A session worth catching: from laptop to cluster

Kevin Dubois's session was the most practical one I saw. He built a live race game where audience taps became Kafka events, an AI race director boosted whichever team fell behind (with a person approving the intervention), and MCP servers exposed the game controls. It was all Java with Quarkus, and his argument was that the unclear part of agentic apps, getting from a laptop to a cluster, is mostly standard deployment plus a short list of additions:

- **Treat the agent parts like any other service.** Health endpoints for sub-agents and MCP servers, token and latency metrics, mTLS between agents, and short-lived SPIFFE/SPIRE tokens so each agent reaches only what it needs.
- **Test model swaps.** In the demo, the original model used a boost multiplier of 1.5 and its replacement picked 3 without being asked. Kevin's advice is to add LLM evals, with tools like Langfuse or Promptfoo.
- **Reuse the stack you have.** Enterprise teams already know how to deploy, scale, and secure their existing applications. Do not rebuild that in a new language.

## What Solo.io shared

- **Agent Substrate 1.0.** It was announced on the main keynote stage as a CNCF sandbox project built by Google, Solo, and others. The demo ran 24 GKE nodes with 65 sandboxes per node. A bridge for Claude managed agents on top of Agent Substrate was also announced.
- **Actor as the building block.** Solo.io's keynote segment framed an actor as a sandbox plus a gateway. A slide I photographed from the audience made the point visually.
- **kagent 1.0.** kagent is now GA and rebased on Agent Substrate. kagent is the agent layer: conversations, MCP servers, snapshot timing, and safe rollout. Substrate is the runtime layer underneath it.
- **agentgateway.** The community now has more than 600 contributors from over 160 organizations, and Google Cloud gave it a shout-out in a security keynote. Solo said that Swissquote already runs Agent Substrate and agentgateway in production.
- **Agent Desktop.** A project that brings governance and sandbox or gateway controls to developer laptops.
- **The book.** Christian Posta signed copies of *Agent Substrate: From Pods to Sandboxes* at the Solo.io booth, and the party that night packed the venue.

![A frame from the main keynote showing a Solo.io slide titled Actor, with two presenters on stage](/images/kubecon-na-2026-recap/keynote-actor.jpg)
*Still from my video of the Solo.io keynote segment: the actor as the new building block.*

![Attendees gathered at the Solo.io booth, one holding a copy of the book](/images/kubecon-na-2026-recap/solo-booth.jpg)
*The Solo.io booth during the book signing.*

![The Agent Substrate community party stage lit in blue, with the ate.dev sign and the octopus mascot](/images/kubecon-na-2026-recap/community-party.jpg)
*The Agent Substrate community party on Tuesday night.*

One honest note on naming: the most common booth question was why there are two "agent" components, kagent and Agent Substrate. Substrate is not agent-only, even though the name suggests it. kagent is the agentic layer on top. If that confuses you, you are in good company, and I will try to explain it better.

## What this means for architects

Solo.io's "Postcard from 2028" talk at Agent Substrate Day drew a timeline I keep coming back to: in 2025, agents could do things (MCP). In 2026, we could see what they do (shadow AI). In 2027, they run on a platform. In 2028, we let them act, which depends on trust.

![Slide titled Every year unlocked the next: 2025 MCP, 2026 Shadow AI, 2027 Remote agents, 2028 Trust](/images/kubecon-na-2026-recap/atecon-timeline.jpg)
*The timeline from the Postcard from 2028 talk at Agent Substrate Day.*

If I had to compress the week into design guidance:

- **Separate the unit of identity, the unit of state, and the unit of compute.** A pod is all three today. For agents, you want to decide each one on purpose.
- **Count objects, not only nodes.** If your agent design creates a Kubernetes object per session, work out the cardinality before you ship.
- **Treat idle as normal.** An agent waiting on a person is healthy. Choose a runtime where that costs close to nothing.
- **Keep credentials out of the agent.** Inject them at a gateway, and make identity travel with the call so audit works per agent.
- **Treat sandbox claims as claims.** Many of the density and resume numbers were from project READMEs. Pin versions, read the release notes, and test with your own workloads.
- **Test model swaps.** Add evals so a new model cannot quietly change your agent's behavior.

## Run the pod test on one agent

Pick one agent you run today, even a prototype, and answer three questions:

1. **If its pod restarts, what is lost?** If the answer is "the conversation and everything it learned," state is tied to the pod.
2. **In your logs, can you tell this agent from its replicas?** If they share a service account, identity is tied to the pod.
3. **What does it cost during the hour it waits for a person?** If the answer is "the same as when it works," compute is tied to the pod.

Each "the pod" answer marks a place where the design assumes one thing that agents have stopped being. Write them down, and start with the one that hurts most.

## Frequently asked questions

### Is Kubernetes still the right base for agents?

Yes, as the base layer. The week's announcements add layers around the pod, such as sandbox runtimes, per-session identity, and snapshotting, instead of replacing Kubernetes. The open question is what the schedulable unit for an agent should be.

### What is the difference between kagent and Agent Substrate?

Agent Substrate is a runtime layer. It separates an actor's session, state, identity, and policy from the compute it runs on, and it can suspend and resume actors. kagent is the agent layer on top: user conversations, MCP servers, snapshot timing, and safe rollout of agent changes.

### Why is a shared service account a problem for agents?

When an agent scales to several replicas in standard Kubernetes, all of them share one service account. Every action then looks the same in logs, so you cannot tell which agent did what. Short-lived identities per agent session, such as SPIFFE and SPIRE, fix that.

### Do I need a new sandbox to run agents safely?

You need isolation, and you need to decide who enforces policy. OpenShell enforces it outside the agent. Substrate treats every sandbox as hostile and blocks egress by default. Which one fits depends on your threat model and on whether you also need suspend and resume.

*Related: [Your Agent Shouldn't Need Your Laptop](https://theagenticarch.com/posts/always-on-agents-need-a-home/) and [AGNTCon + MCPCon San Jose: MCP Grows Up, and So Do the Attackers](https://theagenticarch.com/posts/agntcon-mcpcon-san-jose-recap/)*

---

*Sources: my own notes, photos, and video from KubeCon + CloudNativeCon North America 2026 and Agent Substrate Day in Salt Lake City. Product numbers are as presented on stage or in project materials; verify them against current docs before planning around them.*
