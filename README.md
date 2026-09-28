# Comtanix Website

Next.js frontend for Comtanix — IT careers site (Phase 1: frontend only).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/services` | Services |
| `/about` | About (story, values, learning) |
| `/careers` | Open roles |
| `/life` | Life at Comtanix |
| `/apply` | Apply form → WhatsApp |
| `/contact` | Contact & location |

## Configure

Edit `src/lib/config.ts` for WhatsApp, emails, address, hours, socials, and optional `formEndpoint`.

Content data: `src/lib/data/` (services, roles, testimonials, goals).

Design tokens: `docs/DESIGN.md` and `src/app/globals.css`.

## Docs

See [`docs/README.md`](./docs/README.md) for full requirements.
