// Usage: node build.mjs [slug]   (renders every figures/*.mjs, or just one slug)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cover, figure, render } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(here, '../../static/images');
const only = process.argv[2];

for (const f of fs.readdirSync(path.join(here, 'figures')).filter((n) => n.endsWith('.mjs')).sort()) {
  const spec = (await import(pathToFileURL(path.join(here, 'figures', f)).href)).default;
  if (only && spec.slug !== only) continue;
  const dir = path.join(outRoot, spec.slug);
  const c = cover(spec.cover);
  spec.cover.motif(c);
  render(c, path.join(dir, 'cover.png'));
  for (const fig of spec.figs) {
    const canvas = figure({ n: fig.n, topic: spec.topic, title: fig.title, sub: fig.sub });
    fig.draw(canvas);
    render(canvas, path.join(dir, `${fig.file}.png`));
  }
  console.log(`rendered ${spec.slug}: cover + ${spec.figs.length} figures`);
}
