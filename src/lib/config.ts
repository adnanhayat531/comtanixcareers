/** Canonical brand — use this everywhere (UI, SEO, forms, WhatsApp). */
export const SITE = {
  name: "Comtanix",
  legalName: "Comtanix",
  tagline: "IT careers that serve US enterprises",
  description:
    "Comtanix is an IT company building careers and delivering dependable work for US businesses.",
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
  address: "Comtanix Corporate Centre, High-Tech Industrial Zone, Pakistan",
  /** Map pin — Arfa Software Technology Park, Lahore (IT hub placeholder) */
  mapLat: 31.475228,
  mapLng: 74.343061,
  mapPlace: "Arfa Software Technology Park, Lahore, Pakistan",
  hours: "Monday to Friday, 4:00 PM to 11:00 PM",
  officeTz: "Asia/Karachi",
} as const;

export function waLink(text?: string) {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function mapsLink() {
  const { mapLat, mapLng, mapPlace } = CONFIG;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${mapLat},${mapLng}(${mapPlace})`,
  )}`;
}

/** Google Maps embed centered on office coords (shows map tiles + marker) */
export function mapsEmbedSrc() {
  const { mapLat, mapLng } = CONFIG;
  return `https://maps.google.com/maps?q=${mapLat},${mapLng}&z=16&hl=en&output=embed`;
}

export const DEFAULT_WA_MESSAGE = `Hello ${SITE.name}, I would like to know about jobs.`;
