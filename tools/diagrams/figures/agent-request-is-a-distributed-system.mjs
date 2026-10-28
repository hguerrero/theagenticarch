import { C, measure, wrap } from '../lib.mjs';

export default {
  slug: 'agent-request-is-a-distributed-system',
  topic: 'A simple agent request',
  cover: {
    title: [[['A Simple Agent']], [['Request Is a ']], [['Distributed ', true]], [['System', true]]],
    titleSize: 118,
    sub: ['Ask for the weather and ten messages cross', 'five components. Now add fifty tools.'],
    tags: ['agents', 'MCP', 'distributed systems', 'observability'],
    motif(c) {
      const pts = [[1560, 330], [2080, 400], [2150, 780], [1780, 960], [1480, 700]];
      const hub = [1830, 640];
      pts.forEach(([x, y], i) => c.arrow(hub[0], hub[1], x, y, { color: C.deep, sw: 3.5, bend: i % 2 ? 40 : -40, head: 22 }));
      pts.forEach(([x, y], i) => c.circle(x, y, 46, { fill: i === 2 ? C.tint : C.white, hatch: i === 0 }));
      c.circle(hub[0], hub[1], 92, { fill: C.white, sw: 5 });
      c.text(hub[0], hub[1] + 14, 'agent', { size: 52, anchor: 'middle' });
      c.text(1560, 255, 'user', { size: 40, anchor: 'middle' });
      c.text(2090, 335, 'model', { size: 40, anchor: 'middle' });
      c.text(2230, 850, 'MCP', { size: 40, anchor: 'middle' });
      c.text(1780, 1060, 'API', { size: 40, anchor: 'middle' });
      c.text(1480, 790, 'identity', { size: 40, anchor: 'middle', color: C.deep });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-ten-messages', title: 'One question, ten messages',
      sub: '“What’s the weather in Boston?”',
      draw(c) {
        const cols = [
          { x: 300, name: 'user' }, { x: 780, name: 'agent host', sub: 'MCP client' },
          { x: 1260, name: 'model' }, { x: 1740, name: 'MCP server' }, { x: 2140, name: 'weather API' },
        ];
        cols.forEach((k) => {
          c.line(k.x, 440, k.x, 1310, { stroke: C.faint, sw: 3, dash: [14, 14], rough: 0.4 });
          c.node(k.x, 380, 330, 100, k.name, { sub: k.sub, size: 40 });
        });
        const x = (i) => cols[i].x;
        const msgs = [
          [0, 1, 'ask'], [1, 2, 'prompt + tool list'], [2, 1, 'call get_weather(city)'], [1, 3, 'tools/call + token'],
          [3, 4, 'GET /forecast'], [4, 3, 'forecast'], [3, 1, 'tool result'], [1, 2, 'result in context'],
          [2, 1, 'answer'], [1, 0, 'reply'],
        ];
        msgs.forEach(([a, b, label], i) => {
          const y = 540 + i * 78;
          const back = [5, 6, 8, 9].includes(i);
          const dir = Math.sign(x(b) - x(a));
          c.arrow(x(a) + dir * 8, y, x(b) - dir * 8, y, { color: back ? C.deep : C.ink, sw: 4, head: 24, dash: back ? [16, 10] : undefined });
          const mx = (x(a) + x(b)) / 2, w = measure(label, 'hand', 32) + 20;
          c.raw(`<rect x="${mx - w / 2}" y="${y - 50}" width="${w}" height="40" fill="${C.bg}"/>`);
          c.text(mx, y - 18, label, { size: 32, anchor: 'middle', color: back ? C.deep : C.ink });
          c.step(Math.min(x(a), x(b)) - 36 + (dir < 0 ? 0 : 0), y, i + 1, { r: 22, size: 26 });
        });
      },
    },

    {
      n: 2, file: 'fig-2-four-things-that-travel', title: 'Four things travel along the path',
      sub: 'the same four questions you would ask of any call chain',
      draw(c) {
        const cols = [
          { x: 780, name: 'user' }, { x: 1110, name: 'agent host' }, { x: 1440, name: 'model' },
          { x: 1770, name: 'MCP server' }, { x: 2110, name: 'API' },
        ];
        cols.forEach((k) => c.node(k.x, 365, 290, 86, k.name, { size: 38 }));
        const rows = [
          { q: 'Where does context move?', y: 470, tone: 'ctx', cells: { 0: 'final answer', 1: 'builds the prompt', 2: 'sees only what it is given', 3: 'returns the tool result' } },
          { q: 'Where does identity move?', y: 690, tone: 'id', cells: { 1: 'attaches a credential. whose?', 3: 'upstream may use another' } },
          { q: 'Where is policy enforced?', y: 910, tone: 'pol', cells: { 2: 'a prompt rule is only a request', 3: 'gateway or server', 4: 'or the API itself' } },
          { q: 'Where does it fail?', y: 1130, tone: 'fail', cells: { 1: 'retries an unsafe call', 2: 'wrong tool or wrong args', 3: 'timeout or error', 4: 'partial or wrong result' } },
        ];
        rows.forEach((r, ri) => {
          if (ri) c.line(110, r.y - 20, 2290, r.y - 20, { stroke: C.faint, sw: 3, rough: 0.5 });
          const ql = wrap(r.q, 520, 'handBold', 42);
          c.lines(110, r.y + 70 - (ql.length - 1) * 26, ql, { font: 'handBold', size: 42, lh: 52 });
          Object.entries(r.cells).forEach(([ci, label]) => {
            const x = cols[ci].x, my = r.y + 40;
            const bad = r.tone === 'fail' || (r.tone === 'pol' && ci === '2');
            if (r.tone === 'pol') { if (bad) c.cross(x - 22, my - 22, 44); else c.check(x - 22, my - 22, 44); }
            else c.circle(x, my, 22, { fill: bad ? C.warnTint : C.tint, stroke: bad ? C.warn : C.deep, sw: 4 });
            c.lines(x, my + 72, wrap(label, 270, 'hand', 32), { size: 32, anchor: 'middle', color: bad ? C.warn : C.ink, lh: 38 });
          });
        });
      },
    },
    {
      n: 3, file: 'fig-3-fifty-to-five-thousand', title: 'From one tool to five thousand',
      sub: 'the shape of the problem changes with scale',
      draw(c) {
        const xs = [530, 1120, 1710], w = 560;
        const heads = ['1 tool', '50 tools', '5,000 tools'];
        const rows = [
          ['selection', ['pick from a short list', 'similar names lead to wrong choices', 'discover at runtime: retrieval and routing']],
          ['context', ['the list fits in the prompt', 'every definition is read every turn', 'the list cannot go in the prompt']],
          ['ownership', ['one server, one user', 'who owns it? which version? who is paged?', 'a registry and discovery problem']],
          ['control', ['the easy case, no failures', 'failures compound across hops', 'central policy, end-to-end trace']],
        ];
        heads.forEach((h, i) => {
          c.node(xs[i] + w / 2, 385, w, 100, h, { size: 46, font: 'handBold', fill: i === 2 ? C.tint : C.white, stroke: i === 2 ? C.deep : C.ink });
        });
        rows.forEach(([lab, cells], ri) => {
          const y = 480 + ri * 200;
          c.text(110, y + 95, lab.toUpperCase(), { font: 'mono', size: 30, color: C.deep, spacing: 4 });
          cells.forEach((t, i) => {
            c.rect(xs[i], y, w, 170, { fill: i === 2 ? C.tint : C.white, stroke: i === 2 ? C.deep : C.ink, sw: 3.5 });
            const arr = wrap(t, w - 56, 'hand', 34);
            const lh = 42, top = y + 85 - ((arr.length - 1) * lh) / 2 + 11;
            c.lines(xs[i] + w / 2, top, arr, { size: 34, anchor: 'middle', lh });
          });
        });
      },
    },
  ],
};
