import { C, measure } from '../lib.mjs';

const kicker = (c, x, y, s, o = {}) => c.text(x, y, s.toUpperCase(), { font: 'mono', size: o.size ?? 26, color: o.color ?? C.deep, spacing: 4, anchor: o.anchor });

export default {
  slug: 'kubecon-na-2026-recap',
  topic: 'KubeCon NA 2026',
  cover: {
    title: [[['Is the Pod']], [['Still the Unit?', true]]],
    titleSize: 124,
    sub: ['Takeaways from KubeCon in Salt Lake City:', 'sandboxes, agent identity, and inference.'],
    tags: ['kubecon', 'kubernetes', 'agents', 'sandboxing'],
    motif(c) {
      // one pod per agent -> shared workers hosting many actors that suspend when idle
      const y = 620;
      const px = 1400;
      for (let i = 0; i < 3; i++) {
        c.rect(px - 105, y - 150 + i * 105, 210, 84, { r: 16, sw: 4, fill: i === 1 ? C.tint : C.white });
        c.text(px, y - 94 + i * 105, 'pod', { size: 40, anchor: 'middle' });
      }
      c.text(px, y + 215, 'a pod per agent?', { size: 36, anchor: 'middle', color: C.mute });

      c.arrow(px + 150, y, px + 340, y, { color: C.deep, sw: 3.5, head: 20 });
      c.text(px + 245, y - 26, '?', { font: 'handBold', size: 60, anchor: 'middle', color: C.deep });

      // worker hosting many actors, one suspended
      const wx = 2010, wr = 190;
      c.circle(wx, y, wr, { fill: C.white, stroke: C.deep, sw: 4.5, rough: 1 });
      const dots = [[-85, -75], [20, -95], [95, -20], [-105, 20], [-20, 25], [70, 80], [-60, 105]];
      dots.forEach(([dx, dy], i) => {
        if (i === 3) {
          c.raw(`<circle cx="${wx + dx}" cy="${y + dy}" r="30" fill="none" stroke="${C.blue}" stroke-width="3.5" stroke-dasharray="8 9"/>`);
        } else {
          c.circle(wx + dx, y + dy, 30, { fill: C.tint, stroke: C.deep, sw: 3.5, rough: 0.7 });
        }
      });
      c.text(wx - 105, y - 17, 'zzz', { font: 'mono', size: 22, anchor: 'middle', color: C.blue });
      c.text(wx, y + 285 - 70, 'actors on shared workers', { size: 36, anchor: 'middle', color: C.mute });
    },
  },
  figs: [
    {
      n: 1, file: 'fig-1-layers-around-the-pod', title: 'The layers growing up around the pod',
      sub: 'the pod is still the base; everything KubeCon announced for agents sits on top of it',
      draw(c) {
        const layers = [
          { n: 5, title: 'GOVERNANCE', body: 'Who approved what, and can you replay it?', pills: ['AGENT SESSIONS', 'AGENT SUITES'] },
          { n: 4, title: 'IDENTITY AND ACCESS', body: 'Per-session identity; credentials injected at egress', pills: ['SPIFFE / SPIRE', 'AGENTGATEWAY', 'JIT CREDENTIALS'] },
          { n: 3, title: 'SANDBOX AND LIFECYCLE', body: 'Hostile by default; suspend when idle, resume anywhere', pills: ['AGENT SUBSTRATE', 'OPENSHELL', 'AGENT SANDBOX', 'KATA / GVISOR'] },
          { n: 2, title: 'INFERENCE AND TRAINING', body: 'Models served and trained across fleets and clouds', pills: ['LLM-D 1.0', 'KUBERAY', 'OPENRL', 'MODEL PLANE'] },
          { n: 1, title: 'PODS, NODES, SCHEDULER', body: 'Still the base layer, now tuned for 100k nodes', pills: ['KUBERNETES', 'KARPENTER', 'DRA'], base: true },
        ];
        const x = 110, w = 2180, h = 168, gap = 24, y0 = 330;
        layers.forEach((l, i) => {
          const y = y0 + i * (h + gap);
          c.rect(x, y, w, h, { fill: l.base ? C.tint : C.white, stroke: l.base ? C.deep : C.ink, sw: l.base ? 4.5 : 4 });
          c.step(x + 80, y + h / 2, l.n, { r: 36, size: 40 });
          kicker(c, x + 170, y + 66, l.title, { size: 30, color: C.ink });
          c.para(x + 170, y + 118, l.body, 860, { size: 30, color: C.mute, lh: 36 });
          // pills, flowing right from x = 1250
          let px = 1180;
          const py = y + h / 2;
          l.pills.forEach((p) => {
            const pw = measure(p, 'mono', 23, 1.5) + 44;
            c.pill(px + pw / 2, py, p, { size: 23 });
            px += pw + 16;
          });
        });
      },
    },
  ],
};
