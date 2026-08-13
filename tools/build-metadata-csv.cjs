#!/usr/bin/env node
/* Build the bulk-upload metadata CSV for the Filament Edition.
 *
 *   node tools/build-metadata-csv.cjs [--ext=webp|png] [--out=metadata]
 *
 * Reads the two sources that already exist and must not be forked:
 *   - edition/index.html  → the EDITION manifest (tokenId, seed, traits,
 *                           filename) that the gallery renders from
 *   - edition/names.js    → tokenId → [Edition name, Twin name]
 *
 * Writes:
 *   - metadata/filament-edition.csv    250 rows, one per Edition piece,
 *                                      in the tokenID/name/description/
 *                                      file_name/external_url/attributes[]
 *                                      column convention used by the
 *                                      common NFT bulk-upload templates.
 *   - metadata/filament-twin-names.csv 250 rows of reserved Twin names.
 *                                      Twins have no render until someone
 *                                      rolls one, so this is a reference
 *                                      sheet for the claim backend, not an
 *                                      upload file.
 *
 * --ext=png rewrites file_name onto the 4K master PNGs (same stem, whose
 * canonical copies live outside this repo). Confirm the stems against the
 * master folder before minting from it — this script cannot see them.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const EXT = args.ext || "webp";
const OUT_DIR = path.join(ROOT, args.out || "metadata");

if (!["webp", "png"].includes(EXT)) {
  console.error(`--ext must be webp or png, got "${EXT}"`);
  process.exit(1);
}

// ---------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------

const html = fs.readFileSync(path.join(ROOT, "edition/index.html"), "utf8");

// The manifest is a plain object literal inside the gallery's inline
// script. Walk braces from `const EDITION = {` to its match rather than
// regexing, so a nested brace in a filename can't truncate the parse.
function extractEditionLiteral(src) {
  const start = src.indexOf("const EDITION = {");
  if (start === -1)
    throw new Error("EDITION manifest not found in edition/index.html");
  const open = src.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) return src.slice(open, i + 1);
  }
  throw new Error("EDITION manifest is unbalanced");
}

const EDITION = eval("(" + extractEditionLiteral(html) + ")");
const NAMES = eval(
  fs.readFileSync(path.join(ROOT, "edition/names.js"), "utf8") +
    "\nFILAMENT_NAMES",
);

const EDITION_HALF = 0;
const TWIN_HALF = 1;
const TOTAL = EDITION.selected.length;

// ---------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------

// One clause per palette, stating the axis its name pairs run along —
// the same axes documented at the top of each block in names.js. Keep
// these two in step: if a palette's axis changes there, change it here.
const PALETTE_AXIS = {
  Morandi: "the vessel and the air around it",
  Montefeltro: "the fortress wall and the gap that lets the light through",
  Carpaccio: "Venetian ceremony and the water that reflects it",
  Appennino: "the ridge you stand on and the valley you stand in",
  Notturno: "night, and the first light that ends it",
  Piero: "measure first, then light",
  Marche: "hills running straight into the Adriatic",
  Pesaro: "the harbour and the open water past it",
  Foglio: "the sheet of paper and the leaf it was named for",
  Raffaello: "the drawing underneath and the colour laid over it",
  Lucente: "the gleam, and what dulls it",
  Fresco: "wet plaster and the pigment that goes in while it holds",
  Terra: "the ground, and what comes out of it",
  Ombra: "the dark place and the small light someone carried in",
  Glaciale: "water held, and water moving again",
  Tramonto: "the going down, and the warmer half of the same fading",
  Murano: "the furnace and the finished glass",
};

const SITE = "https://unrealfilament.art";

const pad = (n) => String(n).padStart(3, "0");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function describe(piece, name, twin) {
  const axis = PALETTE_AXIS[piece.palette];
  if (!axis) throw new Error(`No axis clause for palette "${piece.palette}"`);
  return [
    `${name}, Edition half of pair ${pad(piece.tokenId)} of ${TOTAL}.`,
    `${piece.palette} — ${axis}.`,
    `${cap(piece.scale)} scale, ${piece.style}, rendered deterministically from seed ${piece.seed}.`,
    `Its Twin is ${twin}: free to claim for whoever holds this piece.`,
  ].join(" ");
}

// ---------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------

// RFC 4180: quote anything containing a comma, quote or newline, and
// double any embedded quote. Descriptions are single-line by design, but
// quote defensively rather than assume.
function cell(value) {
  const s = String(value ?? "");
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const toCsv = (rows) =>
  rows.map((r) => r.map(cell).join(",")).join("\r\n") + "\r\n";

const EDITION_COLUMNS = [
  "tokenID",
  "name",
  "description",
  "file_name",
  "external_url",
  "attributes[Palette]",
  "attributes[Scale]",
  "attributes[Style]",
  "attributes[Half]",
  "attributes[Pair]",
  "attributes[Twin]",
  "attributes[Seed]",
];

const editionRows = [EDITION_COLUMNS];
const twinRows = [["pair_id", "twin_name", "edition_name", "palette"]];
const problems = [];

for (const piece of EDITION.selected) {
  const pair = NAMES[piece.tokenId];
  if (!pair) {
    problems.push(`#${piece.tokenId} has no entry in names.js`);
    continue;
  }
  const [name, twin] = pair;
  const file = piece.filename.replace(/\.webp$/, "." + EXT);

  editionRows.push([
    piece.tokenId,
    `${name} #${pad(piece.tokenId)}`,
    describe(piece, name, twin),
    file,
    `${SITE}/edition/#${pad(piece.tokenId)}`,
    piece.palette,
    cap(piece.scale),
    cap(piece.style),
    "Edition",
    piece.tokenId,
    twin,
    piece.seed,
  ]);

  twinRows.push([piece.tokenId, twin, name, piece.palette]);
}

if (problems.length) {
  console.error("Refusing to write — the manifest and names.js disagree:");
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const editionPath = path.join(OUT_DIR, "filament-edition.csv");
const twinPath = path.join(OUT_DIR, "filament-twin-names.csv");
fs.writeFileSync(editionPath, toCsv(editionRows), "utf8");
fs.writeFileSync(twinPath, toCsv(twinRows), "utf8");

console.log(
  `${path.relative(ROOT, editionPath)}    ${editionRows.length - 1} rows, file_name ext .${EXT}`,
);
console.log(`${path.relative(ROOT, twinPath)}  ${twinRows.length - 1} rows`);
