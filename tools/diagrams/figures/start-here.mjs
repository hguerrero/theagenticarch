import { C } from '../lib.mjs';

// Cover only: the two inline figures in static/images/start-here/ are kept as-is.
export default {
  slug: 'start-here',
  topic: 'Start here',
  cover: {
    title: [[['The Agentic']], [['Architect:']], [['Start Here', true]]],
    titleSize: 132,
    sub: ['Six essays on the architecture beneath useful,', 'trustworthy AI agents, in reading order.'],
    tags: ['APIs', 'events', 'context', 'memory', 'control'],
    motif(c) {
      const cx = 1900, cy = 700, R = 330;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
      });
      pts.forEach(([x, y], i) => c.arrow(cx, cy, x, y, { color: C.deep, sw: 3.5, bend: i % 2 ? 24 : -24, head: 20 }));
      pts.forEach(([x, y], i) => {
        c.circle(x, y, 56, { fill: i === 5 ? C.tint : C.white, hatch: i === 5 });
        c.text(x, y + 12, `0${i + 1}`, { font: 'mono', size: 34, anchor: 'middle' });
      });
      c.circle(cx, cy, 110, { fill: C.white, sw: 5 });
      c.text(cx, cy + 16, 'agent', { size: 56, anchor: 'middle' });
    },
  },
  figs: [],
};
