import { MessageCircle } from "lucide-react";
import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-display text-sm font-bold text-[#053b1c] shadow-[0_8px_24px_rgba(30,58,63,0.18)] transition hover:brightness-105 md:right-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
      <span className="sr-only">{CONFIG.whatsappShow}</span>
    </a>
  );
}
