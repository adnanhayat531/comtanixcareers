# 02 — Tech Stack (Phase 1 Frontend)

## Required

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js** (App Router) | Frontend only |
| Language | TypeScript | Preferred |
| Styling | Tailwind CSS v3+ | Map tokens from `DESIGN.md` into theme |
| Fonts | **Sora** (headings), **Public Sans** (body) | `next/font/google` |
| Icons | Material Symbols Outlined (design ref) **or** lucide-react equivalents | Keep thin, institutional look |
| Images | `next/image` | Logo + office photo when available |

## Not required in Phase 1

- Backend (Node API routes only if needed for form proxy later)
- Database / ORM
- Auth libraries
- CMS
- State libraries (use React state / URL only)

## Project layout (suggested)

```
app/
  layout.tsx          # fonts, shell, WhatsApp float
  page.tsx            # Home
  services/page.tsx
  services/[slug]/page.tsx   # optional deep links
  about/page.tsx      # story / values / learning sections or nested routes
  careers/page.tsx
  life/page.tsx       # Life at Comtanix
  apply/page.tsx
  contact/page.tsx
components/
  header/
  footer/
  hero/
  clocks/
  service-cards/
  testimonials/
  apply-form/
  whatsapp-float/
lib/
  config.ts           # CONFIG (contact, socials, hours)
  data/
    services.ts
    roles.ts
    testimonials.ts
public/
  logo.png
docs/                 # this documentation
```

## Routing model

Functionality reference used **hash routes** (`#/home`, `#/services/dev`).  
Next.js should use **path routes** instead:

| Old hash | New path |
|----------|----------|
| `#/home` | `/` |
| `#/services` | `/services` |
| `#/services/{id}` | `/services#{id}` or `/services/{slug}` |
| `#/about/story` | `/about#story` or `/about/story` |
| `#/about/values` | `/about#values` |
| `#/about/learning` | `/about#learning` |
| `#/careers` | `/careers` |
| `#/team` | `/life` (Life at Comtanix) |
| `#/apply` | `/apply` |
| `#/contact` | `/contact` |

Deep-linking to About subsections and Service anchors must still work (scroll into view).

## Environment / config

Single source of truth: `lib/config.ts` (mirrors functionality `CONFIG`):

- WhatsApp number + display string
- Emails, address, map query, interview hours
- Office timezone
- Social URLs
- Optional `formEndpoint`
- Optional office photo path

## Browser support

Modern evergreen browsers; mobile-first responsive. Safe-area insets for sticky header and floating WhatsApp on notched devices.
