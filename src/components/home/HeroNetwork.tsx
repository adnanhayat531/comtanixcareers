/** Full-bleed hero bg — original image lighting, no wash */
export function HeroNetwork() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050d18] select-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-comtanix.png?v=neon-wide"
        alt=""
        width={1024}
        height={409}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain object-right"
      />
    </div>
  );
}
