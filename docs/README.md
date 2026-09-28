# Comtanix Website — Documentation Index

Career-focused marketing site for **Comtanix**, a BPO and IT company serving US clients. Phase 1 is **frontend only** (Next.js).

## Source map (what to take from where)

| Source | Use for |
|--------|---------|
| Functionality reference (ZIP) | Routes, pages, behaviors, CONFIG, forms, clocks, WhatsApp apply flow |
| Design reference (ZIP / `code.html` + `screen.png`) | Layout composition, section structure, copy/text, UI patterns, icons |
| `DESIGN.md` | Color tokens, typography, spacing, elevation, component styles |

## Doc files

| File | Purpose |
|------|---------|
| [01-project-brief.md](./01-project-brief.md) | Vision, audience, goals, scope |
| [02-tech-stack.md](./02-tech-stack.md) | Next.js frontend stack and constraints |
| [03-functional-requirements.md](./03-functional-requirements.md) | Must-have features and behaviors |
| [04-pages-and-routes.md](./04-pages-and-routes.md) | Routes, nav, page sections |
| [05-design-system.md](./05-design-system.md) | Theme summary + pointer to full `DESIGN.md` |
| [06-content-copy.md](./06-content-copy.md) | Headlines, body copy, CTAs from design reference |
| [07-data-and-config.md](./07-data-and-config.md) | CONFIG, services, roles, testimonials |
| [08-acceptance-criteria.md](./08-acceptance-criteria.md) | Done-when checklist |
| [DESIGN.md](./DESIGN.md) | Full design tokens (colors, type, components) |

## Build order (recommended)

1. Scaffold Next.js + apply design tokens from `DESIGN.md`
2. Shared shell: header (dropdowns), footer, floating WhatsApp
3. Home page (hero + clocks + stats + services + culture + testimonials + CTAs)
4. Remaining pages: Services, About, Careers, Life, Apply, Contact
5. Apply form + WhatsApp handoff
6. Responsive polish + accessibility
