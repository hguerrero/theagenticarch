# Diagram generator

Renders post covers (2400×1260) and figures (2400×1440) in the site's hand-drawn style, using rough.js strokes, SVG text, and resvg.

```sh
cd tools/diagrams
npm install
node build.mjs            # every figures/*.mjs
node build.mjs <slug>     # one article → static/images/<slug>/
```

Each article has `figures/<slug>.mjs` exporting `{ slug, topic, cover, figs }`. See `figures/agent-request-is-a-distributed-system.mjs` for a small example and `lib.mjs` for the drawing primitives (`rect`, `card`, `node`, `arrow`, `step`, `check`, `pill`, `para`, …).

After rendering, open every PNG: look for overlapping or clipped text, arrows crossing labels, and text under ~30px (it must stay legible at ~700px display width).

Fonts in `fonts/` are Kalam, DM Sans, and JetBrains Mono (all SIL OFL), as static instances.
