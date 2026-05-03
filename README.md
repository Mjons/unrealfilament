# Filament site

The public website for Filament. Deployed to
[unrealfilament.art](https://unrealfilament.art) via Vercel.

## What's here

| Path          | What                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| `index.html`  | Landing page                                                                    |
| `about.html`  | Artist + project notes + FAQ                                                    |
| `edition/`    | The 250-piece gallery + image files (WebP × 250 + thumbs)                       |
| `play/`       | Filament Play (slot machine, free public toy)                                   |
| `assets/`     | Hero, OG image, favicon                                                         |
| `site.css`    | Shared stylesheet (landing + about)                                             |
| `vercel.json` | Routing rules: `play.unrealfilament.art` rewrite, `www` redirect, cache headers |

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

## Image regeneration

This repo contains the **deploy-ready** WebPs (1500px full + 600px
thumbs). The canonical 4K source PNGs live outside this repo. To
regenerate the WebPs from source, run the optimization scripts in the
parent project tree.

## License

All artwork © Filament / @unrealape. Code MIT.
