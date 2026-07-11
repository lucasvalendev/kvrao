/**
 * Gera favicons / PWA icons a partir de public/images/caveira-agua.PNG
 * Fundo 100% transparente (preserva alpha do original).
 *
 * Uso: node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "app");
const imagesDir = path.join(publicDir, "images");

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

function resolveSource() {
  const candidates = ["caveira-agua.PNG", "caveira-agua.png"];
  for (const name of candidates) {
    const p = path.join(imagesDir, name);
    if (fs.existsSync(p)) return p;
  }
  throw new Error("Fonte ausente: public/images/caveira-agua.PNG");
}

/** Resize original mantendo alpha — canvas transparente + padding. */
async function makeIconBuffer(src, size, padRatio = 0.06) {
  const pad = Math.max(0, Math.round(size * padRatio));
  const inner = Math.max(1, size - pad * 2);

  const trimmed = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 8 })
    .png()
    .toBuffer();

  const art = await sharp(trimmed)
    .resize(inner, inner, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .ensureAlpha()
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: TRANSPARENT,
    },
  })
    .composite([{ input: art, left: pad, top: pad }])
    .png()
    .toBuffer();
}

async function makeIcon(src, size, outPath, padRatio = 0.06) {
  const buf = await makeIconBuffer(src, size, padRatio);
  fs.writeFileSync(outPath, buf);
  console.log("wrote", path.relative(root, outPath), `(${size}x${size} transparent)`);
}

/** Multi-size ICO com PNGs embutidos (alpha OK em browsers modernos). */
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
  buf.writeUInt16LE(0, 0); // reserved
  buf.writeUInt16LE(1, 2); // type = icon
  buf.writeUInt16LE(count, 4);

  let entryAt = 6;
  for (const e of entries) {
    buf.writeUInt8(e.w, entryAt);
    buf.writeUInt8(e.h, entryAt + 1);
    buf.writeUInt8(0, entryAt + 2); // color palette
    buf.writeUInt8(0, entryAt + 3); // reserved
    buf.writeUInt16LE(1, entryAt + 4); // color planes
    buf.writeUInt16LE(32, entryAt + 6); // bits per pixel
    buf.writeUInt32LE(e.size, entryAt + 8);
    buf.writeUInt32LE(e.offset, entryAt + 12);
    entryAt += 16;
  }

  for (let i = 0; i < blobs.length; i++) {
    blobs[i].copy(buf, entries[i].offset);
  }
  return buf;
}

async function writeSvgIcon(src, outPath) {
  const png = await makeIconBuffer(src, 128, 0.04);
  const b64 = png.toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image width="128" height="128" href="data:image/png;base64,${b64}"/>
</svg>
`;
  fs.writeFileSync(outPath, svg);
  console.log("wrote", path.relative(root, outPath), "(svg transparent)");
}

async function main() {
  const src = resolveSource();
  console.log("source:", path.relative(root, src));

  // App Router — Next serve auto em /icon e /apple-icon
  await makeIcon(src, 32, path.join(appDir, "icon.png"), 0.04);
  await makeIcon(src, 180, path.join(appDir, "apple-icon.png"), 0.04);

  // Public
  await makeIcon(src, 32, path.join(publicDir, "icon-dark-32x32.png"), 0.04);
  await makeIcon(src, 32, path.join(publicDir, "icon-light-32x32.png"), 0.04);
  await makeIcon(src, 32, path.join(publicDir, "favicon-32.png"), 0.04);
  await makeIcon(src, 48, path.join(publicDir, "favicon-48.png"), 0.04);
  await makeIcon(src, 152, path.join(publicDir, "icon-152.png"), 0.05);
  await makeIcon(src, 180, path.join(publicDir, "apple-icon.png"), 0.04);
  await makeIcon(src, 192, path.join(publicDir, "icon-192.png"), 0.05);
  await makeIcon(src, 512, path.join(publicDir, "icon-512.png"), 0.05);

  await writeSvgIcon(src, path.join(publicDir, "icon.svg"));

  // favicon.ico (16 + 32 + 48) — PNG transparent embutido
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const s of sizes) {
    pngs.push({
      size: s,
      buf: await makeIconBuffer(src, s, s <= 16 ? 0.02 : 0.04),
    });
  }
  const ico = buildIco(pngs);
  // remove antes de escrever → evita arquivo travado/cache stale no FS
  for (const p of [
    path.join(appDir, "favicon.ico"),
    path.join(publicDir, "favicon.ico"),
  ]) {
    if (fs.existsSync(p)) fs.unlinkSync(p);
    fs.writeFileSync(p, ico);
  }
  console.log("wrote favicon.ico (16/32/48 transparent)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
