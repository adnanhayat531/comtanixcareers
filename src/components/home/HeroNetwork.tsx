/** Full-bleed hero — original PNG via native img (no Next resize/compress) */
export function HeroNetwork() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Native img keeps the file bytes as-is; Next/Image can resample and soften */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-comtanix.png"
        alt=""
        width={2048}
        height={768}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-[center_48%]"
      />
    </div>
  );
}
