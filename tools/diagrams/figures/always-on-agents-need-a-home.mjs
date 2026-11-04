import { C, measure, wrap } from '../lib.mjs';

const kicker = (c, x, y, s, o = {}) => c.text(x, y, s.toUpperCase(), { font: 'mono', size: o.size ?? 26, color: o.color ?? C.deep, spacing: 4, anchor: o.anchor });

export default {
  slug: 'always-on-agents-need-a-home',
  topic: 'Proactive agents',
  cover: {
    title: [[['Your Agent ']], [['Shouldn’t Need ']], [['Your Laptop', true]]],
    titleSize: 108,
    sub: ['Proactive agents need integrations, live events, and', 'compute that stays reachable — not a sandbox that never sleeps.'],
    tags: ['agents', 'sandboxing', 'events', 'agentgateway'],
    motif(c) {
      // laptop -> dedicated box -> always-reachable sandbox
      const y = 620;
      // laptop
      const lx = 1360;
      c.rect(lx - 110, y - 70, 220, 140, { r: 14, sw: 4 });
      c.rect(lx - 90, y - 50, 180, 100, { r: 6, sw: 3, fill: C.tint });
      c.rect(lx - 130, y + 70, 260, 20, { r: 8, sw: 3.5 });
      c.text(lx, y + 165, 'your laptop', { size: 36, anchor: 'middle', color: C.mute });

      c.arrow(lx + 150, y, lx + 330, y, { color: C.deep, sw: 3.5, head: 20 });

      // mac mini / dedicated box
      const mx = 1760;
      c.server(mx, y, 150);
      c.text(mx, y + 165, 'a box under a desk', { size: 36, anchor: 'middle', color: C.mute });

      c.arrow(mx + 170, y, mx + 350, y, { color: C.deep, sw: 3.5, head: 20 });

      // always-reachable sandbox (suspends between events)
      const sx = 2130;
      c.circle(sx, y, 110, { fill: C.white, stroke: C.deep, sw: 4, rough: 1 });
      c.raw(`<circle cx="${sx}" cy="${y}" r="92" fill="none" stroke="${C.blue}" stroke-width="3" stroke-dasharray="10 12"/>`);
      c.text(sx, y - 6, 'wakes on', { size: 30, anchor: 'middle', color: C.deep });
      c.text(sx, y + 30, 'events', { size: 30, anchor: 'middle', color: C.deep });
      c.text(sx, y + 165, 'always reachable', { size: 36, anchor: 'middle', color: C.mute });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-proactive-agent', title: 'Where a proactive agent actually lives',
      sub: 'events wake it, a gateway mediates everything it touches, people approve what matters',
      draw(c) {
        // gateway: a tall bar every path runs through
        const gx = 1020, gy = 290, gw = 300, gh = 820;
        c.rect(gx - gw / 2, gy, gw, gh, { fill: C.tint, stroke: C.deep, sw: 4.5 });
        c.text(gx, gy + 60, 'GATEWAY', { font: 'handBold', size: 46, anchor: 'middle', color: C.deep });
        c.para(gx, gy + 112, 'policy, identity, and credentials live here — never on the agent', gw - 60, { size: 27, anchor: 'middle', color: C.mute, lh: 36 });

        // events feeding the gateway
        const events = [
          { y: 420, label: 'webhook: CI failed' },
          { y: 700, label: 'new message arrives' },
          { y: 980, label: 'calendar event changes' },
        ];
        events.forEach((e) => {
          c.node(430, e.y, 460, 190, e.label, { size: 36, fill: C.white });
          c.arrow(430 + 230, e.y, gx - gw / 2 - 10, e.y, { color: C.ink, sw: 3.5, head: 20 });
        });

        // agent sandbox, dashed border
        const ax = 1780, ay = 420, aw = 460, ah = 260;
        c.rect(ax - aw / 2, ay - ah / 2, aw, ah, { fill: C.white, stroke: C.blue, sw: 4, dashed: true });
        kicker(c, ax, ay - ah / 2 + 50, 'sandbox', { anchor: 'middle' });
        c.text(ax, ay - 2, 'AGENT', { font: 'handBold', size: 48, anchor: 'middle' });
        c.para(ax, ay + 62, 'starts on the event, holds nothing between turns', aw - 70, { size: 28, anchor: 'middle', color: C.mute, lh: 36 });

        c.arrow(gx + gw / 2 + 10, 400, ax - aw / 2 - 10, 400, { color: C.deep, sw: 4, head: 22 });
        c.text((gx + gw / 2 + ax - aw / 2) / 2, 378, 'wakes the agent', { size: 28, anchor: 'middle', color: C.deep });

        c.arrow(ax - aw / 2 - 10, 478, gx + gw / 2 + 10, 478, { color: C.ink, sw: 3.5, head: 20 });
        c.text((gx + gw / 2 + ax - aw / 2) / 2, 522, 'tool call', { size: 26, anchor: 'middle' });

        // tools, reached only through the gateway
        const tx = 1780, ty = 770, tw = 400, th = 200;
        c.node(tx, ty, tw, th, 'TOOLS', { size: 44, font: 'handBold' });
        c.text(tx, ty + th / 2 - 22, 'APIs, MCP servers', { font: 'mono', size: 24, color: C.mute, anchor: 'middle' });

        c.arrow(gx + gw / 2 + 10, 730, tx - tw / 2 - 10, 730, { color: C.deep, sw: 4, head: 22 });
        c.text((gx + gw / 2 + tx - tw / 2) / 2, 708, 'credential injected here', { size: 26, anchor: 'middle', color: C.deep });

        c.arrow(tx - tw / 2 - 10, 808, gx + gw / 2 + 10, 808, { color: C.ink, sw: 3.5, head: 20 });
        c.text((gx + gw / 2 + tx - tw / 2) / 2, 852, 'result', { size: 26, anchor: 'middle' });

        // approval loop for sensitive actions, curving around the tools box
        const px = 1780, py = 1120, pw = 400, ph = 190;
        c.node(px, py, pw, ph, 'PERSON', { size: 44, font: 'handBold', fill: C.warnTint, stroke: C.warn });
        c.text(px, py + ph / 2 - 24, 'approves send, pay, sign, delete', { size: 24, color: C.warn, anchor: 'middle' });
        c.arrow(ax + aw / 2 - 30, ay + ah / 2 + 10, px + pw / 2 - 30, py - ph / 2 - 10, { color: C.warn, sw: 4, head: 22, bend: -260, dash: [16, 12] });
        c.pill(2200, 770, 'APPROVAL REQUIRED', { size: 23, fill: C.warnTint, stroke: C.warn, color: C.warn });
      },
    },
    {
      n: 2, file: 'fig-2-available-not-running', title: 'Always available is not always running',
      sub: 'a held-open sandbox pays for the wait; suspend and resume pays for the work',
      draw(c) {
        const x0 = 200, x1 = 2200, w = x1 - x0;
        const bursts = [
          { x: 260, w: 170 },
          { x: 980, w: 170 },
          { x: 1760, w: 170 },
        ];

        // row A: one sandbox per agent, held the whole time
        const ay = 420, ah = 200;
        kicker(c, x0, ay - 30, 'one sandbox per agent');
        c.rect(x0, ay, w, ah, { fill: C.white, stroke: C.ink, sw: 4 });
        bursts.forEach((b) => c.rect(b.x, ay, b.w, ah, { fill: C.tint, stroke: C.deep, sw: 3.5 }));
        c.para(x0, ay + ah + 55, 'idle the rest of the time — still billed, still reachable, still a running attack surface', w, { size: 32, color: C.mute });

        // time axis + event labels, shared between the two rows
        const axisY = 840;
        c.line(x0, axisY, x1, axisY, { stroke: C.faint, sw: 3, dash: [14, 14], rough: 0.5 });
        bursts.forEach((b, i) => {
          const cx = b.x + b.w / 2;
          c.line(cx, ay + ah, cx, 1150, { stroke: C.faint, sw: 2.5, dash: [10, 12], rough: 0.4 });
          c.text(cx, axisY - 18, `event ${i + 1}`, { font: 'mono', size: 26, color: C.deep, anchor: 'middle', spacing: 1 });
        });

        // row B: suspend and resume, compute only during a burst
        const by = 900, bh = 200;
        kicker(c, x0, by - 30, 'suspend and resume');
        c.line(x0, by + bh / 2, x1, by + bh / 2, { stroke: C.faint, sw: 3, dash: [20, 16], rough: 0.5 });
        bursts.forEach((b) => c.rect(b.x, by, b.w, bh, { fill: C.tint, stroke: C.deep, sw: 3.5 }));
        bursts.slice(0, -1).forEach((b, i) => {
          const next = bursts[i + 1];
          const midx = (b.x + b.w + next.x) / 2;
          c.doc(midx, by + bh / 2, 90);
          c.text(midx, by + bh + 70, 'state in object storage', { size: 24, color: C.mute, anchor: 'middle' });
        });
        c.para(x0, by + bh + 130, 'compute releases between events and resumes from the saved state when the next one arrives', w, { size: 32, color: C.mute });
      },
    },
  ],
};
