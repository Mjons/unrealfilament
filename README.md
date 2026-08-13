# Filament site

The public website for Filament. Deployed to
[unrealfilament.art](https://unrealfilament.art) via Vercel.

## What's here

| Path               | What                                                                            |
| ------------------ | ------------------------------------------------------------------------------- |
| `index.html`       | Landing page                                                                    |
| `about.html`       | Artist + project notes + FAQ                                                    |
| `edition/`         | The 250-piece gallery + image files (WebP × 250 + thumbs)                       |
| `edition/names.js` | Piece names, `tokenId → [Edition half, Twin half]` — see below                  |
| `play/`            | Filament Play (slot machine, free public toy)                                   |
| `metadata/`        | Generated token-metadata CSVs — build output, edit the generator instead        |
| `tools/`           | Build scripts (`build-metadata-csv.cjs`)                                        |
| `assets/`          | Hero, OG image, favicon                                                         |
| `site.css`         | Shared stylesheet (landing + about)                                             |
| `vercel.json`      | Routing rules: `play.unrealfilament.art` rewrite, `www` redirect, cache headers |

## Local preview

```
npx http-server -p 8080 -c-1
```

Then open <http://localhost:8080/>. The `play.` subdomain rewrite only
applies on Vercel; locally, hit `/play/` directly.

## Deploy

Vercel auto-deploys from `main`. Push, wait ~30s, check the
deployment URL Vercel posts.

Domain config (Namecheap → Advanced DNS):

- `A @ → 76.76.21.21`
- `CNAME www → cname.vercel-dns.com`
- `CNAME play → cname.vercel-dns.com`

## Piece names

Every artwork is named: one Italian word, 250 pairs, both halves, 500
names, all distinct. `edition/names.js` is the single source of truth —
`tokenId → [editionName, twinName]`. Names are drawn from each palette's
own world, and the two halves of a pair are counterparts on that
palette's axis (Morandi vessel→breath, Glaciale held→released, …).

Two things to know before editing it:

- **The token metadata generator reads this same file.** Both halves of
  pair N share `pair_id` N but carry their own `name`. Don't fork the
  list into the token JSON.
- **Keep the `?v=` in step.** `vercel.json` serves `.js` as
  `max-age=300, must-revalidate`, so a name change reaches visitors
  within five minutes on its own. The `names.js?v=2` query in
  `edition/index.html` just matches its sibling assets — bump all of
  them together or none.

Sanity check after editing — must print `250 500 none`:

```
node -e 'const N=eval(require("fs").readFileSync("edition/names.js","utf8")+"\nFILAMENT_NAMES");
const all=Object.values(N).flat();
console.log(Object.keys(N).length, all.length, new Set(all).size===500?"none":"DUPES");'
```

## Token metadata CSV

```
node tools/build-metadata-csv.cjs [--ext=webp|png] [--out=metadata]
```

Generates the bulk-upload sheet for the Edition half, in the
`tokenID,name,description,file_name,external_url,attributes[…]` column
convention the common NFT upload templates use. It derives everything
from the two files that already exist — the `EDITION` manifest inside
`edition/index.html` and `edition/names.js` — so **don't hand-edit the
CSVs**; fix the source and re-run. It exits non-zero rather than write a
partial sheet if the manifest and the names disagree.

| Output                             | What                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| `metadata/filament-edition.csv`    | 250 rows, one per Edition piece. This is the upload file.           |
| `metadata/filament-twin-names.csv` | 250 reserved Twin names, for the claim backend. Not an upload file. |

Traits emitted: Palette, Scale, Style, Half, Pair, Twin, Seed. `Pair` is
the `pair_id` the about page promises collectors; `Twin` names the other
half before it exists, which is the whole point of naming both.

Three things to settle before this is minted, because none of them can
be corrected afterwards:

- **`file_name` defaults to the WebPs in this repo** (1500px). Those are
  deploy-ready, not masters. If you're minting the 4K PNGs, run
  `--ext=png` and confirm the stems match the master folder — this
  script can't see outside the repo, it just swaps the extension.
- **`name` is `Brocca #001`** — name first, number second, matching the
  gallery tile. Change the template in `build-metadata-csv.cjs` if you'd
  rather lead with the number.
- **`external_url` is `/edition/#001`**, which the gallery resolves to
  that piece (deep-link handler at the end of the inline script in
  `edition/index.html`). The hash contract and the CSV have to move
  together — if the gallery ever stops honouring `#NNN`, 250 on-chain
  URLs go dead.

Twins are absent from the upload sheet on purpose: there's no render
until a collector rolls one, so their metadata is written at claim time
by the backend. The names are already reserved and fixed to the pair.

## The mint model

Both halves are free. The Edition half is a free mint on OpenSea; the
Twin half is claimed on this site by the wallet already holding its
Edition piece. This replaced a paid 0.038 ETH pair-mint through
`mint.unrealfilament.art` — see `## Pivot leftovers` below for what that
left behind.

## Image regeneration

This repo contains the **deploy-ready** WebPs (1500px full + 600px
thumbs). The canonical 4K source PNGs live outside this repo. To
regenerate the WebPs from source, run the optimization scripts in the
parent project tree.

## Pivot leftovers

The switch from the paid pair-mint to the free OpenSea model is done in
the site copy but **not** on chain or in the backend. Open items:

- **The old mint contract is still deployed and unpaused.**
  `0x89D14bEc7E16166bAf3bF4cEaaA141B8F42d5512` on mainnet, `paused()`
  false, `pricePerPair` still set. Nothing has been minted from it
  (`pairsMinted` reads 1, but that is a next-id counter — `ownerOf` for
  every plausible token id reverts `ERC721NonexistentToken`, and the
  owner's balance is 0). Decide whether to pause it, repurpose it as
  the Twin claim contract, or retire it.
- **`openSeaUrl` is `null` in two places** — `assets/filament-config.js`
  and the gallery's `CHAIN_CONFIG` in `edition/index.html`. Every
  OpenSea CTA hides itself while it is null, so the site is safe to
  deploy as-is, but no one can mint until both are filled. Keep the two
  values identical.
- **`mintBackendUrl` / `mint.unrealfilament.art` is now unused** by the
  public site. The admin dashboard at `/admin` still talks to it.
- **`LAUNCH_COPY` in `edition/index.html`** is placeholder text pending a
  real OpenSea drop date.
- **On-chain state reads are switched off**, via `CHAIN_STATE_ENABLED`
  in `assets/mint-state.js` and `edition/index.html`. They queried the
  retired contract, so the site was flipping itself to "live" and
  advertising the one pair minted in-house ("1 / 250 claimed", plus a
  "minted" chip on tile #001 and 249 shown available). The site now
  sits at pre-launch. Re-enable both flags once the Twin claim contract
  is deployed and the config points at it.
- **The Twin claim contract does not exist yet.** `play/` still stubs the
  handoff — it copies a `/claim?...` link instead of redirecting.

## License

All artwork © Filament / @unrealape. Code MIT.
