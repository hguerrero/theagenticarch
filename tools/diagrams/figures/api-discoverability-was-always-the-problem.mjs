import { C, measure, wrap } from '../lib.mjs';

const kicker = (c, x, y, s, o = {}) => c.text(x, y, s.toUpperCase(), { font: 'mono', size: o.size ?? 26, color: o.color ?? C.deep, spacing: o.spacing ?? 4, anchor: o.anchor });

export default {
  slug: 'api-discoverability-was-always-the-problem',
  topic: 'API discoverability',
  cover: {
    title: [[['API ', false], ['Discoverability', true]], [['Was Always']], [['the Problem.']]],
    titleSize: 108,
    sub: ['Agents did not create it.', 'They made it impossible to ignore.'],
    tags: ['APIs', 'discovery', 'MCP', 'agents'],
    motif(c) {
      const stops = [
        [1400, 990, 'catalog'], [1580, 830, 'portal'], [1770, 680, 'services'], [1950, 540, 'registry'],
      ];
      const bw = 200, bh = 84;
      stops.forEach(([x, y, l], i) => {
        if (i < stops.length - 1) {
          const [nx, ny] = stops[i + 1];
          c.arrow(x + 50, y - bh / 2 - 4, nx - 40, ny + bh / 2 + 6, { color: C.deep, sw: 3.5, head: 20, bend: -16 });
        }
        c.node(x, y, bw, bh, l, { size: 38 });
      });
      // last arrow to agent
      c.arrow(2000, 494, 2070, 405, { color: C.deep, sw: 3.5, head: 20, bend: -10 });
      c.circle(2120, 330, 80, { fill: C.white, hatch: true, sw: 5 });
      c.text(2120, 345, 'agent', { size: 42, anchor: 'middle' });
      c.text(1400, 1085, 'what exists', { size: 32, anchor: 'middle', color: C.mute });
      c.text(2085, 535, 'asks, finds,', { size: 32, color: C.deep });
      c.text(2085, 575, 'checks, calls', { size: 32, color: C.deep });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-discovery-evolution', title: 'One problem, five generations',
      sub: 'each step moves discovery closer to its consumer',
      draw(c) {
        const items = [
          ['API catalog', 'inventory', 'a list of what exists. Useful, but thin.'],
          ['Developer portal', 'human developers', 'docs, try-it, plans, and terms. Self-service.'],
          ['Service catalog', 'service teams', 'services, owners, and dependencies.'],
          ['MCP registry', 'agents', 'tool servers an agent can query.'],
          ['Agent capability discovery', 'the destination', 'ask, find, check access, and call, mid-task.'],
        ];
        const W = 380, gap = 70, bottom = 1290;
        items.forEach(([t, k, s], i) => {
          const x = 110 + i * (W + gap), top = 860 - i * 120, last = i === 4;
          c.rect(x, top, W, bottom - top, { fill: last ? C.tint : C.white, stroke: last ? C.deep : C.ink, sw: last ? 5 : 4 });
          c.step(x + 52, top + 2, i + 1, { r: 32, size: 36 });
          kicker(c, x + 30, top + 75, k, { size: 24, spacing: 3, color: last ? C.deep : C.mute });
          const tl = wrap(t, W - 60, 'handBold', 42);
          const ny = c.lines(x + 30, top + 130, tl, { font: 'handBold', size: 42, lh: 48, color: last ? C.deep : C.ink });
          c.para(x + 30, ny + 14, s, W - 60, { size: 34, color: C.mute, lh: 42 });
          [() => c.doc(x + W / 2, bottom - 100, 80), () => c.person(x + W / 2, bottom - 100, 80), () => c.server(x + W / 2, bottom - 100, 80), () => c.server(x + W / 2, bottom - 100, 80, { fill: C.tint }), () => c.model(x + W / 2, bottom - 110, 100)][i]();
          if (i < 4) c.arrow(x + W + 4, top + 60 - 0, x + W + gap - 6, top + 60 - 0 - 120 + 120, { color: C.deep, sw: 4, head: 22 });
        });
      },
    },
    {
      n: 2, file: 'fig-2-human-vs-agent-needs', title: 'What humans infer, agents need stated',
      sub: 'an agent acts on the description it is given',
      draw(c) {
        const rows = [
          ['what it is for, from a title and a skim', 'a precise description, and when to use it'],
          ['that a call is risky, from experience', 'reads or changes state, and what it can affect'],
          ['who to ask for access', 'auth requirements, machine-readable'],
          ['which of two similar APIs to pick', 'scope, owner, environment, version'],
          ['what went wrong, from an error page', 'errors that say what failed and what to do next'],
        ];
        const lx = 110, lw = 860, rx = 1270, rw = 1020;
        c.person(lx + 40, 372, 56);
        kicker(c, lx + 110, 385, 'a human could infer', { color: C.mute });
        c.model(rx + 40, 372, 56);
        kicker(c, rx + 110, 385, 'an agent needs it stated', { color: C.deep });
        rows.forEach(([a, b], i) => {
          const y = 450 + i * 168, h = 138;
          c.rect(lx, y, lw, h, { dashed: true, stroke: C.mute, sw: 3.5 });
          const al = wrap(a, lw - 70, 'hand', 40);
          const ay = y + h / 2 - ((al.length - 1) * 48) / 2 + 13;
          c.lines(lx + 35, ay, al, { size: 40, lh: 48, color: C.mute });
          c.arrow(lx + lw + 30, y + h / 2, rx - 30, y + h / 2, { color: C.deep, sw: 4, head: 24 });
          c.rect(rx, y, rw, h, { fill: C.tint, stroke: C.deep, sw: 4.5 });
          const bl = wrap(b, rw - 70, 'handBold', 40);
          const by = y + h / 2 - ((bl.length - 1) * 48) / 2 + 14;
          c.lines(rx + 35, by, bl, { font: 'handBold', size: 40, lh: 48 });
        });
      },
    },
    {
      n: 3, file: 'fig-3-discovery-loop', title: 'A discovery loop with a stop path',
      sub: 'a system willing to return nothing is a control',
      draw(c) {
        const steps = [
          ['The agent has a task', 'and needs a capability'],
          ['It queries the registry', 'by task, domain, environment, or owner'],
          ['Candidates come back', 'filtered to what this agent and user may see'],
          ['It selects one', 'using the descriptions it was given'],
          ['Policy check, then call', 'only if access is allowed'],
        ];
        const W = 380, gap = 70, top = 330, H = 390;
        const cx = (i) => 110 + i * (W + gap) + W / 2;
        steps.forEach(([t, s], i) => {
          const x = 110 + i * (W + gap), hl = i === 2;
          c.rect(x, top, W, H, { fill: hl ? C.tint : C.white, stroke: hl ? C.deep : C.ink, sw: hl ? 5 : 4 });
          c.step(x + 52, top + 2, i + 1, { r: 32, size: 36 });
          const tl = wrap(t, W - 56, 'handBold', 42);
          const ny = c.lines(x + 28, top + 100, tl, { font: 'handBold', size: 42, lh: 50 });
          c.para(x + 28, ny + 10, s, W - 56, { size: 34, color: C.mute, lh: 42 });
          if (i < 4) c.arrow(x + W + 4, top + H / 2, x + W + gap - 6, top + H / 2, { color: C.deep, sw: 4, head: 22 });
        });
        // stop path from step 3
        c.arrow(cx(2), top + H + 8, cx(2), 900, { color: C.warn, sw: 4, head: 24, dash: [16, 12] });
        c.text(cx(2) + 24, 825, 'nothing fits', { size: 36, color: C.warn });
        c.rect(cx(2) - 290, 915, 580, 170, { fill: C.warnTint, stroke: C.warn, sw: 4.5 });
        c.text(cx(2), 995, 'Stop and say so', { font: 'handBold', size: 48, anchor: 'middle' });
        c.text(cx(2), 1050, 'no improvising', { size: 34, anchor: 'middle', color: C.mute });
        c.text(1200, 1180, 'a system that returns something every time is dangerous', { size: 40, anchor: 'middle', color: C.mute });
        c.text(1200, 1240, 'one willing to return nothing is a control', { font: 'handBold', size: 42, anchor: 'middle', color: C.deep });
      },
    },
  ],
};
