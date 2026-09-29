import Image from "next/image";
import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 transition hover:scale-105 hover:brightness-110 md:right-6"
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={64}
        height={64}
        className="h-14 w-14 rounded-[22%] object-cover drop-shadow-[0_6px_16px_rgba(73,164,174,0.35)] md:h-16 md:w-16"
      />
      <span className="sr-only">{CONFIG.whatsappShow}</span>
    </a>
  );
}
