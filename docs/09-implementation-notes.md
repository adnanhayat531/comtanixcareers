# Implementation Notes

Quick rules for whoever builds the Next.js app next.

## Priority order of sources

1. **Behavior** → functionality reference (`_refs/functionalities/…`)
2. **Layout, copy, visual density** → design reference (`_refs/design/code.html`, `screen.png`)
3. **Tokens** → `docs/DESIGN.md`

If design and functionality conflict:

- Keep the **feature** from functionality (WhatsApp apply, clocks, hash→path routing, CV rules)
- Prefer **copy and chrome** from design (Global Operations Hub, richer service blurbs, footer columns)
- Prefer **colors/type/elevation** from DESIGN.md

## Do not port as-is

- Hash router (`#/…`) → use Next.js App Router paths
- Inline emoji-as-icons → Material Symbols / lucide for design parity
- CDN Tailwind in browser → proper Tailwind build in Next.js
- Sample phone/email from design mock → always `CONFIG`

## Assets

- Logo reference copied as `docs/assets-logo-reference.png` — move to `public/logo.png` when scaffolding
- Office photo: optional; SVG placeholder until provided
- `_refs/` folder is for research only; not shipped to production

## Phase 2 (later, not now)

- Real form backend / email + CV storage
- CMS for roles and testimonials
- Privacy / Terms / Security real pages
- Analytics
