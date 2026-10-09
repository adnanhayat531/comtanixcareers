import { CONFIG, DEFAULT_WA_MESSAGE, waLink } from "@/lib/config";

/** WhatsApp brand mark via Simple Icons CDN (stable brand SVG) */
function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cdn.simpleicons.org/whatsapp/ffffff"
      alt=""
      width={22}
      height={22}
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
      className="group fixed right-[max(0.75rem,env(safe-area-inset-right,0px))] bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] z-40 inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-[width,background-color,box-shadow] duration-200 ease-out [@media(hover:hover)]:hover:w-[9.5rem] [@media(hover:hover)]:hover:justify-start [@media(hover:hover)]:hover:bg-[#20bd5a] [@media(hover:hover)]:hover:pl-3 [@media(hover:hover)]:hover:pr-4 focus-visible:w-[9.5rem] focus-visible:justify-start focus-visible:bg-[#20bd5a] focus-visible:pl-3 focus-visible:pr-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:right-5 sm:bottom-5 sm:h-12 sm:w-12 sm:[@media(hover:hover)]:hover:w-[10.25rem] sm:focus-visible:w-[10.25rem]"
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center">
        <WhatsAppIcon className="h-[22px] w-[22px]" />
      </span>
      <span
        className="type-nav max-w-0 overflow-hidden pl-0 whitespace-nowrap opacity-0 transition-[max-width,opacity,padding] duration-200 ease-out [@media(hover:hover)]:group-hover:max-w-[7rem] [@media(hover:hover)]:group-hover:pl-2 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:max-w-[7rem] group-focus-visible:pl-2 group-focus-visible:opacity-100"
        aria-hidden
      >
        Contact us
      </span>
      <span className="sr-only">{CONFIG.whatsappShow}</span>
    </a>
  );
}
