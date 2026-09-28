# 01 — Project Brief

## Product

**Comtanix** website: enterprise BPO & IT careers / company site aimed at:

1. **Job seekers** (primary) — apply for US-process BPO and IT roles
2. **US clients / partners** (secondary) — convey reliability, SOC-minded operations, and capability depth

## Brand positioning

Refined corporate / modern-tech identity: oceanic teals, soft mist canvases, geometric display type (Sora) + institutional body type (Public Sans). No pure black. Light mode only.

Tagline direction (hero): *Build your career on a team that works with the US.*

## Phase 1 scope (this project)

- **Frontend only** with Next.js (App Router preferred)
- Static / client-side behaviors that already exist in the functionality reference
- No backend, no CMS, no auth, no admin panel in Phase 1
- Contact and apply flows use **WhatsApp** (`wa.me`) and optional future `formEndpoint`

Out of scope for Phase 1:

- Real API / database
- Auth, dashboards, applicant tracking
- Dark mode
- Multi-language

## Success metrics (product)

- Clear path from any page → **Apply Now**
- Apply form opens WhatsApp with prefilled application text (and CV attach guidance)
- Site feels premium and US-client ready while remaining easy to navigate on mobile
- Live US/office clocks and hiring CTAs reinforce “US hours” positioning

## Non-negotiables

- Prominent **Apply Now** in header and key CTAs
- Floating WhatsApp chat button
- Dropdown nav for Services and About
- Logo retained in header (`assets/logo.png` from functionality reference)
- Copy: plain professional English, sentence case, active voice; buttons say what they do
- `prefers-reduced-motion` respected
- Accessible focus states and contrast (see design system)

## Reference strategy

| Concern | Authority |
|---------|-----------|
| What the site *does* | Functionality reference |
| How it *looks* and *reads* | Design reference + `DESIGN.md` |
| Theme tokens | `DESIGN.md` only (not invent new palettes) |
