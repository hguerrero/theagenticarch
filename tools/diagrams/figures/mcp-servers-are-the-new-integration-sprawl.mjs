import { C, measure, wrap } from '../lib.mjs';

// Draw a tangle of arrows between two columns of nodes (deliberate crossings).
function tangle(c, ax, ay, bx, by, links, opts = {}) {
  links.forEach(([i, j], k) => {
    const bend = [60, -70, 40, -50, 80, -40][k % 6];
    c.arrow(ax, ay[i], bx, by[j], {
      color: k % 3 === 0 ? C.ink : k % 3 === 1 ? C.blue : C.deep,
      sw: opts.sw ?? 3.5, bend, head: opts.head ?? 22, rough: 1.4,
    });
  });
}

// A horizontal layer: kicker, title on the left, wrapped body on the right.
function layer(c, x, y, w, h, { kicker, title, body, fill = C.white, stroke = C.ink, bodyX = 520, dy = 0 }) {
  c.rect(x, y, w, h, { fill, stroke, sw: stroke === C.ink ? 4 : 5 });
  if (kicker) c.text(x + 40, y + 52, kicker, { font: 'mono', size: 24, color: C.deep, spacing: 3 });
  c.text(x + 40, y + (kicker ? 112 : h / 2 + 15), title, { font: 'handBold', size: 48, color: C.ink });
  const lines = wrap(body, w - bodyX - 40, 'hand', 34);
  const lh = 34 * 1.28;
  const top = y + h / 2 - ((lines.length - 1) * lh) / 2 + 12 + dy;
  c.lines(x + bodyX, top, lines, { font: 'hand', size: 34, color: C.mute, lh });
}

export default {
  slug: 'mcp-servers-are-the-new-integration-sprawl',
  topic: 'MCP server sprawl',
  cover: {
    title: [[['MCP Servers']], [['Are the New']], [['Integration ', true]], [['Sprawl', true]]],
    titleSize: 118,
    sub: ['Every integration era leaves a mess.', 'Without ownership, MCP does too.'],
    tags: ['MCP', 'integration', 'architecture', 'governance'],
    motif(c) {
      const ay = [420, 580, 740, 900], sy = [380, 520, 660, 800, 940];
      const links = [[0, 2], [0, 4], [1, 0], [1, 3], [2, 1], [2, 4], [3, 0], [3, 2], [0, 1], [3, 4], [1, 4], [2, 3]];
      tangle(c, 1360, ay, 1590, sy, links.map(([i, j]) => [i, j]).slice(0), { sw: 3, head: 18 });
      // redraw with real anchor ys per link (tangle uses same x for all)
      ay.forEach((y) => c.circle(1310, y, 40, { fill: C.white, sw: 4 }));
      sy.forEach((y, i) => c.rect(1590, y - 36, 72, 72, { r: 14, fill: i === 1 ? C.tint : C.white, sw: 4 }));
      c.text(1485, 1075, 'sprawl', { size: 44, anchor: 'middle', color: C.mute });
      // arrow to structure
      c.arrow(1720, 660, 1880, 660, { color: C.deep, sw: 5, head: 30 });
      // layered stack
      const L = [['agents', C.white], ['thin servers', C.tint], ['governed APIs', C.white]];
      L.forEach(([t, f], i) => c.node(2100, 440 + i * 190, 380, 120, t, { fill: f, stroke: i === 1 ? C.deep : C.ink, size: 44, sw: 4.5 }));
      c.arrow(2100, 505, 2100, 565, { sw: 4, head: 22 });
      c.arrow(2100, 695, 2100, 755, { sw: 4, head: 22 });
      c.pill(2100, 960, 'OWNED  •  REGISTERED');
      c.text(2100, 1075, 'structure', { size: 44, anchor: 'middle', color: C.deep });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-sprawl-map', title: 'From sprawl to structure',
      sub: 'each server was a sensible local decision. together they are a tangle.',
      draw(c) {
        // ---- left: the tangle
        c.text(110, 370, 'SPRAWL', { font: 'mono', size: 28, color: C.mute, spacing: 5 });
        const ay = [480, 660, 840, 1020], sy = [440, 590, 740, 890, 1040];
        const ax = 330, sx = 690;
        const links = [[0, 2], [0, 4], [0, 1], [1, 0], [1, 3], [1, 4], [2, 1], [2, 4], [2, 0], [3, 0], [3, 2], [3, 3]];
        links.forEach(([i, j], k) => {
          const bend = [50, -60, 35, -45, 70, -35][k % 6];
          c.arrow(ax, ay[i], sx, sy[j], { color: k % 3 === 0 ? C.ink : k % 3 === 1 ? C.blue : C.deep, sw: 3.4, bend, head: 22, rough: 1.4 });
        });
        ay.forEach((y) => c.node(ax - 110, y, 220, 84, 'agent', { size: 38 }));
        sy.forEach((y) => {
          c.node(sx + 110, y, 220, 84, 'MCP server', { size: 36 });
          c.text(sx + 250, y + 12, 'owner?', { size: 36, color: C.warn });
        });
        c.text(110, 1275, 'different people, different styles, no shared standards', { size: 34, color: C.mute });

        // ---- middle: arrow
        c.arrow(1130, 760, 1280, 760, { color: C.deep, sw: 6, head: 34 });
        c.text(1205, 700, 'design', { size: 38, color: C.deep, anchor: 'middle' });

        // ---- right: layered structure
        c.text(1350, 370, 'STRUCTURE', { font: 'mono', size: 28, color: C.deep, spacing: 5 });
        const X = 1350, W = 940;
        const rows = [
          { y: 430, h: 150, t: 'agents', s: 'consume capabilities', f: C.white, st: C.ink },
          { y: 640, h: 150, t: 'thin MCP servers', s: 'named owner, registered', f: C.tint, st: C.deep },
          { y: 850, h: 150, t: 'governed APIs', s: 'rules, access, audit', f: C.white, st: C.ink },
          { y: 1060, h: 150, t: 'domain services + data', s: '', f: C.white, st: C.ink },
        ];
        rows.forEach((r) => {
          c.rect(X, r.y, W, r.h, { fill: r.f, stroke: r.st, sw: r.st === C.deep ? 5 : 4 });
          if (r.s) {
            c.text(X + 40, r.y + r.h / 2 - 2, r.t, { font: 'handBold', size: 46 });
            c.text(X + 40, r.y + r.h / 2 + 44, r.s, { size: 32, color: C.mute });
          } else c.text(X + 40, r.y + r.h / 2 + 15, r.t, { font: 'handBold', size: 46 });
        });
        for (let i = 0; i < 3; i++) {
          const y1 = rows[i].y + rows[i].h, y2 = rows[i + 1].y;
          c.arrow(X + W / 2, y1 + 6, X + W / 2, y2 - 6, { sw: 4.5, head: 24, color: C.deep });
        }
      },
    },
    {
      n: 2, file: 'fig-2-five-debts', title: 'Five kinds of debt',
      sub: 'none of them is new. that is the point.',
      draw(c) {
        // left: the unmanaged server
        c.rect(110, 480, 440, 560, { fill: C.white, sw: 5 });
        c.server(330, 710, 170);
        c.text(330, 880, 'unmanaged', { size: 44, anchor: 'middle', font: 'handBold' });
        c.text(330, 936, 'MCP server', { size: 44, anchor: 'middle', font: 'handBold' });
        c.text(330, 1000, 'built in an afternoon', { size: 32, anchor: 'middle', color: C.mute });

        const rows = [
          ['Orchestration monolith', 'the real workflow lives in one component no team owns'],
          ['Duplicated business logic', 'the refund rule, re-implemented where nobody reviews it'],
          ['Direct data access', 'bypasses the APIs that enforce access control and audit'],
          ['Weak ownership', 'nobody can say who maintains it or who to call'],
          ['Difficult maintenance', 'descriptions drift, upstream breaks silently, no tests'],
        ];
        const X = 780, W = 1510, H = 164, G = 24, Y0 = 340;
        rows.forEach(([t, d], i) => {
          const y = Y0 + i * (H + G), cy = y + H / 2;
          c.arrow(550, 760, X - 8, cy, { color: C.blue, sw: 3.5, head: 22, bend: 0, rough: 0.8 });
          c.rect(X, y, W, H, { fill: C.white, sw: 4 });
          c.cross(X + 36, cy - 28, 56);
          c.text(X + 128, cy - 6, t, { font: 'handBold', size: 46 });
          c.text(X + 128, cy + 44, d, { size: 33, color: C.mute });
        });
      },
    },
    {
      n: 3, file: 'fig-3-boundary-fix', title: 'Keep the boundary, add the architecture',
      sub: 'a thin server in front, governed services behind it',
      draw(c) {
        const X = 110, W = 1450;
        const Y = { agent: 340, server: 540, api: 820, dom: 1070 };
        // layers
        layer(c, X, Y.agent, W, 120, { title: 'agent', body: 'picks a tool from its name and description', bodyX: 520 });
        layer(c, X, Y.server, W, 200, { dy: 16, kicker: 'TASK-SHAPED', title: 'thin MCP server', body: 'a clear name, a precise description, a small safe surface. no business rules.', fill: C.tint, stroke: C.deep });
        layer(c, X, Y.api, W, 170, { kicker: 'GOVERNED', title: 'APIs', body: 'authorization, validation and audit stay in one place.' });
        layer(c, X, Y.dom, W, 170, { kicker: 'SOURCE OF TRUTH', title: 'domain services', body: 'the logic and the data stay with the teams that own them.' });
        c.pill(X + W - 170, Y.server + 44, 'NAMED OWNER');
        c.pill(X + W - 480, Y.server + 44, 'CONTRACT TESTS');
        // arrows between layers with labels to the right
        const ax = X + 700;
        const labs = [[Y.agent + 120, Y.server, 'tools/call'], [Y.server + 200, Y.api, 'translate + delegate'], [Y.api + 170, Y.dom, 'call, never bypass']];
        labs.forEach(([y1, y2, t]) => {
          c.arrow(ax, y1 + 4, ax, y2 - 6, { sw: 4.5, head: 24, color: C.deep });
          c.text(ax + 34, (y1 + y2) / 2 + 11, t, { size: 32, color: C.deep });
        });

        // right column: registry + shared controls
        const RX = 1730, RW = 560;
        c.rect(RX, 340, RW, 230, { fill: C.white, sw: 4.5 });
        c.text(RX + 36, 392, 'REGISTER + DISCOVER', { font: 'mono', size: 24, color: C.deep, spacing: 3 });
        c.text(RX + 36, 452, 'registry', { font: 'handBold', size: 48 });
        c.lines(RX + 36, 508, ['one place to see what', 'exists and who owns it'], { size: 32, color: C.mute, lh: 40 });
        c.rect(RX, 650, RW, 590, { fill: C.white, sw: 4.5 });
        c.text(RX + 36, 702, 'COMMON INFRASTRUCTURE', { font: 'mono', size: 24, color: C.deep, spacing: 3 });
        c.text(RX + 36, 762, 'shared controls', { font: 'handBold', size: 48 });
        c.text(RX + 36, 812, 'from a gateway, not per server', { size: 30, color: C.mute });
        ['authentication', 'authorization', 'rate limits', 'logging'].forEach((s, i) => {
          const y = 880 + i * 82;
          c.check(RX + 36, y - 6, 46);
          c.text(RX + 110, y + 32, s, { size: 38 });
        });
        // dashed connectors from the side blocks to the layers they govern
        c.arrow(RX - 6, 520, X + W + 8, 625, { color: C.deep, sw: 3.5, head: 20, dash: [14, 12], bend: 0 });
        c.arrow(RX - 6, 700, X + W + 8, 690, { color: C.deep, sw: 3.5, head: 20, dash: [14, 12], bend: 0 });
        c.arrow(RX - 6, 900, X + W + 8, 900, { color: C.deep, sw: 3.5, head: 20, dash: [14, 12], bend: 0 });
      },
    },
  ],
};
