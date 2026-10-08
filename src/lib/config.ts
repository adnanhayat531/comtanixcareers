import { API_BASE_URL, apiUrl } from "@/lib/api";

/** Canonical brand — use this everywhere (UI, SEO, forms, WhatsApp). */
export const SITE = {
  name: "Comtanix",
  legalName: "Comtanix",
  tagline: "Build what’s next with AI, technology, and the right expertise",
  description:
    "Comtanix helps businesses harness AI, modernize technology, solve complex challenges, and move forward with highly capable technical teams.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.comtanix.com",
  domain: "comtanix.com",
} as const;

export const CONFIG = {
  whatsapp: "923001234567",
  whatsappShow: "+92 300 1234567",
  /** FastAPI origin — prefer NEXT_PUBLIC_API_URL. */
  apiUrl: API_BASE_URL,
  /**
   * Unified submit URL kept for compatibility.
   * Forms use dedicated endpoints in ApplyForm / ContactForm.
   */
  formEndpoint: apiUrl("/api/submit"),
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
  return "https://www.google.com/maps/place/Comtanix/@33.4977501,73.0704028,17z/data=!4m8!3m7!1s0x38df95f8d0000001:0x3b57baa0437d08ab!8m2!3d33.4977501!4d73.0704028!9m1!1b1!16s%2Fg%2F11fmqy91pv";
}

/** Google Maps embed centered on Comtanix office */
export function mapsEmbedSrc() {
  const { mapLat, mapLng, mapPlace } = CONFIG;
  const q = encodeURIComponent(`${mapPlace}@${mapLat},${mapLng}`);
  return `https://maps.google.com/maps?q=${q}&z=17&hl=en&output=embed`;
}

export const DEFAULT_WA_MESSAGE = `Hello ${SITE.name}, I would like to know about jobs.`;
