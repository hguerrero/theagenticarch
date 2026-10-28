import { C, measure, wrap } from '../lib.mjs';

export default {
  slug: 'what-20-years-of-api-design-taught-me-about-agents',
  topic: 'API design and agents',
  cover: {
    title: [[['What ', false], ['20 Years', true]], [['of API Design']], [['Taught Me About']], [['Agents', true]]],
    titleSize: 108,
    sub: ['The consumer changed.', 'The craft did not.'],
    tags: ['apis', 'api design', 'agents', 'MCP'],
    motif(c) {
      const pts = [[1440, 930], [1650, 800], [1860, 700], [2050, 560], [2200, 400]];
      pts.slice(0, -1).forEach(([x, y], i) => {
        const [nx, ny] = pts[i + 1];
        const dx = nx - x, dy = ny - y, len = Math.hypot(dx, dy);
        const k = 62 / len;
        c.arrow(x + dx * k, y + dy * k, nx - dx * k, ny - dy * k, { color: C.deep, sw: 3.5, head: 22, bend: i % 2 ? 24 : -24 });
      });
      [1, 2, 3].forEach((i) => c.circle(pts[i][0], pts[i][1], 34, { fill: C.white }));
      c.circle(pts[0][0], pts[0][1], 60, { fill: C.white, sw: 5 });
      c.person(pts[0][0], pts[0][1] + 6, 62);
      c.circle(pts[4][0], pts[4][1], 66, { fill: C.tint, stroke: C.deep, sw: 5 });
      c.model(pts[4][0], pts[4][1], 80);
      c.text(pts[0][0], pts[0][1] + 125, 'developer', { size: 42, anchor: 'middle' });
      c.text(pts[0][0], pts[0][1] + 175, '2012', { font: 'mono', size: 28, anchor: 'middle', color: C.mute, spacing: 4 });
      c.text(pts[4][0], pts[4][1] - 110, 'machine', { size: 42, anchor: 'middle', color: C.deep });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-same-problem-new-consumer', title: 'Same problem, new consumer',
      sub: 'how capabilities get found, understood, and used',
      draw(c) {
        const eras = ['API design', 'API management', 'developer portals', 'event-driven APIs, AsyncAPI', 'MCP and agents'];
        const w = 370, pitch = 454, x0 = 110 + w / 2;
        const y = 500, h = 170;
        c.line(110, y + 215, 2290, y + 215, { stroke: C.faint, sw: 3, dash: [14, 14], rough: 0.4 });
        eras.forEach((e, i) => {
          const x = x0 + i * pitch;
          const last = i === eras.length - 1;
          c.node(x, y, w, h, e, { size: 42, fill: last ? C.tint : C.white, stroke: last ? C.deep : C.ink, sw: last ? 5 : 4 });
          if (i < eras.length - 1) c.arrow(x + w / 2 + 6, y, x + pitch - w / 2 - 6, y, { sw: 4, head: 22 });
        });
        c.pill(x0, y - h / 2 - 42, '2012', { size: 26 });
        c.text(110, y + 190, 'THE ERAS OF API WORK', { font: 'mono', size: 28, color: C.deep, spacing: 4 });

        // consumer shift
        const cy = 960;
        c.text(110, cy - 100, 'THE CONSUMER', { font: 'mono', size: 28, color: C.deep, spacing: 4 });
        c.person(220, cy + 20, 100);
        c.text(220, cy + 140, 'developer', { size: 40, anchor: 'middle' });
        c.circle(2170, cy + 20, 78, { fill: C.tint, stroke: C.deep, sw: 5 });
        c.model(2170, cy + 20, 100);
        c.text(2170, cy + 140, 'machine', { size: 40, anchor: 'middle', color: C.deep });
        c.arrow(350, cy + 20, 2060, cy + 20, { color: C.deep, sw: 5, head: 34 });
        c.text(1205, cy - 20, 'the reader changes', { size: 44, anchor: 'middle', color: C.deep });
        c.text(1205, cy + 95, 'the question is nearly the same', { size: 38, anchor: 'middle', color: C.mute });
      },
    },
    {
      n: 2, file: 'fig-2-four-lessons', title: 'Four lessons, then and now',
      sub: 'the 2012–13 Building Great APIs series, read for agents',
      draw(c) {
        c.text(110, 345, 'BUILDING GREAT APIS · 2012–13', { font: 'mono', size: 28, color: C.deep, spacing: 4 });
        c.text(1350, 345, 'THE AGENT ERA', { font: 'mono', size: 28, color: C.deep, spacing: 4 });
        const rows = [
          ['Value and a plan', 'the API is a channel into the business', 'Capabilities that finish a task', 'reschedule_delivery, not update_row'],
          ['Simplicity, flexibility, TTFHW', 'atomic operations plus macros', 'Task-shaped tools, safe first call', 'time to first safe action'],
          ['API management', 'access, limits, analytics, kill switch', 'Identity, quotas, usage visibility', 'how you learn what the agent did'],
          ['Great developer support', 'docs, samples, sandbox, people', 'The description is the support', 'plus a test environment and traces'],
        ];
        rows.forEach(([lt, ls, rt, rs], i) => {
          const y = 390 + i * 220, h = 180;
          c.rect(110, y, 960, h, { sw: 4 });
          c.step(185, y + h / 2, ['I', 'II', 'III', 'IV'][i], { r: 38, size: 34, fill: C.white, color: C.ink });
          const lw = 960 - 130 - 30;
          const tl = wrap(lt, lw, 'handBold', 40);
          c.lines(250, y + 68 - (tl.length - 1) * 22, tl, { font: 'handBold', size: 40, lh: 46 });
          c.text(250, y + h - 40, ls, { size: 32, color: C.mute });
          c.arrow(1096, y + h / 2, 1324, y + h / 2, { color: C.deep, sw: 4.5, head: 26 });
          c.rect(1350, y, 940, h, { sw: 4, fill: C.tint, stroke: C.deep });
          const rl = wrap(rt, 940 - 60, 'handBold', 40);
          c.lines(1380, y + 68 - (rl.length - 1) * 22, rl, { font: 'handBold', size: 40, lh: 46, color: C.deep });
          c.text(1380, y + h - 40, rs, { size: 32, color: C.mute });
        });
      },
    },
    {
      n: 3, file: 'fig-3-consumer-shift', title: 'Once for a developer, every run for an agent',
      draw(c) {
        const xs = [740, 1190, 1640, 2090], w = 370, h = 130;
        const dev = ['finds the API', 'reads the docs', 'tries it', 'integrates once'];
        const agent = ['discovers', 'understands', 'selects', 'invokes safely'];
        const lanes = [
          { y: 470, labels: dev, who: 'developer', when: 'once, at design time', fill: C.white, stroke: C.ink },
          { y: 940, labels: agent, who: 'agent', when: 'on every run', fill: C.tint, stroke: C.deep },
        ];
        lanes.forEach((l, li) => {
          if (li === 0) c.person(240, l.y - 40, 90);
          else { c.circle(240, l.y - 50, 58, { fill: C.tint, stroke: C.deep, sw: 4 }); c.model(240, l.y - 50, 76); }
          c.text(240, l.y + 70, l.who, { font: 'handBold', size: 40, anchor: 'middle', color: li ? C.deep : C.ink });
          c.text(240, l.y + 118, l.when, { size: 32, anchor: 'middle', color: C.mute });
          l.labels.forEach((t, i) => {
            c.node(xs[i], l.y, w, h, t, { size: 40, fill: l.fill, stroke: l.stroke });
            if (i < 3) c.arrow(xs[i] + w / 2 + 6, l.y, xs[i + 1] - w / 2 - 6, l.y, { sw: 4, head: 22, color: li ? C.deep : C.ink });
          });
        });
        // what changes, under the agent lane
        const ay = 940 + h / 2 + 30;
        const note = (x1, x2, text) => {
          c.line(x1, ay, x2, ay, { stroke: C.deep, sw: 3.5, rough: 0.5 });
          c.line(x1, ay - 14, x1, ay, { stroke: C.deep, sw: 3.5, rough: 0.5 });
          c.line(x2, ay - 14, x2, ay, { stroke: C.deep, sw: 3.5, rough: 0.5 });
          c.lines((x1 + x2) / 2, ay + 50, wrap(text, x2 - x1 + 60, 'hand', 34), { size: 34, anchor: 'middle', color: C.deep, lh: 40 });
        };
        note(xs[0] - w / 2, xs[0] + w / 2, 'discovery moves to runtime');
        note(xs[1] - w / 2, xs[2] + w / 2, 'judgment moves into the loop');
        note(xs[3] - w / 2, xs[3] + w / 2, 'trust is built in');
        c.line(110, 705, 2290, 705, { stroke: C.faint, sw: 3, dash: [14, 14], rough: 0.4 });
      },
    },
  ],
};
