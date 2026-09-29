import Image from "next/image";
import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-2.5 bottom-[max(0.65rem,env(safe-area-inset-bottom,0px))] z-40 transition hover:scale-105 hover:brightness-110 sm:right-3 md:right-5"
    >
      <Image
        src="/whatsapp.png"
        alt="WhatsApp"
        width={64}
        height={64}
        className="h-12 w-12 rounded-[22%] object-cover drop-shadow-[0_6px_16px_rgba(73,164,174,0.35)] sm:h-14 sm:w-14 md:h-16 md:w-16"
      />
      <span className="sr-only">{CONFIG.whatsappShow}</span>
    </a>
  );
}
