import { C } from '../lib.mjs';

// lib's dash option is not rendered, so draw dashes manually.
function dashed(c, x1, y1, x2, y2, o = {}) {
  const d = o.dash ?? 16, g = o.gap ?? 14;
  const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  for (let t = 0; t < len; t += d + g) {
    const e = Math.min(t + d, len);
    c.line(x1 + ux * t, y1 + uy * t, x1 + ux * e, y1 + uy * e, { stroke: o.stroke ?? C.deep, sw: o.sw ?? 3.5, rough: 0.3 });
  }
}

export default {
  slug: 'the-mcp-data-path',
  topic: 'The MCP data path',
  cover: {
    title: [[['The MCP']], [['Data Path', true]]],
    titleSize: 140,
    sub: ['Follow one customer record. It crosses more', 'boundaries, and is copied in more places,', 'than most teams realize.'],
    tags: ['mcp', 'agents', 'data governance', 'observability'],
    motif(c) {
      const xs = [1330, 1590, 1850, 2110];
      const names = ['API', 'MCP server', 'host', 'model'];
      const y = 690;
      [1460, 1720, 1980].forEach((x) => dashed(c, x, 330, x, 930, { sw: 3 }));
      c.pill(1720, 290, 'TRUST BOUNDARIES', { size: 24 });
      xs.forEach((x, i) => {
        if (i < 3) c.arrow(x + 64, y, xs[i + 1] - 64, y, { color: C.deep, sw: 4, head: 22 });
      });
      xs.forEach((x, i) => {
        c.circle(x, y, 56, { fill: i === 3 ? C.tint : C.white, hatch: i === 0, sw: 4.5 });
        c.text(x, y - 90, names[i], { size: 38, anchor: 'middle', color: i === 0 ? C.deep : C.ink });
        c.doc(x, y + 170, 84, { fill: i === 0 ? C.white : C.tint });
      });
      c.text(1720, 1030, 'one record, a copy at every stop', { size: 38, anchor: 'middle', color: C.mute });
      xs.forEach((x) => dashed(c, x, y + 62, x, y + 112, { stroke: C.faint, sw: 3, dash: 8, gap: 8 }));
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-trust-boundaries', title: 'The path of one record',
      sub: '“Where is order 4417?”',
      draw(c) {
        const cx = [280, 740, 1200, 1660, 2120];
        const cards = [
          ['system of record', 'its own access controls and audit'],
          ['MCP server', 'holds the full response, maybe in logs'],
          ['agent host', 'the tool result comes back to the client'],
          ['model', 'result goes into the prompt, maybe to a third party'],
          ['the user', 'some of the record reaches the person'],
        ];
        const top = 400, h = 250, w = 340;
        [[510, 690], [970, 690], [1430, 1090], [1890, 1090]].forEach(([x, e]) => dashed(c, x, 385, x, e));
        c.pill(510, 345, 'TRUST BOUNDARY', { size: 24 });
        cards.forEach(([t, b], i) => {
          c.card(cx[i] - w / 2, top, w, h, { title: t, body: b, titleSize: 40, bodySize: 30, pad: 28, fill: i === 3 ? C.tint : C.white });
        });
        for (let i = 0; i < 4; i++) c.arrow(cx[i] + w / 2 + 14, top + h / 2, cx[i + 1] - w / 2 - 14, top + h / 2, { color: C.deep, sw: 4.5, head: 24 });
        // transcript branch
        dashed(c, cx[3], top + h + 12, cx[3], 765, { sw: 4, dash: 14, gap: 12 }); c.arrow(cx[3], 770, cx[3], 800, { color: C.deep, sw: 4, head: 24 });
        c.card(cx[3] - w / 2, 815, w, 215, { title: 'the transcript', body: 'stored for history, evaluation, or memory', titleSize: 40, bodySize: 30 });
        c.para(110, 880, 'Every boundary has a different owner, different retention rules, and different people who can see what passed through.', 1080, { size: 42, color: C.ink, lh: 62 });
        c.text(110, 1120, 'draw the path before you try to govern it', { size: 36, color: C.deep });
      },
    },
    {
      n: 2, file: 'fig-2-many-copies', title: 'One record, many copies',
      sub: 'each copy lives under different rules than the original',
      draw(c) {
        const items = [
          ['the original row', 'in the system of record'],
          ['the API response', 'held by the MCP server and its logs'],
          ['the tool result', 'in the host application’s memory'],
          ['text in a prompt', 'sent to the model provider'],
          ['conversation history', 'the stored transcript'],
          ['agent memory', 'a summary derived from it'],
        ];
        const x0 = 790, h = 205, y0 = 360, rg = 55;
        // source record
        c.doc(330, 600, 230, { fill: C.tint });
        c.text(330, 800, 'one order', { size: 48, anchor: 'middle', font: 'handBold' });
        c.text(330, 855, 'record', { size: 48, anchor: 'middle', font: 'handBold' });
        items.forEach(([t, b], i) => {
          const col = i % 2, row = Math.floor(i / 2);
          const y = y0 + row * (h + rg);
          const ww = (2290 - x0 - 60) / 2;
          const xx = x0 + col * (ww + 60);
          c.card(xx, y, ww, h, { title: t, body: b, titleSize: 40, bodySize: 34, fill: i === 0 ? C.tint : C.white, pad: 30 });
          c.step(xx + ww - 44, y + 44, i + 1, { r: 26, size: 30 });
        });
        for (let i = 0; i < 6; i++) {
          const col = i % 2, row = Math.floor(i / 2);
          const ww = (2290 - x0 - 60) / 2;
          if (col === 0) c.arrow(470, 600, x0 - 20, y0 + row * (h + rg) + h / 2, { color: C.deep, sw: 3.5, head: 22, bend: (row - 1) * -30 });
        }
        c.text(330, 990, 'same data,', { size: 38, anchor: 'middle', color: C.deep });
        c.text(330, 1040, 'different rules', { size: 38, anchor: 'middle', color: C.deep });
      },
    },
    {
      n: 3, file: 'fig-3-instrument-the-path', title: 'Instrument the path',
      sub: 'a control at every boundary',
      draw(c) {
        const cx = [260, 730, 1200, 1670, 2140];
        const names = ['system of record', 'MCP server', 'agent host', 'model', 'history + memory'];
        const cy = 600, w = 290, h = 120;
        // trace ribbon
        const ty = 440;
        c.line(260, ty, 1200, ty, { stroke: C.blue, sw: 5 });
        [260, 730, 1200].forEach((x) => c.line(x, ty, x, cy - h / 2 - 10, { stroke: C.blue, sw: 4, rough: 0.5 }));
        c.pill(730, ty - 46, 'ONE TRACE ID, END TO END', { size: 26 });
        names.forEach((n, i) => c.node(cx[i], cy, w, h, n, { size: 38, fill: i === 3 ? C.tint : C.white }));
        const gx = [495, 965, 1435, 1905];
        gx.forEach((x, i) => c.arrow(cx[i] + w / 2 + 12, cy, cx[i + 1] - w / 2 - 12, cy, { color: C.ink, sw: 4, head: 22 }));
        const cards = [
          ['enforce policy', 'the caller’s identity follows the request to the backend'],
          ['shape', 'return only the fields the task needs'],
          ['redact', 'mask sensitive fields before they reach the prompt'],
          ['log', 'record what kind of data passed, and what is stored'],
        ];
        cards.forEach(([t, b], i) => {
          const x = gx[i];
          c.step(x, cy - 2, i + 1, { r: 28, size: 32 });
          dashed(c, x, cy + 34, x, 790, { sw: 3, dash: 10, gap: 8 });
          c.card(x - 220, 800, 440, 240, { title: t, body: b, titleSize: 42, bodySize: 32, titleColor: C.deep, pad: 28 });
        });
        c.text(110, 1200, 'For any request: which tool, with what identity, what data came back, where it went next.', { size: 38, color: C.ink });
      },
    },
  ],
};
