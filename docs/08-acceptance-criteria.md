# 08 — Acceptance Criteria

Phase 1 frontend is **done** when all boxes below pass.

## Setup

- [ ] Next.js app runs locally (`npm run dev`)
- [ ] Sora + Public Sans loaded via `next/font`
- [ ] Design tokens from `DESIGN.md` applied (teal palette, no pure black, light only)
- [ ] Logo appears in header

## Navigation & pages

- [ ] All routes reachable: `/`, `/services`, `/about`, `/careers`, `/life`, `/apply`, `/contact`
- [ ] Services and About dropdowns work on desktop; mobile menu works
- [ ] Active page indicated in nav
- [ ] Deep links to about sections / service anchors scroll correctly
- [ ] Apply Now visible in header on every page

## Home behaviors

- [ ] Hero shows brand-forward layout with headline, support, CTAs, clocks panel
- [ ] Clocks update for NY, LA, office TZ
- [ ] US-hours status + dot logic correct for weekday 9–17 America/New_York
- [ ] Stats count up on scroll; disabled under reduced motion
- [ ] Service cards, goals, culture, testimonials, CTAs present

## Forms & contact

- [ ] Apply form validates required fields
- [ ] CV accepts only pdf/doc/docx ≤ 5 MB with clear errors
- [ ] Submit opens WhatsApp with prefilled text (or posts to `formEndpoint` when set)
- [ ] Careers “Apply” prefills role on `/apply`
- [ ] Contact shows address, hours, WhatsApp; directions link opens Maps
- [ ] Floating WhatsApp button works site-wide
- [ ] Empty social URLs are hidden

## Design & UX

- [ ] Matches design reference composition closely (hero, stats bar, cards, footer teal)
- [ ] Buttons, inputs, chips, cards follow DESIGN.md specs
- [ ] Responsive: usable on mobile and desktop
- [ ] Focus visible; images have alt text; form labels associated
- [ ] No dark mode; no `#000` text/shadows

## Content

- [ ] Copy taken from design bank (`06-content-copy.md`) for headlines/sections
- [ ] CONFIG placeholders documented for client to replace
- [ ] Sample testimonials clearly replaceable in one data file

## Docs

- [ ] `docs/` reflects decisions; `DESIGN.md` present for implementers
