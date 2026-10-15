import { CONFIG, mapsEmbedSrc, mapsLink } from "@/lib/config";

/** Location pin pointer */
function MapPointer() {
  return (
    <svg
      viewBox="0 0 48 64"
      className="h-14 w-11 drop-shadow-md sm:h-16 sm:w-12"
      aria-hidden
    >
      <path
        d="M24 0C12.4 0 3 9.4 3 21c0 14.6 18.2 39.4 19 40.5a2 2 0 0 0 3.2 0C26.8 60.4 45 35.6 45 21 45 9.4 35.6 0 24 0Z"
        fill="#EA4335"
      />
      <circle cx="24" cy="21" r="9" fill="#fff" />
      <circle cx="24" cy="21" r="5.5" fill="#2F7A84" />
    </svg>
  );
}

/** Map band between contact form and footer — streets + pin */
export function ContactMap() {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-line bg-[#e5e3df]"
      aria-label="Office location map"
    >
      <div className="relative h-[260px] w-full sm:h-[320px] md:h-[380px] lg:h-[440px]">
        <iframe
          title={`${CONFIG.address} on the map`}
          src={mapsEmbedSrc()}
          className="absolute inset-0 h-full w-full border-0"
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* Center pointer (extra visible pin) */}
        <div
          className="pointer-events-none absolute left-1/2 top-[44%] z-10 -translate-x-1/2 -translate-y-full"
          aria-hidden
        >
          <MapPointer />
        </div>
      </div>

      <a
        href={mapsLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="theme-light absolute bottom-3 left-3 z-20 inline-flex max-w-[min(100%-1.5rem,22rem)] items-start gap-2 rounded-md border border-line bg-white px-3 py-2.5 text-left shadow-soft transition hover:bg-white sm:bottom-4 sm:left-4"
      >
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="type-eyebrow block text-brand">Our location</span>
          <span className="type-meta mt-0.5 block font-semibold leading-snug text-[#0b2c35]">
            {CONFIG.address}
          </span>
          <span className="type-meta mt-1 block font-medium text-[#3a8a93]">
            Open in Google Maps
          </span>
        </span>
      </a>
    </section>
  );
}
