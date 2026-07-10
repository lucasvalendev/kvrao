import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public", "images", "caveira-agua.png");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");

const BG = { r: 15, g: 17, b: 24, alpha: 1 }; // #0f1118

async function makeIcon(size, outPath) {
  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const skull = await sharp(src)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: skull, left: pad, top: pad }])
    .png()
    .toFile(outPath);

  console.log("wrote", path.relative(root, outPath), `(${size}x${size})`);
}

async function makeIconBuffer(size) {
  const pad = Math.round(size * 0.08);
  const inner = size - pad * 2;
  const skull = await sharp(src)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: skull, left: pad, top: pad }])
    .png()
    .toBuffer();
}

/** Multi-size ICO from embedded PNG images */
function buildIco(images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  const blobs = [];

  for (const img of images) {
    const data = img.buf;
    const w = img.size >= 256 ? 0 : img.size;
    const h = img.size >= 256 ? 0 : img.size;
    entries.push({ w, h, size: data.length, offset });
    blobs.push(data);
    offset += data.length;
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);

  let entryAt = 6;
  for (const e of entries) {
    buf.writeUInt8(e.w, entryAt);
    buf.writeUInt8(e.h, entryAt + 1);
    buf.writeUInt8(0, entryAt + 2);
    buf.writeUInt8(0, entryAt + 3);
    buf.writeUInt16LE(1, entryAt + 4);
    buf.writeUInt16LE(32, entryAt + 6);
    buf.writeUInt32LE(e.size, entryAt + 8);
    buf.writeUInt32LE(e.offset, entryAt + 12);
    entryAt += 16;
  }

  for (let i = 0; i < blobs.length; i++) {
    blobs[i].copy(buf, entries[i].offset);
  }
  return buf;
}

async function main() {
  if (!fs.existsSync(src)) {
    throw new Error(`Source missing: ${src}`);
  }

  // App Router icons (Next serves these automatically)
  await makeIcon(32, path.join(appDir, "icon.png"));
  await makeIcon(180, path.join(appDir, "apple-icon.png"));

  // Public assets
  await makeIcon(32, path.join(publicDir, "icon-dark-32x32.png"));
  await makeIcon(32, path.join(publicDir, "icon-light-32x32.png"));
  await makeIcon(180, path.join(publicDir, "apple-icon.png"));
  await makeIcon(192, path.join(publicDir, "icon-192.png"));
  await makeIcon(512, path.join(publicDir, "icon-512.png"));

  // favicon.ico (16 + 32 + 48)
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const s of sizes) {
    pngs.push({ size: s, buf: await makeIconBuffer(s) });
  }
  const ico = buildIco(pngs);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log("wrote favicon.ico (16/32/48)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
