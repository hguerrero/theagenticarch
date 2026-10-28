import { C } from '../lib.mjs';

function dashed(c, x1, y1, x2, y2, o = {}) {
  const d = o.dash ?? 16, g = o.gap ?? 14;
  const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  for (let t = 0; t < len; t += d + g) {
    const e = Math.min(t + d, len);
    c.line(x1 + ux * t, y1 + uy * t, x1 + ux * e, y1 + uy * e, { stroke: o.stroke ?? C.deep, sw: o.sw ?? 3.5, rough: 0.3 });
  }
}

export default {
  slug: 'mcp-registry-app-store-for-agents',
  topic: 'The MCP registry',
  cover: {
    title: [[['The MCP Registry']], [['Is Becoming the']], [['App Store', true]], [['for Agents', true]]],
    titleSize: 108,
    sub: ['Separate finding a capability from', 'running it, and governance becomes possible.'],
    tags: ['mcp', 'registry', 'agents', 'governance'],
    motif(c) {
      const x = 1620, w = 630, h = 190;
      const ys = [300, 530, 760];
      const list = [
        ['order-status', 'v1.4  •  team: support', 'ACTIVE', false],
        ['billing-lookup', 'v2.0  •  team: finance', 'ACTIVE', false],
        ['old-search', 'v0.9  •  team: platform', 'DEPRECATED', true],
      ];
      list.forEach(([name, meta, st, bad], i) => {
        c.rect(x, ys[i], w, h, { fill: C.white });
        c.server(x + 85, ys[i] + h / 2 + 4, 66);
        c.text(x + 170, ys[i] + 85, name, { font: 'handBold', size: 44 });
        c.text(x + 170, ys[i] + 140, meta, { font: 'mono', size: 26, color: C.mute, spacing: 1 });
        c.pill(x + w - 40 - (st === 'ACTIVE' ? 66 : 105), ys[i] + 44, st, bad ? { size: 22, fill: C.warnTint, stroke: C.warn, color: C.warn } : { size: 22 });
      });
      c.circle(1340, 625, 82, { fill: C.tint, sw: 5 });
      c.text(1340, 640, 'agent', { size: 46, anchor: 'middle' });
      c.arrow(1430, 625, 1600, 625, { color: C.deep, sw: 4.5, head: 26 });
      c.text(1935, 1040, 'listed  •  versioned  •  owned', { size: 38, anchor: 'middle', color: C.mute });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-hardcoded-vs-discovered', title: 'From hard-coded to discovered',
      sub: 'finding a capability is separated from running it',
      draw(c) {
        // left panel
        c.rect(110, 320, 1010, 890, { fill: C.white });
        c.text(150, 410, 'hard-coded', { font: 'handBold', size: 54 });
        c.text(150, 458, 'the list is part of the agent', { size: 34, color: C.mute });
        c.rect(170, 500, 890, 260, { fill: C.white });
        c.text(210, 560, 'agent', { font: 'handBold', size: 42 });
        c.rect(210, 590, 810, 140, { fill: C.tint, stroke: C.deep, sw: 3 });
        c.text(240, 640, 'tool list in config', { size: 32, color: C.mute });
        c.text(240, 695, 'orders, billing, search', { size: 40 });
        const nx = [170, 485, 800];
        ['new tool appears', 'edit the config', 'redeploy the agent'].forEach((t, i) => {
          const bad = i === 2;
          c.node(nx[i] + 130, 950, 260, 120, t, { size: 34, fill: bad ? C.warnTint : C.white, stroke: bad ? C.warn : C.ink });
          if (i < 2) c.arrow(nx[i] + 130 + 134, 950, nx[i + 1] + 130 - 134, 950, { color: C.ink, sw: 4, head: 20 });
        });
        c.cross(170, 1100, 50);
        c.text(245, 1140, 'every change means a redeploy', { size: 38 });

        // right panel
        c.rect(1280, 320, 1010, 890, { fill: C.white });
        c.text(1320, 410, 'discovered', { font: 'handBold', size: 54, color: C.deep });
        c.text(1320, 458, 'the agent asks, a registry answers', { size: 34, color: C.mute });
        c.rect(1330, 500, 280, 260, { fill: C.white });
        c.text(1470, 620, 'agent', { font: 'handBold', size: 44, anchor: 'middle' });
        c.text(1470, 685, 'no tool list', { size: 32, anchor: 'middle', color: C.mute });
        c.rect(1950, 500, 300, 260, { fill: C.tint, stroke: C.deep });
        c.text(2100, 600, 'registry', { font: 'handBold', size: 46, anchor: 'middle', color: C.deep });
        c.text(2100, 655, 'a catalog of', { size: 32, anchor: 'middle', color: C.mute });
        c.text(2100, 695, 'MCP servers', { size: 32, anchor: 'middle', color: C.mute });
        c.arrow(1625, 580, 1935, 580, { color: C.ink, sw: 4, head: 24 });
        c.text(1780, 548, 'I need order status', { size: 32, anchor: 'middle' });
        c.arrow(1935, 690, 1625, 690, { color: C.deep, sw: 4, head: 24 });
        c.text(1780, 745, 'matching servers', { size: 32, anchor: 'middle', color: C.deep });
        c.line(2100, 764, 2100, 830, { stroke: C.deep, sw: 3.5 });
        c.line(1465, 830, 2105, 830, { stroke: C.deep, sw: 3.5 });
        const sx = [1465, 1785, 2105];
        ['orders server', 'billing server', 'new server'].forEach((t, i) => {
          c.arrow(sx[i], 830, sx[i], 890, { color: C.deep, sw: 3.5, head: 20 });
          c.node(sx[i], 950, 270, 120, t, { size: 34, fill: i === 2 ? C.tint : C.white, stroke: i === 2 ? C.deep : C.ink });
        });
        c.check(1330, 1100, 50);
        c.text(1405, 1140, 'new tools appear, no agent change', { size: 38 });
      },
    },
    {
      n: 2, file: 'fig-2-registry-entry', title: 'What a registry entry holds',
      sub: 'the value of a registry depends on its metadata (example values)',
      draw(c) {
        c.rect(110, 330, 1530, 860, { fill: C.white });
        c.server(210, 415, 84);
        c.text(310, 430, 'order-status', { font: 'handBold', size: 56 });
        c.pill(1290, 410, 'PRODUCTION', { size: 26 });
        c.pill(1500, 410, 'ACTIVE', { size: 26 });
        c.line(150, 495, 1600, 495, { stroke: C.faint, sw: 3, rough: 0.5 });
        const rows = [
          ['description', 'Look up the status of a customer order'],
          ['endpoint', 'https://orders.example.com/mcp'],
          ['version', '1.4.0'],
          ['owner', 'support-platform team'],
          ['scope', 'orders domain'],
          ['access', 'OAuth, orders:read'],
        ];
        rows.forEach(([k, v], i) => {
          const cy = 555 + i * 110;
          c.text(160, cy + 12, k, { font: 'handBold', size: 38, color: C.deep });
          c.text(500, cy + 12, v, { size: 38 });
          if (i < rows.length - 1) c.line(150, cy + 55, 1600, cy + 55, { stroke: C.faint, sw: 3, rough: 0.5 });
        });
        const notes = [
          [410, 'active, deprecated, or retired'],
          [555, 'written for a model to read'],
          [775, 'roll out and back, deliberately'],
          [885, 'a team you can reach'],
        ];
        notes.forEach(([y, t]) => {
          c.arrow(1775, y, 1665, y, { color: C.deep, sw: 3.5, head: 20 });
          c.text(1795, y + 12, t, { size: 34, color: C.deep });
        });
        c.text(1795, 1100, 'one place that is the', { size: 34, color: C.mute });
        c.text(1795, 1142, 'source of truth', { size: 34, color: C.mute });
      },
    },
    {
      n: 3, file: 'fig-3-app-store-analogy', title: 'The app store analogy, and where it breaks',
      sub: 'useful, and incomplete',
      draw(c) {
        c.text(345, 395, 'app store', { font: 'handBold', size: 40, anchor: 'middle', color: C.mute });
        c.text(1060, 395, 'agent registry', { font: 'handBold', size: 40, anchor: 'middle', color: C.deep });
        const rows = [
          ['a listing', 'an entry with a description for a model'],
          ['review', 'checked before it is offered'],
          ['versions', 'versioned servers, rolled out and back deliberately'],
          ['permissions', 'access requirements on each entry'],
          ['deprecation', 'a status: deprecated, then retired'],
        ];
        rows.forEach(([a, b], i) => {
          const cy = 490 + i * 155;
          c.node(345, cy, 470, 115, a, { size: 38 });
          c.arrow(595, cy, 705, cy, { color: C.deep, sw: 4, head: 22 });
          c.node(1060, cy, 640, 115, b, { size: 34, fill: C.tint, stroke: C.deep });
        });
        // where it breaks
        c.rect(1520, 330, 770, 880, { fill: C.warnTint, stroke: C.warn });
        c.text(1560, 410, 'where it breaks', { font: 'handBold', size: 50 });
        const items = [
          ['the buyer is software', 'it selects tools mid-task, so approval must be policy'],
          ['listing is not trust', 'a registry alone does not authorize a use'],
          ['the catalog is a target', 'altered entries can steer agents'],
          ['descriptions are the interface', 'the model decides from them'],
        ];
        items.forEach(([t, b], i) => {
          const y = 450 + i * 190;
          c.cross(1560, y + 6, 44);
          c.text(1630, y + 42, t, { font: 'handBold', size: 38 });
          c.para(1630, y + 92, b, 620, { size: 32, color: C.mute });
        });
      },
    },
  ],
};
