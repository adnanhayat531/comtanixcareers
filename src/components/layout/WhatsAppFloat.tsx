import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

/** WhatsApp brand mark via Simple Icons CDN (stable brand SVG) */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cdn.simpleicons.org/whatsapp/ffffff"
      alt=""
      width={20}
      height={20}
      className={className}
      decoding="async"
    />
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      title="Contact us on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom,0px))] z-40 inline-flex h-10 items-center gap-2 rounded-md bg-[#25D366] py-2 pr-3.5 pl-2.5 text-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-colors duration-150 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-5 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:h-11 sm:gap-2.5 sm:pr-4 sm:pl-3"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center sm:h-8 sm:w-8">
        <WhatsAppIcon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      </span>
      <span className="pr-0.5 text-sm font-semibold tracking-tight whitespace-nowrap sm:text-[15px]">
        Contact us
      </span>
      <span className="sr-only">{CONFIG.whatsappShow}</span>
    </a>
  );
}
