# third-party-poc1 — third-party tool simulator (POC 1)

This repo plays the role of the third-party AI tool in POC 1. The shell at
[`shell-poc1`](../shell-poc1) rebrands this surface from outside without
modifying its source.

Original Forum One starter docs are at [`README.nextjs.md`](README.nextjs.md)
and [`README.project.md`](README.project.md).

## What's modified vs. the starter

- The shell-style header / footer / site container were stripped from
  `app/layout.tsx`. The third party owns only the tool screen.
- `app/page.tsx` is a representative tool page (prompt form, response cards,
  primary/secondary/danger buttons, links) using the starter's existing
  components. Brand changes affect this surface.
- `app/api/theme/route.ts` accepts a DTCG JSON bundle via POST and persists
  to `.data/current-theme.json` (gitignored). GET returns the current bundle.
  CORS is open (`*`) so the shell on port 3000 can POST cross-origin.
- `lib/theme.ts` exposes a DTCG flattener: nested paths join with `-` and
  prefix with `--` to produce CSS custom property names that match the
  third-party token names (e.g., `brand-blue.base` → `--brand-blue-base`).
- `app/layout.tsx` reads `NEXT_PUBLIC_THEME_MODE` and emits either an inline
  `<style id="dtcg-theme">` (Mechanism A) or a `<link rel="stylesheet">`
  (Mechanism B).
- Public Sans is loaded as a font variable so DTCG bundles can reference it
  via `var(--font-public-sans)`.

## Run modes

`.env.local.example` documents the env switches. Three modes:

| `NEXT_PUBLIC_THEME_MODE` | Behavior |
|---|---|
| `none` (default) | Native Forum One brand, no overrides |
| `json` | Reads persisted DTCG bundle on every request, injects `<style>` |
| `link` | Injects `<link rel="stylesheet" href="$NEXT_PUBLIC_SHELL_BRAND_URL">` |

## Run

```
cp .env.local.example .env.local
# edit .env.local to pick a mode
npm install
npm run dev   # serves on http://localhost:3001
```

## Render.com deploy

`render.yaml` is committed. Push to GitHub, connect in Render, accept the
blueprint. Set `NEXT_PUBLIC_THEME_MODE` and `NEXT_PUBLIC_SHELL_BRAND_URL` in
Render env to match whichever mechanism you want to demo on the deployed
URL.
