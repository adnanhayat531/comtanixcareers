/** Canonical brand — use this everywhere (UI, SEO, forms, WhatsApp). */
export const SITE = {
  name: "Comtanix",
  legalName: "Comtanix",
  tagline: "IT careers that serve global enterprises",
  description:
    "Comtanix is an IT company building careers and delivering dependable work for businesses worldwide.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.comtanix.com",
  domain: "comtanix.com",
} as const;

export const CONFIG = {
  whatsapp: "923001234567",
  whatsappShow: "+92 300 1234567",
  formEndpoint: "",
  email: "info@comtanix.com",
  careersEmail: "careers@comtanix.com",
  partnersEmail: "partners@comtanix.com",
  socials: {
    Facebook: "https://www.facebook.com/",
    LinkedIn: "https://www.linkedin.com/",
    Instagram: "https://www.instagram.com/",
    YouTube: "https://www.youtube.com/",
    X: "https://x.com/",
  } as Record<string, string>,
  address:
    "Plaza No. 610, Noor Heights, 2nd Floor, Business District South, Bahria Town Phase 8, Rawalpindi",
  /** Real Comtanix office — Bahria Town Phase 8, Rawalpindi */
  mapLat: 33.49775,
  mapLng: 73.070403,
  mapPlace: "Comtanix, Noor Heights Plaza 610, Bahria Town Phase 8, Rawalpindi",
  /** Prefer Google place search by company name */
  mapQuery: "Comtanix Noor Heights Bahria Town Phase 8 Rawalpindi",
  hours: "Monday to Friday, 4:00 PM to 11:00 PM",
  officeTz: "Asia/Karachi",
} as const;

export function waLink(text?: string) {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function mapsLink() {
  return `https://www.google.com/maps/place/Comtanix/@${CONFIG.mapLat},${CONFIG.mapLng},17z`;
}

/** Google Maps embed centered on Comtanix office */
export function mapsEmbedSrc() {
  const { mapLat, mapLng, mapPlace } = CONFIG;
  const q = encodeURIComponent(`${mapPlace}@${mapLat},${mapLng}`);
  return `https://maps.google.com/maps?q=${q}&z=17&hl=en&output=embed`;
}

export const DEFAULT_WA_MESSAGE = `Hello ${SITE.name}, I would like to know about jobs.`;
