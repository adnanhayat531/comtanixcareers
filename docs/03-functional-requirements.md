# 03 — Functional Requirements

Source of truth for **behavior**: functionality reference. Visual polish and richer copy come from the design reference.

## FR-01 Site shell

- Sticky header with logo, primary nav, **Apply Now** CTA
- Mobile menu toggle (`aria-expanded`, controls nav)
- Services dropdown listing all service lines
- About dropdown: Our Story, Core Values, Learning and Development
- Footer: company blurb, services links, company links, careers links, socials, copyright year, email
- Site-wide “Get in touch” band (phone, email, address, socials) — can sit above footer
- Floating WhatsApp button (fixed bottom-right), opens prefilled chat

## FR-02 Routing & navigation

- Multi-page routes (see `04-pages-and-routes.md`)
- Active nav state (`aria-current="page"`)
- Closing mobile menu on navigation
- About / Services deep links scroll to the correct section
- Document titles: `Comtanix | …` pattern (Home vs page name)

## FR-03 Home — live clocks (US hours)

- Widget showing live local times for:
  - New York (`America/New_York`)
  - Los Angeles (`America/Los_Angeles`)
  - Comtanix office (`CONFIG.officeTz`, default `Asia/Karachi`)
- Update at least every 30 seconds
- Status indicator based on New York weekday + hour (Mon–Fri, 09:00–17:00):
  - Open: “US business hours now. Our teams are live.” + live green dot
  - Closed: “Outside US business hours. Night shifts are running.”

Design reference may label this “Global Operations Hub” with richer styling; keep the same time logic.

## FR-04 Animated footprint counters

- Stats: Team members (250+), Service lines (6), US time zones (4), Quality score target (95%)
- Count-up on scroll into view (~1.2s)
- Skip animation when `prefers-reduced-motion: reduce`

## FR-05 Services catalog

Seven service lines (data-driven):

1. Software Development  
2. Software Quality and Testing  
3. IT Support and Administration  
4. Customer Care  
5. Back Office and Data Processing  
6. Finance and Accounting  
7. Sales and Marketing Support  

Each item: id/slug, icon, title, short description, capability tags.  
Rendered on Home (cards), Services page (detail), nav dropdown, and footer.

## FR-06 Testimonials

- Sample employee quotes with initials avatar, name, role, 5-star rating
- Home: horizontal slider with Previous / Next (smooth scroll unless reduced motion)
- Life page: full grid of same cards
- Data replaceable in one module

## FR-07 Careers list

- List open roles with title, short description, tags, Apply CTA
- Clicking Apply with `data-role` / query prefills Apply form role select

## FR-08 Apply form

Fields:

| Field | Required | Notes |
|-------|----------|-------|
| Full name | Yes | |
| Phone | Yes | |
| Position | Yes | Select from roles + Other |
| Experience | Yes | Fresher / &lt;1y / 1–3y / 3+y (design may use richer labels — align to design copy) |
| CV upload | Optional in functionality; design shows required — **implement validation as PDF/DOC/DOCX, max 5 MB**; product decision: keep optional unless stakeholder insists |
| Message / intro | Optional | |

Submit behavior:

1. Validate CV type/size if present  
2. If `formEndpoint` set → `POST` FormData; on success show confirmation and reset  
3. Else open WhatsApp with prefilled application text  
4. If CV attached, instruct user to send document via paperclip after WhatsApp opens  

## FR-09 Contact & location

- Show address, WhatsApp number, interview hours from CONFIG  
- “Get directions” → Google Maps search URL  
- Direct WhatsApp CTA  
- Social icons (hide empty social URLs)

## FR-10 Office imagery

- Shared office visual: CONFIG photo if set, else SVG illustration placeholder  
- Used on Home / About / Contact as in references

## FR-11 Culture collage / life activities

- Home culture tiles (teamwork, learning, sports, lunch, awards, celebrations)  
- Life page: activity cards (lunches, sports, star of month, skill sessions, festivals, game nights)

## FR-12 Accessibility & UX

- Visible focus rings (brand primary)
- Contrast without pure `#000`
- Semantic headings, labels on form controls
- `aria-label` on clocks, sliders, WhatsApp float, menu
- Respect reduced motion

## FR-13 Responsive

Breakpoints from design system:

- Mobile &lt; 768px  
- Tablet 768–1199px  
- Desktop 1200px+ (max content ~1280px)

## Explicit non-requirements (Phase 1)

- Real-time applicant storage  
- File upload to server (unless `formEndpoint` provided by user)  
- Login / admin  
- Blog / news  
