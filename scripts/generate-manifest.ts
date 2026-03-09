import fs from 'fs';
import path from 'path';
import { SEGMENTS } from '../lib/config/segments';
import { generateManifest } from '../lib/content/mdx';

// Write the manifest
const manifest = generateManifest();
const outPath = path.join(process.cwd(), 'public', 'api', 'manifest.json');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));

const totalArticles = Object.values(manifest.segments).flat().length;
console.log(`✓ Manifest written — ${totalArticles} articles across ${SEGMENTS.length} segments`);
console.log(`  Output: ${outPath}`);
