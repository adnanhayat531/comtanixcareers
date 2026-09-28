# 05 — Design System Summary

**Full source of truth:** [DESIGN.md](./DESIGN.md)

Implement tokens in Tailwind / CSS variables. Do not invent a purple/cream/newspaper aesthetic. Light mode only. **Never use pure black `#000000`.**

## Brand colors (practical UI map)

From DESIGN.md “Core Roles” (use these for product UI even when Material token names differ):

| Role | Hex | Use |
|------|-----|-----|
| Primary / brand | `#49A4AE` | Primary CTAs, active indicators |
| Secondary / sea | `#2A7A85` | Hero bands, structural accents |
| Sea mid (HR portal) | `#166466` | Button hover, nav underline, milestones |
| Deep (HR portal) | `#002F34` | Footer, closing CTAs, culture weight |
| Muted on deep | `#78989A` | Footer / deep-surface secondary text |
| Tertiary wash | `#E6F3F5` | Hovers, chips, tinted sections |
| Neutral / ink | `#1E3A3F` | Primary text (not black) |
| Canvas | `#F3F9FA` | Page background |
| Surface | `#FFFFFF` | Cards, inputs, modals |
| Muted text | `#557A80` | Meta, labels |
| Border subtle | `rgba(73, 164, 174, 0.2)` | Card/table borders |

Material-style tokens in DESIGN frontmatter (`primary: #006971`, surfaces `#eefcff`, etc.) may be used for Tailwind theme parity with the design HTML — but **CTA/brand accent should remain `#49A4AE`** and hero/footer deep teal **`#2A7A85`** as in both references.

## Typography

| Role | Font | Notes |
|------|------|-------|
| Display / headlines | **Sora** | 700/600, tight tracking |
| Body / UI / labels | **Public Sans** | 400/500/600 |

Key sizes (desktop): display 48/56, headline-lg 36/44, body-md 15/22. Mobile display 32/40. See DESIGN.md for full scale.

## Layout

- Desktop 12-col, max ~1280px, margin 32px  
- Tablet 8-col  
- Mobile 4-col, margin 20px  
- 8-point spacing rhythm  

## Elevation

Tinted teal shadows only (no harsh black drops). Three layers defined in DESIGN.md (surface, hover, overlay).

## Shape

Soft radii: 4px controls, 8px cards/nav, 12px hero callouts. Optional hexagonal accents from brand mark.

## Components (must match DESIGN.md)

- **Primary button:** `#49A4AE` / white text → hover `#2A7A85` + lift shadow  
- **Secondary outline:** `#2A7A85` border  
- **Ghost:** transparent → tint fill  
- **Inputs:** white, teal-tinted border, focus ring `0 0 0 3px rgba(73,164,174,0.2)`  
- **Chips:** tint bg, secondary text  
- **Cards:** white + hairline border; hover lift `-2px` + border `#49A4AE`  

## Motion (ship 2–3 intentional motions)

1. Stat count-up on scroll  
2. Card hover lift / border transition  
3. Testimonial slider scroll  
4. Optional nav underline / hero entrance (respect reduced motion)

## Design reference extras to keep

- Sticky white header, height ~80px desktop  
- Deep teal hero with geometric dot grid optional  
- “Global Operations Hub” clock card glass/panel treatment  
- Overlapping stats bar  
- Footer deep teal with multi-column links  
- Material-style outlined icons in service/culture cards  

## Anti-patterns

- Purple gradients, cream/serif editorial look, dark mode default  
- Pure black text/shadows  
- Card spam in hero  
- Detached floating badges over hero media (design badge in hero is allowed as inline label, not sticker collage)
