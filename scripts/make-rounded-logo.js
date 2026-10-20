import sharp from 'sharp';

async function makeRoundedLogo() {
  const size = 128;
  const rx = 110; // Exact squircle curvature of the logo
  const mask = Buffer.from(`
    <svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${rx}" ry="${rx}" fill="#fff"/>
    </svg>
  `);

  await sharp('d:/Workspace/form/public/logo-square.jpg')
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toFile('d:/Workspace/docs-deepm/docs/public/logo.png');

  console.log('Transparent rounded logo successfully generated!');
}

makeRoundedLogo();
