import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.resolve(__dirname, '../docs/public/images');

async function convertDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDirectory(fullPath);
    } else if (entry.name.endsWith('.png')) {
      const webpPath = fullPath.replace(/\.png$/, '.webp');
      console.log(`Converting ${entry.name} -> ${path.basename(webpPath)}`);
      await sharp(fullPath)
        .webp({ quality: 85 })
        .toFile(webpPath);
    }
  }
}

async function run() {
  console.log('Converting all PNGs to optimized WebP...');
  await convertDirectory(IMAGES_DIR);
  console.log('Conversion complete!');
}

run();
