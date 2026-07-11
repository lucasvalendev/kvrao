/**
 * Gera favicons + OG a partir de public/images/caveira-agua.PNG
 * ICO clássico BMP 32-bit (Windows Explorer lê; PNG-in-ICO às vezes falha no preview).
 * Alpha preservado.
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

/** Arte redimensionada, alpha preservado, canvas transparente. */
async function makeRgba(src, size, padRatio = 0.04) {
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
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Canvas transparente size×size RGBA
  const canvas = Buffer.alloc(size * size * 4, 0);
  const left = pad;
  const top = pad;
  const aw = art.info.width;
  const ah = art.info.height;
  // center se resize deu folga
  const ox = left + Math.floor((inner - aw) / 2);
  const oy = top + Math.floor((inner - ah) / 2);

  for (let y = 0; y < ah; y++) {
    for (let x = 0; x < aw; x++) {
      const si = (y * aw + x) * 4;
      const dx = ox + x;
      const dy = oy + y;
      if (dx < 0 || dy < 0 || dx >= size || dy >= size) continue;
      const di = (dy * size + dx) * 4;
      canvas[di] = art.data[si];
      canvas[di + 1] = art.data[si + 1];
      canvas[di + 2] = art.data[si + 2];
      canvas[di + 3] = art.data[si + 3];
    }
  }

  return { rgba: canvas, size };
}

async function makePngBuffer(src, size, padRatio = 0.04) {
  const { rgba } = await makeRgba(src, size, padRatio);
  return sharp(rgba, { raw: { width: size, height: size, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writePng(src, size, outPath, padRatio = 0.04) {
  const buf = await makePngBuffer(src, size, padRatio);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  atomicWrite(outPath, buf);
  console.log("wrote", path.relative(root, outPath), `(${size}x${size} α)`);
  return buf;
}

function atomicWrite(outPath, buf) {
  const tmp = outPath + ".tmp-" + process.pid;
  if (fs.existsSync(outPath)) {
    try {
      fs.unlinkSync(outPath);
    } catch {
      /* locked — overwrite below */
    }
  }
  fs.writeFileSync(tmp, buf);
  fs.renameSync(tmp, outPath);
}

/**
 * Converte RGBA top-down → BITMAP (ICO): BITMAPINFOHEADER + BGRA bottom-up + AND mask.
 * Formato que o Windows Explorer entende de verdade.
 */
function rgbaToIcoBmp(rgba, size) {
  // biHeight = size * 2 (XOR bitmap + AND mask)
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // biSize
  header.writeInt32LE(size, 4); // biWidth
  header.writeInt32LE(size * 2, 8); // biHeight
  header.writeUInt16LE(1, 12); // planes
  header.writeUInt16LE(32, 14); // bitCount
  header.writeUInt32LE(0, 16); // BI_RGB
  header.writeUInt32LE(size * size * 4, 20); // biSizeImage (XOR only; mask separate)
  // rest 0

  // XOR: BGRA bottom-up
  const xor = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    const srcY = size - 1 - y;
    for (let x = 0; x < size; x++) {
      const si = (srcY * size + x) * 4;
      const di = (y * size + x) * 4;
      xor[di] = rgba[si + 2]; // B
      xor[di + 1] = rgba[si + 1]; // G
      xor[di + 2] = rgba[si]; // R
      xor[di + 3] = rgba[si + 3]; // A
    }
  }

  // AND mask: 1 bit/pixel, rows padded to 32 bits. 0 = show XOR pixel.
  const andStride = Math.ceil(size / 32) * 4;
  const andMask = Buffer.alloc(andStride * size, 0x00);
  for (let y = 0; y < size; y++) {
    const srcY = size - 1 - y; // mask also bottom-up
    for (let x = 0; x < size; x++) {
      const a = rgba[(srcY * size + x) * 4 + 3];
      if (a < 128) {
        // transparent → set AND bit to 1
        const byteIndex = y * andStride + (x >> 3);
        const bit = 7 - (x & 7);
        andMask[byteIndex] |= 1 << bit;
      }
    }
  }

  return Buffer.concat([header, xor, andMask]);
}

/** ICO multi-size com BMP 32-bit (compat Windows + browsers). */
async function buildClassicIco(src, sizes) {
  const images = [];
  for (const s of sizes) {
    const pad = s <= 16 ? 0.02 : s <= 32 ? 0.03 : 0.04;
    const { rgba, size } = await makeRgba(src, s, pad);
    const bmp = rgbaToIcoBmp(rgba, size);
    images.push({ size: s, buf: bmp });
  }

  // Maior primeiro
  images.sort((a, b) => b.size - a.size);

  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];

  for (const img of images) {
    entries.push({
      w: img.size >= 256 ? 0 : img.size,
      h: img.size >= 256 ? 0 : img.size,
      bytes: img.buf.length,
      offset,
      buf: img.buf,
      size: img.size,
    });
    offset += img.buf.length;
  }

  const out = Buffer.alloc(offset);
  out.writeUInt16LE(0, 0);
  out.writeUInt16LE(1, 2); // ICON
  out.writeUInt16LE(count, 4);

  let entryAt = 6;
  for (const e of entries) {
    out.writeUInt8(e.w, entryAt);
    out.writeUInt8(e.h, entryAt + 1);
    out.writeUInt8(0, entryAt + 2);
    out.writeUInt8(0, entryAt + 3);
    out.writeUInt16LE(1, entryAt + 4); // planes
    out.writeUInt16LE(32, entryAt + 6); // bitCount
    out.writeUInt32LE(e.bytes, entryAt + 8);
    out.writeUInt32LE(e.offset, entryAt + 12);
    entryAt += 16;
  }

  for (const e of entries) {
    e.buf.copy(out, e.offset);
  }

  return out;
}

async function writeIco(src, outPaths) {
  // 256 BMP ICO é grande; Windows gosta 16/32/48; browsers usam 32/48
  const sizes = [16, 32, 48, 64, 128, 256];
  const ico = await buildClassicIco(src, sizes);
  for (const out of outPaths) {
    atomicWrite(out, ico);
    console.log(
      "wrote",
      path.relative(root, out),
      `(ICO BMP ${sizes.join("/")} α ${ico.length} bytes)`,
    );
  }
  return ico;
}

async function writeSvg(src, outPath) {
  const png = await makePngBuffer(src, 256, 0.04);
  const b64 = png.toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <image width="256" height="256" href="data:image/png;base64,${b64}"/>
</svg>
`;
  atomicWrite(outPath, Buffer.from(svg, "utf8"));
  console.log("wrote", path.relative(root, outPath), "(svg α)");
}

async function writeOgImage(src, outPath) {
  const W = 1200;
  const H = 630;
  const artSize = 520;

  const trimmed = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 8 })
    .png()
    .toBuffer();

  const art = await sharp(trimmed)
    .resize(artSize, artSize, {
      fit: "contain",
      background: TRANSPARENT,
    })
    .png()
    .toBuffer();

  const left = Math.round((W - artSize) / 2);
  const top = Math.round((H - artSize) / 2);

  const buf = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 12, g: 14, b: 20, alpha: 1 },
    },
  })
    .composite([{ input: art, left, top }])
    .png()
    .toBuffer();

  atomicWrite(outPath, buf);
  console.log("wrote", path.relative(root, outPath), `(OG ${W}x${H})`);
}

async function main() {
  const src = resolveSource();
  console.log("source:", path.relative(root, src));
  console.log("source abs:", path.resolve(src));

  // NÃO gravar app/favicon.ico (Next cache eterno sem hash)
  const sticky = path.join(appDir, "favicon.ico");
  if (fs.existsSync(sticky)) {
    fs.unlinkSync(sticky);
    console.log("removed app/favicon.ico");
  }

  await writePng(src, 32, path.join(appDir, "icon.png"), 0.03);
  await writePng(src, 180, path.join(appDir, "apple-icon.png"), 0.04);

  // FORÇA sobrescrever public/favicon.ico + aliases
  await writeIco(src, [
    path.join(publicDir, "favicon.ico"),
    path.join(publicDir, "kvrao.ico"),
  ]);

  await writePng(src, 16, path.join(publicDir, "favicon-16.png"), 0.02);
  await writePng(src, 32, path.join(publicDir, "favicon-32.png"), 0.03);
  await writePng(src, 48, path.join(publicDir, "favicon-48.png"), 0.03);
  await writePng(src, 32, path.join(publicDir, "icon-dark-32x32.png"), 0.03);
  await writePng(src, 32, path.join(publicDir, "icon-light-32x32.png"), 0.03);
  await writePng(src, 152, path.join(publicDir, "icon-152.png"), 0.04);
  await writePng(src, 180, path.join(publicDir, "apple-icon.png"), 0.04);
  await writePng(src, 192, path.join(publicDir, "icon-192.png"), 0.04);
  await writePng(src, 512, path.join(publicDir, "icon-512.png"), 0.04);

  await writeSvg(src, path.join(publicDir, "icon.svg"));
  await writeOgImage(src, path.join(publicDir, "og.png"));
  await writePng(src, 1200, path.join(publicDir, "og-square.png"), 0.06);

  // limpa debug
  for (const f of fs.readdirSync(publicDir)) {
    if (f.startsWith("_")) {
      try {
        fs.unlinkSync(path.join(publicDir, f));
      } catch {
        /* ignore */
      }
    }
  }

  // prova final
  const fav = path.join(publicDir, "favicon.ico");
  const st = fs.statSync(fav);
  console.log("\n=== PROVA ===");
  console.log("public/favicon.ico", st.size, "bytes", st.mtime.toISOString());
  console.log("path:", path.resolve(fav));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
