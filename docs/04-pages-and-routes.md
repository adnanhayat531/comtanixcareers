# 04 — Pages and Routes

Navigation labels (design + functionality):

**Home · Services ▾ · About ▾ · Careers · Life at Comtanix · Contact · [Apply Now]**

About submenu: Our Story · Core Values · Learning and Development  
Services submenu: all 7 service lines

---

## `/` — Home

| Section | Purpose | Content authority |
|---------|---------|-------------------|
| Hero | Brand + primary CTA + clocks | Design layout/copy; functionality clock logic |
| Footprint stats | Trust numbers | Functionality numbers; design presentation |
| We Deliver Excellence | Service cards grid | Design headlines; functionality service data |
| Career / home for careers | Story teaser + office visual | Design richer copy; functionality structure |
| Our Goals | Quality / People / Growth / Trust | Design “Strategic Pillars” wording preferred |
| What Makes Us Comtanix | Culture collage / asymmetric cards | Design layout + copy |
| Testimonials | Slider | Design richer quotes optional; functionality slider |
| Final CTA | Apply / browse roles | Design CTA band |
| Get in touch band | Phone / email / address | CONFIG |

Hero must keep brand strong: Comtanix visible; one headline; one supporting sentence; CTA group; dominant visual plane (teal hero + clocks panel).

---

## `/services` — Services

- Page intro (design: “Our Enterprise Services” / excellence framing)
- Full list of 7 services with tags and longer descriptions from design where available
- Link to careers / apply for related roles
- Anchor or slug per service for nav deep links

---

## `/about` — About (or nested `/about/story` etc.)

Sections:

1. **Our Story** — company narrative + office visual + Apply CTA  
2. **Core Values** — Recruit well, Train fully, Retain with care, Deliver results  
3. **Learning and Development** — Paid induction, Communication, Tool training, Leadership  

Use design copy for institutional tone; keep four values from functionality.

---

## `/careers` — Careers

- Intro + “why people stay” benefits (paid training, growth, rewards, safe office)
- Role listing cards with tags and Apply
- Design may show “5 Currently Active Positions” badge — optional

Default roles (functionality):

1. Customer Support Agent (US Process)  
2. Technical Support Representative  
3. Data Entry and Back Office Executive  
4. Web Developer  
5. Team Leader  

Design expands titles/descriptions — prefer design copy when implementing UI.

---

## `/life` — Life at Comtanix

(Functionality route was `#/team`.)

- Activity cards grid  
- Full testimonials grid  
- Join CTA  

---

## `/apply` — Apply Now

Two-column layout:

- Left: form  
- Right: “What happens next” steps (design: Profile Screening → Communication Assessment → Executive Interview)

Prefill role from `?role=` query or careers click.

---

## `/contact` — Contact and location

- Address, WhatsApp, interview hours  
- Directions + WhatsApp CTAs  
- Socials  
- Office visual  
- Optional map embed / “Open in Google Maps” (design)

---

## Shared chrome

- Header on all pages  
- Footer on all pages  
- Floating WhatsApp on all pages  
- Optional global “Get in touch” section above footer  

---

## SEO / metadata (frontend)

Per-page `title` + `description` meta. Default:

- Title: `Comtanix | BPO and IT Careers` (Home)  
- Others: `{Page} | Comtanix | BPO and IT Careers`
