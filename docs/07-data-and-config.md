# 07 — Data and Config

All editable business data should live in typed modules (not scattered in JSX).

---

## `CONFIG` (from functionality `js/main.js`)

```ts
export const CONFIG = {
  whatsapp: "923001234567",          // digits only, country code, no +
  whatsappShow: "+92 300 1234567",
  formEndpoint: "",                  // optional Formspree / API URL
  email: "info@yourcompany.com",
  careersEmail: "careers@yourcompany.com",
  socials: {
    Facebook: "https://www.facebook.com/",
    LinkedIn: "https://www.linkedin.com/",
    Instagram: "https://www.instagram.com/",
    YouTube: "https://www.youtube.com/",
    X: "https://x.com/",
  },
  address: "Your office address, City, Pakistan",
  mapQuery: "Comtanix office",
  hours: "Monday to Saturday, 10:00 AM to 6:00 PM",
  officeTz: "Asia/Karachi",
  officePhoto: "",                   // path under /public when available
} as const;
```

### Helpers

- `waLink(text?: string)` → `https://wa.me/{whatsapp}?text=…`
- Default chat text: `Hello Comtanix, I would like to know about jobs.`
- Maps URL: `https://www.google.com/maps/search/?api=1&query={mapQuery + address}`
- Hide social icons when URL empty

---

## Services

| slug | icon hint | title | tags (func) |
|------|-----------|-------|-------------|
| `dev` | code | Software Development | Web apps, Mobile apps, Maintenance |
| `qa` | verified | Software Quality and Testing | Manual QA, Automation, Release checks |
| `it` | build | IT Support and Administration | Tier 1 and 2, Systems admin, Onboarding |
| `care` | headset | Customer Care | Voice, Chat, Email |
| `back` | folder | Back Office and Data Processing | Data entry, Claims, Order processing |
| `fin` | chart | Finance and Accounting | Bookkeeping, Invoicing, Reporting |
| `sales` | campaign | Sales and Marketing Support | Lead research, Campaigns, CRM updates |

Store short description (Home) and long description (Services page) per item. Prefer design long copy.

---

## Open roles

| id | title | tags (func) |
|----|-------|-------------|
| support | Customer Support Agent (US Process) | Night shift, Fresh graduates welcome |
| tech | Technical Support Representative | Night shift, Technical skills |
| data | Data Entry and Back Office Executive | Day or night |
| web | Web Developer | IT team, HTML/CSS/JS (design: React/Node) |
| lead | Team Leader | Leadership, Experience needed |

Plus apply select option: **Other** / General Talent Consideration.

---

## Experience options (Apply)

Functionality:

- Fresher  
- Less than 1 year  
- 1 to 3 years  
- 3 or more years  

Design alternative labels may be used if UX prefers; keep values stable for WhatsApp message.

---

## Testimonials (sample — replace later)

| Initials | Name | Role | Quote summary |
|----------|------|------|---------------|
| AK | Ayesha K. | Customer Support Agent | Fresher → paid training → US customers |
| HR | Hamza R. | Technical Support | Weekly coaching → senior in a year |
| SM | Sara M. | Web Developer | Equipment, team, learning |
| UF | Usman F. | Team Leader | Promoted from agent |
| NZ | Noor Z. | Back Office Executive | Clear targets, fair reviews |

Design offers alternate named quotes (Sara Malik, Hamza Bilal, etc.) — either set is fine until real feedback arrives.

---

## Culture / life activities

Home collage labels: Teamwork · Learning · Sports day · Team lunch · Awards · Celebrations  

Life page activities: Monthly team lunch · Sports day · Star of the month · Skill sessions · Festivals and birthdays · Game nights  

---

## Goals / values

**Goals:** Quality · People · Growth · Trust (design titles: Quality First, People Investment, Measured Growth, Absolute Trust)

**Values:** Recruit well · Train fully · Retain with care · Deliver results

**L&D:** Paid induction · Communication skills · Tool training · Leadership programme

---

## WhatsApp application message template

```
Job application - Comtanix
Name: {name}
Phone: {phone}
Position: {role}
Experience: {exp}
Note: {msg}          // if present
CV: {filename} (sending it in this chat)  // if present
```

---

## Footprint defaults

`250+` team · `6` service lines · `4` US time zones · `95%` quality target  

Editable constants in `lib/data/stats.ts`.
