// Drawing kit for post covers and figures: rough.js strokes + SVG text,
// rasterised with resvg. Matches the hand-drawn look of the existing images.
import rough from 'roughjs';
import { Resvg } from '@resvg/resvg-js';
import opentype from 'opentype.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const fontDir = path.join(here, 'fonts');
const logoPath = path.join(here, '../../static/theagenticarch-logo.png');

export const C = {
  ink: '#0e1a2c',
  blue: '#1ba8e3',
  deep: '#14759f',
  mute: '#556577',
  faint: '#d3dfe9',
  grid: '#e6edf4',
  bg: '#f6f9fc',
  white: '#ffffff',
  tint: '#e3f3fb',
  warn: '#d9822b',
  warnTint: '#fbeedd',
};

// font key -> { family, weight, file used for measuring }
const FONTS = {
  hand: { family: 'Kalam', weight: 400, file: 'Kalam-Regular.ttf' },
  handBold: { family: 'Kalam', weight: 700, file: 'Kalam-Bold.ttf' },
  sans: { family: 'DM Sans', weight: 400, file: 'DMSans-400.ttf' },
  sansBold: { family: 'DM Sans', weight: 700, file: 'DMSans-700.ttf' },
  mono: { family: 'JetBrains Mono', weight: 400, file: 'JetBrainsMono-400.ttf' },
  monoMed: { family: 'JetBrains Mono', weight: 500, file: 'JetBrainsMono-500.ttf' },
};
const loaded = {};
function metrics(key) {
  return (loaded[key] ??= opentype.loadSync(path.join(fontDir, FONTS[key].file)));
}
export function measure(str, font = 'hand', size = 40, spacing = 0) {
  return metrics(font).getAdvanceWidth(str, size) + spacing * str.length;
}
/** Greedy word wrap to maxW pixels. Returns an array of lines. */
export function wrap(str, maxW, font = 'hand', size = 40) {
  const out = [];
  for (const para of String(str).split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (line && measure(next, font, size) > maxW) { out.push(line); line = word; } else line = next;
    }
    out.push(line);
  }
  return out;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const gen = rough.generator();

export class Canvas {
  constructor(w, h, seed = 7) {
    this.w = w; this.h = h; this.seed = seed; this.parts = [];
  }
  nextSeed() { return (this.seed = (this.seed * 16807) % 2147483647); }
  raw(s) { this.parts.push(s); return this; }

  _rough(drawable, dash) {
    const da = dash ? ` stroke-dasharray="${dash.join(' ')}"` : '';
    for (const p of gen.toPaths(drawable)) {
      this.parts.push(
        `<path d="${p.d}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"${da}/>`,
      );
    }
  }
  _opts(o = {}) {
    return { stroke: o.stroke ?? C.ink, strokeWidth: o.sw ?? 4, roughness: o.rough ?? 1.1, bowing: o.bow ?? 1, seed: this.nextSeed(), fill: undefined };
  }

  /** Faint engineering-paper grid. */
  grid(step = 48) {
    let d = '';
    for (let x = 0; x <= this.w; x += step) d += `M${x} 0V${this.h}`;
    for (let y = 0; y <= this.h; y += step) d += `M0 ${y}H${this.w}`;
    this.raw(`<path d="${d}" stroke="${C.grid}" stroke-width="1.5" fill="none"/>`);
  }

  line(x1, y1, x2, y2, o = {}) {
    this._rough(gen.line(x1, y1, x2, y2, this._opts(o)), o.dash);
    return this;
  }

  /** Arrow with optional bend (perpendicular offset of the control point). */
  arrow(x1, y1, x2, y2, o = {}) {
    const color = o.color ?? C.ink;
    const head = o.head ?? 30;
    const bend = o.bend ?? 0;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    const cx = mx + (-dy / len) * bend, cy = my + (dx / len) * bend;
    const op = this._opts({ ...o, stroke: color });
    this._rough(bend ? gen.path(`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, op) : gen.line(x1, y1, x2, y2, op), o.dash);
    const ang = bend ? Math.atan2(y2 - cy, x2 - cx) : Math.atan2(dy, dx);
    for (const s of [-1, 1]) {
      const a = ang + Math.PI + s * 0.45;
      this._rough(gen.line(x2, y2, x2 + Math.cos(a) * head, y2 + Math.sin(a) * head, this._opts({ ...o, stroke: color, rough: 0.8 })));
    }
    return this;
  }

  rect(x, y, w, h, o = {}) {
    const r = Math.min(o.r ?? 24, w / 2, h / 2);
    const d = `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
    const fill = o.fill ?? C.white;
    if (fill !== 'none') this.raw(`<path d="${d}" fill="${fill}"/>`);
    this._rough(gen.path(d, this._opts(o)), o.dashed ? [18, 14] : undefined);
    return this;
  }

  circle(cx, cy, r, o = {}) {
    const fill = o.fill ?? C.white;
    if (fill !== 'none') this.raw(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`);
    this._rough(gen.circle(cx, cy, r * 2, this._opts(o)));
    if (o.hatch) {
      const op = { ...this._opts({ ...o, sw: 3, stroke: o.stroke ?? C.blue }), fill: o.stroke ?? C.blue, fillStyle: 'hachure', hachureGap: 14, hachureAngle: -40, stroke: 'none' };
      this._rough(gen.circle(cx, cy, r * 2 - 8, op));
    }
    return this;
  }

  /** Text. anchor: start|middle|end. */
  text(x, y, str, o = {}) {
    const f = FONTS[o.font ?? 'hand'];
    const ls = o.spacing ? ` letter-spacing="${o.spacing}"` : '';
    const op = o.opacity ? ` opacity="${o.opacity}"` : '';
    this.parts.push(
      `<text x="${x}" y="${y}" font-family="${f.family}" font-weight="${f.weight}" font-size="${o.size ?? 40}" fill="${o.color ?? C.ink}" text-anchor="${o.anchor ?? 'start'}"${ls}${op}>${esc(str)}</text>`,
    );
    return this;
  }
  /** Several lines; returns y of the baseline after the last line. */
  lines(x, y, arr, o = {}) {
    const lh = o.lh ?? (o.size ?? 40) * 1.28;
    arr.forEach((s, i) => this.text(x, y + i * lh, s, o));
    return y + arr.length * lh;
  }
  /** Wrap text into maxW and draw. Returns the next free baseline y. */
  para(x, y, str, maxW, o = {}) {
    const arr = wrap(str, maxW, o.font ?? 'hand', o.size ?? 40);
    return this.lines(x, y, arr, o);
  }

  /** Rounded card with a title and wrapped body. */
  card(x, y, w, h, o = {}) {
    this.rect(x, y, w, h, o);
    const pad = o.pad ?? 28;
    let ty = y + pad + (o.titleSize ?? 40) * 0.8;
    if (o.title) {
      const tl = wrap(o.title, w - pad * 2, o.titleFont ?? 'handBold', o.titleSize ?? 40);
      ty = this.lines(x + pad, ty, tl, { font: o.titleFont ?? 'handBold', size: o.titleSize ?? 40, color: o.titleColor ?? C.ink });
      ty += 2;
    }
    if (o.body) this.para(x + pad, ty + 4, o.body, w - pad * 2, { font: 'hand', size: o.bodySize ?? 32, color: o.bodyColor ?? C.mute });
    return this;
  }

  /** Centered label node. */
  node(cx, cy, w, h, label, o = {}) {
    this.rect(cx - w / 2, cy - h / 2, w, h, o);
    const size = o.size ?? 38;
    const arr = wrap(label, w - 40, o.font ?? 'hand', size);
    const lh = size * 1.22;
    const top = cy - ((arr.length - 1) * lh) / 2 + size * 0.3 - (o.sub ? 14 : 0);
    arr.forEach((s, i) => this.text(cx, top + i * lh, s, { font: o.font ?? 'hand', size, color: o.color ?? C.ink, anchor: 'middle' }));
    if (o.sub) this.text(cx, cy + h / 2 - 16, o.sub, { font: 'mono', size: 22, color: C.mute, anchor: 'middle', spacing: 1 });
    return this;
  }

  /** Numbered step bubble. */
  step(cx, cy, n, o = {}) {
    const r = o.r ?? 30;
    this.circle(cx, cy, r, { fill: o.fill ?? C.blue, stroke: o.stroke ?? C.ink, sw: 3.5 });
    this.text(cx, cy + (o.size ?? 34) * 0.35, String(n), { font: 'handBold', size: o.size ?? 34, color: o.color ?? C.white, anchor: 'middle' });
    return this;
  }

  /** Checkbox with tick. */
  check(x, y, s = 44, o = {}) {
    this.rect(x, y, s, s, { r: 8, sw: 3.5, fill: C.white });
    this._rough(gen.linearPath([[x + s * 0.2, y + s * 0.55], [x + s * 0.42, y + s * 0.78], [x + s * 0.88, y + s * 0.12]], this._opts({ stroke: o.color ?? C.blue, sw: 6 })));
    return this;
  }
  cross(x, y, s = 44, o = {}) {
    this.rect(x, y, s, s, { r: 8, sw: 3.5, fill: C.white });
    const c = o.color ?? C.warn;
    this._rough(gen.line(x + s * 0.22, y + s * 0.22, x + s * 0.78, y + s * 0.78, this._opts({ stroke: c, sw: 6 })));
    this._rough(gen.line(x + s * 0.78, y + s * 0.22, x + s * 0.22, y + s * 0.78, this._opts({ stroke: c, sw: 6 })));
    return this;
  }

  /** Small mono pill label. */
  pill(cx, cy, label, o = {}) {
    const size = o.size ?? 24;
    const w = measure(label, 'mono', size, 1.5) + 44, h = size + 28;
    this.rect(cx - w / 2, cy - h / 2, w, h, { r: h / 2, fill: o.fill ?? C.tint, stroke: o.stroke ?? C.deep, sw: 3 });
    this.text(cx, cy + size * 0.35, label, { font: 'mono', size, color: o.color ?? C.deep, anchor: 'middle', spacing: 1.5 });
    return this;
  }

  // ---- glyphs -------------------------------------------------------------
  person(cx, cy, s = 70, o = {}) {
    this.circle(cx, cy - s * 0.55, s * 0.28, { fill: o.fill ?? C.white, sw: 3.5 });
    this._rough(gen.path(`M${cx - s * 0.5} ${cy + s * 0.55}Q${cx - s * 0.5} ${cy - s * 0.1} ${cx} ${cy - s * 0.1}Q${cx + s * 0.5} ${cy - s * 0.1} ${cx + s * 0.5} ${cy + s * 0.55}`, this._opts({ sw: 3.5 })));
    return this;
  }
  /** Stack-of-slabs "server" glyph. */
  server(cx, cy, s = 80, o = {}) {
    const w = s * 1.2, h = s * 0.4;
    for (let i = 0; i < 3; i++) {
      const y = cy - s * 0.65 + i * (h + 8);
      this.rect(cx - w / 2, y, w, h, { r: 8, sw: 3.5, fill: o.fill ?? C.white });
      this.circle(cx - w / 2 + 20, y + h / 2, 5, { fill: C.blue, sw: 2 });
    }
    return this;
  }
  /** Spark / model glyph: circle with radiating ticks. */
  model(cx, cy, s = 70, o = {}) {
    this.circle(cx, cy, s * 0.36, { fill: o.fill ?? C.tint, stroke: C.deep, sw: 4 });
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4, r1 = s * 0.5, r2 = s * 0.68;
      this.line(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, { stroke: C.blue, sw: 4, rough: 0.6 });
    }
    return this;
  }
  doc(cx, cy, s = 70, o = {}) {
    const w = s * 0.8, h = s;
    this.rect(cx - w / 2, cy - h / 2, w, h, { r: 8, sw: 3.5, fill: o.fill ?? C.white });
    for (let i = 0; i < 3; i++) this.line(cx - w * 0.28, cy - h * 0.22 + i * h * 0.22, cx + w * 0.28, cy - h * 0.22 + i * h * 0.22, { stroke: C.blue, sw: 3.5, rough: 0.5 });
    return this;
  }

  svg() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${this.w}" height="${this.h}" viewBox="0 0 ${this.w} ${this.h}">${this.parts.join('')}</svg>`;
  }
}

/** Standard figure frame. Content area is roughly x 110..2290, y 270..1290. */
export function figure({ n, topic, title, sub }) {
  const c = new Canvas(2400, 1440, 11 + n * 3);
  c.raw(`<rect width="2400" height="1440" fill="${C.bg}"/>`);
  c.grid();
  c.text(110, 100, `FIG ${n} • ${topic.toUpperCase()}`, { font: 'mono', size: 28, color: C.deep, spacing: 5 });
  c.text(110, 205, title, { font: 'hand', size: 88, color: C.ink });
  if (sub) c.text(114, 270, sub, { font: 'hand', size: 40, color: C.mute });
  c.text(110, 1385, 'THE AGENTIC ARCHITECT', { font: 'mono', size: 26, color: C.mute, spacing: 5 });
  return c;
}

/**
 * Cover frame. title: array of lines, each line an array of [text, accent?].
 * Returns the canvas; call motif drawing in the right half (x 1200..2300).
 */
export function cover({ title, titleSize = 132, sub, tags, seed = 5 }) {
  const c = new Canvas(2400, 1260, seed);
  c.raw(`<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfdff"/><stop offset="1" stop-color="#eef5fa"/></linearGradient><radialGradient id="glow"><stop offset="0" stop-color="#9fdcf5" stop-opacity=".55"/><stop offset="1" stop-color="#9fdcf5" stop-opacity="0"/></radialGradient></defs>`);
  c.raw(`<rect width="2400" height="1260" fill="url(#bg)"/>`);
  c.grid(60);
  for (const r of [420, 640, 880]) c.raw(`<circle cx="1900" cy="700" r="${r}" fill="none" stroke="#c5d9e8" stroke-width="2"/>`);
  c.raw(`<circle cx="1900" cy="700" r="520" fill="url(#glow)"/>`);
  // brand
  const logo = fs.readFileSync(logoPath).toString('base64');
  c.raw(`<circle cx="160" cy="175" r="68" fill="#9fdcf5" opacity=".5"/><clipPath id="lg"><circle cx="160" cy="175" r="58"/></clipPath><image x="102" y="117" width="116" height="116" clip-path="url(#lg)" href="data:image/png;base64,${logo}"/>`);
  c.text(262, 188, 'THE AGENTIC ARCHITECT', { font: 'mono', size: 32, color: C.ink, spacing: 7 });
  // title
  let y = 410;
  for (const line of title) {
    let x = 128;
    for (const [t, accent] of line) {
      c.text(x, y, t, { font: 'sansBold', size: titleSize, color: accent ? '#1a8fc0' : C.ink, spacing: -2 });
      x += measure(t, 'sansBold', titleSize) * 1.02 - 2 * t.length;
    }
    y += titleSize * 1.1;
  }
  if (sub) c.lines(130, y + 40, sub, { font: 'sans', size: 44, color: '#47576a', lh: 66 });
  if (tags) c.text(130, 1175, tags.join('  •  ').toUpperCase(), { font: 'mono', size: 30, color: C.mute, spacing: 4 });
  return c;
}

export function render(canvas, outPath, { width } = {}) {
  const resvg = new Resvg(canvas.svg(), {
    font: {
      loadSystemFonts: false,
      fontFiles: fs.readdirSync(fontDir).filter((f) => f.endsWith('.ttf')).map((f) => path.join(fontDir, f)),
      defaultFontFamily: 'DM Sans',
    },
    fitTo: { mode: 'width', value: width ?? canvas.w },
  });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, resvg.render().asPng());
}
