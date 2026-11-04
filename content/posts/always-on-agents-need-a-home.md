---
title: "Your Agent Shouldn't Need Your Laptop"
date: 2026-11-05
draft: false
description: "Proactive agents need integrations, live events, and compute that stays reachable. A better sandbox on a Mac mini is not production. The real requirement is an agent that is always available, not always running."
tags: ['agents', 'architecture', 'sandboxing', 'events', 'agentgateway', 'kagent']
pillars: ['Agentic Infrastructure']
cover:
  image: '/images/always-on-agents-need-a-home/cover.png'
  alt: "Your Agent Shouldn't Need Your Laptop: an agent moving from a laptop, to a Mac mini under a desk, to a sandbox on shared infrastructure that wakes on events"
---

Most of us met AI agents as something we open. You type, the agent works, you close the tab, and the agent stops existing. That is fine for a coding session or a quick question. It does not work for what people actually want from an assistant: something that notices the contract that came in overnight, sees that CI failed after you left, and has a draft response ready before you ask.

That kind of agent is *proactive*. And a proactive agent has a problem a chat window never had: it has to be somewhere when you are not.

> **A proactive agent must be always available. It does not need to be always running.**

## The Mac mini was the tell

OpenClaw is where a lot of people first felt this. It is a self-hosted assistant built around an always-on process, the Gateway, that you run on a machine you control, typically [a Mac mini at home or an isolated VPS](https://github.com/FinnaAI/explain-openclaw). The Gateway connects to WhatsApp, Telegram, Discord, or Slack, receives messages, runs an agent turn, calls tools, and answers back. It keeps memory across conversations and runs scheduled tasks while you sleep.

Look at what the community did with it. The Mac mini became the unofficial reference hardware, and [TechRadar reported](https://www.techradar.com/pro/best-hardware-options-for-deploying-openclaw) that the M4 model sold out at several retailers. Setup guides tell you to [disable automatic sleep](https://gist.github.com/gabriel1l/2e6ebe57e9a17983aa8596fd7c5bcdc7) so the agent stays up. Nearly every guide also tells you not to install it on the laptop you use every day, because the agent can reach every file and account on the machine it runs on.

That is two requirements stated as folk wisdom:

1. The agent has to run on something that is always on, which your laptop and your phone are not.
2. The agent has to run on something isolated from you, because it acts without asking for each step.

A dedicated machine solves both, more or less. It also brings its own failure modes. Power outages and ISP problems take the agent offline, and OS updates that reboot the host interrupt the Gateway. People went further and built layered isolation on top: a VM on the dedicated host, separate Linux users per workload, and a firewall. That is a sandbox, assembled by hand on a box under someone's desk.

The sandboxing tools keep getting better. Local VMs, gVisor, microVMs, and policy-driven runtimes like NVIDIA OpenShell make one agent on one machine much safer than it was a year ago. But a safer box is still a box, and better isolation does not turn it into production. Isolation answers one question: what can this agent touch while it runs? Production asks many more, and a single machine has no good answer to them:

- **Availability.** One host is one failure domain. There is no failover when it reboots, loses power, or loses its network, and no one is paged when it does.
- **Ownership and change.** The agent's configuration lives on that machine. It is not reviewed, versioned, or rolled back like the rest of your systems.
- **Identity and credentials.** The agent's tokens sit on a disk, tied to one person's accounts. Rotating or revoking them is a manual job.
- **Audit and observability.** When the agent sends something it should not have, you need a record of what it saw, what it called, and who approved it. A home box rarely keeps one.
- **Scale and tenancy.** One machine per person works for an enthusiast. It does not work for a team of fifty, or for agents acting on behalf of groups with different permissions.

None of this is a criticism of the people who built these setups. They proved the demand. But the gap between "my agent runs safely on a Mac mini" and "our agents run in production" is not a sandboxing gap. It is a platform gap.

## The hosted assistants moved the box to the cloud

This year the large platforms shipped their own versions of the idea: OpenAI's Dots, Meta's Muse, X's Grok Bot, and Anthropic's Claude Duet are all always-on personal agents. The details differ, but the architecture rhymes. Each gives the agent compute in the provider's cloud, connects it to your accounts, watches for things that need your attention, and comes to you instead of waiting to be opened.

The consumer market answered the OpenClaw question by taking the Mac mini away. That is a good outcome for individuals. For a platform team, it is a description of work to do. If your company wants proactive agents on its own infrastructure, with its own models and policies, you have to build what these products hide.

![Diagram of an always-on proactive agent: event sources feed a gateway, the gateway wakes a sandboxed agent, the agent calls tools back through the gateway, and sensitive actions loop to a person for approval](/images/always-on-agents-need-a-home/fig-1-proactive-agent.png)

## What a proactive agent actually needs

Strip away the branding and every always-on assistant depends on the same three things.

**Integrations.** An agent that can't read your inbox, calendar, tickets, or repositories can't notice anything. Today that mostly means MCP servers for tools and data, and A2A for other agents. The integration layer is also where credentials live, and the agent should not hold them. A gateway that injects the credential on the way out means a compromised agent has nothing to steal. As with any agent request, [policy belongs outside the model](https://theagenticarch.com/posts/agent-request-is-a-distributed-system/), at a point the model cannot talk its way past.

**Live events.** "Proactive" is easy to fake with a cron job that wakes the agent every fifteen minutes to check whether anything changed. That pays for a model call to learn that nothing happened, and it is up to fifteen minutes late when something did. A proactive agent should be event-driven: a webhook from CI, a new message in a channel, a calendar change. The event starts the turn. That only works if the events are trustworthy, which is why [events need the same product discipline as APIs](https://theagenticarch.com/posts/events-are-apis-too/): an owner, a contract, and purpose-based access.

**Compute that stays reachable.** When the event arrives at 3 a.m., something has to receive it, load the agent's state, and run the turn inside a boundary. That is the sandbox. The state it loads should be more than a summary of past chats. An agent that resumes needs [a durable history](https://theagenticarch.com/posts/agents-need-history-not-just-memory/) of what it did and why.

## Autonomy needs a brake

An agent that acts while you are away can also make mistakes while you are away. OpenClaw users have shared stories of agents deleting a whole inbox or rewriting a calendar. The setups that work treat the agent like a new employee: its own accounts, limited permissions, and no ability to send email or post without approval. The hosted assistants landed on the same pattern: the agent drafts, and sending, paying, signing, or deleting waits for a person.

This has a direct consequence for the runtime. A human-in-the-loop agent spends much of its life blocked on someone who is in a meeting, asleep, or on vacation. In a service, a blocked process is a failing health check. In an agent, it is correct behavior. "Waiting for approval" has to be a normal state that can last hours, not an error to restart.

## Always available is not always running

The simplest way to make an agent reachable at 3 a.m. is to keep it running at 3 a.m. That is what the Mac mini does, and it is what a sandbox-per-agent design does in the cloud. But a proactive agent works in bursts. It handles an event for thirty seconds, then waits an hour for the next one, or a day for an approval. Keep its sandbox up the whole time and you pay for the waiting, not the work.

Model calls are not cheap either. One early OpenClaw user [spent more than $200 in his first two days](https://www.theneuron.ai/explainer-articles/openclaw-personal-ai-agent-setup-guide-an-use-cases-february-2026/). But model costs track work. An idle sandbox tracks only the number of agents that exist, so your capacity plan follows open agents, not working ones. There is a security cost too: a running sandbox is reachable for as long as it runs.

So the requirement is more precise than "always on." Any event must be able to wake the agent, and it must resume with its state intact. Between events, it should hold nothing.

![Two timelines compared: one sandbox per agent held all day while the agent works in short bursts, and an agent that suspends to storage between events and resumes when the next event arrives](/images/always-on-agents-need-a-home/fig-2-available-not-running.png)

## One way to build it

One disclosure up front: I work at Solo.io, and the projects below are ones we work on. Weigh this section accordingly.

[kagent](https://kagent.dev) with Agent Substrate runs each agent as an *actor* on a shared pool of pre-started workers. Each actor runs in its own gVisor sandbox with a private network and an egress gateway that denies outbound traffic by default. When an agent finishes a turn or waits for a person, its state is snapshotted to object storage and the worker returns to the pool. The next request resumes it on any free worker. The agent is also a Kubernetes resource, so it lives in Git and goes through review like everything else. [agentgateway](https://agentgateway.dev) sits in the traffic path to models, MCP servers, and other agents, where credential injection, cost attribution, and rate limiting attach.

Both are early, so pin versions and read the release notes. You take on a worker pool and an object store. If you run a few personal agents, a dedicated host or a hosted assistant is a reasonable answer. The platform layer pays off when you have many agents, for many teams, idle most of the time.

## The agent needs a home

OpenClaw proved that people want agents that act without being asked. The Mac minis proved those agents need a home that isn't your laptop. The hosted assistants proved the architecture: integrations, live events, a sandbox, and a person in the loop for the decisions that matter.

The open question for most companies is who runs that architecture for their own agents, and whether it pays for agents while they wait. Make the sandbox the agent's home, let events wake it, and give the compute back when it is idle.

## Frequently asked questions

### What is a proactive AI agent?

An agent that starts work from an event, such as a new message, a failed build, or a calendar change, instead of waiting for a prompt. It works in the background and asks a person before sensitive actions like sending, paying, signing, or deleting.

### Isn't a well-sandboxed agent on a dedicated machine enough?

For one person, often yes. For production, no. Sandboxing limits what the agent can touch, but a single machine still has no failover, no change control, manual credential handling, little audit trail, and no way to serve many teams with different permissions.

### Does an always-on agent have to run all the time?

No. It has to be reachable by events and resume with its state. With suspend and resume, the agent's state is saved when it goes idle and its compute is released until the next event.

### Should a proactive agent poll or react to events?

React to events wherever the source can push them, and poll only where it can't. Polling pays for model calls that find nothing and is late when something does change.

*Related: [Events Are APIs Too](https://theagenticarch.com/posts/events-are-apis-too/)*
