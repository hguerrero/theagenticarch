import { C, measure, wrap } from '../lib.mjs';

const kicker = (c, x, y, s, o = {}) => c.text(x, y, s.toUpperCase(), { font: 'mono', size: o.size ?? 26, color: o.color ?? C.deep, spacing: 4, anchor: o.anchor });

export default {
  slug: 'mcp-is-a-protocol-your-architecture-still-matters',
  topic: 'MCP is a protocol',
  cover: {
    title: [[['MCP Is a Protocol.']], [['Your ', false], ['Architecture', true]], [['Still Matters.', true]]],
    titleSize: 112,
    sub: ['The protocol is thin. Ownership, data access,', 'and authorization are still yours to design.'],
    tags: ['MCP', 'architecture', 'agents', 'tool design'],
    motif(c) {
      // thin protocol slab on top of a much larger architecture
      c.rect(1300, 290, 960, 90, { fill: C.tint, stroke: C.deep, sw: 4.5 });
      c.text(1780, 350, 'MCP  •  the protocol', { size: 44, anchor: 'middle', color: C.deep });
      // arrows down into the architecture
      [1480, 1780, 2080].forEach((x, i) => c.arrow(x, 392, x, 478, { color: C.deep, sw: 3.5, head: 22, bend: i === 1 ? 0 : (i - 1) * 14 }));
      c.rect(1300, 490, 960, 600, { fill: 'none', dashed: true, stroke: C.blue, sw: 3.5, r: 40 });
      kicker(c, 1780, 545, 'your architecture', { anchor: 'middle' });
      const cells = [['ownership', 0, 0], ['data access', 1, 0], ['authorization', 0, 1], ['observability', 1, 1]];
      cells.forEach(([label, cx, cy], i) => {
        c.node(1520 + cx * 520, 700 + cy * 190, 410, 140, label, { size: 44, fill: i === 0 ? C.tint : C.white });
      });
      c.text(1780, 1050, 'granularity · failure behavior', { size: 34, anchor: 'middle', color: C.mute });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-protocol-vs-architecture', title: 'The protocol, and everything else',
      sub: 'what MCP standardizes, and what stays an architecture decision',
      draw(c) {
        // left: protocol
        c.rect(110, 330, 880, 950, { fill: C.tint, stroke: C.deep, sw: 4.5 });
        kicker(c, 160, 395, 'the protocol');
        c.text(160, 460, 'MCP standardizes', { font: 'handBold', size: 52, color: C.deep });
        const left = [
          ['a message format', 'hosts, clients, servers share a language'],
          ['capability discovery', 'tools, resources, and prompts'],
          ['a calling convention', 'structured inputs and outputs'],
          ['transports + auth framework', 'local or HTTP, and a way to authenticate'],
        ];
        left.forEach(([t, s], i) => {
          const y = 520 + i * 185;
          c.check(160, y + 10, 52);
          c.text(240, y + 48, t, { font: 'handBold', size: 42 });
          c.para(240, y + 100, s, 700, { size: 32, color: C.mute });
        });
        // right: architecture
        c.rect(1090, 330, 1200, 950, { fill: C.white, stroke: C.ink, sw: 4.5 });
        kicker(c, 1140, 395, 'your architecture', { color: C.mute });
        c.text(1140, 460, 'Still your decision', { font: 'handBold', size: 52 });
        const right = [
          ['granularity', 'one tool per endpoint, or per task?'],
          ['data access', 'a governed API, or straight to the database?'],
          ['ownership', 'who maintains it and answers when it breaks?'],
          ['authorization', 'whose permissions apply when a tool runs?'],
          ['failure behavior', 'what does a tool return when it goes wrong?'],
          ['observability', 'what do you log, trace, and audit?'],
        ];
        right.forEach(([t, s], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const x = 1140 + col * 570, y = 510 + row * 230;
          c.text(x, y + 45, t, { font: 'handBold', size: 42, color: C.ink });
          c.para(x, y + 98, s, 520, { size: 32, color: C.mute });
          c.line(x, y + 180, x + 520, y + 180, { stroke: C.faint, sw: 3, rough: 0.6 });
        });
        c.text(1140, 1240, 'the protocol is neutral on every one of these', { size: 34, color: C.deep });
      },
    },
    {
      n: 2, file: 'fig-2-three-server-shapes', title: 'Three shapes of MCP server',
      sub: 'pick one on purpose, not by accident',
      draw(c) {
        const W = 680, xs = [110, 860, 1610], y0 = 320, H = 970;
        const titles = ['API wrapper', 'Task-shaped capability', 'Orchestration monolith'];
        const rows = [
          [['effort', 'quick to build, easy to explain'], ['model burden', 'assembles the workflow itself'], ['risk', 'more surface area than any task needs']],
          [['effort', 'tools named for what a user wants'], ['model burden', 'fewer choices, clearer descriptions'], ['risk', 'smaller blast radius']],
          [['effort', 'convenient: the agent calls one tool'], ['model burden', 'workflow hidden inside the server'], ['risk', 'hard to test, hard to own']],
        ];
        xs.forEach((x, i) => {
          const mid = i === 1;
          c.rect(x, y0, W, H, { fill: mid ? C.tint : C.white, stroke: mid ? C.deep : C.ink, sw: mid ? 5 : 4 });
          c.text(x + 36, y0 + 75, titles[i], { font: 'handBold', size: 44, color: mid ? C.deep : C.ink });
          // mini diagram
          const my = 540;
          c.model(x + 100, my, 80);
          if (i === 0) {
            [0, 1, 2, 3].forEach((k) => {
              const by = 450 + k * 62;
              c.arrow(x + 170, my, x + 345, by, { color: C.deep, sw: 3, head: 16, rough: 0.7 });
              c.rect(x + 350, by - 26, 190, 52, { r: 12, sw: 3.5 });
              c.text(x + 445, by + 11, 'tool ' + (k + 1), { size: 30, anchor: 'middle' });
            });
            c.text(x + 610, my + 11, '…', { size: 50, color: C.mute, anchor: 'middle' });
          } else {
            const big = i === 2;
            const bx = x + 250, bw = 290, by = big ? 440 : 480, bh = big ? 200 : 120;
            c.arrow(x + 172, my, bx - 6, my, { color: C.deep, sw: 3.5, head: 20 });
            c.rect(bx, by, bw, bh, { fill: big ? C.warnTint : C.white, stroke: big ? C.warn : C.deep, sw: 4, dashed: big });
            if (big) {
              c.text(bx + bw / 2, my - 18, 'business logic', { size: 34, anchor: 'middle' });
              c.text(bx + bw / 2, my + 30, 'decides on its own', { size: 30, anchor: 'middle', color: C.mute });
            } else c.text(bx + bw / 2, my + 11, 'track_shipment', { font: 'mono', size: 30, anchor: 'middle', color: C.deep });
            [-1, 0, 1].forEach((k) => {
              const cy = my + k * 70;
              c.arrow(bx + bw + 4, big ? cy : my + k * 40, x + 600, cy, { color: C.mute, sw: 3, head: 14, rough: 0.7 });
              c.circle(x + 625, cy, 17, { sw: 3 });
            });
          }
          // rows
          rows[i].forEach(([k, v], r) => {
            const ry = 725 + r * 200;
            c.line(x + 36, ry - 40, x + W - 36, ry - 40, { stroke: C.faint, sw: 3, rough: 0.6 });
            kicker(c, x + 36, ry + 5, k, { size: 26, color: r === 2 && i !== 1 ? C.warn : C.deep });
            c.para(x + 36, ry + 60, v, W - 72, { size: 38, color: C.ink, lh: 46 });
          });
        });
        c.pill(xs[1] + W / 2, y0 + H + 10, 'USUALLY THE BEST DEFAULT', { size: 24 });
      },
    },
    {
      n: 3, file: 'fig-3-design-questions', title: 'Six questions before you build',
      sub: 'treat each server as a small product',
      draw(c) {
        const qs = [
          ['task', 'What task does it serve?', 'if you cannot say it in a sentence, it is too low level or too broad'],
          ['owner', 'Who owns it?', 'a named team, plus a plan for versions and deprecation'],
          ['touches', 'What does it touch?', 'prefer an existing governed API over a data store'],
          ['authority', 'Whose authority does it run with?', 'the user, the agent, or a service account'],
          ['failure', 'What can go wrong?', 'design what the agent sees on failure as carefully as success'],
          ['trace', 'How will you know what happened?', 'trace from the user request to the final effect'],
        ];
        qs.forEach(([k, q, s], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const x = 110 + col * 1120, y = 330 + row * 320, w = 1060, h = 290;
          c.rect(x, y, w, h, { fill: i % 3 === 0 ? C.tint : C.white, stroke: i % 3 === 0 ? C.deep : C.ink });
          c.step(x + 70, y + 80, i + 1, { r: 36, size: 40 });
          kicker(c, x + 135, y + 62, k, { size: 26 });
          const ql = wrap(q, w - 200, 'handBold', 44);
          const ny = c.lines(x + 135, y + 118, ql, { font: 'handBold', size: 44, lh: 52 });
          c.para(x + 135, ny + 10, s, w - 190, { size: 34, color: C.mute, lh: 40 });
        });
      },
    },
  ],
};
